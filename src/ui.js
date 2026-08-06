(function (window) {
    'use strict';

    window.LampaYani = {
        register: function () {
            if (!window.Lampa || !Lampa.Menu || !Lampa.Menu.addButton) {
                console.error('[Lampa Yani] Unsupported Lampa version');
                return;
            }

            Lampa.Menu.addButton('icon-star', 'Anime', function () {
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
                };
                return comp;
            });

            console.log('[Lampa Yani] Extension registered');
        }
    };

    function toCard(item) {
        var title = item.title || item.name || item.russian || item.original_title || 'Без названия';
        var poster = item.cover || item.poster || item.image || item.poster_url || '';
        return {
            title: title,
            original_title: item.original_title || item.japanese || title,
            poster: poster,
            img: poster,
            release_date: String(item.year || item.release_year || ''),
            vote_average: item.rating || item.score || item.rating_score || 0,
            overview: item.description || item.synopsis || '',
            yani_id: item.id
        };
    }
}(window));
