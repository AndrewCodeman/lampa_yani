(function (window) {
    'use strict';

    var key = 'lampa_yani_auth';

    window.LampaYaniAuth = {
        get: function () {
            try { return JSON.parse(Lampa.Storage.get(key, '{}')); } catch (e) { return {}; }
        },
        token: function () { return this.get().token || ''; },
        save: function (data) { Lampa.Storage.set(key, JSON.stringify(data || {})); },
        clear: function () { Lampa.Storage.set(key, '{}'); },
        login: function (login, password) {
            return fetch('https://api.yani.tv/profile/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'X-Application': LampaYaniConfig.applicationHeader},
                body: JSON.stringify({login: login, password: password})
            }).then(function (response) {
                if (!response.ok) throw new Error('Login failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                var data = payload.response || payload;
                LampaYaniAuth.save(data);
                return data;
            });
        }
    };
}(window));
