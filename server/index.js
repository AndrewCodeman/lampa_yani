'use strict';

// Yani resolver: turns a player page that only works inside its own signed
// iframe into a plain HLS URL any media player can open.
//
// A browser page holds the live Alloha session (see alloha-session.js) and this
// process proxies the manifest and segments on its behalf, attaching the
// rotating headers the CDN demands. Those headers are exactly what a browser
// cannot attach itself - a cross-origin manifest request carrying them triggers
// a CORS preflight the CDN never answers - which is why the Lampa plugin needs
// this service instead of doing the work in place.

const http = require('http');
const {Readable} = require('stream');
const {URL} = require('url');
const {AllohaSession, SourceUnavailableError} = require('./alloha-session');

const VERSION = '1.0.0';
const PORT = Number(process.env.YANI_RESOLVER_PORT || 8790);
const HOST = process.env.YANI_RESOLVER_HOST || '0.0.0.0';
const IDLE_TIMEOUT_MS = Number(process.env.YANI_RESOLVER_IDLE_MS || 5 * 60 * 1000);
const HEADLESS = process.env.YANI_RESOLVER_HEADLESS !== 'false';
const VERBOSE = process.env.YANI_RESOLVER_VERBOSE === 'true';

const HOP_BY_HOP = ['connection', 'keep-alive', 'transfer-encoding', 'upgrade', 'te', 'trailer', 'host', 'content-length'];

const sessions = new Map();
let browserPromise = null;

function log(message) {
    console.log(`[yani-resolver] ${message}`);
}

function debug(message) {
    if (VERBOSE) log(message);
}

function isAllohaUrl(value) {
    return /(^|\/\/)(?:www\.)?alloha(?:\.[a-z0-9-]+)+(?::\d+)?(?:[/:]|$)/i.test(String(value || ''));
}

function encodeTarget(value) {
    return Buffer.from(String(value), 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeTarget(value) {
    return Buffer.from(String(value || '').replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
}

async function browser() {
    if (!browserPromise) {
        browserPromise = (async () => {
            let playwright;
            try {
                playwright = require('playwright');
            } catch (error) {
                throw new Error('playwright is not installed. Run "npm install" inside the server directory.');
            }
            log(`launching chromium (headless=${HEADLESS})`);
            return playwright.chromium.launch({
                headless: HEADLESS,
                args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio', '--disable-dev-shm-usage']
            });
        })();
    }
    return browserPromise;
}

async function acquireSession(iframeUrl) {
    const existing = sessions.get(iframeUrl);
    if (existing) {
        const session = await existing;
        if (!session.closed) {
            session.touch();
            return session;
        }
        sessions.delete(iframeUrl);
    }
    const pending = (async () => {
        const session = new AllohaSession(await browser(), iframeUrl, {log: debug});
        await session.open();
        return session;
    })();
    sessions.set(iframeUrl, pending);
    try {
        return await pending;
    } catch (error) {
        sessions.delete(iframeUrl);
        throw error;
    }
}

async function releaseSession(iframeUrl) {
    const pending = sessions.get(iframeUrl);
    if (!pending) return false;
    sessions.delete(iframeUrl);
    try {
        const session = await pending;
        await session.close();
    } catch (error) {
        debug(`release failed: ${error.message}`);
    }
    return true;
}

setInterval(() => {
    const now = Date.now();
    sessions.forEach((pending, key) => {
        Promise.resolve(pending).then((session) => {
            if (!session || session.closed) return;
            if (now - session.lastUsedAt > IDLE_TIMEOUT_MS) {
                log(`closing idle session ${key}`);
                releaseSession(key);
            }
        }).catch(() => {});
    });
}, 30000).unref();

function upstreamHeaders(session) {
    const state = session.state();
    const headers = {};
    Object.keys(state.headers).forEach((name) => {
        if (HOP_BY_HOP.indexOf(name) < 0) headers[name] = state.headers[name];
    });
    if (!headers['user-agent']) headers['user-agent'] = session.userAgent;
    return headers;
}

async function fetchUpstream(session, target, range) {
    const attempt = async () => {
        const headers = upstreamHeaders(session);
        if (range) headers.range = range;
        return fetch(target, {headers, redirect: 'follow'});
    };
    let response = await attempt();
    if (response.status === 403 || response.status === 401) {
        // A rejected token means the session moved on without us. One refresh
        // and one retry is the whole recovery budget: anything more just serves
        // the player stale data while it stalls.
        debug(`upstream ${response.status}, refreshing session`);
        await session.refresh();
        response = await attempt();
    }
    return response;
}

function rewritePlaylist(text, baseUrl, link) {
    return String(text || '').split(/\r?\n/).map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return line;
        if (trimmed.charAt(0) === '#') {
            return line.replace(/URI="([^"]+)"/g, (match, uri) => `URI="${link(uri, baseUrl)}"`);
        }
        return link(trimmed, baseUrl);
    }).join('\n');
}

function absolute(value, baseUrl) {
    try { return new URL(value, baseUrl).toString(); } catch (error) { return value; }
}

function sendJson(response, status, payload) {
    const body = JSON.stringify(payload);
    response.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
        'Content-Length': Buffer.byteLength(body)
    });
    response.end(body);
}

function playbackBase(request) {
    const host = request.headers.host || `127.0.0.1:${PORT}`;
    return `http://${host}`;
}

async function handleResolve(request, response, query) {
    const iframeUrl = query.get('url') || '';
    if (!iframeUrl) return sendJson(response, 400, {error: 'url is required'});
    if (!isAllohaUrl(iframeUrl)) return sendJson(response, 400, {error: 'unsupported player URL'});

    try {
        const session = await acquireSession(iframeUrl);
        const id = encodeTarget(iframeUrl);
        const base = playbackBase(request);
        sendJson(response, 200, {
            url: `${base}/hls/${id}/master.m3u8`,
            quality: 'auto',
            // The variants live inside the proxied master, so the player picks
            // the quality itself. The bnsi ladder is reported for display only:
            // those URLs carry a spent token and 403 on a live session.
            qualities: null,
            available_qualities: Object.keys(session.qualities),
            headers: null,
            source: 'yani-resolver',
            session: id,
            expires_in: session.expiresAt ? Math.max(0, Math.round((session.expiresAt - Date.now()) / 1000)) : null
        });
    } catch (error) {
        const unavailable = error instanceof SourceUnavailableError;
        log(`resolve failed: ${error.message}`);
        sendJson(response, unavailable ? 404 : 502, {error: error.message, unavailable});
    }
}

async function handleStream(request, response, path, query) {
    const parts = path.split('/').filter(Boolean); // hls/<id>/<rest>
    const id = parts[1];
    if (!id) return sendJson(response, 400, {error: 'session is required'});

    let iframeUrl;
    try { iframeUrl = decodeTarget(id); } catch (error) { return sendJson(response, 400, {error: 'invalid session'}); }

    let session;
    try {
        session = await acquireSession(iframeUrl);
    } catch (error) {
        return sendJson(response, 502, {error: error.message});
    }
    session.touch();
    if (session.expiringSoon()) session.refresh();

    const isMaster = parts[2] === 'master.m3u8';
    const target = isMaster ? session.state().masterUrl : decodeTarget(query.get('u') || '');
    if (!target) return sendJson(response, 404, {error: 'stream is not ready'});

    let upstream;
    try {
        upstream = await fetchUpstream(session, target, request.headers.range);
    } catch (error) {
        log(`upstream request failed: ${error.message}`);
        return sendJson(response, 502, {error: error.message});
    }

    const contentType = upstream.headers.get('content-type') || '';
    const playlist = /mpegurl/i.test(contentType) || /\.m3u8(?:[?#]|$)/i.test(target);

    if (playlist) {
        const text = await upstream.text();
        const base = playbackBase(request);
        const body = rewritePlaylist(text, target, (value, baseUrl) => `${base}/hls/${id}/p?u=${encodeTarget(absolute(value, baseUrl))}`);
        response.writeHead(upstream.status, {
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store',
            'Content-Length': Buffer.byteLength(body)
        });
        return response.end(body);
    }

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store'
    };
    ['content-type', 'content-length', 'content-range', 'accept-ranges'].forEach((name) => {
        const value = upstream.headers.get(name);
        if (value) headers[name] = value;
    });
    response.writeHead(upstream.status, headers);
    if (!upstream.body) return response.end();
    Readable.fromWeb(upstream.body).pipe(response);
}

const server = http.createServer((request, response) => {
    const parsed = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
    const path = parsed.pathname;

    if (request.method === 'OPTIONS') {
        response.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
        });
        return response.end();
    }

    if (path === '/health') return sendJson(response, 200, {ok: true, version: VERSION, sessions: sessions.size});
    if (path === '/resolve') return handleResolve(request, response, parsed.searchParams);
    if (path === '/release') {
        const id = parsed.searchParams.get('session') || '';
        let iframeUrl = '';
        try { iframeUrl = decodeTarget(id); } catch (error) { iframeUrl = ''; }
        return releaseSession(iframeUrl).then((released) => sendJson(response, 200, {released}));
    }
    if (path.indexOf('/hls/') === 0) {
        return handleStream(request, response, path, parsed.searchParams).catch((error) => {
            log(`stream failed: ${error.message}`);
            if (!response.headersSent) sendJson(response, 502, {error: error.message});
            else response.end();
        });
    }
    sendJson(response, 404, {error: 'not found'});
});

function shutdown() {
    log('shutting down');
    const pending = Array.from(sessions.keys()).map(releaseSession);
    Promise.all(pending)
        .then(() => browserPromise)
        .then((instance) => instance && instance.close())
        .catch(() => {})
        .finally(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

if (require.main === module) {
    server.listen(PORT, HOST, () => {
        log(`listening on http://${HOST}:${PORT} (resolver v${VERSION})`);
        log(`configure Lampa with: http://<this-machine-ip>:${PORT}`);
    });
}

module.exports = {server, rewritePlaylist, encodeTarget, decodeTarget, isAllohaUrl};
