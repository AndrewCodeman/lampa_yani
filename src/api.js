(function (window) {
    'use strict';

    var config = window.LampaYaniConfig;
    var pendingRequests = {};

    function sleep(milliseconds) {
        return new Promise(function (resolve) { setTimeout(resolve, milliseconds); });
    }

    function fetchWithRetry(url, options, canRetry) {
        var retries = canRetry ? Number(config.requestRetries || 0) : 0;
        var timeout = Number(config.requestTimeout || 15000);
        function attempt(number) {
            var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
            var requestOptions = Object.assign({}, options);
            if (controller) requestOptions.signal = controller.signal;
            var timer;
            var timeoutPromise = new Promise(function (resolve, reject) {
                timer = setTimeout(function () {
                    if (controller) controller.abort();
                    reject(new Error('YummyAnime request timeout'));
                }, timeout);
            });
            return Promise.race([fetch(url, requestOptions), timeoutPromise]).then(function (response) {
                clearTimeout(timer);
                var retryableStatus = response.status === 408 || response.status === 425 || response.status === 429 || response.status >= 500;
                if (!response.ok && retryableStatus && number < retries) {
                    return sleep(Math.pow(2, number) * 400).then(function () { return attempt(number + 1); });
                }
                return response;
            }).catch(function (error) {
                clearTimeout(timer);
                var aborted = error && error.name === 'AbortError';
                if (number < retries && !aborted) return sleep(Math.pow(2, number) * 400).then(function () { return attempt(number + 1); });
                throw error;
            });
        }
        return attempt(0);
    }

    function rememberCacheKey(key) {
        if (!window.Lampa || !Lampa.Storage) return;
        var indexKey = 'lampa_yummyanime_cache_index';
        var keys = [];
        try { keys = JSON.parse(Lampa.Storage.get(indexKey, '[]')) || []; } catch (ignore) {}
        keys = keys.filter(function (item) { return item !== key; });
        keys.push(key);
        while (keys.length > Number(config.cacheEntries || 80)) {
            var expired = keys.shift();
            try { Lampa.Storage.remove(expired); } catch (ignoreRemove) {}
        }
        Lampa.Storage.set(indexKey, JSON.stringify(keys));
    }

    function request(path, options) {
        options = options || {};
        if (options.auth && !options.authRefreshChecked && window.LampaYaniAuth && LampaYaniAuth.token() && LampaYaniAuth.refreshIfNeeded) {
            var refreshedOptions = Object.assign({}, options, {authRefreshChecked: true});
            return LampaYaniAuth.refreshIfNeeded().then(function () {
                return request(path, refreshedOptions);
            });
        }
        var headers = Object.assign({}, options.headers || {});
        var apiLanguage = window.LampaYaniI18n ? LampaYaniI18n.getLanguage() : 'ru';
        var cacheKey = 'lampa_yummyanime_cache_' + apiLanguage + '_' + path;
        var cacheTtl = options.cacheTtl || config.cacheTtl || 300000;
        var method = options.method || 'GET';

        var applicationToken = config.applicationToken ? config.applicationToken() : config.applicationHeader;
        if (applicationToken) headers['X-Application'] = applicationToken;
        if (options.auth && LampaYaniAuth && LampaYaniAuth.token()) headers.Authorization = 'Bearer ' + LampaYaniAuth.token();
        headers.Accept = 'application/json';
        headers.Lang = apiLanguage;
        if (options.token) headers.Authorization = 'Bearer ' + options.token;

        var pendingKey = method === 'GET' && options.dedupe !== false
            ? [apiLanguage, path, options.auth ? 'auth' : 'public', options.token ? 'token' : ''].join('|')
            : '';
        if (pendingKey && pendingRequests[pendingKey]) return pendingRequests[pendingKey];

        var operation = fetchWithRetry(config.apiBase + path, {
            method: method,
            headers: headers,
            body: options.body
        }, method === 'GET').then(function (response) {
            if (!response.ok) throw new Error('YummyAnime API: ' + response.status);
            return response.json();
        }).then(function (payload) {
            if (method === 'GET' && options.cache !== false && window.Lampa && Lampa.Storage) {
                Lampa.Storage.set(cacheKey, JSON.stringify({time: Date.now(), data: payload}));
                rememberCacheKey(cacheKey);
            }
            return payload;
        }).catch(function (error) {
            if (method === 'GET' && options.cache !== false && window.Lampa && Lampa.Storage) {
                try {
                    var cached = JSON.parse(Lampa.Storage.get(cacheKey, 'null'));
                    if (cached && (options.staleFallback || Date.now() - cached.time < cacheTtl)) return cached.data;
                } catch (ignore) {}
            }
            throw error;
        });

        if (!pendingKey) return operation;
        pendingRequests[pendingKey] = operation.then(function (payload) {
            delete pendingRequests[pendingKey];
            return payload;
        }, function (error) {
            delete pendingRequests[pendingKey];
            throw error;
        });
        return pendingRequests[pendingKey];
    }

    function externalRequest(base, path, options) {
        options = options || {};
        var url = base.replace(/\/$/, '') + path;
        return fetchWithRetry(url, {
            method: options.method || 'GET',
            headers: {Accept: 'application/json'}
        }, true).then(function (response) {
            if (!response.ok) throw new Error('External API: ' + response.status);
            return response.json();
        });
    }

    var malTitlesCache = {};

    function malTitles(malId) {
        if (!malId) return Promise.resolve([]);
        var key = String(malId);
        if (malTitlesCache[key]) return malTitlesCache[key];
        malTitlesCache[key] = externalRequest('https://api.jikan.moe/v4', '/anime/' + encodeURIComponent(key) + '/full').then(function (payload) {
            var anime = payload && payload.data || {};
            var titles = [anime.title, anime.title_english, anime.title_japanese].concat(Array.isArray(anime.title_synonyms) ? anime.title_synonyms : []);
            return titles.filter(function (title, index, list) {
                return typeof title === 'string' && title.trim() && list.indexOf(title) === index;
            });
        }).catch(function (error) {
            delete malTitlesCache[key];
            throw error;
        });
        return malTitlesCache[key];
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Api = window.LampaYaniApi = {
        request: request,
        search: function (query, params) {
            params = params || {};
            params.q = query || undefined;
            params.limit = params.limit || 20;
            return request('/anime?' + new URLSearchParams(params), {auth: true});
        },
        catalog: function (params) {
            return request('/anime?' + new URLSearchParams(params || {limit: 20}), {auth: true});
        },
        normalize: function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            if (Array.isArray(response)) return response;
            return response && (response.anime || response.results || response.items || response.data) || [];
        },
        normalizeGenres: function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            if (Array.isArray(response)) return response;
            return response && response.genres || [];
        },
        genres: function () {
            return request('/anime/genres');
        },
        schedule: function () {
            return request('/anime/schedule', {
                cacheTtl: 60 * 60 * 1000,
                staleFallback: true
            });
        },
        episodeInfo: function (malId) {
            if (!malId) return Promise.reject(new Error('MAL id is missing'));
            return externalRequest('https://api.jikan.moe/v4', '/anime/' + encodeURIComponent(malId) + '/episodes').then(function (payload) {
                return {
                    episodes: (payload && payload.data || []).map(function (item) {
                        return {episodeNumber: item.mal_id, title: item.title || item.title_romanji || item.title_japanese || ''};
                    })
                };
            });
        },
        malTitles: malTitles,
        detail: function (id) {
            return request('/anime/' + encodeURIComponent(id), {auth: true});
        },
        videos: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/videos', {auth: true, cache: false});
        },
        subscribeVideo: function (videoId) {
            return request('/video/' + encodeURIComponent(videoId) + '/subscribe', {
                method: 'PUT',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: '{}'
            });
        },
        unsubscribeVideo: function (videoId) {
            return request('/video/' + encodeURIComponent(videoId) + '/subscribe', {
                method: 'DELETE',
                auth: true
            });
        },
        trailers: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/trailers');
        },
        recommendations: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/recommendations');
        },
        collections: function (id, limit, offset) {
            return request('/anime/' + encodeURIComponent(id) + '/collections?limit=' + encodeURIComponent(limit || 10) + '&offset=' + encodeURIComponent(offset || 0));
        },
        ratingBuckets: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/rates', {auth: true});
        },
        listStats: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/lists', {auth: true});
        },
        rate: function (id, value) {
            return request('/anime/' + encodeURIComponent(id) + '/rate', {
                method: 'PUT',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({rate: value})
            });
        },
        removeRate: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/rate', {method: 'DELETE', auth: true});
        },
        addFavorite: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/list/fav', {
                method: 'PUT',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({date: Math.floor(Date.now() / 1000)})
            });
        },
        removeFavorite: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/list/fav', {method: 'DELETE', auth: true});
        },
        addToList: function (id, list) {
            var listIds = {watching: 0, planned: 1, completed: 2, dropped: 3, postponed: 5};
            var listId = typeof list === 'number' ? list : listIds[list];
            if (typeof listId !== 'number') return Promise.reject(new Error('Unknown YummyAnime list: ' + list));
            return request('/anime/' + encodeURIComponent(id) + '/list', {
                method: 'PUT',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({list: listId, date: Math.floor(Date.now() / 1000)})
            });
        },
        removeFromList: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/list', {method: 'DELETE', auth: true});
        },
        comments: function (id, skip) {
            return request('/comments/anime/' + encodeURIComponent(id) + '?limit=20&sort=new&skip=' + encodeURIComponent(skip || 0));
        },
        commentChildren: function (id, skip) {
            return request('/comments/' + encodeURIComponent(id) + '/children?skip=' + encodeURIComponent(skip || 0));
        },
        normalizeComments: function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            if (Array.isArray(response)) return response;
            return response && (response.comments || response.items || response.data) || [];
        },
        profile: function () {
            return request('/profile', {auth: true, cache: false});
        },
        userListStats: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/stats/lists', {auth: true, cache: false});
        },
        userLists: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/lists', {auth: true, cache: false});
        },
        subscriptions: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/lists/subs', {auth: true, cache: false});
        },
        userList: function (id, listId) {
            return request('/users/' + encodeURIComponent(id) + '/lists/' + encodeURIComponent(listId), {auth: true, cache: false});
        },
        userStatsGenres: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/stats/genres', {auth: true, cache: false});
        },
        userStatsRatings: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/stats/ratings', {auth: true, cache: false});
        },
        userStatsTypes: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/stats/types-v2', {auth: true, cache: false});
        },
        userReviews: function (id, limit, offset) {
            return request('/users/' + encodeURIComponent(id) + '/reviews?type=approved&limit=' + encodeURIComponent(limit || 30) + '&offset=' + encodeURIComponent(offset || 0), {auth: true, cache: false});
        },
        notifications: function (limit, offset) {
            return request('/profile/notifications?limit=' + encodeURIComponent(limit || 30) + '&offset=' + encodeURIComponent(offset || 0), {auth: true, cache: false});
        },
        notificationCounts: function () {
            return request('/profile/notifications/counts', {auth: true, cache: false});
        },
        markNotificationRead: function (id) {
            return request('/profile/notifications/' + encodeURIComponent(id) + '/read', {method: 'POST', auth: true, cache: false});
        },
        markAllNotificationsRead: function () {
            return request('/profile/notifications/read', {method: 'POST', auth: true, cache: false, headers: {'Content-Type': 'application/json'}, body: '{}'});
        },
        deleteNotification: function (id) {
            return request('/profile/notifications/' + encodeURIComponent(id), {method: 'DELETE', auth: true, cache: false});
        },
        deleteAllNotifications: function () {
            return request('/profile/notifications', {method: 'DELETE', auth: true, cache: false});
        },
        syncVideoProgress: function (videoId, time, duration) {
            return request('/video/' + encodeURIComponent(videoId), {
                method: 'PUT',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({time: Math.max(0, Number(time) || 0), duration: Math.max(0, Number(duration) || 0), times: []})
            });
        },
        syncVideoWatches: function (videos) {
            return request('/video', {
                method: 'POST',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({videos: videos || []})
            });
        },
        watchHistory: function (limit, offset) {
            return request('/video/watch-history?limit=' + encodeURIComponent(limit || 30) + '&offset=' + encodeURIComponent(offset || 0), {
                auth: true,
                cache: false
            });
        },
        health: function () {
            return request('/anime?limit=1');
        },
        status: function () {
            return fetchWithRetry(config.statusUrl + '?_=' + Date.now(), {cache: 'no-store'}, true).then(function (response) {
                if (!response.ok) throw new Error('YummyStatus snapshot: ' + response.status);
                return response.json();
            })
        }
    };
}(window));
