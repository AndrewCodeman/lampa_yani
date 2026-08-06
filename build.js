const fs = require('fs');
const path = require('path');

const root = __dirname;
const modules = ['src/config.js', 'src/auth.js', 'src/api.js', 'src/catalog.js', 'src/ui.js'];
const body = modules.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

const output = `function pluginYummyAnime() {
    if (window.plugin_yummy_anime_ready) return;
    window.plugin_yummy_anime_ready = true;

    if (window.Lampa && Lampa.Manifest) {
        Lampa.Manifest.plugins = {
            type: 'other',
            version: '0.2.0',
            name: 'YummyAnime',
            description: 'YummyAnime catalog, ratings, lists and account integration',
            component: 'yani_home'
        };
    }

    var style = document.createElement('style');
    style.textContent = ${JSON.stringify(css)};
    document.head.appendChild(style);

${body}
    try {
        window.LampaYani.register();
    } catch (error) {
        console.error('[YummyAnime] Plugin initialization failed', error);
    }
}

if (!window.plugin_yummy_anime_ready) pluginYummyAnime();
`;

fs.mkdirSync(path.join(root, 'dist'), {recursive: true});
fs.writeFileSync(path.join(root, 'dist', 'index.js'), output);
console.log('Built dist/index.js');
