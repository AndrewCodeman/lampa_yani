(function (window) {
    'use strict';

    function payloadItems(payload) {
        var value = payload && payload.response !== undefined ? payload.response : payload;
        if (Array.isArray(value)) return value;
        return value && (value.items || value.data || value.history || value.watches) || [];
    }

    function timestamp(value) {
        if (!value) return 0;
        if (typeof value === 'string' && !/^\d+$/.test(value)) return Date.parse(value) || 0;
        var number = Number(value) || 0;
        return number > 0 && number < 100000000000 ? number * 1000 : number;
    }

    function recentSources(localHistory, remotePayload, limit) {
        var candidates = [];
        Object.keys(localHistory || {}).forEach(function (key) {
            var item = localHistory[key] || {};
            candidates.push({
                id: item.anime_id || key,
                title: item.title || item.card && item.card.title || '',
                updatedAt: timestamp(item.updated_at || item.date)
            });
        });
        payloadItems(remotePayload).forEach(function (item) {
            item = item || {};
            candidates.push({
                id: item.anime_id || item.animeId || item.anime && (item.anime.anime_id || item.anime.id),
                title: item.title || item.anime_title || item.anime && item.anime.title || '',
                updatedAt: timestamp(item.updated_at || item.date || item.created_at)
            });
        });
        candidates.sort(function (a, b) { return b.updatedAt - a.updatedAt; });
        var seen = {};
        return candidates.filter(function (item) {
            var key = String(item.id || '');
            if (!key || seen[key]) return false;
            seen[key] = true;
            return true;
        }).slice(0, limit || 4);
    }

    function cardsFromRows(rows, sources, toCard, t) {
        var seen = {};
        (sources || []).forEach(function (source) { seen[String(source.id)] = true; });
        var cards = [];
        (rows || []).forEach(function (row, index) {
            var source = sources[index] || {};
            (row || []).forEach(function (item) {
                var card = toCard(item);
                var key = String(card && (card.yani_id || card.title) || '');
                if (!card || !card.yani_id || !key || seen[key]) return;
                seen[key] = true;
                card.yani_recommendation_label = source.title
                    ? t('because_you_watched') + ' ' + source.title
                    : t('recommended_for_you');
                cards.push(card);
            });
        });
        return cards.slice(0, 40);
    }

    function fallback(comp, deps) {
        return deps.catalog({limit: 30, sort: 'top', sort_forward: true, from_year: 1900}).then(function (payload) {
            var cards = deps.normalize(payload).map(deps.toCard).filter(function (card) { return Boolean(card.yani_id); });
            cards.forEach(function (card) { card.yani_recommendation_label = deps.t('popular_fallback'); });
            comp.build({results: cards, total_pages: 1, title: deps.t('for_you')});
            if (!cards.length) deps.notice(deps.t('recommendations_empty'));
        });
    }

    function component(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            var remote = deps.authorized()
                ? deps.watchHistory(30, 0).catch(function (error) {
                    console.warn('[YummyAnime Recommendations] Remote history is unavailable', error);
                    return [];
                })
                : Promise.resolve([]);
            remote.then(function (remotePayload) {
                var sources = recentSources(deps.history(), remotePayload, 4);
                if (!sources.length) return fallback(self, deps);
                return Promise.all(sources.map(function (source) {
                    return deps.recommendations(source.id).then(deps.normalize).catch(function (error) {
                        console.warn('[YummyAnime Recommendations] Source failed', source.id, error);
                        return [];
                    });
                })).then(function (rows) {
                    var cards = cardsFromRows(rows, sources, deps.toCard, deps.t);
                    if (!cards.length) return fallback(self, deps);
                    self.build({results: cards, total_pages: 1, title: deps.t('for_you')});
                });
            }).catch(function (error) {
                console.error('[YummyAnime Recommendations]', error);
                self.activity.loader(false);
                deps.notice(deps.t('recommendations_error'));
            });
        };
        comp.cardRender = deps.cardRender;
        return comp;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Recommendations = window.LampaYaniRecommendations = {
        component: component,
        payloadItems: payloadItems,
        recentSources: recentSources,
        cardsFromRows: cardsFromRows
    };
}(window));
