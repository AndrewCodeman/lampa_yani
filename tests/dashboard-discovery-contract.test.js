const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

['new_releases', 'top_rated', 'for_you', 'collections'].forEach((key) => {
    assert.match(ui, new RegExp(`key: '${key}'[^\\n]+group: 'discover'`));
    assert.match(ui, new RegExp(`\\['${key}', '${key}'\\]`), `${key} must keep an independent visibility setting`);
});
assert.match(ui, /item\.group === 'discover'/);
assert.match(ui, /yani-home__discover-title/);
assert.match(ui, /\.text\(t\('discover'\)\)/);
assert.match(ui, /discoverItems\.append\(button\)/);
assert.match(css, /\.yani-home__discover\s*\{[\s\S]{0,200}grid-column: span 3/);
assert.match(css, /\.yani-home__discover-items\s*\{[\s\S]{0,220}grid-template-columns: repeat\(4/);
assert.match(css, /@media \(max-width: 700px\)[\s\S]{0,500}\.yani-home__discover-items \{ grid-template-columns: repeat\(2/);

console.log('dashboard discovery contract checks passed');
