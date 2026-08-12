const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(ui, /addCardMetadata\(element, card\)/);
assert.match(ui, /function cardStatusLabel\(status\)/);
assert.match(ui, /function cardEpisodesLabel\(episodes, watched\)/);
assert.match(ui, /function addCardMetadata\(element, card\)/);
assert.match(ui, /yani_status: item\.anime_status \|\| item\.status \|\| null/);
assert.match(ui, /yani_year: item\.year \|\| item\.release_year \|\| null/);
assert.match(css, /\.yani-card-meta__native-age/);
assert.match(css, /\.yani-card-meta__episodes/);
assert.doesNotMatch(css, /\.yani-card-media__type/);

console.log('card metadata contract checks passed');
