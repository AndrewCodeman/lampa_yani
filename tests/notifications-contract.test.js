const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('src/ui-notifications.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const context = {window: {}};
vm.runInNewContext(source, context);
const notifications = context.window.LampaYaniNotifications;

const normalized = notifications.normalize({response: [{
    id: 17,
    date: 1786400000,
    title_html: '<b>Новая серия</b> &amp; перевод',
    text_html: '<p>Доступна <strong>серия 4</strong><br>с озвучкой</p>',
    click_uri: '/catalog/item/example-anime?source=notification',
    type: 'anime_episode',
    sub_type: 'new_episode',
    viewed: false,
    object_id: 999
}]});

assert.equal(normalized.length, 1);
assert.equal(normalized[0].title, 'Новая серия & перевод');
assert.equal(normalized[0].text, 'Доступна серия 4\nс озвучкой');
assert.equal(normalized[0].anime_slug, 'example-anime');
assert.equal(normalized[0].kind, 'episode');
assert.equal(normalized[0].unread, true);
assert.equal(notifications.notificationKind({type: 'comment_reply'}), 'comment');
assert.equal(notifications.notificationKind({type: 'friend_request'}), 'social');
assert.equal(notifications.extractAnimeSlug('https://yummyani.me/catalog/item/title-name/'), 'title-name');

assert.match(source, /title_html \|\| source\.titleHtml/);
assert.match(source, /text_html \|\| source\.textHtml/);
assert.match(source, /notification\.kind !== 'episode'/);
assert.match(source, /deps\.resolveAnime\(notification\.anime_slug\)/);
assert.doesNotMatch(source, /notification\.object_id \|\| notification\.objectId/, 'notification object ids are not anime ids');
assert.match(source, /LampaYaniNavigation\.moveDown\(scroll\)/);
assert.match(source, /refreshFocus\(previous\)/);
assert.match(ui, /resolveAnime: LampaYaniApi\.detail/);
assert.match(ui, /fetch: LampaYaniApi\.notifications/);
assert.match(css, /\.yani-notifications__hero/);
assert.match(css, /\.yani-notification__visual/);
assert.match(css, /\.yani-notification\.focus/);
assert.match(css, /\.yani-notifications__actions/);

console.log('notifications contract checks passed');
