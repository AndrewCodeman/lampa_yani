(function (global) {
    'use strict';
    var cache = {}, order = [], limit = 200;
    function remember(key, value) {
        if (Object.prototype.hasOwnProperty.call(cache, key)) order = order.filter(function (item) { return item !== key; });
        cache[key] = value; order.push(key);
        while (order.length > limit) delete cache[order.shift()];
    }
    function titles(item) {
        var values = [], add = function (value) {
            value = typeof value === 'string' ? value.trim() : '';
            if (value && values.indexOf(value) < 0) values.push(value);
        };
        ['title', 'name', 'russian', 'english', 'original_title', 'original_name', 'japanese', 'romaji', 'synonym'].forEach(function (key) { add(item && item[key]); });
        ['aliases', 'alternative_titles', 'alternative_names', 'titles', 'synonyms', 'names'].forEach(function (key) {
            var list = item && item[key];
            if (Array.isArray(list)) list.forEach(function (value) { add(typeof value === 'string' ? value : value && (value.title || value.name || value.value)); });
        });
        return values.slice(0, 5);
    }
    function find(card) {
        var key = String(card && (card.yani_id || card.title) || '').toLowerCase();
        if (!key) return Promise.resolve('');
        if (cache[key]) return Promise.resolve(cache[key]);
        if (cache[key] === null) return Promise.resolve('');
        var ids = card.yani_remote_ids || {}, urls = [];
        if (ids.mal || ids.myanimelist) urls.push({url: 'https://api.jikan.moe/v4/anime/' + encodeURIComponent(ids.mal || ids.myanimelist) + '/full'});
        if (ids.shikimori) urls.push({url: 'https://shikimori.one/api/animes/' + encodeURIComponent(ids.shikimori) + '.json'});
        titles(card).forEach(function (title) { urls.push({url: 'https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(title) + '&limit=1'}); urls.push({url: 'https://graphql.anilist.co', query: title}); });
        function load(index) {
            if (index >= urls.length) { remember(key, null); return Promise.resolve(''); }
            var source = urls[index], ani = source.url === 'https://graphql.anilist.co';
            var request = ani ? fetch(source.url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({query: 'query ($search: String) { Page(perPage: 1) { media(search: $search, type: ANIME) { coverImage { extraLarge large } } } }', variables: {search: source.query}})}) : fetch(source.url);
            return request.then(function (response) { if (!response.ok) throw new Error('poster source ' + response.status); return response.json(); }).then(function (payload) {
                var item = ani && payload && payload.data && payload.data.Page ? payload.data.Page.media && payload.data.Page.media[0] : payload && payload.data ? (Array.isArray(payload.data) ? payload.data[0] : payload.data) : payload;
                var images = item && item.images || {};
                var poster = ani ? item && item.coverImage && (item.coverImage.extraLarge || item.coverImage.large) : images.jpg && (images.jpg.large_image_url || images.jpg.image_url) || images.webp && (images.webp.large_image_url || images.webp.image_url) || item && (item.poster || item.image);
                if (!poster) throw new Error('alternative poster is empty'); remember(key, poster); return poster;
            }).catch(function () { return load(index + 1); });
        }
        return urls.length ? load(0) : (remember(key, null), Promise.resolve(''));
    }
    function attach(element, card) {
        var render = card && card.render ? $(card.render(true)) : $(element), image = render.find('img').first(), box = render.find('.card__img').first();
        var apply = function (poster) { if (!poster) return; if (image.length) image.attr('src', poster); if (box.length) box.css('background-image', 'url("' + poster.replace(/"/g, '%22') + '")'); };
        var alternative = function () { find(card).then(apply); };
        if (image.length) image.off('error.yaniPoster').on('error.yaniPoster', alternative);
        if (!card.poster) return alternative();
        var probe = new Image(); probe.onload = function () {}; probe.onerror = alternative; probe.src = card.poster;
    }
    function bind(image, card) { image.off('error.yaniPoster').on('error.yaniPoster', function () { find(card).then(function (poster) { if (poster) image.attr('src', poster); }); }); if (!card.poster && !card.img) find(card).then(function (poster) { if (poster) image.attr('src', poster); }); }
    global.LampaYaniMedia = {findAlternativePoster: find, attachPosterFallback: attach, bindPosterFallback: bind};
}(window));
