(function (window) {
    'use strict';

    var key = 'lampa_yani_auth';
    var memory = {};

    function readStored() {
        try {
            var stored = Lampa.Storage.get(key, '{}');
            if (stored && typeof stored === 'object') return stored;
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    }

    function tokenFrom(data) {
        if (typeof data === 'string') return data.trim();
        return data && String(data.token || data.access_token || '').trim();
    }

    function applicationToken() {
        return LampaYaniConfig.applicationToken ? LampaYaniConfig.applicationToken() : LampaYaniConfig.applicationHeader;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Auth = window.LampaYaniAuth = {
        get: function () {
            var stored = readStored();
            return tokenFrom(stored) ? stored : memory;
        },
        token: function () { return tokenFrom(this.get()); },
        save: function (data) {
            var token = tokenFrom(data);
            var previous = readStored();
            if (!token) throw new Error('Login response did not contain a token');
            memory = {
                token: token,
                refreshed_at: data.refreshed_at || Date.now(),
                login: data.login || previous.login || '',
                display_name: data.display_name || data.login || previous.display_name || previous.login || '',
                user_id: Number(data.user_id || data.id || previous.user_id || 0) || 0
            };
            Lampa.Storage.set(key, JSON.stringify(memory));
            return memory;
        },
        clear: function () { memory = {}; Lampa.Storage.set(key, '{}'); },
        refresh: function () {
            if (!this.token()) return Promise.reject(new Error('Not authorized'));
            return fetch(LampaYaniConfig.apiBase + '/profile/token', {
                headers: {
                    'X-Application': applicationToken(),
                    Authorization: 'Bearer ' + this.token(),
                    Accept: 'application/json'
                }
            }).then(function (response) {
                if (!response.ok) throw new Error('Token refresh failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                var current = LampaYaniAuth.get();
                var data = payload.response || payload;
                LampaYaniAuth.save({token: tokenFrom(data), refreshed_at: Date.now(), login: current.login, display_name: current.display_name, user_id: current.user_id});
                return LampaYaniAuth.get();
            });
        },
        login: function (login, password) {
            return fetch(LampaYaniConfig.apiBase + '/profile/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'X-Application': applicationToken(), Accept: 'application/json'},
                body: JSON.stringify({login: login, password: password, need_json: true})
            }).then(function (response) {
                if (!response.ok) throw new Error('Login failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                var data = payload.response || payload;
                LampaYaniAuth.save({token: tokenFrom(data), refreshed_at: Date.now(), login: login, user_id: data.id || data.user_id});
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
                    'X-Application': applicationToken(),
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
