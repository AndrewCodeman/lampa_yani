const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const i18n = fs.readFileSync('src/i18n.js', 'utf8');

assert.match(ui, /name: 'yani_auto_sync_progress', type: 'trigger', default: true/);
assert.match(ui, /function autoProgressSyncEnabled\(\)/);
assert.match(ui, /if \(!LampaYaniAuth\.token\(\)/, 'automatic server sync must require authorization');
assert.match(ui, /lastLocalSync >= 10000/, 'local progress writes must be throttled');
assert.match(ui, /lastServerSync >= 60000/, 'server progress writes must be throttled');
assert.match(ui, /if \(!autoProgressSyncEnabled\(\)\) \{/,
    'manual account synchronization must be shown when automatic sync is disabled');
assert.match(ui, /if \(!autoProgressSyncEnabled\(\) \|\| !video \|\| !video\.video_id\) return;/,
    'automatic API updates must respect the setting');
assert.match(ui, /function flushPlaybackProgress\(remote\)/);
assert.match(ui, /Lampa\.Player\.callback\(function \(\) \{[\s\S]{0,120}flushPlaybackProgress\(true\)/,
    'closing the internal player must flush progress');
assert.match(ui, /context\.card\.yani_resume = \{/);
assert.match(ui, /function refreshVisiblePlaybackProgress\(card\)/);
assert.match(ui, /rendered\.addClass\('yani-history-card'\)\.attr\('data-yani-history-id'/);
assert.match(i18n, /messages\.ru\.auto_sync_progress/);
assert.match(i18n, /messages\.en\.auto_sync_progress/);
assert.match(i18n, /messages\.uk\.auto_sync_progress/);

console.log('progress sync contract tests passed');
