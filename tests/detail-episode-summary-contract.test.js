const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const i18n = fs.readFileSync('src/i18n.js', 'utf8');
const api = fs.readFileSync('src/api.js', 'utf8');

assert.match(ui, /function createDetailEpisodeSummary\(cardData\)/);
assert.match(ui, /LampaYaniUiUtils\.detailEpisodeStats\(cardData, \[\], local\)/);
assert.match(ui, /yani-detail__episode-summary selector/);
assert.match(ui, /block\.one\('hover:focus\.yaniEpisodeSummary', enrich\)/);
assert.doesNotMatch(ui.slice(ui.indexOf('function createDetailEpisodeSummary'), ui.indexOf('function detailEpisodeIcon')), /hover:enter|click\./,
    'the summary is focusable for navigation but must not perform an action');
assert.match(ui, /stats\.total > 0 && stats\.total <= 100/);
assert.match(ui, /yani_episodes: item\.episodes \|\| null/);
assert.match(css, /\.yani-detail__episode-summary\.focus/);
assert.match(api, /videos: function \(id\)[\s\S]{0,140}\{auth: true, cache: false\}/,
    'authorized video metadata is required for watched-episode counts');

['ru', 'en', 'uk'].forEach((language) => {
    ['episode_information', 'seasons_short', 'episodes_aired', 'episodes_watched'].forEach((key) => {
        assert.match(i18n, new RegExp(`messages\\.${language}\\.${key}\\s*=`));
    });
});

console.log('detail episode summary contract tests passed');
