const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(ui, /function cardMediaMotionAllowed\(\)/);
assert.match(ui, /yani-card-media__availability/);
assert.match(ui, /yani-card-media__availability-part yani-card-media__quality/);
assert.match(ui, /yani-card-media__availability-part yani-card-media__voices/);
assert.match(ui, /prefers-reduced-motion: reduce/);
assert.match(ui, /deviceMemory/);
assert.match(css, /\.yani-card-media__availability \{/);
assert.match(css, /@keyframes yani-card-availability-in/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
assert.doesNotMatch(css, /\.yani-card-media__quality \{ background: #f1c40f/);

console.log('card availability design contract checks passed');
