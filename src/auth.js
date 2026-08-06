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
        refresh: function () {
            if (!this.token()) return Promise.reject(new Error('Not authorized'));
            return fetch(LampaYaniConfig.apiBase + '/profile/token', {
                headers: {
                    'X-Application': LampaYaniConfig.applicationHeader,
                    Authorization: 'Bearer ' + this.token(),
                    Accept: 'application/json'
                }
            }).then(function (response) {
                if (!response.ok) throw new Error('Token refresh failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                var current = LampaYaniAuth.get();
                var data = payload.response || payload;
                LampaYaniAuth.save({token: data.token || data.access_token || data, refreshed_at: Date.now(), login: current.login});
                return LampaYaniAuth.get();
            });
        },
        login: function (login, password) {
            return fetch(LampaYaniConfig.apiBase + '/profile/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'X-Application': LampaYaniConfig.applicationHeader, Accept: 'application/json'},
                body: JSON.stringify({login: login, password: password, need_json: true})
            }).then(function (response) {
                if (!response.ok) throw new Error('Login failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                var data = payload.response || payload;
                LampaYaniAuth.save({token: data.token || data.access_token || data, refreshed_at: Date.now(), login: login});
                return data;
            });
        },
        logout: function () {
            var token = this.token();
            if (!token) {
                this.clear();
                return Promise.resolve(true);
            }
            return fetch(LampaYaniConfig.apiBase + '/profile/logout', {
                method: 'POST',
                headers: {
                    'X-Application': LampaYaniConfig.applicationHeader,
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json'
                }
            }).then(function (response) {
                if (!response.ok) throw new Error('Logout failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                LampaYaniAuth.clear();
                return payload.response || payload;
            }).catch(function (error) {
                LampaYaniAuth.clear();
                throw error;
            });
        }
    };
}(window));
