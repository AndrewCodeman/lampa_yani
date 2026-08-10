const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');

assert.match(ui, /function transientNavigationSnapshot\(\)[\s\S]{0,700}controller: currentControllerName\(\) \|\| 'content'/);
assert.match(ui, /function restoreTransientInteraction\(snapshot\)[\s\S]{0,1800}Lampa\.Controller\.toggle\(controller\)[\s\S]{0,500}collectionFocus\(element/);
assert.match(ui, /function showYummySelect\(params, snapshot\)[\s\S]{0,700}params\.onBack = function \(\)[\s\S]{0,300}restoreTransientInteraction\(snapshot\)/);
assert.match(ui, /function openGenres\(\)[\s\S]{0,150}transientNavigationSnapshot\(\)[\s\S]{0,1200}showYummySelect\([\s\S]{0,800}, navigation\)/);
assert.match(ui, /function showYummyInput\(params, callback\)[\s\S]{0,1500}restoreTransientInteraction\(navigation\)/);

const directSelectCalls = ui.match(/Lampa\.Select\.show\(/g) || [];
assert.strictEqual(directSelectCalls.length, 1, 'temporary lists must go through showYummySelect');

[
    'showYummyActions',
    'openUserReviews',
    'openGenres',
    'loadDetailCollections',
    'legacyOpenTrailers',
    'renderCommentList'
].forEach((name) => {
    const start = ui.indexOf('function ' + name);
    assert.ok(start >= 0, name + ' must exist');
    assert.ok(ui.slice(start, start + 7000).includes('showYummySelect('), name + ' must use restorable Select');
});

console.log('transient navigation contract checks passed');
