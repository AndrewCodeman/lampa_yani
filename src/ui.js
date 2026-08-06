(function (window) {
    'use strict';

    function t(name) {
        return window.LampaYaniI18n ? LampaYaniI18n.t(name) : name;
    }

    function locale() {
        return window.LampaYaniI18n ? LampaYaniI18n.locale() : 'ru-RU';
    }

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
                            self.build({results: results, total_pages: maxPages, title: t('anime')});
                        })
                        .catch(function (error) {
                            console.error('[YummyAnime]', error);
                            self.activity.loader(false);
                            Lampa.Noty.show(t('catalog_load_error'));
                        });
                };
                comp.nextPageReuest = function (requestObject, resolve, reject) {
                    var params = copyParams(baseParams);
                    params.offset = baseParams.offset + (requestObject.page - 1) * limit;

                    LampaYaniApi.catalog(params).then(function (payload) {
                        var raw = LampaYaniApi.normalize(payload);
                        var results = mapUniqueCards(raw, seen);
                        if (raw.length < limit) requestObject.page = maxPages;
                        resolve({results: results, total_pages: maxPages, title: t('anime')});
                    }).catch(function (error) {
                        console.error('[YummyAnime]', error);
                        Lampa.Noty.show(t('next_page_error'));
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
                            Lampa.Noty.show(t('login_required'));
                            return;
                        }
                        if (!element.yani_id) return;
                        Lampa.Select.show({
                            title: t('actions'),
                            items: [{title: t('favorite'), action: 'favorite'}, {title: t('watching'), action: 'watching'}, {title: t('planned'), action: 'planned'}, {title: t('completed'), action: 'completed'}, {title: t('dropped'), action: 'dropped'}, {title: t('postponed'), action: 'postponed'}, {title: t('comments'), action: 'comments'}].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (value) {
                                return {title: value + '/10', value: value};
                            })),
                            onSelect: function (item) {
                                if (item.action === 'comments') return commentsMenu(element.yani_id);
                                var action = item.action === 'favorite' ? LampaYaniApi.addFavorite(element.yani_id) : item.action ? LampaYaniApi.addToList(element.yani_id, item.action) : LampaYaniApi.rate(element.yani_id, item.value);
                                action.then(function () {
                                    Lampa.Noty.show(t('saved'));
                                }).catch(function (error) {
                                    console.error('[YummyAnime]', error);
                                    Lampa.Noty.show(t('save_error'));
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
            Lampa.Component.add('yani_player', IframePlayer);

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
            {title: t('catalog'), icon: '◆', action: function () {
                Lampa.Activity.push({url: 'yani/catalog', title: 'YummyAnime ' + t('catalog'), component: 'yani_catalog', params: {limit: 30, sort: 'top', sort_forward: false}});
            }},
            {title: t('genres'), icon: '≡', action: openGenres},
            {title: t('search'), icon: '⌕', action: openSearch},
            {title: t('schedule'), icon: '▦', action: function () {
                Lampa.Activity.push({url: 'yani/schedule', title: 'YummyAnime ' + t('schedule'), component: 'yani_schedule'});
            }},
            {title: t('status'), icon: '●', action: function () {
                Lampa.Activity.push({url: 'yani/status', title: 'YummyAnime ' + t('status'), component: 'yani_status'});
            }},
            {title: t('top_rated'), icon: '★', action: function () {
                Lampa.Activity.push({url: 'yani/top-rated', title: 'YummyAnime ' + t('top_rated'), component: 'yani_catalog', params: {limit: 30, sort: 'rating', sort_forward: false}});
            }},
            {title: t('account'), icon: '●', action: openAccount}
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
                addAccountNotice(t('not_logged_in'), t('login_hint'));
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
                addAccountNotice(t('account_load_error'), t('account_retry'));
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
            if (profile.banned) identity.append($('<div class="yani-account__warning"></div>').text(t('banned')));
            header.append(identity);
            bindAccountFocus(header);
            content.append(header);

            var info = $('<div class="yani-account__grid"></div>');
            addInfo(info, t('registration'), formatAccountDate(profile.register_date));
            addInfo(info, t('last_visit'), formatAccountDate(profile.last_online));
            addInfo(info, t('roles'), profile.roles && profile.roles.length ? profile.roles.join(', ') : t('user'));
            addInfo(info, t('messages'), String(profile.messages && profile.messages.unread_count || 0) + ' ' + t('unread'));
            addInfo(info, t('notifications'), String(profile.notifications && profile.notifications.count || 0));
            addInfo(info, t('total_lists'), String(lists.length || 0));
            content.append(info);

            var counts = {};
            lists.forEach(function (anime) {
                var userList = anime.user && anime.user.list;
                if (!userList) return;
                if (userList.list && typeof userList.list.id !== 'undefined') counts[userList.list.id] = (counts[userList.list.id] || 0) + 1;
                if (userList.is_fav) counts[4] = (counts[4] || 0) + 1;
            });

            content.append($('<div class="yani-account__section-title"></div>').text(t('list_stats')));
            var listGrid = $('<div class="yani-account__lists"></div>');
            stats.forEach(function (stat) {
                var list = stat.list || {};
                var tile = $('<div class="yani-account__list selector"></div>');
                tile.append($('<div class="yani-account__list-title"></div>').text(list.title || t('list')));
                tile.append($('<div class="yani-account__list-count"></div>').text(String(counts[list.id] || 0) + ' ' + t('anime_count')));
                tile.append($('<div class="yani-account__list-time"></div>').text(t('total_time') + ': ' + formatWatchTime(stat.seconds)));
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
            return new Date(Number(timestamp) * 1000).toLocaleDateString(locale(), {day: 'numeric', month: 'long', year: 'numeric'});
        } catch (error) {
            return new Date(Number(timestamp) * 1000).toLocaleDateString();
        }
    }

    function formatWatchTime(seconds) {
        var hours = Math.floor(Number(seconds || 0) / 3600);
        var days = Math.floor(hours / 24);
        var restHours = hours % 24;
        return days ? days + ' ' + t('days_short') + ' ' + restHours + ' ' + t('hours_short') : hours + ' ' + t('hours_short');
    }

    function StatusDashboard(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var html = $('<div class="yani-status"></div>');
        var content = $('<div class="yani-status__content"></div>');
        var last;
        var ready = false;
        var currentPeriod = '3hour';

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
            var periods = data.periods || null;
            var periodData = periods ? (periods[currentPeriod] || periods[data.default_period] || periods['3hour']) : data;
            if (!periodData) return renderStatusError();
            var periodLabels = {'3hour': t('period_3hour'), day: t('period_day'), week: t('period_week'), month: t('period_month')};
            var periodSwitch = $('<div class="yani-status__periods"></div>');
            Object.keys(periodLabels).forEach(function (period) {
                var button = $('<div class="yani-status__period selector"></div>').text(periodLabels[period]);
                if (period === currentPeriod) button.addClass('active');
                button.on('hover:enter', function () {
                    currentPeriod = period;
                    renderStatus(data);
                });
                bindStatusFocus(button);
                periodSwitch.append(button);
            });
            content.append(periodSwitch);

            data = periodData;
            var summary = data.summary || {};
            var status = summary.status || 'unknown';
            var statusTitle = status === 'up' ? t('all_up') : status === 'down' ? t('all_down') : status === 'unknown' ? t('no_monitoring') : t('degraded');
            var ringColor = status === 'up' ? '#4caf50' : status === 'down' ? '#db4455' : status === 'unknown' ? '#888' : '#f0a33b';

            var summaryBlock = $('<div class="yani-status__summary selector yani-status--' + status + '"></div>');
            var ring = $('<div class="yani-status__ring"><div class="yani-status__ring-center"></div></div>');
            ring.css('background', 'conic-gradient(#4caf50 0 ' + Number(summary.uptime_percent || 0) + '%, #db4455 ' + Number(summary.uptime_percent || 0) + '% 100%)');
            ring.find('.yani-status__ring-center').append($('<strong></strong>').text(summary.checks || 0), $('<span></span>').text(t('checks')));

            var summaryInfo = $('<div class="yani-status__summary-info"></div>');
            summaryInfo.append($('<div class="yani-status__headline"></div>').css('color', ringColor).text(statusTitle));
            var metrics = $('<div class="yani-status__metrics"></div>');
            metrics.append(statusMetric(t('availability'), Number(summary.uptime_percent || 0).toFixed(1) + '%'));
            metrics.append(statusMetric(t('average_load'), String(summary.average_ms || 0) + ' ' + t('milliseconds')));
            metrics.append(statusMetric(t('errors'), String(summary.failed || 0)));
            metrics.append(statusMetric(t('updated'), formatStatusDate(data.generated_at)));
            summaryInfo.append(metrics);
            summaryBlock.append(ring, summaryInfo);
            bindStatusFocus(summaryBlock);
            content.append(summaryBlock);

            content.append('<div class="yani-status__legend"><span class="yani-status__dot yani-status__dot--up"></span>' + t('up') + ' <span class="yani-status__dot yani-status__dot--degraded"></span>' + t('unstable') + ' <span class="yani-status__dot yani-status__dot--down"></span>' + t('down') + '</div>');

            (data.domains || []).forEach(function (domain) {
                var block = $('<div class="yani-status__domain selector yani-status--' + domain.status + '"></div>');
                var head = $('<div class="yani-status__domain-head"></div>');
                var name = $('<div class="yani-status__domain-name"></div>');
                name.append('<span class="yani-status__state"></span>');
                name.append($('<strong></strong>').text(statusDomainName(domain)));
                name.append($('<small></small>').text(domain.domain));
                var values = $('<div class="yani-status__domain-values"></div>');
                values.append($('<span></span>').text('HTTP ' + (domain.average_ms || 0) + ' ' + t('milliseconds')));
                values.append($('<span></span>').text('Ping ' + (domain.ping_ms || 0) + ' ' + t('milliseconds')));
                head.append(name, values);

                var history = $('<div class="yani-status__history"></div>');
                (domain.history || []).forEach(function (point) {
                    history.append($('<i class="yani-status__bar yani-status__bar--' + point.status + '"></i>').attr('title', formatStatusDate(point.time)));
                });
                block.append(head, history);
                bindStatusFocus(block);
                content.append(block);
            });

            content.append($('<div class="yani-status__source"></div>').text(t('source') + ': YummyStatus · ' + t('period') + ': ' + periodLabels[currentPeriod] + ' · ' + t('snapshot_notice')));

            var refresh = $('<div class="yani-status__refresh selector"></div>').text(t('refresh_status'));
            refresh.on('hover:enter', function () {
                Lampa.Noty.show(t('refreshing_status'));
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

        function statusDomainName(domain) {
            var names = {
                'old.yummyani.me': 'domain_old',
                'old.yummy-ani.me': 'domain_old_mirror',
                'ru.yummyani.me': 'domain_new',
                'ru.yummy-ani.me': 'domain_new_mirror',
                'api.yani.tv': 'domain_api',
                'waf.valtrix.org': 'domain_waf'
            };
            return names[domain.domain] ? t(names[domain.domain]) : (domain.label || domain.domain);
        }

        function renderStatusError() {
            content.empty();
            var error = $('<div class="yani-status__error selector"></div>');
            error.append($('<strong></strong>').text(t('status_load_error')));
            error.append($('<span></span>').text(t('status_error_hint')));
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
            return new Date(value).toLocaleString(locale(), {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'});
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
                Lampa.Noty.show(t('schedule_load_error'));
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
                    section.append($('<div class="yani-schedule__empty"></div>').text(t('no_releases')));
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
            release.append($('<div class="yani-schedule__timezone"></div>').text(t('local_time')));
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
        var prefix = offset === 0 ? t('today') + ', ' : offset === 1 ? t('tomorrow') + ', ' : '';
        try {
            return prefix + date.toLocaleDateString(locale(), {weekday: 'long', day: 'numeric', month: 'long'});
        } catch (error) {
            return prefix + date.toLocaleDateString();
        }
    }

    function formatScheduleTime(date) {
        try {
            return date.toLocaleTimeString(locale(), {hour: '2-digit', minute: '2-digit'});
        } catch (error) {
            return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        }
    }

    function formatScheduleDateTime(date) {
        try {
            return date.toLocaleString(locale(), {day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'});
        } catch (error) {
            return date.toLocaleString();
        }
    }

    function formatEpisode(episodes) {
        var aired = Number(episodes.aired || 0);
        var count = Number(episodes.count || 0);
        if (count === 1 && aired === 0) return t('release');
        var next = aired + 1;
        return count > 1 ? t('episode') + ' ' + next + ' ' + t('of') + ' ' + count : t('episode') + ' ' + next;
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
            button = $('<div class="yani-detail__button yani-detail__button--watch selector"></div>').text(t('watch'));
            button.on('hover:enter', function () { openVideos(data); });
            var searchButton = $('<div class="yani-detail__button selector"></div>').text(t('open_lampa_search'));
            searchButton.on('hover:enter', function () {
                if (Lampa.Search && Lampa.Search.open) Lampa.Search.open(data.title || '');
                else Lampa.Controller.toggle('search');
            });
            info.append(button, searchButton);
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

    function openVideos(card) {
        if (!card || !card.yani_id) return Lampa.Noty.show(t('no_videos'));
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();

        LampaYaniApi.videos(card.yani_id).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var videos = payload && payload.response ? payload.response : payload;
            videos = (Array.isArray(videos) ? videos : []).filter(function (video) { return video && video.iframe_url; });
            if (!videos.length) return Lampa.Noty.show(t('no_videos'));

            var groups = {};
            videos.forEach(function (video) {
                var data = video.data || {};
                var title = data.dubbing || data.player || t('player');
                var key = title + '|' + String(data.player_id || data.player || '');
                if (!groups[key]) groups[key] = {title: title, player: data.player || '', videos: []};
                groups[key].videos.push(video);
            });

            var voices = Object.keys(groups).map(function (key) {
                var group = groups[key];
                return {title: group.title + (group.player && group.player !== group.title ? ' · ' + group.player : ''), group: group};
            }).sort(function (a, b) { return a.title.localeCompare(b.title); });

            if (voices.length === 1) return chooseEpisode(card, voices[0].group);
            Lampa.Select.show({
                title: t('choose_voice'),
                items: voices,
                onSelect: function (item) { chooseEpisode(card, item.group); }
            });
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Videos]', error);
            Lampa.Noty.show(t('videos_load_error'));
        });
    }

    function chooseEpisode(card, group) {
        var videos = group.videos.slice().sort(function (a, b) {
            var numberA = parseFloat(a.number);
            var numberB = parseFloat(b.number);
            if (isFinite(numberA) && isFinite(numberB)) return numberA - numberB;
            return Number(a.index || 0) - Number(b.index || 0);
        });
        var episodes = videos.map(function (video) {
            return {title: t('episode') + ' ' + (video.number || video.index || '?'), video: video};
        });
        if (episodes.length === 1) return launchVideo(card, group, videos, videos[0]);
        Lampa.Select.show({
            title: t('choose_episode') + ' · ' + group.title,
            items: episodes,
            onSelect: function (item) { launchVideo(card, group, videos, item.video); }
        });
    }

    function launchVideo(card, group, videos, selected) {
        var url = normalizeVideoUrl(selected.iframe_url);
        if (!url) return Lampa.Noty.show(t('no_videos'));
        var title = (card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + (selected.number || selected.index || '?') + ' · ' + group.title;

        if (/\.(m3u8|mp4|webm)(?:\?|$)/i.test(url) && Lampa.Player && Lampa.Player.play) {
            var directVideos = videos.filter(function (video) {
                return /\.(m3u8|mp4|webm)(?:\?|$)/i.test(normalizeVideoUrl(video.iframe_url));
            });
            var playlist = directVideos.map(function (video) {
                return {
                    title: (card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + (video.number || video.index || '?'),
                    url: normalizeVideoUrl(video.iframe_url)
                };
            });
            var current = playlist[directVideos.indexOf(selected)] || playlist[0];
            Lampa.Player.play(current);
            if (Lampa.Player.playlist) Lampa.Player.playlist(playlist);
            return;
        }

        Lampa.Activity.push({
            url: 'yani/player/' + (selected.video_id || selected.index || selected.number),
            title: title,
            component: 'yani_player',
            iframe_url: url
        });
    }

    function normalizeVideoUrl(url) {
        if (!url) return '';
        return url.indexOf('//') === 0 ? 'https:' + url : url;
    }

    function IframePlayer(object) {
        var html = $('<div class="yani-player"></div>');
        var iframe = $('<iframe class="yani-player__iframe" frameborder="0" allowfullscreen></iframe>');

        this.create = function () {
            iframe.attr('src', normalizeVideoUrl(object.iframe_url));
            iframe.attr('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture');
            iframe.on('load', function () { if (iframe[0] && iframe[0].focus) iframe[0].focus(); });
            html.append(iframe);
            this.activity.loader(false);
            this.activity.toggle();
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    iframe.attr('tabindex', '0');
                    if (iframe[0] && iframe[0].focus) iframe[0].focus();
                },
                back: this.back
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () {
            iframe.attr('src', 'about:blank');
            iframe.remove();
            html.remove();
        };
    }

    function openGenres() {
        LampaYaniApi.genres().then(function (payload) {
            var genres = LampaYaniApi.normalizeGenres(payload);
            if (!genres.length) {
                Lampa.Noty.show(t('genres_empty'));
                return;
            }
            Lampa.Select.show({
                title: t('genres_title'),
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
        }).catch(function () { Lampa.Noty.show(t('genres_load_error')); });
    }

    function openSearch() {
        showYummyInput({title: t('search_title'), value: ''}, function (query) {
            query = (query || '').trim();
            if (query) Lampa.Activity.push({url: 'yani/search/' + encodeURIComponent(query), title: query, component: 'yani_catalog', params: {q: query, limit: 30}});
        });
    }

    function openAccount() {
        Lampa.Activity.push({url: 'yani/account', title: 'YummyAnime ' + t('account'), component: 'yani_account'});
    }

    function toCard(item) {
        var title = item.title || item.name || item.russian || item.original_title || t('untitled');
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
            {key: 'kp', short: 'KP', title: t('kinopoisk'), value: Number(rating.kp_rating || 0)},
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
            if (rating.key === 'yummy' && votes) item.append($('<div class="yani-ratings__votes"></div>').text(votes + ' ' + t('ratings_count')));
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
            param: {name: 'yani_language', type: 'select', values: {ru: 'Русский', en: 'English'}, default: 'ru'},
            field: {name: t('language_name'), description: t('language_description')},
            onChange: function (value) {
                if (value && typeof value === 'object') value = value.value;
                LampaYaniI18n.setLanguage(value);
                Lampa.Noty.show(t('language_changed'));
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_account_login', type: 'trigger', default: false},
            field: {name: t('login_name'), description: t('login_description')},
            onChange: openSettingsLogin
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_account_refresh', type: 'trigger', default: false},
            field: {name: t('refresh_name'), description: t('refresh_description')},
            onChange: function () {
                if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('login_first'));
                LampaYaniAuth.refresh().then(function () {
                    Lampa.Noty.show(t('token_refreshed'));
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('token_refresh_error'));
                });
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_account_logout', type: 'trigger', default: false},
            field: {name: t('logout_name'), description: t('logout_description')},
            onChange: function () {
                if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('not_logged'));
                LampaYaniAuth.logout().then(function () {
                    Lampa.Noty.show(t('logged_out'));
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('token_removed'));
                });
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_api_check', type: 'trigger', default: false},
            field: {name: t('api_check_name'), description: t('api_check_description')},
            onChange: function () {
                LampaYaniApi.health().then(function () {
                    Lampa.Noty.show(t('api_ok'));
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('api_error'));
                });
            }
        });
    }

    function openSettingsLogin() {
        showYummyInput({title: t('email_prompt'), value: ''}, function (login) {
            login = (login || '').trim();
            if (!login) return Lampa.Noty.show(t('email_required'));
            showYummyInput({title: t('password_prompt'), value: '', password: true}, function (password) {
                if (!password) return Lampa.Noty.show(t('password_required'));
                LampaYaniAuth.login(login, password).then(function () {
                    Lampa.Noty.show(t('login_ok'));
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('login_error'));
                });
            });
        });
    }

    function showYummyInput(params, callback) {
        if (!Lampa.Input) {
            Lampa.Noty.show(t('input_unavailable'));
            return;
        }
        if (Lampa.Input.show) {
            params.onEnter = callback;
            return Lampa.Input.show(params);
        }
        if (Lampa.Input.edit) return Lampa.Input.edit(params, callback);
        Lampa.Noty.show(t('input_unavailable'));
    }

    function commentsMenu(id) {
        LampaYaniApi.comments(id).then(function (payload) {
            var comments = LampaYaniApi.normalize(payload);
            var items = comments.map(function (comment) {
                return {title: comment.text || comment.body || 'Comment'};
            });
            Lampa.Select.show({title: t('comments_title'), items: items});
        }).catch(function () { Lampa.Noty.show(t('comments_error')); });
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
