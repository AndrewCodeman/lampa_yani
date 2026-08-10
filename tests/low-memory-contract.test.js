const assert = require('assert');
const fs = require('fs');

const media = fs.readFileSync('src/ui-media.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const api = fs.readFileSync('src/api.js', 'utf8');
const build = fs.readFileSync('build.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.doesNotMatch(media, /new Image\s*\(/, 'catalog cards must not decode a duplicate hidden poster');
assert.match(media, /var maxActive = 2;/, 'fallback poster requests must be concurrency-limited');
assert.match(media, /return values\.slice\(0, 2\);/, 'fallback poster aliases must be bounded');
assert.match(media, /loading', 'lazy'/, 'poster images should be lazy-loaded');
assert.match(api, /var pendingRequests = \{\};/, 'identical in-flight API requests must be deduplicated');
assert.match(ui, /queries\.slice\(0, 2\)/, 'native Lampa matching must use a bounded title set');
assert.doesNotMatch(ui, /return !source && !Array\.isArray\(ids\);/, 'missing metadata must not classify every title as anime');
assert.doesNotMatch(build, /src\/ui-detail-sections\.js/, 'unused duplicate detail sections must stay out of the bundle');
assert.doesNotMatch(fs.readFileSync('index.js', 'utf8'), /src\/ui-detail-sections\.js/, 'legacy loader must not fetch unused duplicate detail sections');
assert.doesNotMatch(css, /\.view--yummyanime__icon svg\s*\{\s*display:\s*none/, 'YummyAnime button logo must remain visible');

console.log('low-memory contract tests passed');
