(function (window) {
    'use strict';
    function create(object, deps) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250}), html = $('<div class="yani-notifications"></div>'), content = $('<div class="yani-notifications__content"></div>'), last, offset = 0;
        function render(items, append) {
            if (!append) content.empty();
            var title = $('<div class="yani-notifications__title"></div>').text(deps.t('notifications_title'));
            var mark = $('<div class="yani-detail__button selector"></div>').text(deps.t('mark_all_read')).on('hover:enter click', function () { LampaYaniApi.markAllNotificationsRead().then(function () { content.find('.yani-notification').removeClass('unread'); Lampa.Noty.show(deps.t('saved')); }); });
            var remove = $('<div class="yani-detail__button selector"></div>').text(deps.t('delete_all_notifications')).on('hover:enter click', function () { LampaYaniApi.deleteAllNotifications().then(function () { content.empty().append(title).append($('<div class="yani-account__notice"></div>').text(deps.t('notifications_empty'))); }); });
            if (!append) content.append(title, mark, remove);
            if (!items.length) { if (!append) content.append($('<div class="yani-account__notice selector"></div>').text(deps.t('notifications_empty'))); return; }
            items.forEach(function (notification) {
                var item = $('<div class="yani-notification selector"></div>'); if (!notification.viewed && !notification.read) item.addClass('unread');
                item.append($('<div class="yani-notification__title"></div>').text(notification.title || notification.type || deps.t('notification')));
                if (notification.text || notification.message) item.append($('<div class="yani-notification__text"></div>').text(notification.text || notification.message));
                var date = notification.date || notification.date_seconds || notification.dateSeconds; if (date) item.append($('<div class="yani-notification__date"></div>').text(deps.formatDate(date)));
                item.on('hover:focus', function (event) { last = event.target; scroll.update($(event.target), true); });
                item.on('hover:enter click', function () { if (notification.id && !notification.viewed) LampaYaniApi.markNotificationRead(notification.id).catch(function () {}); var animeId = notification.anime_id || notification.object_id || notification.objectId; if (animeId) deps.openDetail(deps.toCard({anime_id: animeId, title: notification.title || deps.t('anime')}), false); });
                content.append(item);
            });
            var more = $('<div class="yani-detail__button selector"></div>').text(deps.t('notifications_more')).on('hover:enter click', function () { more.remove(); offset += items.length; LampaYaniApi.notifications(30, offset).then(function (payload) { render(deps.normalize(payload), true); }); });
            content.append(more);
        }
        return {create: function () { var self = this; this.activity.loader(true); LampaYaniApi.notifications(30, offset).then(function (payload) { render(deps.normalize(payload), false); scroll.append(content); html.append(scroll.render(true)); self.activity.loader(false); self.activity.toggle(); }).catch(function (error) { console.error('[YummyAnime Notifications]', error); content.append($('<div class="yani-account__notice selector"></div>').text(deps.t('notifications_error'))); scroll.append(content); html.append(scroll.render(true)); self.activity.loader(false); self.activity.toggle(); }); }, start: function () { Lampa.Controller.add('content', {toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); }, left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); }, right: function () { Navigator.move('right'); }, up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); }, down: function () { LampaYaniNavigation.moveDown(scroll); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { scroll.destroy(); html.remove(); }};
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Notifications = window.LampaYaniNotifications = {create: create};
}(window));
