(function (window) {
    'use strict';

    function responseItems(payload) {
        var value = payload;
        var fields = ['anime', 'animes', 'results', 'items', 'data', 'list', 'values'];
        var depth = 0;

        while (value && !Array.isArray(value) && depth < 4) {
            if (value.response && value.response !== value) {
                value = value.response;
                depth += 1;
                continue;
            }

            var next;
            fields.some(function (field) {
                if (Array.isArray(value[field])) {
                    next = value[field];
                    return true;
                }
                return false;
            });
            if (next) return next;
            break;
        }

        return Array.isArray(value) ? value : [];
    }

    function normalize(payload) {
        return responseItems(payload).map(function (item) {
            if (!item || !item.anime || typeof item.anime !== 'object') return item;
            var anime = Object.assign({}, item.anime);
            if (item.user) anime.user = item.user;
            if (item.date && !anime.date) anime.date = item.date;
            return anime;
        }).filter(Boolean);
    }

    function state(item) {
        return item && (item.user && item.user.list || item.user_list || item.list_state) || null;
    }

    function filterItems(definition, items) {
        return (items || []).filter(function (item) {
            var current = state(item);
            if (!current) return false;
            if (definition.id === 4) return Boolean(current.is_fav || current.is_favorite || current.favorite);
            var list = current.list && typeof current.list === 'object' ? current.list : current;
            return typeof list.id !== 'undefined' && Number(list.id) === Number(definition.id);
        });
    }

    function accountList(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        var items = object.items || [];
        var pageSize = 30;
        var totalPages = Math.max(1, Math.ceil(items.length / pageSize));

        function pageCards(page) {
            var start = Math.max(0, (page - 1) * pageSize);
            return items.slice(start, start + pageSize).map(deps.toCard);
        }

        comp.create = function () {
            this.build({results: pageCards(1), total_pages: totalPages, title: object.title});
        };
        comp.nextPageReuest = function (requestObject, resolve) {
            var page = Math.max(2, Number(requestObject.page) || 2);
            resolve({results: pageCards(page), total_pages: totalPages, title: object.title});
        };
        comp.nextPageRequest = comp.nextPageReuest;
        comp.cardRender = deps.cardRender;
        return comp;
    }
    function subscriptions(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this; this.activity.loader(true);
            LampaYaniApi.subscriptions(object.userId).then(function (payload) {
                var response = payload && payload.response ? payload.response : payload, values = Array.isArray(response) ? response : response && (response.anime || response.items || response.data || response.subscriptions) || [];
                var cards = values.map(function (item) { var source = item && (item.anime || item.title_data || item.object) || item; return source && (source.anime_id || source.id || source.title) ? deps.toCard(source) : null; }).filter(Boolean);
                if (!cards.length) Lampa.Noty.show(deps.t('subscriptions_empty'));
                self.build({results: cards, total_pages: 1, title: deps.t('subscriptions')});
            }).catch(function (error) { console.error('[YummyAnime Subscriptions]', error); self.activity.loader(false); Lampa.Noty.show(deps.t('subscriptions_error')); });
        };
        comp.cardRender = deps.cardRender;
        return comp;
    }

    function userLists(object, deps) {
        var component = {};
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-account yani-user-lists"></div>');
        var content = $('<div class="yani-account__content"></div>');
        var last;
        var countElements = {};
        var opening = false;

        function listIcon(name) {
            var icons = {
                eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c-5.2 0-9.4 3.4-11 7 1.6 3.6 5.8 7 11 7s9.4-3.4 11-7c-1.6-3.6-5.8-7-11-7Zm0 11.2A4.2 4.2 0 1 1 12 7.8a4.2 4.2 0 0 1 0 8.4Zm0-2A2.2 2.2 0 1 0 12 9.8a2.2 2.2 0 0 0 0 4.4Z"/></svg>',
                cloud: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.5 19H6.2A4.2 4.2 0 1 1 7 10.7 5.5 5.5 0 0 1 17.5 12 3.5 3.5 0 0 1 18.5 19Zm-12.3-2h12.3a1.5 1.5 0 0 0 0-3c-.4 0-.8.1-1.1.3l-1.6.8.1-1.8A3.5 3.5 0 0 0 9 12.5l.1 1.4-1.3-1A2.2 2.2 0 1 0 6.2 17Z"/></svg>',
                flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h2v2h9.2l-1 3 1 3H8v10H6V3Zm2 6h6.3l-.3-1 .3-1H8v2Z"/></svg>',
                'eye-off': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.3 2 18.7 18.7-1.4 1.4-3.1-3.1a11.7 11.7 0 0 1-5.5 1.5c-5.2 0-9.4-3.4-11-7a12.7 12.7 0 0 1 4.5-5.1L1.9 3.4 3.3 2ZM12 8.5a3.5 3.5 0 0 0-1.3.2l4.6 4.6A3.5 3.5 0 0 0 12 8.5Zm0-3.5c5.2 0 9.4 3.4 11 7a12.8 12.8 0 0 1-4.1 4.8l-1.5-1.5A10.8 10.8 0 0 0 20.8 12c-1.8-3-5.2-5-8.8-5-1 0-1.9.1-2.8.4L7.6 5.8C9 5.3 10.5 5 12 5ZM3.2 12c.6 1.1 1.5 2.1 2.5 2.9l-1.4-1.4A9.7 9.7 0 0 1 3.2 12Z"/></svg>',
                hourglass: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h12v2c0 3-1.2 5.2-3.5 7 2.3 1.8 3.5 4 3.5 7v2H6v-2c0-3 1.2-5.2 3.5-7C7.2 9.2 6 7 6 4V2Zm2 2c0 2.6 1.2 4.5 4 6.3C14.8 8.5 16 6.6 16 4H8Zm0 16h8c0-2.6-1.2-4.5-4-6.3C9.2 15.5 8 17.4 8 20Z"/></svg>',
                heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.2 3.7 13A5.6 5.6 0 0 1 11.6 5L12 5.5l.4-.5a5.6 5.6 0 0 1 7.9 8l-8.3 8.2ZM7.6 6.4A3.6 3.6 0 0 0 5.1 12L12 18.3l6.9-6.8a3.6 3.6 0 0 0-5.1-5.1L12 8l-1.4-1.6a3.6 3.6 0 0 0-3-1Z"/></svg>',
                history: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 1 1-7.4 5H2l3.5-4L9 9H6.7A6 6 0 1 0 12 6V4Zm-1 3h2v5.4l3.2 1.8-1 1.7-4.2-2.4V7Z"/></svg>'
            };
            return icons[name] || icons.history;
        }

        function focus(element) {
            element.on('hover:focus', function (event) {
                var target = event.currentTarget || event.target;
                last = target;
                scroll.update($(target), true);
            });
        }

        function render() {
            content.append($('<div class="yani-user-lists__heading"></div>').text(deps.t('user_lists')));
            content.append($('<div class="yani-user-lists__description"></div>').text(deps.t('user_lists_description')));
            var grid = $('<div class="yani-account__lists"></div>');
            var definitions = deps.definitions().slice();
            if (deps.openHistory) definitions.push({key: 'history', title: deps.t('watch_history'), history: true});
            definitions.forEach(function (definition) {
                var tile = $('<div class="yani-account__list yani-user-lists__tile selector"></div>');
                tile.append($('<div class="yani-user-lists__icon"></div>').html(listIcon(definition.icon || (definition.history ? 'history' : ''))));
                var body = $('<div class="yani-user-lists__body"></div>');
                body.append($('<div class="yani-account__list-title"></div>').text(definition.title));
                var count = $('<div class="yani-account__list-count yani-user-lists__count"></div>').text('…');
                countElements[definition.key] = count;
                body.append(count);
                body.append($('<div class="yani-account__list-time"></div>').text(deps.t('open_list')));
                tile.append(body);
                focus(tile);
                tile.on('hover:enter click.yaniUserList', function () {
                    if (opening) return;
                    opening = true;
                    var navigation = definition.history ? deps.openHistory() : deps.openList(definition);
                    if (navigation && typeof navigation.catch === 'function') navigation.catch(function () { opening = false; });
                });
                grid.append(tile);
            });
            content.append(grid);
        }

        function loadCounts() {
            if (!deps.loadCounts) return;
            deps.loadCounts().then(function (counts) {
                Object.keys(countElements).forEach(function (key) {
                    var value = counts && counts[key];
                    countElements[key].text((typeof value === 'number' ? value : '—') + ' ' + deps.t('anime_count'));
                });
            }).catch(function (error) {
                console.warn('[YummyAnime User Lists] Could not load list counters', error);
                Object.keys(countElements).forEach(function (key) {
                    countElements[key].text('— ' + deps.t('anime_count'));
                });
            });
        }

        component.create = function () {
            if (!LampaYaniAuth.token()) {
                Lampa.Noty.show(deps.t('login_required'));
                deps.goBack();
                return;
            }
            render();
            scroll.append(content);
            html.append(scroll.render(true));
            this.activity.loader(false);
            this.activity.toggle();
            loadCounts();
        };

        component.start = function () {
            opening = false;
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { LampaYaniNavigation.moveDown(scroll); },
                back: deps.goBack
            });
            Lampa.Controller.toggle('content');
        };

        component.render = function (js) { return js ? html[0] : html; };
        component.destroy = function () { scroll.destroy(); html.remove(); };
        return component;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.AccountLists = window.LampaYaniAccountLists = {
        accountList: accountList,
        subscriptions: subscriptions,
        userLists: userLists,
        normalize: normalize,
        filterItems: filterItems
    };
}(window));
