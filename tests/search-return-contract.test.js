const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const start = ui.indexOf('function openSearch()');
const end = ui.indexOf('function openAccount()', start);
const search = ui.slice(start, end);

assert.ok(start >= 0 && end > start, 'openSearch must remain available');
assert.match(search, /if \(query\) \{/);
assert.match(search, /Lampa\.Activity\.push\(/);
assert.match(search, /setTimeout\(function \(\) \{/);
assert.match(search, /Lampa\.Controller\.toggle\('content'\)/);

console.log('Search return controller contract checks passed');
