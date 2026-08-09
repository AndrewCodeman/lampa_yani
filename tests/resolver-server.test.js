const assert = require('assert');
const {rewritePlaylist, encodeTarget, decodeTarget, isAllohaUrl} = require('../server');

assert.strictEqual(decodeTarget(encodeTarget('https://cdn.example/master.m3u8?a=1&b=2')), 'https://cdn.example/master.m3u8?a=1&b=2');
assert.ok(!/[+/=]/.test(encodeTarget('https://cdn.example/????')), 'session ids must be URL safe');

assert.ok(isAllohaUrl('https://alloha.yani.tv/?token_movie=abc'));
assert.ok(!isAllohaUrl('https://player.aksor.tv/video/abc'));

const master = [
    '#EXTM3U',
    '#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360',
    '360/index.m3u8',
    '#EXT-X-STREAM-INF:BANDWIDTH=2400000,RESOLUTION=1920x1080',
    'https://other.cdn.example/1080/index.m3u8',
    '#EXT-X-MEDIA:TYPE=AUDIO,URI="audio/a1.m3u8"'
].join('\n');

const rewritten = rewritePlaylist(master, 'https://cdn.example/hash/master.m3u8', (value, baseUrl) => {
    return '/proxy?u=' + encodeTarget(new URL(value, baseUrl).toString());
});
const lines = rewritten.split('\n');

// Every playable reference has to come back through the proxy: the CDN only
// answers requests that carry the session's rotating headers.
assert.strictEqual(lines[2], '/proxy?u=' + encodeTarget('https://cdn.example/hash/360/index.m3u8'));
assert.strictEqual(lines[4], '/proxy?u=' + encodeTarget('https://other.cdn.example/1080/index.m3u8'));
assert.ok(lines[1].startsWith('#EXT-X-STREAM-INF'), 'tag lines must survive untouched');
assert.strictEqual(
    lines[5],
    '#EXT-X-MEDIA:TYPE=AUDIO,URI="/proxy?u=' + encodeTarget('https://cdn.example/hash/audio/a1.m3u8') + '"',
    'URI attributes inside tags must be rewritten too'
);

console.log('resolver-server tests passed');
