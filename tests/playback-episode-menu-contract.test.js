const assert = require('assert');
const fs = require('fs');

const api = fs.readFileSync('src/api.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const menu = fs.readFileSync('src/ui-playback-menu.js', 'utf8');
const detail = fs.readFileSync('src/ui-detail.js', 'utf8');

assert.match(api, /var videosMemory = \{\}/);
assert.match(api, /VIDEOS_MEMORY_MS = 45000/);
assert.match(api, /videos: function \(id\)[\s\S]{0,420}\{auth: true, cache: false\}/);
assert.match(api, /episodeInfoCache\[key\]/);
assert.match(api, /timeout: 4000/);
assert.match(api, /retry: false/);

assert.match(ui, /function episodeTitlesForCard\(card\)/);
assert.match(ui, /return Promise\.resolve\(\);/);
assert.match(menu, /enrichEpisodeTitles\(card\);/);
assert.match(menu, /enrichEpisodeTitles\(card, item\.group\);\s*chooseEpisode\(card, item\.group\)/);
assert.doesNotMatch(menu, /enrichEpisodeTitles\(card, item\.group\)\.then/);
assert.doesNotMatch(menu, /enrichEpisodeTitles\(card, voices\[0\]\.group\)\.then/);
assert.match(detail, /LampaYaniApi\.episodeInfo\(malId\)\.catch/);
assert.match(ui, /videos\.length \? videoPlaybackPriority\(videos\[0\], group\)/);

console.log('playback episode menu contract checks passed');
