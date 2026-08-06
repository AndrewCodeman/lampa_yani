const fs = require('fs');
const path = require('path');

const root = __dirname;
const modules = ['src/config.js', 'src/auth.js', 'src/api.js', 'src/catalog.js', 'src/ui.js'];
const body = modules.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

const output = `function pluginYummyAnime() {
    if (window.plugin_yummy_anime_ready) return;
    window.plugin_yummy_anime_ready = true;

    var style = document.createElement('style');
    style.textContent = ${JSON.stringify(css)};
    document.head.appendChild(style);

${body}
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
}

if (!window.plugin_yummy_anime_ready) pluginYummyAnime();
`;

fs.mkdirSync(path.join(root, 'dist'), {recursive: true});
fs.writeFileSync(path.join(root, 'dist', 'index.js'), output);
console.log('Built dist/index.js');
