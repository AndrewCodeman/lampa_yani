(function (window) {
    'use strict';

    window.LampaYani = {
        register: function () {
            if (!window.Lampa || !Lampa.Component || !Lampa.Component.add) {
                console.error('[Lampa Yani] Unsupported Lampa version');
                return;
            }

            var yummyIcon = '<svg viewBox="0 0 20 20"><path fill="currentColor" d="M18.45 0H1.55A1.55 1.55 0 000 1.55v16.9A1.54 1.54 0 001.55 20h16.9A1.55 1.55 0 0020 18.45V1.55A1.54 1.54 0 0018.45 0Zm-2.83 5.93-2.1 2.66-2.3-5.43a6.95 6.95 0 014.4 2.77Zm-2.9 6.57h-4l2.03-4.8 1.98 4.8Zm-2.37-9.34L7.8 9.06 4.87 5.33c.64-.7 1.4-1.26 2.27-1.65a8.18 8.18 0 013.2-.52ZM3.57 7.39l3.2 4.06-1.56 3.58A6.96 6.96 0 013.57 7.39Zm6.57 9.56c-1.05.01-2.1-.2-3.05-.65l.76-1.8h5.7l.49 1.15a6.93 6.93 0 01-3.9 1.3Zm6.8-7.07a7.8 7.8 0 01-1.17 4L14.55 11l2.17-2.77c.14.54.21 1.1.23 1.65Z"/></svg>';

            function addInterface() {
                if (!Lampa.Menu || !Lampa.Menu.addButton) return;

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
                    title: 'YummyAnime',
                    component: 'yani_home'
                });
            });

            }

            if (window.appready) addInterface();
            else {
                Lampa.Listener.follow('app', function (event) {
                    if (event.type === 'ready') addInterface();
                });
            }

            Lampa.Component.add('yani_home', Home);

            Lampa.Component.add('yani_catalog', function (object) {
                var comp = new Lampa.InteractionCategory(object);
                var baseParams = copyParams(object.params || {limit: 30, sort: 'top', sort_forward: false});
                var limit = Number(baseParams.limit || 30);
                var maxPages = Math.ceil(20000 / limit) + 1;
                var seen = {};

                object.page = 1;
                baseParams.limit = limit;
                baseParams.offset = Number(baseParams.offset || 0);

                comp.create = function () {
                    var self = this;
                    this.activity.loader(true);
                    LampaYaniApi.catalog(baseParams)
                        .then(function (payload) {
                            var results = mapUniqueCards(LampaYaniApi.normalize(payload), seen);
                            if (results.length < limit) object.page = maxPages;
                            self.build({results: results, total_pages: maxPages, title: 'Anime'});
                        })
                        .catch(function (error) {
                            console.error('[YummyAnime]', error);
                            self.activity.loader(false);
                            Lampa.Noty.show('Не удалось загрузить каталог YummyAnime');
                        });
                };
                comp.nextPageReuest = function (requestObject, resolve, reject) {
                    var params = copyParams(baseParams);
                    params.offset = baseParams.offset + (requestObject.page - 1) * limit;

                    LampaYaniApi.catalog(params).then(function (payload) {
                        var raw = LampaYaniApi.normalize(payload);
                        var results = mapUniqueCards(raw, seen);
                        if (raw.length < limit) requestObject.page = maxPages;
                        resolve({results: results, total_pages: maxPages, title: 'Anime'});
                    }).catch(function (error) {
                        console.error('[YummyAnime]', error);
                        Lampa.Noty.show('Не удалось загрузить следующую страницу YummyAnime');
                        reject(error);
                    });
                };
                comp.cardRender = function (page, element, card) {
                    addCardRatings(element, card);
                    card.onEnter = function () {
                        if (!element.yani_id) return;
                        Lampa.Activity.push({
                            url: 'yani/detail/' + element.yani_id,
                            title: element.title,
                            component: 'yani_detail',
                            card: element
                        });
                    };
                    card.onMenu = function () {
                        if (!LampaYaniAuth.token()) {
                            Lampa.Noty.show('Сначала войдите в Yani Account');
                            return;
                        }
                        if (!element.yani_id) return;
                        Lampa.Select.show({
                            title: 'Оценка Yani',
                            items: [{title: 'Add to Favorites', action: 'favorite'}, {title: 'Watching', action: 'watching'}, {title: 'Completed', action: 'completed'}, {title: 'Planned', action: 'planned'}, {title: 'Comments', action: 'comments'}].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (value) {
                                return {title: value + '/10', value: value};
                            })),
                            onSelect: function (item) {
                                if (item.action === 'comments') return commentsMenu(element.yani_id);
                                var action = item.action === 'favorite' ? LampaYaniApi.addFavorite(element.yani_id) : item.action ? LampaYaniApi.addToList(element.yani_id, item.action) : LampaYaniApi.rate(element.yani_id, item.value);
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

            Lampa.Component.add('yani_schedule', Schedule);

            Lampa.Component.add('yani_detail', Detail);

            installFullRating();

            console.log('[Lampa Yani] Extension registered');
        }
    };

    function Home(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var html = $('<div class="yani-home"></div>');
        var grid = $('<div class="yani-home__grid"></div>');
        var last;

        var items = [
            {title: 'Catalog', icon: '◆', action: function () {
                Lampa.Activity.push({url: 'yani/catalog', title: 'YummyAnime Catalog', component: 'yani_catalog', params: {limit: 30, sort: 'top', sort_forward: false}});
            }},
            {title: 'Genres', icon: '≡', action: openGenres},
            {title: 'Search', icon: '⌕', action: openSearch},
            {title: 'Schedule', icon: '▦', action: function () {
                Lampa.Activity.push({url: 'yani/schedule', title: 'YummyAnime Schedule', component: 'yani_schedule'});
            }},
            {title: 'Top Rated', icon: '★', action: function () {
                Lampa.Activity.push({url: 'yani/top-rated', title: 'YummyAnime Top Rated', component: 'yani_catalog', params: {limit: 30, sort: 'rating', sort_forward: false}});
            }},
            {title: 'Account', icon: '●', action: openAccount}
        ];

        this.create = function () {
            items.forEach(function (item) {
                var button = $('<div class="yani-home__item selector"><div class="yani-home__icon">' + item.icon + '</div><div class="yani-home__title">' + item.title + '</div></div>');
                button.on('hover:focus', function (event) {
                    last = event.target;
                    scroll.update($(event.target), true);
                });
                button.on('hover:enter', item.action);
                grid.append(button);
            });
            scroll.append(grid);
            html.append(scroll.render(true));
            this.activity.loader(false);
            this.activity.toggle();
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { Navigator.move('down'); },
                back: this.back
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function Schedule(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var html = $('<div class="yani-schedule"></div>');
        var content = $('<div class="yani-schedule__content"></div>');
        var last;

        this.create = function () {
            var self = this;
            this.activity.loader(true);

            LampaYaniApi.schedule({}).then(function (payload) {
                var items = LampaYaniApi.normalize(payload);
                renderSchedule(items);
                scroll.append(content);
                html.append(scroll.render(true));
                self.activity.loader(false);
                self.activity.toggle();
            }).catch(function (error) {
                console.error('[YummyAnime]', error);
                self.activity.loader(false);
                Lampa.Noty.show('Не удалось загрузить расписание YummyAnime');
            });
        };

        function renderSchedule(items) {
            var today = new Date();
            today.setHours(0, 0, 0, 0);

            for (var dayOffset = 0; dayOffset < 7; dayOffset++) {
                var day = new Date(today.getTime());
                day.setDate(today.getDate() + dayOffset);
                var nextDay = new Date(day.getTime());
                nextDay.setDate(day.getDate() + 1);

                var releases = items.filter(function (item) {
                    var timestamp = item.episodes && Number(item.episodes.next_date);
                    if (!timestamp) return false;
                    var releaseDate = new Date(timestamp * 1000);
                    return releaseDate >= day && releaseDate < nextDay;
                }).sort(function (a, b) {
                    return Number(a.episodes.next_date) - Number(b.episodes.next_date);
                });

                var section = $('<section class="yani-schedule__day"></section>');
                section.append($('<div class="yani-schedule__day-title"></div>').text(formatScheduleDay(day, dayOffset)));

                if (!releases.length) {
                    section.append('<div class="yani-schedule__empty">Нет запланированных выпусков</div>');
                } else {
                    releases.forEach(function (item) {
                        section.append(createScheduleItem(item));
                    });
                }

                content.append(section);
            }
        }

        function createScheduleItem(item) {
            var card = toCard(item);
            var episodes = item.episodes || {};
            var releaseDate = new Date(Number(episodes.next_date) * 1000);
            var row = $('<div class="yani-schedule__item selector"></div>');
            var poster = $('<img class="yani-schedule__poster" alt="">').attr('src', card.poster || '');
            var info = $('<div class="yani-schedule__info"></div>');
            var release = $('<div class="yani-schedule__release"></div>');

            info.append($('<div class="yani-schedule__title"></div>').text(card.title));
            info.append($('<div class="yani-schedule__episode"></div>').text(formatEpisode(episodes)));
            release.append($('<div class="yani-schedule__time"></div>').text(formatScheduleTime(releaseDate)));
            release.append('<div class="yani-schedule__timezone">местное время</div>');
            row.append(poster, info, release);

            row.on('hover:focus', function (event) {
                last = event.target;
                scroll.update($(event.target), true);
            });
            row.on('hover:enter', function () {
                card.yani_schedule = formatEpisode(episodes) + ', ' + formatScheduleDateTime(releaseDate);
                Lampa.Activity.push({
                    url: 'yani/detail/' + card.yani_id,
                    title: card.title,
                    component: 'yani_detail',
                    card: card
                });
            });

            return row;
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { Navigator.move('down'); },
                back: this.back
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function formatScheduleDay(date, offset) {
        var prefix = offset === 0 ? 'Сегодня, ' : offset === 1 ? 'Завтра, ' : '';
        try {
            return prefix + date.toLocaleDateString('ru-RU', {weekday: 'long', day: 'numeric', month: 'long'});
        } catch (error) {
            return prefix + date.toLocaleDateString();
        }
    }

    function formatScheduleTime(date) {
        try {
            return date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
        } catch (error) {
            return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        }
    }

    function formatScheduleDateTime(date) {
        try {
            return date.toLocaleString('ru-RU', {day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'});
        } catch (error) {
            return date.toLocaleString();
        }
    }

    function formatEpisode(episodes) {
        var aired = Number(episodes.aired || 0);
        var count = Number(episodes.count || 0);
        if (count === 1 && aired === 0) return 'Релиз';
        var next = aired + 1;
        return count > 1 ? 'Серия ' + next + ' из ' + count : 'Серия ' + next;
    }

    function Detail(object) {
        var data = object.card || {};
        var html = $('<div class="yani-detail"></div>');
        var button;

        this.create = function () {
            var self = this;
            this.activity.loader(true);

            if (data.yani_id) {
                LampaYaniApi.detail(data.yani_id).then(function (payload) {
                    var item = payload && payload.response ? payload.response : payload;
                    var detailed = item ? toCard(item) : data;
                    detailed.yani_schedule = data.yani_schedule;
                    renderDetail(detailed);
                    self.activity.loader(false);
                    self.activity.toggle();
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    renderDetail(data);
                    self.activity.loader(false);
                    self.activity.toggle();
                });
            } else {
                renderDetail(data);
                this.activity.loader(false);
                this.activity.toggle();
            }
        };

        function renderDetail(cardData) {
            data = cardData;
            var poster = $('<img class="yani-detail__poster">').attr('src', data.img || data.poster || '');
            var info = $('<div class="yani-detail__info"></div>');
            info.append($('<div class="yani-detail__title"></div>').text(data.title || 'YummyAnime'));
            if (data.release_date) info.append($('<div class="yani-detail__meta"></div>').text(data.release_date));
            info.append(createDetailRatings(data.yani_ratings || [], data.vote_count));
            if (data.yani_schedule) info.append($('<div class="yani-detail__schedule"></div>').text(data.yani_schedule));
            info.append($('<div class="yani-detail__overview"></div>').text(data.overview || ''));
            button = $('<div class="yani-detail__button selector">Открыть в поиске Lampa</div>');
            button.on('hover:enter', function () {
                if (Lampa.Search && Lampa.Search.open) Lampa.Search.open(data.title || '');
                else Lampa.Controller.toggle('search');
            });
            info.append(button);
            html.append(poster, info);
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () { Lampa.Controller.collectionSet(html); Lampa.Controller.collectionFocus(button, html); },
                left: function () { Lampa.Controller.toggle('menu'); },
                up: function () { Lampa.Controller.toggle('head'); },
                back: this.back
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { html.remove(); };
    }

    function openGenres() {
        LampaYaniApi.genres().then(function (payload) {
            var genres = LampaYaniApi.normalize(payload);
            Lampa.Select.show({
                title: 'YummyAnime Genres',
                items: genres.map(function (genre) { return {title: genre.title || genre.name, value: genre.id || genre.alias}; }),
                onSelect: function (item) {
                    Lampa.Activity.push({url: 'yani/genre/' + item.value, title: item.title, component: 'yani_catalog', params: {limit: 30, genres: item.value}});
                }
            });
        }).catch(function () { Lampa.Noty.show('Не удалось загрузить жанры YummyAnime'); });
    }

    function openSearch() {
        if (!Lampa.Input || !Lampa.Input.show) return Lampa.Noty.show('Поиск недоступен в этой версии Lampa');
        Lampa.Input.show({title: 'YummyAnime Search', value: '', onEnter: function (query) {
            query = (query || '').trim();
            if (query) Lampa.Activity.push({url: 'yani/search/' + encodeURIComponent(query), title: query, component: 'yani_catalog', params: {q: query, limit: 30}});
        }});
    }

    function openAccount() {
        var auth = LampaYaniAuth.get();
        if (auth.token) {
            Lampa.Select.show({title: 'YummyAnime Account', items: [{title: 'Log out'}], onSelect: function () {
                LampaYaniAuth.clear();
                Lampa.Noty.show('Вы вышли из YummyAnime');
            }});
            return;
        }
        Lampa.Input.show({title: 'YummyAnime Login', value: '', onEnter: function (login) {
            Lampa.Input.show({title: 'YummyAnime Password', value: '', onEnter: function (password) {
                LampaYaniAuth.login(login, password).then(function () { Lampa.Noty.show('Вход в YummyAnime выполнен'); }).catch(function () { Lampa.Noty.show('Ошибка входа в YummyAnime'); });
            }});
        }});
    }

    function toCard(item) {
        var title = item.title || item.name || item.russian || item.original_title || 'Без названия';
        var poster = item.cover || item.image || item.poster_url || '';
        if (!poster && item.poster) poster = item.poster.fullsize || item.poster.medium || item.poster.original || '';
        if (poster.indexOf('//') === 0) poster = 'https:' + poster;
        var rating = typeof item.rating === 'object' ? item.rating.average : item.rating;
        var votes = typeof item.rating === 'object' ? item.rating.counters : item.rating_counters;
        var ratings = extractRatings(item.rating);
        return {
            title: title,
            original_title: item.original_title || item.japanese || title,
            poster: poster,
            img: poster,
            release_date: String(item.year || item.release_year || ''),
            vote_average: rating || item.score || item.rating_score || 0,
            vote_count: votes || item.votes || item.vote_count || 0,
            yani_rating: rating || item.score || item.rating_score || 0,
            yani_ratings: ratings,
            overview: item.description || item.synopsis || '',
            yani_id: item.anime_id || item.id,
            yani_url: item.anime_url || item.url
        };
    }

    function copyParams(params) {
        var copy = {};
        Object.keys(params || {}).forEach(function (key) {
            copy[key] = params[key];
        });
        return copy;
    }

    function mapUniqueCards(items, seen) {
        return items.map(toCard).filter(function (card) {
            var key = card.yani_id || card.yani_url || card.title;
            if (seen[key]) return false;
            seen[key] = true;
            return true;
        });
    }

    function extractRatings(rating) {
        rating = rating && typeof rating === 'object' ? rating : {average: rating};
        return [
            {key: 'yummy', short: 'YA', title: 'YummyAnime', value: Number(rating.average || 0)},
            {key: 'kp', short: 'KP', title: 'Кинопоиск', value: Number(rating.kp_rating || 0)},
            {key: 'shikimori', short: 'SH', title: 'Shikimori', value: Number(rating.shikimori_rating || 0)},
            {key: 'anidub', short: 'AD', title: 'AniDUB', value: Number(rating.anidub_rating || 0)},
            {key: 'mal', short: 'MAL', title: 'MyAnimeList', value: Number(rating.myanimelist_rating || 0)},
            {key: 'worldart', short: 'WA', title: 'World-Art', value: Number(rating.worldart_rating || 0)}
        ];
    }

    function formatRating(value) {
        return Number(value) > 0 ? Number(value).toFixed(1) : '—';
    }

    function addCardRatings(element, card) {
        var ratings = element.yani_ratings || [];
        if (!ratings.length || !card || !card.render) return;
        var render = $(card.render(true));
        if ($('.yani-card-ratings', render).length) return;

        $('.card__vote', render).hide();
        var block = $('<div class="yani-card-ratings"></div>');
        ratings.forEach(function (rating) {
            var badge = $('<div class="yani-card-rating yani-card-rating--' + rating.key + '"></div>');
            badge.append($('<span class="yani-card-rating__source"></span>').text(rating.short));
            badge.append($('<span class="yani-card-rating__value"></span>').text(formatRating(rating.value)));
            block.append(badge);
        });
        $('.card__view', render).append(block);
    }

    function createDetailRatings(ratings, votes) {
        var block = $('<div class="yani-ratings"></div>');
        ratings.forEach(function (rating) {
            var item = $('<div class="yani-ratings__item"></div>');
            item.append($('<div class="yani-ratings__value"></div>').text(formatRating(rating.value)));
            item.append($('<div class="yani-ratings__source"></div>').text(rating.title));
            if (rating.key === 'yummy' && votes) item.append($('<div class="yani-ratings__votes"></div>').text(votes + ' оценок'));
            block.append(item);
        });
        return block;
    }

    function addSettings() {
        if (!Lampa.SettingsApi || !Lampa.SettingsApi.addComponent) return;

        Lampa.SettingsApi.addComponent({
            component: 'yani',
            icon: '<svg viewBox="0 0 20 20"><path fill="currentColor" d="M18.45 0H1.55A1.55 1.55 0 000 1.55v16.9A1.54 1.54 0 001.55 20h16.9A1.55 1.55 0 0020 18.45V1.55A1.54 1.54 0 0018.45 0Zm-2.83 5.93-2.1 2.66-2.3-5.43a6.95 6.95 0 014.4 2.77Zm-2.9 6.57h-4l2.03-4.8 1.98 4.8Zm-2.37-9.34L7.8 9.06 4.87 5.33c.64-.7 1.4-1.26 2.27-1.65a8.18 8.18 0 013.2-.52ZM3.57 7.39l3.2 4.06-1.56 3.58A6.96 6.96 0 013.57 7.39Zm6.57 9.56c-1.05.01-2.1-.2-3.05-.65l.76-1.8h5.7l.49 1.15a6.93 6.93 0 01-3.9 1.3Zm6.8-7.07a7.8 7.8 0 01-1.17 4L14.55 11l2.17-2.77c.14.54.21 1.1.23 1.65Z"/></svg>',
            name: 'YummyAnime'
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

    function installFullRating() {
        if (window.yummyanime_full_rating_ready || !Lampa.Listener) return;
        window.yummyanime_full_rating_ready = true;

        Lampa.Listener.follow('full', function (event) {
            if (event.type !== 'complite') return;
            var movie = event.data && event.data.movie ? event.data.movie : event.object && event.object.card_data;
            var title = movie && (movie.title || movie.name || movie.original_title || movie.original_name);
            if (!title) return;

            LampaYaniApi.search(title, {limit: 1}).then(function (payload) {
                var anime = LampaYaniApi.normalize(payload)[0];
                if (!anime || !anime.rating) return;
                var render = event.object.activity.render();
                var line = $('.full-start-new__rate-line', render);
                extractRatings(anime.rating).forEach(function (rating) {
                    var className = 'rate--yummyanime-' + rating.key;
                    if ($('.' + className, render).length) return;
                    var block = $('<div class="full-start__rate ' + className + '"><div>' + formatRating(rating.value) + '</div><div>' + rating.title + '</div></div>');
                    line.append(block);
                });
            }).catch(function () {});
        });
    }
}(window));
