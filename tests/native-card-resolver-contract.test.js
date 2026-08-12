const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const card = fs.readFileSync('src/ui-standard-card.js', 'utf8');

assert.match(card, /setTimeout\(function \(\) \{ finish\(null\); \}, 12000\)/);
assert.match(card, /var titlesToSearch = \(searchTitles \|\| \[\]\)\.slice\(0, 6\)/);
assert.match(card, /return result\.usable \? result\.items : searchTmdbAggregate\(tmdb, title\)/);
assert.match(card, /var responses = 0/);
assert.match(card, /responses\+\+/);
assert.match(card, /resolve\(\{items: items, usable: responses > 0\}\)/);
assert.match(card, /var timeout = setTimeout\(finish, 3000\)/);
assert.match(card, /var standardNativeCacheLimit = 60/);
assert.match(card, /var standardNativePositiveTtl = 30 \* 24 \* 60 \* 60 \* 1000/);
assert.match(card, /var standardNativeNegativeTtl = 10 \* 60 \* 1000/);
assert.match(card, /if \(standardNativePending\[cacheKey\]\) return standardNativePending\[cacheKey\]/);
assert.match(card, /return rememberStandardNativeMatch\(cacheKey, match\)/);
assert.match(card, /!isValidNativeId\(entry\.match\.card\.id\)/);
assert.match(ui, /LampaYaniStandardCard\.create/);
assert.match(ui, /function openYummyDetail\(/);

console.log('Native Lampa card resolver contract checks passed');
