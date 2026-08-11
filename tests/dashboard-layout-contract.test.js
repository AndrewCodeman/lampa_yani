const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

['catalog', 'genres', 'search'].forEach((key) => {
    assert.match(ui, new RegExp(`key: '${key}'[^\\n]+group: 'explore'`));
});
['schedule', 'new_translations'].forEach((key) => {
    assert.match(ui, new RegExp(`key: '${key}'[^\\n]+group: 'episode_flow'`));
});
['continue_watching', 'user_lists', 'updates'].forEach((key) => {
    assert.match(ui, new RegExp(`key: '${key}'[^\\n]+group: 'library'`));
});
['notifications', 'account', 'status'].forEach((key) => {
    assert.match(ui, new RegExp(`key: '${key}'[^\\n]+group: 'service'`));
});

assert.match(ui, /yani-home__intro-title/);
assert.match(ui, /yani-home__panel--active/);
assert.match(ui, /hover:enter click\.yaniHome/);
assert.match(ui, /last && document\.documentElement\.contains\(last\)/);
assert.match(css, /\.yani-home__panel--explore\s*\{[\s\S]{0,100}grid-column: span 12/);
assert.match(css, /\.yani-home__episode-flow\s*\{[\s\S]{0,180}grid-column: span 8/);
assert.match(css, /\.yani-home__panel--library\s*\{[\s\S]{0,100}grid-column: span 4/);
assert.match(css, /\.yani-home__panel--service \.yani-home__panel-items\s*\{[\s\S]{0,120}repeat\(3/);

console.log('dashboard layout contract checks passed');
