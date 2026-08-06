(function (window) {
    'use strict';

    var config = window.LampaYaniConfig;

    function request(path, options) {
        options = options || {};
        var headers = options.headers || {};

        if (config.applicationHeader) headers['X-Application'] = config.applicationHeader;
        if (!options.publicOnly && LampaYaniAuth && LampaYaniAuth.token()) headers.Authorization = 'Bearer ' + LampaYaniAuth.token();
        headers.Accept = 'application/json';
        headers.Lang = (Lampa.Storage && Lampa.Storage.get('language')) || 'ru';
        if (options.token) headers.Authorization = 'Bearer ' + options.token;

        return fetch(config.apiBase + path, {
            method: options.method || 'GET',
            headers: headers,
            body: options.body
        }).then(function (response) {
            if (!response.ok) throw new Error('Yani API: ' + response.status);
            return response.json();
        });
    }

    window.LampaYaniApi = {
        request: request,
        search: function (query, params) {
            params = params || {};
            params.q = query || undefined;
            params.limit = params.limit || 20;
            return request('/anime?' + new URLSearchParams(params));
        },
        catalog: function (params) {
            return request('/anime?' + new URLSearchParams(params || {limit: 20}));
        },
        normalize: function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            if (Array.isArray(response)) return response;
            return response && (response.anime || response.results || response.items || response.data) || [];
        },
        genres: function () {
            return request('/anime/genres');
        },
        schedule: function (params) {
            return request('/anime/schedule?' + new URLSearchParams(params || {}));
        },
        detail: function (id) {
            return request('/anime/' + encodeURIComponent(id));
        },
        trailers: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/trailers');
        },
        recommendations: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/recommendations');
        },
        rate: function (id, value) {
            return request('/anime/' + encodeURIComponent(id) + '/rate', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({rate: value})
            });
        },
        removeRate: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/rate', {method: 'DELETE'});
        },
        health: function () {
            return request('/anime?limit=1', {publicOnly: true});
        }
    };
}(window));
