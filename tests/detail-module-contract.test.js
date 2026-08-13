const assert = require('assert');
const fs = require('fs');

const build = fs.readFileSync('build.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const detail = fs.readFileSync('src/ui-detail.js', 'utf8');

assert.match(build, /'src\/ui-detail\.js'[\s\S]*'src\/ui\.js'/, 'detail module must load before the main UI');
assert.match(ui, /LampaYaniDetail\.create\(/, 'main UI must delegate Detail to LampaYaniDetail.create');
assert.doesNotMatch(ui, /function renderDetail\(cardData\)/, 'renderDetail must live in ui-detail.js');
assert.doesNotMatch(ui, /function createDetailEpisodeSummary\(cardData\)/, 'createDetailEpisodeSummary must live in ui-detail.js');
assert.doesNotMatch(ui, /function createDetailTranslations\(\)/, 'createDetailTranslations must live in ui-detail.js');
assert.match(detail, /function createDetailEpisodeSummary\(cardData\)/);
assert.match(detail, /function createDetailTranslations\(\)/);
assert.match(detail, /function createDetailListPanel\(cardData\)/);
assert.match(detail, /function createDetailRatingAction\(cardData\)/);
assert.match(detail, /window\.LampaYaniDetail\s*=\s*\{create: create\}/);
assert.match(detail, /deps\.importVideosProgress\(data, videos\)/);
assert.match(ui, /importVideosProgress: importVideosProgress/);

console.log('detail module contract checks passed');
