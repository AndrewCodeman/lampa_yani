'use strict';

const {wrapperHtml} = require('./wrapper');

const WRAPPER_PATH = '/__yani_wrapper';
const OPEN_TIMEOUT_MS = 45000;
const MASTER_WAIT_MS = 8000;
const REFRESH_LEAD_MS = 20000;
const DESKTOP_PLATFORMS = [
    'Windows NT 10.0; Win64; x64',
    'Macintosh; Intel Mac OS X 10_15_7',
    'X11; Linux x86_64'
];

function desktopUserAgent() {
    const platform = DESKTOP_PLATFORMS[Math.floor(Math.random() * DESKTOP_PLATFORMS.length)];
    const version = 130 + Math.floor(Math.random() * 6);
    return `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version}.0.0.0 Safari/537.36`;
}

function normalizeUrl(value) {
    value = String(value || '').trim();
    if (!value) return '';
    if (value.startsWith('//')) return `https:${value}`;
    return value;
}

function hostOf(value) {
    try { return new URL(value).host; } catch (error) { return ''; }
}

class SourceUnavailableError extends Error {}

/**
 * One live Alloha playback session backed by a headless browser page.
 *
 * The page holds the state the CDN authorizes against, and that state keeps
 * moving: `accepts-controls` rotates roughly every two minutes and the master
 * URL follows the CDN node the player is talking to. Consumers therefore never
 * cache what {@link state} returns - they read it per request.
 */
class AllohaSession {
    constructor(browser, iframeUrl, options) {
        options = options || {};
        this.browser = browser;
        this.iframeUrl = normalizeUrl(iframeUrl);
        this.log = options.log || (() => {});
        this.context = null;
        this.page = null;
        this.headers = {};
        this.masterUrl = '';
        this.qualities = {};
        this.expiresAt = 0;
        this.generation = 0;
        this.lastUsedAt = Date.now();
        this.closed = false;
        this.refreshing = null;
        this.userAgent = desktopUserAgent();
        this.hasStream = false;
        this.hasMaster = false;
        this.unavailable = false;
        this.waiters = [];
    }

    state() {
        return {
            headers: Object.assign({}, this.headers),
            masterUrl: this.masterUrl,
            generation: this.generation
        };
    }

    touch() {
        this.lastUsedAt = Date.now();
    }

    expiringSoon() {
        return this.expiresAt > 0 && Date.now() > this.expiresAt - REFRESH_LEAD_MS;
    }

    async open() {
        this.context = await this.browser.newContext({
            userAgent: this.userAgent,
            viewport: {width: 1280, height: 720},
            locale: 'ru-RU'
        });
        this.page = await this.context.newPage();
        this.page.on('console', (message) => this.log(`page console: ${message.text()}`));

        await this.page.exposeFunction('yaniBridge', (type, payload) => {
            try { this._onBridge(type, payload || {}); } catch (error) { this.log(`bridge error: ${error.message}`); }
        });

        // Serving the wrapper from Alloha's own origin is the whole trick: it
        // makes this document same-origin with the player iframe, which is the
        // only way to instrument the player's network stack.
        const wrapperUrl = new URL(WRAPPER_PATH, this.iframeUrl).toString();
        const html = wrapperHtml(this.iframeUrl);
        await this.page.route(wrapperUrl, (route) => route.fulfill({
            status: 200,
            contentType: 'text/html; charset=utf-8',
            body: html
        }));

        await this.page.goto(wrapperUrl, {waitUntil: 'domcontentloaded', timeout: OPEN_TIMEOUT_MS});
        await this._waitUntilReady(OPEN_TIMEOUT_MS);
        return this;
    }

    /**
     * Reloads the wrapper so the player mints a fresh token. The live state is
     * left untouched while that happens: the current token is still valid for
     * REFRESH_LEAD_MS and has to keep serving segments until the reload has
     * produced a replacement.
     */
    refresh() {
        if (this.closed) return Promise.resolve();
        if (this.refreshing) return this.refreshing;
        this.hasMaster = false;
        this.refreshing = (async () => {
            try {
                this.log('refreshing session');
                await this.page.reload({waitUntil: 'domcontentloaded', timeout: OPEN_TIMEOUT_MS});
                await this._waitUntilReady(OPEN_TIMEOUT_MS);
            } catch (error) {
                this.log(`refresh failed: ${error.message}`);
            } finally {
                this.refreshing = null;
            }
        })();
        return this.refreshing;
    }

    async close() {
        if (this.closed) return;
        this.closed = true;
        this._settle(new Error('Session closed'));
        try { if (this.page) await this.page.close(); } catch (error) {}
        try { if (this.context) await this.context.close(); } catch (error) {}
    }

    _onBridge(type, payload) {
        const headers = payload.headers || {};
        switch (type) {
            case 'ready':
                this._mergeHeaders(headers);
                this._readQualities(payload.bnsi);
                this.hasStream = true;
                this.generation += 1;
                this.log(`session ready, qualities=${Object.keys(this.qualities).join(',') || 'none'}`);
                this._maybeSettle();
                break;
            case 'master': {
                this._mergeHeaders(headers);
                const url = normalizeUrl(payload.url);
                if (!url) break;
                const previousHost = hostOf(this.masterUrl);
                const nextHost = hostOf(url);
                if (this.hasMaster && previousHost && nextHost && previousHost !== nextHost) {
                    // The CDN node moved. The token we still hold is signed for
                    // the old host and would 403 on the new one, so restart the
                    // session instead of adopting a URL we cannot authorize.
                    this.log(`master host changed ${previousHost} -> ${nextHost}, restarting session`);
                    this.refresh();
                    break;
                }
                this.masterUrl = url;
                this.hasMaster = true;
                this.generation += 1;
                this._maybeSettle();
                break;
            }
            case 'config':
                this._mergeHeaders(headers);
                if (payload.edgeHash) this.headers['accepts-controls'] = payload.edgeHash;
                this.expiresAt = Date.now() + Number(payload.ttl || 120) * 1000;
                this.generation += 1;
                break;
            case 'headers':
                this._mergeHeaders(headers);
                break;
            case 'unavailable':
                this.unavailable = true;
                this._settle(new SourceUnavailableError('Alloha reported the dubbing as unavailable'));
                break;
            case 'log':
                this.log(`page: ${payload.message}`);
                break;
            default:
                break;
        }
    }

    _mergeHeaders(headers) {
        Object.keys(headers || {}).forEach((name) => {
            const value = headers[name];
            if (value) this.headers[String(name).toLowerCase()] = String(value);
        });
    }

    _readQualities(bnsi) {
        let payload;
        try { payload = JSON.parse(bnsi); } catch (error) { return; }
        const sources = payload && payload.hlsSource;
        if (!Array.isArray(sources)) return;
        const found = {};
        sources.forEach((source) => {
            const quality = source && source.quality;
            if (!quality) return;
            Object.keys(quality).forEach((label) => {
                const url = String(quality[label] || '').split(' or ')[0].trim();
                const normalized = normalizeUrl(url);
                const name = /p$/i.test(label) ? label : `${label}p`;
                if (normalized && !found[name]) found[name] = normalized;
            });
        });
        this.qualities = found;
    }

    _maybeSettle() {
        if (!this.hasStream) return;
        // The master the player fetches itself is the only correctly signed one;
        // the bnsi URL is a last resort the CDN usually answers with 403.
        if (this.hasMaster) return this._settle(null);
        if (this._masterTimer) return;
        this._masterTimer = setTimeout(() => {
            this._masterTimer = null;
            if (!this.masterUrl) {
                const fallback = Object.values(this.qualities).pop();
                if (fallback) {
                    this.log('no signed master observed, falling back to the bnsi URL');
                    this.masterUrl = fallback;
                }
            }
            this._settle(this.masterUrl ? null : new Error('No Alloha master playlist was observed'));
        }, MASTER_WAIT_MS);
    }

    _waitUntilReady(timeoutMs) {
        if (this.masterUrl && this.hasStream) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this._remove(waiter);
                reject(new Error('Timed out waiting for an Alloha session'));
            }, timeoutMs);
            const waiter = {
                resolve: () => { clearTimeout(timer); resolve(); },
                reject: (error) => { clearTimeout(timer); reject(error); }
            };
            this.waiters.push(waiter);
        });
    }

    _remove(waiter) {
        this.waiters = this.waiters.filter((item) => item !== waiter);
    }

    _settle(error) {
        if (this._masterTimer) {
            clearTimeout(this._masterTimer);
            this._masterTimer = null;
        }
        const waiters = this.waiters;
        this.waiters = [];
        waiters.forEach((waiter) => (error ? waiter.reject(error) : waiter.resolve()));
    }
}

module.exports = {AllohaSession, SourceUnavailableError, desktopUserAgent};
