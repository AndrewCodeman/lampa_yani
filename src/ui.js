(function (window) {
    'use strict';

    window.LampaYani = {
        register: function () {
            if (!window.Lampa || !Lampa.Component || !Lampa.Component.add) {
                console.error('[YummyAnime] Unsupported Lampa version');
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
                            Lampa.Noty.show('Войдите в YummyAnime через настройки YummyAnime');
                            return;
                        }
                        if (!element.yani_id) return;
                        Lampa.Select.show({
                            title: 'Действия YummyAnime',
                            items: [{title: 'Добавить в любимые', action: 'favorite'}, {title: 'Смотрю', action: 'watching'}, {title: 'В планах', action: 'planned'}, {title: 'Просмотрено', action: 'completed'}, {title: 'Брошено', action: 'dropped'}, {title: 'Отложено', action: 'postponed'}, {title: 'Комментарии', action: 'comments'}].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (value) {
                                return {title: value + '/10', value: value};
                            })),
                            onSelect: function (item) {
                                if (item.action === 'comments') return commentsMenu(element.yani_id);
                                var action = item.action === 'favorite' ? LampaYaniApi.addFavorite(element.yani_id) : item.action ? LampaYaniApi.addToList(element.yani_id, item.action) : LampaYaniApi.rate(element.yani_id, item.value);
                                action.then(function () {
                                    Lampa.Noty.show('Изменения сохранены в YummyAnime');
                                }).catch(function (error) {
                                    console.error('[YummyAnime]', error);
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
            Lampa.Component.add('yani_account', Account);

            Lampa.Component.add('yani_status', StatusDashboard);

            installFullRating();

            console.log('[YummyAnime] Extension registered');
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
            {title: 'Status', icon: '●', action: function () {
                Lampa.Activity.push({url: 'yani/status', title: 'YummyAnime Status', component: 'yani_status'});
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

    function Account(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var html = $('<div class="yani-account"></div>');
        var content = $('<div class="yani-account__content"></div>');
        var last;

        this.create = function () {
            var self = this;
            this.activity.loader(true);

            if (!LampaYaniAuth.token()) {
                addAccountNotice('Вход не выполнен', 'Откройте Настройки → YummyAnime и выберите «Войти в YummyAnime».');
                finish(self);
                return;
            }

            LampaYaniApi.profile().then(function (payload) {
                var profile = payload && payload.response ? payload.response : payload;
                return Promise.all([
                    Promise.resolve(profile),
                    LampaYaniApi.userListStats(profile.id).then(responseData).catch(function () { return []; }),
                    LampaYaniApi.userLists(profile.id).then(responseData).catch(function () { return []; })
                ]);
            }).then(function (result) {
                renderAccount(result[0], result[1], result[2]);
                finish(self);
            }).catch(function (error) {
                console.error('[YummyAnime]', error);
                addAccountNotice('Не удалось загрузить YummyAnime Account', 'Обновите токен или выполните вход заново в Настройки → YummyAnime.');
                finish(self);
            });
        };

        function finish(component) {
            scroll.append(content);
            html.append(scroll.render(true));
            component.activity.loader(false);
            component.activity.toggle();
        }

        function responseData(payload) {
            return payload && payload.response ? payload.response : payload || [];
        }

        function addAccountNotice(title, description) {
            var notice = $('<div class="yani-account__notice selector"></div>');
            notice.append($('<div class="yani-account__notice-title"></div>').text(title));
            notice.append($('<div class="yani-account__notice-text"></div>').text(description));
            bindAccountFocus(notice);
            content.append(notice);
        }

        function renderAccount(profile, stats, lists) {
            stats = Array.isArray(stats) ? stats : [];
            lists = Array.isArray(lists) ? lists : [];
            var header = $('<div class="yani-account__profile selector"></div>');
            var avatar = profile.avatars && (profile.avatars.big || profile.avatars.full || profile.avatars.small);
            if (avatar && avatar.indexOf('//') === 0) avatar = 'https:' + avatar;
            if (avatar) header.append($('<img class="yani-account__avatar" alt="">').attr('src', avatar));

            var identity = $('<div class="yani-account__identity"></div>');
            identity.append($('<div class="yani-account__name"></div>').text(profile.nickname || 'YummyAnime User'));
            identity.append($('<div class="yani-account__id"></div>').text('ID ' + profile.id));
            if (profile.about) identity.append($('<div class="yani-account__about"></div>').text(profile.about));
            if (profile.banned) identity.append('<div class="yani-account__warning">Аккаунт заблокирован</div>');
            header.append(identity);
            bindAccountFocus(header);
            content.append(header);

            var info = $('<div class="yani-account__grid"></div>');
            addInfo(info, 'Регистрация', formatAccountDate(profile.register_date));
            addInfo(info, 'Последний визит', formatAccountDate(profile.last_online));
            addInfo(info, 'Роли', profile.roles && profile.roles.length ? profile.roles.join(', ') : 'Пользователь');
            addInfo(info, 'Сообщения', String(profile.messages && profile.messages.unread_count || 0) + ' непрочитанных');
            addInfo(info, 'Уведомления', String(profile.notifications && profile.notifications.count || 0));
            addInfo(info, 'Всего в списках', String(lists.length || 0));
            content.append(info);

            var counts = {};
            lists.forEach(function (anime) {
                var userList = anime.user && anime.user.list;
                if (!userList) return;
                if (userList.list && typeof userList.list.id !== 'undefined') counts[userList.list.id] = (counts[userList.list.id] || 0) + 1;
                if (userList.is_fav) counts[4] = (counts[4] || 0) + 1;
            });

            content.append('<div class="yani-account__section-title">Статистика списков</div>');
            var listGrid = $('<div class="yani-account__lists"></div>');
            stats.forEach(function (stat) {
                var list = stat.list || {};
                var tile = $('<div class="yani-account__list selector"></div>');
                tile.append($('<div class="yani-account__list-title"></div>').text(list.title || 'Список'));
                tile.append($('<div class="yani-account__list-count"></div>').text(String(counts[list.id] || 0) + ' аниме'));
                tile.append($('<div class="yani-account__list-time"></div>').text('Общее время: ' + formatWatchTime(stat.seconds)));
                bindAccountFocus(tile);
                listGrid.append(tile);
            });
            content.append(listGrid);
        }

        function addInfo(grid, title, value) {
            var tile = $('<div class="yani-account__info selector"></div>');
            tile.append($('<div class="yani-account__info-title"></div>').text(title));
            tile.append($('<div class="yani-account__info-value"></div>').text(value || '—'));
            bindAccountFocus(tile);
            grid.append(tile);
        }

        function bindAccountFocus(element) {
            element.on('hover:focus', function (event) {
                last = event.target;
                scroll.update($(event.target), true);
            });
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

    function formatAccountDate(timestamp) {
        if (!timestamp) return '—';
        try {
            return new Date(Number(timestamp) * 1000).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch (error) {
            return new Date(Number(timestamp) * 1000).toLocaleDateString();
        }
    }

    function formatWatchTime(seconds) {
        var hours = Math.floor(Number(seconds || 0) / 3600);
        var days = Math.floor(hours / 24);
        var restHours = hours % 24;
        return days ? days + ' д ' + restHours + ' ч' : hours + ' ч';
    }

    function StatusDashboard(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var html = $('<div class="yani-status"></div>');
        var content = $('<div class="yani-status__content"></div>');
        var last;
        var ready = false;

        this.create = function () {
            scroll.append(content);
            html.append(scroll.render(true));
            load(true);
        };

        function load(first) {
            var self = thisComponent;
            if (first) self.activity.loader(true);
            LampaYaniApi.status().then(function (payload) {
                renderStatus(payload);
                if (first) {
                    self.activity.loader(false);
                    self.activity.toggle();
                    ready = true;
                }
            }).catch(function (error) {
                console.error('[YummyAnime Status]', error);
                renderStatusError();
                if (first) {
                    self.activity.loader(false);
                    self.activity.toggle();
                    ready = true;
                }
            });
        }

        var thisComponent = this;

        function renderStatus(data) {
            content.empty();
            last = null;
            var summary = data.summary || {};
            var status = summary.status || 'unknown';
            var statusTitle = status === 'up' ? 'Все системы работают' : status === 'down' ? 'Сервисы недоступны' : status === 'unknown' ? 'Нет данных мониторинга' : 'Возникли неполадки';
            var ringColor = status === 'up' ? '#4caf50' : status === 'down' ? '#db4455' : status === 'unknown' ? '#888' : '#f0a33b';

            var summaryBlock = $('<div class="yani-status__summary selector yani-status--' + status + '"></div>');
            var ring = $('<div class="yani-status__ring"><div class="yani-status__ring-center"></div></div>');
            ring.css('background', 'conic-gradient(#4caf50 0 ' + Number(summary.uptime_percent || 0) + '%, #db4455 ' + Number(summary.uptime_percent || 0) + '% 100%)');
            ring.find('.yani-status__ring-center').append($('<strong></strong>').text(summary.checks || 0), '<span>замеров</span>');

            var summaryInfo = $('<div class="yani-status__summary-info"></div>');
            summaryInfo.append($('<div class="yani-status__headline"></div>').css('color', ringColor).text(statusTitle));
            var metrics = $('<div class="yani-status__metrics"></div>');
            metrics.append(statusMetric('Доступность', Number(summary.uptime_percent || 0).toFixed(1) + '%'));
            metrics.append(statusMetric('Средняя загрузка', String(summary.average_ms || 0) + ' мс'));
            metrics.append(statusMetric('Ошибок', String(summary.failed || 0)));
            metrics.append(statusMetric('Обновлено', formatStatusDate(data.generated_at)));
            summaryInfo.append(metrics);
            summaryBlock.append(ring, summaryInfo);
            bindStatusFocus(summaryBlock);
            content.append(summaryBlock);

            content.append('<div class="yani-status__legend"><span class="yani-status__dot yani-status__dot--up"></span>Работает <span class="yani-status__dot yani-status__dot--degraded"></span>Нестабильно <span class="yani-status__dot yani-status__dot--down"></span>Недоступно</div>');

            (data.domains || []).forEach(function (domain) {
                var block = $('<div class="yani-status__domain selector yani-status--' + domain.status + '"></div>');
                var head = $('<div class="yani-status__domain-head"></div>');
                var name = $('<div class="yani-status__domain-name"></div>');
                name.append('<span class="yani-status__state"></span>');
                name.append($('<strong></strong>').text(domain.label || domain.domain));
                name.append($('<small></small>').text(domain.domain));
                var values = $('<div class="yani-status__domain-values"></div>');
                values.append($('<span></span>').text('HTTP ' + (domain.average_ms || 0) + ' мс'));
                values.append($('<span></span>').text('Ping ' + (domain.ping_ms || 0) + ' мс'));
                head.append(name, values);

                var history = $('<div class="yani-status__history"></div>');
                (domain.history || []).forEach(function (point) {
                    history.append($('<i class="yani-status__bar yani-status__bar--' + point.status + '"></i>').attr('title', formatStatusDate(point.time)));
                });
                block.append(head, history);
                bindStatusFocus(block);
                content.append(block);
            });

            content.append('<div class="yani-status__source">Источник: YummyStatus · период наблюдения 3 часа · snapshot обновляется каждые 5 минут</div>');

            var refresh = $('<div class="yani-status__refresh selector">Обновить статус</div>');
            refresh.on('hover:enter', function () {
                Lampa.Noty.show('Обновляем YummyAnime Status');
                load(false);
            });
            bindStatusFocus(refresh);
            content.append(refresh);
            refreshStatusNavigation();
        }

        function statusMetric(title, value) {
            var metric = $('<div class="yani-status__metric"></div>');
            metric.append($('<span></span>').text(title));
            metric.append($('<strong></strong>').text(value));
            return metric;
        }

        function renderStatusError() {
            content.empty();
            var error = $('<div class="yani-status__error selector"></div>');
            error.append('<strong>Не удалось загрузить YummyAnime Status</strong>');
            error.append('<span>Данные мониторинга временно недоступны. Это не означает, что сам плагин не работает.</span>');
            bindStatusFocus(error);
            content.append(error);
            refreshStatusNavigation();
        }

        function refreshStatusNavigation() {
            if (!ready) return;
            Lampa.Controller.collectionSet(scroll.render());
            Lampa.Controller.collectionFocus(false, scroll.render());
        }

        function bindStatusFocus(element) {
            element.on('hover:focus', function (event) {
                last = event.target;
                scroll.update($(event.target), true);
            });
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
        this.destroy = function () {
            scroll.destroy();
            html.remove();
        };
    }

    function formatStatusDate(value) {
        if (!value) return '—';
        try {
            return new Date(value).toLocaleString('ru-RU', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'});
        } catch (error) {
            return new Date(value).toLocaleString();
        }
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
            var genres = LampaYaniApi.normalizeGenres(payload);
            if (!genres.length) {
                Lampa.Noty.show('YummyAnime не вернул список жанров');
                return;
            }
            Lampa.Select.show({
                title: 'Жанры YummyAnime',
                items: genres.map(function (genre) {
                    return {
                        title: genre.title || genre.name,
                        value: genre.value || genre.id || genre.href || genre.alias
                    };
                }).filter(function (genre) { return genre.title && genre.value; }),
                onSelect: function (item) {
                    Lampa.Activity.push({url: 'yani/genre/' + item.value, title: item.title, component: 'yani_catalog', params: {limit: 30, genres: item.value}});
                }
            });
        }).catch(function () { Lampa.Noty.show('Не удалось загрузить жанры YummyAnime'); });
    }

    function openSearch() {
        showYummyInput({title: 'YummyAnime Search', value: ''}, function (query) {
            query = (query || '').trim();
            if (query) Lampa.Activity.push({url: 'yani/search/' + encodeURIComponent(query), title: query, component: 'yani_catalog', params: {q: query, limit: 30}});
        });
    }

    function openAccount() {
        Lampa.Activity.push({url: 'yani/account', title: 'YummyAnime Account', component: 'yani_account'});
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
            param: {name: 'yani_account_login', type: 'trigger', default: false},
            field: {name: 'Войти в YummyAnime', description: 'Вход по email и паролю YummyAnime'},
            onChange: openSettingsLogin
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_account_refresh', type: 'trigger', default: false},
            field: {name: 'Обновить токен YummyAnime', description: 'Обновить действующий Bearer-токен аккаунта'},
            onChange: function () {
                if (!LampaYaniAuth.token()) return Lampa.Noty.show('Сначала войдите в YummyAnime');
                LampaYaniAuth.refresh().then(function () {
                    Lampa.Noty.show('Токен YummyAnime обновлён');
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show('Не удалось обновить токен YummyAnime');
                });
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_account_logout', type: 'trigger', default: false},
            field: {name: 'Выйти из YummyAnime', description: 'Завершить сессию и удалить локальный токен'},
            onChange: function () {
                if (!LampaYaniAuth.token()) return Lampa.Noty.show('Вход в YummyAnime не выполнен');
                LampaYaniAuth.logout().then(function () {
                    Lampa.Noty.show('Вы вышли из YummyAnime');
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show('Локальный токен YummyAnime удалён');
                });
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_api_check', type: 'trigger', default: false},
            field: {name: 'Проверить YummyAnime API', description: 'Проверить доступность API и публичный токен приложения'},
            onChange: function () {
                LampaYaniApi.health().then(function () {
                    Lampa.Noty.show('YummyAnime API работает');
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show('YummyAnime API недоступен или публичный токен неверный');
                });
            }
        });
    }

    function openSettingsLogin() {
        showYummyInput({title: 'Email YummyAnime', value: ''}, function (login) {
            login = (login || '').trim();
            if (!login) return Lampa.Noty.show('Введите email YummyAnime');
            showYummyInput({title: 'Пароль YummyAnime', value: '', password: true}, function (password) {
                if (!password) return Lampa.Noty.show('Введите пароль YummyAnime');
                LampaYaniAuth.login(login, password).then(function () {
                    Lampa.Noty.show('Вход в YummyAnime выполнен');
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show('Ошибка входа в YummyAnime');
                });
            });
        });
    }

    function showYummyInput(params, callback) {
        if (!Lampa.Input) {
            Lampa.Noty.show('Ввод недоступен в этой версии Lampa');
            return;
        }
        if (Lampa.Input.show) {
            params.onEnter = callback;
            return Lampa.Input.show(params);
        }
        if (Lampa.Input.edit) return Lampa.Input.edit(params, callback);
        Lampa.Noty.show('Ввод недоступен в этой версии Lampa');
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
