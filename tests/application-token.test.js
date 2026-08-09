const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

let stored = '';
const context = {
    window: {},
    Lampa: {
        Storage: {
            get: (key, fallback) => key === 'yani_public_application_token' ? stored || fallback : fallback,
            set: (key, value) => { if (key === 'yani_public_application_token') stored = value; }
        }
    }
};
context.window.Lampa = context.Lampa;
vm.runInNewContext(fs.readFileSync('src/config.js', 'utf8'), context);

const config = context.window.LampaYaniConfig;
assert.strictEqual(config.applicationToken(), config.defaultApplicationToken);
assert.strictEqual(config.customApplicationToken(), '');
assert.strictEqual(config.setApplicationToken('custom_public-key_123'), true);
assert.strictEqual(config.applicationToken(), 'custom_public-key_123');
assert.strictEqual(config.customApplicationToken(), 'custom_public-key_123');
assert.strictEqual(config.setApplicationToken('bad key with spaces'), false);
assert.strictEqual(config.applicationToken(), 'custom_public-key_123');
assert.strictEqual(config.setApplicationToken(''), true);
assert.strictEqual(config.applicationToken(), config.defaultApplicationToken);

const api = fs.readFileSync('src/api.js', 'utf8');
const auth = fs.readFileSync('src/auth.js', 'utf8');
assert.match(api, /config\.applicationToken \? config\.applicationToken\(\)/);
assert.match(auth, /function applicationToken\(\)/);
assert.doesNotMatch(auth, /'X-Application': LampaYaniConfig\.applicationHeader/);

console.log('application token tests passed');
