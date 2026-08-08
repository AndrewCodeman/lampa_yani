(function (window) {
    'use strict';

    function videoData(video) {
        var value = video && video.data;
        if (!value) return {};
        if (typeof value === 'object') return value;
        if (typeof value === 'string') {
            try { return JSON.parse(value) || {}; } catch (error) { return {}; }
        }
        return {};
    }

    function normalizeVideoUrl(url) {
        if (!url) return '';
        url = String(url).trim();
        if (url.indexOf('//') === 0) url = 'https:' + url;
        if (/^http:\/\/(?:www\.)?kodik\./i.test(url)) url = 'https://' + url.slice(7);
        return url;
    }

    function videoHost(url) {
        try { return new URL(url).hostname.replace(/^www\./, ''); } catch (error) { return ''; }
    }

    function titleValues(item) {
        var values = [];
        var add = function (value) { if (typeof value === 'string' && value.trim() && values.indexOf(value.trim()) < 0) values.push(value.trim()); };
        ['title', 'name', 'russian', 'english', 'original_title', 'original_name', 'japanese', 'romaji', 'synonym'].forEach(function (key) { add(item && item[key]); });
        // YummyAnime keeps the most useful international aliases in
        // `other_titles` (for example, "Наруто" -> "NARUTO", "ナルト").
        // Include it together with the generic alias fields so both native
        // Lampa and YummyAnime searches can resolve the same title.
        ['aliases', 'alternative_titles', 'alternative_names', 'other_titles', 'titles', 'synonyms', 'names'].forEach(function (key) {
            var list = item && item[key];
            if (Array.isArray(list)) list.forEach(function (value) { add(typeof value === 'string' ? value : value && (value.title || value.name || value.value)); });
        });
        return values;
    }

    function normalizeMatchTitle(value) { return String(value || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/gi, ' ').trim(); }

    function standardSearchTitles(card) {
        var result = [], values = titleValues(card || {});
        if (card && Array.isArray(card.yani_titles)) values = values.concat(card.yani_titles);
        values.forEach(function (title) {
            if (result.indexOf(title) < 0) result.push(title);
            var withoutYear = String(title).replace(/\s*[\(\[]?\s*\d{4}\s*[\)\]]?\s*$/i, '').trim();
            if (withoutYear && result.indexOf(withoutYear) < 0) result.push(withoutYear);
        });
        return result;
    }

    function yummyTvDetailsUrl(animeId) {
        var id = Number(animeId);
        if (!isFinite(id) || id <= 0) return '';
        return 'yummytv://details/' + Math.floor(id);
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.UiUtils = window.LampaYaniUiUtils = {
        videoData: videoData,
        normalizeVideoUrl: normalizeVideoUrl,
        videoHost: videoHost,
        titleValues: titleValues,
        normalizeMatchTitle: normalizeMatchTitle,
        standardSearchTitles: standardSearchTitles,
        yummyTvDetailsUrl: yummyTvDetailsUrl
    };
}(window));
