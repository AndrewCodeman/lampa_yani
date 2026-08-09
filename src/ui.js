(function (window) {
    'use strict';

    function t(name) {
        return window.LampaYaniI18n ? LampaYaniI18n.t(name) : name;
    }

    function locale() {
        return window.LampaYaniI18n ? LampaYaniI18n.locale() : 'ru-RU';
    }

    var externalRestoreState = {
        pending: false,
        installed: false,
        openedAt: 0,
        controller: 'content',
        element: null
    };
    var usagePolicyVisible = false;

    function goBack() {
        if (window.Lampa && Lampa.Activity && Lampa.Activity.backward) {
            Lampa.Activity.backward();
        }
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
                registerOnlineSource();
                registerSearchSource();
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
                var requestedOffsets = {};

                object.page = 1;
                baseParams.limit = limit;
                baseParams.offset = Number(baseParams.offset || 0);

                comp.create = function () {
                    var self = this;
                    this.activity.loader(true);
                    LampaYaniApi.catalog(baseParams)
                        .then(function (payload) {
                            var raw = LampaYaniApi.normalize(payload);
                            var results = mapUniqueCards(raw, seen);
                            requestedOffsets[baseParams.offset] = true;
                            if (raw.length < limit) object.page = maxPages;
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
                    if (requestedOffsets[params.offset]) {
                        resolve({results: [], total_pages: maxPages, title: t('anime')});
                        return;
                    }
                    requestedOffsets[params.offset] = true;

                    LampaYaniApi.catalog(params).then(function (payload) {
                        var raw = LampaYaniApi.normalize(payload);
                        var results = mapUniqueCards(raw, seen);
                        if (raw.length < limit) requestObject.page = maxPages;
                        resolve({results: results, total_pages: maxPages, title: t('anime')});
                    }).catch(function (error) {
                        delete requestedOffsets[params.offset];
                        requestObject.page = Math.max(1, requestObject.page - 1);
                        console.error('[YummyAnime]', error);
                        Lampa.Noty.show(t('next_page_error'));
                        reject(error);
                    });
                };
                // Lampa builds use both spellings across releases.
                comp.nextPageRequest = comp.nextPageReuest;
                comp.cardRender = bindYummyCardRender;
                return comp;
            });

            Lampa.Component.add('yani_recommended', Recommended);
            Lampa.Component.add('yani_updates', Updates);
            Lampa.Component.add('yani_schedule', Schedule);
            Lampa.Component.add('yani_history', History);

            Lampa.Component.add('yani_detail', Detail);
            Lampa.Component.add('yani_policy', UsagePolicy);
            Lampa.Component.add('yani_trailers', TrailerList);
            Lampa.Component.add('yani_account', Account);
            Lampa.Component.add('yani_account_list', AccountList);
            Lampa.Component.add('yani_notifications', Notifications);
            Lampa.Component.add('yani_subscriptions', Subscriptions);
            Lampa.Component.add('yani_auth', AuthPage);

            Lampa.Component.add('yani_status', StatusDashboard);
            Lampa.Component.add('yani_player', IframePlayer);

            installUndefinedTmdbGuard();
            installFullRating();

            console.log('[YummyAnime] Extension registered');
        }
    };

    function Home(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-home"></div>');
        var grid = $('<div class="yani-home__grid"></div>');
        var last;

        var items = [
            {key: 'catalog', title: t('catalog'), action: function () {
                Lampa.Activity.push({url: 'yani/catalog', title: 'YummyAnime ' + t('catalog'), component: 'yani_catalog', params: {limit: 30, sort: 'top', sort_forward: false}});
            }},
            {key: 'genres', title: t('genres'), action: openGenres},
            {key: 'search', title: t('search'), action: openSearch},
            {key: 'schedule', title: t('schedule'), action: function () {
                Lampa.Activity.push({url: 'yani/schedule', title: 'YummyAnime ' + t('schedule'), component: 'yani_schedule'});
            }},
            {key: 'continue_watching', title: t('continue_watching'), action: function () {
                Lampa.Activity.push({url: 'yani/history', title: 'YummyAnime ' + t('continue_watching'), component: 'yani_history'});
            }},
            {key: 'status', title: t('status'), action: function () {
                Lampa.Activity.push({url: 'yani/status', title: 'YummyAnime ' + t('status'), component: 'yani_status'});
            }},
            {key: 'top_rated', title: t('top_rated'), action: function () {
                Lampa.Activity.push({url: 'yani/top-rated', title: 'YummyAnime ' + t('top_rated'), component: 'yani_catalog', params: {limit: 30, sort: 'rating', sort_forward: false}});
            }},
            {key: 'for_you', title: t('for_you'), action: function () {
                Lampa.Activity.push({url: 'yani/for-you', title: 'YummyAnime ' + t('for_you'), component: 'yani_recommended'});
            }},
            {key: 'updates', title: t('updates'), action: function () {
                Lampa.Activity.push({url: 'yani/updates', title: 'YummyAnime ' + t('updates'), component: 'yani_updates'});
            }},
            {key: 'account', title: t('account'), action: openAccount}
        ].filter(function (item) { return homeSectionEnabled(item.key); });

        this.create = function () {
            items.forEach(function (item) {
                var button = $('<div class="yani-home__item yani-home__item--' + item.key + ' selector"><div class="yani-home__icon">' + homeIcon(item.key) + '</div><div class="yani-home__title">' + item.title + '</div><div class="yani-home__arrow">›</div></div>');
                button.on('hover:focus', function (event) {
                    var target = event.currentTarget || event.target;
                    last = target;
                    scroll.update($(target), true);
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
                down: function () { movePageDown(scroll); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function UsagePolicy(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-policy"></div>');
        var title;
        var accept;

        this.create = function () {
            var self = this;
            var mark = $('<div class="yani-policy__mark" aria-hidden="true"></div>').html(yummyAnimeIcon());
            title = $('<div class="yani-policy__title selector"></div>').text(t('usage_policy_title'));
            var content = $('<div class="yani-policy__content"></div>');
            [
                t('usage_policy_as_is'),
                t('usage_policy_information'),
                t('usage_policy_legal'),
                t('usage_policy_responsibility')
            ].forEach(function (paragraph) {
                content.append($('<div class="yani-policy__paragraph"></div>').text(paragraph));
            });
            accept = $('<div class="yani-policy__accept selector"></div>').text(t('usage_policy_accept'));
            accept.on('hover:enter click.yaniPolicyAccept', function () {
                usagePolicyVisible = false;
                goBack();
            });
            html.append(mark, title, content, accept);
            html.on('hover:focus', function (event) {
                var target = $(event.target).closest('.selector');
                html.find('.focus').removeClass('focus');
                target.addClass('focus');
                scroll.update(target, true);
            });
            scroll.append(html);
            self.activity.loader(false);
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(title, scroll.render()); },
                left: function () { Lampa.Controller.toggle('menu'); },
                right: function () {},
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { movePageDown(scroll); },
                back: function () { usagePolicyVisible = false; goBack(); }
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? scroll.render(true) : scroll.render(); };
        this.destroy = function () { usagePolicyVisible = false; scroll.destroy(); html.remove(); };
    }

    function showUsagePolicy() {
        if (!Lampa.Activity || !Lampa.Activity.push || usagePolicyVisible) return;
        usagePolicyVisible = true;
        Lampa.Activity.push({
            url: 'yani/policy',
            title: t('usage_policy_title'),
            component: 'yani_policy'
        });
    }

    function homeIcon(key) {
        var icons = {
            catalog: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
            genres: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="18" r="2"/></svg>',
            search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>',
            schedule: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h3M14 14h3M7 18h3"/></svg>',
            continue_watching: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/></svg>',
            status: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h4l2-6 4 12 2-6h6"/></svg>',
            top_rated: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/></svg>',
            for_you: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5S4 15.7 4 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.2-8 11-8 11Z"/><path d="M12 11v5M9.5 13.5h5"/></svg>',
            updates: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h7"/><circle cx="18" cy="16" r="3"/><path d="M18 14v2l1.3 1"/></svg>',
            account: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4 3.3-6 8-6s7.3 2 8 6"/></svg>'
        };
        return icons[key] || icons.catalog;
    }

    function lampaIcon() {
        return '<svg viewBox="0 0 110 104" aria-hidden="true"><path d="M81.674 103.11C98.568 93.723 110 75.697 110 55 110 24.624 85.376 0 55 0S0 24.624 0 55c0 20.697 11.432 38.723 28.326 48.11C14.887 94.372 6 79.224 6 62 6 34.938 27.938 13 55 13s49 21.938 49 49c0 17.224-8.887 32.373-22.326 41.11Z"/><path d="M92.955 80.008C95.549 74.55 97 68.445 97 62 97 38.804 78.196 20 55 20S13 38.804 13 62c0 6.445 1.452 12.55 4.045 18.008C16.362 77.116 16 74.1 16 71c0-21.539 17.461-39 39-39s39 17.461 39 39c0 3.1-.362 6.116-1.045 9.008Z"/><path d="M55 89c14.359 0 26-11.641 26-26 0-5.071-1.451-9.802-3.961-13.801C82.579 54.799 86 62.5 86 71c0 17.121-13.879 31-31 31S24 88.121 24 71c0-8.5 3.421-16.201 8.961-21.801C30.451 53.198 29 57.929 29 63c0 14.359 11.641 26 26 26Z"/><circle cx="55" cy="63" r="18"/></svg>';
    }

    function yummyAnimeIcon() {
        return '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M18.45 0H1.55A1.55 1.55 0 0 0 0 1.55v16.9A1.54 1.54 0 0 0 1.55 20h16.9A1.55 1.55 0 0 0 20 18.45V1.55A1.54 1.54 0 0 0 18.45 0Zm-2.83 5.93-2.1 2.66-2.3-5.43a6.95 6.95 0 0 1 4.4 2.77Zm-2.9 6.57h-4l2.03-4.8 1.98 4.8Zm-2.37-9.34L7.8 9.06 4.87 5.33c.64-.7 1.4-1.26 2.27-1.65a8.18 8.18 0 0 1 3.2-.52ZM3.57 7.39l3.2 4.06-1.56 3.58A6.96 6.96 0 0 1 3.57 7.39Zm6.57 9.56c-1.05.01-2.1-.2-3.05-.65l.76-1.8h5.7l.49 1.15a6.93 6.93 0 0 1-3.9 1.3Zm6.8-7.07a7.8 7.8 0 0 1-1.17 4L14.55 11l2.17-2.77c.14.54.21 1.1.23 1.65Z"/></svg>';
    }

    function Recommended(object) {
        return LampaYaniHomeSections.recommended(object, {t: t, history: playbackHistory, toCard: toCard, cardRender: bindRecommendedCardRender});
    }

    function LegacyRecommended(object) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            var history = playbackHistory();
            var ids = Object.keys(history).sort(function (a, b) {
                return Number(history[b].updated_at || 0) - Number(history[a].updated_at || 0);
            }).slice(0, 3);
            this.activity.loader(true);
            if (!ids.length) {
                Lampa.Noty.show(t('recommendations_empty'));
                return LampaYaniApi.catalog({limit: 30, sort: 'top', sort_forward: false}).then(function (payload) {
                    self.build({results: LampaYaniApi.normalize(payload).map(toCard), total_pages: 1, title: t('for_you')});
                }).catch(function () {
                    self.build({results: [], total_pages: 1, title: t('for_you')});
                });
            }
            Promise.all(ids.map(function (id) {
                return LampaYaniApi.recommendations(id).then(LampaYaniApi.normalize).catch(function () { return []; });
            })).then(function (rows) {
                var seen = {};
                var cards = [];
                rows.forEach(function (items) {
                    items.forEach(function (item) {
                        var card = toCard(item);
                        var key = String(card.yani_id || card.title);
                        if (!seen[key]) { seen[key] = true; cards.push(card); }
                    });
                });
                self.build({results: cards.slice(0, 40), total_pages: 1, title: t('for_you')});
            }).catch(function () {
                self.build({results: [], total_pages: 1, title: t('for_you')});
            });
        };
        comp.cardRender = bindYummyCardRender;
        return comp;
    }

    function Updates(object) {
        return LampaYaniHomeSections.updates(object, {t: t, toCard: toCard, normalizeList: normalizeUserList, cardRender: bindYummyCardRender});
    }

    function LegacyUpdates(object) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            if (!LampaYaniAuth.token()) {
                Lampa.Noty.show(t('login_required'));
                return self.build({results: [], total_pages: 1, title: t('updates')});
            }
            LampaYaniApi.profile().then(function (payload) {
                var profile = payload && payload.response ? payload.response : payload;
                return Promise.all([
                    LampaYaniApi.userLists(profile.id).then(normalizeUserList).catch(function () { return []; }),
                    LampaYaniApi.subscriptions(profile.id).then(function (response) {
                        var value = response && response.response ? response.response : response;
                        var items = Array.isArray(value) ? value : value && (value.items || value.data || value.subscriptions || value.anime) || [];
                        return items.map(function (item) {
                            var source = item && (item.anime || item.title_data || item.object) || item;
                            return source && (source.anime_id || source.id || source.title) ? toCard(source) : null;
                        }).filter(Boolean);
                    }).catch(function () { return []; }),
                    LampaYaniApi.schedule().then(function (response) {
                        return LampaYaniApi.normalize(response);
                    }).catch(function () { return []; })
                ]);
            }).then(function (result) {
                var listCards = result[0].filter(function (item) {
                    var list = item.user && item.user.list && item.user.list.list;
                    return list && [0, 1, 5].indexOf(Number(list.id)) >= 0;
                }).map(toCard);
                var cards = listCards.concat(result[1]);
                var schedule = {};
                result[2].forEach(function (item) { schedule[String(item.anime_id || item.id)] = item.episodes || {}; });
                var seen = {};
                cards = cards.filter(function (card) {
                    var key = String(card.yani_id || card.title);
                    if (seen[key]) return false;
                    seen[key] = true;
                    var episodeDates = schedule[key] || {};
                    card.yani_update_date = Number(episodeDates.prev_date || episodeDates.next_date || 0);
                    card.yani_update_episode = Number(episodeDates.aired || 0) || null;
                    return true;
                }).sort(function (a, b) {
                    return Number(b.yani_update_date || 0) - Number(a.yani_update_date || 0);
                });
                self.build({results: cards.slice(0, 20), total_pages: 1, title: t('updates')});
            }).catch(function (error) {
                console.error('[YummyAnime Updates]', error);
                self.activity.loader(false);
                Lampa.Noty.show(t('updates_error'));
            });
        };
        comp.cardRender = bindYummyCardRender;
        return comp;
    }

    function History(object) {
        return LampaYaniHomeSections.history(object, {t: t, history: playbackHistory, toCard: toCard, historyCardRender: bindHistoryCardRender});
    }

    function LegacyHistory(object) {
        var comp = new Lampa.InteractionCategory(object);

        comp.create = function () {
            var self = this;
            var history = playbackHistory();
            var ids = Object.keys(history).sort(function (a, b) {
                return Number(history[b].updated_at || 0) - Number(history[a].updated_at || 0);
            }).slice(0, 20);

            this.activity.loader(true);
            if (!ids.length) {
                this.build({results: [], total_pages: 1, title: t('history_empty')});
                Lampa.Noty.show(t('history_empty'));
                return;
            }

            Promise.all(ids.map(function (id) {
                var saved = history[id] || {};
                var fallback = toCard(saved.card || {anime_id: id, title: saved.title || t('untitled'), poster: saved.poster || ''});
                return LampaYaniApi.detail(id).then(function (payload) {
                    var item = payload && payload.response ? payload.response : payload;
                    var card = item ? toCard(item) : fallback;
                    card.yani_id = card.yani_id || Number(id) || id;
                    return card;
                }).catch(function () { return fallback; });
            })).then(function (cards) {
                self.build({results: cards.filter(Boolean), total_pages: 1, title: t('continue_watching')});
            }).catch(function (error) {
                console.error('[YummyAnime History]', error);
                self.activity.loader(false);
                Lampa.Noty.show(t('history_load_error'));
            });
        };

        comp.cardRender = bindHistoryCardRender;

        return comp;
    }

    function bindHistoryCardRender(first, second, third) {
        bindYummyCardRender(first, second, third);
        var card;
        [first, second, third].forEach(function (value) {
            if (!value || card) return;
            if (value.render || value.yani_id || value.title) card = value;
            else {
                var candidate = value.card || value.object || value.data;
                if (candidate && (candidate.render || candidate.yani_id || candidate.title)) card = candidate;
            }
        });
        if (card && card.yani_id) {
            // Continue Watching is a playback queue, not an information catalog.
            card.onEnter = function () { openVideos(card, true); };
        }
    }

    function bindYummyCardRender(first, second, third, options) {
        var element;
        var card;
        [first, second, third].forEach(function (value) {
            if (!value) return;
            var isElement = value.jquery || value.nodeType || (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement);
            if (isElement) element = value;
            else if (!card && hasYummyCardData(value)) card = value;
        });
        [first, second, third].forEach(function (value) {
            if (!value || card) return;
            var candidate = value.card || value.object || value.data;
            if (candidate && hasYummyCardData(candidate)) card = candidate;
        });
        if (!element && second && (second.jquery || second.nodeType)) element = second;
        if (!card && first && hasYummyCardData(first)) card = first;
        if (!element && card && card.render) element = card.render(true);
        if (!card || !element) return;
        bindYummyCard(element, card, options);
    }

    function hasYummyCardData(value) {
        // Do not attach YummyAnime handlers to arbitrary Lampa cards.  The
        // previous title-based check also matched native TMDB cards and left
        // Lampa trying to open a movie with an undefined id.
        return Boolean(value && (value.yani_id || value.anime_id || value.animeId ||
            value.anime && (value.anime.yani_id || value.anime.anime_id || value.anime.animeId)));
    }

    function bindRecommendedCardRender(first, second, third) {
        bindYummyCardRender(first, second, third, {openYummyDetail: true});
    }

    function cardRenderElement(element, card) {
        var render = element && element.jquery ? element : element ? $(element) : $();
        if (!render.length && card && card.render) render = $(card.render(true));
        return render;
    }

    function bindYummyCard(element, card, options) {
        // Keep an explicit marker on the original Lampa card.  Some Lampa
        // versions preserve only custom fields when forwarding a card to the
        // default detail handler.
        card._yani_card = true;
        addCardRatings(element, card);
        addCardMediaBadges(element, card);
        addCardUpdateBadge(element, card);
        addCardListBadge(element, card);
        LampaYaniMedia.attachPosterFallback(element, card);
        // Some Lampa versions clone the card object after cardRender. Keep a
        // DOM-level handler as a fallback so search results remain clickable.
        var rendered = cardRenderElement(element, card);
        // Lampa cards already have a default `hover:enter` handler. Some
        // builds attach it to an inner card element, not the rendered root.
        // Remove it from the full YummyAnime card tree: otherwise one Enter
        // can still attempt a native TMDB detail with id=undefined before our
        // resolver has chosen a real match or the YummyAnime fallback.
        rendered.add(rendered.find('*')).off('hover:enter click');
        var openCard = options && options.openYummyDetail ? function () { openYummyDetail(card, false); } : function () { openCardOnce(card); };
        rendered.on('hover:enter.yaniOpen click.yaniOpen', function (event) {
            if (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            openCard();
            return false;
        });
        card.onEnter = openCard;
        card.onMenu = function () {
            if (card.yani_id) showYummyActions(card);
        };
    }

    function openCardOnce(card) {
        var id = getYummyId(card);
        if (!card || !id || card._yani_opening) return;
        card.yani_id = id;
        card._yani_opening = true;
        openStandardLampaCard(card);
        setTimeout(function () { card._yani_opening = false; }, 10000);
    }

    function getYummyId(card) {
        if (!card) return null;
        return card.yani_id || card.anime_id || card.animeId ||
            card.anime && (card.anime.yani_id || card.anime.anime_id || card.anime.animeId) || null;
    }

    function addCardMediaBadges(element, card) {
        var requested = false;
        var cardRender = cardRenderElement(element, card);
        renderCardMediaBadges(element, card, card.yani_media || mediaMeta(card));
        if (!card.yani_id || (card.yani_media && card.yani_media.loaded)) return;

        cardRender.off('hover:focus.yaniMedia').one('hover:focus.yaniMedia', function () {
            if (requested) return;
            requested = true;
            LampaYaniApi.videos(card.yani_id).then(function (payload) {
                var videos = payload && payload.response ? payload.response : payload;
                card.yani_media = mediaMeta({videos: Array.isArray(videos) ? videos : []});
                card.yani_media.loaded = true;
                renderCardMediaBadges(element, card, card.yani_media);
            }).catch(function () {});
        });
    }

    function renderCardMediaBadges(element, card, meta) {
        if (!meta || (!meta.quality && !meta.voices)) return;
        var render = cardRenderElement(element, card);
        var view = $('.card__view', render).first();
        if (!view.length) return;
        var block = $('.yani-card-media', view);
        if (!block.length) block = $('<div class="yani-card-media"></div>').appendTo(view);
        block.empty();
        if (meta.quality) block.append($('<span class="yani-card-media__badge yani-card-media__quality"></span>').text(meta.quality));
        if (meta.voices) block.append($('<span class="yani-card-media__badge yani-card-media__voices"></span>').text(meta.voices + ' ' + t('voices_short')));
    }

    function addCardUpdateBadge(element, card) {
        if (!card || !card.yani_update_episode) return;
        var render = cardRenderElement(element, card);
        var view = $('.card__view', render).first();
        if (!view.length || view.find('.yani-card-update').length) return;
        view.append($('<span class="yani-card-update"></span>').text(t('episode') + ' ' + card.yani_update_episode));
    }

    function addCardListBadge(element, card) {
        if (!card || (card.yani_list_id === null && !card.yani_is_favorite)) return;
        var render = cardRenderElement(element, card);
        var view = $('.card__view', render).first();
        if (!view.length) return;
        var badge = $('.yani-card-list', view);
        if (!badge.length) badge = $('<span class="yani-card-list"></span>').appendTo(view);
        var labels = {0: t('watching'), 1: t('planned'), 2: t('completed'), 3: t('dropped'), 5: t('postponed')};
        var label = labels[card.yani_list_id] || '';
        if (card.yani_is_favorite) label = label ? label + ' · ♥' : '♥';
        badge.text(label);
    }

    function showYummyActions(card) {
        if (!card || !card.yani_id) return;
        var items = [
            {title: t('watch'), action: 'watch'},
            {title: t('yummy_details'), action: 'details'},
            {title: t('comments'), action: 'comments'}
        ];
        if (LampaYaniAuth.token()) {
            items = items.concat([
                {title: t('favorite'), action: 'favorite'},
                {title: listActionTitle(card, 'watching'), action: 'watching'},
                {title: listActionTitle(card, 'planned'), action: 'planned'},
                {title: listActionTitle(card, 'completed'), action: 'completed'},
                {title: listActionTitle(card, 'dropped'), action: 'dropped'},
                {title: listActionTitle(card, 'postponed'), action: 'postponed'}
            ], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (value) {
                return {title: value + '/10', value: value};
            }));
        } else {
            items.push({title: t('login_name'), action: 'login'});
        }

        Lampa.Select.show({
            title: t('actions'),
            items: items,
            onSelect: function (item) {
                if (item.action === 'watch') return openVideos(card);
                if (item.action === 'details') return openYummyDetail(card, false);
                if (item.action === 'comments') return commentsMenu(card.yani_id);
                if (item.action === 'login') return openSettingsLogin();
                if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('login_required'));
                var action = item.action === 'favorite' ? LampaYaniApi.addFavorite(card.yani_id) : item.action ? LampaYaniApi.addToList(card.yani_id, item.action) : LampaYaniApi.rate(card.yani_id, item.value);
                action.then(function () {
                    if (item.action === 'favorite') card.yani_is_favorite = true;
                    else if (item.action) card.yani_list_id = {watching: 0, planned: 1, completed: 2, dropped: 3, postponed: 5}[item.action];
                    addCardListBadge(null, card);
                    Lampa.Noty.show(t('saved'));
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('save_error'));
                });
            }
        });
    }

    function listActionTitle(card, key) {
        var ids = {watching: 0, planned: 1, completed: 2, dropped: 3, postponed: 5};
        var title = t(key);
        return hasYummyList(card, ids[key]) ? '✓ ' + title : title;
    }

    function hasYummyList(card, listId) {
        return Boolean(card) && card.yani_list_id !== null && card.yani_list_id !== undefined && card.yani_list_id !== '' && Number(card.yani_list_id) === listId;
    }

    function Account(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
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
                    LampaYaniApi.userLists(profile.id).then(responseData).catch(function () { return []; }),
                    LampaYaniApi.userStatsGenres(profile.id).then(responseData).catch(function () { return []; }),
                    LampaYaniApi.userStatsRatings(profile.id).then(responseData).catch(function () { return []; }),
                    LampaYaniApi.userStatsTypes(profile.id).then(responseData).catch(function () { return []; })
                ]);
            }).then(function (result) {
                renderAccount(result[0], result[1], result[2], result[3], result[4], result[5]);
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

        function renderAccount(profile, stats, lists, genreStats, ratingStats, typeStats) {
            stats = Array.isArray(stats) ? stats : [];
            lists = Array.isArray(lists) ? lists : [];
            var header = $('<div class="yani-account__profile selector"></div>');
            var avatar = profile.avatars && (profile.avatars.big || profile.avatars.full || profile.avatars.small);
            if (avatar && avatar.indexOf('//') === 0) avatar = 'https:' + avatar;
            if (avatar) header.append($('<img class="yani-account__avatar" alt="">').attr('src', avatar));

            var identity = $('<div class="yani-account__identity"></div>');
            identity.append($('<div class="yani-account__name"></div>').text(profile.nickname || 'YummyAnime User'));
            identity.append($('<div class="yani-account__status"></div>').text(t('authorized')));
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

            var notificationButton = $('<div class="yani-account__notification-button selector"></div>');
            notificationButton.append($('<strong></strong>').text(t('notifications')));
            notificationButton.append($('<span></span>').text(String(profile.notifications && (profile.notifications.unread_count || profile.notifications.count) || 0) + ' ' + t('unread')));
            bindAccountFocus(notificationButton);
            notificationButton.on('hover:enter click.yaniNotifications', openNotifications);
            content.append(notificationButton);
            var subscriptionsButton = $('<div class="yani-account__notification-button selector"></div>');
            subscriptionsButton.append($('<strong></strong>').text(t('subscriptions')));
            subscriptionsButton.append($('<span></span>').text(t('subscriptions')));
            bindAccountFocus(subscriptionsButton);
            subscriptionsButton.on('hover:enter click.yaniSubscriptions', function () { openSubscriptions(profile.id); });
            content.append(subscriptionsButton);
            // Manual synchronization remains available from the account page
            // when automatic progress synchronization is deliberately off.
            if (!autoProgressSyncEnabled()) {
                var syncButton = $('<div class="yani-account__notification-button selector"></div>');
                syncButton.append($('<strong></strong>').text(t('sync_history')));
                syncButton.append($('<span></span>').text(t('sync_history_description')));
                bindAccountFocus(syncButton);
                syncButton.on('hover:enter click.yaniSync', syncPlaybackHistoryManually);
                content.append(syncButton);
            }
            var reviewsButton = $('<div class="yani-account__notification-button selector"></div>');
            reviewsButton.append($('<strong></strong>').text(t('my_reviews')));
            reviewsButton.append($('<span></span>').text(t('my_reviews_description')));
            bindAccountFocus(reviewsButton);
            reviewsButton.on('hover:enter click.yaniReviews', function () { openUserReviews(profile.id); });
            content.append(reviewsButton);

            var counts = {};
            lists.forEach(function (anime) {
                var userList = anime.user && anime.user.list;
                if (!userList) return;
                if (userList.list && typeof userList.list.id !== 'undefined') counts[userList.list.id] = (counts[userList.list.id] || 0) + 1;
                if (userList.is_fav) counts[4] = (counts[4] || 0) + 1;
            });

            content.append($('<div class="yani-account__section-title"></div>').text(t('list_stats')));
            var listGrid = $('<div class="yani-account__lists"></div>');
            accountListDefinitions().forEach(function (definition) {
                var stat = stats.filter(function (item) { return Number(item.list && item.list.id) === definition.id; })[0] || {};
                var tile = $('<div class="yani-account__list selector"></div>');
                tile.append($('<div class="yani-account__list-title"></div>').text(definition.title));
                tile.append($('<div class="yani-account__list-count"></div>').text(String(counts[definition.id] || 0) + ' ' + t('anime_count')));
                tile.append($('<div class="yani-account__list-time"></div>').text(t('total_time') + ': ' + formatWatchTime(stat.seconds)));
                bindAccountFocus(tile);
                tile.on('hover:enter', function () { openAccountList(definition, lists, profile.id); });
                listGrid.append(tile);
            });
            content.append(listGrid);
            renderAccountStatistics(genreStats, ratingStats, typeStats);
        }

        function renderAccountStatistics(genreStats, ratingStats, typeStats) {
            var sections = [
                {title: t('genres_statistics'), items: genreStats, label: function (item) { return item.title || item.name; }},
                {title: t('ratings_statistics'), items: ratingStats, label: function (item) { return String(item.rating || '—'); }},
                {title: t('types_statistics'), items: typeStats, label: function (item) { return item.type && (item.type.name || item.type.shortname) || item.name; }}
            ];
            var available = sections.filter(function (section) { return Array.isArray(section.items) && section.items.length; });
            if (!available.length) return;
            content.append($('<div class="yani-account__section-title"></div>').text(t('account_statistics')));
            available.forEach(function (section) {
                var block = $('<div class="yani-account__stats"></div>');
                block.append($('<div class="yani-account__stats-title"></div>').text(section.title));
                section.items.slice(0, 12).forEach(function (item) {
                    var row = $('<div class="yani-account__stats-row selector"></div>');
                    row.append($('<span></span>').text(section.label(item) || '—'));
                    row.append($('<strong></strong>').text(String(item.count || 0)));
                    bindAccountFocus(row);
                    block.append(row);
                });
                content.append(block);
            });
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
                var target = event.currentTarget || event.target;
                last = target;
                scroll.update($(target), true);
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
                down: function () { LampaYaniNavigation.moveDown(scroll); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function AuthPage(object) {
        return LampaYaniAuthPage.create(object, {
            t: t,
            input: showYummyInput,
            goBack: goBack
        });
    }

    function LegacyAuthPage(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-auth"></div>');
        var content = $('<div class="yani-auth__content"></div>');
        var loginValue = (LampaYaniAuth.get().login || '').trim();
        var passwordValue = '';
        var last;

        this.create = function () {
            render();
            scroll.append(content);
            html.append(scroll.render(true));
            this.activity.loader(false);
            this.activity.toggle();
        };

        function render() {
            content.empty();
            var account = LampaYaniAuth.get();
            var authorized = Boolean(LampaYaniAuth.token());
            content.append($('<div class="yani-auth__title"></div>').text(t('auth_title')));
            content.append($('<div class="yani-auth__status ' + (authorized ? 'is-authorized' : '') + '"></div>').text(authorized ? t('auth_authorized') : t('auth_not_authorized')));

            var form = $('<div class="yani-auth__form"></div>');
            addField(form, t('auth_login'), loginValue || t('auth_login_empty'), function () {
                showYummyInput({title: t('email_prompt'), value: loginValue, nosave: true, align: 'center'}, function (value) {
                    loginValue = String(value || '').trim();
                    render();
                });
            });
            addField(form, t('auth_password'), passwordValue ? '••••••••' : t('auth_password_empty'), function () {
                showYummyInput({title: t('password_prompt'), value: '', password: true, nosave: true, align: 'center'}, function (value) {
                    passwordValue = String(value || '');
                    render();
                });
            });
            content.append(form);

            var actions = $('<div class="yani-auth__actions"></div>');
            if (!authorized) addAction(actions, t('auth_submit'), 'primary', submitLogin);
            if (authorized) {
                addAction(actions, t('refresh_name'), '', refreshToken);
                addAction(actions, t('logout_name'), '', logout);
            }
            content.append(actions);
            if (authorized && account.login) content.append($('<div class="yani-auth__account"></div>').text(t('auth_account') + ': ' + account.login));
            content.append($('<div class="yani-auth__hint"></div>').text(t('auth_hint')));
        }

        function addField(parent, title, value, action) {
            var field = $('<div class="yani-auth__field selector"></div>');
            field.append($('<div class="yani-auth__field-title"></div>').text(title));
            field.append($('<div class="yani-auth__field-value"></div>').text(value));
            bindFocus(field);
            field.on('hover:enter', action);
            parent.append(field);
        }

        function addAction(parent, title, className, action) {
            var button = $('<div class="yani-auth__button selector ' + (className ? 'yani-auth__button--' + className : '') + '"></div>').text(title);
            bindFocus(button);
            button.on('hover:enter', action);
            parent.append(button);
        }

        function bindFocus(element) {
            element.on('hover:focus', function (event) {
                var target = event.currentTarget || event.target;
                last = target;
                scroll.update($(target), true);
            });
        }

        function submitLogin() {
            if (!loginValue) return Lampa.Noty.show(t('email_required'));
            if (!passwordValue) return Lampa.Noty.show(t('password_required'));
            Lampa.Loading && Lampa.Loading.start && Lampa.Loading.start();
            LampaYaniAuth.login(loginValue, passwordValue).then(function () {
                return LampaYaniApi.profile().then(function (payload) {
                    var profile = payload && payload.response ? payload.response : payload;
                    var current = LampaYaniAuth.get();
                    LampaYaniAuth.save({token: current.token, login: current.login, display_name: profile && (profile.nickname || profile.name) || current.login});
                }).catch(function () {});
            }).then(function () {
                passwordValue = '';
                Lampa.Noty.show(t('login_ok'));
                goBack();
            }).catch(function (error) {
                console.error('[YummyAnime Auth]', error);
                Lampa.Noty.show(t('login_error'));
            }).then(function () { Lampa.Loading && Lampa.Loading.stop && Lampa.Loading.stop(); });
        }

        function refreshToken() {
            LampaYaniAuth.refresh().then(function () {
                Lampa.Noty.show(t('token_refreshed'));
                render();
            }).catch(function () { Lampa.Noty.show(t('token_refresh_error')); });
        }

        function logout() {
            LampaYaniAuth.logout().then(function () {
                Lampa.Noty.show(t('logged_out'));
                render();
            }).catch(function () {
                Lampa.Noty.show(t('token_removed'));
                render();
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
                down: function () { LampaYaniNavigation.moveDown(scroll); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function openNotifications() {
        Lampa.Activity.push({url: 'yani/notifications', title: t('notifications_title'), component: 'yani_notifications'});
    }

    function openSubscriptions(userId) {
        Lampa.Activity.push({url: 'yani/subscriptions', title: t('subscriptions'), component: 'yani_subscriptions', userId: userId});
    }

    function openUserReviews(userId) {
        LampaYaniApi.userReviews(userId, 30, 0).then(function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            var items = Array.isArray(response) ? response : response && (response.items || response.data || response.reviews) || [];
            if (!items.length) return Lampa.Noty.show(t('reviews_empty'));
            Lampa.Select.show({title: t('my_reviews'), items: items.map(function (review) {
                var anime = review.anime || review.title_data || review.object || {};
                var title = anime.title || anime.name || review.anime_title || review.title || t('anime');
                var text = cleanCommentText(review.text || review.body || review.description || '');
                var score = review.rate || review.rating || review.score;
                return {
                    title: title + (score ? ' · ' + score + '/10' : ''),
                    subtitle: text.slice(0, 180),
                    review: review,
                    anime: anime
                };
            }), onSelect: function (item) {
                var anime = item.anime || {};
                var id = anime.anime_id || anime.id || item.review.anime_id;
                if (id) openYummyDetail(toCard(anime.anime_id || anime.id ? anime : {anime_id: id, title: item.title}), true);
            }});
        }).catch(function (error) {
            console.error('[YummyAnime Reviews]', error);
            Lampa.Noty.show(t('reviews_error'));
        });
    }

    function Subscriptions(object) {
        return LampaYaniAccountLists.subscriptions(object, {toCard: toCard, cardRender: bindYummyCardRender, t: t});
    }

    function LegacySubscriptions(object) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            LampaYaniApi.subscriptions(object.userId).then(function (payload) {
                var response = payload && payload.response ? payload.response : payload;
                var values = Array.isArray(response) ? response : response && (response.anime || response.items || response.data || response.subscriptions) || [];
                var cards = values.map(function (item) {
                    var source = item && (item.anime || item.title_data || item.object) || item;
                    return source && (source.anime_id || source.id || source.title) ? toCard(source) : null;
                }).filter(Boolean);
                if (!cards.length) Lampa.Noty.show(t('subscriptions_empty'));
                self.build({results: cards, total_pages: 1, title: t('subscriptions')});
            }).catch(function (error) {
                console.error('[YummyAnime Subscriptions]', error);
                self.activity.loader(false);
                Lampa.Noty.show(t('subscriptions_error'));
            });
        };
        comp.cardRender = bindYummyCardRender;
        return comp;
    }

    function Notifications(object) {
        return LampaYaniNotifications.create(object, {
            t: t,
            normalize: normalizeNotifications,
            formatDate: formatNotificationDate,
            toCard: toCard,
            openDetail: openYummyDetail,
            goBack: goBack
        });
    }

    function LegacyNotifications(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-notifications"></div>');
        var content = $('<div class="yani-notifications__content"></div>');
        var last;
        var offset = 0;

        this.create = function () {
            var self = this;
            this.activity.loader(true);
            LampaYaniApi.notifications(30, offset).then(function (payload) {
                renderNotifications(normalizeNotifications(payload), offset > 0);
                scroll.append(content);
                html.append(scroll.render(true));
                self.activity.loader(false);
                self.activity.toggle();
            }).catch(function (error) {
                console.error('[YummyAnime Notifications]', error);
                content.append($('<div class="yani-account__notice"></div>').text(t('notifications_error')));
                scroll.append(content);
                html.append(scroll.render(true));
                self.activity.loader(false);
                self.activity.toggle();
            });
        };

        function renderNotifications(items, append) {
            if (!append) content.empty();
            var title = $('<div class="yani-notifications__title"></div>').text(t('notifications_title'));
            var markAll = $('<div class="yani-detail__button selector"></div>').text(t('mark_all_read'));
            markAll.on('hover:enter click', function () {
                LampaYaniApi.markAllNotificationsRead().then(function () {
                    content.find('.yani-notification').removeClass('unread');
                    Lampa.Noty.show(t('saved'));
                });
            });
            var deleteAll = $('<div class="yani-detail__button selector"></div>').text(t('delete_all_notifications'));
            deleteAll.on('hover:enter click', function () {
                LampaYaniApi.deleteAllNotifications().then(function () { content.empty(); content.append(title).append($('<div class="yani-account__notice"></div>').text(t('notifications_empty'))); });
            });
            if (!append) content.append(title, markAll, deleteAll);
            if (!items.length) {
                if (!append) content.append($('<div class="yani-account__notice"></div>').text(t('notifications_empty')));
                return;
            }
            items.forEach(function (notification) {
                var item = $('<div class="yani-notification selector"></div>');
                if (!notification.viewed && !notification.read) item.addClass('unread');
                item.append($('<div class="yani-notification__title"></div>').text(notification.title || notification.type || t('notification')));
                if (notification.text || notification.message) item.append($('<div class="yani-notification__text"></div>').text(notification.text || notification.message));
                var notificationDate = notification.date || notification.date_seconds || notification.dateSeconds;
                if (notificationDate) item.append($('<div class="yani-notification__date"></div>').text(formatNotificationDate(notificationDate)));
                item.on('hover:focus', function (event) { var target = event.currentTarget || event.target; last = target; scroll.update($(target), true); });
                item.on('hover:enter click', function () {
                    if (notification.id && !notification.viewed) LampaYaniApi.markNotificationRead(notification.id).catch(function () {});
                    var animeId = notification.anime_id || notification.object_id || notification.objectId;
                    if (animeId) openYummyDetail(toCard({anime_id: animeId, title: notification.title || t('anime')}), false);
                });
                content.append(item);
            });
            var more = $('<div class="yani-detail__button selector"></div>').text(t('notifications_more'));
            more.on('hover:enter click', function () {
                more.remove();
                offset += items.length;
                LampaYaniApi.notifications(30, offset).then(function (payload) { renderNotifications(normalizeNotifications(payload), true); });
            });
            content.append(more);
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { LampaYaniNavigation.moveDown(scroll); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };
        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function accountListDefinitions() {
        var favorites = LampaYaniI18n.getLanguage() === 'en' ? 'Favorites' : 'Любимые';
        return [
            {id: 0, key: 'watching', title: t('watching')},
            {id: 1, key: 'planned', title: t('planned')},
            {id: 2, key: 'completed', title: t('completed')},
            {id: 3, key: 'dropped', title: t('dropped')},
            {id: 4, key: 'favorites', title: favorites},
            {id: 5, key: 'postponed', title: t('postponed')}
        ];
    }

    function openAccountList(definition, items, userId) {
        var selected = (items || []).filter(function (item) {
            var userList = item.user && item.user.list;
            return definition.id === 4 ? Boolean(userList && userList.is_fav) : Boolean(userList && userList.list && Number(userList.list.id) === definition.id);
        });
        var load = definition.id === 4 || !userId ? Promise.resolve(selected) : LampaYaniApi.userList(userId, definition.id).then(function (payload) {
            var result = normalizeUserList(payload);
            return result.length ? result : selected;
        }).catch(function () { return selected; });
        load.then(function (result) {
            Lampa.Activity.push({
                url: 'yani/account/list/' + definition.key,
                title: 'YummyAnime · ' + definition.title,
                component: 'yani_account_list',
                items: result
            });
        });
    }

    function normalizeUserList(payload) {
        var response = payload && payload.response ? payload.response : payload;
        var values = Array.isArray(response) ? response : response && (response.anime || response.results || response.items || response.data) || [];
        return values.map(function (item) {
            if (!item || !item.anime || typeof item.anime !== 'object') return item;
            var anime = Object.assign({}, item.anime);
            if (item.user) anime.user = item.user;
            return anime;
        }).filter(Boolean);
    }

    function AccountList(object) {
        return LampaYaniAccountLists.accountList(object, {toCard: toCard, cardRender: bindYummyCardRender});
    }

    function LegacyAccountList(object) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            this.build({results: (object.items || []).map(toCard), total_pages: 1, title: object.title});
        };
        comp.cardRender = bindYummyCardRender;
        return comp;
    }

    function formatAccountDate(timestamp) {
        if (!timestamp) return '—';
        try {
            return new Date(Number(timestamp) * 1000).toLocaleDateString(locale(), {day: 'numeric', month: 'long', year: 'numeric'});
        } catch (error) {
            return new Date(Number(timestamp) * 1000).toLocaleDateString();
        }
    }

    function normalizeNotifications(payload) {
        var response = payload && payload.response ? payload.response : payload;
        var values = Array.isArray(response) ? response : response && (response.notifications || response.items || response.data) || [];
        return Array.isArray(values) ? values : [];
    }

    function formatNotificationDate(value) {
        if (!value) return '';
        if (typeof value === 'number' || /^\d+$/.test(String(value))) return formatAccountDate(value);
        var parsed = new Date(value);
        return isNaN(parsed.getTime()) ? String(value) : parsed.toLocaleString(locale(), {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'});
    }

    function formatWatchTime(seconds) {
        var hours = Math.floor(Number(seconds || 0) / 3600);
        var days = Math.floor(hours / 24);
        var restHours = hours % 24;
        return days ? days + ' ' + t('days_short') + ' ' + restHours + ' ' + t('hours_short') : hours + ' ' + t('hours_short');
    }

    function StatusDashboard(object) {
        return LampaYaniStatus.create(object, {
            t: t,
            locale: locale,
            goBack: goBack
        });
    }

    function LegacyStatusDashboard(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
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

            var legend = $('<div class="yani-status__legend selector"></div>');
            legend.append('<span class="yani-status__dot yani-status__dot--up"></span>' + t('up') + ' <span class="yani-status__dot yani-status__dot--degraded"></span>' + t('unstable') + ' <span class="yani-status__dot yani-status__dot--down"></span>' + t('down'));
            bindStatusFocus(legend);
            content.append(legend);

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

            var source = $('<div class="yani-status__source selector"></div>').text(t('source') + ': YummyStatus · ' + t('period') + ': ' + periodLabels[currentPeriod] + ' · ' + t('snapshot_notice'));
            bindStatusFocus(source);
            content.append(source);

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
                var target = event.currentTarget || event.target;
                last = target;
                scroll.update($(target), true);
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
                down: function () { LampaYaniNavigation.moveDown(scroll); },
                back: goBack
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
        return LampaYaniSchedule.create(object, {
            t: t,
            locale: locale,
            toCard: toCard,
            openYummyDetail: openYummyDetail,
            goBack: goBack
        });
    }

    // Kept temporarily as an internal fallback while deployed clients refresh the bundle.
    function LegacySchedule(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-schedule"></div>');
        var content = $('<div class="yani-schedule__content"></div>');
        var last;
        var dayGroups = [];
        var selectedDay = 0;

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
            dayGroups = [];

            // Keep a short history as well as upcoming releases. The API
            // may return no items for a past day, but the date remains
            // navigable so the user can move backward and forward uniformly.
            for (var dayOffset = -7; dayOffset <= 7; dayOffset++) {
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

                dayGroups.push({day: day, offset: dayOffset, releases: releases});
            }

            var days = $('<div class="yani-schedule__days"></div>');
            dayGroups.forEach(function (group, index) {
                var chip = $('<div class="yani-schedule__day-chip selector"></div>');
                chip.append($('<div class="yani-schedule__day-name"></div>').text(formatScheduleDay(group.day, group.offset)));
                chip.append($('<div class="yani-schedule__day-count"></div>').text(group.releases.length));
                chip.on('hover:focus', function () {
                    content.find('.yani-schedule__day-chip.focus').removeClass('focus');
                    chip.addClass('focus');
                });
                chip.on('hover:blur', function () { chip.removeClass('focus'); });
                chip.on('hover:enter click.yaniScheduleDay', function () { selectScheduleDay(index); });
                days.append(chip);
            });
            content.append(days);
            content.append($('<div class="yani-schedule__selected-title"></div>'));
            content.append($('<div class="yani-schedule__releases"></div>'));
            selectScheduleDay(dayGroups.findIndex(function (group) { return group.offset === 0; }));
        }

        function selectScheduleDay(index) {
            selectedDay = Math.max(0, Math.min(index, dayGroups.length - 1));
            var group = dayGroups[selectedDay];
            if (!group) return;
            content.find('.yani-schedule__day-chip').removeClass('selected');
            content.find('.yani-schedule__day-chip').eq(selectedDay).addClass('selected');
            content.find('.yani-schedule__selected-title').text(formatScheduleDay(group.day, group.offset));
            var releases = content.find('.yani-schedule__releases').empty();
            if (!group.releases.length) releases.append($('<div class="yani-schedule__empty"></div>').text(t('no_releases')));
            else group.releases.forEach(function (item) { releases.append(createScheduleItem(item)); });
        }

        function createScheduleItem(item) {
            var card = toCard(item);
            var episodes = item.episodes || {};
            var releaseDate = new Date(Number(episodes.next_date) * 1000);
            var row = $('<div class="yani-schedule__item selector"></div>');
            var poster = $('<img class="yani-schedule__poster" alt="">').attr('src', card.poster || '');
            LampaYaniMedia.bindPosterFallback(poster, card);
            var info = $('<div class="yani-schedule__info"></div>');
            var release = $('<div class="yani-schedule__release"></div>');

            info.append($('<div class="yani-schedule__title"></div>').text(card.title));
            info.append($('<div class="yani-schedule__episode"></div>').text(formatEpisode(episodes)));
            release.append($('<div class="yani-schedule__time"></div>').text(formatScheduleTime(releaseDate)));
            release.append($('<div class="yani-schedule__timezone"></div>').text(t('local_time')));
            row.append(poster, info, release);
            var opened = false;
            function openScheduleCard() {
                if (opened) return;
                opened = true;
                card.yani_schedule = formatEpisode(episodes) + ', ' + formatScheduleDateTime(releaseDate);
                openStandardLampaCard(card);
                setTimeout(function () { opened = false; }, 500);
            }

            row.on('hover:focus', function (event) {
                var target = event.currentTarget || event.target;
                content.find('.yani-schedule__item.focus').removeClass('focus');
                row.addClass('focus');
                last = target;
                scroll.update($(target), true);
            });
            row.on('hover:blur', function () { row.removeClass('focus'); });
            row.on('hover:enter click.yaniSchedule', openScheduleCard);

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
                down: function () { if (Navigator.canmove('down')) Navigator.move('down'); else scroll.wheel(300); },
                back: goBack
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
        object = object || {};
        var restoredActivity = !object.card || typeof object.card !== 'object' || !getYummyId(object.card);
        var data = object.card || object.object || object.data || {};
        var routeId = LampaYaniUiUtils.detailRouteId(object);
        if (routeId && !getYummyId(data)) data = Object.assign({}, data, {yani_id: routeId});
        if (!data.title && object.title) data.title = object.title;
        var html = $('<div class="yani-detail"></div>');
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var button;

        html.on('hover:focus', function (event) {
            var target = $(event.target).closest('.selector');
            if (target.hasClass('selector')) scroll.update(target, true);
        });

        this.create = function () {
            var self = this;
            var settled = false;
            var timeoutId;
            this.activity.loader(true);

            function finish(card) {
                if (settled) return;
                settled = true;
                if (timeoutId) clearTimeout(timeoutId);
                try {
                    renderDetail(card);
                } catch (error) {
                    console.error('[YummyAnime Detail render]', error);
                    html.empty().append($('<div class="yani-detail__error selector"></div>').text(t('detail_load_error')));
                } finally {
                    self.activity.loader(false);
                    self.activity.toggle();
                }
            }

            function canRenderSnapshot(card) {
                return Boolean(card && (card.img || card.poster || card.overview ||
                    card.yani_titles && card.yani_titles.length || card.yani_ratings && card.yani_ratings.length));
            }

            function fail(error) {
                if (settled) return;
                settled = true;
                if (timeoutId) clearTimeout(timeoutId);
                if (error) console.error('[YummyAnime Detail restore]', error);
                self.activity.loader(false);

                // Plugin cache resets can restore the route but discard its
                // transient card object. If the route can no longer be
                // hydrated, replace the broken activity with YummyAnime Home
                // instead of leaving an unusable partial title page onscreen.
                if (restoredActivity && Lampa.Activity && Lampa.Activity.replace) {
                    setTimeout(function () {
                        Lampa.Activity.replace({url: 'yani', title: 'YummyAnime', component: 'yani_home'});
                    }, 0);
                    return;
                }
                html.empty();
                button = $('<div class="yani-detail__error selector"></div>').text(t('detail_load_error'));
                bindDetailButtonFocus(button);
                html.append(button);
                scroll.append(html);
                self.activity.toggle();
            }

            timeoutId = setTimeout(function () {
                console.error('[YummyAnime Detail] timeout');
                if (canRenderSnapshot(data)) finish(data);
                else fail(new Error('Detail restore timed out'));
            }, 20000);

            if (routeId || data.yani_id) {
                var detailId = routeId || data.yani_id;
                data.yani_id = detailId;
                LampaYaniApi.detail(detailId).then(function (payload) {
                    var item = payload && payload.response ? payload.response : payload;
                    var detailed = item ? toCard(item) : data;
                    if (!detailed.yani_id) detailed.yani_id = detailId;
                    detailed.yani_schedule = data.yani_schedule;
                    finish(detailed);
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    if (canRenderSnapshot(data)) finish(data);
                    else fail(error);
                });
            } else {
                if (canRenderSnapshot(data)) finish(data);
                else fail(new Error('YummyAnime detail id is missing'));
            }
        };

        function renderDetail(cardData) {
            data = cardData;
            var poster = $('<img class="yani-detail__poster">').attr('src', data.img || data.poster || '');
            LampaYaniMedia.bindPosterFallback(poster, data);
            var info = $('<div class="yani-detail__info"></div>');
            // The title is deliberately a selector: it is the first focusable
            // item on the page, so moving up from the actions returns the
            // viewport to the beginning of the detail card.
            var title = $('<div class="yani-detail__title selector"></div>').text(data.title || 'YummyAnime');
            bindDetailButtonFocus(title);
            info.append(title);
            var alternativeTitles = (data.yani_titles || []).filter(function (title) { return title && title !== data.title; });
            if (alternativeTitles.length) info.append($('<div class="yani-detail__alternative-titles"></div>').text(alternativeTitles.join(' · ')));
            var genres = detailGenres(data);
            if (genres.length) info.append(createDetailGenres(genres));
            if (data.release_date) info.append($('<div class="yani-detail__meta"></div>').text(data.release_date));
            info.append(createDetailRatings(data.yani_ratings || [], data.vote_count));
            if (data.yani_user_rating) info.append($('<div class="yani-detail__personal-rating"></div>').text(t('my_rating') + ': ' + data.yani_user_rating + '/10'));
            if (data.yani_schedule) info.append($('<div class="yani-detail__schedule"></div>').text(data.yani_schedule));
            info.append($('<div class="yani-detail__overview"></div>').text(data.overview || ''));
            var actions = $('<div class="yani-detail__actions"></div>');
            button = $('<div class="yani-detail__button yani-detail__button--watch selector"></div>').text(t('watch'));
            // Keep playback behind one action. When YummyTV is enabled the
            // destination is selected first; regular playback then opens the
            // dubbing/source and episode selectors as before.
            button.on('hover:enter click.yaniWatch', function () { openTitlePlaybackOptions(data); });
            bindDetailButtonFocus(button);
            var trailersButton = $('<div class="yani-detail__button selector"></div>').text(t('trailers'));
            trailersButton.on('hover:enter click.yaniDetailTrailers', function () { openTrailers(data); });
            bindDetailButtonFocus(trailersButton);
            var searchButton = $('<div class="yani-detail__button yani-detail__button--lampa selector"></div>');
            searchButton.append($('<span class="yani-detail__button-icon"></span>').html(lampaIcon()));
            searchButton.append($('<span></span>').text(t('open_lampa_search')));
            searchButton.on('hover:enter', function () {
                openStandardLampaCard(data);
            });
            bindDetailButtonFocus(searchButton);
            var subscribeButton = $('<div class="yani-detail__button selector"></div>').text(t('subscribe_episodes'));
            if (Lampa.Storage && Lampa.Storage.get('yani_subscribed_video_' + data.yani_id, '')) {
                subscribeButton.text(t('unsubscribe_episodes'));
            }
            subscribeButton.on('hover:enter', function () { toggleEpisodeSubscription(data, subscribeButton); });
            bindDetailButtonFocus(subscribeButton);
            var comments = $('<div class="yani-detail__comments"></div>');
            var listPanel = createDetailListPanel(data);
            actions.append(button, trailersButton, searchButton);
            actions.append(subscribeButton);
            // Keep the principal actions next to the synopsis, before the
            // long viewing-order, recommendations and comments sections.
            info.append(actions);
            info.append(listPanel);
            if (data.yani_viewing_order && data.yani_viewing_order.length) info.append(createViewingOrder(data));
            loadDetailRecommendations(data, info, bindDetailScrollTargets);
            info.append(comments);
            html.append(poster, info);
            scroll.append(html);
            bindDetailScrollTargets(html);
            loadInlineComments(data, comments);
        }

        function createDetailListPanel(cardData) {
            var panel = $('<div class="yani-detail__list-panel"></div>');
            var actions = [
                {key: 'watching', id: 0, icon: 'eye'},
                {key: 'planned', id: 1, icon: 'cloud'},
                {key: 'completed', id: 2, icon: 'flag'},
                {key: 'dropped', id: 3, icon: 'eye-off'},
                {key: 'postponed', id: 5, icon: 'hourglass'},
                {key: 'favorite', favorite: true, icon: 'heart'}
            ];

            actions.forEach(function (action) {
                var item = $('<div class="yani-detail__list-action selector"></div>')
                    .attr('title', t(action.key))
                    .attr('aria-label', t(action.key))
                    .append($('<span class="yani-detail__list-icon"></span>').html(detailListIcon(action.icon)));
                item.on('hover:enter click.yaniDetailList', function () {
                    toggleDetailListState(cardData, action, panel);
                });
                bindDetailButtonFocus(item);
                panel.append(item);
            });
            updateDetailListPanel(panel, cardData);
            return panel;
        }

        function createDetailGenres(genres) {
            var block = $('<div class="yani-detail__genres"></div>');
            genres.forEach(function (genre) {
                var title = genreTitle(genre);
                var value = genreValue(genre);
                if (!title || value === null) return;
                var chip = $('<div class="yani-detail__genre selector"></div>').text(title);
                chip.on('hover:enter click.yaniDetailGenre', function () { openGenreCatalog(title, value); });
                bindDetailButtonFocus(chip);
                block.append(chip);
            });
            return block;
        }

        function updateDetailListPanel(panel, cardData) {
            panel.children('.yani-detail__list-action').each(function (index) {
                var action = [
                    {id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 5}, {favorite: true}
                ][index];
                var active = action.favorite ? Boolean(cardData.yani_is_favorite) : hasYummyList(cardData, action.id);
                $(this).toggleClass('active', active).attr('aria-pressed', active ? 'true' : 'false');
            });
            addCardListBadge(null, cardData);
        }

        function toggleDetailListState(cardData, action, panel) {
            if (!LampaYaniAuth.token()) {
                Lampa.Noty.show(t('login_required'));
                return;
            }
            var active = action.favorite ? Boolean(cardData.yani_is_favorite) : hasYummyList(cardData, action.id);
            var request = action.favorite
                ? (active ? LampaYaniApi.removeFavorite(cardData.yani_id) : LampaYaniApi.addFavorite(cardData.yani_id))
                : (active ? LampaYaniApi.removeFromList(cardData.yani_id) : LampaYaniApi.addToList(cardData.yani_id, action.id));
            request.then(function () {
                if (action.favorite) cardData.yani_is_favorite = !active;
                else cardData.yani_list_id = active ? null : action.id;
                updateDetailListPanel(panel, cardData);
                Lampa.Noty.show(t('saved'));
            }).catch(function (error) {
                console.error('[YummyAnime]', error);
                Lampa.Noty.show(t('save_error'));
            });
        }

        function detailListIcon(name) {
            var icons = {
                eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c-5.2 0-9.4 3.4-11 7 1.6 3.6 5.8 7 11 7s9.4-3.4 11-7c-1.6-3.6-5.8-7-11-7Zm0 11.2A4.2 4.2 0 1 1 12 7.8a4.2 4.2 0 0 1 0 8.4Zm0-2A2.2 2.2 0 1 0 12 9.8a2.2 2.2 0 0 0 0 4.4Z"/></svg>',
                cloud: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.5 19H6.2A4.2 4.2 0 1 1 7 10.7 5.5 5.5 0 0 1 17.5 12 3.5 3.5 0 0 1 18.5 19Zm-12.3-2h12.3a1.5 1.5 0 0 0 0-3c-.4 0-.8.1-1.1.3l-1.6.8.1-1.8A3.5 3.5 0 0 0 9 12.5l.1 1.4-1.3-1A2.2 2.2 0 1 0 6.2 17Z"/></svg>',
                flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h2v2h9.2l-1 3 1 3H8v10H6V3Zm2 6h6.3l-.3-1 .3-1H8v2Z"/></svg>',
                'eye-off': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.3 2 18.7 18.7-1.4 1.4-3.1-3.1a11.7 11.7 0 0 1-5.5 1.5c-5.2 0-9.4-3.4-11-7a12.7 12.7 0 0 1 4.5-5.1L1.9 3.4 3.3 2ZM12 8.5a3.5 3.5 0 0 0-1.3.2l4.6 4.6A3.5 3.5 0 0 0 12 8.5Zm0-3.5c5.2 0 9.4 3.4 11 7a12.8 12.8 0 0 1-4.1 4.8l-1.5-1.5A10.8 10.8 0 0 0 20.8 12c-1.8-3-5.2-5-8.8-5-1 0-1.9.1-2.8.4L7.6 5.8C9 5.3 10.5 5 12 5ZM3.2 12c.6 1.1 1.5 2.1 2.5 2.9l-1.4-1.4A9.7 9.7 0 0 1 3.2 12Z"/></svg>',
                hourglass: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h12v2c0 3-1.2 5.2-3.5 7 2.3 1.8 3.5 4 3.5 7v2H6v-2c0-3 1.2-5.2 3.5-7C7.2 9.2 6 7 6 4V2Zm2 2c0 2.6 1.2 4.5 4 6.3C14.8 8.5 16 6.6 16 4H8Zm0 16h8c0-2.6-1.2-4.5-4-6.3C9.2 15.5 8 17.4 8 20Z"/></svg>',
                heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.2 3.7 13A5.6 5.6 0 0 1 11.6 5L12 5.5l.4-.5a5.6 5.6 0 0 1 7.9 8l-8.3 8.2ZM7.6 6.4A3.6 3.6 0 0 0 5.1 12L12 18.3l6.9-6.8a3.6 3.6 0 0 0-5.1-5.1L12 8l-1.4-1.6a3.6 3.6 0 0 0-3-1Z"/></svg>'
            };
            return icons[name] || '';
        }

        function loadDetailCommunityStats(cardData, container) {
            var section = $('<div class="yani-detail__community selector"><div class="yani-detail__community-title"></div><div class="yani-detail__community-grid"></div></div>');
            section.on('hover:focus', function () { section.addClass('focus'); });
            section.find('.yani-detail__community-title').text(t('community_stats'));
            container.append(section);
            bindDetailScrollTargets(section);
            Promise.all([LampaYaniApi.ratingBuckets(cardData.yani_id), LampaYaniApi.listStats(cardData.yani_id)]).then(function (responses) {
                var rates = normalizeDetailStats(responses[0]);
                var lists = normalizeDetailStats(responses[1]);
                if (!rates.length && !lists.length) return section.remove();
                var grid = section.find('.yani-detail__community-grid');
                rates.slice(0, 10).forEach(function (item) {
                    var label = item.rating || item.value || item.name || item.title;
                    var count = item.count || item.counters || item.total || 0;
                    if (label !== undefined) grid.append($('<div class="yani-detail__community-item"></div>').text(String(label) + ': ' + String(count)));
                });
                lists.slice(0, 8).forEach(function (item) {
                    var label = item.list && (item.list.title || item.list.name) || item.title || item.name || item.status;
                    var count = item.count || item.total || item.counters || 0;
                    if (label) grid.append($('<div class="yani-detail__community-item"></div>').text(String(label) + ': ' + String(count)));
                });
                if (!grid.children().length) section.remove();
            }).catch(function () { section.remove(); });
        }

        function normalizeDetailStats(payload) {
            var response = payload && payload.response ? payload.response : payload;
            return Array.isArray(response) ? response : response && (response.items || response.data || response.rates || response.lists) || [];
        }

        function bindDetailButtonFocus(element) {
            element.on('hover:focus', function () {
                element.siblings('.focus').removeClass('focus');
                element.addClass('focus');
                scroll.update(element, true);
            });
            element.on('hover:blur', function () { element.removeClass('focus'); });
        }

        function bindDetailScrollTargets(container) {
            var targets = container.hasClass && container.hasClass('selector') ? container.add(container.find('.selector')) : container.find('.selector');
            targets.each(function () {
                var element = $(this);
                element.off('hover:focus.yaniDetailScroll').on('hover:focus.yaniDetailScroll', function () {
                    // Bind on the selector itself. In some Lampa builds the
                    // custom hover event does not bubble to the detail root,
                    // which previously allowed focus to leave the viewport
                    // when moving back up through a long page.
                    scroll.update(element, true);
                });
            });
        }

        function loadInlineComments(cardData, container) {
            var commentsTitle = $('<div class="yani-detail__comments-title selector"></div>').text(t('comments_title') + (cardData.yani_comments_count ? ' (' + cardData.yani_comments_count + ')' : ''));
            commentsTitle.on('hover:focus', function () { commentsTitle.addClass('focus'); });
            container.append(commentsTitle);
            var list = $('<div class="yani-detail__comments-list"></div>');
            list.append($('<div class="yani-detail__comments-loading"></div>').text('…'));
            container.append(list);
            bindDetailScrollTargets(container);
            LampaYaniApi.comments(cardData.yani_id, 0).then(function (payload) {
                var comments = LampaYaniApi.normalizeComments(payload);
                list.empty();
                if (!comments.length) {
                    var empty = $('<div class="yani-detail__comments-empty selector"></div>').text(t('comments_empty'));
                    empty.on('hover:focus', function () { empty.addClass('focus'); });
                    list.append(empty);
                    bindDetailScrollTargets(empty);
                    return;
                }
                comments.forEach(function (comment) {
                    var item = commentItem(comment);
                    var row = $('<div class="yani-detail__comment selector"></div>');
                    row.append($('<div class="yani-detail__comment-title"></div>').text(item.title));
                    if (item.subtitle) row.append($('<div class="yani-detail__comment-stats"></div>').text(item.subtitle));
                    row.on('hover:focus', function () { row.addClass('focus'); });
                    row.on('hover:enter click.yaniComment', function () {
                        if (Number(comment.children_count) > 0) commentReplies(comment, 0, [], function () {});
                        else commentsMenu(cardData.yani_id);
                    });
                    list.append(row);
                    bindDetailScrollTargets(row);
                });
            }).catch(function (error) {
                console.error('[YummyAnime Comments]', error);
                var errorRow = $('<div class="yani-detail__comments-error selector"></div>').text(t('comments_error'));
                errorRow.on('hover:focus', function () { errorRow.addClass('focus'); });
                list.empty().append(errorRow);
                bindDetailScrollTargets(errorRow);
            });
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(button, scroll.render()); },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { movePageDown(scroll); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
            setTimeout(function () {
                var first = html.find('.yani-detail__button.selector, .yani-detail__order-item.selector, .yani-detail__comment.selector').first();
                if (first.length) {
                    scroll.update(first, true);
                    Lampa.Controller.collectionFocus(first, scroll.render());
                }
            }, 0);
        };

        this.render = function (js) { return js ? scroll.render(true) : scroll.render(); };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function toggleEpisodeSubscription(card, button) {
        if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('login_required'));
        if (!card || !card.yani_id) return;
        var key = 'yani_subscribed_video_' + card.yani_id;
        var subscribed = Lampa.Storage && Lampa.Storage.get(key, '');
        var videoRequest = subscribed ? Promise.resolve(String(subscribed)) : LampaYaniApi.videos(card.yani_id).then(function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            var videos = Array.isArray(response) ? response : response && (response.videos || response.items) || [];
            videos = videos.filter(function (video) { return video && (video.video_id || video.id); });
            if (!videos.length) throw new Error('No subscribable videos');
            videos.sort(function (a, b) { return Number(b.number || b.index || 0) - Number(a.number || a.index || 0); });
            return String(videos[0].video_id || videos[0].id);
        });
        videoRequest.then(function (videoId) {
            var action = subscribed ? LampaYaniApi.unsubscribeVideo(videoId) : LampaYaniApi.subscribeVideo(videoId);
            return action.then(function () {
                if (Lampa.Storage) {
                    if (subscribed) Lampa.Storage.set(key, '');
                    else Lampa.Storage.set(key, String(videoId));
                }
                button.text(subscribed ? t('subscribe_episodes') : t('unsubscribe_episodes'));
                Lampa.Noty.show(subscribed ? t('subscription_removed') : t('subscription_added'));
            });
        }).catch(function (error) {
            console.error('[YummyAnime] Subscription failed', error);
            Lampa.Noty.show(t('subscription_error'));
        });
    }

    function openVideos(card, resume) {
        if (!card || !card.yani_id) return Lampa.Noty.show(t('no_videos'));
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();

        LampaYaniApi.videos(card.yani_id).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var videos = payload && payload.response ? payload.response : payload;
            videos = (Array.isArray(videos) ? videos : []).filter(function (video) {
                return video && videoSourceUrl(video);
            });
            videos.forEach(function (video) {
                // Keep one normalized field for all player implementations.
                video.iframe_url = videoSourceUrl(video);
            });
            if (!videos.length) return Lampa.Noty.show(t('no_videos'));

            var groups = {};
            videos.forEach(function (video) {
                var data = LampaYaniUiUtils.videoData(video);
                var title = data.dubbing || data.player || t('player');
                var quality = videoQualityLabel(video);
                var key = title + '|' + String(data.player_id || data.player || '') + '|' + quality;
                if (!groups[key]) groups[key] = {title: title, player: data.player || '', quality: quality, source: LampaYaniUiUtils.videoHost(videoSourceUrl(video)), videos: []};
                groups[key].videos.push(video);
            });

            var voices = Object.keys(groups).map(function (key) {
                var group = groups[key];
                return {
                    title: group.title + (group.player && group.player !== group.title ? ' · ' + group.player : ''),
                    subtitle: voiceOptionSubtitle(group),
                    group: group
                };
            });
            var preferredPlayer = getPreferredPlayer();
            voices.sort(function (a, b) {
                var preferredA = playerMatchesPreference(a.group, preferredPlayer) ? 1 : 0;
                var preferredB = playerMatchesPreference(b.group, preferredPlayer) ? 1 : 0;
                return preferredB - preferredA || a.title.localeCompare(b.title);
            });
            if (voices.length && playerMatchesPreference(voices[0].group, preferredPlayer)) voices[0].title = '★ ' + voices[0].title;

            if (resume) {
                var playback = getPlayback(card.yani_id);
                var resumeVoice = playback && voices.filter(function (voice) { return playerMatchesPreference(voice.group, playback.player); })[0];
                var resumeVideo = resumeVoice && resumeVoice.group.videos.filter(function (video) {
                    return String(video.number || video.index || '') === playback.number;
                })[0];
                if (resumeVideo) {
                    rememberPlayer(resumeVoice.group);
                    return launchVideo(card, resumeVoice.group, resumeVoice.group.videos, resumeVideo);
                }
            }

            if (voices.length === 1) {
                rememberPlayer(voices[0].group);
                return enrichEpisodeTitles(card, voices[0].group).then(function () {
                    chooseEpisode(card, voices[0].group);
                });
            }
            Lampa.Select.show({
                title: t('choose_voice'),
                items: voices,
                onFocus: enrichVoiceOptionQuality,
                onSelect: function (item) {
                    rememberPlayer(item.group);
                    enrichEpisodeTitles(card, item.group).then(function () {
                        chooseEpisode(card, item.group);
                    });
                }
            });
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Videos]', error);
            Lampa.Noty.show(t('videos_load_error'));
        });
    }

    function voiceOptionSubtitle(group) {
        return t('video_quality') + ': ' + (group.quality || t('quality_auto')) +
            (group.source ? ' · ' + group.source : '') + ' · ' + group.videos.length + ' ' + t('episodes_short');
    }

    function enrichVoiceOptionQuality(item, target) {
        var group = item && item.group;
        if (!group || group.quality || group.qualityLoading || group.qualityLoaded || !group.videos.length) return;
        var probe = group.videos[0];
        var url = videoSourceUrl(probe);
        if (!url || !window.LampaYaniStreamResolver || !LampaYaniStreamResolver.canResolve(url)) return;
        group.qualityLoading = true;
        LampaYaniStreamResolver.resolve(url, probe).then(function (result) {
            group.qualityLoading = false;
            group.qualityLoaded = true;
            if (!result || !result.url) return;
            probe.yani_stream_url = result.url;
            probe.yani_stream_quality = result.quality || '';
            probe.yani_stream_qualities = result.qualities || null;
            probe.yani_stream_source = result.source || '';
            probe.yani_stream_headers = result.headers || null;
            group.quality = result.quality || group.quality;
            item.subtitle = voiceOptionSubtitle(group);
            $(target).find('.selectbox-item__subtitle').text(item.subtitle);
        }).catch(function (error) {
            group.qualityLoading = false;
            group.qualityLoaded = true;
            console.warn('[YummyAnime] Could not inspect voice quality', error);
        });
    }

    function registerOnlineSource() {
        if (!Lampa.Online || !Lampa.Online.register || window.yummyanime_online_source_ready) return;
        window.yummyanime_online_source_ready = true;
        Lampa.Online.register('yummyanime', {
            title: 'YummyAnime',
            search: function (movie, oncomplite) {
                openYummyForMovie(movie);
                if (oncomplite) oncomplite([]);
            },
            onContextMenu: function () { return {name: 'YummyAnime'}; }
        });
    }

    function registerSearchSource() {
        if (!Lampa.Search || !Lampa.Search.addSource || window.yummyanime_search_source_ready) return;
        window.yummyanime_search_source_ready = true;

        Lampa.Search.addSource({
            title: 'YummyAnime',
            search: function (params, oncomplite) {
                var query = decodeURIComponent(params && params.query || '').trim();
                if (!query) return oncomplite([]);

                LampaYaniApi.search(query, {limit: 20}).then(function (payload) {
                    var results = LampaYaniApi.normalize(payload).map(toCard);
                    oncomplite(results.length ? [{
                        title: 'YummyAnime',
                        type: 'anime',
                        results: results,
                        total: results.length,
                        total_pages: 1
                    }] : []);
                }).catch(function (error) {
                    console.warn('[YummyAnime] Global search failed', error);
                    oncomplite([]);
                });
            },
            onSelect: function (params, close) {
                close();
                openYummyDetail(params && params.element, false);
            }
        });
    }

    function openYummyForMovie(movie) {
        if (movie && movie.yani_card) return openVideos(movie.yani_card);
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        findYummyMatches(movie).then(function (matches) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            if (!matches.length) return Lampa.Noty.show(t('no_yummy_match'));
            if (matches.length === 1) return openVideos(matches[0]);

            Lampa.Select.show({
                title: t('choose_anime'),
                items: matches.map(function (card) {
                    return {title: card.title + (card.release_date ? ' · ' + card.release_date : ''), card: card};
                }),
                onSelect: function (item) { openVideos(item.card); }
            });
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Search Source]', error);
            Lampa.Noty.show(t('catalog_load_error'));
        });
    }

    function openStandardLampaCard(card) {
        // Resolve a real TMDB card before opening Lampa's native detail page.
        // Never call `full` with an absent id: some Lampa builds then request
        // `/movie/undefined` forever.  A YummyAnime detail remains a useful
        // fallback when TMDB has no equivalent title.
        var settled = false;
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();

        function finish(match) {
            if (settled) return;
            settled = true;
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();

            if (!match || !match.card || !isValidNativeId(match.card.id) || !match.method) {
                openYummyDetail(card, true);
                return;
            }

            var nativeCard = match.card;
            nativeCard.source = nativeCard.source || 'tmdb';
            nativeCard.yani_card = card;
            Lampa.Activity.push({
                url: nativeCard.url || '',
                component: 'full',
                id: nativeCard.id,
                method: match.method,
                card: nativeCard,
                source: nativeCard.source
            });
        }

        // Do not leave the UI blocked if a third-party TMDB proxy silently
        // drops a request. The normal request callbacks still win when they
        // finish in time.
        setTimeout(function () { finish(null); }, 9000);
        enrichCardForStandardSearch(card).then(findStandardLampaCard).then(finish).catch(function (error) {
            console.warn('[YummyAnime] Native Lampa card lookup failed', error);
            finish(null);
        });
    }

    function enrichCardForStandardSearch(card) {
        // Catalog responses deliberately stay small.  The detail response
        // contains `other_titles`, including romanised and Japanese names,
        // which TMDB indexes more reliably than a single localised title.
        var id = getYummyId(card);
        if (!id || !LampaYaniApi || !LampaYaniApi.detail) return Promise.resolve(card);

        return LampaYaniApi.detail(id).then(function (payload) {
            var item = payload && payload.response ? payload.response : payload;
            if (!item || typeof item !== 'object') return card;

            var detailed = toCard(item);
            var titles = (card.yani_titles || []).concat(detailed.yani_titles || []);
            card.yani_titles = titles.filter(function (title, index, list) {
                return title && list.indexOf(title) === index;
            });
            card.yani_remote_ids = Object.assign({}, card.yani_remote_ids || {}, detailed.yani_remote_ids || {});
            if (!card.original_title || card.original_title === card.title) card.original_title = detailed.original_title || card.original_title;
            if (!card.release_date) card.release_date = detailed.release_date || '';
            return card;
        }).catch(function (error) {
            // A temporary YummyAnime detail failure must not prevent the
            // existing list-card title from being looked up in Lampa.
            console.warn('[YummyAnime] Could not enrich title aliases', error);
            return card;
        });
    }

    function installUndefinedTmdbGuard() {
        if (!Lampa.Activity || !Lampa.Activity.push || Lampa.Activity.push._yaniUndefinedTmdbGuard) return;

        var originalPush = Lampa.Activity.push;
        function guardedPush(activity) {
            var card = activity && (activity.card || activity.object || activity.data);
            var missingId = !activity || activity.id === undefined || activity.id === null || activity.id === '' || activity.id === 'undefined';
            var isNativeDetail = activity && activity.component === 'full';
            var isYummyCard = card && (card._yani_card || hasYummyCardData(card));

            // A native Lampa detail page cannot open an anime without a TMDB
            // id.  Redirect only our marked cards, leaving all normal Lampa
            // activity navigation untouched.
            if (isNativeDetail && missingId && isYummyCard) {
                var yaniId = getYummyId(card);
                if (yaniId) {
                    console.warn('[YummyAnime] Blocked native TMDB detail with undefined id', yaniId);
                    return originalPush.call(this, {
                        url: 'yani/detail/' + encodeURIComponent(yaniId),
                        title: card.title || card.name || 'YummyAnime',
                        component: 'yani_detail',
                        id: yaniId,
                        yani_id: yaniId,
                        card: card
                    });
                }
            }
            return originalPush.apply(this, arguments);
        }

        guardedPush._yaniUndefinedTmdbGuard = true;
        guardedPush._yaniOriginalPush = originalPush;
        Lampa.Activity.push = guardedPush;
    }

    function openYummyDetail(card, notifyFallback) {
        var id = getYummyId(card);
        if (!id) {
            Lampa.Noty.show(t('no_yummy_match'));
            return;
        }
        card.yani_id = id;
        if (notifyFallback && Lampa.Noty) Lampa.Noty.show(t('lampa_card_fallback'));
        Lampa.Activity.push({
            url: 'yani/detail/' + encodeURIComponent(id),
            title: card.title,
            component: 'yani_detail',
            id: id,
            yani_id: id,
            card: card
        });
    }

    function findStandardLampaCard(card) {
        // Use the same public resolver as Lampa's own search screen. Calling
        // individual API endpoints skipped parts of the active TMDB source
        // configuration on some builds, so YummyAnime titles never matched.
        // Online plugins which work with Cub TMDB Proxy use this source. The
        // proxy may decorate it while leaving Lampa.TMDB untouched, so prefer
        // it and retain the public object as a fallback for newer builds.
        var tmdb = Lampa.Api && Lampa.Api.sources && Lampa.Api.sources.tmdb || Lampa.TMDB;
        if (!tmdb || (!tmdb.search && !tmdb.get)) return Promise.resolve(null);
        var titles = LampaYaniUiUtils.standardSearchTitles(card).filter(function (title, index, list) {
            return title && list.indexOf(title) === index;
        });
        console.info('[YummyAnime] Native TMDB resolve started', {yaniId: getYummyId(card), titles: titles});

        function resolveTitles(searchTitles) {
            // Search aliases in small batches. Eight aliases multiplied by
            // movie and TV endpoints created a large simultaneous request
            // burst that could terminate low-memory Android WebViews.
            var titlesToSearch = (searchTitles || []).slice(0, 8);
            var collected = [];
            function next(offset) {
                if (offset >= titlesToSearch.length) return Promise.resolve(bestStandardCard(collected, card));
                return Promise.all(titlesToSearch.slice(offset, offset + 2).map(function (title) {
                    return searchTmdbTitle(tmdb, title).catch(function () { return []; });
                })).then(function (rows) {
                    rows.forEach(function (row) { collected = collected.concat(Array.isArray(row) ? row : []); });
                    var match = bestStandardCard(collected, card);
                    return match || next(offset + 2);
                });
            }
            return next(0);
        }

        return resolveTitles(titles).then(function (match) {
            if (match) return match;
            var remoteIds = card.yani_remote_ids || {};
            var malId = remoteIds.myanimelist_id || remoteIds.mal_id;
            if (!malId || !LampaYaniApi.malTitles) return null;
            return LampaYaniApi.malTitles(malId).then(function (malTitles) {
                var known = card.yani_titles || [];
                card.yani_titles = known.concat(malTitles || []).filter(function (title, index, list) {
                    return title && list.indexOf(title) === index;
                });
                // Retry only newly acquired names. Otherwise a long Yummy
                // alias list could consume the eight-query budget first.
                var retryTitles = (malTitles || []).filter(function (title, index, list) {
                    return title && known.indexOf(title) < 0 && list.indexOf(title) === index;
                });
                return resolveTitles(retryTitles);
            }).catch(function (error) {
                console.warn('[YummyAnime] Could not load MyAnimeList title aliases', error);
                return null;
            });
        }).then(function (match) {
            if (match) {
                console.info('[YummyAnime] Native TMDB match found', {
                    id: match.card.id,
                    method: match.method,
                    title: match.card.name || match.card.title || '',
                    source: match.card.source || ''
                });
            } else {
                console.warn('[YummyAnime] Native TMDB resolver found no matching card', {yaniId: getYummyId(card), titles: titles});
            }
            return match;
        });
    }

    function searchTmdbTitle(tmdb, title) {
        if (!title) return Promise.resolve([]);
        // Lampa.TMDB.search waits for movie, TV and person requests together.
        // Some proxy configurations fail only the person request and never
        // reach that aggregate callback.  Resolve the two card endpoints
        // directly first, through the same Lampa TMDB client and credentials.
        if (tmdb.get) {
            return searchTmdbCardEndpoints(tmdb, title).then(function (items) {
                return items.length ? items : searchTmdbAggregate(tmdb, title);
            });
        }
        return searchTmdbAggregate(tmdb, title);
    }

    function searchTmdbCardEndpoints(tmdb, title) {
        return new Promise(function (resolve) {
            var pending = 2;
            var completed = false;
            var items = [];
            var timeout = setTimeout(finish, 6000);

            function finish() {
                if (completed) return;
                completed = true;
                clearTimeout(timeout);
                resolve(items);
            }

            function complete() {
                pending--;
                if (pending <= 0) finish();
            }

            ['tv', 'movie'].forEach(function (method) {
                try {
                    tmdb.get('search/' + method, {query: title, page: 1}, function (response) {
                        var results = response && Array.isArray(response.results) ? response.results : [];
                        results.forEach(function (card) { items.push({card: card, method: method}); });
                        complete();
                    }, complete);
                } catch (error) {
                    console.warn('[YummyAnime] TMDB ' + method + ' search call failed', error);
                    complete();
                }
            });
        });
    }

    function searchTmdbAggregate(tmdb, title) {
        return new Promise(function (resolve) {
            var completed = false;
            var timeout = setTimeout(function () { finish([]); }, 6000);

            function finish(items) {
                if (completed) return;
                completed = true;
                clearTimeout(timeout);
                resolve(items);
            }

            try {
                tmdb.search({query: title, page: 1}, function (groups) {
                    var items = [];
                    (Array.isArray(groups) ? groups : []).forEach(function (group) {
                        var method = group && group.type;
                        if (method !== 'tv' && method !== 'movie') return;
                        (group.results || []).forEach(function (item) {
                            items.push({card: item, method: method});
                        });
                    });
                    finish(items);
                });
            } catch (error) {
                console.warn('[YummyAnime] TMDB search call failed', error);
                finish([]);
            }
        });
    }

    function isValidNativeId(id) {
        return id !== undefined && id !== null && id !== '' && id !== 'undefined' &&
            String(id).match(/^\d+$/) !== null;
    }

    function bestStandardCard(items, yaniCard) {
        var expectedTitles = LampaYaniUiUtils.standardSearchTitles(yaniCard).map(LampaYaniUiUtils.normalizeMatchTitle).filter(Boolean);
        var expectedYear = String(yaniCard.release_date || '').slice(0, 4);
        items.forEach(function (entry) {
            var candidate = entry.card || {};
            var titles = [candidate.title, candidate.name, candidate.original_title, candidate.original_name].map(LampaYaniUiUtils.normalizeMatchTitle).filter(Boolean);
            var exact = titles.some(function (title) { return expectedTitles.indexOf(title) >= 0; });
            var partial = !exact && titles.some(function (title) {
                return expectedTitles.some(function (expected) { return title.indexOf(expected) >= 0 || expected.indexOf(title) >= 0; });
            });
            var candidateYear = String(candidate.release_date || candidate.first_air_date || '').slice(0, 4);
            entry.score = (exact ? 100 : partial ? 40 : 0) + (expectedYear && candidateYear === expectedYear ? 30 : 0);
        });
        items.sort(function (a, b) { return b.score - a.score; });
        if (!items.length || items[0].score < 70 || !isValidNativeId(items[0].card && items[0].card.id)) return null;
        items[0].card.source = items[0].card.source || 'tmdb';
        return items[0];
    }

    var nativeMatchCache = {};
    var nativeMatchPending = {};
    var nativeMatchOrder = [];

    function nativeMatchKey(movie) {
        return [movie && (movie.source || ''), movie && (movie.id || ''), movie && (movie.title || movie.name || ''), movie && (movie.release_date || movie.first_air_date || '')].join('|').toLowerCase();
    }

    function rememberNativeMatch(key, cards) {
        nativeMatchCache[key] = cards;
        nativeMatchOrder = nativeMatchOrder.filter(function (item) { return item !== key; });
        nativeMatchOrder.push(key);
        while (nativeMatchOrder.length > 50) delete nativeMatchCache[nativeMatchOrder.shift()];
    }

    function findYummyMatches(movie) {
        movie = movie || {};
        var title = movie.title || movie.name || movie.original_title || movie.original_name || '';
        var year = String(movie.release_date || movie.first_air_date || movie.year || '').slice(0, 4);
        if (!title) return Promise.resolve([]);
        var cacheKey = nativeMatchKey(movie);
        if (Object.prototype.hasOwnProperty.call(nativeMatchCache, cacheKey)) return Promise.resolve(nativeMatchCache[cacheKey]);
        if (nativeMatchPending[cacheKey]) return nativeMatchPending[cacheKey];

        var queries = LampaYaniUiUtils.titleValues(movie);
        if (queries.indexOf(title) < 0) queries.unshift(title);
        // Native cards usually expose a localized and an original title. Two
        // queries are enough for matching and avoid an eight-request burst on
        // low-memory TVs whenever Lampa emits the full-card event twice.
        nativeMatchPending[cacheKey] = Promise.all(queries.slice(0, 2).map(function (query) {
            return LampaYaniApi.search(query, {limit: 10}).then(function (payload) {
                return LampaYaniApi.normalize(payload).map(toCard);
            }).catch(function () { return []; });
        })).then(function (rows) {
            var cardsById = {};
            rows.forEach(function (cards) { cards.forEach(function (card) {
                var key = String(card.yani_id || card.title);
                if (!cardsById[key]) cardsById[key] = card;
            }); });
            var cards = Object.keys(cardsById).map(function (key) { return cardsById[key]; });
            var expected = LampaYaniUiUtils.normalizeMatchTitle(title);
            cards.forEach(function (card) {
                var titles = card.yani_titles.map(LampaYaniUiUtils.normalizeMatchTitle);
                card._match_score = (titles.indexOf(expected) >= 0 ? 100 : titles.some(function (value) { return value.indexOf(expected) >= 0 || expected.indexOf(value) >= 0; }) ? 40 : 0) + (year && card.release_date === year ? 30 : 0);
            });
            cards.sort(function (a, b) { return b._match_score - a._match_score; });
            // A partial title without a matching year is not sufficient for
            // the native-card integration: it produces false YummyAnime
            // buttons on unrelated live-action titles.
            if (!cards.length || cards[0]._match_score < 70) return [];
            var best = cards[0]._match_score;
            return cards.filter(function (card, index) { return index < 5 && (card._match_score === best || card._match_score >= 70); });
        }).then(function (cards) {
            delete nativeMatchPending[cacheKey];
            rememberNativeMatch(cacheKey, cards);
            return cards;
        }, function (error) {
            delete nativeMatchPending[cacheKey];
            throw error;
        });
        return nativeMatchPending[cacheKey];
    }

    function isNativeAnimeCard(movie) {
        var ids = movie && (movie.genre_ids || movie.genres_ids || movie.genre_id);
        if (Array.isArray(ids) && ids.some(function (id) { return Number(id) === 16; })) return true; // TMDB: Animation

        var source = movie && (movie.genres || movie.genre || movie.category || movie.categories);
        var values = Array.isArray(source) ? source : source ? [source] : [];
        var names = values.map(function (genre) {
            if (typeof genre === 'string') return genre;
            return genre && (genre.name || genre.title || genre.label) || '';
        }).join(' ').toLowerCase();
        if (/(?:animation|animated|anime|аниме|мультфильм|мультипликац)/.test(names)) return true;

        // Missing genres used to classify every film and series as anime,
        // causing background YummyAnime searches on every native detail page.
        // A Japanese origin is a safer fallback when genre metadata is absent.
        var language = String(movie && (movie.original_language || movie.language) || '').toLowerCase();
        var countries = movie && (movie.origin_country || movie.production_countries) || [];
        var japaneseOrigin = Array.isArray(countries) && countries.some(function (country) {
            return String(typeof country === 'string' ? country : country && (country.iso_3166_1 || country.code) || '').toUpperCase() === 'JP';
        });
        return language === 'ja' && japaneseOrigin;
    }

    function movePageDown(scroll) { LampaYaniNavigation.moveDown(scroll); }

    function homeSectionEnabled(key) {
        if (!Lampa.Storage || !Lampa.Storage.get) return true;
        var value = Lampa.Storage.get('yani_section_' + key, true);
        return value !== false && value !== 'false';
    }

    function chooseEpisode(card, group) {
        var videos = group.videos.slice().sort(function (a, b) {
            var numberA = parseFloat(a.number);
            var numberB = parseFloat(b.number);
            if (isFinite(numberA) && isFinite(numberB)) return numberA - numberB;
            return Number(a.index || 0) - Number(b.index || 0);
        });
        var episodes = videos.map(function (video) {
            return {title: episodeOptionTitle(card, video), video: video};
        });
        if (episodes.length === 1) return launchVideo(card, group, videos, videos[0]);
        Lampa.Select.show({
            title: t('choose_episode') + ' · ' + group.title,
            items: episodes,
            onSelect: function (item) { launchVideo(card, group, videos, item.video); }
        });
    }

    function enrichEpisodeTitles(card, group) {
        var malId = card && card.yani_remote_ids && (card.yani_remote_ids.myanimelist_id || card.yani_remote_ids.mal_id);
        if (!malId || !group || group.episodeTitlesLoaded) return Promise.resolve();
        group.episodeTitlesLoaded = true;
        return LampaYaniApi.episodeInfo(malId).then(function (payload) {
            var items = payload && payload.episodes;
            if (!Array.isArray(items)) return;
            var titles = {};
            items.forEach(function (item) {
                var number = Number(item.episodeNumber || item.episode || item.number);
                if (number > 0 && item.title) titles[number] = item.title;
            });
            group.videos.forEach(function (video) {
                var number = Number(video.number || video.index);
                if (titles[number]) video.yani_episode_title = titles[number];
            });
        }).catch(function () {
            // Episode metadata is optional; playback must continue if the helper API is down.
        });
    }

    // Stream sources that already carry a direct Alloha stream and must not be
    // routed through the Alloha policy a second time.
    var ALLOHA_RESOLVED_SOURCES = ['lampac-alloha', 'yani-resolver'];

    function launchVideo(card, group, videos, selected, options) {
        options = options || {};
        var url = videoSourceUrl(selected);
        if (!url) return Lampa.Noty.show(t('no_videos'));
        var allohaSource = isAllohaUrl(url) || /alloha/i.test(String(group && (group.player || group.title) || ''));
        var resolvedAlloha = ALLOHA_RESOLVED_SOURCES.indexOf(String(selected.yani_stream_source || '').toLowerCase()) >= 0;
        if (allohaSource && !resolvedAlloha) {
            return launchAllohaPlayer(card, group, selected, url);
        }
        if (!isExternalPlayableUrl(url, selected) && window.LampaYaniStreamResolver && LampaYaniStreamResolver.canResolve(url)) {
            setLoading(true);
            LampaYaniStreamResolver.resolve(url, selected).then(function (result) {
                setLoading(false);
                if (result && result.url) {
                    selected.yani_stream_url = result.url;
                    selected.yani_stream_quality = result.quality || '';
                    selected.yani_stream_qualities = result.qualities || null;
                    selected.yani_stream_source = result.source || '';
                    selected.yani_stream_headers = result.headers || null;
                }
                launchResolvedVideo(card, group, videos, selected, videoSourceUrl(selected) || url, options);
            }).catch(function (error) {
                setLoading(false);
                console.warn('[YummyAnime] Stream resolve failed', error);
                launchResolvedVideo(card, group, videos, selected, url, options);
            });
            return;
        }
        launchResolvedVideo(card, group, videos, selected, url, options);
    }

    function launchResolvedVideo(card, group, videos, selected, url, options) {
        options = options || {};
        var title = (card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + (selected.number || selected.index || '?') + ' · ' + group.title;
        playbackContext = {card: card, group: group, videos: videos, selected: selected};
        rememberPlayback(card, group, selected);
        syncServerProgress(selected);

        var playlist = buildExternalPlaylist(card, videos);
        var current = playlist.filter(function (item) { return item.source === selected; })[0] || {
            title: title,
            url: url,
            time: Number(selected.watched && selected.watched.end_time || 0),
            source: selected,
            headers: videoStreamHeaders(selected),
            quality: videoStreamQualities(selected),
            poster: card.poster || card.img || ''
        };
        if (!isExternalPlayableUrl(current.url, current.source)) {
            showExternalPlaybackOptions(card, {
                url: current.url,
                title: current.title,
                onPlayer: function () {
                    if (openAndroidAppUri(current.url)) return true;
                    return openExternalUri(current.url);
                }
            });
            return;
        }

        if (showDirectPlaybackOptions(card, current, playlist, options)) {
            return;
        }

        if (openExternalPlayer(current, playlist, card)) {
            return;
        }

        if (playInternalPlayer(current, playlist)) {
            return;
        }

        Lampa.Noty.show(url);
    }

    // Both services answer the same question - "give me a direct stream for this
    // Alloha page" - so they are tried in order and the first usable answer
    // wins. The self-hosted resolver goes first because it drives the real
    // player page and therefore matches the exact episode and dubbing, while
    // Lampac has to find the title again by its external ids.
    function allohaResolvers(card, group, selected, url) {
        var chain = [];
        if (window.LampaYaniResolver && LampaYaniResolver.enabled()) {
            chain.push(function () { return LampaYaniResolver.resolve(url); });
        }
        if (window.LampaYaniLampacResolver && LampaYaniLampacResolver.enabled()) {
            chain.push(function () { return LampaYaniLampacResolver.resolveAlloha(card, selected, group, url); });
        }
        return chain;
    }

    function resolveInOrder(chain, index) {
        index = index || 0;
        if (index >= chain.length) return Promise.reject(new Error('No Alloha resolver produced a stream'));
        return chain[index]().then(function (result) {
            if (result && result.url) return result;
            throw new Error('Empty resolver result');
        }).catch(function (error) {
            if (index + 1 >= chain.length) throw error;
            console.warn('[YummyAnime] Alloha resolver failed, trying the next one', error);
            return resolveInOrder(chain, index + 1);
        });
    }

    function launchAllohaPlayer(card, group, selected, url) {
        var chain = allohaResolvers(card, group, selected, url);
        if (!chain.length) return blockAllohaPlayback(card, group, selected, url);
        setLoading(true);
        resolveInOrder(chain).then(function (result) {
            setLoading(false);
            selected.yani_stream_url = result.url;
            selected.yani_stream_quality = result.quality || '';
            selected.yani_stream_qualities = result.qualities || null;
            selected.yani_stream_headers = result.headers || null;
            selected.yani_stream_source = result.source || 'lampac-alloha';
            launchResolvedVideo(card, group, group.videos || [selected], selected, result.url);
        }).catch(function (error) {
            setLoading(false);
            console.warn('[YummyAnime] Alloha resolve failed; playback blocked', error);
            blockAllohaPlayback(card, group, selected, url);
        });
        return true;
    }

    // Alloha streams only from inside its own signed player page: the page
    // refuses to run outside an iframe and its CDN requires rotating headers a
    // media player cannot supply. Without a direct stream the embedded page is
    // therefore the last remaining playback path, and it stays opt-in because
    // it has no Lampa timeline and cannot be handed to an external player.
    function allohaIframeEnabled() {
        if (!Lampa.Storage || !Lampa.Storage.get) return false;
        var value = Lampa.Storage.get('yani_alloha_iframe', false);
        return value === true || value === 'true';
    }

    function blockAllohaPlayback(card, group, selected, url) {
        if (url && allohaIframeEnabled() && openAllohaEmbed(card, group, selected, url)) return true;
        Lampa.Noty.show(t('alloha_direct_required'));
        return true;
    }

    function openAllohaEmbed(card, group, selected, url) {
        if (!Lampa.Activity || !Lampa.Activity.push) return false;
        try {
            rememberPlayback(card, group, selected);
            Lampa.Activity.push({
                url: 'yani/player',
                title: (card && card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + ((selected && (selected.number || selected.index)) || '?'),
                component: 'yani_player',
                iframe_url: url
            });
            return true;
        } catch (error) {
            console.warn('[YummyAnime] Alloha embedded player failed to open', error);
            return false;
        }
    }

    function setLoading(enabled) {
        if (!window.Lampa || !Lampa.Loading) return;
        try {
            if (enabled && Lampa.Loading.start) Lampa.Loading.start();
            if (!enabled && Lampa.Loading.stop) Lampa.Loading.stop();
        } catch (ignore) {}
    }

    function buildExternalPlaylist(card, videos) {
        return (videos || []).map(function (video) {
            var url = videoSourceUrl(video);
            if (!url) return null;
            return {
                title: (card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + (video.number || video.index || '?'),
                url: url,
                time: Number(video.watched && video.watched.end_time || 0),
                source: video,
                headers: videoStreamHeaders(video),
                quality: videoStreamQualities(video),
                poster: card.poster || card.img || ''
            };
        }).filter(Boolean);
    }

    function playInternalDirectVideo(current, playlist) {
        if (!Lampa.Player || !Lampa.Player.play || !Lampa.Player.runas) return false;
        var directPlaylist = (playlist || []).filter(function (item) { return isDirectVideoUrl(item.url); }).map(function (item) {
            return LampaYaniUiUtils.internalPlayerItem({
                title: item.title,
                url: item.url,
                time: item.time,
                quality: item.quality || videoStreamQualities(item.source),
                headers: item.headers || videoStreamHeaders(item.source),
                poster: item.poster || ''
            });
        }).filter(Boolean);
        var directCurrent = directPlaylist.filter(function (item) { return item.url === current.url; })[0] || LampaYaniUiUtils.internalPlayerItem({
            title: current.title,
            url: current.url,
            time: current.time,
            quality: current.quality || videoStreamQualities(current.source),
            headers: current.headers || videoStreamHeaders(current.source),
            poster: current.poster || ''
        });
        if (!directCurrent) return false;
        if (!directPlaylist.length) directPlaylist = [directCurrent];
        try {
            // Lampa.Player.play follows the globally configured player unless
            // the caller explicitly selects the built-in Lampa engine.
            Lampa.Player.runas('lampa');
            Lampa.Player.play(directCurrent);
            if (Lampa.Player.playlist) Lampa.Player.playlist(directPlaylist);
            return true;
        } catch (error) {
            console.warn('[YummyAnime] Internal Lampa player failed to start', error);
            return false;
        }
    }

    function showDirectPlaybackOptions(card, current, playlist, options) {
        // An automatic episode change must never interrupt viewing with a
        // dialog: playback simply continues where it already was.
        var target = options && options.autoAdvance ? 'internal' : playbackTargetPreference();
        if (target === 'external') return openExternalPlayer(current, playlist, card);
        if (target === 'internal') {
            if (playInternalPlayer(current, playlist)) return true;
            Lampa.Noty.show(t('internal_player_unavailable'));
            return true;
        }
        if (!Lampa.Select || !Lampa.Select.show) return false;
        Lampa.Select.show({
            title: t('choose_playback'),
            items: [
                {title: t('watch_external_player'), subtitle: t('watch_external_player_description'), action: 'external'},
                {title: t('watch_internal_lampa'), subtitle: t('watch_internal_lampa_description'), action: 'internal'}
            ],
            onSelect: function (item) {
                if (item && item.action === 'internal') {
                    if (playInternalPlayer(current, playlist)) return;
                    Lampa.Noty.show(t('internal_player_unavailable'));
                    return;
                }
                if (openExternalPlayer(current, playlist, card)) return;
                if (playInternalPlayer(current, playlist)) return;
                Lampa.Noty.show(current.url);
            }
        });
        return true;
    }

    function playbackTargetPreference() {
        var value = Lampa.Storage && Lampa.Storage.get ? Lampa.Storage.get('yani_playback_target', 'ask') : 'ask';
        return value === 'internal' || value === 'external' ? value : 'ask';
    }

    function openExternalPlayer(current, playlist, card) {
        return openExternalVideo(current.url, current.title, {
            playlist: externalPlayablePlaylist(playlist),
            time: current.time,
            poster: card.poster || card.img || '',
            requireDirect: true,
            source: current.source,
            headers: current.headers || videoStreamHeaders(current.source),
            quality: current.quality || videoStreamQualities(current.source)
        });
    }

    function playInternalPlayer(current, playlist) {
        var started = isDirectVideoUrl(current && current.url) && playInternalDirectVideo(current, playlist);
        if (started) startPlaybackWatcher(playbackContext);
        return started;
    }

    // Set right before playback is dispatched so the watcher knows which title
    // and episode started, whichever of the three entry points ran.
    var playbackContext = null;
    var playbackWatcher = null;
    var playbackWatcherGeneration = 0;
    var PLAYER_STARTUP_GRACE_MS = 120000;
    var NEXT_PREFETCH_LEAD = 90;
    var NEXT_ADVANCE_LEAD = 5;

    function skipPreference() {
        var value = Lampa.Storage && Lampa.Storage.get ? Lampa.Storage.get('yani_aniskip', 'off') : 'off';
        return value === 'op' || value === 'op_ed' ? value : 'off';
    }

    function autoNextEnabled() {
        if (!Lampa.Storage || !Lampa.Storage.get) return false;
        var value = Lampa.Storage.get('yani_auto_next', false);
        return value === true || value === 'true';
    }

    function autoProgressSyncEnabled() {
        if (!LampaYaniAuth.token() || !Lampa.Storage || !Lampa.Storage.get) return false;
        var value = Lampa.Storage.get('yani_auto_sync_progress', true);
        return value !== false && value !== 'false';
    }

    // Lampa's internal player is an HTML5 video element whichever skin is
    // active, and reading it directly avoids depending on player internals that
    // differ between Lampa builds. External players are out of reach by design.
    function playerVideoElement() {
        var selectors = ['.player-video video', '.player video', 'video'];
        for (var i = 0; i < selectors.length; i++) {
            var element = document.querySelector(selectors[i]);
            if (element && isFinite(element.duration) && element.duration > 0) return element;
        }
        return null;
    }

    function stopPlaybackWatcher() {
        if (!playbackWatcher) return;
        clearInterval(playbackWatcher.timer);
        playbackWatcher = null;
    }

    function startPlaybackWatcher(context) {
        stopPlaybackWatcher();
        var generation = ++playbackWatcherGeneration;
        if (!context) return;
        var skipMode = skipPreference();
        var autoNext = autoNextEnabled();
        var progressSync = autoProgressSyncEnabled();

        var state = {
            timer: 0,
            segments: [],
            skipped: {},
            autoNext: autoNext,
            progressSync: progressSync,
            lastLocalSync: 0,
            lastLocalPosition: Number(context.selected && context.selected.watched && context.selected.watched.end_time || 0),
            lastServerSync: Date.now(),
            lastServerPosition: Number(context.selected && context.selected.watched && context.selected.watched.end_time || 0),
            prefetched: false,
            advanced: false,
            lastSeenAt: Date.now()
        };
        playbackWatcher = state;
        state.timer = setInterval(function () { watchPlayback(generation, context, state); }, 1000);
        if (skipMode !== 'off') loadSkipSegments(generation, context, state, skipMode);
    }

    function loadSkipSegments(generation, context, state, mode) {
        if (!window.LampaYaniAniSkip) return;
        var ids = (context.card && context.card.yani_remote_ids) || {};
        var malId = Number(ids.myanimelist_id || ids.mal_id || 0);
        var selected = context.selected || {};
        var episode = Number(selected.number || selected.index || 0);
        if (!malId || !episode) return;
        LampaYaniAniSkip.times(malId, episode, selected.duration).then(function (intervals) {
            if (generation !== playbackWatcherGeneration) return;
            var segments = [];
            if (intervals.op) segments.push({type: 'op', interval: intervals.op, label: t('aniskip_opening_skipped')});
            if (mode === 'op_ed' && intervals.ed) segments.push({type: 'ed', interval: intervals.ed, label: t('aniskip_ending_skipped')});
            state.segments = segments;
        });
    }

    function watchPlayback(generation, context, state) {
        if (generation !== playbackWatcherGeneration) return stopPlaybackWatcher();
        var video = playerVideoElement();
        if (!video) {
            // The player may still be starting up, so give it a grace period
            // before the watcher gives up on this episode.
            if (Date.now() - state.lastSeenAt > PLAYER_STARTUP_GRACE_MS) stopPlaybackWatcher();
            return;
        }
        state.lastSeenAt = Date.now();
        var position = Number(video.currentTime) || 0;
        var duration = Number(video.duration) || 0;

        if (position > 0) {
            var now = Date.now();
            var finalState = video.paused || video.ended || duration > 0 && position >= duration - 2;
            if (now - state.lastLocalSync >= 10000 || finalState && Math.abs(position - state.lastLocalPosition) >= 2) {
                state.lastLocalSync = now;
                state.lastLocalPosition = position;
                updatePlaybackProgress(context, position, duration, false);
            }
            if (state.progressSync && (now - state.lastServerSync >= 60000 || finalState && Math.abs(position - state.lastServerPosition) >= 5)) {
                state.lastServerSync = now;
                state.lastServerPosition = position;
                updatePlaybackProgress(context, position, duration, true);
            }
        }

        state.segments.forEach(function (segment) {
            if (state.skipped[segment.type]) return;
            if (position < segment.interval.start || position >= segment.interval.end - 1) return;
            state.skipped[segment.type] = true;
            try {
                video.currentTime = segment.interval.end;
            } catch (error) {
                console.warn('[YummyAnime] Could not skip a segment', error);
                return;
            }
            Lampa.Noty.show(segment.label);
        });

        if (!state.autoNext || duration < 60 || position <= 0) return;
        var remaining = duration - position;
        if (!state.prefetched && remaining <= NEXT_PREFETCH_LEAD) {
            state.prefetched = true;
            prefetchNextEpisode(context);
        }
        if (!state.advanced && remaining <= NEXT_ADVANCE_LEAD && !video.paused) {
            state.advanced = true;
            stopPlaybackWatcher();
            advanceToNextEpisode(context);
        }
    }

    function nextEpisodeVideo(context) {
        var videos = (context && context.videos) || [];
        var index = videos.indexOf(context.selected);
        if (index < 0 || index + 1 >= videos.length) return null;
        return videos[index + 1];
    }

    // Resolving a stream costs a round trip through the source's player page,
    // which is long enough to be noticeable between episodes. Doing it while
    // the current episode still plays hides that entirely, and the resolver
    // caches the result for the launch that follows.
    function prefetchNextEpisode(context) {
        var next = nextEpisodeVideo(context);
        if (!next || next.yani_stream_url) return;
        var url = videoSourceUrl(next);
        if (!url || isExternalPlayableUrl(url, next)) return;
        if (!window.LampaYaniStreamResolver || !LampaYaniStreamResolver.canResolve(url)) return;
        LampaYaniStreamResolver.resolve(url, next).then(function (result) {
            if (!result || !result.url) return;
            next.yani_stream_url = result.url;
            next.yani_stream_quality = result.quality || '';
            next.yani_stream_qualities = result.qualities || null;
            next.yani_stream_source = result.source || '';
            next.yani_stream_headers = result.headers || null;
        }).catch(function (error) {
            // The episode is launched normally later; a failed prefetch only
            // costs the time it would have saved.
            console.warn('[YummyAnime] Next episode prefetch failed', error);
        });
    }

    function advanceToNextEpisode(context) {
        var next = nextEpisodeVideo(context);
        if (!next) return;
        Lampa.Noty.show(t('auto_next_starting') + ' ' + (next.number || next.index || ''));
        launchVideo(context.card, context.group, context.videos, next, {autoAdvance: true});
    }

    function externalPlayablePlaylist(playlist) {
        return (playlist || []).filter(function (item) { return isExternalPlayableUrl(item.url, item.source); });
    }

    function syncServerProgress(video) {
        if (!autoProgressSyncEnabled() || !video || !video.video_id) return;
        LampaYaniApi.syncVideoProgress(video.video_id, video.watched && video.watched.end_time, video.duration).catch(function (error) {
            console.warn('[YummyAnime] Progress sync failed', error);
        });
    }

    function updatePlaybackProgress(context, position, duration, remote) {
        if (!context || !context.selected || !context.card) return;
        var video = context.selected;
        video.watched = video.watched || {};
        video.watched.end_time = Math.max(0, Math.floor(Number(position) || 0));
        if (duration > 0) video.duration = Math.floor(duration);
        rememberPlayback(context.card, context.group, video);
        if (remote) syncServerProgress(video);
    }

    function syncPlaybackHistoryManually() {
        if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('login_required'));
        var history = playbackHistory();
        var videos = Object.keys(history).map(function (id) {
            var item = history[id] || {};
            if (!item.video_id) return null;
            return {video_id: Number(item.video_id), time: Number(item.time || 0), date: Math.floor(Number(item.updated_at || Date.now()) / 1000)};
        }).filter(function (item) { return item && item.video_id; });
        if (!videos.length) return Lampa.Noty.show(t('history_empty'));
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        LampaYaniApi.syncVideoWatches(videos).then(function () {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            Lampa.Noty.show(t('sync_history_ok'));
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime] History sync failed', error);
            Lampa.Noty.show(t('sync_history_error'));
        });
    }

    function videoSourceUrl(video) {
        if (!video) return '';
        var data = LampaYaniUiUtils.videoData(video);
        return LampaYaniUiUtils.normalizeVideoUrl(video.yani_stream_url || data.yani_stream_url || video.iframe_url || video.url || video.player_url || video.link ||
            data.iframe_url || data.url || data.player_url || data.link);
    }

    function videoStreamHeaders(video) {
        if (!video) return null;
        var data = LampaYaniUiUtils.videoData(video);
        return video.yani_stream_headers || data.yani_stream_headers || null;
    }

    function videoStreamQualities(video) {
        if (!video) return null;
        var data = LampaYaniUiUtils.videoData(video);
        return video.yani_stream_qualities || data.yani_stream_qualities || null;
    }

    function isDirectVideoUrl(url) {
        return /\.(m3u8|mpd|mp4|webm)(?:[?#].*)?$/i.test(String(url || ''));
    }

    function isExternalPlayableUrl(url, source) {
        return isDirectVideoUrl(url) || !!(source && source.yani_stream_url && source.yani_stream_url === url);
    }

    function isKodikUrl(url) {
        return /(^|\/\/)(?:www\.)?kodik\.(?:info|cc|biz|site|com|tv)(?:[/:]|$)/i.test(url || '');
    }

    function isAllohaUrl(url) {
        return /(^|\/\/)(?:www\.)?alloha(?:\.[a-z0-9-]+)+(?::\d+)?(?:[/:]|$)/i.test(url || '');
    }


    function videoQualityLabel(video) {
        var data = LampaYaniUiUtils.videoData(video);
        var values = [video && video.yani_stream_quality, video && video.quality, video && video.resolution, data.quality, data.resolution, videoSourceUrl(video)];
        var best = 0;
        values.forEach(function (value) {
            var text = String(value || '');
            var match = text.match(/(2160|1440|1080|720|576|480|360)\s*p?/i);
            if (match) best = Math.max(best, Number(match[1]));
            if (/4k/i.test(text)) best = Math.max(best, 2160);
        });
        return best >= 2160 ? '4K' : best ? best + 'p' : '';
    }

    function playerKey(group) {
        return String(group && (group.player || group.title) || '').toLowerCase();
    }

    function getPreferredPlayer() {
        if (!Lampa.Storage) return '';
        var preference = Lampa.Storage.get('yani_player_preference', 'last');
        if (preference === 'ask') return '';
        if (preference === 'last') return Lampa.Storage.get('yani_last_player', '');
        return preference;
    }

    function playerMatchesPreference(group, preference) {
        if (!preference) return false;
        var value = playerKey(group);
        return value.indexOf(String(preference).toLowerCase()) >= 0;
    }

    function rememberPlayer(group) {
        if (Lampa.Storage) Lampa.Storage.set('yani_last_player', playerKey(group));
    }

    function playbackHistory() {
        if (!Lampa.Storage) return {};
        try {
            var value = Lampa.Storage.get('yani_playback_history', '{}');
            if (value && typeof value === 'object') return value;
            return JSON.parse(value || '{}');
        } catch (error) { return {}; }
    }

    function getPlayback(animeId) {
        return playbackHistory()[String(animeId)] || null;
    }

    function rememberPlayback(card, group, video) {
        if (!Lampa.Storage || !card || !card.yani_id) return;
        var history = playbackHistory();
        history[String(card.yani_id)] = {
            number: String(video.number || video.index || ''),
            video_id: video.video_id || '',
            time: Number(video.watched && video.watched.end_time || 0),
            player: playerKey(group),
            title: card.title || '',
            poster: card.poster || card.img || '',
            card: {
                title: card.title || '',
                original_title: card.original_title || '',
                poster: card.poster || card.img || '',
                release_date: card.release_date || '',
                overview: card.overview || '',
                anime_id: card.yani_id,
                remote_ids: card.yani_remote_ids || {}
            },
            updated_at: Date.now()
        };
        var ids = Object.keys(history).sort(function (a, b) { return Number(history[b].updated_at || 0) - Number(history[a].updated_at || 0); });
        ids.slice(100).forEach(function (id) { delete history[id]; });
        Lampa.Storage.set('yani_playback_history', JSON.stringify(history));
    }

    function episodeOptionTitle(card, video) {
        var number = String(video.number || video.index || '?');
        var parts = [t('episode') + ' ' + number];
        var quality = videoQualityLabel(video);
        if (quality) parts.push(quality);
        if (video.yani_episode_title) parts.push(video.yani_episode_title);
        if (Number(video.duration) > 0) parts.push(Math.max(1, Math.round(Number(video.duration) / 60)) + ' ' + t('minutes_short'));
        if (Number(video.views) > 0) parts.push(formatCompactNumber(video.views) + ' ' + t('views_short'));
        var playback = getPlayback(card && card.yani_id);
        return (playback && playback.number === number ? '▶ ' : '') + parts.join(' · ');
    }

    function formatCompactNumber(value) {
        value = Number(value) || 0;
        if (value >= 1000000) return (value / 1000000).toFixed(value >= 10000000 ? 0 : 1).replace('.0', '') + t('million_short');
        if (value >= 1000) return (value / 1000).toFixed(value >= 10000 ? 0 : 1).replace('.0', '') + t('thousand_short');
        return String(value);
    }

    function IframePlayer(object) {
        return LampaYaniPlayer.create(object, {sourceUrl: videoSourceUrl, goBack: goBack});
    }

    function LegacyIframePlayer(object) {
        var html = $('<div class="yani-player"></div>');
        var iframe = $('<iframe class="yani-player__iframe" frameborder="0" allowfullscreen></iframe>');

        this.create = function () {
            iframe.attr('src', videoSourceUrl(object));
            iframe.attr('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; payment');
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
                back: goBack
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
                    openGenreCatalog(item.title, item.value);
                }
            });
        }).catch(function () { Lampa.Noty.show(t('genres_load_error')); });
    }

    function genreTitle(genre) {
        return typeof genre === 'string' ? genre : genre && (genre.title || genre.name || genre.label || genre.alias) || '';
    }

    function genreValue(genre) {
        if (typeof genre === 'string') return genre;
        if (!genre) return null;
        var value = genre.value;
        if (value === undefined || value === null || value === '') value = genre.id;
        if (value === undefined || value === null || value === '') value = genre.href;
        if (value === undefined || value === null || value === '') value = genre.alias;
        if (value === undefined || value === null || value === '') value = genre.slug;
        return value === undefined || value === null || value === '' ? null : value;
    }

    function detailGenres(card) {
        var raw = card && (card.yani_genres || card.genres || card.genre) || [];
        if (!Array.isArray(raw)) raw = raw && (raw.items || raw.data || raw.genres) || [];
        var seen = {};
        return raw.filter(function (genre) {
            var title = genreTitle(genre), value = genreValue(genre), key = String(value === null ? title : value);
            if (!title || value === null || seen[key]) return false;
            seen[key] = true;
            return true;
        });
    }

    function openGenreCatalog(title, value) {
        Lampa.Activity.push({url: 'yani/genre/' + encodeURIComponent(value), title: title, component: 'yani_catalog', params: {limit: 30, genres: value}});
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
        item = item || {};
        if (item.anime && typeof item.anime === 'object') {
            var nestedAnime = Object.assign({}, item.anime);
            if (item.user) nestedAnime.user = item.user;
            item = nestedAnime;
        }
        var title = item.title || item.name || item.russian || item.original_title || t('untitled');
        var titles = LampaYaniUiUtils.titleValues(item);
        if (titles.indexOf(title) < 0) titles.unshift(title);
        var image = item.image && typeof item.image === 'object' ? item.image : {};
        var cover = item.cover && typeof item.cover === 'object' ? item.cover : {};
        var poster = typeof item.cover === 'string' ? item.cover : typeof item.image === 'string' ? item.image : item.poster_url ||
            image.medium || image.large || image.url || image.original || cover.medium || cover.large || cover.url || cover.original || '';
        if (!poster && item.poster) poster = item.poster.medium || item.poster.fullsize || item.poster.original || '';
        if (typeof poster !== 'string') poster = '';
        if (poster.indexOf('//') === 0) poster = 'https:' + poster;
        var rating = typeof item.rating === 'object' ? item.rating.average : item.rating;
        var votes = typeof item.rating === 'object' ? item.rating.counters : item.rating_counters;
        var ratings = extractRatings(item.rating);
        return {
            title: title,
            original_title: item.original_title || item.japanese || title,
            yani_titles: titles,
            poster: poster,
            img: poster,
            release_date: String(item.year || item.release_year || ''),
            vote_average: rating || item.score || item.rating_score || 0,
            vote_count: votes || item.votes || item.vote_count || 0,
            yani_rating: rating || item.score || item.rating_score || 0,
            yani_ratings: ratings,
            yani_media: mediaMeta(item),
            overview: item.description || item.synopsis || '',
            yani_id: item.anime_id || item.animeId || item.id || item._id,
            yani_url: item.anime_url || item.url,
            yani_comments_count: Number(item.comments_count || 0),
            yani_list_id: item.user && item.user.list && item.user.list.list ? Number(item.user.list.list.id) : null,
            yani_is_favorite: Boolean(item.user && item.user.list && item.user.list.is_fav),
            yani_user_rating: Number(item.user && (item.user.rate || item.user.rating || item.user.score) || item.user_rate || 0) || null,
            yani_viewing_order: Array.isArray(item.viewing_order) ? item.viewing_order : [],
            yani_genres: item.genres || item.genre || [],
            yani_type: item.type || null,
            yani_remote_ids: item.remote_ids || {}
        };
    }

    function createViewingOrder(data) {
        var section = $('<div class="yani-detail__order"></div>');
        section.append($('<div class="yani-detail__order-title"></div>').text(t('viewing_order')));
        var list = $('<div class="yani-detail__order-list"></div>');
        data.yani_viewing_order.forEach(function (entry, index) {
            var related = toCard(entry);
            var relation = entry.data && (entry.data.text || entry.data.title) || '';
            var row = $('<div class="yani-detail__order-item selector"></div>');
            row.append($('<span class="yani-detail__order-index"></span>').text((index + 1) + '.'));
            row.append($('<span class="yani-detail__order-name"></span>').text(related.title));
            if (related.release_date) row.append($('<span class="yani-detail__order-year"></span>').text(related.release_date));
            if (relation) row.append($('<span class="yani-detail__order-relation"></span>').text('· ' + relation));
            row.on('hover:focus', function () { row.addClass('focus'); });
            row.on('hover:blur', function () { row.removeClass('focus'); });
            row.on('hover:enter click.yaniOrder', function () { openYummyDetail(related, true); });
            list.append(row);
        });
        section.append(list);
        return section;
    }

    function loadDetailRecommendations(data, container, bindFocus) {
        var section = $('<div class="yani-detail__extra yani-detail__recommendations"><div class="yani-detail__extra-title"></div></div>');
        $('.yani-detail__extra-title', section).text(t('recommendations'));
        var list = $('<div class="yani-detail__recommendations-list"></div>');
        section.append(list);
        container.append(section);
        LampaYaniApi.recommendations(data.yani_id).then(function (payload) {
            var items = LampaYaniApi.normalize(payload).slice(0, 12);
            if (!items.length) return section.remove();
            items.forEach(function (item) {
                var card = toCard(item);
                var row = $('<div class="yani-detail__recommendation selector"></div>');
                var recommendationPoster = $('<img class="yani-detail__recommendation-poster" alt="">').attr('src', card.poster || '');
                LampaYaniMedia.bindPosterFallback(recommendationPoster, card);
                row.append(recommendationPoster);
                row.append($('<div class="yani-detail__recommendation-title"></div>').text(card.title));
                if (card.release_date) row.append($('<div class="yani-detail__recommendation-year"></div>').text(card.release_date));
                row.on('hover:focus', function () { row.addClass('focus'); });
                row.on('hover:blur', function () { row.removeClass('focus'); });
                // Recommendations already originate from YummyAnime. Do not
                // show a misleading Lampa-card fallback message before their
                // direct YummyAnime detail page opens.
                row.on('hover:enter click.yaniRecommendation', function () { openYummyDetail(card, false); });
                list.append(row);
                if (bindFocus) bindFocus(row);
            });
        }).catch(function () { section.remove(); });
    }

    function loadDetailCollections(data, container, bindFocus) {
        var section = $('<div class="yani-detail__extra yani-detail__collections"><div class="yani-detail__extra-title"></div></div>');
        section.find('.yani-detail__extra-title').text(t('collections'));
        var list = $('<div class="yani-detail__collections-list"></div>');
        section.append(list);
        container.append(section);
        LampaYaniApi.collections(data.yani_id, 10, 0).then(function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            var items = Array.isArray(response) ? response : response && (response.items || response.data || response.collections) || [];
            if (!items.length) return section.remove();
            items.forEach(function (collection) {
                var row = $('<div class="yani-detail__collection selector"></div>');
                row.append($('<div class="yani-detail__collection-title"></div>').text(collection.title || collection.name || t('collection')));
                if (collection.description) row.append($('<div class="yani-detail__collection-description"></div>').text(cleanCommentText(collection.description)));
                var animes = Array.isArray(collection.animes) ? collection.animes : [];
                if (animes.length) row.append($('<div class="yani-detail__collection-count"></div>').text(animes.length + ' ' + t('anime_count')));
                row.on('hover:focus', function () { row.addClass('focus'); });
                row.on('hover:blur', function () { row.removeClass('focus'); });
                row.on('hover:enter click.yaniCollection', function () {
                    if (!animes.length) return;
                    Lampa.Select.show({title: collection.title || t('collection'), items: animes.map(function (item) {
                        var card = toCard(item);
                        return {title: card.title, card: card};
                    }), onSelect: function (item) { openYummyDetail(item.card, true); }});
                });
                list.append(row);
                if (bindFocus) bindFocus(row);
            });
        }).catch(function () { section.remove(); });
    }

    function openTrailers(card) {
        if (!card || !card.yani_id) return;
        if (Lampa.Select && Lampa.Select.show) {
            legacyOpenTrailers(card);
            return;
        }
        Lampa.Activity.push({
            url: 'yani/trailers/' + encodeURIComponent(card.yani_id),
            title: t('trailers'),
            component: 'yani_trailers',
            card: card
        });
    }

    function TrailerList(object) {
        var card = object.card || {};
        var html = $('<div class="yani-trailers"></div>');
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var last;

        scroll.minus();

        this.create = function () {
            var self = this;
            this.activity.loader(true);
            LampaYaniApi.trailers(card.yani_id).then(function (payload) {
                var items = payload && payload.response ? payload.response : payload;
                items = Array.isArray(items) ? items.filter(function (trailer) { return trailerUrl(trailer); }) : [];
                render(items);
                self.activity.loader(false);
                self.activity.toggle();
            }).catch(function (error) {
                console.error('[YummyAnime] Trailers failed', error);
                html.append($('<div class="yani-trailers__empty selector"></div>').text(t('catalog_load_error')));
                scroll.append(html);
                self.activity.loader(false);
                self.activity.toggle();
            });
        };

        function render(items) {
            if (!items.length) {
                html.append($('<div class="yani-trailers__empty selector"></div>').text(t('no_videos')));
                scroll.append(html);
                return;
            }
            var list = $('<div class="yani-trailers__list"></div>');
            items.forEach(function (trailer, index) {
                var url = trailerUrl(trailer);
                var title = trailer.title || trailer.name || ('Trailer ' + (index + 1));
                var row = $('<div class="yani-trailers__item selector"></div>');
                row.append($('<div class="yani-trailers__icon"></div>').html(isYouTubeTrailer(url) ? youtubeLogoSvg() : externalVideoIcon()));
                row.append($('<div class="yani-trailers__body"></div>').append($('<div class="yani-trailers__title"></div>').text(title)).append($('<div class="yani-trailers__host"></div>').text(trailerHostLabel(url))));
                row.on('hover:focus', function () {
                    last = row[0];
                    row.addClass('focus');
                    scroll.update(row, true);
                });
                row.on('hover:blur', function () { row.removeClass('focus'); });
                row.on('hover:enter click.yaniTrailer', function () { openTrailer(url, title); });
                list.append(row);
            });
            html.append(list);
            scroll.append(html);
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || scroll.render().find('.selector')[0] || false, scroll.render());
                },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { if (Navigator.canmove('down')) Navigator.move('down'); else scroll.wheel(300); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? scroll.render()[0] : scroll.render(); };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function trailerUrl(trailer) {
        return LampaYaniUiUtils.normalizeVideoUrl(trailer && (trailer.iframe_url || trailer.url || trailer.video_url || trailer.link || trailer.src));
    }

    function trailerHostLabel(url) {
        var host = LampaYaniUiUtils.videoHost(url);
        if (!host) return t('trailers');
        return host.replace(/^m\./, '').replace(/^youtu\.be$/, 'youtube.com');
    }

    function legacyOpenTrailers(card) {
        if (!card || !card.yani_id) return;
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        LampaYaniApi.trailers(card.yani_id).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var items = payload && payload.response ? payload.response : payload;
            items = Array.isArray(items) ? items.map(function (trailer, index) {
                var url = trailerUrl(trailer);
                return {
                    title: trailer.title || trailer.name || ('Trailer ' + (index + 1)),
                    url: url,
                    // Lampa Select renders item icons next to the title.
                    // Keep it local so the mark is available offline too.
                    icon: isYouTubeTrailer(url) ? youtubeLogoDataUri() : null
                };
            }).filter(function (item) { return item.url; }) : [];
            if (!items.length) {
                Lampa.Noty.show(t('no_videos'));
                return;
            }
            if (items.length === 1) {
                openTrailer(items[0].url, items[0].title);
                return;
            }
            Lampa.Select.show({
                title: t('trailers'),
                items: items,
                onSelect: function (item) { openTrailer(item.url, item.title); }
            });
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime] Trailers failed', error);
            Lampa.Noty.show(t('catalog_load_error'));
        });
    }

    function isYouTubeTrailer(url) {
        return /(^|\/\/)(?:www\.)?(?:youtube\.com|youtube-nocookie\.com|youtu\.be)\//i.test(String(url || ''));
    }

    function youtubeLogoDataUri() {
        return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff0033" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"/><path fill="#fff" d="m9.6 15.8 6.3-3.8-6.3-3.8v7.6Z"/></svg>');
    }

    function youtubeLogoSvg() {
        return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#ff0033" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"/><path fill="#fff" d="m9.6 15.8 6.3-3.8-6.3-3.8v7.6Z"/></svg>';
    }

    function externalVideoIcon() {
        return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"/></svg>';
    }

    function openTrailer(url, title) {
        url = LampaYaniUiUtils.normalizeVideoUrl(url);
        if (!url) return;
        // Trailers are normally YouTube links. An iframe inside Lampa cannot
        // reliably play them on Android TV, while External lets Android route
        // the URL to the installed YouTube (or another matching) application.
        if (openExternalVideo(url, title, {youtubeIntent: true})) return;
        Lampa.Noty.show(url);
    }

    function openExternalVideo(url, title, options) {
        options = options || {};
        url = options.youtubeIntent ? externalTrailerUrl(url) : LampaYaniUiUtils.normalizeVideoUrl(url);
        if (options.requireDirect && !isExternalPlayableUrl(url, options.source)) return false;
        var intentUrl = options.youtubeIntent ? youtubeIntentUrl(url) : '';
        var externalUrl = intentUrl || url;
        var playlist = Array.isArray(options.playlist) ? options.playlist.map(function (item) {
            return {
                title: cleanPlaybackTitle(item.title),
                url: item.url,
                time: Number(item.time || 0),
                headers: item.headers || null,
                quality: item.quality || null
            };
        }).filter(function (item) { return item.url; }) : [];
        var payload = {
            title: cleanPlaybackTitle(title || 'YummyAnime'),
            url: url,
            poster: options.poster || '',
            time: Number(options.time || 0),
            playlist: playlist,
            headers: options.headers || null,
            quality: options.quality || null
        };
        if (!options.youtubeIntent) {
            if (tryExternalOpen('Lampa.Android.openPlayer', function () {
                if (!Lampa.Android || !Lampa.Android.openPlayer) return false;
                prepareExternalRestore();
                Lampa.Android.openPlayer(url, payload);
                return true;
            })) return true;
            if (tryExternalOpen('Android.openPlayer', function () {
                if (!window.Android || typeof Android.openPlayer !== 'function') return false;
                prepareExternalRestore();
                Android.openPlayer(url, JSON.stringify(payload));
                return true;
            })) return true;
            if (tryExternalOpen('AndroidJS.openPlayer', function () {
                if (!window.AndroidJS || typeof AndroidJS.openPlayer !== 'function') return false;
                prepareExternalRestore();
                AndroidJS.openPlayer(url, JSON.stringify(payload));
                return true;
            })) return true;
        }
        if (options.youtubeIntent) {
            if (openAndroidAppUri(externalUrl)) return true;
            if (url !== externalUrl && openAndroidAppUri(url)) return true;
        }
        return openExternalUri(externalUrl);
    }

    function openExternalUri(externalUrl) {
        if (!externalUrl) return false;
        if (tryExternalOpen('Lampa.External.open', function () {
            if (!Lampa.External || !Lampa.External.open) return false;
            prepareExternalRestore();
            Lampa.External.open(externalUrl);
            return true;
        })) return true;
        if (tryExternalOpen('Lampa.Utils.open', function () {
            if (!Lampa.Utils || !Lampa.Utils.open) return false;
            prepareExternalRestore();
            Lampa.Utils.open(externalUrl);
            return true;
        })) return true;
        if (tryExternalOpen('navigator.app.loadUrl', function () {
            if (!window.navigator || !navigator.app || !navigator.app.loadUrl) return false;
            prepareExternalRestore();
            navigator.app.loadUrl(externalUrl, {openExternal: true});
            return true;
        })) return true;
        if (tryExternalOpen('window.open', function () {
            if (!window.open) return false;
            prepareExternalRestore();
            window.open(externalUrl, '_system');
            return true;
        })) return true;
        return false;
    }

    function yummyTvEnabled() {
        if (!Lampa.Storage || !Lampa.Storage.get) return false;
        var value = Lampa.Storage.get('yani_yummytv_enabled', false);
        return value === true || value === 'true' || value === 1 || value === '1';
    }

    function yummyTvAnimeId(card) {
        return card && (card.yani_id || card.anime_id || card.yummy_id);
    }

    function openYummyTv(card) {
        if (!yummyTvEnabled()) return false;
        var url = LampaYaniUiUtils.yummyTvDetailsUrl(yummyTvAnimeId(card));
        if (!url) {
            Lampa.Noty.show(t('yummytv_id_missing'));
            return false;
        }
        if (openAndroidAppUri(url)) return true;
        Lampa.Noty.show(t('yummytv_open_failed'));
        return false;
    }

    function openAndroidAppUri(url) {
        if (!url) return false;
        if (tryExternalOpen('Lampa.Android.openBrowser', function () {
            if (!Lampa.Android || typeof Lampa.Android.openBrowser !== 'function') return false;
            prepareExternalRestore();
            Lampa.Android.openBrowser(url);
            return true;
        })) return true;
        if (tryExternalOpen('AndroidJS.openBrowser', function () {
            if (!window.AndroidJS || typeof AndroidJS.openBrowser !== 'function') return false;
            prepareExternalRestore();
            AndroidJS.openBrowser(url);
            return true;
        })) return true;
        if (tryExternalOpen('Android.openBrowser', function () {
            if (!window.Android || typeof Android.openBrowser !== 'function') return false;
            prepareExternalRestore();
            Android.openBrowser(url);
            return true;
        })) return true;
        return false;
    }

    function prepareExternalRestore() {
        installExternalRestoreHooks();
        externalRestoreState.pending = true;
        externalRestoreState.openedAt = Date.now();
        externalRestoreState.controller = currentControllerName() || 'content';
        externalRestoreState.element = document.querySelector('.selector.focus') || document.querySelector('.selector');
    }

    function installExternalRestoreHooks() {
        if (externalRestoreState.installed) return;
        externalRestoreState.installed = true;
        window.addEventListener('focus', restoreExternalFocus, false);
        window.addEventListener('pageshow', restoreExternalFocus, false);
        document.addEventListener('resume', restoreExternalFocus, false);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) restoreExternalFocus();
        }, false);
    }

    function currentControllerName() {
        try {
            var enabled = Lampa.Controller && Lampa.Controller.enabled ? Lampa.Controller.enabled() : null;
            return enabled && enabled.name || '';
        } catch (ignore) {
            return '';
        }
    }

    function restoreExternalFocus() {
        if (!externalRestoreState.pending) return;
        var delay = Math.max(0, 600 - (Date.now() - externalRestoreState.openedAt));
        setTimeout(function () {
            if (!externalRestoreState.pending) return;
            externalRestoreState.pending = false;
            try {
                var controller = externalRestoreState.controller || 'content';
                if (Lampa.Controller && Lampa.Controller.toggle) Lampa.Controller.toggle(controller);
                var element = externalRestoreState.element;
                if (!element || !document.documentElement.contains(element)) {
                    element = document.querySelector('.selector.focus') || document.querySelector('.selector');
                }
                if (element && Lampa.Controller && Lampa.Controller.collectionFocus) {
                    Lampa.Controller.collectionFocus(element, $(element).closest('.scroll, .yani-detail, .yani-home, body'));
                }
            } catch (error) {
                console.warn('[YummyAnime] Could not restore Lampa focus after external player', error);
            }
        }, delay);
    }

    function showExternalPlaybackOptions(card, options) {
        options = options || {};
        var items = [];
        var yummyTvUrl = yummyTvEnabled() ? LampaYaniUiUtils.yummyTvDetailsUrl(yummyTvAnimeId(card)) : '';
        if (options.url || options.onPlayer) {
            items.push({title: t('watch_in_player'), subtitle: t('watch_in_player_description'), action: 'player'});
        }
        if (yummyTvUrl) items.push({title: t('watch_in_yummytv'), subtitle: t('watch_in_yummytv_description'), action: 'yummytv'});
        if (!items.length || !Lampa.Select || !Lampa.Select.show) {
            if (options.onPlayer && options.onPlayer()) return true;
            if (yummyTvUrl && openYummyTv(card)) return true;
            Lampa.Noty.show(t('external_stream_unavailable'));
            return false;
        }
        Lampa.Select.show({
            title: t('choose_playback'),
            items: items,
            onSelect: function (item) {
                if (item && item.action === 'player') {
                    if (options.onPlayer && options.onPlayer()) return;
                    if (options.url && openExternalUri(options.url)) return;
                    Lampa.Noty.show(t('external_stream_unavailable'));
                    return;
                }
                if (item && item.action === 'yummytv') openYummyTv(card);
            }
        });
        return true;
    }

    function openTitlePlaybackOptions(card) {
        var yummyTvUrl = yummyTvEnabled() ? LampaYaniUiUtils.yummyTvDetailsUrl(yummyTvAnimeId(card)) : '';
        if (!yummyTvUrl || !Lampa.Select || !Lampa.Select.show) {
            openVideos(card, false);
            return;
        }

        Lampa.Select.show({
            title: t('choose_playback'),
            items: [
                {title: t('watch_in_player'), subtitle: t('watch_in_player_description'), action: 'player'},
                {title: t('watch_in_yummytv'), subtitle: t('watch_in_yummytv_description'), action: 'yummytv'}
            ],
            onSelect: function (item) {
                if (item && item.action === 'yummytv') {
                    openYummyTv(card);
                    return;
                }
                openVideos(card, false);
            }
        });
    }

    function tryExternalOpen(name, callback) {
        try {
            return !!callback();
        } catch (error) {
            console.warn('[YummyAnime] Could not open trailer through ' + name, error);
            return false;
        }
    }

    function cleanPlaybackTitle(value) {
        return String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    }

    function externalTrailerUrl(url) {
        var id = youtubeVideoId(url);
        return id ? 'https://www.youtube.com/watch?v=' + encodeURIComponent(id) : url;
    }

    function youtubeVideoId(url) {
        url = String(url || '');
        try {
            var parsed = new URL(url);
            var host = parsed.hostname.replace(/^www\./, '').replace(/^m\./, '');
            if (host === 'youtu.be') return parsed.pathname.replace(/^\/+/, '').split('/')[0] || '';
            if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
                if (parsed.searchParams.get('v')) return parsed.searchParams.get('v');
                var match = parsed.pathname.match(/\/(?:embed|shorts|v)\/([^/?#]+)/i);
                if (match) return match[1];
            }
        } catch (error) {
            var fallback = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?.*?[?&]v=|embed\/|shorts\/|v\/))([^&#?/]+)/i);
            return fallback ? fallback[1] : '';
        }
        return '';
    }

    function youtubeIntentUrl(url) {
        var id = youtubeVideoId(url);
        if (!id || !Lampa.Platform || !Lampa.Platform.is || !Lampa.Platform.is('android')) return '';
        var watch = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
        return 'intent://www.youtube.com/watch?v=' + encodeURIComponent(id) + '#Intent;scheme=https;package=com.google.android.youtube;S.browser_fallback_url=' + encodeURIComponent(watch) + ';end';
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

    function mediaMeta(item) {
        item = item || {};
        var videos = Array.isArray(item.videos) ? item.videos : [];
        var voices = {};
        var quality = 0;
        videos.forEach(function (video) {
        var data = LampaYaniUiUtils.videoData(video);
            var voice = data.dubbing || data.translation || data.voice || data.player;
            if (voice) voices[String(voice)] = true;
            [video.quality, video.resolution, data.quality, data.resolution].forEach(function (value) {
                var match = String(value || '').match(/(2160|1440|1080|720|576|480|360)\s*p?/i);
                if (match) quality = Math.max(quality, Number(match[1]));
                if (/4k/i.test(String(value || ''))) quality = Math.max(quality, 2160);
            });
        });
        var translates = Array.isArray(item.translates) ? item.translates.length : 0;
        return {
            voices: Object.keys(voices).length || translates,
            quality: quality >= 2160 ? '4K' : quality ? quality + 'p' : ''
        };
    }

    function formatRating(value) {
        return Number(value) > 0 ? Number(value).toFixed(1) : '—';
    }

    function addCardRatings(element, card) {
        var ratings = card && card.yani_ratings || [];
        if (!ratings.length || !card) return;
        var render = cardRenderElement(element, card);
        if ($('.yani-card-ratings', render).length) return;

        $('.card__vote', render).hide();
        var block = $('<div class="yani-card-ratings"></div>');
        ratings.forEach(function (rating) {
            var badge = $('<div class="yani-card-rating yani-card-rating--' + rating.key + '"></div>');
            badge.append(createRatingLogo(rating, 'yani-card-rating__logo'));
            badge.append($('<span class="yani-card-rating__value"></span>').text(formatRating(rating.value)));
            block.append(badge);
        });
        $('.card__view', render).append(block);
    }

    function createRatingLogo(rating, className) {
        return $('<span class="' + className + ' yani-rating-logo yani-rating-logo--' + rating.key + '"></span>')
            .text(rating.short || rating.key)
            .attr('title', rating.title || rating.key)
            .attr('aria-label', rating.title || rating.key);
    }

    function createDetailRatings(ratings, votes) {
        var block = $('<div class="yani-ratings"></div>');
        ratings.forEach(function (rating) {
            var item = $('<div class="yani-ratings__item"></div>');
            var header = $('<div class="yani-ratings__header"></div>');
            header.append(createRatingLogo(rating, 'yani-ratings__logo'));
            header.append($('<div class="yani-ratings__value"></div>').text(formatRating(rating.value)));
            item.append(header);
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
            param: {name: 'yani_about', type: 'button'},
            field: {
                name: t('version_name'),
                description: t('version_label') + ' ' + LampaYaniConfig.version + ' · ' + t('unofficial_extension') + ' · ' + t('website_description') + ': ' + yummyWebsiteUrl()
            },
            onChange: openYummyWebsite
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_usage_policy', type: 'button'},
            field: {name: t('usage_policy_title'), description: t('usage_policy_settings_description')},
            onChange: showUsagePolicy
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_language', type: 'select', values: {ru: 'Русский', uk: 'Українська', en: 'English'}, default: 'ru'},
            field: {name: t('language_name'), description: t('language_description')},
            onChange: function (value) {
                if (value && typeof value === 'object') value = value.value;
                LampaYaniI18n.setLanguage(value);
                Lampa.Noty.show(t('language_changed'));
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {
                name: 'yani_player_preference',
                type: 'select',
                values: {last: t('player_last'), ask: t('player_ask'), kodik: 'Kodik', alloha: 'Alloha', cvh: 'CVH', sibnet: 'Sibnet', aksor: 'Aksor'},
                default: 'last'
            },
            field: {name: t('player_preference'), description: t('player_preference_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {
                name: 'yani_playback_target',
                type: 'select',
                values: {ask: t('playback_target_ask'), external: t('playback_target_external'), internal: t('playback_target_internal')},
                default: 'ask'
            },
            field: {name: t('playback_target'), description: t('playback_target_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {
                name: 'yani_aniskip',
                type: 'select',
                values: {off: t('aniskip_off'), op: t('aniskip_openings'), op_ed: t('aniskip_openings_endings')},
                default: 'off'
            },
            field: {name: t('aniskip'), description: t('aniskip_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_auto_next', type: 'trigger', default: false},
            field: {name: t('auto_next'), description: t('auto_next_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_playback_services_title', type: 'title'},
            field: {name: t('playback_services')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_yummytv_enabled', type: 'trigger', default: false},
            field: {name: t('yummytv_integration'), description: t('yummytv_integration_description')}
        });

        var resolverUrl = window.LampaYaniResolver ? LampaYaniResolver.baseUrl() : '';
        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_resolver_server', type: 'button'},
            field: {
                name: t('resolver_server'),
                description: t('resolver_server_description') + ': ' + (resolverUrl || t('not_configured'))
            },
            onChange: editResolverServer
        });

        if (resolverUrl) {
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_resolver_check', type: 'button'},
                field: {name: t('resolver_check'), description: t('resolver_check_description')},
                onChange: function () {
                    LampaYaniResolver.health().then(function (payload) {
                        Lampa.Noty.show(t('resolver_ok') + (payload && payload.version ? ' · v' + payload.version : ''));
                    }).catch(function (error) {
                        console.error('[YummyAnime]', error);
                        Lampa.Noty.show(t('resolver_error'));
                    });
                }
            });
        }

        var lampacUrl = window.LampaYaniLampacResolver ? LampaYaniLampacResolver.baseUrl() : '';
        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_lampac_server', type: 'button'},
            field: {
                name: t('lampac_server'),
                description: t('lampac_server_description') + ': ' + (lampacUrl || t('not_configured'))
            },
            onChange: editLampacServer
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_alloha_iframe', type: 'trigger', default: false},
            field: {name: t('alloha_iframe'), description: t('alloha_iframe_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_clear_playback_history', type: 'button'},
            field: {name: t('clear_history'), description: t('clear_history_description')},
            onChange: function () {
                if (Lampa.Storage) Lampa.Storage.set('yani_playback_history', '{}');
                Lampa.Noty.show(t('history_cleared'));
            }
        });

        var authorized = Boolean(LampaYaniAuth.token());
        if (authorized) {
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_account_state', type: 'button'},
                field: {name: t('authorized') + ': ' + authDisplayName(), description: t('auth_manage_description')},
                onChange: openSettingsLogin
            });
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_auto_sync_progress', type: 'trigger', default: true},
                field: {name: t('auto_sync_progress'), description: t('auto_sync_progress_description')}
            });
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_account_refresh', type: 'button'},
                field: {name: t('refresh_name'), description: t('refresh_description')},
                onChange: function () {
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
                param: {name: 'yani_account_logout', type: 'button'},
                field: {name: t('logout_name'), description: t('logout_description')},
                onChange: function () {
                    LampaYaniAuth.logout().then(function () {
                        Lampa.Noty.show(t('logged_out'));
                    }).catch(function (error) {
                        console.error('[YummyAnime]', error);
                        Lampa.Noty.show(t('token_removed'));
                    });
                }
            });
        } else {
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_account_login', type: 'button'},
                field: {name: t('login_name'), description: t('login_description')},
                onChange: openSettingsLogin
            });
        }

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_api_settings_title', type: 'title'},
            field: {name: t('api_settings')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_public_application_token', type: 'button'},
            field: {
                name: t('public_application_token'),
                description: t('public_application_token_description') + ': ' +
                    (LampaYaniConfig.customApplicationToken() ? t('public_application_token_custom') : t('public_application_token_default'))
            },
            onChange: editPublicApplicationToken
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_api_check', type: 'button'},
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

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_lampa_card_title', type: 'title'},
            field: {name: t('lampa_card_integration')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_lampa_card_rating', type: 'trigger', default: true},
            field: {name: t('lampa_card_rating'), description: t('lampa_card_rating_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_lampa_card_button', type: 'trigger', default: true},
            field: {name: t('lampa_card_button'), description: t('lampa_card_button_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_home_sections_title', type: 'title'},
            field: {name: t('home_sections')}
        });

        [
            ['catalog', 'catalog'],
            ['genres', 'genres'],
            ['search', 'search'],
            ['schedule', 'schedule'],
            ['continue_watching', 'continue_watching'],
            ['status', 'status'],
            ['top_rated', 'top_rated'],
            ['for_you', 'for_you'],
            ['updates', 'updates'],
            ['account', 'account']
        ].forEach(function (section) {
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_section_' + section[0], type: 'trigger', default: true},
                field: {name: t(section[1]), description: t('section_visibility_description')}
            });
        });
    }

    function yummyWebsiteUrl() {
        var language = LampaYaniI18n.getLanguage();
        return language === 'en' || language === 'uk' ? 'https://en.yummyani.me/' : 'https://ru.yummyani.me/';
    }

    function yummyTitleUrl(card) {
        var slug = card && card.yani_url;
        if (!slug || typeof slug !== 'string') return '';
        if (/^https?:\/\//i.test(slug)) return slug;
        slug = slug.replace(/^\/+/, '').replace(/^catalog\/item\//i, '');
        return yummyWebsiteUrl().replace(/\/$/, '') + '/catalog/item/' + encodeURIComponent(slug);
    }

    function openYummyWebsite() {
        var url = yummyWebsiteUrl();
        if (Lampa.Browser && Lampa.Browser.open) return Lampa.Browser.open(url);
        if (Lampa.External && Lampa.External.open) return Lampa.External.open(url);
        if (Lampa.Utils && Lampa.Utils.open) return Lampa.Utils.open(url);
        if (window.open) return window.open(url, '_blank');
        Lampa.Noty.show(url);
    }

    function openSettingsLogin() {
        Lampa.Activity.push({
            url: 'yani/auth',
            title: 'YummyAnime · ' + t('auth_title'),
            component: 'yani_auth'
        });
    }

    function authDisplayName() {
        var account = LampaYaniAuth.get();
        return account.display_name || account.login || t('user');
    }

    function editLampacServer() {
        if (!window.LampaYaniLampacResolver) return Lampa.Noty.show(t('lampac_unavailable'));
        showYummyInput({
            title: t('lampac_server_prompt'),
            value: LampaYaniLampacResolver.baseUrl(),
            nosave: true
        }, function (value) {
            value = String(value || '').trim();
            var saved = LampaYaniLampacResolver.setBaseUrl(value);
            if (value && !saved) return Lampa.Noty.show(t('lampac_server_invalid'));
            Lampa.Noty.show(saved ? t('lampac_server_saved') : t('lampac_server_disabled'));
        });
    }

    function editResolverServer() {
        if (!window.LampaYaniResolver) return Lampa.Noty.show(t('resolver_unavailable'));
        showYummyInput({
            title: t('resolver_server_prompt'),
            value: LampaYaniResolver.baseUrl(),
            nosave: true
        }, function (value) {
            value = String(value || '').trim();
            var saved = LampaYaniResolver.setBaseUrl(value);
            if (value && !saved) return Lampa.Noty.show(t('resolver_server_invalid'));
            Lampa.Noty.show(saved ? t('resolver_server_saved') : t('resolver_server_disabled'));
        });
    }

    function editPublicApplicationToken() {
        showYummyInput({
            title: t('public_application_token_prompt'),
            value: LampaYaniConfig.customApplicationToken(),
            nosave: true
        }, function (value) {
            value = String(value || '').trim();
            if (!LampaYaniConfig.setApplicationToken(value)) {
                Lampa.Noty.show(t('public_application_token_invalid'));
                return;
            }
            Lampa.Noty.show(value ? t('public_application_token_saved') : t('public_application_token_restored'));
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

    function commentsMenu(id, skip, existing) {
        skip = Number(skip || 0);
        existing = existing || [];
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        LampaYaniApi.comments(id, skip).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var page = LampaYaniApi.normalizeComments(payload);
            var comments = existing.concat(page);
            if (!comments.length) return Lampa.Noty.show(t('comments_empty'));
            renderCommentList(t('comments_title'), comments, page.length >= 20 ? function () {
                commentsMenu(id, skip + page.length, comments);
            } : null);
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Comments]', error);
            Lampa.Noty.show(t('comments_error'));
        });
    }

    function commentReplies(comment, skip, existing, onBack) {
        skip = Number(skip || 0);
        existing = existing || [];
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        LampaYaniApi.commentChildren(comment.id, skip).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var page = LampaYaniApi.normalizeComments(payload);
            var comments = existing.concat(page);
            if (!comments.length) return Lampa.Noty.show(t('comments_empty'));
            renderCommentList(t('replies_title'), comments, page.length >= 20 ? function () {
                commentReplies(comment, skip + page.length, comments, onBack);
            } : null, onBack);
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Comment Replies]', error);
            Lampa.Noty.show(t('comments_error'));
        });
    }

    function renderCommentList(title, comments, onMore, onBack) {
        var items = comments.map(commentItem);
        if (onMore) items.push({title: t('load_more'), load_more: true});
        var params = {
            title: title,
            items: items,
            onSelect: function (item) {
                if (item.load_more) return onMore();
                if (item.comment && Number(item.comment.children_count) > 0) {
                    return commentReplies(item.comment, 0, [], function () {
                        renderCommentList(title, comments, onMore, onBack);
                    });
                }
            }
        };
        if (onBack) params.onBack = onBack;
        Lampa.Select.show(params);
    }

    function commentItem(comment) {
        var author = comment.name || (comment.author && comment.author.name) || t('user');
        var text = cleanCommentText(comment.text || comment.body || '');
        var date = Number(comment.time) > 0 ? new Date(Number(comment.time) * 1000).toLocaleDateString(locale()) : '';
        var stats = [];
        if (Number(comment.likes) > 0) stats.push('♥ ' + comment.likes);
        if (Number(comment.dislikes) > 0) stats.push('−' + comment.dislikes);
        if (Number(comment.children_count) > 0) stats.push('↳ ' + comment.children_count + ' ' + t('replies'));
        return {
            title: author + (date ? ' · ' + date : '') + ': ' + text,
            subtitle: stats.join(' · '),
            comment: comment
        };
    }

    function cleanCommentText(text) {
        return String(text || '').replace(/\[ник\]([^[]+)\[\/ник\]/gi, '@$1').replace(/\[[^\]]+\]/g, '').replace(/\s+/g, ' ').trim();
    }

    function installFullRating() {
        if (window.yummyanime_full_rating_ready || !Lampa.Listener) return;
        window.yummyanime_full_rating_ready = true;

        Lampa.Listener.follow('full', function (event) {
            if (event.type !== 'complite') return;
            var movie = event.data && event.data.movie ? event.data.movie : event.object && event.object.card_data;
            if (!movie || !event.object || !event.object.activity) return;
            if (!lampaCardIntegrationEnabled('rating') && !lampaCardIntegrationEnabled('button')) return;
            // A native Lampa card may be a film or a live-action series with
            // an accidentally similar title. Do not decorate those cards
            // with a YummyAnime action.
            if (!movie.yani_card && !isNativeAnimeCard(movie)) return;

            var matchRequest = movie.yani_card ? Promise.resolve([movie.yani_card]) : findYummyMatches(movie);
            matchRequest.then(function (matches) {
                var anime = matches[0];
                if (!anime) return;
                var render = event.object.activity.render();
                var line = $('.full-start-new__rate-line, .full-start__rate-line', render).first();
                // Lampa already owns the usual TMDB/IMDb/Kinopoisk rating
                // line, and rating plugins may add MAL/Shikimori too.  The
                // native card needs one clear YummyAnime marker, not a second
                // competing list of the same services.
                nativeLampaRatings(anime.yani_ratings || []).forEach(function (rating) {
                    var className = 'rate--yummyanime-' + rating.key;
                    if ($('.' + className, render).length) return;
                    var block = $('<div class="full-start__rate ' + className + '"><div>' + formatRating(rating.value) + '</div><div class="yani-full-rating-logo" title="' + rating.title + '" aria-label="' + rating.title + '">' + yummyRatingLogo() + '</div></div>');
                    line.append(block);
                });
                addYummyFullButton(render, movie, anime);
            }).catch(function () {});
        });
    }

    function nativeLampaRatings(ratings) {
        if (!lampaCardIntegrationEnabled('rating')) return [];
        return (ratings || []).filter(function (rating) {
            return rating && rating.key === 'yummy' && Number(rating.value) > 0;
        });
    }

    function lampaCardIntegrationEnabled(feature) {
        if (!Lampa.Storage || !Lampa.Storage.get) return true;
        var value = Lampa.Storage.get('yani_lampa_card_' + feature, true);
        return value !== false && value !== 'false';
    }

    function yummyRatingLogo() {
        return '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M18.45 0H1.55A1.55 1.55 0 000 1.55v16.9A1.54 1.54 0 001.55 20h16.9A1.55 1.55 0 0020 18.45V1.55A1.54 1.54 0 0018.45 0Zm-2.83 5.93-2.1 2.66-2.3-5.43a6.95 6.95 0 014.4 2.77Zm-2.9 6.57h-4l2.03-4.8 1.98 4.8Zm-2.37-9.34L7.8 9.06 4.87 5.33c.64-.7 1.4-1.26 2.27-1.65a8.18 8.18 0 013.2-.52ZM3.57 7.39l3.2 4.06-1.56 3.58A6.96 6.96 0 013.57 7.39Zm6.57 9.56c-1.05.01-2.1-.2-3.05-.65l.76-1.8h5.7l.49 1.15a6.93 6.93 0 01-3.9 1.3Zm6.8-7.07a7.8 7.8 0 01-1.17 4L14.55 11l2.17-2.77c.14.54.21 1.1.23 1.65Z"/></svg>';
    }

    function addYummyFullButton(render, movie, anime) {
        if (!lampaCardIntegrationEnabled('button')) return;
        var container = $('.full-start-new__buttons', render);
        if (!container.length) container = $('.full-start__buttons', render);
        if (!container.length) return;

        if (!$('.view--yummyanime', render).length) {
            var button = $('<div class="full-start__button selector view--yummyanime" title="YummyAnime" aria-label="YummyAnime"><span class="view--yummyanime__icon" aria-hidden="true">' + yummyRatingLogo() + '</span></div>');
            button.on('hover:enter click.yaniFullDetail', function () { openYummyDetail(anime, false); });
            container.prepend(button);
        }
    }
}(window));
