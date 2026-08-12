const assert = require('assert');
const fs = require('fs');

const config = fs.readFileSync('src/config.js', 'utf8');
const root = fs.readFileSync('README.md', 'utf8');
const ru = fs.readFileSync('docs/README.ru.md', 'utf8');
const en = fs.readFileSync('docs/README.en.md', 'utf8');
const version = (config.match(/version:\s*'([^']+)'/) || [])[1];

assert.ok(version, 'config version must be present');
[root, ru, en].forEach((document) => {
    assert.match(document, new RegExp('dist/index\\.js\\?v=' + version.replace(/\./g, '\\.')));
});
assert.match(ru, /русским, английским и украинским языками/);
assert.match(en, /Russian, English and Ukrainian extension interface/);
assert.match(ru, /Доступные переводы/);
assert.match(en, /Available translations panel/);
assert.match(ru, /src\/ui-detail\.js/);
assert.match(en, /src\/ui-detail\.js/);

console.log('documentation sync contract checks passed');
