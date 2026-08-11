const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(ui, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
assert.match(ui, /navigatorInfo\.deviceMemory/);
assert.match(ui, /navigatorInfo\.hardwareConcurrency/);
assert.match(ui, /yani-home--reduced-motion/);
assert.match(ui, /yani-home--motion/);
assert.match(css, /@keyframes yani-home-reveal/);
assert.match(css, /@keyframes yani-home-wave-draw/);
assert.match(css, /@keyframes yani-home-pulse/);
assert.match(ui, /yani-home__waves/);
assert.match(ui, /yani-home__wave--far/);
assert.match(ui, /yani-home__wave--middle/);
assert.match(ui, /yani-home__wave--near/);
assert.ok(ui.indexOf("key: 'user_lists'") < ui.indexOf("key: 'top_rated'"), 'My Lists must be dashboard item 6');
assert.ok(ui.indexOf("key: 'notifications'") < ui.indexOf("key: 'account'"), 'Notifications must precede Account');
assert.ok(ui.indexOf("key: 'account'") < ui.indexOf("key: 'status'"), 'Status must be the last dashboard item');
assert.match(ui, /key: 'notifications'.*authorized: true/);
assert.match(css, /\.yani-home--motion \.yani-home__item\.focus::before/);
assert.match(css, /\.yani-home__item--for_you \.yani-home__icon/);
assert.match(css, /\.yani-home__item--updates \.yani-home__icon/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);

console.log('home motion contract checks passed');
