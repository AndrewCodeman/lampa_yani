const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const lists = fs.readFileSync('src/ui-account-lists.js', 'utf8');
const i18n = fs.readFileSync('src/i18n.js', 'utf8');

assert.match(ui, /Lampa\.Component\.add\('yani_user_lists', UserLists\)/);
assert.match(ui, /key: 'user_lists', title: t\('user_lists'\), authorized: true/);
assert.match(ui, /!item\.authorized \|\| LampaYaniAuth\.token\(\)/);
assert.match(ui, /\['user_lists', 'user_lists'\]/);
assert.match(ui, /component: 'yani_user_lists'/);

assert.match(lists, /function userLists\(object, deps\)/);
assert.match(lists, /var component = \{\}/);
assert.match(lists, /component\.create = function \(\)/);
assert.match(lists, /component\.start = function \(\)/);
assert.match(lists, /return component;/);
assert.doesNotMatch(lists.slice(lists.indexOf('function userLists'), lists.indexOf('window.LampaYani =')), /this\.create = function/, 'the modular factory must return the Activity component');
assert.match(lists, /var definitions = deps\.definitions\(\)\.slice\(\)/);
assert.match(lists, /deps\.openList\(definition\)/);
assert.match(lists, /click\.yaniUserList/);
assert.match(lists, /definitions\.push\(\{key: 'history', title: deps\.t\('watch_history'\), history: true\}\)/);
assert.match(lists, /if \(definition\.history\) deps\.openHistory\(\)/);
const userListsComponent = lists.slice(lists.indexOf('function userLists'), lists.indexOf('window.LampaYani ='));
assert.doesNotMatch(userListsComponent, /LampaYaniApi\./, 'list shortcuts must render without an eager API request');

assert.match(ui, /function openUserListShortcut\(definition\)/);
assert.match(ui, /var storedId = Number\(account && account\.user_id \|\| 0\)/);
assert.match(ui, /return LampaYaniApi\.userList\(userId, definition\.id\)\.then\(normalizeUserList\)/);
assert.match(ui, /catch\(function \(directError\)[\s\S]{0,300}loadAll\(userId\)/);
assert.doesNotMatch(ui, /items\.length \? items : loadAll\(userId\)/, 'an empty dedicated list is a valid response');
assert.match(ui, /var cached = readCache\(userId\)/);
assert.match(ui, /openList: openUserListShortcut/);
assert.match(ui, /openHistory: openWatchHistory/);
assert.match(ui, /function openWatchHistory\(\)[\s\S]{0,300}component: 'yani_history'/);

['ru', 'en', 'uk'].forEach((language) => {
    assert.match(i18n, new RegExp(`messages\\.${language}\\.user_lists\\s*=`));
    assert.match(i18n, new RegExp(`messages\\.${language}\\.favorites\\s*=`));
    assert.match(i18n, new RegExp(`messages\\.${language}\\.open_list\\s*=`));
    assert.match(i18n, new RegExp(`messages\\.${language}\\.watch_history\\s*=`));
});

const context = {window: {}};
vm.runInNewContext(lists, context);
const helpers = context.window.LampaYaniAccountLists;
const normalized = helpers.normalize({response: {items: [
    {anime: {anime_id: 42, title: 'Nested title'}, user: {list: {list: {id: 1}}}, date: 123},
    {anime_id: 43, title: 'Direct title', user: {list: {is_fav: true, list: {id: 0}}}}
]}});
assert.strictEqual(normalized.length, 2);
assert.strictEqual(normalized[0].anime_id, 42);
assert.strictEqual(normalized[0].date, 123);
assert.strictEqual(helpers.filterItems({id: 1}, normalized).length, 1);
assert.strictEqual(helpers.filterItems({id: 4}, normalized).length, 1);
assert.deepStrictEqual(Array.from(helpers.normalize({response: []})), []);

console.log('User lists contract checks passed');
