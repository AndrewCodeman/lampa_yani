const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('src/ui-home-insights.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const build = fs.readFileSync('build.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(build, /src\/ui-home-insights\.js/);
assert.match(ui, /LampaYaniHomeInsights\.load\(LampaYaniApi\.feed\)/);
assert.match(ui, /yani-home__count/);
assert.match(ui, /if \(destroyed\) return/);
assert.match(ui, /count > 99 \? '99\+' : String\(count\)/);
assert.match(css, /\.yani-home__count--visible/);
assert.match(css, /\.yani-home__item\.focus \.yani-home__count/);

const context = {window: {}};
vm.runInNewContext(source, context);
const insights = context.window.LampaYaniHomeInsights;
const result = insights.counts({response: {
    new: [{anime_id: 1}, {anime_id: 2}, {anime_id: 2}],
    new_videos: [{anime_id: 1}, {anime_id: 1}, {anime_id: 3}, {}],
    collections: [{id: 7}, {id: 8}, {id: 7}]
}});

assert.equal(result.new_releases, 2);
assert.equal(result.new_translations, 2);
assert.equal(result.collections, 2);

console.log('home insights contract checks passed');
