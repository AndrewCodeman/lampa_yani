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
assert.match(source, /yani-detail__recommendation selector[\s\S]{0,900}hover:focus'[\s\S]{0,220}keepHorizontalFocusVisible\(list, row\)/);
assert.match(source, /function keepHorizontalFocusVisible\(container, element\)[\s\S]{0,900}viewport\.scrollLeft = targetRight - viewport\.clientWidth \+ padding/);
assert.match(source, /function appendDetailNavigation\(container\)/);
assert.match(source, /enabled\.controller\.yaniDetailOwner !== detailComponent/);
assert.match(source, /Lampa\.Controller\.collectionAppend\(targets\)/);
assert.match(source, /loadDetailRecommendations\(data, info, bindDetailScrollTargets, appendDetailNavigation\)/);
assert.match(source, /if \(appendNavigation\) appendNavigation\(row\)/);
assert.match(source, /appendDetailNavigation\(empty\)/);
assert.match(source, /appendDetailNavigation\(errorRow\)/);
assert.match(source, /yaniDetailOwner: detailComponent/);
assert.match(source, /this\.destroy = function \(\) \{ destroyed = true/);

console.log('detail restore contract tests passed');
