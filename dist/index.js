function pluginYummyAnime() {
    if (window.plugin_yummy_anime_ready) return;
    window.plugin_yummy_anime_ready = true;

    if (window.Lampa && Lampa.Manifest) {
        Lampa.Manifest.plugins = {
            type: 'other',
            version: '0.1.0',
            name: 'YummyAnime',
            description: 'YummyAnime catalog, ratings, lists and account integration'
        };
    }

    var style = document.createElement('style');
    style.textContent = ".yani-catalog {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 1rem;\n}\n\n.icon-yani {\n    width: 2.4em;\n    height: 2.4em;\n    background: center / contain no-repeat url('./assets/yummyanime.svg');\n}\n";
    document.head.appendChild(style);

(function (window) {
    'use strict';

    window.LampaYaniConfig = {
        version: '0.1.0',
        apiBase: 'https://api.yani.tv',
        applicationHeader: 'p6_gpujl6d3pho8n', // Public Yani application token
        cacheTtl: 300000
    };
}(window));

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
            return fetch('https://api.yani.tv/profile/token', {
                headers: {
                    'X-Application': LampaYaniConfig.applicationHeader,
                    Authorization: 'Bearer ' + this.token()
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
            return fetch('https://api.yani.tv/profile/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'X-Application': LampaYaniConfig.applicationHeader},
                body: JSON.stringify({login: login, password: password})
            }).then(function (response) {
                if (!response.ok) throw new Error('Login failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                var data = payload.response || payload;
                LampaYaniAuth.save({token: data.token || data.access_token || data, refreshed_at: Date.now(), login: login});
                return data;
            });
        }
    };
}(window));

(function (window) {
    'use strict';

    var config = window.LampaYaniConfig;

    function request(path, options) {
        options = options || {};
        var headers = options.headers || {};
        var cacheKey = 'lampa_yummyanime_cache_' + path;
        var cacheTtl = config.cacheTtl || 300000;

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
        }).then(function (payload) {
            if ((options.method || 'GET') === 'GET' && window.Lampa && Lampa.Storage) {
                Lampa.Storage.set(cacheKey, JSON.stringify({time: Date.now(), data: payload}));
            }
            return payload;
        }).catch(function (error) {
            if ((options.method || 'GET') === 'GET' && window.Lampa && Lampa.Storage) {
                try {
                    var cached = JSON.parse(Lampa.Storage.get(cacheKey, 'null'));
                    if (cached && Date.now() - cached.time < cacheTtl) return cached.data;
                } catch (ignore) {}
            }
            throw error;
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
        addFavorite: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/list/fav', {method: 'PUT'});
        },
        removeFavorite: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/list/fav', {method: 'DELETE'});
        },
        addToList: function (id, list) {
            return request('/anime/' + encodeURIComponent(id) + '/list', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({list: list})
            });
        },
        comments: function (id) {
            return request('/comments/anime/' + encodeURIComponent(id));
        },
        health: function () {
            return request('/anime?limit=1', {publicOnly: true});
        }
    };
}(window));

(function (window) {
    'use strict';

    window.LampaYaniCatalog = {
        search: function (query, params) {
            return window.LampaYaniApi.search(query, params);
        }
    };
}(window));

(function (window) {
    'use strict';

    window.LampaYani = {
        register: function () {
            if (!window.Lampa || !Lampa.Menu || !Lampa.Menu.addButton) {
                console.error('[Lampa Yani] Unsupported Lampa version');
                return;
            }

            var yummyIcon = '<svg viewBox="0 0 20 20"><path fill="currentColor" d="M18.45 0H1.55A1.55 1.55 0 000 1.55v16.9A1.54 1.54 0 001.55 20h16.9A1.55 1.55 0 0020 18.45V1.55A1.54 1.54 0 0018.45 0Zm-2.83 5.93-2.1 2.66-2.3-5.43a6.95 6.95 0 014.4 2.77Zm-2.9 6.57h-4l2.03-4.8 1.98 4.8Zm-2.37-9.34L7.8 9.06 4.87 5.33c.64-.7 1.4-1.26 2.27-1.65a8.18 8.18 0 013.2-.52ZM3.57 7.39l3.2 4.06-1.56 3.58A6.96 6.96 0 013.57 7.39Zm6.57 9.56c-1.05.01-2.1-.2-3.05-.65l.76-1.8h5.7l.49 1.15a6.93 6.93 0 01-3.9 1.3Zm6.8-7.07a7.8 7.8 0 01-1.17 4L14.55 11l2.17-2.77c.14.54.21 1.1.23 1.65Z"/></svg>';
            var sprite = function (name) { return '<svg><use xlink:href="#sprite-' + name + '"></use></svg>'; };

            try {
                addSettings();
            } catch (settingsError) {
                console.error('[YummyAnime] Settings registration failed', settingsError);
            }
            var account = LampaYaniAuth.get();
            if (account.token && (!account.refreshed_at || Date.now() - account.refreshed_at > 2 * 24 * 60 * 60 * 1000)) {
                LampaYaniAuth.refresh().catch(function () { console.warn('[YummyAnime] Token refresh failed'); });
            }

            Lampa.Menu.addButton(yummyIcon, 'YummyAnime', function () {
                Lampa.Activity.push({
                    url: 'yani',
                    title: 'Anime',
                    component: 'yani_catalog',
                    params: {limit: 30, sort: 'top', sort_forward: false}
                });
            });

            Lampa.Menu.addButton(sprite('filter'), 'YummyAnime Genres', function () {
                LampaYaniApi.genres().then(function (payload) {
                    var genres = LampaYaniApi.normalize(payload);
                    if (!genres.length) return Lampa.Noty.show('Жанры не найдены');
                    Lampa.Select.show({
                        title: 'Genres',
                        items: genres.map(function (genre) {
                            return {title: genre.title || genre.name, value: genre.id || genre.alias};
                        }),
                        onSelect: function (item) {
                            Lampa.Activity.push({
                                url: 'yani/genre/' + item.value,
                                title: item.title,
                                component: 'yani_catalog',
                                params: {limit: 30, genres: item.value}
                            });
                        }
                    });
                }).catch(function () {
                    Lampa.Noty.show('Не удалось загрузить жанры Yani');
                });
            });

            Lampa.Menu.addButton(sprite('search'), 'YummyAnime Search', function () {
                if (!Lampa.Input || !Lampa.Input.show) {
                    return Lampa.Noty.show('Поиск недоступен в этой версии Lampa');
                }

                Lampa.Input.show({
                    title: 'Search Anime',
                    value: '',
                    onBack: function () { Lampa.Controller.toggle('menu'); },
                    onEnter: function (query) {
                        query = (query || '').trim();
                        if (!query) return;
                        Lampa.Activity.push({
                            url: 'yani/search/' + encodeURIComponent(query),
                            title: query,
                            component: 'yani_catalog',
                            params: {q: query, limit: 30}
                        });
                    }
                });
            });

            Lampa.Menu.addButton(sprite('calendar'), 'YummyAnime Schedule', function () {
                Lampa.Activity.push({
                    url: 'yani/schedule',
                    title: 'Schedule',
                    component: 'yani_schedule'
                });
            });

            Lampa.Menu.addButton(sprite('favorite'), 'YummyAnime Top Rated', function () {
                Lampa.Activity.push({
                    url: 'yani/top-rated',
                    title: 'Top Rated',
                    component: 'yani_catalog',
                    params: {limit: 30, sort: 'rating', sort_forward: false}
                });
            });

            Lampa.Menu.addButton(sprite('person'), 'YummyAnime Account', function () {
                var auth = LampaYaniAuth.get();
                if (auth.token) {
                    Lampa.Select.show({title: 'Yani Account', items: [{title: 'Log out'}], onSelect: function () {
                        LampaYaniAuth.clear();
                        Lampa.Noty.show('Вы вышли из Yani');
                    }});
                    return;
                }
                Lampa.Input.show({title: 'Yani Login', value: '', onEnter: function (login) {
                    Lampa.Input.show({title: 'Yani Password', value: '', onEnter: function (password) {
                        LampaYaniAuth.login(login, password).then(function () {
                            Lampa.Noty.show('Вход в Yani выполнен');
                        }).catch(function () { Lampa.Noty.show('Ошибка входа в Yani'); });
                    }});
                }});
            });

            Lampa.Component.add('yani_catalog', function (object) {
                var comp = new Lampa.InteractionCategory(object);
                comp.create = function () {
                    var self = this;
                    this.activity.loader(true);
                    LampaYaniApi.catalog(object.params || {limit: 30, sort: 'top', sort_forward: false})
                        .then(function (payload) {
                            var results = LampaYaniApi.normalize(payload).map(toCard);
                            self.build({results: results, title: 'Anime'});
                            self.activity.loader(false);
                            self.activity.toggle();
                        })
                        .catch(function (error) {
                            console.error('[Lampa Yani]', error);
                            self.activity.loader(false);
                            Lampa.Noty.show('Не удалось загрузить каталог Yani');
                        });
                };
                comp.cardRender = function (data, element, card) {
                    card.onEnter = function () {
                        if (!data.yani_id) return;
                        Promise.all([
                            LampaYaniApi.detail(data.yani_id),
                            LampaYaniApi.trailers(data.yani_id).catch(function () { return {}; }),
                            LampaYaniApi.recommendations(data.yani_id).catch(function () { return {}; })
                        ]).then(function (parts) {
                            var payload = parts[0];
                            var detail = payload.response || payload;
                            var cardData = toCard(detail.anime || detail);
                            cardData.yani_id = data.yani_id;
                            cardData.trailers = LampaYaniApi.normalize(parts[1]);
                            cardData.recommendations = LampaYaniApi.normalize(parts[2]);
                            Lampa.Activity.push({
                                url: 'yani/detail/' + data.yani_id,
                                title: cardData.title,
                                component: 'full',
                                card_data: cardData
                            });
                        }).catch(function () {
                            var query = data.title || data.name;
                            if (query && Lampa.Search && Lampa.Search.open) Lampa.Search.open(query);
                        });
                    };
                    card.onMenu = function () {
                        if (!LampaYaniAuth.token()) {
                            Lampa.Noty.show('Сначала войдите в Yani Account');
                            return;
                        }
                        if (!data.yani_id) return;
                        Lampa.Select.show({
                            title: 'Оценка Yani',
                            items: [{title: 'Add to Favorites', action: 'favorite'}, {title: 'Watching', action: 'watching'}, {title: 'Completed', action: 'completed'}, {title: 'Planned', action: 'planned'}, {title: 'Comments', action: 'comments'}].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (value) {
                                return {title: value + '/10', value: value};
                            })),
                            onSelect: function (item) {
                                if (item.action === 'comments') return commentsMenu(data.yani_id);
                                var action = item.action === 'favorite' ? LampaYaniApi.addFavorite(data.yani_id) : item.action ? LampaYaniApi.addToList(data.yani_id, item.action) : LampaYaniApi.rate(data.yani_id, item.value);
                                action.then(function () {
                                    Lampa.Noty.show('Изменения сохранены в YummyAnime');
                                }).catch(function (error) {
                                    console.error('[Lampa Yani]', error);
                                    Lampa.Noty.show('Не удалось сохранить оценку');
                                });
                            }
                        });
                    };
                };
                return comp;
            });

            Lampa.Component.add('yani_schedule', function (object) {
                var comp = new Lampa.InteractionCategory(object);
                comp.create = function () {
                    var self = this;
                    this.activity.loader(true);
                    LampaYaniApi.schedule({}).then(function (payload) {
                        var results = LampaYaniApi.normalize(payload).map(toCard);
                        self.build({results: results, title: 'Schedule'});
                        self.activity.loader(false);
                        self.activity.toggle();
                    }).catch(function (error) {
                        console.error('[Lampa Yani]', error);
                        self.activity.loader(false);
                        Lampa.Noty.show('Не удалось загрузить расписание Yani');
                    });
                };
                return comp;
            });

            console.log('[Lampa Yani] Extension registered');
        }
    };

    function toCard(item) {
        var title = item.title || item.name || item.russian || item.original_title || 'Без названия';
        var poster = item.cover || item.image || item.poster_url || '';
        if (!poster && item.poster) poster = item.poster.fullsize || item.poster.medium || item.poster.original || '';
        return {
            title: title,
            original_title: item.original_title || item.japanese || title,
            poster: poster,
            img: poster,
            release_date: String(item.year || item.release_year || ''),
            vote_average: item.rating || item.score || item.rating_score || 0,
            vote_count: item.rating_counters || item.votes || item.vote_count || 0,
            yani_rating: item.rating || item.score || item.rating_score || 0,
            overview: item.description || item.synopsis || '',
            yani_id: item.id
        };
    }

    function addSettings() {
        if (!Lampa.SettingsApi || !Lampa.SettingsApi.addComponent) return;

        Lampa.SettingsApi.addComponent({
            component: 'yani',
            icon: '<div class="icon-yani"></div>',
            name: 'YummyAnime Settings'
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_api_check', type: 'trigger', default: false},
            field: {name: 'Check Yani API', description: 'Проверить доступность API'},
            onChange: function () {
                LampaYaniApi.health().then(function () {
                    Lampa.Noty.show('Yani API работает');
                }).catch(function (error) {
                    console.error('[Lampa Yani]', error);
                    Lampa.Noty.show('Yani API недоступен или токен неверный');
                });
            }
        });
    }

    function commentsMenu(id) {
        LampaYaniApi.comments(id).then(function (payload) {
            var comments = LampaYaniApi.normalize(payload);
            var items = comments.map(function (comment) {
                return {title: comment.text || comment.body || 'Comment'};
            });
            Lampa.Select.show({title: 'YummyAnime Comments', items: items});
        }).catch(function () { Lampa.Noty.show('Не удалось загрузить комментарии'); });
    }
}(window));

    var init = function () {
        try {
            window.LampaYani.register();
        } catch (error) {
            console.error('[YummyAnime] Plugin initialization failed', error);
            if (window.Lampa && Lampa.Noty && Lampa.Noty.show) {
                Lampa.Noty.show('YummyAnime: ' + (error.message || error));
            }
        }
    };
    if (window.appready) init();
    else if (window.Lampa && Lampa.Listener && Lampa.Listener.follow) {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') init();
        });
    }
}

if (!window.plugin_yummy_anime_ready) pluginYummyAnime();
