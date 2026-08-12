const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(ui, /function cardStatusKey\(status\)/);
assert.match(ui, /status--' \+ cardStatusKey/);
assert.match(ui, /function watchedEpisodeCount\(item, animeId\)/);
assert.match(ui, /explicit \* total/);
assert.match(ui, /position \/ duration < 0\.75/);
assert.match(ui, /cardEpisodesLabel\(card && card\.yani_episodes, card && card\.yani_watched_episodes\)/);
assert.match(css, /\.yani-card-meta__status--ongoing/);
assert.match(css, /\.yani-card-meta__status--released/);
assert.match(css, /\.yani-card-meta__status--announced/);

console.log('card state and progress contract checks passed');
