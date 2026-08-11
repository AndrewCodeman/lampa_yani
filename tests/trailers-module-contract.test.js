const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const trailers = fs.readFileSync('src/ui-trailers.js', 'utf8');
const build = fs.readFileSync('build.js', 'utf8');

assert.match(build, /'src\/ui-trailers\.js'[\s\S]*'src\/ui\.js'/, 'trailers module must load before the main UI');
assert.match(ui, /LampaYaniTrailers\.create\(/, 'main UI must create the trailers controller');
assert.doesNotMatch(ui, /function TrailerList\(/, 'TrailerList implementation must stay outside the main UI monolith');
assert.match(trailers, /window\.LampaYaniTrailers\s*=\s*\{/, 'trailers module must expose a namespaced API');
assert.match(trailers, /function legacyOpenTrailers\([\s\S]*showYummySelect\(/, 'legacy selector must preserve restorable navigation');
assert.match(trailers, /openExternalVideo\(url, title, \{youtubeIntent: true\}\)/, 'trailers must continue through the external YouTube route');
assert.match(trailers, /Lampa\.Controller\.collectionFocus\(/, 'standalone trailer list must remain TV-focusable');

console.log('trailers module contract checks passed');
