const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');

const root = __dirname;
const modules = ['src/config.js', 'src/i18n.js', 'src/auth.js', 'src/api.js', 'src/catalog.js', 'src/ui-utils.js', 'src/ui-media.js', 'src/ui-navigation.js', 'src/ui-schedule.js', 'src/ui-notifications.js', 'src/ui-auth.js', 'src/ui-status.js', 'src/ui.js'];
modules.forEach((file) => execFileSync(process.execPath, ['--check', path.join(root, file)], {stdio: 'inherit'}));
const body = modules.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

const output = `function pluginYummyAnime() {
    if (window.plugin_yummy_anime_ready) return;
    window.plugin_yummy_anime_ready = true;

    var style = document.createElement('style');
    style.textContent = ${JSON.stringify(css)};
    document.head.appendChild(style);

${body}
    if (window.Lampa && Lampa.Manifest && window.LampaYaniConfig) {
        Lampa.Manifest.plugins = {
            type: 'other',
            version: LampaYaniConfig.version,
            name: 'YummyAnime',
            description: 'YummyAnime catalog, ratings, lists and account integration',
            component: 'yani_home'
        };
    }
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
