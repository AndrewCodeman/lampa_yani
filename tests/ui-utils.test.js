const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const context = {window: {}, URL};
vm.runInNewContext(fs.readFileSync('src/ui-utils.js', 'utf8'), context);
const utils = context.window.LampaYaniUiUtils;

assert.deepStrictEqual(Array.from(utils.titleValues({title: 'Покемон', aliases: ['Pokemon', {name: 'ポケモン'}]})), ['Покемон', 'Pokemon', 'ポケモン']);
assert.strictEqual(utils.normalizeMatchTitle('Ёжик: 2026'), 'ежик 2026');
assert.deepStrictEqual(Array.from(utils.standardSearchTitles({title: 'Anime (2026)', yani_titles: ['Anime']})), ['Anime (2026)', 'Anime']);

console.log('ui-utils tests passed');
