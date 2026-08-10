const assert = require('assert');
const fs = require('fs');

const source = fs.readFileSync('src/ui.js', 'utf8');

assert.match(source, /var routeId = LampaYaniUiUtils\.detailRouteId\(object\)/);
assert.match(source, /LampaYaniApi\.detail\(detailId\)/);
assert.match(source, /Lampa\.Activity\.replace\(\{url: 'yani', title: 'YummyAnime', component: 'yani_home'\}\)/);
assert.match(source, /component: 'yani_detail',[\s\S]{0,120}id: id,[\s\S]{0,80}yani_id: id/);
assert.match(source, /component: 'yani_detail',[\s\S]{0,160}id: yaniId,[\s\S]{0,80}yani_id: yaniId/);
assert.match(source, /click\.yaniOrder'[\s\S]{0,120}openYummyDetail\(related, false\)/);
assert.doesNotMatch(source, /click\.yaniOrder'[\s\S]{0,120}openYummyDetail\(related, true\)/);

console.log('detail restore contract tests passed');
