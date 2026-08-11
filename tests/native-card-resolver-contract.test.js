const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');

assert.match(ui, /setTimeout\(function \(\) \{ finish\(null\); \}, 12000\)/);
assert.match(ui, /var titlesToSearch = \(searchTitles \|\| \[\]\)\.slice\(0, 6\)/);
assert.match(ui, /return result\.usable \? result\.items : searchTmdbAggregate\(tmdb, title\)/);
assert.match(ui, /var responses = 0/);
assert.match(ui, /responses\+\+/);
assert.match(ui, /resolve\(\{items: items, usable: responses > 0\}\)/);
assert.match(ui, /var timeout = setTimeout\(finish, 3000\)/);
assert.match(ui, /var standardNativeCacheLimit = 60/);
assert.match(ui, /var standardNativePositiveTtl = 30 \* 24 \* 60 \* 60 \* 1000/);
assert.match(ui, /var standardNativeNegativeTtl = 10 \* 60 \* 1000/);
assert.match(ui, /if \(standardNativePending\[cacheKey\]\) return standardNativePending\[cacheKey\]/);
assert.match(ui, /return rememberStandardNativeMatch\(cacheKey, match\)/);
assert.match(ui, /!isValidNativeId\(entry\.match\.card\.id\)/);

console.log('Native Lampa card resolver contract checks passed');
