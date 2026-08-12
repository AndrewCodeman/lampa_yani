const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('src/ui-recommendations.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const build = fs.readFileSync('build.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(build, /src\/ui-recommendations\.js/);
assert.match(ui, /LampaYaniRecommendations\.component/);
assert.match(ui, /watchHistory: LampaYaniApi\.watchHistory/);
assert.match(ui, /addCardRecommendationBadge/);
assert.match(ui, /LampaYaniCardRenderers\.create/);
assert.match(css, /\.yani-card-recommendation/);
assert.match(source, /sort_forward: true/);
assert.match(source, /from_year: 1900/);
assert.match(source, /slice\(0, limit \|\| 4\)/);

const context = {window: {}};
vm.runInNewContext(source, context);
const recommendations = context.window.LampaYaniRecommendations;
const sources = recommendations.recentSources({
    5: {updated_at: 100, card: {title: 'Local old'}},
    8: {anime_id: 8, updated_at: 300, title: 'Local newest'}
}, {response: [
    {anime_id: 5, date: 400, title: 'Remote newer duplicate'},
    {anime_id: 9, date: 200, title: 'Remote title'}
]}, 4);

assert.deepEqual(Array.from(sources, (item) => String(item.id)), ['5', '8', '9']);
assert.equal(sources[0].title, 'Remote newer duplicate');

const cards = recommendations.cardsFromRows([
    [{anime_id: 20, title: 'A'}, {anime_id: 21, title: 'B'}],
    [{anime_id: 20, title: 'A duplicate'}, {anime_id: 8, title: 'Source duplicate'}]
], sources, (item) => ({yani_id: item.anime_id, title: item.title}), (key) => key);

assert.deepEqual(Array.from(cards, (card) => card.yani_id), [20, 21]);
assert.equal(cards[0].yani_recommendation_label, 'because_you_watched Remote newer duplicate');

console.log('recommendations contract checks passed');
