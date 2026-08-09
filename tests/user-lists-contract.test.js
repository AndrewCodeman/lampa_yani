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
assert.match(lists, /LampaYaniApi\.userListStats\(profile\.id\)/);
assert.match(lists, /LampaYaniApi\.userLists\(profile\.id\)/);
assert.match(lists, /deps\.definitions\(\)\.forEach/);
assert.match(lists, /deps\.openList\(definition, lists, profile\.id\)/);
assert.match(lists, /click\.yaniUserList/);

['ru', 'en', 'uk'].forEach((language) => {
    assert.match(i18n, new RegExp(`messages\\.${language}\\.user_lists\\s*=`));
    assert.match(i18n, new RegExp(`messages\\.${language}\\.favorites\\s*=`));
});

console.log('User lists contract checks passed');
