(function (window) {
    'use strict';

    var CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
    var QUALITY_ORDER = [240, 360, 480, 720, 1080];
    var HLS_QUALITY_MANIFEST_PATTERN = /\/(\d+)\.mp4:hls:manifest\.m3u8(?=$|[?#])/i;
    var cache = {};
    var cacheKeys = [];
    var CACHE_LIMIT = 50;

    function normalizeUrl(url) {
        url = String(url || '').trim();
        if (!url) return '';
        if (url.indexOf('//') === 0) return 'https:' + url;
        if (/^https?:\/\//i.test(url)) return url;
        return 'https://' + url.replace(/^\/+/, '');
    }

    function isDirectVideoUrl(url) {
        return /\.(m3u8|mp4|webm)(?:[?#].*)?$/i.test(String(url || ''));
    }

    function isKodikUrl(url) {
        return /kodik/i.test(String(url || ''));
    }

    function originOf(url) {
        var match = String(url || '').match(/^(https?:\/\/[^/]+)/i);
        return match ? match[1] : '';
    }

    function sameOriginPath(origin, src) {
        if (!src) return '';
        if (src.indexOf('//') === 0) return 'https:' + src;
        if (/^https?:\/\//i.test(src)) return src;
        if (src.charAt(0) === '/') return origin.replace(/\/$/, '') + src;
        return origin.replace(/\/$/, '') + '/' + src;
    }

    function requestText(url, options) {
        options = options || {};
        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timeout = Number((window.LampaYaniConfig && LampaYaniConfig.requestTimeout) || 15000);
        var timer = setTimeout(function () { if (controller) controller.abort(); }, timeout);
        var headers = Object.assign({
            'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
            'User-Agent': CHROME_UA
        }, options.headers || {});
        if (options.referer) headers.Referer = options.referer;
        var requestOptions = {
            method: options.method || 'GET',
            headers: headers,
            body: options.body,
            credentials: options.credentials || 'include'
        };
        if (controller) requestOptions.signal = controller.signal;
        return fetch(url, requestOptions).then(function (response) {
            clearTimeout(timer);
            if (!response.ok) {
                var error = new Error('HTTP ' + response.status);
                error.status = response.status;
                throw error;
            }
            return response.text();
        }).catch(function (error) {
            clearTimeout(timer);
            throw error;
        });
    }

    function atobSafe(value) {
        try {
            return window.atob(value);
        } catch (ignore) {
            return '';
        }
    }

    function decodeKodikSrc(src) {
        if (!src) return '';
        if (src.indexOf('//') >= 0) return src;
        try {
            var rotated = String(src).split('').map(function (char) {
                if (!/[a-z]/i.test(char)) return char;
                var code = char.charCodeAt(0) + 18;
                var limit = char <= 'Z' ? 90 : 122;
                return String.fromCharCode(code <= limit ? code : code - 26);
            }).join('');
            rotated += '='.repeat((4 - rotated.length % 4) % 4);
            return atobSafe(rotated);
        } catch (ignore) {
            return '';
        }
    }

    function fixProtocol(url) {
        url = String(url || '');
        if (url.indexOf('//') === 0) return 'https:' + url;
        if (/^https?:\/\//i.test(url)) return url;
        return url ? 'https://' + url : '';
    }

    function hlsManifestQuality(url) {
        var match = HLS_QUALITY_MANIFEST_PATTERN.exec(String(url || ''));
        return match ? Number(match[1]) : 0;
    }

    function replaceHlsManifestQuality(url, quality) {
        return String(url || '').replace(HLS_QUALITY_MANIFEST_PATTERN, '/' + quality + '.mp4:hls:manifest.m3u8');
    }

    function headOk(url) {
        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timer = setTimeout(function () { if (controller) controller.abort(); }, 5000);
        var options = {
            method: 'HEAD',
            headers: {'User-Agent': CHROME_UA},
            credentials: 'omit'
        };
        if (controller) options.signal = controller.signal;
        return fetch(url, options).then(function (response) {
            clearTimeout(timer);
            return response.ok;
        }).catch(function () {
            clearTimeout(timer);
            return false;
        });
    }

    function resolveQualityStreamUrl(url, expectedQuality) {
        var actualQuality = hlsManifestQuality(url);
        if (!actualQuality || actualQuality === expectedQuality) {
            return Promise.resolve({label: expectedQuality + 'p', url: url});
        }
        if (expectedQuality <= actualQuality) {
            return Promise.resolve({label: actualQuality + 'p', url: url});
        }
        var repairedUrl = replaceHlsManifestQuality(url, expectedQuality);
        if (repairedUrl === url) return Promise.resolve({label: actualQuality + 'p', url: url});
        return headOk(repairedUrl).then(function (ok) {
            return ok ? {label: expectedQuality + 'p', url: repairedUrl} : {label: actualQuality + 'p', url: url};
        });
    }

    function parseQualityMap(responseText) {
        var json;
        try {
            json = JSON.parse(responseText);
        } catch (ignore) {
            return Promise.resolve(null);
        }
        var links = json && json.links;
        if (!links) return Promise.resolve(null);
        var qualities = {};
        var tasks = QUALITY_ORDER.map(function (quality) {
            var list = links[String(quality)];
            var src = Array.isArray(list) && list[0] && list[0].src;
            if (!src) return null;
            var decoded = fixProtocol(decodeKodikSrc(src));
            if (!decoded) return null;
            return resolveQualityStreamUrl(decoded, quality).then(function (result) {
                if (result && result.url && !qualities[result.label]) qualities[result.label] = result.url;
            });
        }).filter(Boolean);
        return Promise.all(tasks).then(function () {
            return Object.keys(qualities).length ? qualities : null;
        });
    }

    function extractFirst(regex, text) {
        var match = regex.exec(text);
        return match ? match[1] : '';
    }

    function extractEndpointPath(playerScript) {
        var regex = /atob\("([A-Za-z0-9+/=]+)"\)/g;
        var match;
        while ((match = regex.exec(playerScript))) {
            var decoded = atobSafe(match[1]);
            if (decoded && decoded.charAt(0) === '/' && decoded.indexOf('//') !== 0 && decoded.length <= 10) return decoded;
        }
        return '/ftor';
    }

    function cacheResult(key, result) {
        if (!key || !result) return result;
        delete cache[key];
        cache[key] = {time: Date.now(), result: result};
        cacheKeys = cacheKeys.filter(function (item) { return item !== key; });
        cacheKeys.push(key);
        while (cacheKeys.length > CACHE_LIMIT) delete cache[cacheKeys.shift()];
        return result;
    }

    function cached(key) {
        var item = cache[key];
        if (!item || Date.now() - item.time > 10 * 60 * 1000) return null;
        return item.result;
    }

    function resolveKodik(iframeUrl) {
        var fullUrl = normalizeUrl(iframeUrl);
        var hit = cached(fullUrl);
        if (hit) return Promise.resolve(hit);
        return requestText(fullUrl, {referer: 'https://yani.tv/'}).then(function (html) {
            var flat = String(html || '').replace(/[\n\r]/g, '');
            var urlParamsStr = extractFirst(/\burlParams\s*=\s*'([^']+)'/, flat);
            var type = extractFirst(/\b(?:videoInfo|vInfo)\.type\s*=\s*'([^']+)'/, flat);
            var hash = extractFirst(/\b(?:videoInfo|vInfo)\.hash\s*=\s*'([^']+)'/, flat);
            var id = extractFirst(/\b(?:videoInfo|vInfo)\.id\s*=\s*'([^']+)'/, flat);
            var playerSrc = extractFirst(/src="((?:(?:https?:)?\/\/[^"]+)?\/assets\/js\/app\.player_single[^"]+)"/, flat);
            if (!urlParamsStr || !type || !hash || !id || !playerSrc) throw new Error('Kodik player data not found');

            var iframeOrigin = originOf(fullUrl);
            var playerScriptUrl = sameOriginPath(iframeOrigin, playerSrc);
            var playerOrigin = playerScriptUrl.split('/assets/js/')[0] || iframeOrigin;
            var urlParams = JSON.parse(urlParamsStr);
            return requestText(playerScriptUrl, {referer: fullUrl}).then(function (playerScript) {
                var endpointUrl = playerOrigin + extractEndpointPath(playerScript);
                var body = [
                    ['d', urlParams.d],
                    ['d_sign', urlParams.d_sign],
                    ['pd', urlParams.pd],
                    ['pd_sign', urlParams.pd_sign],
                    ['ref', urlParams.ref],
                    ['ref_sign', urlParams.ref_sign],
                    ['bad_user', 'true'],
                    ['cdn_is_working', 'true'],
                    ['type', type],
                    ['hash', hash],
                    ['id', id],
                    ['info', '{}']
                ].map(function (pair) {
                    var value = pair[0] === 'ref' ? String(pair[1] || '') : encodeURIComponent(String(pair[1] || ''));
                    return pair[0] + '=' + value;
                }).join('&');
                return requestText(endpointUrl, {
                    method: 'POST',
                    body: body,
                    referer: fullUrl,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
            });
        }).then(parseQualityMap).then(function (qualities) {
            if (!qualities) throw new Error('Kodik stream links not found');
            var labels = Object.keys(qualities);
            var label = labels[labels.length - 1];
            return cacheResult(fullUrl, {url: qualities[label], quality: label, qualities: qualities, source: 'kodik'});
        });
    }

    function resolve(url) {
        url = normalizeUrl(url);
        if (!url) return Promise.reject(new Error('Empty stream URL'));
        if (isDirectVideoUrl(url)) return Promise.resolve({url: url, source: 'direct'});
        if (isKodikUrl(url)) return resolveKodik(url);
        return Promise.reject(new Error('Unsupported player URL'));
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.StreamResolver = window.LampaYaniStreamResolver = {
        canResolve: function (url) { return isDirectVideoUrl(url) || isKodikUrl(url); },
        resolve: resolve,
        isDirectVideoUrl: isDirectVideoUrl
    };
}(window));
