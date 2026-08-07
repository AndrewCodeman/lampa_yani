(function (window) {
    'use strict';

    function moveDown(scroll) {
        if (Navigator.canmove('down')) Navigator.move('down');
        else if (scroll && scroll.wheel) scroll.wheel(250);
    }

    function moveUp(scroll) {
        if (Navigator.canmove('up')) Navigator.move('up');
        else if (scroll && scroll.wheel) scroll.wheel(-250);
    }

    function bindFocus(element, scroll, state) {
        element.on('hover:focus', function (event) {
            // `target` can be an icon or a text node inside a selector.  Lampa
            // Scroll must receive the selector itself, otherwise the focus can
            // travel below the viewport without moving the visible area.
            var target = event.currentTarget || event.target;
            if (state) state.last = target;
            if (scroll) scroll.update($(target), true);
        });
        return element;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Navigation = window.LampaYaniNavigation = {moveDown: moveDown, moveUp: moveUp, bindFocus: bindFocus};
}(window));
