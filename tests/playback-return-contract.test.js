const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const i18n = fs.readFileSync('src/i18n.js', 'utf8');

assert.match(ui, /beginPlaybackNavigation\(button, scroll\.render\(\)\);[\s\S]{0,100}openTitlePlaybackOptions\(data\)/);
assert.match(ui, /function showPlaybackSelect\(params\)[\s\S]{0,500}params\.onBack = function \(\)[\s\S]{0,200}restorePlaybackInteraction\(\)/);
assert.match(ui, /function chooseEpisode[\s\S]{0,700}showPlaybackSelect\(\{/);
assert.match(ui, /function openVideos[\s\S]{0,4000}showPlaybackSelect\(\{/);
assert.match(ui, /function showDirectPlaybackOptions[\s\S]{0,1000}showPlaybackSelect\(\{/);
assert.match(ui, /function openTitlePlaybackOptions[\s\S]{0,900}showPlaybackSelect\(\{/);
assert.match(ui, /function showYummyActions\(card, originElement, originCollection\)[\s\S]{0,1500}beginPlaybackNavigation\(originElement, originCollection\);[\s\S]{0,100}openVideos\(card\)/);

assert.match(ui, /function prepareExternalRestore\(\)[\s\S]{0,500}var origin = playbackReturnSnapshot\(\)/);
assert.match(ui, /function cancelExternalRestore\(\)[\s\S]{0,300}externalRestoreState\.pending = false/);
assert.match(ui, /function openExternalUri[\s\S]{0,1500}cancelExternalRestore\(\);[\s\S]{0,50}return false/);
assert.match(ui, /function openAndroidAppUri[\s\S]{0,1200}cancelExternalRestore\(\);[\s\S]{0,50}return false/);
assert.match(ui, /externalRestoreState\.controller = origin\.controller/);
assert.match(ui, /externalRestoreState\.departed/);
assert.match(ui, /setTimeout\(restoreExternalFocus, 1500\)/);
assert.match(ui, /if \(!externalRestoreState\.departed && elapsed < 1200\)[\s\S]{0,150}setTimeout\(restoreExternalFocus, 1200 - elapsed\)/);
assert.match(ui, /Lampa\.Player\.callback\(function \(\) \{ restorePlaybackInteraction\(\); \}\)/);

const settingsStart = ui.indexOf("param: {name: 'yani_home_sections_title'");
const licenseIndex = ui.indexOf("param: {name: 'yani_license_notice', type: 'title'}");
assert.ok(settingsStart >= 0 && licenseIndex > settingsStart, 'license notice must remain at the bottom of settings');
assert.ok(!ui.slice(licenseIndex, licenseIndex + 250).includes('onChange'), 'license notice must not be actionable');
['ru', 'en', 'uk'].forEach((language) => {
    assert.match(i18n, new RegExp(`messages\\.${language}\\.license_notice\\s*=`));
});

console.log('playback return contract checks passed');
