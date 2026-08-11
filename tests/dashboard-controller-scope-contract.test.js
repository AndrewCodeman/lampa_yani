const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const homeStart = ui.indexOf('function Home(object)');
const createStart = ui.indexOf('this.create = function ()', homeStart);
const controllerStart = ui.indexOf("Lampa.Controller.add('content'", createStart);

assert.ok(homeStart >= 0 && createStart > homeStart && controllerStart > createStart, 'Home lifecycle must be present');

const homeScope = ui.slice(homeStart, createStart);
const createScope = ui.slice(createStart, controllerStart);
const controllerScope = ui.slice(controllerStart, ui.indexOf('this.render = function', controllerStart));

assert.match(homeScope, /var renderIntroContext = function \(\) \{\};/);
assert.match(homeScope, /var updateEpisodeCountdown = function \(\) \{\};/);
assert.match(homeScope, /var currentEpisodeFlow;/);
assert.match(createScope, /renderIntroContext = function \(button\)/);
assert.match(createScope, /updateEpisodeCountdown = function \(release\)/);
assert.doesNotMatch(createScope, /function renderIntroContext\(/);
assert.doesNotMatch(createScope, /function updateEpisodeCountdown\(/);
assert.match(controllerScope, /renderIntroContext\(\$\(target\)\)/);

console.log('dashboard controller scope contract checks passed');
