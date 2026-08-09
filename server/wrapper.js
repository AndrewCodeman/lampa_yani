'use strict';

// The two pieces of page-side code an Alloha session needs.
//
// Everything that can be observed from the driver - request URLs and headers,
// response bodies, WebSocket frames - is observed there (see alloha-session.js).
// Only what has to run *inside* the page is here:
//
//   * the wrapper document, because the player refuses to run outside an iframe;
//   * an init script that keeps the offscreen player playing and keeps its
//     WebSocket alive, since the session token stops rotating the moment the
//     player stops.
//
// The init script is installed before any page script runs and applies to every
// frame, so it is in place before the player issues its first request.

function escapeHtml(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function wrapperHtml(iframeUrl) {
    return `<!doctype html>
<html><head><meta charset="utf-8"><title>yani</title></head>
<body style="margin:0;background:#000">
<iframe id="alloha" src="${escapeHtml(iframeUrl)}" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; encrypted-media"></iframe>
</body></html>`;
}

// Runs in every frame before the page's own scripts.
function initScript() {
    return `(function () {
    try {
        Object.defineProperty(document, 'visibilityState', {get: function () { return 'visible'; }});
        Object.defineProperty(document, 'hidden', {get: function () { return false; }});
    } catch (error) {}

    var NativeSocket = window.WebSocket;
    if (NativeSocket) {
        var nativeSend = NativeSocket.prototype.send;
        var heartbeat = null;
        var startedAt = Date.now();

        var hook = function (socket) {
            if (!socket || socket.__yaniHooked) return socket;
            socket.__yaniHooked = true;
            var start = function () {
                if (heartbeat) clearInterval(heartbeat);
                startedAt = Date.now();
                // Alloha stops issuing config_update - and with it the rotating
                // token the CDN checks - as soon as it stops hearing from a
                // playing client.
                heartbeat = setInterval(function () {
                    if (socket.readyState !== 1) return;
                    try {
                        nativeSend.call(socket, JSON.stringify({
                            type: 'playing',
                            current_time: Math.floor((Date.now() - startedAt) / 1000),
                            resolution: '1080',
                            track_id: '1',
                            speed: 1,
                            subtitle: 0,
                            ts: Date.now()
                        }));
                    } catch (error) {}
                }, 25000);
            };
            socket.addEventListener('open', start);
            socket.addEventListener('close', function () { if (heartbeat) clearInterval(heartbeat); });
            if (socket.readyState === 1) start();
            return socket;
        };

        NativeSocket.prototype.send = function (data) {
            hook(this);
            return nativeSend.call(this, data);
        };

        window.WebSocket = function (url, protocols) {
            return hook(protocols ? new NativeSocket(url, protocols) : new NativeSocket(url));
        };
        window.WebSocket.prototype = NativeSocket.prototype;
        ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function (name) {
            window.WebSocket[name] = NativeSocket[name];
        });
    }

    // The player is never on screen here, and a player that pauses stops
    // refreshing the master URL the proxy depends on.
    setInterval(function () {
        try {
            var button = document.querySelector('.allplay__play-btn');
            if (button) button.click();
            var video = document.querySelector('video');
            if (video) {
                video.muted = true;
                if (video.paused) video.play().catch(function () {});
            }
        } catch (error) {}
    }, 1500);
}());`;
}

module.exports = {wrapperHtml: wrapperHtml, initScript: initScript};
