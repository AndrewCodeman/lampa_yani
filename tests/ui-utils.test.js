const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const context = {window: {}, URL};
vm.runInNewContext(fs.readFileSync('src/ui-utils.js', 'utf8'), context);
const utils = context.window.LampaYaniUiUtils;

assert.deepStrictEqual(Array.from(utils.titleValues({title: 'Покемон', aliases: ['Pokemon', {name: 'ポケモン'}]})), ['Покемон', 'Pokemon', 'ポケモン']);
assert.deepStrictEqual(Array.from(utils.titleValues({title: 'Наруто', other_titles: ['NARUTO', 'ナルト']})), ['Наруто', 'NARUTO', 'ナルト']);
assert.strictEqual(utils.normalizeMatchTitle('Ёжик: 2026'), 'ежик 2026');
assert.deepStrictEqual(Array.from(utils.standardSearchTitles({title: 'Anime (2026)', yani_titles: ['Anime']})), ['Anime (2026)', 'Anime']);
assert.strictEqual(utils.yummyTvDetailsUrl(10551), 'yummytv://details/10551');
assert.strictEqual(utils.yummyTvDetailsUrl('23365'), 'yummytv://details/23365');
assert.strictEqual(utils.yummyTvDetailsUrl(''), '');
assert.strictEqual(utils.yummyTvDetailsUrl(-1), '');
const internalItem = utils.internalPlayerItem({
    title: 'Episode 1',
    url: '//media.example/episode.m3u8',
    time: 12,
    quality: {'720p': 'https://media.example/720.m3u8'},
    headers: {Referer: 'https://example.test/'},
    poster: 'poster.jpg'
});
assert.strictEqual(internalItem.url, 'https://media.example/episode.m3u8');
assert.strictEqual(internalItem.isonline, true);
assert.strictEqual(internalItem.time, 12);
assert.strictEqual(internalItem.quality['720p'], 'https://media.example/720.m3u8');
assert.strictEqual(internalItem.headers.Referer, 'https://example.test/');
assert.strictEqual(internalItem.poster, 'poster.jpg');
assert.strictEqual(utils.internalPlayerItem({url: ''}), null);
assert.strictEqual(utils.detailRouteId({yani_id: 10551}), '10551');
assert.strictEqual(utils.detailRouteId({component: 'yani_detail', card: {anime_id: 23365}}), '23365');
assert.strictEqual(utils.detailRouteId({component: 'yani_detail', url: 'yani/detail/4912'}), '4912');
assert.strictEqual(utils.detailRouteId({component: 'yani_detail', url: '/yani/detail/title%2042?restore=1'}), 'title 42');
assert.strictEqual(utils.detailRouteId({component: 'yani_detail', id: 77}), '77');
assert.strictEqual(utils.detailRouteId({component: 'full', id: 77}), '');

const episodeStats = utils.detailEpisodeStats({
    yani_episodes: {count: 12, aired: 8},
    yani_seasons_count: 2
}, [
    {number: '1', duration: 1440, watched: {end_time: 300}},
    {number: '1', duration: 1500, watched: null},
    {number: '2', duration: 1380, watched: null}
], {number: '2', time: 90, duration: 1380});
assert.strictEqual(episodeStats.seasons, 2);
assert.strictEqual(episodeStats.total, 12);
assert.strictEqual(episodeStats.aired, 8);
assert.strictEqual(episodeStats.watched, 2, 'dubbings must not duplicate watched episodes');
assert.strictEqual(episodeStats.minutes, 24, 'duration must average representative unique-episode durations');
assert.strictEqual(utils.detailEpisodeStats({season: 3, episodes: {count: 1}}, [], null).seasons, 0,
    'season catalog code must not be presented as a season count');
assert.deepStrictEqual(JSON.parse(JSON.stringify(utils.mediaTypeInfo({name: 'Сериал', shortname: 'TV', value: 1}))),
    {key: 'series', full: 'Сериал', short: 'TV'});
assert.deepStrictEqual(JSON.parse(JSON.stringify(utils.mediaTypeInfo('short film'))),
    {key: 'short', full: '', short: ''});
assert.deepStrictEqual(JSON.parse(JSON.stringify(utils.mediaTypeInfo({name: 'OVA', shortname: 'OVA'}))),
    {key: 'ova', full: 'OVA', short: 'OVA'});
assert.deepStrictEqual(JSON.parse(JSON.stringify(utils.mediaTypeInfo(3))),
    {key: '', full: '', short: ''}, 'numeric type ids without API labels must stay hidden');

console.log('ui-utils tests passed');
