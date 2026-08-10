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
        var items = [];
        var pageSize = 30;
        var totalPages = 1;
        var destroyed = false;

        function pageCards(page) {
            var start = Math.max(0, (page - 1) * pageSize);
            return items.slice(start, start + pageSize).map(deps.toCard);
        }

        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            var source = object.lazy && deps.loadItems
                ? deps.loadItems(object.definition)
                : Promise.resolve(object.items || []);
            source.then(function (loaded) {
                if (destroyed) return;
                items = Array.isArray(loaded) ? loaded : [];
                totalPages = Math.max(1, Math.ceil(items.length / pageSize));
                self.build({results: pageCards(1), total_pages: totalPages, title: object.title});
            }).catch(function (error) {
                if (destroyed) return;
                console.error('[YummyAnime User List]', error);
                self.build({results: [], total_pages: 1, title: object.title});
                if (deps.onError) deps.onError(error);
            });
        };
        comp.nextPageReuest = function (requestObject, resolve) {
            var page = Math.max(2, Number(requestObject.page) || 2);
            resolve({results: pageCards(page), total_pages: totalPages, title: object.title});
        };
        comp.nextPageRequest = comp.nextPageReuest;
        comp.cardRender = deps.cardRender;
        var originalDestroy = comp.destroy;
        comp.destroy = function () {
            destroyed = true;
            if (originalDestroy) originalDestroy.apply(this, arguments);
        };
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
        var component = new Lampa.InteractionMain(object);
        var destroyed = false;

        function morePoster() {
            var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="360" height="540" viewBox="0 0 360 540">' +
                '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#63574b"/><stop offset="1" stop-color="#9d8a65"/></linearGradient></defs>' +
                '<rect width="360" height="540" rx="22" fill="url(#g)"/><rect x="9" y="9" width="342" height="522" rx="18" fill="none" stroke="#fff" stroke-width="7" opacity=".9"/>' +
                '<text x="180" y="286" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="54">' + deps.t('more') + '</text></svg>';
            return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
        }

        function withMore(row) {
            var results = (row.results || []).slice(0, 10);
            results.push({
                title: deps.t('more'),
                poster: morePoster(),
                img: morePoster(),
                yani_more: true,
                yani_definition: row.definition,
                yani_history: Boolean(row.history)
            });
            return {
                title: row.title + (typeof row.total === 'number' ? ' · ' + row.total : ''),
                results: results,
                nomore: true,
                definition: row.definition,
                history: row.history,
                card_events: {
                    onEnter: function (target, card) {
                        if (card && card.yani_more) {
                            if (card.yani_history) deps.openHistory();
                            else deps.openList(card.yani_definition);
                            return;
                        }
                        deps.openCard(card);
                    }
                }
            };
        }

        component.create = function () {
            if (!LampaYaniAuth.token()) {
                Lampa.Noty.show(deps.t('login_required'));
                deps.goBack();
                return;
            }
            var self = this;
            this.activity.loader(true);
            deps.loadRows().then(function (rows) {
                if (destroyed) return;
                self.build((rows || []).map(withMore));
            }).catch(function (error) {
                if (destroyed) return;
                console.error('[YummyAnime User Lists]', error);
                self.build([]);
                if (deps.onError) deps.onError(error);
            });
        };
        var originalDestroy = component.destroy;
        component.destroy = function () {
            destroyed = true;
            if (originalDestroy) originalDestroy.apply(this, arguments);
        };
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
