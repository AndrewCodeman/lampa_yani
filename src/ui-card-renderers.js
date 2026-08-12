(function (window) {
    'use strict';

    // Shared YummyAnime card decoration helpers. Catalog/search/history cards
    // all bind through these so badge, metadata and progress markup stay in one
    // place while the enter/open lifecycle remains in ui.js.

    function create(deps) {
        deps = deps || {};
        var t = deps.t || function (name) { return name; };
        var locale = deps.locale || function () { return 'ru'; };
        var getPlayback = deps.getPlayback || function () { return null; };
        var mediaMeta = deps.mediaMeta || function () { return {}; };
        var loadVideos = deps.loadVideos || function () { return Promise.reject(new Error('videos unavailable')); };

        function cardRenderElement(element, card) {
            var render = element && element.jquery ? element : element ? $(element) : $();
            if (!render.length && card && card.render) render = $(card.render(true));
            return render;
        }

        function addCardMediaBadges(element, card) {
            var requested = false;
            var cardRender = cardRenderElement(element, card);
            renderCardMediaBadges(element, card, card.yani_media || mediaMeta(card));
            if (!card.yani_id || (card.yani_media && card.yani_media.loaded)) return;

            cardRender.off('hover:focus.yaniMedia').one('hover:focus.yaniMedia', function () {
                if (requested) return;
                requested = true;
                loadVideos(card.yani_id).then(function (payload) {
                    var videos = payload && payload.response ? payload.response : payload;
                    card.yani_media = mediaMeta({videos: Array.isArray(videos) ? videos : []});
                    card.yani_media.loaded = true;
                    renderCardMediaBadges(element, card, card.yani_media);
                }).catch(function () {});
            });
        }

        function mediaTypeLabels(value) {
            var info = LampaYaniUiUtils.mediaTypeInfo(value);
            if (!info.key && !info.full && !info.short) return null;
            var fallback = info.key ? t('media_type_' + info.key) : '';
            var fallbackShort = info.key ? t('media_type_' + info.key + '_short') : '';
            return {
                full: info.full || fallback || info.short,
                short: info.short || fallbackShort || fallback || info.full
            };
        }

        function renderCardMediaBadges(element, card, meta) {
            meta = meta || {};
            var genreTop = genreTopPosition(card);
            if (!meta.quality && !meta.voices && !genreTop) return;
            var render = cardRenderElement(element, card);
            var view = $('.card__view', render).first();
            if (!view.length) return;
            var block = $('.yani-card-media', view);
            if (!block.length) block = $('<div class="yani-card-media"></div>').appendTo(view);
            block.empty();
            if (genreTop) {
                var topLabel = t('genre_top_position')
                    .replace('{genre}', card.yani_genre_top.genre || '')
                    .replace('{position}', genreTop);
                var topBadge = $('<span class="yani-card-media__badge yani-card-media__genre-top"></span>')
                    .attr({'title': topLabel, 'aria-label': topLabel});
                topBadge.append('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v3h3v2c0 3.2-1.8 5.5-5 6.3V17h3v3H6v-3h3v-2.7C5.8 13.5 4 11.2 4 8V6h3V3Zm0 5H6c0 1.7.8 3 2.3 3.7A8.8 8.8 0 0 1 7 8Zm10 0c-.1 1.4-.5 2.6-1.3 3.7C17.2 11 18 9.7 18 8h-1Z"/></svg>');
                topBadge.append($('<b></b>').text('#' + genreTop));
                block.append(topBadge);
            }
            if (meta.quality || meta.voices) {
                var availability = $('<span class="yani-card-media__availability"></span>');
                if (cardMediaMotionAllowed()) availability.addClass('yani-card-media__availability--motion');
                if (meta.quality) {
                    var quality = $('<span class="yani-card-media__availability-part yani-card-media__quality"></span>');
                    quality.append('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h16v11H4zM8 20h8M12 16.5V20"/></svg>');
                    quality.append($('<b></b>').text(meta.quality));
                    availability.append(quality);
                }
                if (meta.voices) {
                    var voicesLabel = meta.voices + ' ' + t('voices_short');
                    var voices = $('<span class="yani-card-media__availability-part yani-card-media__voices"></span>')
                        .attr({'title': voicesLabel, 'aria-label': voicesLabel});
                    voices.append('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9H5l-3 3 3 3h4l5 4V5L9 9Zm8.5.2a4 4 0 0 1 0 5.6M20 6.5a7.5 7.5 0 0 1 0 11"/></svg>');
                    voices.append($('<b></b>').text(meta.voices));
                    voices.append($('<small></small>').text(t('voices_short')));
                    availability.append(voices);
                }
                block.append(availability);
            }
        }

        function cardMediaMotionAllowed() {
            var navigatorInfo = window.navigator || {};
            var reduced = Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
            var lowMemory = Number(navigatorInfo.deviceMemory || 0) > 0 && Number(navigatorInfo.deviceMemory) <= 2;
            var lowCpu = Number(navigatorInfo.hardwareConcurrency || 0) > 0 && Number(navigatorInfo.hardwareConcurrency) <= 2;
            return !reduced && !lowMemory && !lowCpu;
        }

        function genreTopPosition(card) {
            var top = card && card.yani_genre_top;
            var position = Number(top && top.position);
            return position >= 1 && position <= 100 ? Math.floor(position) : 0;
        }

        function cardStatusLabel(status) {
            if (!status) return '';
            if (typeof status === 'string') return status;
            if (status.title) return status.title;
            var aliases = {released: 'status_released', ongoing: 'status_ongoing', announced: 'status_announced'};
            return status.alias && aliases[status.alias] ? t(aliases[status.alias]) : '';
        }

        function cardStatusKey(status) {
            var value = typeof status === 'string' ? status : status && (status.alias || status.title) || '';
            value = String(value).toLowerCase();
            if (/ongoing|онго|онґо|выходит|виходить/.test(value)) return 'ongoing';
            if (/announce|анонс/.test(value)) return 'announced';
            if (/released|вышел|вийшов|заверш/.test(value)) return 'released';
            return 'unknown';
        }

        function cardEpisodesLabel(episodes, watched) {
            if (!episodes) return '';
            var total = typeof episodes === 'number' ? Number(episodes) : Number(episodes.count || episodes.total || 0);
            var aired = typeof episodes === 'object' ? Number(episodes.aired || episodes.released || 0) : 0;
            watched = Math.max(0, Math.floor(Number(watched || 0)));
            var available = aired || total;
            if (watched > 0 && available > 0) return Math.min(watched, available) + '/' + available + ' ' + t('episodes_short');
            if (aired > 0 && total > 0 && aired !== total) return aired + '/' + total + ' ' + t('episodes_short');
            var count = total || aired;
            return count > 0 ? count + ' ' + t('episodes_short') : '';
        }

        function addCardMetadata(element, card) {
            var render = cardRenderElement(element, card);
            if (!render.length || render.find('.yani-card-meta').length) return;
            var values = [];
            var type = mediaTypeLabels(card && card.yani_type);
            if (type && type.short) values.push({kind: 'type', text: type.short});
            var status = cardStatusLabel(card && card.yani_status);
            if (status) values.push({kind: 'status status--' + cardStatusKey(card.yani_status), text: status});
            var episodes = cardEpisodesLabel(card && card.yani_episodes, card && card.yani_watched_episodes);
            if (episodes) values.push({kind: 'episodes', text: episodes});
            var year = String(card && (card.yani_year || card.release_date) || '').slice(0, 4);
            if (/^\d{4}$/.test(year)) values.push({kind: 'year', text: year});
            if (!values.length) return;

            var metadata = $('<div class="yani-card-meta" aria-hidden="true"></div>');
            values.forEach(function (value) {
                metadata.append($('<span></span>').addClass(value.kind.split(' ').map(function (name) {
                    return 'yani-card-meta__' + name;
                }).join(' ')).text(value.text));
            });
            var age = render.find('.card__age').first();
            var title = render.find('.card__title').first();
            if (age.length) age.addClass('yani-card-meta__native-age').after(metadata);
            else if (title.length) title.after(metadata);
            else render.append(metadata);
        }

        function cardUpdateTimestamp(value) {
            if (value === undefined || value === null || value === '') return 0;
            var numeric = Number(value);
            if (isFinite(numeric) && numeric > 0) return numeric < 1000000000000 ? numeric * 1000 : numeric;
            var parsed = Date.parse(String(value));
            return isNaN(parsed) ? 0 : parsed;
        }

        function cardFreshness(value) {
            var timestamp = cardUpdateTimestamp(value);
            if (!timestamp) return null;
            var now = new Date();
            var updated = new Date(timestamp);
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            var updatedDay = new Date(updated.getFullYear(), updated.getMonth(), updated.getDate()).getTime();
            var days = Math.round((today - updatedDay) / 86400000);
            if (days < 0) return null;
            if (days === 0) return {label: t('fresh_today'), recent: true};
            if (days === 1) return {label: t('fresh_yesterday'), recent: true};
            try {
                return {label: updated.toLocaleDateString(locale(), {day: 'numeric', month: 'short'}), recent: days < 7};
            } catch (error) {
                var month = updated.getMonth() + 1;
                return {label: updated.getDate() + '.' + (month < 10 ? '0' : '') + month, recent: days < 7};
            }
        }

        function addCardUpdateBadge(element, card) {
            if (!card) return;
            var freshness = cardFreshness(card.yani_update_date || card.yani_updated_at);
            if (!card.yani_update_episode && !card.yani_update_label && !freshness) return;
            var render = cardRenderElement(element, card);
            var view = $('.card__view', render).first();
            if (!view.length || view.find('.yani-card-update').length) return;
            var label = card.yani_update_label || t('episode') + ' ' + card.yani_update_episode;
            var badge = $('<span class="yani-card-update"></span>');
            if (label) badge.append($('<span class="yani-card-update__label"></span>').text(label));
            if (freshness) badge.append($('<span class="yani-card-update__freshness"></span>').text(freshness.label));
            if (freshness && freshness.recent) {
                badge.addClass('yani-card-update--fresh');
                render.addClass('yani-card--fresh');
            }
            view.append(badge);
        }

        function addCardRecommendationBadge(element, card) {
            if (!card || !card.yani_recommendation_label) return;
            var render = cardRenderElement(element, card);
            var view = $('.card__view', render).first();
            if (!view.length || view.find('.yani-card-recommendation').length) return;
            view.append($('<span class="yani-card-recommendation"></span>').text(card.yani_recommendation_label));
        }

        function addCardListBadge(element, card) {
            if (!card || (card.yani_list_id === null && !card.yani_is_favorite)) return;
            var render = cardRenderElement(element, card);
            var view = $('.card__view', render).first();
            if (!view.length) return;
            var badge = $('.yani-card-list', view);
            if (!badge.length) badge = $('<span class="yani-card-list"></span>').appendTo(view);
            var labels = {0: t('watching'), 1: t('planned'), 2: t('completed'), 3: t('dropped'), 5: t('postponed')};
            var label = labels[card.yani_list_id] || '';
            if (card.yani_is_favorite) label = label ? label + ' · ♥' : '♥';
            badge.text(label);
        }

        function cardPlaybackState(card) {
            if (!card) return null;
            var playback = card.yani_resume || getPlayback(card.yani_id) || {};
            var duration = Math.max(0, Number(playback.duration || 0));
            var position = Math.max(0, Number(playback.time || 0));
            var progress = duration > 0 ? position / duration : Number(card.yani_list_progress || 0);
            progress = Math.max(0, Math.min(1, progress));
            var episode = playback.number || card.yani_watched_episodes || '';
            if (!episode && !(progress > 0)) return null;
            return {
                episode: episode,
                percent: progress > 0 ? Math.round(progress * 100) : 0,
                progress: progress
            };
        }

        function addCardPlaybackProgress(element, card) {
            var state = cardPlaybackState(card);
            var render = cardRenderElement(element, card);
            var view = $('.card__view', render).first();
            if (!view.length) return;
            view.find('.yani-card-playback, .yani-card-playback-progress').remove();
            if (!state) return;
            var parts = [];
            if (state.episode) parts.push(t('episode') + ' ' + state.episode);
            if (state.percent) parts.push(state.percent + '%');
            view.append($('<span class="yani-card-playback"></span>').text(parts.join(' · ')));
            if (state.progress > 0) {
                view.append($('<span class="yani-card-playback-progress"><span></span></span>')
                    .find('span').css('width', state.percent + '%').end());
            }
        }

        function formatRating(value) {
            return Number(value) > 0 ? Number(value).toFixed(1) : '—';
        }

        function createRatingLogo(rating, className) {
            return $('<span class="' + className + ' yani-rating-logo yani-rating-logo--' + rating.key + '"></span>')
                .text(rating.short || rating.key)
                .attr('title', rating.title || rating.key)
                .attr('aria-label', rating.title || rating.key);
        }

        function addCardRatings(element, card) {
            var ratings = card && card.yani_ratings || [];
            if (!ratings.length || !card) return;
            var render = cardRenderElement(element, card);
            if ($('.yani-card-ratings', render).length) return;

            $('.card__vote', render).hide();
            var block = $('<div class="yani-card-ratings"></div>');
            ratings.forEach(function (rating) {
                var badge = $('<div class="yani-card-rating yani-card-rating--' + rating.key + '"></div>');
                badge.append(createRatingLogo(rating, 'yani-card-rating__logo'));
                badge.append($('<span class="yani-card-rating__value"></span>').text(formatRating(rating.value)));
                block.append(badge);
            });
            $('.card__view', render).append(block);
        }

        function decorate(element, card) {
            addCardRatings(element, card);
            addCardMediaBadges(element, card);
            addCardMetadata(element, card);
            addCardUpdateBadge(element, card);
            addCardRecommendationBadge(element, card);
            addCardListBadge(element, card);
            addCardPlaybackProgress(element, card);
        }

        return {
            cardRenderElement: cardRenderElement,
            addCardMediaBadges: addCardMediaBadges,
            mediaTypeLabels: mediaTypeLabels,
            renderCardMediaBadges: renderCardMediaBadges,
            cardMediaMotionAllowed: cardMediaMotionAllowed,
            genreTopPosition: genreTopPosition,
            cardStatusLabel: cardStatusLabel,
            cardStatusKey: cardStatusKey,
            cardEpisodesLabel: cardEpisodesLabel,
            addCardMetadata: addCardMetadata,
            cardUpdateTimestamp: cardUpdateTimestamp,
            cardFreshness: cardFreshness,
            addCardUpdateBadge: addCardUpdateBadge,
            addCardRecommendationBadge: addCardRecommendationBadge,
            addCardListBadge: addCardListBadge,
            cardPlaybackState: cardPlaybackState,
            addCardPlaybackProgress: addCardPlaybackProgress,
            formatRating: formatRating,
            createRatingLogo: createRatingLogo,
            addCardRatings: addCardRatings,
            decorate: decorate
        };
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.CardRenderers = window.LampaYaniCardRenderers = {
        create: create
    };
}(window));
