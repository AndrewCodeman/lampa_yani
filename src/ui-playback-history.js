(function (window) {
    'use strict';

    // Local playback history storage plus Continue Watching card progress UI.
    // Player watchers and remote flush remain in ui.js; this module owns the
    // shared history map and the visible progress decorations.

    function create(deps) {
        deps = deps || {};
        var t = deps.t || function (name) { return name; };
        var bindYummyCardRender = deps.bindYummyCardRender || function () {};
        var cardRenderElement = deps.cardRenderElement || function (element, card) {
            var render = element && element.jquery ? element : element ? $(element) : $();
            if (!render.length && card && card.render) render = $(card.render(true));
            return render;
        };
        var openVideos = deps.openVideos || function () {};
        var addCardPlaybackProgress = deps.addCardPlaybackProgress || function () {};
        var playerKey = deps.playerKey || function (group) {
            return String(group && (group.player || group.title) || '').toLowerCase();
        };
        var videoSourceUrl = deps.videoSourceUrl || function () { return ''; };

        function playbackHistory() {
            if (!window.Lampa || !window.Lampa.Storage) return {};
            try {
                var value = window.Lampa.Storage.get('yani_playback_history', '{}');
                if (value && typeof value === 'object') return value;
                return JSON.parse(value || '{}');
            } catch (error) { return {}; }
        }

        function getPlayback(animeId) {
            return playbackHistory()[String(animeId)] || null;
        }

        function rememberPlayback(card, group, video) {
            if (!window.Lampa || !window.Lampa.Storage || !card || !card.yani_id) return null;
            var history = playbackHistory();
            var videoData = window.LampaYaniUiUtils && window.LampaYaniUiUtils.videoData
                ? window.LampaYaniUiUtils.videoData(video)
                : {};
            var saved = history[String(card.yani_id)] = {
                number: String(video.number || video.index || ''),
                video_id: video.video_id || '',
                time: Number(video.watched && video.watched.end_time || 0),
                duration: Math.max(0, Number(video.duration || 0)),
                player: playerKey(group),
                voice: String(videoData.dubbing || ''),
                episode_url: videoSourceUrl(video),
                title: card.title || '',
                poster: card.poster || card.img || '',
                card: {
                    title: card.title || '',
                    original_title: card.original_title || '',
                    poster: card.poster || card.img || '',
                    release_date: card.release_date || '',
                    overview: card.overview || '',
                    anime_id: card.yani_id,
                    remote_ids: card.yani_remote_ids || {}
                },
                updated_at: Date.now()
            };
            var ids = Object.keys(history).sort(function (a, b) {
                return Number(history[b].updated_at || 0) - Number(history[a].updated_at || 0);
            });
            ids.slice(100).forEach(function (id) { delete history[id]; });
            window.Lampa.Storage.set('yani_playback_history', JSON.stringify(history));
            return saved;
        }

        function autoProgressSyncEnabled() {
            if (!window.LampaYaniAuth || !window.LampaYaniAuth.token() || !window.Lampa || !window.Lampa.Storage || !window.Lampa.Storage.get) return false;
            var value = window.Lampa.Storage.get('yani_auto_sync_progress', true);
            return value !== false && value !== 'false';
        }

        function syncServerProgress(video) {
            if (!autoProgressSyncEnabled() || !video || !video.video_id || !window.LampaYaniApi) return;
            window.LampaYaniApi.syncVideoProgress(video.video_id, video.watched && video.watched.end_time, video.duration).catch(function (error) {
                console.warn('[YummyAnime] Progress sync failed', error);
            });
        }

        function renderHistoryProgress(rendered, playback) {
            var view = $('.card__view', rendered).first();
            if (!view.length) return;
            view.find('.yani-card-history, .yani-card-history-progress').remove();
            var duration = Math.max(0, Number(playback.duration || 0));
            var position = Math.max(0, Number(playback.time || 0));
            var percent = duration > 0 ? Math.min(100, Math.round(position / duration * 100)) : 0;
            var label = playback.number ? t('episode') + ' ' + playback.number : t('continue_watching');
            if (percent) label += ' · ' + percent + '%';
            view.append($('<span class="yani-card-history"></span>').text(label));
            if (duration > 0) {
                view.append($('<span class="yani-card-history-progress"><span></span></span>').find('span').css('width', percent + '%').end());
            }
        }

        function refreshVisiblePlaybackProgress(card) {
            if (!card || !card.yani_id) return;
            $('.yani-history-card').each(function () {
                var rendered = $(this);
                if (String(rendered.attr('data-yani-history-id') || '') !== String(card.yani_id)) return;
                renderHistoryProgress(rendered, card.yani_resume || getPlayback(card.yani_id) || {});
            });
            $('[data-yani-card-id="' + String(card.yani_id).replace(/"/g, '') + '"]').not('.yani-history-card').each(function () {
                addCardPlaybackProgress($(this), card);
            });
        }

        function updatePlaybackProgress(context, position, duration, remote) {
            if (!context || !context.selected || !context.card) return;
            var video = context.selected;
            video.watched = video.watched || {};
            video.watched.end_time = Math.max(0, Math.floor(Number(position) || 0));
            if (duration > 0) video.duration = Math.floor(duration);
            var saved = rememberPlayback(context.card, context.group, video);
            if (saved) {
                context.card.yani_resume = {
                    number: saved.number,
                    video_id: saved.video_id,
                    time: saved.time,
                    duration: saved.duration,
                    player: saved.player,
                    voice: saved.voice,
                    updated_at: saved.updated_at
                };
                refreshVisiblePlaybackProgress(context.card);
            }
            if (remote) syncServerProgress(video);
        }

        function syncPlaybackHistoryManually() {
            if (!window.LampaYaniAuth || !window.LampaYaniAuth.token()) {
                if (window.Lampa && window.Lampa.Noty) window.Lampa.Noty.show(t('login_required'));
                return;
            }
            var history = playbackHistory();
            var videos = Object.keys(history).map(function (id) {
                var item = history[id] || {};
                if (!item.video_id) return null;
                return {
                    video_id: Number(item.video_id),
                    time: Number(item.time || 0),
                    date: Math.floor(Number(item.updated_at || Date.now()) / 1000)
                };
            }).filter(function (item) { return item && item.video_id; });
            if (!videos.length) {
                if (window.Lampa && window.Lampa.Noty) window.Lampa.Noty.show(t('history_empty'));
                return;
            }
            if (window.Lampa && window.Lampa.Loading && window.Lampa.Loading.start) window.Lampa.Loading.start();
            window.LampaYaniApi.syncVideoWatches(videos).then(function () {
                if (window.Lampa && window.Lampa.Loading && window.Lampa.Loading.stop) window.Lampa.Loading.stop();
                if (window.Lampa && window.Lampa.Noty) window.Lampa.Noty.show(t('sync_history_ok'));
            }).catch(function (error) {
                if (window.Lampa && window.Lampa.Loading && window.Lampa.Loading.stop) window.Lampa.Loading.stop();
                console.error('[YummyAnime] History sync failed', error);
                if (window.Lampa && window.Lampa.Noty) window.Lampa.Noty.show(t('sync_history_error'));
            });
        }

        function bindHistoryCardRender(first, second, third) {
            bindYummyCardRender(first, second, third);
            var card;
            var element;
            [first, second, third].forEach(function (value) {
                if (!value) return;
                if (!element && (value.jquery || value.nodeType || (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement))) element = value;
                if (!card && (value.render || value.yani_id || value.title)) card = value;
                else if (!card) {
                    var candidate = value.card || value.object || value.data;
                    if (candidate && (candidate.render || candidate.yani_id || candidate.title)) card = candidate;
                }
            });
            if (card && card.yani_id) {
                // Continue Watching is a playback queue, not an information catalog.
                var openHistoryEntry = function () { openVideos(card, true); };
                var rendered = cardRenderElement(element, card);
                rendered.addClass('yani-history-card').attr('data-yani-history-id', String(card.yani_id));
                rendered.add(rendered.find('*')).off('hover:enter.yaniOpen click.yaniOpen hover:enter.yaniHistory click.yaniHistory');
                rendered.on('hover:enter.yaniHistory click.yaniHistory', function (event) {
                    if (event) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    }
                    openHistoryEntry();
                    return false;
                });
                card.onEnter = openHistoryEntry;
                renderHistoryProgress(rendered, card.yani_resume || {});
            }
        }

        return {
            playbackHistory: playbackHistory,
            getPlayback: getPlayback,
            rememberPlayback: rememberPlayback,
            autoProgressSyncEnabled: autoProgressSyncEnabled,
            syncServerProgress: syncServerProgress,
            renderHistoryProgress: renderHistoryProgress,
            refreshVisiblePlaybackProgress: refreshVisiblePlaybackProgress,
            updatePlaybackProgress: updatePlaybackProgress,
            syncPlaybackHistoryManually: syncPlaybackHistoryManually,
            bindHistoryCardRender: bindHistoryCardRender
        };
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.PlaybackHistory = window.LampaYaniPlaybackHistory = {
        create: create
    };
}(window));
