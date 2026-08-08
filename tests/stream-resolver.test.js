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
    if (String(url).indexOf('video.sibnet.ru/shell.php?videoid=1502426') >= 0) {
        return {
            ok: true,
            text: async function () {
                return '<script>player.src([{src: "/v/test-token/1502426.mp4", type: "video/mp4"}]);</script>';
            }
        };
    }
    throw new Error('Unexpected request: ' + url);
};

eval(fs.readFileSync(require.resolve('../src/stream-resolver.js'), 'utf8'));

assert.strictEqual(LampaYaniStreamResolver.canResolve('https://player.aksor.tv/video/test-hash'), true);
assert.strictEqual(LampaYaniStreamResolver.canResolve('https://video.sibnet.ru/shell.php?videoid=1502426'), true);
assert.strictEqual(LampaYaniStreamResolver.isDirectVideoUrl('https://cdn.example/video/master.mpd?token=1'), true);

Promise.all([
    LampaYaniStreamResolver.resolve('https://player.aksor.tv/video/test-hash'),
    LampaYaniStreamResolver.resolve('https://video.sibnet.ru/shell.php?videoid=1502426')
]).then(function (results) {
    var result = results[0];
    assert.strictEqual(result.source, 'aksor');
    assert.strictEqual(result.quality, '1080p');
    assert.strictEqual(result.url, 'https://cdn.example/video/1080.mpd');
    var sibnet = results[1];
    assert.strictEqual(sibnet.source, 'sibnet');
    assert.strictEqual(sibnet.url, 'https://video.sibnet.ru/v/test-token/1502426.mp4');
    assert.strictEqual(sibnet.headers.Referer, 'https://video.sibnet.ru/shell.php?videoid=1502426');
    assert.strictEqual(sibnet.headers.Origin, 'https://video.sibnet.ru');
    console.log('stream-resolver tests passed');
}).catch(function (error) {
    console.error(error);
    process.exitCode = 1;
});
