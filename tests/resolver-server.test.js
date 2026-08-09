const assert = require('assert');
const {rewritePlaylist, parseStreamPath, encodeTarget, decodeTarget, signedTarget, verifiedTarget, isAllohaUrl} = require('../server');

// Segment targets travel in the query string, so an unsigned one would make
// this service forward any URL it is handed.
const signed = new URLSearchParams(signedTarget('https://cdn.example/seg1.ts'));
assert.strictEqual(verifiedTarget(signed.get('u'), signed.get('s')), 'https://cdn.example/seg1.ts');
assert.strictEqual(verifiedTarget(encodeTarget('https://evil.example/'), signed.get('s')), '', 'a foreign URL must not verify');
assert.strictEqual(verifiedTarget(signed.get('u'), 'short'), '', 'a truncated signature must not verify');
assert.strictEqual(verifiedTarget(signed.get('u'), ''), '', 'a missing signature must not verify');

const live = parseStreamPath('/hls/abc123/master.m3u8');
assert.strictEqual(live.id, 'abc123');
assert.strictEqual(live.quality, '');
assert.strictEqual(live.isMaster, true);

const pinned = parseStreamPath('/hls/abc123/q/1080p/master.m3u8');
assert.strictEqual(pinned.quality, '1080p');
assert.strictEqual(pinned.isMaster, true);

// Segments name their target in the query string, never in the path, so they
// must not be mistaken for a manifest.
const segment = parseStreamPath('/hls/abc123/p');
assert.strictEqual(segment.id, 'abc123');
assert.strictEqual(segment.isMaster, false);
assert.strictEqual(parseStreamPath('/hls/').id, '');

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
