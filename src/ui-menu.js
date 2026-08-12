(function (window) {
    'use strict';

    // Lampa's menu editor stores labels in menu_sort / menu_hide and later
    // finds items with jQuery :contains(), which also matches "YummyAnime"
    // when the saved name is "Anime". Plugin items added after Menu.init
    // are also easy to miss on devices without MutationObserver, or when
    // Menu.addButton is missing. Restore by exact label and insert the
    // button ourselves, the same way IPTV does.

    var ACTION = 'yummyanime';
    var TITLE = 'YummyAnime';
    var ICON = '<svg viewBox="0 0 20 20"><path fill="currentColor" d="M18.45 0H1.55A1.55 1.55 0 000 1.55v16.9A1.54 1.54 0 001.55 20h16.9A1.55 1.55 0 0020 18.45V1.55A1.54 1.54 0 0018.45 0Zm-2.83 5.93-2.1 2.66-2.3-5.43a6.95 6.95 0 014.4 2.77Zm-2.9 6.57h-4l2.03-4.8 1.98 4.8Zm-2.37-9.34L7.8 9.06 4.87 5.33c.64-.7 1.4-1.26 2.27-1.65a8.18 8.18 0 013.2-.52ZM3.57 7.39l3.2 4.06-1.56 3.58A6.96 6.96 0 013.57 7.39Zm6.57 9.56c-1.05.01-2.1-.2-3.05-.65l.76-1.8h5.7l.49 1.15a6.93 6.93 0 01-3.9 1.3Zm6.8-7.07a7.8 7.8 0 01-1.17 4L14.55 11l2.17-2.77c.14.54.21 1.1.23 1.65Z"/></svg>';

    function asList(value) {
        if (Object.prototype.toString.call(value) === '[object Array]') {
            return value.map(function (item) { return String(item || '').trim(); }).filter(Boolean);
        }
        if (typeof value === 'string') {
            var trimmed = value.trim();
            if (!trimmed) return [];
            try { return asList(JSON.parse(trimmed)); } catch (error) { return trimmed ? [trimmed] : []; }
        }
        return [];
    }

    function ensureListed(list, title) {
        var next = asList(list).slice();
        if (next.indexOf(title) === -1) next.push(title);
        return next;
    }

    function isHidden(hide, title) {
        return asList(hide).indexOf(title) !== -1;
    }

    function insertBeforeTitle(sort, presentTitles, title) {
        var order = asList(sort);
        var present = asList(presentTitles);
        var index = order.indexOf(title);
        if (index === -1) return '';
        for (var i = index + 1; i < order.length; i++) {
            if (order[i] !== title && present.indexOf(order[i]) !== -1) return order[i];
        }
        return '';
    }

    function itemLabel(node, $) {
        return $(node).find('.menu__text').first().text().trim();
    }

    function create(deps) {
        deps = deps || {};
        var $ = deps.$ || window.$;
        var Storage = deps.Storage || (window.Lampa && Lampa.Storage);
        var Menu = deps.Menu || (window.Lampa && Lampa.Menu);
        var Activity = deps.Activity || (window.Lampa && Lampa.Activity);
        var icon = deps.icon || ICON;
        var title = deps.title || TITLE;
        var action = deps.action || ACTION;
        var restoreDelay = deps.restoreDelay == null ? 600 : Number(deps.restoreDelay);
        var maxAttempts = deps.maxAttempts == null ? 10 : Number(deps.maxAttempts);
        var wait = deps.setTimeout || function (fn, ms) { return window.setTimeout(fn, ms); };
        var cancel = deps.clearTimeout || function (id) { return window.clearTimeout(id); };
        var onEnter = deps.onEnter || function () {
            if (Activity && Activity.push) {
                Activity.push({
                    url: 'yani',
                    title: title,
                    component: 'yani_home'
                });
            }
        };
        var added = false;
        var started = false;
        var item = null;
        var restoreTimer = 0;
        var attempts = 0;

        function emptySet() {
            return $ && typeof $ === 'function' ? $() : {length: 0};
        }

        function listRoot() {
            if (typeof deps.listRoot === 'function') return deps.listRoot();
            if (!$ || typeof $ !== 'function' || !$.fn) return emptySet();
            return $('.menu .menu__list').eq(0);
        }

        function existing() {
            if (!$ || typeof $ !== 'function' || !$.fn) return emptySet();
            var found = $('.menu__item[data-action="' + action + '"]');
            if (found.length) return found;
            $('.menu .menu__list .menu__item').each(function () {
                if (itemLabel(this, $) === title) found = found.add(this);
            });
            return found;
        }

        function presentTitles(list) {
            var names = [];
            list.children('.menu__item').each(function () {
                names.push(itemLabel(this, $));
            });
            return names;
        }

        function restore(target) {
            target = target || item;
            if (!target || !target.length || !Storage || !Storage.get) return;
            var list = target.parent();
            if (!list || !list.length) return;
            var stored = asList(Storage.get('menu_sort', '[]'));
            var sort = ensureListed(stored, title);
            if (stored.indexOf(title) === -1 && Storage.set) Storage.set('menu_sort', sort);
            var hide = asList(Storage.get('menu_hide', '[]'));
            var before = insertBeforeTitle(sort, presentTitles(list), title);
            if (before) {
                list.children('.menu__item').each(function () {
                    if (itemLabel(this, $) === before) {
                        target.insertBefore(this);
                        return false;
                    }
                });
            } else {
                list.append(target);
            }
            target.toggleClass('hidden', isHidden(hide, title));
        }

        function scheduleRestore(target) {
            restore(target);
            if (!restoreDelay) return;
            if (restoreTimer) cancel(restoreTimer);
            restoreTimer = wait(function () { restore(target); }, restoreDelay);
        }

        function buildItem() {
            var node = $('<li class="menu__item selector" data-action="' + action + '"><div class="menu__ico">' + icon + '</div><div class="menu__text">' + title + '</div></li>');
            node.on('hover:enter', onEnter);
            return node;
        }

        function add() {
            if (added) {
                scheduleRestore(item);
                return true;
            }
            var found = existing();
            if (found && found.length) {
                item = found.eq(0);
                if (item.attr) item.attr('data-action', action);
                found.slice(1).remove();
                added = true;
                scheduleRestore(item);
                return true;
            }
            var list = listRoot();
            var canAddElement = Menu && typeof Menu.addElement === 'function';
            var canAddButton = Menu && typeof Menu.addButton === 'function';
            if (!canAddElement && !(list && list.length) && !canAddButton) return false;

            item = buildItem();
            if (canAddElement) Menu.addElement(item);
            else if (list && list.length) list.append(item);
            else {
                item = Menu.addButton(icon, title, onEnter);
                if (item && item.attr) item.attr('data-action', action);
            }
            if (!item || !item.length) return false;
            if ((!item.parent || !item.parent().length) && list && list.length) list.append(item);
            if (!item.parent || !item.parent().length) return false;
            added = true;
            scheduleRestore(item);
            return true;
        }

        function retry() {
            if (add() || attempts >= maxAttempts) return;
            attempts += 1;
            wait(retry, attempts < 5 ? 250 : 1000);
        }

        function start(listener) {
            if (started) {
                add();
                return;
            }
            started = true;
            add();
            if (!added) retry();
            if (listener && typeof listener.follow === 'function') {
                listener.follow('app', function (event) {
                    if (event && event.type === 'ready') add();
                });
                listener.follow('menu', function (event) {
                    if (event && (event.type === 'start' || event.type === 'end')) add();
                });
            }
        }

        return {
            ACTION: action,
            TITLE: title,
            add: add,
            restore: restore,
            start: start,
            added: function () { return added; }
        };
    }

    window.LampaYaniMenu = {
        ACTION: ACTION,
        TITLE: TITLE,
        ICON: ICON,
        asList: asList,
        ensureListed: ensureListed,
        isHidden: isHidden,
        insertBeforeTitle: insertBeforeTitle,
        create: create
    };
})(window);
