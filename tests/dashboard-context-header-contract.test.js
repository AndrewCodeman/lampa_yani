const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(ui, /var renderIntroContext = function \(\) \{\};/);
assert.match(ui, /class="yani-home" data-yani-section="explore"/);
assert.match(ui, /renderIntroContext = function \(button\)/);
assert.match(ui, /button\.data\('yani-home-title', item\.title\)/);
assert.match(ui, /yani-home-insight-title/);
assert.match(ui, /yani-home-insight-meta/);
assert.match(ui, /yani-home-poster/);
assert.match(ui, /renderIntroContext\(\$\(target\)\)/);
assert.match(ui, /refreshIntroContext\(button\)/);
assert.match(ui, /html\.attr\('data-yani-section', activeGroup\)/);
assert.match(ui, /yani-home__ambient--episode_flow/);
assert.match(ui, /reducedMotion && !lowMemoryDevice && !lowCpuDevice/);
assert.match(css, /\.yani-home__intro-context-art--visible/);
assert.match(css, /data-yani-context="schedule"/);
assert.match(css, /data-yani-context="continue_watching"/);
assert.match(css, /data-yani-context="new_releases"/);
assert.match(css, /data-yani-section="library"/);
assert.match(css, /data-yani-section="discover"/);
assert.match(css, /\.yani-home--reduced-motion \.yani-home__intro-context-art \{ display: none; \}/);

console.log('dashboard context header contract checks passed');
