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
assert.match(ui, /function focusToolbar\(\)[\s\S]{0,500}collectionSet\(toolbarTrack\)/);
assert.match(ui, /controller\.down = function \(\)[\s\S]{0,900}collectionSet\(topButton\)/);
assert.match(css, /\.yani-catalog-toolbar[\s\S]{0,500}backdrop-filter/);
assert.match(css, /\.yani-catalog-top\s*\{[\s\S]{0,200}position:\s*absolute/);

['ru', 'en', 'uk'].forEach((language) => {
    ['catalog_sort_top', 'catalog_sort_new', 'catalog_sort_rating', 'catalog_sort_votes', 'catalog_sort_views', 'catalog_sort_title', 'catalog_sort_random', 'scroll_to_top'].forEach((key) => {
        assert.match(i18n, new RegExp(`messages\\.${language}\\.${key}\\s*=`));
    });
});

console.log('catalog controls contract checks passed');
