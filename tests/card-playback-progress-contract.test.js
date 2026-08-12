const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(ui, /function cardPlaybackState\(card\)/);
assert.match(ui, /function addCardPlaybackProgress\(element, card\)/);
assert.match(ui, /addCardPlaybackProgress\(element, card\)/);
assert.match(ui, /data-yani-card-id/);
assert.match(ui, /not\('\.yani-history-card'\)/);
assert.match(css, /\.yani-card-playback \{/);
assert.match(css, /\.yani-card-playback-progress span/);

console.log('card playback progress contract checks passed');
