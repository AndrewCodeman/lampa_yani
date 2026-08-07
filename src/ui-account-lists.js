(function (window) {
    'use strict';
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
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.AccountLists = window.LampaYaniAccountLists = {accountList: accountList, subscriptions: subscriptions};
}(window));
