const fs = require('fs');
const path = require('path');

const root = __dirname;
const modules = ['src/config.js', 'src/auth.js', 'src/api.js', 'src/catalog.js', 'src/ui.js'];
const body = modules.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

const output = `function startPlugin() {
    if (window.lampa_yani_started) return;
    window.lampa_yani_started = true;

    var style = document.createElement('style');
    style.textContent = ${JSON.stringify(css)};
    document.head.appendChild(style);

${body}
    window.LampaYani.register();
}
`;

fs.mkdirSync(path.join(root, 'dist'), {recursive: true});
fs.writeFileSync(path.join(root, 'dist', 'index.js'), output);
console.log('Built dist/index.js');
