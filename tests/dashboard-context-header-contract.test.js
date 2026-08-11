const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(ui, /function renderIntroContext\(button\)/);
assert.match(ui, /button\.data\('yani-home-title', item\.title\)/);
assert.match(ui, /yani-home-insight-title/);
assert.match(ui, /yani-home-insight-meta/);
assert.match(ui, /yani-home-poster/);
assert.match(ui, /renderIntroContext\(\$\(target\)\)/);
assert.match(ui, /refreshIntroContext\(button\)/);
assert.match(ui, /reducedMotion && !lowMemoryDevice && !lowCpuDevice/);
assert.match(css, /\.yani-home__intro-context-art--visible/);
assert.match(css, /data-yani-context="schedule"/);
assert.match(css, /data-yani-context="continue_watching"/);
assert.match(css, /data-yani-context="new_releases"/);
assert.match(css, /\.yani-home--reduced-motion \.yani-home__intro-context-art \{ display: none; \}/);

console.log('dashboard context header contract checks passed');
