(function (window) {
    'use strict';

    function recommended(object, deps) { var comp = new Lampa.InteractionCategory(object); comp.create = function () { var self = this, history = deps.history(), ids = Object.keys(history).sort(function (a, b) { return Number(history[b].updated_at || 0) - Number(history[a].updated_at || 0); }).slice(0, 3); this.activity.loader(true); if (!ids.length) return LampaYaniApi.catalog({limit: 30, sort: 'top', sort_forward: false}).then(function (payload) { self.build({results: LampaYaniApi.normalize(payload).map(deps.toCard), total_pages: 1, title: deps.t('for_you')}); }).catch(function () { self.build({results: [], total_pages: 1, title: deps.t('for_you')}); }); Promise.all(ids.map(function (id) { return LampaYaniApi.recommendations(id).then(LampaYaniApi.normalize).catch(function () { return []; }); })).then(function (rows) { var seen = {}, cards = []; rows.forEach(function (items) { items.forEach(function (item) { var card = deps.toCard(item), key = String(card.yani_id || card.title); if (!seen[key]) { seen[key] = true; cards.push(card); } }); }); self.build({results: cards.slice(0, 40), total_pages: 1, title: deps.t('for_you')}); }).catch(function () { self.build({results: [], total_pages: 1, title: deps.t('for_you')}); }); }; comp.cardRender = deps.cardRender; return comp; }
    function updates(object, deps) { var comp = new Lampa.InteractionCategory(object); comp.create = function () { var self = this; this.activity.loader(true); if (!LampaYaniAuth.token()) return self.build({results: [], total_pages: 1, title: deps.t('updates')}); LampaYaniApi.profile().then(function (payload) { var profile = payload && payload.response ? payload.response : payload; return Promise.all([LampaYaniApi.userLists(profile.id).then(deps.normalizeList).catch(function () { return []; }), LampaYaniApi.subscriptions(profile.id).then(function (response) { var value = response && response.response ? response.response : response, items = Array.isArray(value) ? value : value && (value.items || value.data || value.subscriptions || value.anime) || []; return items.map(function (item) { var source = item && (item.anime || item.title_data || item.object) || item; return source && (source.anime_id || source.id || source.title) ? deps.toCard(source) : null; }).filter(Boolean); }).catch(function () { return []; }), LampaYaniApi.schedule().then(LampaYaniApi.normalize).catch(function () { return []; })]); }).then(function (result) { var cards = result[0].filter(function (item) { var list = item.user && item.user.list && item.user.list.list; return list && [0, 1, 5].indexOf(Number(list.id)) >= 0; }).map(deps.toCard).concat(result[1]), schedule = {}; result[2].forEach(function (item) { schedule[String(item.anime_id || item.id)] = item.episodes || {}; }); var seen = {}; cards = cards.filter(function (card) { var key = String(card.yani_id || card.title); if (seen[key]) return false; seen[key] = true; var episode = schedule[key] || {}; card.yani_update_date = Number(episode.prev_date || episode.next_date || 0); card.yani_update_episode = Number(episode.aired || 0) || null; return true; }).sort(function (a, b) { return Number(b.yani_update_date || 0) - Number(a.yani_update_date || 0); }); self.build({results: cards.slice(0, 20), total_pages: 1, title: deps.t('updates')}); }).catch(function (error) { console.error('[YummyAnime Updates]', error); self.activity.loader(false); Lampa.Noty.show(deps.t('updates_error')); }); }; comp.cardRender = deps.cardRender; return comp; }

    function historyPayloadItems(payload) {
        var value = payload && payload.response !== undefined ? payload.response : payload;
        if (Array.isArray(value)) return value;
        return value && (value.items || value.data || value.history || value.watches) || [];
    }

    function historyTimestamp(value) {
        if (!value) return 0;
        if (typeof value === 'string' && !/^\d+$/.test(value)) return Date.parse(value) || 0;
        var number = Number(value) || 0;
        return number > 0 && number < 100000000000 ? number * 1000 : number;
    }

    function historyPoster(value) {
        if (!value) return '';
        if (typeof value === 'string') return value;
        return value.fullsize || value.original || value.huge || value.mega || value.big || value.medium || value.small || value.url || '';
    }

    function historyScreenshot(value) {
        if (!value) return '';
        if (typeof value === 'string') return value;
        var sizes = value.sizes || value.images || {};
        return value.full || value.url || sizes.full || sizes.big || sizes.medium || sizes.small || '';
    }

    function normalizeRemoteHistory(payload) {
        return historyPayloadItems(payload).map(function (item) {
            item = item || {};
            var screenshot = item.screenshot || {};
            var animeId = item.anime_id || item.animeId || item.id;
            if (!animeId) return null;
            return {
                anime_id: animeId,
                video_id: item.video_id || item.videoId || '',
                number: String(item.episode || screenshot.episode || item.number || ''),
                episode_title: item.ep_title || item.episode_title || screenshot.title || '',
                title: item.title || item.anime_title || '',
                poster: historyPoster(item.poster) || historyPoster(screenshot.poster) || historyPoster(screenshot),
                screenshot: historyScreenshot(item.screenshot_url || screenshot),
                player: String(item.player_title || item.player || ''),
                voice: String(item.dub_title || item.dubbing || ''),
                time: Math.max(0, Number(item.end_time || item.time || 0)),
                duration: Math.max(0, Number(item.duration || 0)),
                updated_at: historyTimestamp(item.date || item.updated_at || item.created_at),
                remote: true
            };
        }).filter(Boolean);
    }

    function normalizeLocalHistory(saved) {
        return Object.keys(saved || {}).map(function (id) {
            var item = saved[id] || {};
            return {
                anime_id: item.anime_id || id,
                video_id: item.video_id || '',
                number: String(item.number || item.episode || ''),
                episode_title: item.episode_title || '',
                title: item.title || item.card && item.card.title || '',
                poster: historyPoster(item.poster || item.card && item.card.poster),
                screenshot: historyScreenshot(item.screenshot || item.screenshot_url),
                player: String(item.player || ''),
                voice: String(item.voice || ''),
                time: Math.max(0, Number(item.time || 0)),
                duration: Math.max(0, Number(item.duration || 0)),
                updated_at: historyTimestamp(item.updated_at),
                card: item.card || null,
                remote: false
            };
        });
    }

    function historyEntryKey(entry) {
        if (entry.video_id) return 'video:' + String(entry.video_id);
        return 'anime:' + String(entry.anime_id) + ':episode:' + String(entry.number || '');
    }

    function mergeHistory(localSaved, remoteEntries) {
        var merged = {};
        normalizeLocalHistory(localSaved).concat(remoteEntries || []).forEach(function (entry) {
            var key = historyEntryKey(entry);
            var current = merged[key];
            if (!current) {
                merged[key] = entry;
                return;
            }
            var newer = Number(entry.updated_at || 0) >= Number(current.updated_at || 0) ? entry : current;
            var older = newer === entry ? current : entry;
            merged[key] = Object.assign({}, older, newer, {
                time: Number(newer.time || older.time || 0),
                duration: Number(newer.duration || older.duration || 0),
                title: newer.title || older.title || '',
                poster: newer.poster || older.poster || '',
                screenshot: newer.screenshot || older.screenshot || '',
                card: newer.card || older.card || null
            });
        });
        return Object.keys(merged).map(function (key) { return merged[key]; }).sort(function (a, b) {
            return Number(b.updated_at || 0) - Number(a.updated_at || 0);
        });
    }

    function isContinueEntry(entry) {
        var position = Math.max(0, Number(entry && entry.time || 0));
        var duration = Math.max(0, Number(entry && entry.duration || 0));
        var hasTarget = Boolean(entry && (entry.video_id || entry.number));
        if (!hasTarget) return false;
        if (!duration) return position >= 30 || position === 0;
        if (position < 30) return false;
        // When the API does not provide an explicit completion state, use a
        // predictable percentage fallback for both short and regular videos.
        return position / duration < 0.75;
    }

    function continueWatchingEntries(entries, excludedAnimeIds) {
        var latest = {};
        excludedAnimeIds = excludedAnimeIds || {};
        (entries || []).forEach(function (entry) {
            if (!isContinueEntry(entry)) return;
            var key = String(entry.anime_id || '');
            if (!key || excludedAnimeIds[key]) return;
            var current = latest[key];
            if (!current || Number(entry.updated_at || 0) > Number(current.updated_at || 0)) latest[key] = entry;
        });
        return Object.keys(latest).map(function (key) { return latest[key]; }).sort(function (a, b) {
            return Number(b.updated_at || 0) - Number(a.updated_at || 0);
        });
    }

    function attachHistoryEntry(card, entry) {
        card.yani_id = card.yani_id || Number(entry.anime_id) || entry.anime_id;
        card.yani_resume = {
            number: String(entry.number || ''),
            video_id: entry.video_id || '',
            time: Number(entry.time || 0),
            duration: Number(entry.duration || 0),
            player: entry.player || '',
            voice: entry.voice || '',
            updated_at: Number(entry.updated_at || 0)
        };
        card.yani_history_entry = entry;
        return card;
    }

    function historyCard(entry, deps) {
        var source = Object.assign({}, entry.card || {}, {
            anime_id: entry.anime_id,
            title: entry.title || entry.card && entry.card.title || deps.t('untitled'),
            poster: entry.poster || entry.card && entry.card.poster || ''
        });
        var fallback = attachHistoryEntry(deps.toCard(source), entry);
        if (entry.title && fallback.poster) return Promise.resolve(fallback);
        return deps.detail(entry.anime_id).then(function (payload) {
            var value = payload && payload.response ? payload.response : payload;
            return value ? attachHistoryEntry(deps.toCard(value), entry) : fallback;
        }).catch(function () { return fallback; });
    }

    function history(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        var continueMode = object.mode === 'continue';
        var limit = continueMode ? 100 : 30;
        var offset = 0;
        var hasMore = false;
        var seen = {};
        object.page = 1;

        function uniqueEntries(entries) {
            return entries.filter(function (entry) {
                var key = historyEntryKey(entry);
                if (seen[key]) return false;
                seen[key] = true;
                return true;
            });
        }

        function loadRemotePage() {
            if (!deps.authorized()) return Promise.resolve({entries: [], count: 0});
            return deps.fetchRemote(limit, offset).then(function (payload) {
                var raw = historyPayloadItems(payload);
                offset += raw.length;
                return {entries: normalizeRemoteHistory(payload), count: raw.length};
            });
        }

        function cardsFor(entries) {
            return Promise.all(entries.map(function (entry) { return historyCard(entry, deps); }));
        }

        comp.create = function () {
            var self = this;
            var local = deps.history();
            this.activity.loader(true);
            var remote = loadRemotePage().catch(function (error) {
                console.warn('[YummyAnime History] Server history is unavailable', error);
                return {entries: [], count: 0, failed: true};
            });
            var exclusions = continueMode && deps.fetchExcluded ? deps.fetchExcluded().catch(function (error) {
                console.warn('[YummyAnime Continue Watching] User-list filter is unavailable', error);
                return {};
            }) : Promise.resolve({});
            Promise.all([remote, exclusions]).then(function (result) {
                var page = result[0];
                hasMore = !continueMode && deps.authorized() && !page.failed && page.count >= limit;
                var entries = mergeHistory(local, page.entries);
                if (continueMode) entries = continueWatchingEntries(entries, result[1]);
                return cardsFor(uniqueEntries(entries));
            }).then(function (cards) {
                var totalPages = hasMore ? 2 : 1;
                self.build({results: cards.filter(Boolean), total_pages: totalPages, title: deps.t(continueMode ? 'continue_watching' : 'watch_history')});
                if (!cards.length) Lampa.Noty.show(deps.t('history_empty'));
            }).catch(function (error) {
                console.error('[YummyAnime History]', error);
                self.activity.loader(false);
                Lampa.Noty.show(deps.t('history_load_error'));
            });
        };

        comp.nextPageReuest = function (requestObject, resolve, reject) {
            if (!hasMore) {
                resolve({results: [], total_pages: requestObject.page, title: deps.t('watch_history')});
                return;
            }
            loadRemotePage().then(function (page) {
                hasMore = page.count >= limit;
                return cardsFor(uniqueEntries(page.entries));
            }).then(function (cards) {
                resolve({
                    results: cards.filter(Boolean),
                    total_pages: hasMore ? requestObject.page + 1 : requestObject.page,
                    title: deps.t(continueMode ? 'continue_watching' : 'watch_history')
                });
            }).catch(function (error) {
                requestObject.page = Math.max(1, requestObject.page - 1);
                console.error('[YummyAnime History]', error);
                Lampa.Noty.show(deps.t('next_page_error'));
                reject(error);
            });
        };
        comp.nextPageRequest = comp.nextPageReuest;
        comp.cardRender = deps.historyCardRender;
        return comp;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.HomeSections = window.LampaYaniHomeSections = {
        recommended: recommended,
        updates: updates,
        history: history,
        normalizeRemoteHistory: normalizeRemoteHistory,
        normalizeLocalHistory: normalizeLocalHistory,
        mergeHistory: mergeHistory,
        historyEntryKey: historyEntryKey,
        isContinueEntry: isContinueEntry,
        continueWatchingEntries: continueWatchingEntries
    };
}(window));
