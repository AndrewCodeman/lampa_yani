const assert = require('assert');
const fs = require('fs');

const ui = fs.readFileSync('src/ui.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const i18n = fs.readFileSync('src/i18n.js', 'utf8');

assert.match(ui, /Lampa\.Component\.add\('yani_catalog', Catalog\)/);
assert.match(ui, /function Catalog\(object\)[\s\S]{0,2500}sort: 'top'[\s\S]{0,300}sort: 'year'[\s\S]{0,300}sort: 'rating'[\s\S]{0,300}sort: 'rating_counters'[\s\S]{0,300}sort: 'views'[\s\S]{0,300}sort: 'title'[\s\S]{0,300}sort: 'random'/);
assert.match(ui, /function changeSort\(definition\)[\s\S]{0,700}params\.sort = definition\.sort[\s\S]{0,500}Lampa\.Activity\.replace/);
assert.match(ui, /function scrollToTop\(\)[\s\S]{0,250}comp\.scroll\.reset\(\)[\s\S]{0,150}focusCards\(true\)/);
assert.match(ui, /comp\.on\('controller'/);
assert.match(ui, /function navigationCollection\(\)[\s\S]{0,350}comp\.render\(\)/);
assert.match(ui, /function syncNavigationCollection\(\)[\s\S]{0,700}toolbarTrack\[0\]\.querySelectorAll\('\.selector'\)[\s\S]{0,250}Navigator\.add\(element\)/);
assert.doesNotMatch(ui, /function syncNavigationCollection\(\)[\s\S]{0,700}Navigator\.setCollection/);
assert.match(ui, /controller\.yaniCatalogOwner === comp \|\| controller\.link === comp/);
assert.match(ui, /comp\.on\('toggle'[\s\S]{0,150}syncNavigationCollection/);
assert.match(ui, /comp\.on\('scroll'[\s\S]{0,150}syncNavigationCollection/);
assert.match(ui, /function patchCatalogController\(controller\)/);
assert.match(ui, /controller\.yaniCatalogOwner = comp/);
assert.match(ui, /var originalStart = comp\.start/);
assert.match(ui, /comp\.start = function \(\)[\s\S]{0,500}patchCatalogController\(enabled\.controller\)[\s\S]{0,150}syncNavigationCollection\(\)/);
assert.match(ui, /function focusToolbar\(preferred\)[\s\S]{0,900}syncNavigationCollection\(\)[\s\S]{0,150}collectionFocus\(target, collection, true\)/);
assert.match(ui, /toolbarTrack\.append\(topButton\)/);
assert.match(ui, /function toolbarTargetForCard\(card\)[\s\S]{0,1000}Math\.abs[\s\S]{0,400}return target/);
assert.match(ui, /function shouldEnterToolbarOnRight\(\)[\s\S]{0,2000}rightmostVisible === focused\[0\]/);
assert.match(ui, /visibleBeforeToolbar = rect\.left \+ rect\.width \/ 2 < toolbarRect\.left/);
assert.match(ui, /controller\.right = function \(\)[\s\S]{0,500}shouldEnterToolbarOnRight\(\)[\s\S]{0,160}focusToolbar\(toolbarTargetForCard\(focusedCard\)\)[\s\S]{0,180}Navigator\.canmove\('right'\)/);
assert.match(ui, /controller\.left = function \(\)[\s\S]{0,250}focusCards\(false\)/);
assert.match(css, /\.yani-catalog-toolbar[\s\S]{0,500}backdrop-filter/);
assert.match(css, /\.yani-catalog-toolbar\s*\{[\s\S]{0,250}position:\s*absolute[\s\S]{0,250}right:\s*\.8em/);
assert.match(css, /\.yani-catalog-toolbar__track\s*\{[\s\S]{0,180}flex-direction:\s*column/);
assert.match(css, /@media \(max-width: 700px\)[\s\S]{0,350}flex-direction:\s*row/);

['ru', 'en', 'uk'].forEach((language) => {
    ['catalog_sort_top', 'catalog_sort_new', 'catalog_sort_rating', 'catalog_sort_votes', 'catalog_sort_views', 'catalog_sort_title', 'catalog_sort_random', 'scroll_to_top'].forEach((key) => {
        assert.match(i18n, new RegExp(`messages\\.${language}\\.${key}\\s*=`));
    });
});

console.log('catalog controls contract checks passed');
