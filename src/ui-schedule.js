(function (window) {
    'use strict';

    function create(object, deps) {
        var t = deps.t, locale = deps.locale, toCard = deps.toCard;
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-schedule"></div>');
        var content = $('<div class="yani-schedule__content"></div>');
        var last, dayGroups = [], selectedDay = 0;
        function startOfWeek(date) {
            var start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
            return start;
        }
        function startOfDay(date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate()); }
        function timestampDate(value) {
            var timestamp = Number(value || 0);
            if (!timestamp) return null;
            if (timestamp < 100000000000) timestamp *= 1000;
            var date = new Date(timestamp);
            return isNaN(date.getTime()) ? null : date;
        }
        function dayLabel(date, relativeOffset) { var prefix = relativeOffset === 0 ? t('today') + ', ' : relativeOffset === 1 ? t('tomorrow') + ', ' : ''; try { return prefix + date.toLocaleDateString(locale(), {weekday: 'long', day: 'numeric', month: 'long'}); } catch (error) { return prefix + date.toLocaleDateString(); } }
        function timeLabel(date) { try { return date.toLocaleTimeString(locale(), {hour: '2-digit', minute: '2-digit'}); } catch (error) { return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2); } }
        function dateTimeLabel(date) { try { return date.toLocaleString(locale(), {day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'}); } catch (error) { return date.toLocaleString(); } }
        function episodeLabel(episodes) { var aired = Number(episodes.aired || 0), count = Number(episodes.count || 0); if (count === 1 && aired === 0) return t('release'); var next = aired + 1; return count > 1 ? t('episode') + ' ' + next + ' ' + t('of') + ' ' + count : t('episode') + ' ' + next; }
        function createItem(item) {
            var card = toCard(item), episodes = item.episodes || {}, releaseDate = timestampDate(episodes.next_date) || new Date();
            var row = $('<div class="yani-schedule__item selector"></div>'), poster = $('<img class="yani-schedule__poster" alt="">').attr('src', card.poster || '');
            LampaYaniMedia.bindPosterFallback(poster, card);
            var info = $('<div class="yani-schedule__info"></div>'), release = $('<div class="yani-schedule__release"></div>');
            info.append($('<div class="yani-schedule__title"></div>').text(card.title)); info.append($('<div class="yani-schedule__episode"></div>').text(episodeLabel(episodes)));
            release.append($('<div class="yani-schedule__time"></div>').text(timeLabel(releaseDate))); release.append($('<div class="yani-schedule__timezone"></div>').text(t('local_time')));
            row.append(poster, info, release);
            var opened = false, open = function () { if (opened) return; opened = true; card.yani_schedule = episodeLabel(episodes) + ', ' + dateTimeLabel(releaseDate); deps.openStandardLampaCard(card); setTimeout(function () { opened = false; }, 500); };
            row.on('hover:focus', function (event) { var target = event.currentTarget || event.target; content.find('.yani-schedule__item.focus').removeClass('focus'); row.addClass('focus'); last = target; scroll.update($(target), true); });
            row.on('hover:blur', function () { row.removeClass('focus'); }); row.on('hover:enter click.yaniSchedule', open);
            return row;
        }
        function revealDayChip(chip) {
            var days = content.find('.yani-schedule__days');
            if (!days.length || !chip || !chip.length) return;
            var left = chip[0].offsetLeft - Math.max(0, (days.innerWidth() - chip.outerWidth()) / 2);
            days.scrollLeft(Math.max(0, left));
        }
        function select(index, focus) {
            selectedDay = Math.max(0, Math.min(index, dayGroups.length - 1)); var group = dayGroups[selectedDay]; if (!group) return;
            var chip = content.find('.yani-schedule__day-chip').removeClass('selected').eq(selectedDay).addClass('selected'); content.find('.yani-schedule__selected-title').text(dayLabel(group.day, group.relativeOffset));
            var releases = content.find('.yani-schedule__releases').empty(); if (!group.releases.length) releases.append($('<div class="yani-schedule__empty"></div>').text(t('no_releases'))); else group.releases.forEach(function (item) { releases.append(createItem(item)); });
            revealDayChip(chip);
            if (focus) last = chip[0];
        }
        function scheduleItems(items) {
            var normalized = [];
            (items || []).forEach(function (item) {
                var episodes = item && item.episodes || {}, releaseDate = timestampDate(episodes.next_date);
                if (!releaseDate) return;
                normalized.push({item: item, date: releaseDate});
            });
            return normalized;
        }
        function render(items) {
            var today = startOfDay(new Date()), currentWeek = startOfWeek(today), rangeStart = new Date(currentWeek.getTime()), releasesByDay = {}, scheduled = scheduleItems(items);
            rangeStart.setDate(rangeStart.getDate() - 7);
            scheduled.forEach(function (entry) {
                var key = startOfDay(entry.date).getTime();
                if (!releasesByDay[key]) releasesByDay[key] = [];
                releasesByDay[key].push(entry.item);
            });
            dayGroups = [];
            for (var offset = 0; offset < 28; offset++) {
                var day = new Date(rangeStart.getTime()); day.setDate(rangeStart.getDate() + offset);
                var releases = releasesByDay[day.getTime()] || [];
                releases.sort(function (a, b) { return Number(a.episodes && a.episodes.next_date) - Number(b.episodes && b.episodes.next_date); });
                dayGroups.push({day: day, relativeOffset: Math.round((day.getTime() - today.getTime()) / 86400000), releases: releases});
            }
            var days = $('<div class="yani-schedule__days"></div>'); dayGroups.forEach(function (group, index) { var chip = $('<div class="yani-schedule__day-chip selector"></div>'); chip.append($('<div class="yani-schedule__day-name"></div>').text(dayLabel(group.day, group.relativeOffset))); chip.append($('<div class="yani-schedule__day-count"></div>').text(group.releases.length)); chip.on('hover:focus', function (event) { content.find('.yani-schedule__day-chip.focus').removeClass('focus'); chip.addClass('focus'); last = event.currentTarget || chip[0]; revealDayChip(chip); }); chip.on('hover:blur', function () { chip.removeClass('focus'); }); chip.on('hover:enter click.yaniScheduleDay', function () { select(index, true); }); days.append(chip); });
            content.append(days).append($('<div class="yani-schedule__selected-title"></div>')).append($('<div class="yani-schedule__releases"></div>')); select(dayGroups.findIndex(function (group) { return group.relativeOffset === 0; }), true);
        }
        var comp = {create: function () { var self = this; this.activity.loader(true); LampaYaniApi.schedule({}).then(function (payload) { render(LampaYaniApi.normalize(payload)); scroll.append(content); html.append(scroll.render(true)); self.activity.loader(false); self.activity.toggle(); }).catch(function (error) { console.error('[YummyAnime]', error); self.activity.loader(false); Lampa.Noty.show(t('schedule_load_error')); }); }, start: function () { Lampa.Controller.add('content', {toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); }, left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); }, right: function () { Navigator.move('right'); }, up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); }, down: function () { Navigator.move('down'); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { scroll.destroy(); html.remove(); } };
        return comp;
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Schedule = window.LampaYaniSchedule = {create: create};
}(window));
