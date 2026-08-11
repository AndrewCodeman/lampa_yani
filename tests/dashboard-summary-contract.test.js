const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(ui, /yani-home__intro-summary/);
assert.match(ui, /label: t\('broadcasts_today'\)/);
assert.doesNotMatch(ui, /key: 'today', label: t\('today'\)/);
assert.match(ui, /setIntroMetric\('continue', continuing\.length, continueMetricDetail\(continuing\[0\]\)\)/);
assert.match(ui, /setIntroMetric\('today', schedule\.today, \[releaseTime, schedule\.preview\.title\]/);
assert.match(ui, /setIntroMetric\('translations', dashboard\.translations && dashboard\.translations\.count, \[translation\.title, translation\.dubbing\]/);
assert.match(ui, /function setIntroMetric\(key, value, detail\)/);
assert.match(ui, /yani-home__intro-metric-detail--visible/);
assert.match(ui, /function continueMetricDetail\(entry\)/);
assert.match(ui, /if \(!homeButtons\.schedule\) introMetrics\.today\.remove\(\)/);
assert.match(ui, /if \(!homeButtons\.new_translations\) introMetrics\.translations\.remove\(\)/);
assert.match(ui, /if \(!homeButtons\.continue_watching\) introMetrics\.continue\.remove\(\)/);
assert.doesNotMatch(ui, /yani-home__intro-metric[^\n]+selector/);
assert.match(css, /\.yani-home__intro-summary\s*\{/);
assert.match(css, /\.yani-home__intro-metric--ready/);
assert.match(css, /\.yani-home__intro-metric--active/);
assert.match(css, /\.yani-home__intro-metric-copy em\.yani-home__intro-metric-detail--visible/);
assert.match(css, /@media \(max-width: 700px\)[\s\S]+\.yani-home__intro-summary/);

console.log('dashboard summary contract checks passed');
