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
            if (state) state.last = event.target;
            if (scroll) scroll.update($(event.target), true);
        });
        return element;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Navigation = window.LampaYaniNavigation = {moveDown: moveDown, moveUp: moveUp, bindFocus: bindFocus};
}(window));
