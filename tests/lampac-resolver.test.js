const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const storage = {yani_lampac_url: 'http://192.168.1.10:9118'};
const context = {
    window: {
        Lampa: {
            Storage: {
                get: (key, fallback) => Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : fallback,
                set: (key, value) => { storage[key] = value; }
            }
        },
        LampaYaniUiUtils: {
            titleValues: card => [card.title, card.original_title].filter(Boolean),
            videoData: video => video.data || {}
        }
    },
    URL,
    URLSearchParams,
    Promise
};
context.Lampa = context.window.Lampa;
context.LampaYaniUiUtils = context.window.LampaYaniUiUtils;
vm.runInNewContext(fs.readFileSync('src/lampac-resolver.js', 'utf8'), context);

const resolver = context.window.LampaYaniLampacResolver;
assert.strictEqual(resolver.normalizeBaseUrl('http://lampac.local:9118/'), 'http://lampac.local:9118');
assert.strictEqual(resolver.normalizeBaseUrl('lampac.local:9118'), '');
assert.strictEqual(resolver.extractOrid('https://alloha.example/player?token=abcdef1234'), 'abcdef1234');

const root = new URL(resolver.buildRootUrl({
    title: 'Покемон',
    original_title: 'Pokemon',
    release_date: '2026-01-01',
    yani_remote_ids: {imdb_id: 'tt1234567'}
}, 'https://alloha.example/embed/abcdef1234'));
assert.strictEqual(root.origin, 'http://192.168.1.10:9118');
assert.strictEqual(root.pathname, '/lite/alloha');
assert.strictEqual(root.searchParams.get('orid'), 'abcdef1234');
assert.strictEqual(root.searchParams.get('imdb_id'), 'tt1234567');
assert.strictEqual(root.searchParams.get('title'), 'Покемон');
assert.strictEqual(root.searchParams.get('year'), '2026');

const items = resolver.parseDataItems(
    '<div class="videos__item selector" e="3" data-json="{&quot;method&quot;:&quot;call&quot;,&quot;stream&quot;:&quot;http://lampac.local/lite/alloha/video.m3u8?e=3&quot;}">3 серия</div>',
    'videos__item'
);
assert.strictEqual(items.length, 1);
assert.strictEqual(items[0].episode, 3);
assert.strictEqual(items[0].method, 'call');
assert.strictEqual(items[0].text, '3 серия');

assert.strictEqual(resolver.setBaseUrl(''), '');
assert.strictEqual(resolver.enabled(), false);

console.log('lampac-resolver tests passed');
