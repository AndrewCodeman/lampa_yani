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
    if (String(url).indexOf('rutube.ru/api/play/options/70e53a86c25f5dab63d1b1151bb8c619') >= 0) {
        return {
            ok: true,
            text: async function () {
                return JSON.stringify({video_balancer: {m3u8: 'https://bl.rutube.ru/route/master.m3u8?token=1'}});
            }
        };
    }
    if (String(url).indexOf('bl.rutube.ru/route/master.m3u8') >= 0) {
        return {
            ok: true,
            text: async function () {
                return '#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=900000,RESOLUTION=640x360\n360/index.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=3000000,RESOLUTION=1920x1080\nhttps://cdn.rutube.test/1080/index.m3u8';
            }
        };
    }
    throw new Error('Unexpected request: ' + url);
};

eval(fs.readFileSync(require.resolve('../src/stream-resolver.js'), 'utf8'));

assert.strictEqual(LampaYaniStreamResolver.canResolve('https://player.aksor.tv/video/test-hash'), true);
assert.strictEqual(LampaYaniStreamResolver.canResolve('https://video.sibnet.ru/shell.php?videoid=1502426'), true);
assert.strictEqual(LampaYaniStreamResolver.canResolve('https://rutube.ru/play/embed/70e53a86c25f5dab63d1b1151bb8c619'), true);
assert.strictEqual(LampaYaniStreamResolver.isDirectVideoUrl('https://cdn.example/video/master.mpd?token=1'), true);

Promise.all([
    LampaYaniStreamResolver.resolve('https://player.aksor.tv/video/test-hash'),
    LampaYaniStreamResolver.resolve('https://video.sibnet.ru/shell.php?videoid=1502426'),
    LampaYaniStreamResolver.resolve('https://rutube.ru/play/embed/70e53a86c25f5dab63d1b1151bb8c619')
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
    var rutube = results[2];
    assert.strictEqual(rutube.source, 'rutube');
    assert.strictEqual(rutube.quality, '1080p');
    assert.strictEqual(rutube.qualities['360p'], 'https://bl.rutube.ru/route/360/index.m3u8');
    assert.strictEqual(rutube.url, 'https://cdn.rutube.test/1080/index.m3u8');
    assert.strictEqual(rutube.headers.Origin, 'https://rutube.ru');
    console.log('stream-resolver tests passed');
}).catch(function (error) {
    console.error(error);
    process.exitCode = 1;
});
