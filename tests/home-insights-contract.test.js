const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('src/ui-home-insights.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const build = fs.readFileSync('build.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(build, /src\/ui-home-insights\.js/);
assert.match(ui, /LampaYaniHomeInsights\.dashboard\(\{/);
assert.match(ui, /schedule: function \(\) \{ return LampaYaniApi\.schedule\(\{\}\); \}/);
assert.match(ui, /yani-home__count/);
assert.match(ui, /yani-home__item-insight/);
assert.match(ui, /LampaYaniHomeInsights\.personalInsight/);
assert.match(ui, /LampaYaniApi\.userListStats\(account\.user_id\)/);
assert.match(ui, /yani_home_list_counts/);
assert.match(ui, /!homeListCountsFresh\(account\.user_id\)/);
assert.match(ui, /if \(destroyed\) return/);
assert.match(ui, /count > 99 \? '99\+' : String\(count\)/);
assert.match(css, /\.yani-home__count--visible/);
assert.match(css, /\.yani-home__item\.focus \.yani-home__count/);
assert.match(css, /\.yani-home__item-insight-title/);

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

const now = new Date(2026, 7, 11, 10, 0, 0).getTime();
const schedule = insights.scheduleInsight({response: [
    {anime_id: 10, title: 'Morning anime', episodes: {aired: 2, count: 12, next_date: (now + 3600000) / 1000}},
    {anime_id: 11, title: 'Evening anime', episodes: {aired: 7, count: 24, next_date: (now + 7200000) / 1000}}
]}, now);
assert.equal(schedule.today, 2);
assert.equal(schedule.preview.title, 'Morning anime');
assert.equal(schedule.preview.episode, 3);

const translations = insights.translationInsight({response: {new_videos: [
    {anime_id: 4, date: 100, anime: {title: 'Older'}},
    {anime_id: 5, date: 300, anime: {title: 'Newest'}, ep_title: 'Episode 4', dub_title: 'Dub'},
    {anime_id: 5, date: 200, anime: {title: 'Newest'}}
]}});
assert.equal(translations.count, 2);
assert.equal(translations.preview.title, 'Newest');
assert.equal(translations.preview.episode, 'Episode 4');

const personal = insights.personalInsight([
    {title: 'Older', number: '2', updated_at: 100},
    {title: 'Newest', number: '5', updated_at: 300}
], {display_name: 'codeman'}, {response: [
    {list: {id: 0}, count: 4},
    {list: {id: 1}, anime_count: 6},
    {list: {id: 2}, total: 20},
    {list: {id: 4}, count: 3},
    {list: {id: 5}, items_count: 2}
]});
assert.equal(personal.continue_count, 2);
assert.equal(personal.continue_preview.title, 'Newest');
assert.equal(personal.account_name, 'codeman');
assert.equal(personal.list_total, 32);
assert.equal(personal.tracked_total, 12);
assert.equal(personal.lists.favorites, 3);

console.log('home insights contract checks passed');
