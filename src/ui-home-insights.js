(function (window) {
    'use strict';

    function response(payload) {
        return payload && payload.response ? payload.response : payload || {};
    }

    function uniqueCount(items, id) {
        var seen = {};
        (items || []).forEach(function (item) {
            var value = id(item || {});
            if (value === null || typeof value === 'undefined' || value === '') return;
            var key = String(value);
            seen[key] = true;
        });
        return Object.keys(seen).length;
    }

    function counts(payload) {
        var value = response(payload);
        var releases = Array.isArray(value.new) ? value.new : [];
        var videos = Array.isArray(value.new_videos) ? value.new_videos : [];
        var collections = Array.isArray(value.collections) ? value.collections : [];
        return {
            new_releases: uniqueCount(releases, function (item) {
                return item.anime_id || item.animeId || item.id;
            }),
            new_translations: uniqueCount(videos, function (item) {
                return item.anime_id || item.animeId || item.anime && (item.anime.anime_id || item.anime.id);
            }),
            collections: uniqueCount(collections, function (item) {
                return item.collection_id || item.id || item.slug || item.title;
            })
        };
    }

    function load(feed) {
        return feed().then(counts);
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.HomeInsights = window.LampaYaniHomeInsights = {
        counts: counts,
        load: load,
        uniqueCount: uniqueCount
    };
}(window));
