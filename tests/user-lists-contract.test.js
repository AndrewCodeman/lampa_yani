const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const lists = fs.readFileSync('src/ui-account-lists.js', 'utf8');
const i18n = fs.readFileSync('src/i18n.js', 'utf8');

assert.match(ui, /Lampa\.Component\.add\('yani_user_lists', UserLists\)/);
assert.match(ui, /key: 'user_lists', title: t\('user_lists'\), authorized: true/);
assert.match(ui, /!item\.authorized \|\| LampaYaniAuth\.token\(\)/);
assert.match(ui, /\['user_lists', 'user_lists'\]/);
assert.match(ui, /component: 'yani_user_lists'/);

assert.match(lists, /function userLists\(object, deps\)/);
assert.match(lists, /var definitions = deps\.definitions\(\)\.slice\(\)/);
assert.match(lists, /deps\.openList\(definition\)/);
assert.match(lists, /click\.yaniUserList/);
assert.match(lists, /definitions\.push\(\{key: 'history', title: deps\.t\('watch_history'\), history: true\}\)/);
assert.match(lists, /if \(definition\.history\) deps\.openHistory\(\)/);
const userListsComponent = lists.slice(lists.indexOf('function userLists'), lists.indexOf('window.LampaYani ='));
assert.doesNotMatch(userListsComponent, /LampaYaniApi\./, 'list shortcuts must render without an eager API request');

assert.match(ui, /function openUserListShortcut\(definition\)/);
assert.match(ui, /function openUserListShortcut[\s\S]{0,2200}LampaYaniApi\.profile\(\)/);
assert.match(ui, /function openUserListShortcut[\s\S]{0,2200}LampaYaniApi\.userList\(userId, definition\.id\)/);
assert.match(ui, /function openUserListShortcut[\s\S]{0,2200}LampaYaniApi\.userLists\(userId\)/);
assert.match(ui, /openList: openUserListShortcut/);
assert.match(ui, /openHistory: openWatchHistory/);
assert.match(ui, /function openWatchHistory\(\)[\s\S]{0,300}component: 'yani_history'/);

['ru', 'en', 'uk'].forEach((language) => {
    assert.match(i18n, new RegExp(`messages\\.${language}\\.user_lists\\s*=`));
    assert.match(i18n, new RegExp(`messages\\.${language}\\.favorites\\s*=`));
    assert.match(i18n, new RegExp(`messages\\.${language}\\.open_list\\s*=`));
    assert.match(i18n, new RegExp(`messages\\.${language}\\.watch_history\\s*=`));
});

console.log('User lists contract checks passed');
