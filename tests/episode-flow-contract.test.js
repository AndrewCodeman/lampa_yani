const assert = require('assert');
const fs = require('fs');

const api = fs.readFileSync('src/api.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(api, /feed: function \(\)/);
assert.match(api, /request\('\/feed'/);
assert.match(ui, /component: 'yani_schedule'/);
assert.match(ui, /component: 'yani_new_translations'/);
assert.match(ui, /key: 'search'/);
assert.match(ui, /group: 'episode_flow'/);
assert.ok(ui.indexOf("key: 'search'") < ui.indexOf("key: 'schedule'"), 'Search must remain before the episode flow');
assert.match(ui, /response\.new_videos/);
assert.match(ui, /video\.dub_title/);
assert.match(ui, /yani_update_label/);
assert.match(ui, /item\.poster\.big/);
assert.match(ui, /item\.poster\.mega/);
assert.match(css, /\.yani-home__episode-flow/);
assert.match(css, /\.yani-home__episode-flow-items/);
assert.match(css, /@keyframes yani-home-flow-pulse/);
assert.match(css, /\.yani-card-update[^}]*text-overflow: ellipsis/);

console.log('episode flow contract checks passed');
