const assert = require('assert');
const fs = require('fs');

global.window = global;
global.LampaYaniConfig = {requestTimeout: 1000};
global.fetch = async function (url) {
    if (String(url).indexOf('player.aksor.tv/api/video/test-hash') >= 0) {
        return {
            ok: true,
            text: async function () {
                return JSON.stringify({
                    qualities: {
                        q720: 'https://cdn.example/video/720.mpd',
                        q1080: 'https://cdn.example/video/1080.mpd'
                    }
                });
            }
        };
    }
    throw new Error('Unexpected request: ' + url);
};

eval(fs.readFileSync(require.resolve('../src/stream-resolver.js'), 'utf8'));

assert.strictEqual(LampaYaniStreamResolver.canResolve('https://player.aksor.tv/video/test-hash'), true);
assert.strictEqual(LampaYaniStreamResolver.isDirectVideoUrl('https://cdn.example/video/master.mpd?token=1'), true);

LampaYaniStreamResolver.resolve('https://player.aksor.tv/video/test-hash').then(function (result) {
    assert.strictEqual(result.source, 'aksor');
    assert.strictEqual(result.quality, '1080p');
    assert.strictEqual(result.url, 'https://cdn.example/video/1080.mpd');
    console.log('stream-resolver tests passed');
}).catch(function (error) {
    console.error(error);
    process.exitCode = 1;
});
