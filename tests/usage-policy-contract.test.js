const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const i18n = fs.readFileSync('src/i18n.js', 'utf8');

assert.match(ui, /Lampa\.Component\.add\('yani_policy', UsagePolicy\)/);
assert.match(ui, /Lampa\.Storage\.get\('yani_usage_policy_revision'/);
assert.match(ui, /Lampa\.Storage\.set\('yani_usage_policy_revision', usagePolicyRevision\)/);
assert.match(ui, /param: \{name: 'yani_usage_policy', type: 'button'\}/);
assert.match(i18n, /messages\.ru\.usage_policy_legal/);
assert.match(i18n, /messages\.en\.usage_policy_legal/);
assert.match(i18n, /messages\.uk\.usage_policy_legal/);

console.log('usage policy contract tests passed');
