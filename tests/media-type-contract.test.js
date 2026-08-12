const assert = require('assert');
const fs = require('fs');

const cards = fs.readFileSync('src/ui-card-renderers.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(cards, /function mediaTypeLabels\(value\)/);
assert.match(cards, /values\.push\(\{kind: 'type', text: type\.short\}\)/);
assert.match(cards, /yani-card-meta__/);
assert.match(ui, /yani-detail__type/);
assert.match(ui, /mediaTypeLabels\(data\.yani_type\)/);
assert.match(css, /\.yani-card-meta/);
assert.match(css, /\.yani-detail__type/);

console.log('media type contract tests passed');
