const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const i18n = fs.readFileSync('src/i18n.js', 'utf8');

assert.match(ui, /function cardUpdateTimestamp\(value\)/);
assert.match(ui, /function cardFreshness\(value\)/);
assert.match(ui, /card\.yani_update_date \|\| card\.yani_updated_at/);
assert.match(ui, /yani_update_date: item\.yani_update_date \|\| item\.updated_at/);
assert.match(css, /\.yani-card-update__freshness/);
assert.match(css, /\.yani-card-update--fresh/);
assert.match(i18n, /messages\.ru\.fresh_today = 'Сегодня'/);
assert.match(i18n, /messages\.en\.fresh_yesterday = 'Yesterday'/);
assert.match(i18n, /messages\.uk\.fresh_today = 'Сьогодні'/);

console.log('card freshness contract checks passed');
