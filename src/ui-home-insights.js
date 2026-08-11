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

    function posterOf(item) {
        item = item || {};
        var poster = item.poster || item.image || item.img || '';
        if (!poster && item.anime) return posterOf(item.anime);
        if (poster && typeof poster === 'object') poster = poster.medium || poster.big || poster.mega || poster.fullsize || poster.full || poster.small || '';
        poster = String(poster || '');
        return poster.indexOf('//') === 0 ? 'https:' + poster : poster;
    }

    function episodeNumber(value) {
        if (typeof value === 'number') return value;
        var match = String(value || '').match(/(\d+(?:\.\d+)?)/);
        return match ? Number(match[1]) : 0;
    }

    function scheduleReleases(payload) {
        var items = payload && payload.response !== undefined ? payload.response : payload;
        items = Array.isArray(items) ? items : items && (items.items || items.data) || [];
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
                var animeId = item.anime_id || item.id || '';
                var key = String(animeId || titleOf(item)) + ':' + timestamp;
                if (seen[key]) return;
                seen[key] = true;
                releases.push({
                    anime_id: animeId,
                    title: titleOf(item),
                    poster: posterOf(item),
                    timestamp: timestamp,
                    episode: release.aired ? Number(episodes.aired || 0) : Number(episodes.aired || 0) + 1,
                    total: Number(episodes.count || 0),
                    aired: release.aired
                });
            });
        });
        return releases.sort(function (a, b) { return a.timestamp - b.timestamp; });
    }

    function translationEntries(payload) {
        var value = response(payload);
        return (Array.isArray(value.new_videos) ? value.new_videos : []).map(function (video) {
            return {
                anime_id: video.anime_id || video.animeId || video.anime && (video.anime.anime_id || video.anime.id) || '',
                title: titleOf(video),
                poster: posterOf(video),
                episode: episodeNumber(video.episode || video.number || video.ep_title || video.episode_title),
                episode_label: video.ep_title || video.episode_title || video.episode || video.number || '',
                dubbing: video.dub_title || video.dubbing || '',
                source: video.player_title || video.player || '',
                timestamp: timestampMilliseconds(video.date || video.updated_at || video.created_at)
            };
        }).sort(function (a, b) { return Number(b.timestamp || 0) - Number(a.timestamp || 0); });
    }

    function scheduleInsight(payload, now) {
        now = Number(now || Date.now());
        var today = new Date(now);
        var dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
        var dayEnd = dayStart + 86400000;
        var releases = scheduleReleases(payload);
        var upcoming = releases.filter(function (release) { return release.timestamp >= now; });
        var preview = upcoming[0] || releases[releases.length - 1] || null;
        return {
            today: releases.filter(function (release) { return release.timestamp >= dayStart && release.timestamp < dayEnd; }).length,
            preview: preview
        };
    }

    function translationInsight(payload) {
        var videos = translationEntries(payload);
        var video = videos[0] || null;
        if (!video) return {count: 0, preview: null};
        return {
            count: uniqueCount(videos, function (item) {
                return item.anime_id;
            }),
            preview: {
                title: titleOf(video),
                episode: video.episode_label || video.episode || '',
                dubbing: video.dubbing || '',
                source: video.source || '',
                poster: video.poster || ''
            }
        };
    }

    function episodeFlow(schedulePayload, feedPayload, now) {
        now = Number(now || Date.now());
        var releases = scheduleReleases(schedulePayload);
        var videos = translationEntries(feedPayload);
        var upcoming = releases.filter(function (release) { return release.timestamp >= now; });
        var aired = releases.filter(function (release) { return release.aired && release.timestamp <= now; }).sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });

        function translated(release) {
            return videos.some(function (video) {
                if (!release.anime_id || String(video.anime_id) !== String(release.anime_id)) return false;
                return !release.episode || !video.episode || Number(video.episode) === Number(release.episode);
            });
        }

        var pending = aired.filter(function (release) { return !translated(release); })[0] || null;
        var latestAired = aired[0] || null;
        return {
            japan: upcoming[0] || releases[releases.length - 1] || null,
            waiting: pending ? Object.assign({status: 'waiting'}, pending) : latestAired ? Object.assign({status: translated(latestAired) ? 'ready' : 'waiting'}, latestAired) : null,
            available: videos[0] ? Object.assign({status: 'ready'}, videos[0]) : null
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

    function notificationCount(payload) {
        var value = response(payload);
        if (!value || typeof value !== 'object') return Math.max(0, Number(value) || 0);
        var nested = value.notifications && typeof value.notifications === 'object' ? value.notifications : {};
        var explicit = value.unread_count;
        if (explicit === undefined) explicit = value.unread;
        if (explicit === undefined) explicit = value.count;
        if (explicit === undefined) explicit = nested.unread_count;
        if (explicit === undefined) explicit = nested.unread;
        if (explicit === undefined) explicit = nested.count;
        if (explicit !== undefined) return Math.max(0, Number(explicit) || 0);
        return Object.keys(value).reduce(function (sum, key) {
            return sum + (typeof value[key] === 'number' ? Math.max(0, value[key]) : 0);
        }, 0);
    }

    function dashboardPriority(options) {
        options = options || {};
        if (Number(options.continue_count || 0) > 0) return {key: 'continue_watching', label: 'continue_now'};
        if (Number(options.notification_count || 0) > 0) return {key: 'notifications', label: 'notifications_new'};
        if (options.has_translation) return {key: 'new_translations', label: 'fresh_translation'};
        return options.authorized ? {key: 'for_you', label: 'recommended_now'} : {key: 'catalog', label: 'start_catalog'};
    }

    function load(feed) {
        return feed().then(counts);
    }

    function dashboard(options) {
        options = options || {};
        function settle(request) {
            if (!request) return Promise.resolve({ok: false, data: null});
            try {
                return request().then(function (data) { return {ok: true, data: data}; }).catch(function () { return {ok: false, data: null}; });
            } catch (error) { return Promise.resolve({ok: false, data: null}); }
        }
        var feedRequest = settle(options.feed);
        var scheduleRequest = settle(options.schedule);
        return Promise.all([feedRequest, scheduleRequest]).then(function (result) {
            var feed = result[0];
            var schedule = result[1];
            return {
                counts: counts(feed.data),
                schedule: scheduleInsight(schedule.data, options.now),
                translations: translationInsight(feed.data),
                episode_flow: episodeFlow(schedule.data, feed.data, options.now),
                service: {
                    api: feed.ok || schedule.ok,
                    degraded: feed.ok !== schedule.ok,
                    feed: feed.ok,
                    schedule: schedule.ok
                }
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
        episodeFlow: episodeFlow,
        scheduleReleases: scheduleReleases,
        translationEntries: translationEntries,
        listCounts: listCounts,
        personalInsight: personalInsight,
        notificationCount: notificationCount,
        dashboardPriority: dashboardPriority,
        posterOf: posterOf,
        timestampMilliseconds: timestampMilliseconds,
        uniqueCount: uniqueCount
    };
}(window));
