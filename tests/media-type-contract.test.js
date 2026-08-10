const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(ui, /function mediaTypeLabels\(value\)/);
assert.match(ui, /yani-card-media__type/);
assert.match(ui, /yani-detail__type/);
assert.match(ui, /mediaTypeLabels\(data\.yani_type\)/);
assert.match(css, /\.yani-card-media__type/);
assert.match(css, /\.yani-detail__type/);

console.log('media type contract tests passed');
