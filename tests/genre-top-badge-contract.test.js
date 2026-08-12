const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const i18n = fs.readFileSync('src/i18n.js', 'utf8');

assert.match(ui, /function annotateGenreTop\(items, offset\)/);
assert.match(ui, /hasSortDirection \?[^:]+:[\s\r\n]*baseParams\.sort === 'top'/);
assert.match(ui, /item\.yani_genre_top = \{position: position, genre: title\}/);
assert.match(ui, /yani_genre_top: item\.yani_genre_top && typeof item\.yani_genre_top === 'object'/);
assert.match(ui, /function genreTopPosition\(card\)/);
assert.match(ui, /position >= 1 && position <= 100/);
assert.match(ui, /yani-card-media__genre-top/);
assert.match(ui, /genre_top_position/);
assert.match(css, /\.yani-card-media__genre-top/);
assert.match(css, /\.yani-card-media__genre-top svg/);
assert.match(i18n, /Топ-100 жанра «\{genre\}»: место \{position\}/);
assert.match(i18n, /“\{genre\}” top 100: position \{position\}/);

console.log('genre top badge contract checks passed');
