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

    function timestampMilliseconds(value) {
        var timestamp = Number(value || 0);
        if (!timestamp) return 0;
        return timestamp < 100000000000 ? timestamp * 1000 : timestamp;
    }

    function titleOf(item) {
        item = item || {};
        return item.title || item.anime_title || item.title_ru || item.name || item.title_en || item.title_original ||
            item.anime && titleOf(item.anime) || '';
    }

    function scheduleInsight(payload, now) {
        var items = payload && payload.response !== undefined ? payload.response : payload;
        items = Array.isArray(items) ? items : items && (items.items || items.data) || [];
        now = Number(now || Date.now());
        var today = new Date(now);
        var dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
        var dayEnd = dayStart + 86400000;
        var releases = [];
        var seen = {};

        items.forEach(function (item) {
            var episodes = item && item.episodes || {};
            [
                {value: episodes.prev_date, aired: true},
                {value: episodes.next_date, aired: false}
            ].forEach(function (release) {
                var timestamp = timestampMilliseconds(release.value);
                if (!timestamp) return;
                var key = String(item.anime_id || item.id || titleOf(item)) + ':' + timestamp;
                if (seen[key]) return;
                seen[key] = true;
                releases.push({
                    title: titleOf(item),
                    timestamp: timestamp,
                    episode: release.aired ? Number(episodes.aired || 0) : Number(episodes.aired || 0) + 1,
                    total: Number(episodes.count || 0),
                    aired: release.aired
                });
            });
        });
        releases.sort(function (a, b) { return a.timestamp - b.timestamp; });
        var upcoming = releases.filter(function (release) { return release.timestamp >= now; });
        var preview = upcoming[0] || releases[releases.length - 1] || null;
        return {
            today: releases.filter(function (release) { return release.timestamp >= dayStart && release.timestamp < dayEnd; }).length,
            preview: preview
        };
    }

    function translationInsight(payload) {
        var value = response(payload);
        var videos = Array.isArray(value.new_videos) ? value.new_videos.slice() : [];
        videos.sort(function (a, b) { return Number(b && b.date || 0) - Number(a && a.date || 0); });
        var video = videos[0] || null;
        if (!video) return {count: 0, preview: null};
        return {
            count: uniqueCount(videos, function (item) {
                return item.anime_id || item.animeId || item.anime && (item.anime.anime_id || item.anime.id);
            }),
            preview: {
                title: titleOf(video),
                episode: video.ep_title || video.episode_title || video.episode || video.number || '',
                dubbing: video.dub_title || video.dubbing || '',
                source: video.player_title || video.player || ''
            }
        };
    }

    function listCounts(payload) {
        var value = response(payload);
        var names = ['watching', 'planned', 'completed', 'dropped', 'favorites', 'postponed'];
        var result = {watching: 0, planned: 0, completed: 0, dropped: 0, favorites: 0, postponed: 0};
        var items = Array.isArray(value) ? value : value && (value.items || value.data || value.lists);

        if (!Array.isArray(items) && value && typeof value === 'object') {
            names.forEach(function (name, id) {
                var direct = value[name];
                if (direct === undefined) direct = value[id];
                if (direct !== undefined) result[name] = Math.max(0, Number(direct && (direct.count || direct.total) || direct) || 0);
            });
            return result;
        }

        (items || []).forEach(function (item) {
            item = item || {};
            var list = item.list || {};
            var id = Number(item.list_id !== undefined ? item.list_id : list.id !== undefined ? list.id : item.id);
            if (id < 0 || id >= names.length) return;
            var count = item.count;
            if (count === undefined) count = item.anime_count;
            if (count === undefined) count = item.items_count;
            if (count === undefined) count = item.total;
            if (count === undefined && Array.isArray(item.items)) count = item.items.length;
            result[names[id]] = Math.max(0, Number(count) || 0);
        });
        return result;
    }

    function personalInsight(continuing, account, stats) {
        continuing = Array.isArray(continuing) ? continuing.slice() : [];
        continuing.sort(function (a, b) { return Number(b && b.updated_at || 0) - Number(a && a.updated_at || 0); });
        var lists = listCounts(stats);
        var total = lists.watching + lists.planned + lists.completed + lists.dropped + lists.postponed;
        var tracked = lists.watching + lists.planned + lists.postponed;
        return {
            continue_count: continuing.length,
            continue_preview: continuing[0] || null,
            account_name: account && (account.display_name || account.login) || '',
            lists: lists,
            list_total: total,
            tracked_total: tracked
        };
    }

    function load(feed) {
        return feed().then(counts);
    }

    function dashboard(options) {
        options = options || {};
        var feedRequest = options.feed ? options.feed().catch(function () { return null; }) : Promise.resolve(null);
        var scheduleRequest = options.schedule ? options.schedule().catch(function () { return null; }) : Promise.resolve(null);
        return Promise.all([feedRequest, scheduleRequest]).then(function (result) {
            return {
                counts: counts(result[0]),
                schedule: scheduleInsight(result[1], options.now),
                translations: translationInsight(result[0])
            };
        });
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.HomeInsights = window.LampaYaniHomeInsights = {
        counts: counts,
        load: load,
        dashboard: dashboard,
        scheduleInsight: scheduleInsight,
        translationInsight: translationInsight,
        listCounts: listCounts,
        personalInsight: personalInsight,
        timestampMilliseconds: timestampMilliseconds,
        uniqueCount: uniqueCount
    };
}(window));
