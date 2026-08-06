(function () {
    'use strict';

    var scripts = [
        'src/config.js',
        'src/api.js',
        'src/catalog.js',
        'src/ui.js'
    ];
    var current = document.currentScript;
    var base = current && current.src ? current.src.substring(0, current.src.lastIndexOf('/') + 1) : '';

    function load(i) {
        if (i >= scripts.length) {
            window.LampaYani.register();
            return;
        }

        var tag = document.createElement('script');
        tag.src = base + scripts[i];
        tag.onload = function () { load(i + 1); };
        tag.onerror = function () { console.error('[Lampa Yani] Failed to load ' + scripts[i]); };
        document.head.appendChild(tag);
    }

    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = base + 'style.css';
    document.head.appendChild(style);

    load(0);
}());
