const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('src/ui-menu.js', 'utf8');
const ui = fs.readFileSync('src/ui.js', 'utf8');
const build = fs.readFileSync('build.js', 'utf8');

assert.match(build, /src\/ui-menu\.js/);
assert.match(ui, /LampaYaniMenu\.create/);
assert.match(ui, /sidebar\.start\(Lampa\.Listener\)/);
assert.match(ui, /Sidebar registration failed/);
assert.match(ui, /Lampa\.Component\.add\('yani_home', Home\)[\s\S]*sidebar\.start/);
assert.match(source, /listener\.follow\('menu'/);
assert.match(source, /data-action="' \+ action \+ '"/);
assert.match(source, /list\.append\(item\)/);
assert.match(source, /Sidebar item failed/);
assert.doesNotMatch(ui, /if \(!Lampa\.Menu \|\| !Lampa\.Menu\.addButton\) return/);
assert.doesNotMatch(ui, /Lampa\.Menu\.addButton\(yummyIcon/);

const context = {window: {}};
vm.runInNewContext(source, context);
const Menu = context.window.LampaYaniMenu;

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

assert.strictEqual(Menu.ACTION, 'yummyanime');
assert.strictEqual(Menu.TITLE, 'YummyAnime');
assert.deepStrictEqual(clone(Menu.asList([' Расписание ', '', 'YummyAnime'])), ['Расписание', 'YummyAnime']);
assert.deepStrictEqual(clone(Menu.asList('["Shots","IPTV"]')), ['Shots', 'IPTV']);
assert.deepStrictEqual(clone(Menu.ensureListed(['Расписание', 'Shots'], 'YummyAnime')), ['Расписание', 'Shots', 'YummyAnime']);
assert.deepStrictEqual(clone(Menu.ensureListed(['YummyAnime', 'Shots'], 'YummyAnime')), ['YummyAnime', 'Shots']);
assert.strictEqual(Menu.isHidden(['Anime', 'Shots'], 'YummyAnime'), false, 'hiding Anime must not hide YummyAnime');
assert.strictEqual(Menu.isHidden(['YummyAnime'], 'YummyAnime'), true);
assert.strictEqual(
    Menu.insertBeforeTitle(
        ['Главная', 'Расписание', 'YummyAnime', 'Shots', 'IPTV'],
        ['Главная', 'Расписание', 'Shots', 'IPTV', 'YummyAnime'],
        'YummyAnime'
    ),
    'Shots',
    'saved order must place YummyAnime before Shots even if it was appended last'
);
assert.strictEqual(
    Menu.insertBeforeTitle(['Anime', 'YummyAnime', 'Shots'], ['Anime', 'Shots', 'YummyAnime'], 'YummyAnime'),
    'Shots',
    'exact title match must not treat YummyAnime as Anime'
);

function fakeList(labels) {
    const nodes = labels.map(function (label, index) {
        return {
            label: label,
            action: label === 'YummyAnime' ? 'yummyanime' : '',
            hidden: false,
            index: index
        };
    });
    function children() {
        return {
            each: function (fn) {
                nodes.forEach(function (node, index) { fn.call(node, index); });
            }
        };
    }
    return {nodes: nodes, length: 1, children: children, append: function (item) {
        var node = item && item[0] ? item[0] : item;
        const index = nodes.indexOf(node);
        if (index >= 0) nodes.splice(index, 1);
        nodes.push(node);
    }};
}

function fake$(list) {
    function wrap(value) {
        const items = Object.prototype.toString.call(value) === '[object Array]' ? value : (value ? [value] : []);
        const jq = {
            length: items.length,
            eq: function (index) { return wrap(items[index]); },
            attr: function (name, next) {
                if (arguments.length > 1) {
                    items.forEach(function (item) { item[name === 'data-action' ? 'action' : name] = next; });
                    return jq;
                }
                return items[0] && items[0].action;
            },
            on: function () { return jq; },
            parent: function () { return list; },
            find: function () {
                var label = items[0] ? items[0].label : '';
                return {
                    eq: function () { return {text: function () { return label; }}; },
                    first: function () { return {text: function () { return label; }}; },
                    text: function () { return label; }
                };
            },
            each: function (fn) { items.forEach(function (item, index) { fn.call(item, index); }); return jq; },
            add: function (node) { return wrap(items.concat([node])); },
            slice: function (start) { return wrap(items.slice(start)); },
            remove: function () {
                items.forEach(function (item) {
                    const index = list.nodes.indexOf(item);
                    if (index >= 0) list.nodes.splice(index, 1);
                });
                return jq;
            },
            insertBefore: function (node) {
                items.forEach(function (item) {
                    const from = list.nodes.indexOf(item);
                    if (from >= 0) list.nodes.splice(from, 1);
                    list.nodes.splice(list.nodes.indexOf(node), 0, item);
                });
                return jq;
            },
            toggleClass: function (name, on) {
                items.forEach(function (item) { item.hidden = Boolean(on); });
                return jq;
            }
        };
        jq[0] = items[0];
        return jq;
    }
    const api = function (selector) {
        if (typeof selector === 'string' && selector.indexOf('<li') === 0) {
            return wrap({label: 'YummyAnime', action: 'yummyanime', hidden: false});
        }
        if (selector === '.menu__item[data-action="yummyanime"]') {
            return wrap(list.nodes.filter(function (node) { return node.action === 'yummyanime'; }));
        }
        if (selector === '.menu .menu__list .menu__item') return wrap(list.nodes);
        if (selector && typeof selector === 'object') return wrap(selector);
        return wrap();
    };
    api.fn = {};
    return api;
}

const list = fakeList(['Главная', 'Расписание', 'Shots', 'IPTV']);
const storage = {
    sort: ['Главная', 'Расписание', 'YummyAnime', 'Shots', 'IPTV'],
    hide: ['Shots'],
    get: function (key) { return key === 'menu_hide' ? storage.hide : storage.sort; },
    set: function (key, value) { if (key === 'menu_sort') storage.sort = value; }
};
const sidebar = Menu.create({
    $: fake$(list),
    Storage: storage,
    restoreDelay: 0,
    maxAttempts: 0,
    setTimeout: function () { return 0; },
    clearTimeout: function () {},
    listRoot: function () { return list; }
});

assert.strictEqual(sidebar.add(), true);
assert.deepStrictEqual(list.nodes.map(function (node) { return node.label; }), ['Главная', 'Расписание', 'YummyAnime', 'Shots', 'IPTV']);
assert.strictEqual(list.nodes[2].hidden, false);
assert.strictEqual(sidebar.add(), true, 'a second add must not create another sidebar item');
assert.strictEqual(list.nodes.filter(function (node) { return node.label === 'YummyAnime'; }).length, 1);

storage.hide = ['YummyAnime'];
sidebar.restore();
assert.strictEqual(list.nodes[2].hidden, true);

const empty = fakeList([]);
empty.length = 0;
const waiting = Menu.create({
    $: fake$(empty),
    Storage: storage,
    restoreDelay: 0,
    maxAttempts: 0,
    setTimeout: function () { return 0; },
    clearTimeout: function () {},
    listRoot: function () { return empty; }
});
assert.strictEqual(waiting.add(), false, 'must wait until the Lampa menu list exists');
assert.strictEqual(empty.nodes.length, 0);

const broken = Menu.create({
    $: function () { throw new Error('html is undefined'); },
    Storage: storage,
    restoreDelay: 0,
    maxAttempts: 0,
    setTimeout: function () { return 0; },
    clearTimeout: function () {},
    listRoot: function () { return list; }
});
assert.strictEqual(broken.add(), false, 'menu DOM errors must not throw out of add()');

console.log('sidebar menu contract tests passed');
