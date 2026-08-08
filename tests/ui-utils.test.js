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

console.log('ui-utils tests passed');
