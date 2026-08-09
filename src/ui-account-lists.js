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
        comp.create = function () { this.build({results: (object.items || []).map(deps.toCard), total_pages: 1, title: object.title}); };
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
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-account yani-user-lists"></div>');
        var content = $('<div class="yani-account__content"></div>');
        var last;

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
                var tile = $('<div class="yani-account__list selector"></div>');
                tile.append($('<div class="yani-account__list-title"></div>').text(definition.title));
                tile.append($('<div class="yani-account__list-time"></div>').text(deps.t('open_list')));
                focus(tile);
                tile.on('hover:enter click.yaniUserList', function () {
                    if (definition.history) deps.openHistory();
                    else deps.openList(definition);
                });
                grid.append(tile);
            });
            content.append(grid);
        }

        this.create = function () {
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
                down: function () { LampaYaniNavigation.moveDown(scroll); },
                back: deps.goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
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
