function pluginYummyAnimeSmoke() {
    if (window.plugin_yummy_anime_smoke_ready) return;
    window.plugin_yummy_anime_smoke_ready = true;

    function init() {
        try {
            Lampa.Menu.addButton(
                '<svg viewBox="0 0 20 20"><path fill="currentColor" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 3 2 4 4 .6-3 3 .7 4.4-3.7-2-3.7 2 .7-4.4-3-3L8 8l2-4Z"/></svg>',
                'YummyAnime Test',
                function () {
                    Lampa.Noty.show('YummyAnime smoke test работает');
                }
            );

            Lampa.Noty.show('YummyAnime smoke test загружен');
        } catch (error) {
            if (window.Lampa && Lampa.Noty) Lampa.Noty.show('YummyAnime smoke error: ' + error.message);
        }
    }

    if (window.appready) init();
    else {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') init();
        });
    }
}

if (!window.plugin_yummy_anime_smoke_ready) pluginYummyAnimeSmoke();
