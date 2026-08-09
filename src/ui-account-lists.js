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

        function finish(component) {
            scroll.append(content);
            html.append(scroll.render(true));
            component.activity.loader(false);
            component.activity.toggle();
        }

        function notice(title, description) {
            var item = $('<div class="yani-account__notice selector"></div>');
            item.append($('<div class="yani-account__notice-title"></div>').text(title));
            item.append($('<div class="yani-account__notice-text"></div>').text(description));
            focus(item);
            content.append(item);
        }

        function render(profile, stats, lists) {
            var counts = {};
            lists.forEach(function (anime) {
                var userList = anime.user && anime.user.list;
                if (!userList) return;
                if (userList.list && typeof userList.list.id !== 'undefined') {
                    counts[userList.list.id] = (counts[userList.list.id] || 0) + 1;
                }
                if (userList.is_fav) counts[4] = (counts[4] || 0) + 1;
            });

            content.append($('<div class="yani-user-lists__heading"></div>').text(deps.t('user_lists')));
            content.append($('<div class="yani-user-lists__description"></div>').text(deps.t('user_lists_description')));
            var grid = $('<div class="yani-account__lists"></div>');
            deps.definitions().forEach(function (definition) {
                var stat = stats.filter(function (item) {
                    return Number(item.list && item.list.id) === definition.id;
                })[0] || {};
                var tile = $('<div class="yani-account__list selector"></div>');
                tile.append($('<div class="yani-account__list-title"></div>').text(definition.title));
                tile.append($('<div class="yani-account__list-count"></div>').text(String(counts[definition.id] || 0) + ' ' + deps.t('anime_count')));
                tile.append($('<div class="yani-account__list-time"></div>').text(deps.t('total_time') + ': ' + deps.formatWatchTime(stat.seconds)));
                focus(tile);
                tile.on('hover:enter click.yaniUserList', function () {
                    deps.openList(definition, lists, profile.id);
                });
                grid.append(tile);
            });
            content.append(grid);
        }

        this.create = function () {
            var self = this;
            this.activity.loader(true);
            if (!LampaYaniAuth.token()) {
                notice(deps.t('not_logged_in'), deps.t('login_hint'));
                finish(self);
                return;
            }
            LampaYaniApi.profile().then(function (payload) {
                var profile = payload && payload.response ? payload.response : payload;
                return Promise.all([
                    Promise.resolve(profile),
                    LampaYaniApi.userListStats(profile.id).then(deps.responseData).catch(function () { return []; }),
                    LampaYaniApi.userLists(profile.id).then(deps.normalizeList).catch(function () { return []; })
                ]);
            }).then(function (result) {
                render(result[0], Array.isArray(result[1]) ? result[1] : [], Array.isArray(result[2]) ? result[2] : []);
                finish(self);
            }).catch(function (error) {
                console.error('[YummyAnime User Lists]', error);
                notice(deps.t('user_lists_error'), deps.t('account_retry'));
                finish(self);
            });
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
        userLists: userLists
    };
}(window));
