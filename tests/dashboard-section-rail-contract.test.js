const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(ui, /yani-home__section-rail/);
assert.match(ui, /button\.data\('yani-home-group', item\.group \|\| 'explore'\)/);
assert.match(ui, /function setSectionRail\(group\)/);
assert.match(ui, /setSectionRail\(String\(button\.data\('yani-home-group'\)/);
assert.match(ui, /yani-home__section-rail-node--active/);
assert.match(ui, /yani-home__section-rail-node--passed/);
assert.doesNotMatch(ui, /yani-home__section-rail[^\n]+selector/);
assert.match(css, /\.yani-home__section-rail\s*\{[^}]+pointer-events: none/);
assert.match(css, /\.yani-home__section-rail-node--active b/);
assert.match(css, /\.yani-home--reduced-motion \.yani-home__section-rail \{[^}]+backdrop-filter: none/);
assert.match(css, /@media \(min-width: 701px\) and \(max-width: 1100px\)[\s\S]+\.yani-home__section-rail \{ display: none; \}/);

console.log('dashboard section rail contract checks passed');
