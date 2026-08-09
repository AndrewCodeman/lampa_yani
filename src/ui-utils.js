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

    function internalPlayerItem(item) {
        item = item || {};
        var url = normalizeVideoUrl(item.url);
        if (!url) return null;
        var result = {
            title: String(item.title || 'YummyAnime'),
            url: url,
            time: Math.max(0, Number(item.time || 0)),
            isonline: true
        };
        if (item.quality && typeof item.quality === 'object') result.quality = item.quality;
        if (item.headers && typeof item.headers === 'object') result.headers = item.headers;
        if (item.poster) result.poster = item.poster;
        return result;
    }

    function detailRouteId(activity) {
        activity = activity || {};
        var candidates = [activity, activity.card, activity.object, activity.data, activity.movie];
        var result = '';

        candidates.some(function (candidate) {
            if (!candidate || typeof candidate !== 'object') return false;
            var anime = candidate.anime && typeof candidate.anime === 'object' ? candidate.anime : {};
            var value = candidate.yani_id || candidate.anime_id || candidate.animeId ||
                anime.yani_id || anime.anime_id || anime.animeId;
            if (value === undefined || value === null || value === '' || value === 'undefined') return false;
            result = String(value);
            return true;
        });

        if (result) return result;

        var route = String(activity.url || activity.route || '');
        var match = route.match(/(?:^|\/)yani\/detail\/([^/?#]+)/i);
        if (match && match[1]) {
            try { result = decodeURIComponent(match[1]); } catch (error) { result = match[1]; }
        }

        if (!result && activity.component === 'yani_detail' && activity.id !== undefined && activity.id !== null && activity.id !== '' && activity.id !== 'undefined') {
            result = String(activity.id);
        }
        return result;
    }

    function positiveNumber(value) {
        value = Number(value);
        return isFinite(value) && value > 0 ? value : 0;
    }

    function explicitSeasonCount(item) {
        var seasons = item && (item.yani_seasons || item.seasons);
        if (Array.isArray(seasons)) return seasons.length;
        return positiveNumber(item && (item.yani_seasons_count || item.seasons_count || item.season_count));
    }

    function median(values) {
        values = values.slice().sort(function (a, b) { return a - b; });
        if (!values.length) return 0;
        var middle = Math.floor(values.length / 2);
        return values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
    }

    function detailEpisodeStats(item, videos, localPlayback) {
        item = item || {};
        videos = Array.isArray(videos) ? videos : [];
        var episodes = item.yani_episodes || item.episodes || {};
        var stats = {
            seasons: explicitSeasonCount(item),
            total: positiveNumber(episodes.count || episodes.total || item.episodes_count),
            aired: positiveNumber(episodes.aired || episodes.released || item.episodes_aired),
            watched: 0,
            minutes: 0
        };
        var grouped = {};

        videos.forEach(function (video, index) {
            video = video || {};
            var number = video.number !== undefined && video.number !== null && video.number !== '' ? String(video.number) :
                video.index !== undefined && video.index !== null && video.index !== '' ? String(video.index) : 'video:' + String(video.video_id || video.id || index);
            var episode = grouped[number] || (grouped[number] = {durations: [], watched: false});
            var duration = positiveNumber(video.duration);
            // YummyAnime video durations are seconds. Ignore implausibly short
            // and long values before calculating one representative duration
            // per episode, so duplicate dubbings do not skew the average.
            if (duration >= 60 && duration <= 4 * 60 * 60) episode.durations.push(duration);
            if (positiveNumber(video.watched && video.watched.end_time) > 0) episode.watched = true;
        });

        if (localPlayback && localPlayback.number !== undefined && localPlayback.number !== null && positiveNumber(localPlayback.time) > 0) {
            var localNumber = String(localPlayback.number || 'local');
            var localEpisode = grouped[localNumber] || (grouped[localNumber] = {durations: [], watched: false});
            localEpisode.watched = true;
            var localDuration = positiveNumber(localPlayback.duration);
            if (localDuration >= 60 && localDuration <= 4 * 60 * 60) localEpisode.durations.push(localDuration);
        }

        var episodeKeys = Object.keys(grouped);
        var durations = [];
        episodeKeys.forEach(function (key) {
            var episode = grouped[key];
            if (episode.watched) stats.watched += 1;
            var representative = median(episode.durations);
            if (representative > 0) durations.push(representative);
        });
        if (!stats.aired && episodeKeys.length) stats.aired = episodeKeys.length;
        if (!stats.total && stats.aired) stats.total = stats.aired;
        if (durations.length) {
            stats.minutes = Math.max(1, Math.round(durations.reduce(function (sum, value) { return sum + value; }, 0) / durations.length / 60));
        } else {
            var fallbackDuration = positiveNumber(item.yani_episode_duration || item.episode_duration || item.duration);
            if (fallbackDuration) stats.minutes = Math.max(1, Math.round(fallbackDuration > 300 ? fallbackDuration / 60 : fallbackDuration));
        }
        return stats;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.UiUtils = window.LampaYaniUiUtils = {
        videoData: videoData,
        normalizeVideoUrl: normalizeVideoUrl,
        videoHost: videoHost,
        titleValues: titleValues,
        normalizeMatchTitle: normalizeMatchTitle,
        standardSearchTitles: standardSearchTitles,
        yummyTvDetailsUrl: yummyTvDetailsUrl,
        internalPlayerItem: internalPlayerItem,
        detailRouteId: detailRouteId,
        detailEpisodeStats: detailEpisodeStats
    };
}(window));
