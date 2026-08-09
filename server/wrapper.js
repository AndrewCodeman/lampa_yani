'use strict';

// Page injected into a headless browser to open an Alloha playback session.
//
// The wrapper is served from Alloha's own origin (see alloha-session.js), which
// is what makes `iframe.contentWindow` reachable from here: the player page and
// this document are same-origin, so its XMLHttpRequest/fetch/WebSocket can be
// instrumented. Everything the CDN needs to authorize a stream is only ever
// produced inside that player:
//
//   * `/bnsi/` returns the quality ladder,
//   * the manifest requires an `authorizations` header and a rotating
//     `accepts-controls` token (`edge_hash`) delivered over WebSocket,
//   * the token in a master.m3u8 path is single-use, so the player's own
//     request for it must be withheld and left for the proxy to spend.
//
// The technique follows the reference Android implementation in YummyTV
// (feature/player/data/.../AllohaExtractor.kt).

function escapeHtml(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function wrapperHtml(iframeUrl) {
    return `<!doctype html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;background:#000">
<iframe id="alloha" src="${escapeHtml(iframeUrl)}" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; encrypted-media"></iframe>
<script>
(function () {
    function bridge(type, payload) {
        try { window.yaniBridge(type, payload || {}); } catch (error) {}
    }
    function markVisible(target) {
        try {
            Object.defineProperty(target, 'visibilityState', {get: function () { return 'visible'; }});
            Object.defineProperty(target, 'hidden', {get: function () { return false; }});
        } catch (error) {}
    }
    markVisible(document);

    document.getElementById('alloha').onload = function () {
        var frame = this.contentWindow;
        var bnsi = null;
        var headers = {};
        var ready = false;
        var lastMasterUrl = null;
        var lastEdgeHash = null;
        var headerTimer = null;
        var reportedUnavailable = false;
        var unavailablePattern = /озвучка\\s*недоступна/i;

        try { markVisible(frame.document); } catch (error) {}

        function put(name, value) {
            if (!name || !value) return;
            headers[String(name).toLowerCase()] = String(value);
            if (!ready) return;
            if (headerTimer) clearTimeout(headerTimer);
            headerTimer = setTimeout(function () {
                bridge('headers', {headers: headers});
            }, 40);
        }

        function announceReady() {
            if (ready || !bnsi || !headers['authorizations'] || !headers['accepts-controls']) return;
            ready = true;
            bridge('ready', {bnsi: bnsi, headers: headers});
        }

        function isCdnMaster(url) {
            return !!url && url.indexOf('http') === 0 && url.indexOf('master.m3u8') !== -1;
        }

        function reportMaster(url) {
            if (!ready || !isCdnMaster(url) || url === lastMasterUrl) return;
            lastMasterUrl = url;
            bridge('master', {url: url, headers: headers});
        }

        put('origin', frame.location.origin);
        put('referer', frame.location.origin + '/');
        put('user-agent', frame.navigator.userAgent);
        put('accept', '*/*');
        put('sec-fetch-dest', 'empty');
        put('sec-fetch-mode', 'cors');
        put('sec-fetch-site', 'cross-site');

        var open = frame.XMLHttpRequest.prototype.open;
        frame.XMLHttpRequest.prototype.open = function (method, url) {
            this.__yaniUrl = url;
            this.addEventListener('load', function () {
                var requested = this.responseURL || this.__yaniUrl || '';
                if (requested.indexOf('/bnsi/') !== -1) {
                    bnsi = this.responseText;
                    announceReady();
                }
                reportMaster(requested);
            });
            return open.apply(this, arguments);
        };

        var setRequestHeader = frame.XMLHttpRequest.prototype.setRequestHeader;
        frame.XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
            put(name, value);
            announceReady();
            return setRequestHeader.apply(this, arguments);
        };

        // The token baked into a master.m3u8 path is single-use: whoever GETs it
        // first wins and the loser gets 403 token_decrypt. The player's own
        // request would always win the race and burn the token, and its response
        // is unusable to us anyway, so capture the URL and never let the request
        // reach the network - the proxy is the sole consumer.
        var send = frame.XMLHttpRequest.prototype.send;
        frame.XMLHttpRequest.prototype.send = function () {
            var url = this.__yaniUrl || '';
            if (isCdnMaster(url)) {
                reportMaster(url);
                var request = this;
                setTimeout(function () {
                    try {
                        request.dispatchEvent(new Event('error'));
                        request.dispatchEvent(new Event('loadend'));
                    } catch (error) {}
                }, 0);
                return;
            }
            reportMaster(url);
            return send.apply(this, arguments);
        };

        var fetchImpl = frame.fetch;
        frame.fetch = function (input, init) {
            try {
                var url = typeof input === 'string' ? input : (input && input.url) || '';
                if (init && init.headers) {
                    if (typeof init.headers.forEach === 'function') init.headers.forEach(function (value, name) { put(name, value); });
                    else Object.keys(init.headers).forEach(function (name) { put(name, init.headers[name]); });
                }
                announceReady();
                reportMaster(url);
                if (isCdnMaster(url)) {
                    return Promise.reject(new TypeError('alloha: master fetch withheld to preserve the CDN token'));
                }
            } catch (error) {}
            return fetchImpl.apply(this, arguments);
        };

        var NativeSocket = frame.WebSocket;
        var socketSend = NativeSocket.prototype.send;
        var heartbeat = null;
        var startedAt = Date.now();

        function startHeartbeat(socket) {
            if (heartbeat) clearInterval(heartbeat);
            startedAt = Date.now();
            heartbeat = setInterval(function () {
                if (!ready || !socket || socket.readyState !== 1) return;
                try {
                    socketSend.call(socket, JSON.stringify({
                        type: 'playing',
                        current_time: Math.floor((Date.now() - startedAt) / 1000),
                        resolution: '1080',
                        track_id: '1',
                        speed: 1,
                        subtitle: 0,
                        ts: Date.now()
                    }));
                } catch (error) {
                    bridge('log', {message: 'heartbeat failed'});
                }
            }, 25000);
        }

        function hookSocket(socket) {
            if (!socket || socket.__yaniHooked) return socket;
            socket.__yaniHooked = true;
            socket.addEventListener('message', function (event) {
                try {
                    var message = JSON.parse(event.data);
                    if (!message || message.type !== 'config_update' || !message.edge_hash) return;
                    if (message.edge_hash === lastEdgeHash) return;
                    lastEdgeHash = message.edge_hash;
                    put('accepts-controls', message.edge_hash);
                    announceReady();
                    bridge('config', {edgeHash: message.edge_hash, ttl: message.ttl || 120, headers: headers});
                } catch (error) {}
            });
            socket.addEventListener('open', function () { startHeartbeat(socket); });
            socket.addEventListener('close', function () { if (heartbeat) clearInterval(heartbeat); });
            if (socket.readyState === 1) startHeartbeat(socket);
            return socket;
        }

        NativeSocket.prototype.send = function (data) {
            hookSocket(this);
            return socketSend.call(this, data);
        };
        frame.WebSocket = function (url, protocols) {
            return hookSocket(protocols ? new NativeSocket(url, protocols) : new NativeSocket(url));
        };
        frame.WebSocket.prototype = NativeSocket.prototype;
        ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function (name) {
            frame.WebSocket[name] = NativeSocket[name];
        });

        // Keep the player running even after the session is captured: stopping
        // here makes it tear down the WebSocket before it ever fetches its
        // correctly signed master, which leaves only the raw bnsi URL the CDN
        // rejects with 403 token_decrypt.
        setInterval(function () {
            if (!ready && !reportedUnavailable) {
                try {
                    var text = frame.document.body ? frame.document.body.textContent : '';
                    if (text && unavailablePattern.test(text)) {
                        reportedUnavailable = true;
                        bridge('unavailable', {});
                        return;
                    }
                } catch (error) {}
            }
            try {
                var button = frame.document.querySelector('.allplay__play-btn');
                if (button) button.click();
                var video = frame.document.querySelector('video');
                if (video) {
                    video.muted = true;
                    if (video.paused) video.play().catch(function () {});
                }
            } catch (error) {}
        }, 1500);
    };
}());
</script>
</body></html>`;
}

module.exports = {wrapperHtml: wrapperHtml};
