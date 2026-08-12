(function (window) {
    'use strict';

    function number(value) {
        value = Number(value);
        return isFinite(value) ? value : 0;
    }

    function listState(item) {
        return item && (item.user && item.user.list || item.user_list || item.list_state) || {};
    }

    function timestamp(item) {
        item = item || {};
        var state = listState(item);
        var nested = state.list && typeof state.list === 'object' ? state.list : {};
        var value = item.updated_at || item.date || item.created_at || state.updated_at || state.date ||
            state.created_at || nested.updated_at || nested.date || nested.created_at || 0;
        var numeric = number(value);
        if (numeric > 0) return numeric < 100000000000 ? numeric * 1000 : numeric;
        var parsed = Date.parse(value);
        return isNaN(parsed) ? 0 : parsed;
    }

    function anime(item) {
        return item && item.anime && typeof item.anime === 'object' ? item.anime : item || {};
    }

    function title(item) {
        item = anime(item);
        return String(item.title || item.name || item.russian || item.english || item.original_title || '').toLowerCase();
    }

    function year(item) {
        item = anime(item);
        return number(item.year || item.release_year || String(item.release_date || '').slice(0, 4));
    }

    function rating(item) {
        item = anime(item);
        var value = item.rating && typeof item.rating === 'object' ? item.rating.average : item.rating;
        return number(value || item.score || item.rating_score);
    }

    function progress(item) {
        item = item || {};
        var source = anime(item);
        var state = listState(item);
        var nested = state.list && typeof state.list === 'object' ? state.list : {};
        var watched = number(state.watched_episodes || state.episodes_watched || state.watched || state.progress ||
            nested.watched_episodes || nested.episodes_watched || nested.watched || nested.progress ||
            item.watched_episodes || item.episodes_watched);
        var episodes = source.episodes && typeof source.episodes === 'object' ? source.episodes : {};
        var total = number(episodes.count || episodes.total || source.episodes_count || source.episode_count);
        if (watched > 0 && watched <= 1 && total > 1) return watched;
        return total > 0 ? Math.min(1, watched / total) : watched;
    }

    function compareText(a, b) {
        try { return a.localeCompare(b); } catch (error) { return a < b ? -1 : a > b ? 1 : 0; }
    }

    function sortItems(items, key) {
        return (items || []).map(function (item, index) { return {item: item, index: index}; }).sort(function (a, b) {
            var result = 0;
            if (key === 'progress') result = progress(b.item) - progress(a.item);
            else if (key === 'rating') result = rating(b.item) - rating(a.item);
            else if (key === 'year') result = year(b.item) - year(a.item);
            else if (key === 'title') result = compareText(title(a.item), title(b.item));
            else result = timestamp(b.item) - timestamp(a.item);
            if (!result && key !== 'recent') result = timestamp(b.item) - timestamp(a.item);
            return result || a.index - b.index;
        }).map(function (entry) { return entry.item; });
    }

    function icon(key) {
        var icons = {
            recent: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2M4 5v4h4"/></svg>',
            progress: '<svg viewBox="0 0 24 24"><path d="M5 12a7 7 0 1 0 3-5.7M5 5v5h5M11 9l5 3-5 3z"/></svg>',
            rating: '<svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
            year: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 9h16M8 13h3M13 13h3M8 17h3"/></svg>',
            title: '<svg viewBox="0 0 24 24"><path d="M4 19 8 5l4 14M5.5 14h5M15 6h6l-6 12h6"/></svg>'
        };
        return icons[key] || icons.recent;
    }

    function listIcon(key) {
        var icons = {
            watching: '<svg viewBox="0 0 24 24"><path d="M3 12s3.2-6 9-6 9 6 9 6-3.2 6-9 6-9-6-9-6Z"/><circle cx="12" cy="12" r="2.7"/></svg>',
            planned: '<svg viewBox="0 0 24 24"><path d="M5 18h13a3 3 0 0 0 .4-6A6.5 6.5 0 0 0 6 10.5 3.8 3.8 0 0 0 5 18Z"/></svg>',
            completed: '<svg viewBox="0 0 24 24"><path d="M6 21V4m1 1h10l-2.3 3L17 11H7"/></svg>',
            dropped: '<svg viewBox="0 0 24 24"><path d="m4 4 16 16M10.6 6.3A9.8 9.8 0 0 1 12 6c5.8 0 9 6 9 6a15 15 0 0 1-2.1 3M7.2 7.3C4.5 9.2 3 12 3 12s3.2 6 9 6c1.1 0 2.1-.2 3-.6"/></svg>',
            favorites: '<svg viewBox="0 0 24 24"><path d="M20.5 8.8c0 5-8.5 10.2-8.5 10.2S3.5 13.8 3.5 8.8A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8.5 1.6Z"/></svg>',
            postponed: '<svg viewBox="0 0 24 24"><path d="M7 3h10M7 21h10M8 4c0 4 1.2 5.5 4 8-2.8 2.5-4 4-4 8M16 4c0 4-1.2 5.5-4 8 2.8 2.5 4 4 4 8"/></svg>'
        };
        return icons[key] || icons.watching;
    }

    function create(options) {
        options = options || {};
        var comp = options.comp;
        var object = options.object || {};
        var definition = object.definition || {};
        var storageKey = 'yani_account_list_sort_' + String(definition.key || definition.id || 'default');
        var stored = Lampa.Storage && Lampa.Storage.get ? String(Lampa.Storage.get(storageKey, 'recent') || 'recent') : 'recent';
        var valid = ['recent', 'progress', 'rating', 'year', 'title'];
        var active = valid.indexOf(object.sort) >= 0 ? object.sort : valid.indexOf(stored) >= 0 ? stored : 'recent';
        var definitions = [
            {key: 'recent', title: options.t('list_sort_recent')},
            {key: 'progress', title: options.t('list_sort_progress')},
            {key: 'rating', title: options.t('list_sort_rating')},
            {key: 'year', title: options.t('list_sort_year')},
            {key: 'title', title: options.t('list_sort_title')}
        ];
        var panel;
        var button;
        var menu;
        var lastCard = null;
        var panelFocused = false;
        var installed = false;

        function root() { return comp.render && comp.render(); }

        function cards() {
            var collection = comp.scroll && comp.scroll.render ? comp.scroll.render() : root();
            return collection && collection.find ? collection.find('.card.selector') : $();
        }

        function firstCard() {
            if (comp.items && comp.items.length && comp.items[0].render) return comp.items[0].render(true);
            var collection = cards();
            return collection.length ? collection[0] : null;
        }

        function focusedCard() {
            var focused = cards().filter('.focus').first();
            return focused.length ? focused[0] : null;
        }

        function syncNavigation() {
            if (!installed || !button || !button.length) return;
            var enabled = Lampa.Controller && Lampa.Controller.enabled ? Lampa.Controller.enabled() : null;
            var controller = enabled && enabled.controller;
            var owns = enabled && enabled.name === 'content' && controller && (controller.yaniAccountListOwner === comp || controller.link === comp);
            if (owns && button[0].offsetParent !== null) Navigator.add(button[0]);
        }

        function focusPanel() {
            var focused = focusedCard() || lastCard;
            if (focused) lastCard = focused;
            panelFocused = true;
            syncNavigation();
            Lampa.Controller.collectionFocus(button[0], root(), true);
        }

        function focusCards() {
            var target = lastCard && document.documentElement.contains(lastCard) ? lastCard : firstCard();
            panelFocused = false;
            if (target) Navigator.add(target);
            Lampa.Controller.collectionFocus(target || false, root(), true);
        }

        function isFirstCardRow(current) {
            if (!current) return false;
            var rect = current.getBoundingClientRect();
            var firstTop = rect.top;
            cards().each(function () {
                if (this === current || this.offsetParent === null) return;
                var candidate = this.getBoundingClientRect();
                if (candidate.width > 0 && candidate.height > 0) firstTop = Math.min(firstTop, candidate.top);
            });
            return rect.top <= firstTop + Math.max(18, rect.height * .35);
        }

        function closeMenu(restore) {
            if (!menu) return;
            menu.remove();
            menu = null;
            if (Lampa.Controller && Lampa.Controller.toggle) Lampa.Controller.toggle('content');
            if (restore) setTimeout(focusPanel, 0);
        }

        function choose(item) {
            var key = item && item.key;
            if (valid.indexOf(key) < 0) return;
            if (key === active) return closeMenu(true);
            if (Lampa.Storage && Lampa.Storage.set) Lampa.Storage.set(storageKey, key);
            closeMenu(false);
            options.onSelect(key);
        }

        function openMenu() {
            if (menu) return;
            if (!Lampa.Controller || !Lampa.Controller.add) {
                if (!options.showSelect) return;
                return options.showSelect({
                    title: options.t('list_sort'),
                    items: definitions.map(function (definition) {
                        return {title: definition.title, selected: definition.key === active, key: definition.key};
                    }),
                    onSelect: choose
                }, {controller: 'content', element: button[0], collection: root()});
            }

            menu = $('<div class="yani-account-sort-dialog"><div class="yani-account-sort-dialog__shade"></div><div class="yani-account-sort-dialog__sheet"></div></div>');
            var sheet = menu.find('.yani-account-sort-dialog__sheet');
            var heading = $('<div class="yani-account-sort-dialog__heading"></div>');
            heading.append($('<span class="yani-account-sort-dialog__heading-icon"></span>').html(icon(active)));
            heading.append($('<div><strong></strong><small></small></div>')
                .find('strong').text(options.t('list_sort')).end()
                .find('small').text(definition.title || object.title || '').end());
            sheet.append(heading);

            definitions.forEach(function (definition, index) {
                var row = $('<div class="yani-account-sort-dialog__option selector"></div>');
                row.attr('data-sort', definition.key).toggleClass('active', definition.key === active);
                row.append($('<span class="yani-account-sort-dialog__number"></span>').text('0' + (index + 1)));
                row.append($('<span class="yani-account-sort-dialog__option-icon"></span>').html(icon(definition.key)));
                row.append($('<span class="yani-account-sort-dialog__option-title"></span>').text(definition.title));
                row.append('<span class="yani-account-sort-dialog__check">✓</span>');
                row.on('hover:focus', function () { this.scrollIntoView({block: 'nearest'}); });
                row.on('hover:enter click.yaniAccountSort', function () { choose(definition); });
                sheet.append(row);
            });

            menu.find('.yani-account-sort-dialog__shade').on('click.yaniAccountSort', function () { closeMenu(true); });
            $('body').append(menu);
            Lampa.Controller.add('yani_account_sort', {
                toggle: function () {
                    var collection = menu && menu.find('.selector');
                    if (!collection || !collection.length) return;
                    Lampa.Controller.collectionSet(collection);
                    var selected = collection.filter('[data-sort="' + active + '"]')[0] || collection[0];
                    Lampa.Controller.collectionFocus(selected, collection);
                },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); },
                down: function () { if (Navigator.canmove('down')) Navigator.move('down'); },
                left: function () { closeMenu(true); },
                right: function () {},
                back: function () { closeMenu(true); }
            });
            Lampa.Controller.toggle('yani_account_sort');
        }

        function install(total) {
            if (installed) return;
            var view = root();
            if (!view || !view.length) return;
            installed = true;
            view.addClass('yani-account-list-view');
            var definitionKey = String(definition.key || 'watching');
            var activeDefinition = definitions.filter(function (item) { return item.key === active; })[0];
            panel = $('<div class="yani-account-list-sort-panel yani-account-list-sort-panel--' + definitionKey + '"></div>');
            button = $('<div class="yani-account-list-sort-trigger selector"></div>');
            button.append($('<span class="yani-account-list-sort-trigger__icon"></span>').html(listIcon(definitionKey)));
            var text = $('<span class="yani-account-list-sort-trigger__text"></span>');
            text.append($('<span class="yani-account-list-sort-trigger__caption"></span>').text(definition.title || object.title || ''));
            text.append($('<span class="yani-account-list-sort-trigger__value"></span>').text(options.t('list_sort') + ' · ' + activeDefinition.title));
            button.append(text);
            button.append($('<span class="yani-account-list-sort-trigger__count"></span>').text(String(total || 0)));
            button.append($('<span class="yani-account-list-sort-trigger__sort-icon"></span>').html(icon(active)));
            button.append('<span class="yani-account-list-sort-trigger__chevron">›</span>');
            button.on('hover:focus', function () { panelFocused = true; });
            button.on('hover:enter click.yaniAccountListSort', openMenu);
            panel.append(button);
            view.prepend(panel);
            if (comp.scroll && comp.scroll.minus) comp.scroll.minus(panel);
            view.off('hover:focus.yaniAccountListCard').on('hover:focus.yaniAccountListCard', '.card.selector', function () {
                panelFocused = false;
                lastCard = this;
            });
            setTimeout(syncNavigation, 0);
        }

        function patchController(controller) {
            if (!controller || controller.yaniAccountListOwner === comp) return;
            var originalLeft = controller.left;
            var originalRight = controller.right;
            var originalUp = controller.up;
            var originalDown = controller.down;
            controller.yaniAccountListOwner = comp;
            controller.left = function () {
                if (panelFocused) return;
                if (originalLeft) originalLeft();
            };
            controller.right = function () {
                if (panelFocused) return;
                if (originalRight) originalRight();
            };
            controller.up = function () {
                if (panelFocused) return Lampa.Controller.toggle('head');
                var current = focusedCard() || lastCard;
                if (current && isFirstCardRow(current)) return focusPanel();
                if (originalUp) originalUp();
            };
            controller.down = function () {
                if (panelFocused) return focusCards();
                if (originalDown) originalDown();
            };
        }

        if (comp.on) {
            comp.on('controller', patchController);
            comp.on('toggle', function () { setTimeout(syncNavigation, 0); });
            comp.on('scroll', function () { setTimeout(syncNavigation, 0); });
        }
        var originalStart = comp.start;
        comp.start = function () {
            var result = originalStart.apply(this, arguments);
            var enabled = Lampa.Controller && Lampa.Controller.enabled ? Lampa.Controller.enabled() : null;
            if (enabled && enabled.name === 'content') patchController(enabled.controller);
            syncNavigation();
            return result;
        };

        return {
            active: function () { return active; },
            sort: function (items) { return sortItems(items, active); },
            install: install,
            destroy: function () { closeMenu(false); }
        };
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.AccountListControls = window.LampaYaniAccountListControls = {
        create: create,
        sortItems: sortItems,
        timestamp: timestamp,
        progress: progress
    };
}(window));
