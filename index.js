(function () {
    'use strict';

    var scripts = [
        'src/config.js',
        'src/api.js',
        'src/catalog.js',
        'src/ui.js'
    ];

    function load(i) {
        if (i >= scripts.length) {
            window.LampaYani.register();
            return;
        }

        var tag = document.createElement('script');
        tag.src = scripts[i];
        tag.onload = function () { load(i + 1); };
        tag.onerror = function () { console.error('[Lampa Yani] Failed to load ' + scripts[i]); };
        document.head.appendChild(tag);
    }

    load(0);
}());
