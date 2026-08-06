function pluginYummyAnime() {
    'use strict';

    if (window.plugin_yummy_anime_ready) return;
    window.plugin_yummy_anime_ready = true;

    var scripts = [
        'src/config.js',
        'src/auth.js',
        'src/api.js',
        'src/catalog.js',
        'src/ui.js'
    ];
    var current = document.currentScript;
    var base = current && current.src ? current.src.substring(0, current.src.lastIndexOf('/') + 1) :
        'https://raw.githubusercontent.com/AndrewCodeman/lampa_yani/main/';

    function load(i) {
        if (i >= scripts.length) {
            var init = function () {
                try {
                    window.LampaYani.register();
                } catch (error) {
                    console.error('[YummyAnime] Plugin initialization failed', error);
                    if (window.Lampa && Lampa.Noty && Lampa.Noty.show) {
                        Lampa.Noty.show('YummyAnime: ' + (error.message || error));
                    }
                }
            };
            if (window.appready) init();
            else if (window.Lampa && Lampa.Listener && Lampa.Listener.follow) {
                Lampa.Listener.follow('app', function (event) {
                    if (event.type === 'ready') init();
                });
            }
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
}

if (!window.plugin_yummy_anime_ready) pluginYummyAnime();
