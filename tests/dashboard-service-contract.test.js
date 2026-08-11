const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('src/ui-home-insights.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const context = {window: {}, Promise, Date};
vm.runInNewContext(source, context);
const insights = context.window.LampaYaniHomeInsights;

assert.equal(insights.notificationCount({response: {unread_count: 7}}), 7);
assert.equal(insights.notificationCount({response: {notifications: {count: 3}}}), 3);
assert.equal(insights.notificationCount({response: {comments: 2, mentions: 1}}), 3);
assert.match(ui, /LampaYaniApi\.notificationCounts\(\)/);
assert.match(ui, /yani_home_notification_count/);
assert.match(ui, /setServiceState\(homeButtons\.status, serviceState\)/);
assert.match(css, /\.yani-home__service-state--up/);
assert.match(css, /\.yani-home__service-state--degraded/);
assert.match(css, /\.yani-home__service-state--down/);

(async () => {
    const partial = await insights.dashboard({
        feed: () => Promise.resolve({response: {new: [], new_videos: [], collections: []}}),
        schedule: () => Promise.reject(new Error('offline')),
        now: Date.now()
    });
    assert.equal(partial.service.api, true);
    assert.equal(partial.service.degraded, true);
    assert.equal(partial.service.feed, true);
    assert.equal(partial.service.schedule, false);
    assert.equal(partial.schedule, null);
    assert.equal(partial.translations.count, 0);

    const down = await insights.dashboard({
        feed: () => Promise.reject(new Error('offline')),
        schedule: () => Promise.reject(new Error('offline')),
        now: Date.now()
    });
    assert.equal(down.service.api, false);
    assert.equal(down.service.degraded, false);
    assert.equal(down.counts, null);
    assert.equal(down.schedule, null);
    assert.equal(down.translations, null);
    console.log('dashboard service contract checks passed');
})().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
