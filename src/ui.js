(function (window) {
    'use strict';

    window.LampaYani = {
        register: function () {
            if (!window.Lampa || !Lampa.Menu || !Lampa.Menu.addButton) {
                console.error('[Lampa Yani] Unsupported Lampa version');
                return;
            }

            Lampa.Menu.addButton('icon-yani', 'Anime', function () {
                Lampa.Activity.push({
                    url: 'yani',
                    title: 'Anime',
                    component: 'yani_catalog',
                    params: {limit: 30, sort: 'top', sort_forward: false}
                });
            });

            Lampa.Menu.addButton('icon-filter', 'Genres', function () {
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

            Lampa.Menu.addButton('icon-search', 'Search', function () {
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

            Lampa.Menu.addButton('icon-calendar', 'Schedule', function () {
                Lampa.Activity.push({
                    url: 'yani/schedule',
                    title: 'Schedule',
                    component: 'yani_schedule'
                });
            });

            Lampa.Menu.addButton('icon-star', 'Top Rated', function () {
                Lampa.Activity.push({
                    url: 'yani/top-rated',
                    title: 'Top Rated',
                    component: 'yani_catalog',
                    params: {limit: 30, sort: 'rating', sort_forward: false}
                });
            });

            Lampa.Menu.addButton('icon-user', 'Yani Account', function () {
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
                        var query = data.title || data.name;
                        if (query && Lampa.Search && Lampa.Search.open) Lampa.Search.open(query);
                    };
                    card.onMenu = function () {
                        if (!LampaYaniAuth.token()) {
                            Lampa.Noty.show('Сначала войдите в Yani Account');
                            return;
                        }
                        if (!data.yani_id) return;
                        Lampa.Select.show({
                            title: 'Оценка Yani',
                            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (value) {
                                return {title: value + '/10', value: value};
                            }),
                            onSelect: function (item) {
                                LampaYaniApi.rate(data.yani_id, item.value).then(function () {
                                    Lampa.Noty.show('Оценка сохранена');
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
}(window));
