(function (window) {
    'use strict';
    function create(object, deps) {
        var html = $('<div class="yani-player"></div>'), iframe = $('<iframe class="yani-player__iframe" frameborder="0" allowfullscreen></iframe>');
        return {create: function () { iframe.attr('src', deps.sourceUrl(object)).attr('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; payment').on('load', function () { if (iframe[0] && iframe[0].focus) iframe[0].focus(); }); html.append(iframe); this.activity.loader(false); this.activity.toggle(); }, start: function () { Lampa.Controller.add('content', {toggle: function () { iframe.attr('tabindex', '0'); if (iframe[0] && iframe[0].focus) iframe[0].focus(); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { iframe.attr('src', 'about:blank'); iframe.remove(); html.remove(); }};
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Player = window.LampaYaniPlayer = {create: create};
}(window));
