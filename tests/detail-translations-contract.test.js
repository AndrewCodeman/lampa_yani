const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const i18n = fs.readFileSync('src/i18n.js', 'utf8');

assert.match(ui, /var detailVideosPromise/);
assert.match(ui, /function loadDetailVideos\(\)/);
assert.match(ui, /function detailTranslationGroups\(videos\)/);
assert.match(ui, /function detailTranslationLabel\(name, kind\)/);
assert.match(ui, /function detailTranslationKind\(name\)/);
assert.match(ui, /withoutPrefix \|\| cleaned/);
assert.match(ui, /String\(videoInfo\.dubbing \|\| ''\)/);
assert.doesNotMatch(ui.slice(ui.indexOf('function detailTranslationGroups'), ui.indexOf('function createDetailTranslations')), /videoInfo\.player/);
assert.match(ui, /function createDetailTranslations\(\)/);
assert.match(ui, /createDetailTranslations\(\)/);
assert.match(css, /\.yani-detail__translation-row--voices/);
assert.match(css, /\.yani-detail__translation-row--subtitles/);
assert.match(css, /@keyframes yani-translation-chip-in/);
assert.match(i18n, /messages\.ru\.available_translations = 'Доступные переводы'/);
assert.match(i18n, /messages\.uk\.subtitle_teams = 'Субтитри'/);

console.log('detail translations contract checks passed');
