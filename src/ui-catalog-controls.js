(function (window) {
    'use strict';

    function catalogSortIcon(key) {
        var icons = {
            top: '<svg viewBox="0 0 24 24"><path d="M8 4h8v3c0 4-1.5 6-4 7-2.5-1-4-3-4-7V4zM8 6H4v2c0 2.2 1.6 4 4.1 4.5M16 6h4v2c0 2.2-1.6 4-4.1 4.5M12 14v4M8 20h8"/></svg>',
            new: '<svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4M16 3v4M5 9h14"/></svg>',
            rating: '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
            votes: '<svg viewBox="0 0 24 24"><path d="M7 11a3 3 0 100-6 3 3 0 000 6zm10 0a3 3 0 100-6 3 3 0 000 6zM2 20c0-4 2-6 5-6s5 2 5 6m0 0c0-4 2-6 5-6s5 2 5 6"/></svg>',
            views: '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z"/></svg>',
            title: '<svg viewBox="0 0 24 24"><path d="M4 19l4-14 4 14M5.5 14h5M15 6h6l-6 12h6"/></svg>',
            random: '<svg viewBox="0 0 24 24"><path d="M4 7h3c5 0 5 10 10 10h3M17 4l3 3-3 3M4 17h3c2.5 0 3.7-2.5 5-5M17 14l3 3-3 3"/></svg>'
        };
        return icons[key] || icons.top;
    }

    function topTypeIcon(key) {
        var icons = {
            all: '<svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.9-5.4 2.9 1-6-4.3-4.2 6-.9z"/></svg>',
            tv: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="m8 3 4 3 4-3M9 22h6"/></svg>',
            movie: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 10h18M7 5l3 5M14 5l3 5"/></svg>',
            ona: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4zM4 12h2M18 12h2"/></svg>'
        };
        return icons[key] || icons.all;
    }

    function create(options) {
        options = options || {};
        var comp = options.comp;
        var object = options.object || {};
        var baseParams = options.baseParams || {};
        var topMode = Boolean(options.topMode);
        var t = options.t;
        var copyParams = options.copyParams;
        var showSelect = options.showSelect;
        var navigationSnapshot = options.navigationSnapshot;
        var filterModel = options.filterModel;
        var toolbar;
        var toolbarTrack;
        var topButton;
        var filterButton;
        var controlsReady = false;
        var toolbarFocused = false;
        var lastCatalogCard = null;
        var sortDefinitions = [
            {key: 'top', sort: 'top', forward: false, title: t('catalog_sort_top')},
            {key: 'new', sort: 'year', forward: false, title: t('catalog_sort_new')},
            {key: 'rating', sort: 'rating', forward: false, title: t('catalog_sort_rating')},
            {key: 'votes', sort: 'rating_counters', forward: false, title: t('catalog_sort_votes')},
            {key: 'views', sort: 'views', forward: false, title: t('catalog_sort_views')},
            {key: 'title', sort: 'title', forward: true, title: t('catalog_sort_title')},
            {key: 'random', sort: 'random', forward: false, title: t('catalog_sort_random')}
        ];
        var topDefinitions = [
            {key: 'all', types: '', title: t('top_all')},
            {key: 'tv', types: 'tv', title: t('top_tv')},
            {key: 'movie', types: 'movie', title: t('top_movies')},
            {key: 'ona', types: 'ona', title: t('top_ona')}
        ];
        var controlDefinitions = topMode ? topDefinitions : sortDefinitions;

        function activeSort(definition) {
            if (topMode) return String(baseParams.types || '') === definition.types;
            return definition.sort === baseParams.sort && definition.forward === baseParams.sort_forward;
        }

        function cleanCatalogRoute() {
            return String(object.url || 'yani/catalog').replace(/\/(?:sort|filter)\/[^/]+/g, '');
        }

        function changeSort(definition) {
            if (activeSort(definition) && definition.key !== 'random') return;
            var params = copyParams(baseParams);
            params.offset = 0;
            if (topMode) {
                params.sort = 'top';
                params.sort_forward = true;
                params.from_year = 1900;
                if (definition.types) params.types = definition.types;
                else delete params.types;
                var topRoute = String(object.url || 'yani/top').replace(/\/type\/[^/]+$/, '');
                Lampa.Activity.replace({
                    url: topRoute + '/type/' + definition.key,
                    title: object.title || ('YummyAnime ' + t('top_rated')),
                    component: 'yani_top',
                    topMode: true,
                    params: params
                });
                return;
            }
            params.sort = definition.sort;
            params.sort_forward = definition.forward;
            Lampa.Activity.replace({
                url: cleanCatalogRoute() + '/sort/' + definition.key,
                title: object.title || ('YummyAnime ' + t('catalog')),
                component: 'yani_catalog',
                params: params
            });
        }

        function replaceWithFilters(params) {
            Lampa.Activity.replace({
                url: cleanCatalogRoute() + '/filter/' + filterModel.signature(params),
                title: object.title || ('YummyAnime ' + t('catalog')),
                component: 'yani_catalog',
                params: params
            });
        }

        function openFilterValues(field, navigation) {
            showSelect({
                title: field.title,
                items: field.values.map(function (item) {
                    var isSelected = filterModel.selected(field, baseParams).key === item.key;
                    return {title: item.title, value: item.value, subtitle: isSelected ? '✓' : '', selected: isSelected};
                }),
                onSelect: function (item) {
                    replaceWithFilters(filterModel.apply(baseParams, field, item.value));
                },
                onBack: function () {
                    setTimeout(function () { openFilterMenu(navigation); }, 0);
                }
            }, navigation);
        }

        function openFilterMenu(navigation) {
            navigation = navigation || navigationSnapshot();
            var fields = filterModel.definitions(t, new Date().getFullYear());
            var items = fields.map(function (field) {
                var current = filterModel.selected(field, baseParams);
                return {title: field.title, subtitle: current.title, field: field};
            });
            if (filterModel.activeCount(baseParams)) items.unshift({title: t('catalog_filter_reset'), reset: true});
            showSelect({
                title: t('catalog_filters'),
                items: items,
                onSelect: function (item) {
                    if (item.reset) return replaceWithFilters(filterModel.clear(baseParams));
                    openFilterValues(item.field, navigation);
                }
            }, navigation);
        }

        function firstCard() {
            if (comp.items && comp.items.length && comp.items[0].render) return comp.items[0].render(true);
            var collection = comp.scroll && comp.scroll.render ? comp.scroll.render() : comp.render();
            return collection && collection.find ? collection.find('.card.selector, .selector').first()[0] : null;
        }

        function navigationCollection() {
            var root = comp.render();
            return root && root.length ? root : (comp.scroll && comp.scroll.render ? comp.scroll.render() : comp.render());
        }

        function syncNavigationCollection() {
            if (!controlsReady) return;
            var enabled = Lampa.Controller && Lampa.Controller.enabled ? Lampa.Controller.enabled() : null;
            var controller = enabled && enabled.controller;
            var ownsController = enabled && enabled.name === 'content' && controller &&
                (controller.yaniCatalogOwner === comp || controller.link === comp);
            if (!ownsController) return;
            var selectors = toolbarTrack && toolbarTrack[0] ? Array.prototype.slice.call(toolbarTrack[0].querySelectorAll('.selector')).filter(function (element) {
                return element.offsetParent !== null;
            }) : [];
            selectors.forEach(function (element) { Navigator.add(element); });
        }

        function focusCards(first) {
            var collection = navigationCollection();
            var target = first ? firstCard() : lastCatalogCard || comp.last || firstCard();
            if (target && !document.documentElement.contains(target)) target = firstCard();
            toolbarFocused = false;
            if (target) {
                lastCatalogCard = target;
                comp.last = target;
                Navigator.add(target);
            }
            if (first) Lampa.Controller.collectionSet(collection, false, true);
            else syncNavigationCollection();
            Lampa.Controller.collectionFocus(target || false, collection, true);
        }

        function focusToolbar(preferred) {
            if (!toolbarTrack || !toolbarTrack.length) return;
            var focusedCard = comp.scroll && comp.scroll.render ? comp.scroll.render().find('.selector.focus').first() : null;
            if (focusedCard && focusedCard.length) {
                lastCatalogCard = focusedCard[0];
                comp.last = focusedCard[0];
            }
            var target = preferred && preferred.length ? preferred : toolbarTrack.find('.yani-catalog-sort--active').first();
            if (!target.length) target = toolbarTrack.find('.selector').first();
            var collection = navigationCollection();
            toolbarFocused = true;
            syncNavigationCollection();
            Lampa.Controller.collectionFocus(target, collection, true);
        }

        function toolbarHasFocus() {
            return toolbarFocused || Boolean(toolbar && toolbar.find('.selector.focus, .focus.selector').length);
        }

        function focusedCatalogCard() {
            var collection = comp.scroll && comp.scroll.render ? comp.scroll.render() : comp.render();
            var focused = collection && collection.find ? collection.find('.card.selector.focus, .selector.focus').first() : null;
            return focused && focused.length ? focused : $();
        }

        function toolbarTargetForCard(card) {
            if (!toolbarTrack || !toolbarTrack.length || !card || !card.length) return topButton;
            var cardRect = card[0].getBoundingClientRect();
            var cardCenter = cardRect.top + cardRect.height / 2;
            var target = topButton;
            var distance = Infinity;
            toolbarTrack.find('.selector').each(function () {
                if (this.offsetParent === null) return;
                var rect = this.getBoundingClientRect();
                var currentDistance = Math.abs((rect.top + rect.height / 2) - cardCenter);
                if (currentDistance < distance) {
                    distance = currentDistance;
                    target = $(this);
                }
            });
            return target;
        }

        function shouldEnterToolbarOnRight() {
            if (!toolbar || !toolbar.length || window.innerWidth <= 700) return false;
            var collection = comp.scroll && comp.scroll.render ? comp.scroll.render() : comp.render();
            var focused = focusedCatalogCard();
            if (!focused || !focused.length) return !Navigator.canmove('right');
            var currentRect = focused[0].getBoundingClientRect();
            var toolbarRect = toolbar[0].getBoundingClientRect();
            var currentCenter = currentRect.top + currentRect.height / 2;
            var rightmostVisible = focused[0];
            var rightmostLeft = currentRect.left;
            collection.find('.card.selector').each(function () {
                if (this.offsetParent === null) return;
                var rect = this.getBoundingClientRect();
                var sameRow = Math.abs((rect.top + rect.height / 2) - currentCenter) < Math.max(20, currentRect.height * 0.45);
                var visibleBeforeToolbar = rect.left + rect.width / 2 < toolbarRect.left;
                if (sameRow && visibleBeforeToolbar && rect.left > rightmostLeft) {
                    rightmostLeft = rect.left;
                    rightmostVisible = this;
                }
            });
            return rightmostVisible === focused[0] || currentRect.right >= toolbarRect.left - 8;
        }

        function scrollToTop() {
            if (comp.scroll && comp.scroll.reset) comp.scroll.reset();
            else if (comp.scroll && comp.scroll.render) comp.scroll.render(true).scrollTop = 0;
            focusCards(true);
        }

        function install() {
            if (controlsReady) return;
            var root = comp.render();
            if (!root || !root.length) return;
            controlsReady = true;
            root.addClass('yani-catalog-view');
            toolbar = $('<div class="yani-catalog-toolbar"></div>');
            toolbarTrack = $('<div class="yani-catalog-toolbar__track"></div>');
            topButton = $('<div class="yani-catalog-top selector" aria-label="' + t('scroll_to_top') + '"></div>');
            topButton.append('<span class="yani-catalog-top__icon">↑</span>');
            topButton.append($('<span class="yani-catalog-top__title"></span>').text(t('scroll_to_top')));
            topButton.on('hover:focus', function () { toolbarFocused = true; });
            topButton.on('hover:enter click.yaniCatalogTop', scrollToTop);
            toolbarTrack.append(topButton);
            if (!topMode) {
                var activeFilters = filterModel.activeCount(baseParams);
                filterButton = $('<div class="yani-catalog-sort yani-catalog-filter selector"></div>');
                filterButton.toggleClass('yani-catalog-sort--active', activeFilters > 0);
                filterButton.append($('<span class="yani-catalog-sort__icon"></span>').html('<svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>'));
                if (activeFilters) filterButton.append($('<span class="yani-catalog-filter__count"></span>').text(activeFilters));
                filterButton.append($('<span class="yani-catalog-sort__title"></span>').text(t('catalog_filters')));
                filterButton.on('hover:focus', function () { toolbarFocused = true; });
                filterButton.on('hover:enter click.yaniCatalogFilter', function () { openFilterMenu(); });
                toolbarTrack.append(filterButton);
            }
            controlDefinitions.forEach(function (definition) {
                var button = $('<div class="yani-catalog-sort selector"></div>');
                button.toggleClass('yani-catalog-sort--active', activeSort(definition));
                button.append($('<span class="yani-catalog-sort__icon"></span>').html(topMode ? topTypeIcon(definition.key) : catalogSortIcon(definition.key)));
                button.append($('<span class="yani-catalog-sort__title"></span>').text(definition.title));
                button.on('hover:focus', function () {
                    toolbarFocused = true;
                    toolbarTrack[0].scrollLeft = Math.max(0, button[0].offsetLeft - toolbarTrack[0].clientWidth / 3);
                });
                button.on('hover:enter click.yaniCatalogSort', function () { changeSort(definition); });
                toolbarTrack.append(button);
            });
            toolbar.append(toolbarTrack);
            root.prepend(toolbar);
            if (window.innerWidth <= 700 && comp.scroll && comp.scroll.minus) comp.scroll.minus(toolbar);
            setTimeout(syncNavigationCollection, 0);
        }

        function patchCatalogController(controller) {
            if (!controller || controller.yaniCatalogOwner === comp) return;
            var originalLeft = controller.left;
            var originalRight = controller.right;
            var originalUp = controller.up;
            var originalDown = controller.down;
            controller.yaniCatalogOwner = comp;
            controller.left = function () {
                if (toolbarHasFocus()) return focusCards(false);
                if (originalLeft) originalLeft();
            };
            controller.right = function () {
                if (toolbarHasFocus()) return;
                var focusedCard = focusedCatalogCard();
                if (shouldEnterToolbarOnRight() && topButton) return focusToolbar(toolbarTargetForCard(focusedCard));
                if (Navigator.canmove('right')) return Navigator.move('right');
                if (topButton) return focusToolbar(toolbarTargetForCard(focusedCard));
                if (originalRight) originalRight();
            };
            controller.up = function () {
                if (toolbarHasFocus()) {
                    if (Navigator.canmove('up')) return Navigator.move('up');
                    return Lampa.Controller.toggle('head');
                }
                if (Navigator.canmove('up')) return Navigator.move('up');
                Lampa.Controller.toggle('head');
            };
            controller.down = function () {
                if (toolbarHasFocus()) {
                    if (Navigator.canmove('down')) return Navigator.move('down');
                    return;
                }
                if (Navigator.canmove('down')) return Navigator.move('down');
                if (originalDown) originalDown();
            };
        }

        if (comp.on) {
            comp.on('toggle', function () { setTimeout(syncNavigationCollection, 0); });
            comp.on('scroll', function () { setTimeout(syncNavigationCollection, 0); });
            comp.on('controller', patchCatalogController);
        }

        var originalStart = comp.start;
        comp.start = function () {
            var result = originalStart.apply(this, arguments);
            var enabled = Lampa.Controller && Lampa.Controller.enabled ? Lampa.Controller.enabled() : null;
            if (enabled && enabled.name === 'content') patchCatalogController(enabled.controller);
            syncNavigationCollection();
            return result;
        };

        return {install: install, sync: syncNavigationCollection};
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.CatalogControls = window.LampaYaniCatalogControls = {
        create: create,
        catalogSortIcon: catalogSortIcon,
        topTypeIcon: topTypeIcon
    };
}(window));
