(function (window) {
    'use strict';

    function response(payload) {
        return payload && payload.response ? payload.response : payload || {};
    }

    function releaseItems(payload) {
        var value = response(payload);
        return Array.isArray(value.new) ? value.new : [];
    }

    function releaseLabel(item) {
        item = item || {};
        var status = item.anime_status && (item.anime_status.title || item.anime_status.alias) || '';
        var type = item.type && (item.type.name || item.type.shortname || item.type.alias) || '';
        return [status, type].filter(Boolean).join(' · ');
    }

    function normalize(payload, toCard) {
        var seen = {};
        return releaseItems(payload).map(function (item) {
            var card = toCard(item);
            var key = String(card && (card.yani_id || card.title) || '');
            if (!card || !card.yani_id || !key || seen[key]) return null;
            seen[key] = true;
            card.yani_update_label = releaseLabel(item);
            return card;
        }).filter(Boolean);
    }

    function component(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            deps.feed().then(function (payload) {
                var cards = normalize(payload, deps.toCard);
                self.build({results: cards, total_pages: 1, title: deps.t('new_releases')});
                if (!cards.length) deps.notice(deps.t('new_releases_empty'));
            }).catch(function (error) {
                console.error('[YummyAnime New Releases]', error);
                self.activity.loader(false);
                deps.notice(deps.t('new_releases_error'));
            });
        };
        comp.cardRender = deps.cardRender;
        return comp;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Releases = window.LampaYaniReleases = {
        component: component,
        normalize: normalize,
        releaseItems: releaseItems,
        releaseLabel: releaseLabel
    };
}(window));
