function pluginYummyAnime() {
    if (window.plugin_yummy_anime_ready) return;
    window.plugin_yummy_anime_ready = true;

    if (window.Lampa && Lampa.Manifest) {
        Lampa.Manifest.plugins = {
            type: 'other',
            version: '0.12.2',
            name: 'YummyAnime',
            description: 'YummyAnime catalog, ratings, lists and account integration',
            component: 'yani_home'
        };
    }

    var style = document.createElement('style');
    style.textContent = ".yani-catalog {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 1rem;\n}\n\n.icon-yani {\n    width: 2.4em;\n    height: 2.4em;\n    background: center / contain no-repeat url('./assets/yummyanime.svg');\n}\n\n.yani-home__grid {\n    display: grid;\n    grid-template-columns: repeat(3, minmax(12em, 1fr));\n    gap: 1.2em;\n    padding: 2em;\n}\n\n.yani-home__item {\n    min-height: 8em;\n    padding: 1.4em;\n    border-radius: 0.8em;\n    background: rgba(255, 255, 255, 0.12);\n    display: flex;\n    align-items: center;\n    gap: 1em;\n}\n\n.yani-home__item.focus {\n    background: #fff;\n    color: #111;\n}\n\n.yani-home__icon {\n    font-size: 2.4em;\n}\n\n.yani-home__title {\n    font-size: 1.35em;\n}\n\n@media (max-width: 700px) {\n    .yani-home__grid { grid-template-columns: repeat(2, minmax(10em, 1fr)); }\n}\n\n.yani-detail {\n    display: flex;\n    gap: 2.5em;\n    padding: 2em;\n    max-width: 100%;\n    box-sizing: border-box;\n}\n\n.yani-detail__poster {\n    width: 16em;\n    max-height: 24em;\n    object-fit: cover;\n    border-radius: 0.8em;\n}\n\n.yani-detail__info { min-width: 0; max-width: 48em; flex: 1 1 auto; }\n.yani-detail__title { font-size: 2.2em; font-weight: 600; }\n.yani-detail__meta { margin: 0.8em 0 1.2em; font-size: 1.2em; }\n.yani-detail__overview { line-height: 1.45; margin-bottom: 1.5em; }\n.yani-detail__actions { display: flex; flex-wrap: wrap; gap: 0.7em; max-width: 100%; }\n.yani-detail__button { display: block; max-width: 100%; box-sizing: border-box; padding: 0.8em 1.2em; border: 0.12em solid transparent; border-radius: 0.5em; background: rgba(255,255,255,.15); overflow-wrap: anywhere; }\n.yani-detail__button--watch { background: #ef6470; color: #fff; }\n.yani-detail__button.focus { background: #fff; color: #111; border-color: #fff; box-shadow: 0 0 0 0.2em rgba(239, 100, 112, .95), 0 0 1.2em rgba(255, 255, 255, .55); transform: scale(1.02); }\n\n@media (max-width: 700px) {\n    .yani-detail { gap: 1em; padding: 1em; }\n    .yani-detail__poster { width: 10em; }\n}\n\n.yani-player {\n    position: fixed;\n    z-index: 1000;\n    inset: 0;\n    width: 100vw;\n    height: 100vh;\n    background: #000;\n}\n\n.yani-player__iframe {\n    display: block;\n    width: 100%;\n    height: 100%;\n    border: 0;\n    background: #000;\n}\n\n.full-start__button.view--yummyanime {\n    background: #ef6470;\n    color: #fff;\n    order: -1;\n}\n\n.full-start__button.view--yummyanime-actions {\n    border: 0.12em solid #ef6470;\n}\n\n.view--yummyanime__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 1.8em;\n    height: 1.8em;\n    margin-right: 0.45em;\n    border: 0.12em solid currentColor;\n    border-radius: 0.45em;\n    font-size: 0.72em;\n    font-weight: 700;\n}\n\n.yani-schedule__content {\n    padding: 1.2em 2em 3em;\n}\n\n.yani-schedule__day {\n    margin-bottom: 2em;\n}\n\n.yani-schedule__day-title {\n    margin-bottom: 0.7em;\n    font-size: 1.55em;\n    font-weight: 600;\n    text-transform: capitalize;\n}\n\n.yani-schedule__item {\n    display: flex;\n    align-items: center;\n    min-height: 6.2em;\n    margin-bottom: 0.65em;\n    padding: 0.65em 1em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-schedule__item.focus {\n    background: #fff;\n    color: #111;\n}\n\n.yani-schedule__poster {\n    width: 4em;\n    height: 5.5em;\n    margin-right: 1em;\n    border-radius: 0.35em;\n    object-fit: cover;\n    background: rgba(255, 255, 255, 0.08);\n}\n\n.yani-schedule__info {\n    flex: 1;\n    min-width: 0;\n}\n\n.yani-schedule__title {\n    overflow: hidden;\n    font-size: 1.15em;\n    font-weight: 500;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.yani-schedule__episode {\n    margin-top: 0.4em;\n    opacity: 0.75;\n}\n\n.yani-schedule__release {\n    min-width: 8em;\n    margin-left: 1em;\n    text-align: right;\n}\n\n.yani-schedule__time {\n    font-size: 1.25em;\n    font-weight: 600;\n}\n\n.yani-schedule__timezone,\n.yani-schedule__empty {\n    opacity: 0.55;\n}\n\n.yani-schedule__empty {\n    padding: 1em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.06);\n}\n\n.yani-detail__schedule {\n    margin-bottom: 1.2em;\n    font-size: 1.15em;\n    font-weight: 600;\n}\n\n.yani-card-ratings {\n    position: absolute;\n    right: 0.35em;\n    bottom: 0.35em;\n    left: 0.35em;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 0.2em;\n    pointer-events: none;\n}\n\n.yani-card-media {\n    position: absolute;\n    top: 0.35em;\n    left: 0.35em;\n    display: flex;\n    gap: 0.25em;\n    pointer-events: none;\n}\n\n.yani-card-media__badge {\n    padding: 0.22em 0.38em;\n    border-radius: 0.25em;\n    background: rgba(0, 0, 0, 0.82);\n    color: #fff;\n    font-size: 0.62em;\n    font-weight: 700;\n    line-height: 1.1;\n}\n\n.yani-card-media__quality { background: #f1c40f; color: #171717; }\n.yani-card-media__voices { background: #3b9bd9; }\n\n.yani-card-rating {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0.2em 0.3em;\n    border-radius: 0.25em;\n    background: rgba(0, 0, 0, 0.78);\n    color: #fff;\n    font-size: 0.62em;\n}\n\n.yani-rating-logo {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 2.1em;\n    height: 1.45em;\n    padding: 0 0.3em;\n    box-sizing: border-box;\n    border-radius: 0.28em;\n    background: #fff;\n    color: #111;\n    font-size: 0.78em;\n    font-weight: 800;\n    letter-spacing: -0.04em;\n    line-height: 1;\n}\n\n.yani-rating-logo--yummy { background: #ef6470; color: #fff; }\n.yani-rating-logo--kp { background: #f2c94c; color: #171717; }\n.yani-rating-logo--shikimori { background: #8b6fc9; color: #fff; }\n.yani-rating-logo--anidub { background: #3b9bd9; color: #fff; }\n.yani-rating-logo--mal { background: #2e5d93; color: #fff; }\n.yani-rating-logo--worldart { background: #f28c28; color: #fff; }\n\n.yani-card-rating__logo {\n    margin-right: 0.25em;\n}\n\n.yani-card-rating__value {\n    font-weight: 600;\n}\n\n.yani-ratings {\n    display: grid;\n    grid-template-columns: repeat(3, minmax(8em, 1fr));\n    gap: 0.6em;\n    margin: 1em 0 1.4em;\n}\n\n.yani-ratings__item {\n    padding: 0.65em 0.8em;\n    border-radius: 0.5em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-ratings__header { display: flex; align-items: center; gap: 0.55em; }\n.yani-ratings__logo { min-width: 2.5em; height: 1.7em; font-size: 0.85em; }\n.yani-ratings__value {\n    font-size: 1.35em;\n    font-weight: 600;\n}\n\n.yani-ratings__source {\n    margin-top: 0.15em;\n    opacity: 0.78;\n}\n\n.yani-ratings__votes {\n    margin-top: 0.2em;\n    font-size: 0.75em;\n    opacity: 0.55;\n}\n\n.yani-account__content {\n    padding: 1.5em 2em 3em;\n}\n\n.yani-account__profile {\n    display: flex;\n    align-items: center;\n    padding: 1.2em;\n    border-radius: 0.8em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-account__profile.focus,\n.yani-account__info.focus,\n.yani-account__list.focus,\n.yani-account__notice.focus {\n    background: #fff;\n    color: #111;\n}\n\n.yani-account__avatar {\n    width: 7em;\n    height: 7em;\n    margin-right: 1.2em;\n    border-radius: 50%;\n    object-fit: cover;\n}\n\n.yani-account__name {\n    font-size: 1.8em;\n    font-weight: 600;\n}\n\n.yani-account__id,\n.yani-account__about {\n    margin-top: 0.35em;\n    opacity: 0.7;\n}\n\n.yani-account__warning {\n    margin-top: 0.5em;\n    color: #ff6868;\n    font-weight: 600;\n}\n\n.yani-account__grid,\n.yani-account__lists {\n    display: grid;\n    grid-template-columns: repeat(3, minmax(10em, 1fr));\n    gap: 0.7em;\n    margin-top: 1em;\n}\n\n.yani-account__info,\n.yani-account__list,\n.yani-account__notice {\n    padding: 1em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-account__info-title,\n.yani-account__list-time,\n.yani-account__notice-text {\n    opacity: 0.65;\n}\n\n.yani-account__info-value,\n.yani-account__list-count,\n.yani-account__notice-title {\n    margin-top: 0.3em;\n    font-size: 1.2em;\n    font-weight: 600;\n}\n\n.yani-account__list-title {\n    font-size: 1.15em;\n    font-weight: 600;\n}\n\n.yani-account__list-time {\n    margin-top: 0.35em;\n}\n\n.yani-account__section-title {\n    margin-top: 1.5em;\n    font-size: 1.45em;\n    font-weight: 600;\n}\n\n.yani-status__content {\n    padding: 1.4em 2em 3em;\n}\n\n.yani-status__periods {\n    display: flex;\n    gap: 0.65em;\n    margin-bottom: 1em;\n}\n\n.yani-status__period {\n    padding: 0.65em 1.15em;\n    border-radius: 0.55em;\n    background: rgba(255, 255, 255, 0.14);\n}\n\n.yani-status__period.active {\n    background: #ef6470;\n    color: #fff;\n}\n\n.yani-status__period.focus {\n    box-shadow: 0 0 0 0.16em #fff;\n}\n\n.yani-status__summary {\n    display: flex;\n    align-items: center;\n    gap: 2em;\n    padding: 1.4em;\n    border-radius: 0.8em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-status__summary.focus,\n.yani-status__domain.focus,\n.yani-status__refresh.focus,\n.yani-status__error.focus {\n    background: #fff;\n    color: #111;\n}\n\n.yani-status__ring {\n    display: flex;\n    flex: 0 0 10em;\n    align-items: center;\n    justify-content: center;\n    width: 10em;\n    height: 10em;\n    border-radius: 50%;\n}\n\n.yani-status__ring-center {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    width: 7em;\n    height: 7em;\n    border-radius: 50%;\n    background: #292929;\n    color: #fff;\n}\n\n.yani-status__ring-center strong {\n    font-size: 1.65em;\n}\n\n.yani-status__ring-center span {\n    margin-top: 0.2em;\n    opacity: 0.7;\n}\n\n.yani-status__summary-info {\n    flex: 1;\n}\n\n.yani-status__headline {\n    margin-bottom: 0.7em;\n    font-size: 1.8em;\n    font-weight: 700;\n}\n\n.yani-status__metrics {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(8em, 1fr));\n    gap: 0.6em;\n}\n\n.yani-status__metric {\n    padding: 0.65em;\n    border-radius: 0.45em;\n    background: rgba(0, 0, 0, 0.18);\n}\n\n.yani-status__metric span,\n.yani-status__metric strong {\n    display: block;\n}\n\n.yani-status__metric span {\n    margin-bottom: 0.25em;\n    opacity: 0.65;\n}\n\n.yani-status__metric strong {\n    font-size: 1.1em;\n}\n\n.yani-status__legend {\n    display: flex;\n    align-items: center;\n    gap: 0.45em;\n    margin: 1.1em 0 0.7em;\n    opacity: 0.75;\n}\n\n.yani-status__dot,\n.yani-status__state {\n    display: inline-block;\n    width: 0.7em;\n    height: 0.7em;\n    border-radius: 50%;\n}\n\n.yani-status__dot--up,\n.yani-status--up .yani-status__state,\n.yani-status__bar--up { background: #4caf50; }\n.yani-status__dot--degraded,\n.yani-status--degraded .yani-status__state,\n.yani-status__bar--degraded { background: #f0a33b; }\n.yani-status__dot--down,\n.yani-status--down .yani-status__state,\n.yani-status__bar--down { background: #db4455; }\n.yani-status__bar--unknown { background: #777; }\n\n.yani-status__domain {\n    margin-bottom: 0.65em;\n    padding: 0.85em 1em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-status__domain-head,\n.yani-status__domain-name,\n.yani-status__domain-values {\n    display: flex;\n    align-items: center;\n}\n\n.yani-status__domain-head {\n    justify-content: space-between;\n    margin-bottom: 0.6em;\n}\n\n.yani-status__domain-name {\n    gap: 0.55em;\n}\n\n.yani-status__domain-name strong {\n    font-size: 1.1em;\n}\n\n.yani-status__domain-name small {\n    opacity: 0.5;\n}\n\n.yani-status__domain-values {\n    gap: 1em;\n    opacity: 0.7;\n}\n\n.yani-status__history {\n    display: flex;\n    gap: 0.12em;\n    width: 100%;\n    height: 1.35em;\n}\n\n.yani-status__bar {\n    flex: 1 1 0;\n    min-width: 0.18em;\n    border-radius: 0.15em;\n}\n\n.yani-status__refresh,\n.yani-status__error {\n    margin-top: 1em;\n    padding: 0.9em 1.1em;\n    border-radius: 0.6em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-status__source {\n    margin-top: 0.8em;\n    opacity: 0.55;\n}\n\n.yani-status__refresh {\n    display: inline-block;\n}\n\n.yani-status__error strong,\n.yani-status__error span {\n    display: block;\n}\n\n.yani-status__error span {\n    margin-top: 0.4em;\n    opacity: 0.65;\n}\n\n@media (max-width: 700px) {\n    .yani-schedule__content { padding: 1em; }\n    .yani-schedule__release { min-width: 5em; }\n    .yani-schedule__timezone { display: none; }\n    .yani-ratings { grid-template-columns: repeat(2, minmax(7em, 1fr)); }\n    .yani-account__content { padding: 1em; }\n    .yani-account__grid,\n    .yani-account__lists { grid-template-columns: repeat(2, minmax(8em, 1fr)); }\n    .yani-status__content { padding: 1em; }\n    .yani-status__summary { align-items: flex-start; gap: 1em; }\n    .yani-status__ring { flex-basis: 7em; width: 7em; height: 7em; }\n    .yani-status__ring-center { width: 5em; height: 5em; }\n    .yani-status__metrics { grid-template-columns: repeat(2, minmax(7em, 1fr)); }\n    .yani-status__domain-name small { display: none; }\n}\n";
    document.head.appendChild(style);

(function (window) {
    'use strict';

    window.LampaYaniConfig = {
        version: '0.12.2',
        apiBase: 'https://api.yani.tv',
        statusUrl: 'https://andrewcodeman.github.io/lampa_yani/status/status.json',
        applicationHeader: 'p6_gpujl6d3pho8n', // Public Yani application token
        cacheTtl: 300000
    };
}(window));

(function (window) {
    'use strict';

    var key = 'yani_language';
    var messages = {
        ru: {
            catalog: 'Каталог', genres: 'Жанры', search: 'Поиск', schedule: 'Расписание', continue_watching: 'Продолжить просмотр', history_empty: 'История просмотра YummyAnime пуста', history_load_error: 'Не удалось загрузить историю просмотра YummyAnime', status: 'Статус', top_rated: 'Лучшие', account: 'Аккаунт', anime: 'Аниме',
            catalog_load_error: 'Не удалось загрузить каталог YummyAnime', next_page_error: 'Не удалось загрузить следующую страницу YummyAnime',
            login_required: 'Войдите в YummyAnime через настройки YummyAnime', actions: 'Действия YummyAnime', actions_short: 'Действия', yummy_details: 'Подробности YummyAnime', favorite: 'Добавить в любимые', watching: 'Смотрю', planned: 'В планах', completed: 'Просмотрено', dropped: 'Брошено', postponed: 'Отложено', comments: 'Комментарии', comments_empty: 'Комментариев пока нет', replies: 'ответов', replies_title: 'Ответы на комментарий', load_more: 'Загрузить ещё', saved: 'Изменения сохранены в YummyAnime', save_error: 'Не удалось сохранить оценку',
            not_logged_in: 'Вход не выполнен', login_hint: 'Откройте Настройки → YummyAnime и выберите «Войти в YummyAnime».', account_load_error: 'Не удалось загрузить аккаунт YummyAnime', account_retry: 'Обновите токен или выполните вход заново в Настройки → YummyAnime.', authorized: 'Авторизован в YummyAnime', banned: 'Аккаунт заблокирован', registration: 'Регистрация', last_visit: 'Последний визит', roles: 'Роли', user: 'Пользователь', messages: 'Сообщения', unread: 'непрочитанных', notifications: 'Уведомления', total_lists: 'Всего в списках', list_stats: 'Статистика списков', list: 'Список', anime_count: 'аниме', total_time: 'Общее время', days_short: 'д', hours_short: 'ч',
            period_3hour: '3 часа', period_day: 'День', period_week: 'Неделя', period_month: 'Месяц', all_up: 'Все системы работают', all_down: 'Сервисы недоступны', no_monitoring: 'Нет данных мониторинга', degraded: 'Возникли неполадки', checks: 'замеров', availability: 'Доступность', average_load: 'Средняя загрузка', errors: 'Ошибок', updated: 'Обновлено', up: 'Работает', unstable: 'Нестабильно', down: 'Недоступно', source: 'Источник', period: 'период', snapshot_notice: 'снимок обновляется каждые 5 минут', refresh_status: 'Обновить статус', refreshing_status: 'Обновляем статус YummyAnime', status_load_error: 'Не удалось загрузить статус YummyAnime', status_error_hint: 'Данные мониторинга временно недоступны. Это не означает, что сам плагин не работает.', milliseconds: 'мс', domain_old: 'Старый сайт', domain_old_mirror: 'Старый сайт (зеркало)', domain_new: 'Новый сайт', domain_new_mirror: 'Новый сайт (зеркало)', domain_api: 'YummyAnime API', domain_waf: 'Защита',
            schedule_load_error: 'Не удалось загрузить расписание YummyAnime', no_releases: 'Нет запланированных выпусков', local_time: 'местное время', today: 'Сегодня', tomorrow: 'Завтра', release: 'Релиз', episode: 'Серия', of: 'из', watch: 'Смотреть', continue_episode: 'Продолжить с серии', choose_voice: 'Выберите озвучку и источник', choose_episode: 'Выберите серию', choose_anime: 'Выберите аниме YummyAnime', no_yummy_match: 'Аниме не найдено в YummyAnime', lampa_card_fallback: 'Карточка Lampa не найдена — открыты данные YummyAnime', no_videos: 'Для этого аниме пока нет доступных серий', videos_load_error: 'Не удалось загрузить серии YummyAnime', player: 'Плеер', player_preference: 'Предпочтительный плеер', player_preference_description: 'Выбранный источник будет показан первым; остальные варианты останутся доступны', player_last: 'Последний выбранный', player_ask: 'Всегда по алфавиту', minutes_short: 'мин', views_short: 'просм.', thousand_short: ' тыс.', million_short: ' млн', clear_history: 'Очистить историю просмотра', clear_history_description: 'Удалить сохранённые последние серии YummyAnime на этом устройстве', history_cleared: 'История просмотра YummyAnime очищена', open_lampa_search: 'Открыть в поиске Lampa',
            genres_empty: 'YummyAnime не вернул список жанров', genres_title: 'Жанры YummyAnime', genres_load_error: 'Не удалось загрузить жанры YummyAnime', search_title: 'Поиск YummyAnime', untitled: 'Без названия', ratings_count: 'оценок', voices_short: 'озв.',
            language_name: 'Язык / Language', language_description: 'Язык интерфейса расширения YummyAnime', language_changed: 'Язык YummyAnime изменён. Откройте расширение заново.', version_name: 'Версия YummyAnime', website_description: 'Официальный сайт YummyAnime',
            login_name: 'Войти в YummyAnime', login_description: 'Вход по никнейму или email и паролю YummyAnime', refresh_name: 'Обновить токен YummyAnime', refresh_description: 'Обновить действующий Bearer-токен аккаунта', login_first: 'Сначала войдите в YummyAnime', token_refreshed: 'Токен YummyAnime обновлён', token_refresh_error: 'Не удалось обновить токен YummyAnime', logout_name: 'Выйти из YummyAnime', logout_description: 'Завершить сессию и удалить локальный токен', not_logged: 'Вход в YummyAnime не выполнен', logged_out: 'Вы вышли из YummyAnime', token_removed: 'Локальный токен YummyAnime удалён', api_check_name: 'Проверить YummyAnime API', api_check_description: 'Проверить доступность API и публичный токен приложения', api_ok: 'YummyAnime API работает', api_error: 'YummyAnime API недоступен или публичный токен неверный', email_prompt: 'Никнейм или Email', email_required: 'Введите никнейм или email YummyAnime', password_prompt: 'Пароль YummyAnime', password_required: 'Введите пароль YummyAnime', login_ok: 'Вход в YummyAnime выполнен', login_error: 'Ошибка входа в YummyAnime', input_unavailable: 'Ввод недоступен в этой версии Lampa', comments_title: 'Комментарии YummyAnime', comments_error: 'Не удалось загрузить комментарии', kinopoisk: 'Кинопоиск'
        },
        en: {
            catalog: 'Catalog', genres: 'Genres', search: 'Search', schedule: 'Schedule', continue_watching: 'Continue Watching', history_empty: 'YummyAnime playback history is empty', history_load_error: 'Failed to load YummyAnime playback history', status: 'Status', top_rated: 'Top Rated', account: 'Account', anime: 'Anime',
            catalog_load_error: 'Failed to load the YummyAnime catalog', next_page_error: 'Failed to load the next YummyAnime page',
            login_required: 'Sign in to YummyAnime in YummyAnime settings', actions: 'YummyAnime actions', actions_short: 'Actions', yummy_details: 'YummyAnime details', favorite: 'Add to favorites', watching: 'Watching', planned: 'Planned', completed: 'Completed', dropped: 'Dropped', postponed: 'On hold', comments: 'Comments', comments_empty: 'There are no comments yet', replies: 'replies', replies_title: 'Comment replies', load_more: 'Load more', saved: 'Changes saved to YummyAnime', save_error: 'Failed to save the rating',
            not_logged_in: 'Not signed in', login_hint: 'Open Settings → YummyAnime and select “Sign in to YummyAnime”.', account_load_error: 'Failed to load the YummyAnime account', account_retry: 'Refresh the token or sign in again under Settings → YummyAnime.', authorized: 'Signed in to YummyAnime', banned: 'Account is banned', registration: 'Registered', last_visit: 'Last visit', roles: 'Roles', user: 'User', messages: 'Messages', unread: 'unread', notifications: 'Notifications', total_lists: 'Total in lists', list_stats: 'List statistics', list: 'List', anime_count: 'anime', total_time: 'Total time', days_short: 'd', hours_short: 'h',
            period_3hour: '3 hours', period_day: 'Day', period_week: 'Week', period_month: 'Month', all_up: 'All systems operational', all_down: 'Services unavailable', no_monitoring: 'No monitoring data', degraded: 'Service disruption detected', checks: 'checks', availability: 'Availability', average_load: 'Average response', errors: 'Failures', updated: 'Updated', up: 'Operational', unstable: 'Degraded', down: 'Unavailable', source: 'Source', period: 'period', snapshot_notice: 'snapshot refreshes every 5 minutes', refresh_status: 'Refresh status', refreshing_status: 'Refreshing YummyAnime status', status_load_error: 'Failed to load YummyAnime status', status_error_hint: 'Monitoring data is temporarily unavailable. This does not mean that the plugin itself is not working.', milliseconds: 'ms', domain_old: 'Old website', domain_old_mirror: 'Old website (mirror)', domain_new: 'New website', domain_new_mirror: 'New website (mirror)', domain_api: 'YummyAnime API', domain_waf: 'Protection',
            schedule_load_error: 'Failed to load the YummyAnime schedule', no_releases: 'No scheduled releases', local_time: 'local time', today: 'Today', tomorrow: 'Tomorrow', release: 'Release', episode: 'Episode', of: 'of', watch: 'Watch', continue_episode: 'Continue from episode', choose_voice: 'Choose dubbing and source', choose_episode: 'Choose episode', choose_anime: 'Choose YummyAnime title', no_yummy_match: 'Anime was not found on YummyAnime', lampa_card_fallback: 'No Lampa card was found — YummyAnime details were opened', no_videos: 'No episodes are currently available for this anime', videos_load_error: 'Failed to load YummyAnime episodes', player: 'Player', player_preference: 'Preferred player', player_preference_description: 'The selected source is listed first while all other variants remain available', player_last: 'Last selected', player_ask: 'Always alphabetical', minutes_short: 'min', views_short: 'views', thousand_short: 'K', million_short: 'M', clear_history: 'Clear playback history', clear_history_description: 'Remove saved last episodes for YummyAnime on this device', history_cleared: 'YummyAnime playback history cleared', open_lampa_search: 'Open in Lampa search',
            genres_empty: 'YummyAnime returned no genres', genres_title: 'YummyAnime Genres', genres_load_error: 'Failed to load YummyAnime genres', search_title: 'YummyAnime Search', untitled: 'Untitled', ratings_count: 'ratings', voices_short: 'dub.',
            language_name: 'Language / Язык', language_description: 'YummyAnime extension interface language', language_changed: 'YummyAnime language changed. Reopen the extension.', version_name: 'YummyAnime version', website_description: 'Official YummyAnime website',
            login_name: 'Sign in to YummyAnime', login_description: 'Sign in with your YummyAnime nickname or email and password', refresh_name: 'Refresh YummyAnime token', refresh_description: 'Refresh the current account Bearer token', login_first: 'Sign in to YummyAnime first', token_refreshed: 'YummyAnime token refreshed', token_refresh_error: 'Failed to refresh the YummyAnime token', logout_name: 'Sign out of YummyAnime', logout_description: 'End the session and remove the local token', not_logged: 'Not signed in to YummyAnime', logged_out: 'Signed out of YummyAnime', token_removed: 'Local YummyAnime token removed', api_check_name: 'Check YummyAnime API', api_check_description: 'Check the API and public application token', api_ok: 'YummyAnime API is operational', api_error: 'YummyAnime API is unavailable or the public token is invalid', email_prompt: 'Nickname or Email', email_required: 'Enter your YummyAnime nickname or email', password_prompt: 'YummyAnime password', password_required: 'Enter your YummyAnime password', login_ok: 'Signed in to YummyAnime', login_error: 'YummyAnime sign-in failed', input_unavailable: 'Input is unavailable in this Lampa version', comments_title: 'YummyAnime Comments', comments_error: 'Failed to load comments', kinopoisk: 'KinoPoisk'
        }
    };

    function language() {
        var value = window.Lampa && Lampa.Storage ? Lampa.Storage.get(key, 'ru') : 'ru';
        return value === 'en' ? 'en' : 'ru';
    }

    window.LampaYaniI18n = {
        getLanguage: language,
        setLanguage: function (value) {
            var next = value === 'en' ? 'en' : 'ru';
            if (window.Lampa && Lampa.Storage) Lampa.Storage.set(key, next);
            return next;
        },
        locale: function () { return language() === 'en' ? 'en-US' : 'ru-RU'; },
        t: function (name) {
            return (messages[language()] && messages[language()][name]) || messages.ru[name] || name;
        }
    };
}(window));

(function (window) {
    'use strict';

    var key = 'lampa_yani_auth';
    var memory = {};

    function readStored() {
        try {
            var stored = Lampa.Storage.get(key, '{}');
            if (stored && typeof stored === 'object') return stored;
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    }

    function tokenFrom(data) {
        if (typeof data === 'string') return data.trim();
        return data && String(data.token || data.access_token || '').trim();
    }

    window.LampaYaniAuth = {
        get: function () {
            var stored = readStored();
            return tokenFrom(stored) ? stored : memory;
        },
        token: function () { return tokenFrom(this.get()); },
        save: function (data) {
            var token = tokenFrom(data);
            if (!token) throw new Error('Login response did not contain a token');
            memory = {token: token, refreshed_at: data.refreshed_at || Date.now(), login: data.login || ''};
            Lampa.Storage.set(key, JSON.stringify(memory));
            return memory;
        },
        clear: function () { memory = {}; Lampa.Storage.set(key, '{}'); },
        refresh: function () {
            if (!this.token()) return Promise.reject(new Error('Not authorized'));
            return fetch(LampaYaniConfig.apiBase + '/profile/token', {
                headers: {
                    'X-Application': LampaYaniConfig.applicationHeader,
                    Authorization: 'Bearer ' + this.token(),
                    Accept: 'application/json'
                }
            }).then(function (response) {
                if (!response.ok) throw new Error('Token refresh failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                var current = LampaYaniAuth.get();
                var data = payload.response || payload;
                LampaYaniAuth.save({token: tokenFrom(data), refreshed_at: Date.now(), login: current.login});
                return LampaYaniAuth.get();
            });
        },
        login: function (login, password) {
            return fetch(LampaYaniConfig.apiBase + '/profile/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'X-Application': LampaYaniConfig.applicationHeader, Accept: 'application/json'},
                body: JSON.stringify({login: login, password: password, need_json: true})
            }).then(function (response) {
                if (!response.ok) throw new Error('Login failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                var data = payload.response || payload;
                LampaYaniAuth.save({token: tokenFrom(data), refreshed_at: Date.now(), login: login});
                return data;
            });
        },
        logout: function () {
            var token = this.token();
            if (!token) {
                this.clear();
                return Promise.resolve(true);
            }
            return fetch(LampaYaniConfig.apiBase + '/profile/logout', {
                method: 'POST',
                headers: {
                    'X-Application': LampaYaniConfig.applicationHeader,
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json'
                }
            }).then(function (response) {
                if (!response.ok) throw new Error('Logout failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                LampaYaniAuth.clear();
                return payload.response || payload;
            }).catch(function (error) {
                LampaYaniAuth.clear();
                throw error;
            });
        }
    };
}(window));

(function (window) {
    'use strict';

    var config = window.LampaYaniConfig;

    function request(path, options) {
        options = options || {};
        var headers = options.headers || {};
        var apiLanguage = window.LampaYaniI18n ? LampaYaniI18n.getLanguage() : 'ru';
        var cacheKey = 'lampa_yummyanime_cache_' + apiLanguage + '_' + path;
        var cacheTtl = config.cacheTtl || 300000;

        if (config.applicationHeader) headers['X-Application'] = config.applicationHeader;
        if (options.auth && LampaYaniAuth && LampaYaniAuth.token()) headers.Authorization = 'Bearer ' + LampaYaniAuth.token();
        headers.Accept = 'application/json';
        headers.Lang = apiLanguage;
        if (options.token) headers.Authorization = 'Bearer ' + options.token;

        return fetch(config.apiBase + path, {
            method: options.method || 'GET',
            headers: headers,
            body: options.body
        }).then(function (response) {
            if (!response.ok) throw new Error('YummyAnime API: ' + response.status);
            return response.json();
        }).then(function (payload) {
            if ((options.method || 'GET') === 'GET' && options.cache !== false && window.Lampa && Lampa.Storage) {
                Lampa.Storage.set(cacheKey, JSON.stringify({time: Date.now(), data: payload}));
            }
            return payload;
        }).catch(function (error) {
            if ((options.method || 'GET') === 'GET' && options.cache !== false && window.Lampa && Lampa.Storage) {
                try {
                    var cached = JSON.parse(Lampa.Storage.get(cacheKey, 'null'));
                    if (cached && Date.now() - cached.time < cacheTtl) return cached.data;
                } catch (ignore) {}
            }
            throw error;
        });
    }

    window.LampaYaniApi = {
        request: request,
        search: function (query, params) {
            params = params || {};
            params.q = query || undefined;
            params.limit = params.limit || 20;
            return request('/anime?' + new URLSearchParams(params));
        },
        catalog: function (params) {
            return request('/anime?' + new URLSearchParams(params || {limit: 20}));
        },
        normalize: function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            if (Array.isArray(response)) return response;
            return response && (response.anime || response.results || response.items || response.data) || [];
        },
        normalizeGenres: function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            if (Array.isArray(response)) return response;
            return response && response.genres || [];
        },
        genres: function () {
            return request('/anime/genres');
        },
        schedule: function (params) {
            return request('/anime/schedule?' + new URLSearchParams(params || {}));
        },
        detail: function (id) {
            return request('/anime/' + encodeURIComponent(id));
        },
        videos: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/videos', {cache: false});
        },
        trailers: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/trailers');
        },
        recommendations: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/recommendations');
        },
        rate: function (id, value) {
            return request('/anime/' + encodeURIComponent(id) + '/rate', {
                method: 'PUT',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({rate: value})
            });
        },
        removeRate: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/rate', {method: 'DELETE', auth: true});
        },
        addFavorite: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/list/fav', {
                method: 'PUT',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({date: Math.floor(Date.now() / 1000)})
            });
        },
        removeFavorite: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/list/fav', {method: 'DELETE', auth: true});
        },
        addToList: function (id, list) {
            var listIds = {watching: 0, planned: 1, completed: 2, dropped: 3, postponed: 5};
            var listId = typeof list === 'number' ? list : listIds[list];
            if (typeof listId !== 'number') return Promise.reject(new Error('Unknown YummyAnime list: ' + list));
            return request('/anime/' + encodeURIComponent(id) + '/list', {
                method: 'PUT',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({list: listId, date: Math.floor(Date.now() / 1000)})
            });
        },
        comments: function (id, skip) {
            return request('/comments/anime/' + encodeURIComponent(id) + '?limit=20&sort=new&skip=' + encodeURIComponent(skip || 0));
        },
        commentChildren: function (id, skip) {
            return request('/comments/' + encodeURIComponent(id) + '/children?skip=' + encodeURIComponent(skip || 0));
        },
        normalizeComments: function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            if (Array.isArray(response)) return response;
            return response && (response.comments || response.items || response.data) || [];
        },
        profile: function () {
            return request('/profile', {auth: true, cache: false});
        },
        userListStats: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/stats/lists', {auth: true, cache: false});
        },
        userLists: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/lists', {auth: true, cache: false});
        },
        health: function () {
            return request('/anime?limit=1');
        },
        status: function () {
            return fetch(config.statusUrl + '?_=' + Date.now(), {cache: 'no-store'}).then(function (response) {
                if (!response.ok) throw new Error('YummyStatus snapshot: ' + response.status);
                return response.json();
            })
        }
    };
}(window));

(function (window) {
    'use strict';

    window.LampaYaniCatalog = {
        search: function (query, params) {
            return window.LampaYaniApi.search(query, params);
        }
    };
}(window));

(function (window) {
    'use strict';

    function t(name) {
        return window.LampaYaniI18n ? LampaYaniI18n.t(name) : name;
    }

    function locale() {
        return window.LampaYaniI18n ? LampaYaniI18n.locale() : 'ru-RU';
    }

    function goBack() {
        if (window.Lampa && Lampa.Activity && Lampa.Activity.backward) {
            Lampa.Activity.backward();
        }
    }

    window.LampaYani = {
        register: function () {
            if (!window.Lampa || !Lampa.Component || !Lampa.Component.add) {
                console.error('[YummyAnime] Unsupported Lampa version');
                return;
            }

            var yummyIcon = '<svg viewBox="0 0 20 20"><path fill="currentColor" d="M18.45 0H1.55A1.55 1.55 0 000 1.55v16.9A1.54 1.54 0 001.55 20h16.9A1.55 1.55 0 0020 18.45V1.55A1.54 1.54 0 0018.45 0Zm-2.83 5.93-2.1 2.66-2.3-5.43a6.95 6.95 0 014.4 2.77Zm-2.9 6.57h-4l2.03-4.8 1.98 4.8Zm-2.37-9.34L7.8 9.06 4.87 5.33c.64-.7 1.4-1.26 2.27-1.65a8.18 8.18 0 013.2-.52ZM3.57 7.39l3.2 4.06-1.56 3.58A6.96 6.96 0 013.57 7.39Zm6.57 9.56c-1.05.01-2.1-.2-3.05-.65l.76-1.8h5.7l.49 1.15a6.93 6.93 0 01-3.9 1.3Zm6.8-7.07a7.8 7.8 0 01-1.17 4L14.55 11l2.17-2.77c.14.54.21 1.1.23 1.65Z"/></svg>';

            function addInterface() {
                if (!Lampa.Menu || !Lampa.Menu.addButton) return;

            try {
                addSettings();
                registerOnlineSource();
            } catch (settingsError) {
                console.error('[YummyAnime] Settings registration failed', settingsError);
            }
            var account = LampaYaniAuth.get();
            if (account.token && (!account.refreshed_at || Date.now() - account.refreshed_at > 2 * 24 * 60 * 60 * 1000)) {
                LampaYaniAuth.refresh().catch(function () { console.warn('[YummyAnime] Token refresh failed'); });
            }

            Lampa.Menu.addButton(yummyIcon, 'YummyAnime', function () {
                Lampa.Activity.push({
                    url: 'yani',
                    title: 'YummyAnime',
                    component: 'yani_home'
                });
            });

            }

            if (window.appready) addInterface();
            else {
                Lampa.Listener.follow('app', function (event) {
                    if (event.type === 'ready') addInterface();
                });
            }

            Lampa.Component.add('yani_home', Home);

            Lampa.Component.add('yani_catalog', function (object) {
                var comp = new Lampa.InteractionCategory(object);
                var baseParams = copyParams(object.params || {limit: 30, sort: 'top', sort_forward: false});
                var limit = Number(baseParams.limit || 30);
                var maxPages = Math.ceil(20000 / limit) + 1;
                var seen = {};
                var requestedOffsets = {};

                object.page = 1;
                baseParams.limit = limit;
                baseParams.offset = Number(baseParams.offset || 0);

                comp.create = function () {
                    var self = this;
                    this.activity.loader(true);
                    LampaYaniApi.catalog(baseParams)
                        .then(function (payload) {
                            var raw = LampaYaniApi.normalize(payload);
                            var results = mapUniqueCards(raw, seen);
                            requestedOffsets[baseParams.offset] = true;
                            if (raw.length < limit) object.page = maxPages;
                            self.build({results: results, total_pages: maxPages, title: t('anime')});
                        })
                        .catch(function (error) {
                            console.error('[YummyAnime]', error);
                            self.activity.loader(false);
                            Lampa.Noty.show(t('catalog_load_error'));
                        });
                };
                comp.nextPageReuest = function (requestObject, resolve, reject) {
                    var params = copyParams(baseParams);
                    params.offset = baseParams.offset + (requestObject.page - 1) * limit;
                    if (requestedOffsets[params.offset]) {
                        resolve({results: [], total_pages: maxPages, title: t('anime')});
                        return;
                    }
                    requestedOffsets[params.offset] = true;

                    LampaYaniApi.catalog(params).then(function (payload) {
                        var raw = LampaYaniApi.normalize(payload);
                        var results = mapUniqueCards(raw, seen);
                        if (raw.length < limit) requestObject.page = maxPages;
                        resolve({results: results, total_pages: maxPages, title: t('anime')});
                    }).catch(function (error) {
                        delete requestedOffsets[params.offset];
                        requestObject.page = Math.max(1, requestObject.page - 1);
                        console.error('[YummyAnime]', error);
                        Lampa.Noty.show(t('next_page_error'));
                        reject(error);
                    });
                };
                comp.cardRender = function (page, element, card) {
                    bindYummyCard(element, card);
                };
                return comp;
            });

            Lampa.Component.add('yani_schedule', Schedule);
            Lampa.Component.add('yani_history', History);

            Lampa.Component.add('yani_detail', Detail);
            Lampa.Component.add('yani_account', Account);

            Lampa.Component.add('yani_status', StatusDashboard);
            Lampa.Component.add('yani_player', IframePlayer);

            installFullRating();

            console.log('[YummyAnime] Extension registered');
        }
    };

    function Home(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var html = $('<div class="yani-home"></div>');
        var grid = $('<div class="yani-home__grid"></div>');
        var last;

        var items = [
            {title: t('catalog'), icon: '◆', action: function () {
                Lampa.Activity.push({url: 'yani/catalog', title: 'YummyAnime ' + t('catalog'), component: 'yani_catalog', params: {limit: 30, sort: 'top', sort_forward: false}});
            }},
            {title: t('genres'), icon: '≡', action: openGenres},
            {title: t('search'), icon: '⌕', action: openSearch},
            {title: t('schedule'), icon: '▦', action: function () {
                Lampa.Activity.push({url: 'yani/schedule', title: 'YummyAnime ' + t('schedule'), component: 'yani_schedule'});
            }},
            {title: t('continue_watching'), icon: '▶', action: function () {
                Lampa.Activity.push({url: 'yani/history', title: 'YummyAnime ' + t('continue_watching'), component: 'yani_history'});
            }},
            {title: t('status'), icon: '●', action: function () {
                Lampa.Activity.push({url: 'yani/status', title: 'YummyAnime ' + t('status'), component: 'yani_status'});
            }},
            {title: t('top_rated'), icon: '★', action: function () {
                Lampa.Activity.push({url: 'yani/top-rated', title: 'YummyAnime ' + t('top_rated'), component: 'yani_catalog', params: {limit: 30, sort: 'rating', sort_forward: false}});
            }},
            {title: t('account'), icon: '●', action: openAccount}
        ];

        this.create = function () {
            items.forEach(function (item) {
                var button = $('<div class="yani-home__item selector"><div class="yani-home__icon">' + item.icon + '</div><div class="yani-home__title">' + item.title + '</div></div>');
                button.on('hover:focus', function (event) {
                    last = event.target;
                    scroll.update($(event.target), true);
                });
                button.on('hover:enter', item.action);
                grid.append(button);
            });
            scroll.append(grid);
            html.append(scroll.render(true));
            this.activity.loader(false);
            this.activity.toggle();
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { Navigator.move('down'); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function History(object) {
        var comp = new Lampa.InteractionCategory(object);

        comp.create = function () {
            var self = this;
            var history = playbackHistory();
            var ids = Object.keys(history).sort(function (a, b) {
                return Number(history[b].updated_at || 0) - Number(history[a].updated_at || 0);
            }).slice(0, 20);

            this.activity.loader(true);
            if (!ids.length) {
                this.build({results: [], total_pages: 1, title: t('history_empty')});
                Lampa.Noty.show(t('history_empty'));
                return;
            }

            Promise.all(ids.map(function (id) {
                return LampaYaniApi.detail(id).then(function (payload) {
                    var item = payload && payload.response ? payload.response : payload;
                    return item ? toCard(item) : null;
                }).catch(function () { return null; });
            })).then(function (cards) {
                self.build({results: cards.filter(Boolean), total_pages: 1, title: t('continue_watching')});
            }).catch(function (error) {
                console.error('[YummyAnime History]', error);
                self.activity.loader(false);
                Lampa.Noty.show(t('history_load_error'));
            });
        };

        comp.cardRender = function (page, element, card) {
            bindYummyCard(element, card);
        };

        return comp;
    }

    function bindYummyCard(element, card) {
        addCardRatings(element, card);
        addCardMediaBadges(element, card);
        card.onEnter = function () {
            if (element.yani_id) openStandardLampaCard(element);
        };
        card.onMenu = function () {
            if (element.yani_id) showYummyActions(element);
        };
    }

    function addCardMediaBadges(element, card) {
        var requested = false;
        var cardRender = card && card.render ? $(card.render(true)) : $(element);
        renderCardMediaBadges(element, card, card.yani_media || mediaMeta(card));
        if (!card.yani_id || (card.yani_media && card.yani_media.loaded)) return;

        cardRender.on('hover:focus', function () {
            if (requested) return;
            requested = true;
            LampaYaniApi.videos(card.yani_id).then(function (payload) {
                var videos = payload && payload.response ? payload.response : payload;
                card.yani_media = mediaMeta({videos: Array.isArray(videos) ? videos : []});
                card.yani_media.loaded = true;
                renderCardMediaBadges(element, card, card.yani_media);
            }).catch(function () {});
        });
    }

    function renderCardMediaBadges(element, card, meta) {
        if (!meta || (!meta.quality && !meta.voices)) return;
        var render = card && card.render ? $(card.render(true)) : $(element);
        var view = $('.card__view', render).first();
        if (!view.length) return;
        var block = $('.yani-card-media', view);
        if (!block.length) block = $('<div class="yani-card-media"></div>').appendTo(view);
        block.empty();
        if (meta.quality) block.append($('<span class="yani-card-media__badge yani-card-media__quality"></span>').text(meta.quality));
        if (meta.voices) block.append($('<span class="yani-card-media__badge yani-card-media__voices"></span>').text(meta.voices + ' ' + t('voices_short')));
    }

    function showYummyActions(card) {
        if (!card || !card.yani_id) return;
        var items = [
            {title: t('watch'), action: 'watch'},
            {title: t('yummy_details'), action: 'details'},
            {title: t('comments'), action: 'comments'}
        ];
        if (LampaYaniAuth.token()) {
            items = items.concat([
                {title: t('favorite'), action: 'favorite'},
                {title: t('watching'), action: 'watching'},
                {title: t('planned'), action: 'planned'},
                {title: t('completed'), action: 'completed'},
                {title: t('dropped'), action: 'dropped'},
                {title: t('postponed'), action: 'postponed'}
            ], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (value) {
                return {title: value + '/10', value: value};
            }));
        } else {
            items.push({title: t('login_name'), action: 'login'});
        }

        Lampa.Select.show({
            title: t('actions'),
            items: items,
            onSelect: function (item) {
                if (item.action === 'watch') return openVideos(card);
                if (item.action === 'details') return openYummyDetail(card, false);
                if (item.action === 'comments') return commentsMenu(card.yani_id);
                if (item.action === 'login') return openSettingsLogin();
                if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('login_required'));
                var action = item.action === 'favorite' ? LampaYaniApi.addFavorite(card.yani_id) : item.action ? LampaYaniApi.addToList(card.yani_id, item.action) : LampaYaniApi.rate(card.yani_id, item.value);
                action.then(function () { Lampa.Noty.show(t('saved')); }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('save_error'));
                });
            }
        });
    }

    function Account(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var html = $('<div class="yani-account"></div>');
        var content = $('<div class="yani-account__content"></div>');
        var last;

        this.create = function () {
            var self = this;
            this.activity.loader(true);

            if (!LampaYaniAuth.token()) {
                addAccountNotice(t('not_logged_in'), t('login_hint'));
                finish(self);
                return;
            }

            LampaYaniApi.profile().then(function (payload) {
                var profile = payload && payload.response ? payload.response : payload;
                return Promise.all([
                    Promise.resolve(profile),
                    LampaYaniApi.userListStats(profile.id).then(responseData).catch(function () { return []; }),
                    LampaYaniApi.userLists(profile.id).then(responseData).catch(function () { return []; })
                ]);
            }).then(function (result) {
                renderAccount(result[0], result[1], result[2]);
                finish(self);
            }).catch(function (error) {
                console.error('[YummyAnime]', error);
                addAccountNotice(t('account_load_error'), t('account_retry'));
                finish(self);
            });
        };

        function finish(component) {
            scroll.append(content);
            html.append(scroll.render(true));
            component.activity.loader(false);
            component.activity.toggle();
        }

        function responseData(payload) {
            return payload && payload.response ? payload.response : payload || [];
        }

        function addAccountNotice(title, description) {
            var notice = $('<div class="yani-account__notice selector"></div>');
            notice.append($('<div class="yani-account__notice-title"></div>').text(title));
            notice.append($('<div class="yani-account__notice-text"></div>').text(description));
            bindAccountFocus(notice);
            content.append(notice);
        }

        function renderAccount(profile, stats, lists) {
            stats = Array.isArray(stats) ? stats : [];
            lists = Array.isArray(lists) ? lists : [];
            var header = $('<div class="yani-account__profile selector"></div>');
            var avatar = profile.avatars && (profile.avatars.big || profile.avatars.full || profile.avatars.small);
            if (avatar && avatar.indexOf('//') === 0) avatar = 'https:' + avatar;
            if (avatar) header.append($('<img class="yani-account__avatar" alt="">').attr('src', avatar));

            var identity = $('<div class="yani-account__identity"></div>');
            identity.append($('<div class="yani-account__name"></div>').text(profile.nickname || 'YummyAnime User'));
            identity.append($('<div class="yani-account__status"></div>').text(t('authorized')));
            identity.append($('<div class="yani-account__id"></div>').text('ID ' + profile.id));
            if (profile.about) identity.append($('<div class="yani-account__about"></div>').text(profile.about));
            if (profile.banned) identity.append($('<div class="yani-account__warning"></div>').text(t('banned')));
            header.append(identity);
            bindAccountFocus(header);
            content.append(header);

            var info = $('<div class="yani-account__grid"></div>');
            addInfo(info, t('registration'), formatAccountDate(profile.register_date));
            addInfo(info, t('last_visit'), formatAccountDate(profile.last_online));
            addInfo(info, t('roles'), profile.roles && profile.roles.length ? profile.roles.join(', ') : t('user'));
            addInfo(info, t('messages'), String(profile.messages && profile.messages.unread_count || 0) + ' ' + t('unread'));
            addInfo(info, t('notifications'), String(profile.notifications && profile.notifications.count || 0));
            addInfo(info, t('total_lists'), String(lists.length || 0));
            content.append(info);

            var counts = {};
            lists.forEach(function (anime) {
                var userList = anime.user && anime.user.list;
                if (!userList) return;
                if (userList.list && typeof userList.list.id !== 'undefined') counts[userList.list.id] = (counts[userList.list.id] || 0) + 1;
                if (userList.is_fav) counts[4] = (counts[4] || 0) + 1;
            });

            content.append($('<div class="yani-account__section-title"></div>').text(t('list_stats')));
            var listGrid = $('<div class="yani-account__lists"></div>');
            stats.forEach(function (stat) {
                var list = stat.list || {};
                var tile = $('<div class="yani-account__list selector"></div>');
                tile.append($('<div class="yani-account__list-title"></div>').text(list.title || t('list')));
                tile.append($('<div class="yani-account__list-count"></div>').text(String(counts[list.id] || 0) + ' ' + t('anime_count')));
                tile.append($('<div class="yani-account__list-time"></div>').text(t('total_time') + ': ' + formatWatchTime(stat.seconds)));
                bindAccountFocus(tile);
                listGrid.append(tile);
            });
            content.append(listGrid);
        }

        function addInfo(grid, title, value) {
            var tile = $('<div class="yani-account__info selector"></div>');
            tile.append($('<div class="yani-account__info-title"></div>').text(title));
            tile.append($('<div class="yani-account__info-value"></div>').text(value || '—'));
            bindAccountFocus(tile);
            grid.append(tile);
        }

        function bindAccountFocus(element) {
            element.on('hover:focus', function (event) {
                last = event.target;
                scroll.update($(event.target), true);
            });
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { Navigator.move('down'); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function formatAccountDate(timestamp) {
        if (!timestamp) return '—';
        try {
            return new Date(Number(timestamp) * 1000).toLocaleDateString(locale(), {day: 'numeric', month: 'long', year: 'numeric'});
        } catch (error) {
            return new Date(Number(timestamp) * 1000).toLocaleDateString();
        }
    }

    function formatWatchTime(seconds) {
        var hours = Math.floor(Number(seconds || 0) / 3600);
        var days = Math.floor(hours / 24);
        var restHours = hours % 24;
        return days ? days + ' ' + t('days_short') + ' ' + restHours + ' ' + t('hours_short') : hours + ' ' + t('hours_short');
    }

    function StatusDashboard(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var html = $('<div class="yani-status"></div>');
        var content = $('<div class="yani-status__content"></div>');
        var last;
        var ready = false;
        var currentPeriod = '3hour';

        this.create = function () {
            scroll.append(content);
            html.append(scroll.render(true));
            load(true);
        };

        function load(first) {
            var self = thisComponent;
            if (first) self.activity.loader(true);
            LampaYaniApi.status().then(function (payload) {
                renderStatus(payload);
                if (first) {
                    self.activity.loader(false);
                    self.activity.toggle();
                    ready = true;
                }
            }).catch(function (error) {
                console.error('[YummyAnime Status]', error);
                renderStatusError();
                if (first) {
                    self.activity.loader(false);
                    self.activity.toggle();
                    ready = true;
                }
            });
        }

        var thisComponent = this;

        function renderStatus(data) {
            content.empty();
            last = null;
            var periods = data.periods || null;
            var periodData = periods ? (periods[currentPeriod] || periods[data.default_period] || periods['3hour']) : data;
            if (!periodData) return renderStatusError();
            var periodLabels = {'3hour': t('period_3hour'), day: t('period_day'), week: t('period_week'), month: t('period_month')};
            var periodSwitch = $('<div class="yani-status__periods"></div>');
            Object.keys(periodLabels).forEach(function (period) {
                var button = $('<div class="yani-status__period selector"></div>').text(periodLabels[period]);
                if (period === currentPeriod) button.addClass('active');
                button.on('hover:enter', function () {
                    currentPeriod = period;
                    renderStatus(data);
                });
                bindStatusFocus(button);
                periodSwitch.append(button);
            });
            content.append(periodSwitch);

            data = periodData;
            var summary = data.summary || {};
            var status = summary.status || 'unknown';
            var statusTitle = status === 'up' ? t('all_up') : status === 'down' ? t('all_down') : status === 'unknown' ? t('no_monitoring') : t('degraded');
            var ringColor = status === 'up' ? '#4caf50' : status === 'down' ? '#db4455' : status === 'unknown' ? '#888' : '#f0a33b';

            var summaryBlock = $('<div class="yani-status__summary selector yani-status--' + status + '"></div>');
            var ring = $('<div class="yani-status__ring"><div class="yani-status__ring-center"></div></div>');
            ring.css('background', 'conic-gradient(#4caf50 0 ' + Number(summary.uptime_percent || 0) + '%, #db4455 ' + Number(summary.uptime_percent || 0) + '% 100%)');
            ring.find('.yani-status__ring-center').append($('<strong></strong>').text(summary.checks || 0), $('<span></span>').text(t('checks')));

            var summaryInfo = $('<div class="yani-status__summary-info"></div>');
            summaryInfo.append($('<div class="yani-status__headline"></div>').css('color', ringColor).text(statusTitle));
            var metrics = $('<div class="yani-status__metrics"></div>');
            metrics.append(statusMetric(t('availability'), Number(summary.uptime_percent || 0).toFixed(1) + '%'));
            metrics.append(statusMetric(t('average_load'), String(summary.average_ms || 0) + ' ' + t('milliseconds')));
            metrics.append(statusMetric(t('errors'), String(summary.failed || 0)));
            metrics.append(statusMetric(t('updated'), formatStatusDate(data.generated_at)));
            summaryInfo.append(metrics);
            summaryBlock.append(ring, summaryInfo);
            bindStatusFocus(summaryBlock);
            content.append(summaryBlock);

            content.append('<div class="yani-status__legend"><span class="yani-status__dot yani-status__dot--up"></span>' + t('up') + ' <span class="yani-status__dot yani-status__dot--degraded"></span>' + t('unstable') + ' <span class="yani-status__dot yani-status__dot--down"></span>' + t('down') + '</div>');

            (data.domains || []).forEach(function (domain) {
                var block = $('<div class="yani-status__domain selector yani-status--' + domain.status + '"></div>');
                var head = $('<div class="yani-status__domain-head"></div>');
                var name = $('<div class="yani-status__domain-name"></div>');
                name.append('<span class="yani-status__state"></span>');
                name.append($('<strong></strong>').text(statusDomainName(domain)));
                name.append($('<small></small>').text(domain.domain));
                var values = $('<div class="yani-status__domain-values"></div>');
                values.append($('<span></span>').text('HTTP ' + (domain.average_ms || 0) + ' ' + t('milliseconds')));
                values.append($('<span></span>').text('Ping ' + (domain.ping_ms || 0) + ' ' + t('milliseconds')));
                head.append(name, values);

                var history = $('<div class="yani-status__history"></div>');
                (domain.history || []).forEach(function (point) {
                    history.append($('<i class="yani-status__bar yani-status__bar--' + point.status + '"></i>').attr('title', formatStatusDate(point.time)));
                });
                block.append(head, history);
                bindStatusFocus(block);
                content.append(block);
            });

            content.append($('<div class="yani-status__source"></div>').text(t('source') + ': YummyStatus · ' + t('period') + ': ' + periodLabels[currentPeriod] + ' · ' + t('snapshot_notice')));

            var refresh = $('<div class="yani-status__refresh selector"></div>').text(t('refresh_status'));
            refresh.on('hover:enter', function () {
                Lampa.Noty.show(t('refreshing_status'));
                load(false);
            });
            bindStatusFocus(refresh);
            content.append(refresh);
            refreshStatusNavigation();
        }

        function statusMetric(title, value) {
            var metric = $('<div class="yani-status__metric"></div>');
            metric.append($('<span></span>').text(title));
            metric.append($('<strong></strong>').text(value));
            return metric;
        }

        function statusDomainName(domain) {
            var names = {
                'old.yummyani.me': 'domain_old',
                'old.yummy-ani.me': 'domain_old_mirror',
                'ru.yummyani.me': 'domain_new',
                'ru.yummy-ani.me': 'domain_new_mirror',
                'api.yani.tv': 'domain_api',
                'waf.valtrix.org': 'domain_waf'
            };
            return names[domain.domain] ? t(names[domain.domain]) : (domain.label || domain.domain);
        }

        function renderStatusError() {
            content.empty();
            var error = $('<div class="yani-status__error selector"></div>');
            error.append($('<strong></strong>').text(t('status_load_error')));
            error.append($('<span></span>').text(t('status_error_hint')));
            bindStatusFocus(error);
            content.append(error);
            refreshStatusNavigation();
        }

        function refreshStatusNavigation() {
            if (!ready) return;
            Lampa.Controller.collectionSet(scroll.render());
            Lampa.Controller.collectionFocus(false, scroll.render());
        }

        function bindStatusFocus(element) {
            element.on('hover:focus', function (event) {
                last = event.target;
                scroll.update($(event.target), true);
            });
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { Navigator.move('down'); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () {
            scroll.destroy();
            html.remove();
        };
    }

    function formatStatusDate(value) {
        if (!value) return '—';
        try {
            return new Date(value).toLocaleString(locale(), {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'});
        } catch (error) {
            return new Date(value).toLocaleString();
        }
    }

    function Schedule(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var html = $('<div class="yani-schedule"></div>');
        var content = $('<div class="yani-schedule__content"></div>');
        var last;

        this.create = function () {
            var self = this;
            this.activity.loader(true);

            LampaYaniApi.schedule({}).then(function (payload) {
                var items = LampaYaniApi.normalize(payload);
                renderSchedule(items);
                scroll.append(content);
                html.append(scroll.render(true));
                self.activity.loader(false);
                self.activity.toggle();
            }).catch(function (error) {
                console.error('[YummyAnime]', error);
                self.activity.loader(false);
                Lampa.Noty.show(t('schedule_load_error'));
            });
        };

        function renderSchedule(items) {
            var today = new Date();
            today.setHours(0, 0, 0, 0);

            for (var dayOffset = 0; dayOffset < 7; dayOffset++) {
                var day = new Date(today.getTime());
                day.setDate(today.getDate() + dayOffset);
                var nextDay = new Date(day.getTime());
                nextDay.setDate(day.getDate() + 1);

                var releases = items.filter(function (item) {
                    var timestamp = item.episodes && Number(item.episodes.next_date);
                    if (!timestamp) return false;
                    var releaseDate = new Date(timestamp * 1000);
                    return releaseDate >= day && releaseDate < nextDay;
                }).sort(function (a, b) {
                    return Number(a.episodes.next_date) - Number(b.episodes.next_date);
                });

                var section = $('<section class="yani-schedule__day"></section>');
                section.append($('<div class="yani-schedule__day-title"></div>').text(formatScheduleDay(day, dayOffset)));

                if (!releases.length) {
                    section.append($('<div class="yani-schedule__empty"></div>').text(t('no_releases')));
                } else {
                    releases.forEach(function (item) {
                        section.append(createScheduleItem(item));
                    });
                }

                content.append(section);
            }
        }

        function createScheduleItem(item) {
            var card = toCard(item);
            var episodes = item.episodes || {};
            var releaseDate = new Date(Number(episodes.next_date) * 1000);
            var row = $('<div class="yani-schedule__item selector"></div>');
            var poster = $('<img class="yani-schedule__poster" alt="">').attr('src', card.poster || '');
            var info = $('<div class="yani-schedule__info"></div>');
            var release = $('<div class="yani-schedule__release"></div>');

            info.append($('<div class="yani-schedule__title"></div>').text(card.title));
            info.append($('<div class="yani-schedule__episode"></div>').text(formatEpisode(episodes)));
            release.append($('<div class="yani-schedule__time"></div>').text(formatScheduleTime(releaseDate)));
            release.append($('<div class="yani-schedule__timezone"></div>').text(t('local_time')));
            row.append(poster, info, release);

            row.on('hover:focus', function (event) {
                last = event.target;
                scroll.update($(event.target), true);
            });
            row.on('hover:enter', function () {
                card.yani_schedule = formatEpisode(episodes) + ', ' + formatScheduleDateTime(releaseDate);
                openStandardLampaCard(card);
            });

            return row;
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { Navigator.move('down'); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function formatScheduleDay(date, offset) {
        var prefix = offset === 0 ? t('today') + ', ' : offset === 1 ? t('tomorrow') + ', ' : '';
        try {
            return prefix + date.toLocaleDateString(locale(), {weekday: 'long', day: 'numeric', month: 'long'});
        } catch (error) {
            return prefix + date.toLocaleDateString();
        }
    }

    function formatScheduleTime(date) {
        try {
            return date.toLocaleTimeString(locale(), {hour: '2-digit', minute: '2-digit'});
        } catch (error) {
            return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        }
    }

    function formatScheduleDateTime(date) {
        try {
            return date.toLocaleString(locale(), {day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'});
        } catch (error) {
            return date.toLocaleString();
        }
    }

    function formatEpisode(episodes) {
        var aired = Number(episodes.aired || 0);
        var count = Number(episodes.count || 0);
        if (count === 1 && aired === 0) return t('release');
        var next = aired + 1;
        return count > 1 ? t('episode') + ' ' + next + ' ' + t('of') + ' ' + count : t('episode') + ' ' + next;
    }

    function Detail(object) {
        var data = object.card || {};
        var html = $('<div class="yani-detail"></div>');
        var button;

        this.create = function () {
            var self = this;
            this.activity.loader(true);

            if (data.yani_id) {
                LampaYaniApi.detail(data.yani_id).then(function (payload) {
                    var item = payload && payload.response ? payload.response : payload;
                    var detailed = item ? toCard(item) : data;
                    detailed.yani_schedule = data.yani_schedule;
                    renderDetail(detailed);
                    self.activity.loader(false);
                    self.activity.toggle();
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    renderDetail(data);
                    self.activity.loader(false);
                    self.activity.toggle();
                });
            } else {
                renderDetail(data);
                this.activity.loader(false);
                this.activity.toggle();
            }
        };

        function renderDetail(cardData) {
            data = cardData;
            var poster = $('<img class="yani-detail__poster">').attr('src', data.img || data.poster || '');
            var info = $('<div class="yani-detail__info"></div>');
            info.append($('<div class="yani-detail__title"></div>').text(data.title || 'YummyAnime'));
            if (data.release_date) info.append($('<div class="yani-detail__meta"></div>').text(data.release_date));
            info.append(createDetailRatings(data.yani_ratings || [], data.vote_count));
            if (data.yani_schedule) info.append($('<div class="yani-detail__schedule"></div>').text(data.yani_schedule));
            info.append($('<div class="yani-detail__overview"></div>').text(data.overview || ''));
            var playback = getPlayback(data.yani_id);
            var watchTitle = playback && playback.number ? t('continue_episode') + ' ' + playback.number : t('watch');
            var actions = $('<div class="yani-detail__actions"></div>');
            button = $('<div class="yani-detail__button yani-detail__button--watch selector"></div>').text(watchTitle);
            button.on('hover:enter', function () { openVideos(data, !!playback); });
            bindDetailButtonFocus(button);
            var searchButton = $('<div class="yani-detail__button selector"></div>').text(t('open_lampa_search'));
            searchButton.on('hover:enter', function () {
                if (Lampa.Search && Lampa.Search.open) Lampa.Search.open(data.title || '');
                else Lampa.Controller.toggle('search');
            });
            bindDetailButtonFocus(searchButton);
            var commentsButton = $('<div class="yani-detail__button selector"></div>').text(t('comments') + (data.yani_comments_count ? ' (' + data.yani_comments_count + ')' : ''));
            commentsButton.on('hover:enter', function () { commentsMenu(data.yani_id, 0, []); });
            bindDetailButtonFocus(commentsButton);
            actions.append(button, searchButton, commentsButton);
            info.append(actions);
            html.append(poster, info);
        }

        function bindDetailButtonFocus(element) {
            element.on('hover:focus', function () {
                element.siblings('.focus').removeClass('focus');
                element.addClass('focus');
            });
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () { Lampa.Controller.collectionSet(html); Lampa.Controller.collectionFocus(button, html); },
                left: function () { Lampa.Controller.toggle('menu'); },
                up: function () { Lampa.Controller.toggle('head'); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { html.remove(); };
    }

    function openVideos(card, resume) {
        if (!card || !card.yani_id) return Lampa.Noty.show(t('no_videos'));
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();

        LampaYaniApi.videos(card.yani_id).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var videos = payload && payload.response ? payload.response : payload;
            videos = (Array.isArray(videos) ? videos : []).filter(function (video) { return video && video.iframe_url; });
            if (!videos.length) return Lampa.Noty.show(t('no_videos'));

            var groups = {};
            videos.forEach(function (video) {
                var data = video.data || {};
                var title = data.dubbing || data.player || t('player');
                var key = title + '|' + String(data.player_id || data.player || '');
                if (!groups[key]) groups[key] = {title: title, player: data.player || '', videos: []};
                groups[key].videos.push(video);
            });

            var voices = Object.keys(groups).map(function (key) {
                var group = groups[key];
                return {title: group.title + (group.player && group.player !== group.title ? ' · ' + group.player : ''), group: group};
            });
            var preferredPlayer = getPreferredPlayer();
            voices.sort(function (a, b) {
                var preferredA = playerMatchesPreference(a.group, preferredPlayer) ? 1 : 0;
                var preferredB = playerMatchesPreference(b.group, preferredPlayer) ? 1 : 0;
                return preferredB - preferredA || a.title.localeCompare(b.title);
            });
            if (voices.length && playerMatchesPreference(voices[0].group, preferredPlayer)) voices[0].title = '★ ' + voices[0].title;

            if (resume) {
                var playback = getPlayback(card.yani_id);
                var resumeVoice = playback && voices.filter(function (voice) { return playerMatchesPreference(voice.group, playback.player); })[0];
                var resumeVideo = resumeVoice && resumeVoice.group.videos.filter(function (video) {
                    return String(video.number || video.index || '') === playback.number;
                })[0];
                if (resumeVideo) {
                    rememberPlayer(resumeVoice.group);
                    return launchVideo(card, resumeVoice.group, resumeVoice.group.videos, resumeVideo);
                }
            }

            if (voices.length === 1) {
                rememberPlayer(voices[0].group);
                return chooseEpisode(card, voices[0].group);
            }
            Lampa.Select.show({
                title: t('choose_voice'),
                items: voices,
                onSelect: function (item) {
                    rememberPlayer(item.group);
                    chooseEpisode(card, item.group);
                }
            });
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Videos]', error);
            Lampa.Noty.show(t('videos_load_error'));
        });
    }

    function registerOnlineSource() {
        if (!Lampa.Online || !Lampa.Online.register || window.yummyanime_online_source_ready) return;
        window.yummyanime_online_source_ready = true;
        Lampa.Online.register('yummyanime', {
            title: 'YummyAnime',
            search: function (movie, oncomplite) {
                openYummyForMovie(movie);
                if (oncomplite) oncomplite([]);
            },
            onContextMenu: function () { return {name: 'YummyAnime'}; }
        });
    }

    function openYummyForMovie(movie) {
        if (movie && movie.yani_card) return openVideos(movie.yani_card);
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        findYummyMatches(movie).then(function (matches) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            if (!matches.length) return Lampa.Noty.show(t('no_yummy_match'));
            if (matches.length === 1) return openVideos(matches[0]);

            Lampa.Select.show({
                title: t('choose_anime'),
                items: matches.map(function (card) {
                    return {title: card.title + (card.release_date ? ' · ' + card.release_date : ''), card: card};
                }),
                onSelect: function (item) { openVideos(item.card); }
            });
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Search Source]', error);
            Lampa.Noty.show(t('catalog_load_error'));
        });
    }

    function openStandardLampaCard(card) {
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        findStandardLampaCard(card).then(function (match) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            if (!match) return openYummyDetail(card, true);
            match.card.yani_id = card.yani_id;
            match.card.yani_card = card;
            Lampa.Activity.push({
                url: '',
                component: 'full',
                id: match.card.id,
                method: match.method,
                card: match.card,
                source: 'tmdb'
            });
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Lampa Card]', error);
            openYummyDetail(card, true);
        });
    }

    function openYummyDetail(card, notifyFallback) {
        if (notifyFallback && Lampa.Noty) Lampa.Noty.show(t('lampa_card_fallback'));
        Lampa.Activity.push({
            url: 'yani/detail/' + card.yani_id,
            title: card.title,
            component: 'yani_detail',
            card: card
        });
    }

    function findStandardLampaCard(card) {
        var tmdb = Lampa.Api && Lampa.Api.sources && Lampa.Api.sources.tmdb;
        if (!tmdb || !tmdb.get) return Promise.resolve(null);
        var primaryTitle = card.title || '';
        var originalTitle = card.original_title && card.original_title !== primaryTitle ? card.original_title : '';

        return searchTmdbTitle(tmdb, primaryTitle).then(function (items) {
            var match = bestStandardCard(items, card);
            if (match || !originalTitle) return match;
            return searchTmdbTitle(tmdb, originalTitle).then(function (originalItems) {
                return bestStandardCard(originalItems, card);
            });
        });
    }

    function searchTmdbTitle(tmdb, title) {
        if (!title) return Promise.resolve([]);
        return Promise.all(['tv', 'movie'].map(function (method) {
            return new Promise(function (resolve) {
                tmdb.get('search/' + method, {query: title, page: 1, include_adult: false}, function (payload) {
                    resolve((payload && payload.results || []).map(function (item) {
                        return {card: item, method: method};
                    }));
                }, function () { resolve([]); }, {life: 60 * 24 * 7});
            });
        })).then(function (rows) { return rows[0].concat(rows[1]); });
    }

    function bestStandardCard(items, yaniCard) {
        var expectedTitles = [yaniCard.title, yaniCard.original_title].map(normalizeMatchTitle).filter(Boolean);
        var expectedYear = String(yaniCard.release_date || '').slice(0, 4);
        items.forEach(function (entry) {
            var candidate = entry.card || {};
            var titles = [candidate.title, candidate.name, candidate.original_title, candidate.original_name].map(normalizeMatchTitle).filter(Boolean);
            var exact = titles.some(function (title) { return expectedTitles.indexOf(title) >= 0; });
            var partial = !exact && titles.some(function (title) {
                return expectedTitles.some(function (expected) { return title.indexOf(expected) >= 0 || expected.indexOf(title) >= 0; });
            });
            var candidateYear = String(candidate.release_date || candidate.first_air_date || '').slice(0, 4);
            entry.score = (exact ? 100 : partial ? 40 : 0) + (expectedYear && candidateYear === expectedYear ? 30 : 0);
        });
        items.sort(function (a, b) { return b.score - a.score; });
        if (!items.length || items[0].score < 70) return null;
        items[0].card.source = 'tmdb';
        return items[0];
    }

    function findYummyMatches(movie) {
        movie = movie || {};
        var title = movie.title || movie.name || movie.original_title || movie.original_name || '';
        var year = String(movie.release_date || movie.first_air_date || movie.year || '').slice(0, 4);
        if (!title) return Promise.resolve([]);

        return LampaYaniApi.search(title, {limit: 10}).then(function (payload) {
            var cards = LampaYaniApi.normalize(payload).map(toCard);
            var expected = normalizeMatchTitle(title);
            cards.forEach(function (card) {
                var titles = [card.title, card.original_title].map(normalizeMatchTitle);
                card._match_score = (titles.indexOf(expected) >= 0 ? 100 : titles.some(function (value) { return value.indexOf(expected) >= 0 || expected.indexOf(value) >= 0; }) ? 40 : 0) + (year && card.release_date === year ? 30 : 0);
            });
            cards.sort(function (a, b) { return b._match_score - a._match_score; });
            if (!cards.length || cards[0]._match_score < 40) return [];
            var best = cards[0]._match_score;
            return cards.filter(function (card, index) { return index < 5 && (card._match_score === best || card._match_score >= 70); });
        });
    }

    function normalizeMatchTitle(value) {
        return String(value || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/gi, ' ').trim();
    }

    function chooseEpisode(card, group) {
        var videos = group.videos.slice().sort(function (a, b) {
            var numberA = parseFloat(a.number);
            var numberB = parseFloat(b.number);
            if (isFinite(numberA) && isFinite(numberB)) return numberA - numberB;
            return Number(a.index || 0) - Number(b.index || 0);
        });
        var episodes = videos.map(function (video) {
            return {title: episodeOptionTitle(card, video), video: video};
        });
        if (episodes.length === 1) return launchVideo(card, group, videos, videos[0]);
        Lampa.Select.show({
            title: t('choose_episode') + ' · ' + group.title,
            items: episodes,
            onSelect: function (item) { launchVideo(card, group, videos, item.video); }
        });
    }

    function launchVideo(card, group, videos, selected) {
        var url = normalizeVideoUrl(selected.iframe_url);
        if (!url) return Lampa.Noty.show(t('no_videos'));
        var title = (card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + (selected.number || selected.index || '?') + ' · ' + group.title;
        rememberPlayback(card, group, selected);

        if (/\.(m3u8|mp4|webm)(?:\?|$)/i.test(url) && Lampa.Player && Lampa.Player.play) {
            var directVideos = videos.filter(function (video) {
                return /\.(m3u8|mp4|webm)(?:\?|$)/i.test(normalizeVideoUrl(video.iframe_url));
            });
            var playlist = directVideos.map(function (video) {
                return {
                    title: (card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + (video.number || video.index || '?'),
                    url: normalizeVideoUrl(video.iframe_url)
                };
            });
            var current = playlist[directVideos.indexOf(selected)] || playlist[0];
            Lampa.Player.play(current);
            if (Lampa.Player.playlist) Lampa.Player.playlist(playlist);
            return;
        }

        if (Lampa.Iframe && Lampa.Iframe.show) {
            var enabledController = Lampa.Controller.enabled ? Lampa.Controller.enabled() : null;
            var previousController = enabledController && enabledController.name;
            Lampa.Iframe.show({
                url: url,
                onBack: function () { Lampa.Controller.toggle(previousController || 'content'); }
            });
            return;
        }

        Lampa.Activity.push({
            url: 'yani/player/' + (selected.video_id || selected.index || selected.number),
            title: title,
            component: 'yani_player',
            iframe_url: url
        });
    }

    function normalizeVideoUrl(url) {
        if (!url) return '';
        return url.indexOf('//') === 0 ? 'https:' + url : url;
    }

    function playerKey(group) {
        return String(group && (group.player || group.title) || '').toLowerCase();
    }

    function getPreferredPlayer() {
        if (!Lampa.Storage) return '';
        var preference = Lampa.Storage.get('yani_player_preference', 'last');
        if (preference === 'ask') return '';
        if (preference === 'last') return Lampa.Storage.get('yani_last_player', '');
        return preference;
    }

    function playerMatchesPreference(group, preference) {
        if (!preference) return false;
        var value = playerKey(group);
        return value.indexOf(String(preference).toLowerCase()) >= 0;
    }

    function rememberPlayer(group) {
        if (Lampa.Storage) Lampa.Storage.set('yani_last_player', playerKey(group));
    }

    function playbackHistory() {
        if (!Lampa.Storage) return {};
        try { return JSON.parse(Lampa.Storage.get('yani_playback_history', '{}')); } catch (error) { return {}; }
    }

    function getPlayback(animeId) {
        return playbackHistory()[String(animeId)] || null;
    }

    function rememberPlayback(card, group, video) {
        if (!Lampa.Storage || !card || !card.yani_id) return;
        var history = playbackHistory();
        history[String(card.yani_id)] = {
            number: String(video.number || video.index || ''),
            video_id: video.video_id || '',
            player: playerKey(group),
            title: card.title || '',
            updated_at: Date.now()
        };
        var ids = Object.keys(history).sort(function (a, b) { return Number(history[b].updated_at || 0) - Number(history[a].updated_at || 0); });
        ids.slice(100).forEach(function (id) { delete history[id]; });
        Lampa.Storage.set('yani_playback_history', JSON.stringify(history));
    }

    function episodeOptionTitle(card, video) {
        var number = String(video.number || video.index || '?');
        var parts = [t('episode') + ' ' + number];
        if (Number(video.duration) > 0) parts.push(Math.max(1, Math.round(Number(video.duration) / 60)) + ' ' + t('minutes_short'));
        if (Number(video.views) > 0) parts.push(formatCompactNumber(video.views) + ' ' + t('views_short'));
        var playback = getPlayback(card && card.yani_id);
        return (playback && playback.number === number ? '▶ ' : '') + parts.join(' · ');
    }

    function formatCompactNumber(value) {
        value = Number(value) || 0;
        if (value >= 1000000) return (value / 1000000).toFixed(value >= 10000000 ? 0 : 1).replace('.0', '') + t('million_short');
        if (value >= 1000) return (value / 1000).toFixed(value >= 10000 ? 0 : 1).replace('.0', '') + t('thousand_short');
        return String(value);
    }

    function IframePlayer(object) {
        var html = $('<div class="yani-player"></div>');
        var iframe = $('<iframe class="yani-player__iframe" frameborder="0" allowfullscreen></iframe>');

        this.create = function () {
            iframe.attr('src', normalizeVideoUrl(object.iframe_url));
            iframe.attr('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture');
            iframe.on('load', function () { if (iframe[0] && iframe[0].focus) iframe[0].focus(); });
            html.append(iframe);
            this.activity.loader(false);
            this.activity.toggle();
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    iframe.attr('tabindex', '0');
                    if (iframe[0] && iframe[0].focus) iframe[0].focus();
                },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () {
            iframe.attr('src', 'about:blank');
            iframe.remove();
            html.remove();
        };
    }

    function openGenres() {
        LampaYaniApi.genres().then(function (payload) {
            var genres = LampaYaniApi.normalizeGenres(payload);
            if (!genres.length) {
                Lampa.Noty.show(t('genres_empty'));
                return;
            }
            Lampa.Select.show({
                title: t('genres_title'),
                items: genres.map(function (genre) {
                    return {
                        title: genre.title || genre.name,
                        value: genre.value || genre.id || genre.href || genre.alias
                    };
                }).filter(function (genre) { return genre.title && genre.value; }),
                onSelect: function (item) {
                    Lampa.Activity.push({url: 'yani/genre/' + item.value, title: item.title, component: 'yani_catalog', params: {limit: 30, genres: item.value}});
                }
            });
        }).catch(function () { Lampa.Noty.show(t('genres_load_error')); });
    }

    function openSearch() {
        showYummyInput({title: t('search_title'), value: ''}, function (query) {
            query = (query || '').trim();
            if (query) Lampa.Activity.push({url: 'yani/search/' + encodeURIComponent(query), title: query, component: 'yani_catalog', params: {q: query, limit: 30}});
        });
    }

    function openAccount() {
        Lampa.Activity.push({url: 'yani/account', title: 'YummyAnime ' + t('account'), component: 'yani_account'});
    }

    function toCard(item) {
        var title = item.title || item.name || item.russian || item.original_title || t('untitled');
        var poster = item.cover || item.image || item.poster_url || '';
        if (!poster && item.poster) poster = item.poster.fullsize || item.poster.medium || item.poster.original || '';
        if (poster.indexOf('//') === 0) poster = 'https:' + poster;
        var rating = typeof item.rating === 'object' ? item.rating.average : item.rating;
        var votes = typeof item.rating === 'object' ? item.rating.counters : item.rating_counters;
        var ratings = extractRatings(item.rating);
        return {
            title: title,
            original_title: item.original_title || item.japanese || title,
            poster: poster,
            img: poster,
            release_date: String(item.year || item.release_year || ''),
            vote_average: rating || item.score || item.rating_score || 0,
            vote_count: votes || item.votes || item.vote_count || 0,
            yani_rating: rating || item.score || item.rating_score || 0,
            yani_ratings: ratings,
            yani_media: mediaMeta(item),
            overview: item.description || item.synopsis || '',
            yani_id: item.anime_id || item.id,
            yani_url: item.anime_url || item.url,
            yani_comments_count: Number(item.comments_count || 0),
            yani_type: item.type || null,
            yani_remote_ids: item.remote_ids || {}
        };
    }

    function copyParams(params) {
        var copy = {};
        Object.keys(params || {}).forEach(function (key) {
            copy[key] = params[key];
        });
        return copy;
    }

    function mapUniqueCards(items, seen) {
        return items.map(toCard).filter(function (card) {
            var key = card.yani_id || card.yani_url || card.title;
            if (seen[key]) return false;
            seen[key] = true;
            return true;
        });
    }

    function extractRatings(rating) {
        rating = rating && typeof rating === 'object' ? rating : {average: rating};
        return [
            {key: 'yummy', short: 'YA', title: 'YummyAnime', value: Number(rating.average || 0)},
            {key: 'kp', short: 'KP', title: t('kinopoisk'), value: Number(rating.kp_rating || 0)},
            {key: 'shikimori', short: 'SH', title: 'Shikimori', value: Number(rating.shikimori_rating || 0)},
            {key: 'anidub', short: 'AD', title: 'AniDUB', value: Number(rating.anidub_rating || 0)},
            {key: 'mal', short: 'MAL', title: 'MyAnimeList', value: Number(rating.myanimelist_rating || 0)},
            {key: 'worldart', short: 'WA', title: 'World-Art', value: Number(rating.worldart_rating || 0)}
        ];
    }

    function mediaMeta(item) {
        item = item || {};
        var videos = Array.isArray(item.videos) ? item.videos : [];
        var voices = {};
        var quality = 0;
        videos.forEach(function (video) {
            var data = video && video.data || {};
            var voice = data.dubbing || data.translation || data.voice || data.player;
            if (voice) voices[String(voice)] = true;
            [video.quality, video.resolution, data.quality, data.resolution].forEach(function (value) {
                var match = String(value || '').match(/(2160|1440|1080|720|576|480|360)\s*p?/i);
                if (match) quality = Math.max(quality, Number(match[1]));
                if (/4k/i.test(String(value || ''))) quality = Math.max(quality, 2160);
            });
        });
        var translates = Array.isArray(item.translates) ? item.translates.length : 0;
        return {
            voices: Object.keys(voices).length || translates,
            quality: quality >= 2160 ? '4K' : quality ? quality + 'p' : ''
        };
    }

    function formatRating(value) {
        return Number(value) > 0 ? Number(value).toFixed(1) : '—';
    }

    function addCardRatings(element, card) {
        var ratings = element.yani_ratings || [];
        if (!ratings.length || !card || !card.render) return;
        var render = $(card.render(true));
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

    function createRatingLogo(rating, className) {
        return $('<span class="' + className + ' yani-rating-logo yani-rating-logo--' + rating.key + '"></span>')
            .text(rating.short || rating.key)
            .attr('title', rating.title || rating.key)
            .attr('aria-label', rating.title || rating.key);
    }

    function createDetailRatings(ratings, votes) {
        var block = $('<div class="yani-ratings"></div>');
        ratings.forEach(function (rating) {
            var item = $('<div class="yani-ratings__item"></div>');
            var header = $('<div class="yani-ratings__header"></div>');
            header.append(createRatingLogo(rating, 'yani-ratings__logo'));
            header.append($('<div class="yani-ratings__value"></div>').text(formatRating(rating.value)));
            item.append(header);
            item.append($('<div class="yani-ratings__source"></div>').text(rating.title));
            if (rating.key === 'yummy' && votes) item.append($('<div class="yani-ratings__votes"></div>').text(votes + ' ' + t('ratings_count')));
            block.append(item);
        });
        return block;
    }

    function addSettings() {
        if (!Lampa.SettingsApi || !Lampa.SettingsApi.addComponent) return;

        Lampa.SettingsApi.addComponent({
            component: 'yani',
            icon: '<svg viewBox="0 0 20 20"><path fill="currentColor" d="M18.45 0H1.55A1.55 1.55 0 000 1.55v16.9A1.54 1.54 0 001.55 20h16.9A1.55 1.55 0 0020 18.45V1.55A1.54 1.54 0 0018.45 0Zm-2.83 5.93-2.1 2.66-2.3-5.43a6.95 6.95 0 014.4 2.77Zm-2.9 6.57h-4l2.03-4.8 1.98 4.8Zm-2.37-9.34L7.8 9.06 4.87 5.33c.64-.7 1.4-1.26 2.27-1.65a8.18 8.18 0 013.2-.52ZM3.57 7.39l3.2 4.06-1.56 3.58A6.96 6.96 0 013.57 7.39Zm6.57 9.56c-1.05.01-2.1-.2-3.05-.65l.76-1.8h5.7l.49 1.15a6.93 6.93 0 01-3.9 1.3Zm6.8-7.07a7.8 7.8 0 01-1.17 4L14.55 11l2.17-2.77c.14.54.21 1.1.23 1.65Z"/></svg>',
            name: 'YummyAnime'
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_about', type: 'trigger', default: false},
            field: {
                name: t('version_name') + ' ' + LampaYaniConfig.version,
                description: t('website_description') + ': ' + yummyWebsiteUrl()
            },
            onChange: openYummyWebsite
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_language', type: 'select', values: {ru: 'Русский', en: 'English'}, default: 'ru'},
            field: {name: t('language_name'), description: t('language_description')},
            onChange: function (value) {
                if (value && typeof value === 'object') value = value.value;
                LampaYaniI18n.setLanguage(value);
                Lampa.Noty.show(t('language_changed'));
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {
                name: 'yani_player_preference',
                type: 'select',
                values: {last: t('player_last'), ask: t('player_ask'), kodik: 'Kodik', alloha: 'Alloha', cvh: 'CVH', sibnet: 'Sibnet', aksor: 'Aksor'},
                default: 'last'
            },
            field: {name: t('player_preference'), description: t('player_preference_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_clear_playback_history', type: 'trigger', default: false},
            field: {name: t('clear_history'), description: t('clear_history_description')},
            onChange: function () {
                if (Lampa.Storage) Lampa.Storage.set('yani_playback_history', '{}');
                Lampa.Noty.show(t('history_cleared'));
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_account_login', type: 'trigger', default: false},
            field: {name: t('login_name'), description: t('login_description')},
            onChange: openSettingsLogin
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_account_refresh', type: 'trigger', default: false},
            field: {name: t('refresh_name'), description: t('refresh_description')},
            onChange: function () {
                if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('login_first'));
                LampaYaniAuth.refresh().then(function () {
                    Lampa.Noty.show(t('token_refreshed'));
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('token_refresh_error'));
                });
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_account_logout', type: 'trigger', default: false},
            field: {name: t('logout_name'), description: t('logout_description')},
            onChange: function () {
                if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('not_logged'));
                LampaYaniAuth.logout().then(function () {
                    Lampa.Noty.show(t('logged_out'));
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('token_removed'));
                });
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_api_check', type: 'trigger', default: false},
            field: {name: t('api_check_name'), description: t('api_check_description')},
            onChange: function () {
                LampaYaniApi.health().then(function () {
                    Lampa.Noty.show(t('api_ok'));
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('api_error'));
                });
            }
        });
    }

    function yummyWebsiteUrl() {
        return LampaYaniI18n.getLanguage() === 'en' ? 'https://en.yummyani.me/' : 'https://ru.yummyani.me/';
    }

    function openYummyWebsite() {
        var url = yummyWebsiteUrl();
        if (Lampa.Browser && Lampa.Browser.open) return Lampa.Browser.open(url);
        if (Lampa.External && Lampa.External.open) return Lampa.External.open(url);
        if (Lampa.Utils && Lampa.Utils.open) return Lampa.Utils.open(url);
        if (window.open) return window.open(url, '_blank');
        Lampa.Noty.show(url);
    }

    function openSettingsLogin() {
        showYummyInput({title: t('email_prompt'), value: ''}, function (login) {
            login = (login || '').trim();
            if (!login) return Lampa.Noty.show(t('email_required'));
            showYummyInput({title: t('password_prompt'), value: '', password: true}, function (password) {
                if (!password) return Lampa.Noty.show(t('password_required'));
                LampaYaniAuth.login(login, password).then(function () {
                    Lampa.Noty.show(t('login_ok'));
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('login_error'));
                });
            });
        });
    }

    function showYummyInput(params, callback) {
        if (!Lampa.Input) {
            Lampa.Noty.show(t('input_unavailable'));
            return;
        }
        if (Lampa.Input.show) {
            params.onEnter = callback;
            return Lampa.Input.show(params);
        }
        if (Lampa.Input.edit) return Lampa.Input.edit(params, callback);
        Lampa.Noty.show(t('input_unavailable'));
    }

    function commentsMenu(id, skip, existing) {
        skip = Number(skip || 0);
        existing = existing || [];
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        LampaYaniApi.comments(id, skip).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var page = LampaYaniApi.normalizeComments(payload);
            var comments = existing.concat(page);
            if (!comments.length) return Lampa.Noty.show(t('comments_empty'));
            renderCommentList(t('comments_title'), comments, page.length >= 20 ? function () {
                commentsMenu(id, skip + page.length, comments);
            } : null);
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Comments]', error);
            Lampa.Noty.show(t('comments_error'));
        });
    }

    function commentReplies(comment, skip, existing, onBack) {
        skip = Number(skip || 0);
        existing = existing || [];
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        LampaYaniApi.commentChildren(comment.id, skip).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var page = LampaYaniApi.normalizeComments(payload);
            var comments = existing.concat(page);
            if (!comments.length) return Lampa.Noty.show(t('comments_empty'));
            renderCommentList(t('replies_title'), comments, page.length >= 20 ? function () {
                commentReplies(comment, skip + page.length, comments, onBack);
            } : null, onBack);
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Comment Replies]', error);
            Lampa.Noty.show(t('comments_error'));
        });
    }

    function renderCommentList(title, comments, onMore, onBack) {
        var items = comments.map(commentItem);
        if (onMore) items.push({title: t('load_more'), load_more: true});
        var params = {
            title: title,
            items: items,
            onSelect: function (item) {
                if (item.load_more) return onMore();
                if (item.comment && Number(item.comment.children_count) > 0) {
                    return commentReplies(item.comment, 0, [], function () {
                        renderCommentList(title, comments, onMore, onBack);
                    });
                }
            }
        };
        if (onBack) params.onBack = onBack;
        Lampa.Select.show(params);
    }

    function commentItem(comment) {
        var author = comment.name || (comment.author && comment.author.name) || t('user');
        var text = cleanCommentText(comment.text || comment.body || '');
        var date = Number(comment.time) > 0 ? new Date(Number(comment.time) * 1000).toLocaleDateString(locale()) : '';
        var stats = [];
        if (Number(comment.likes) > 0) stats.push('♥ ' + comment.likes);
        if (Number(comment.dislikes) > 0) stats.push('−' + comment.dislikes);
        if (Number(comment.children_count) > 0) stats.push('↳ ' + comment.children_count + ' ' + t('replies'));
        return {
            title: author + (date ? ' · ' + date : '') + ': ' + text,
            subtitle: stats.join(' · '),
            comment: comment
        };
    }

    function cleanCommentText(text) {
        return String(text || '').replace(/\[ник\]([^[]+)\[\/ник\]/gi, '@$1').replace(/\[[^\]]+\]/g, '').replace(/\s+/g, ' ').trim();
    }

    function installFullRating() {
        if (window.yummyanime_full_rating_ready || !Lampa.Listener) return;
        window.yummyanime_full_rating_ready = true;

        Lampa.Listener.follow('full', function (event) {
            if (event.type !== 'complite') return;
            var movie = event.data && event.data.movie ? event.data.movie : event.object && event.object.card_data;
            if (!movie) return;

            var matchRequest = movie.yani_card ? Promise.resolve([movie.yani_card]) : findYummyMatches(movie);
            matchRequest.then(function (matches) {
                var anime = matches[0];
                if (!anime) return;
                var render = event.object.activity.render();
                var line = $('.full-start-new__rate-line, .full-start__rate-line', render).first();
                (anime.yani_ratings || []).forEach(function (rating) {
                    var className = 'rate--yummyanime-' + rating.key;
                    if ($('.' + className, render).length) return;
                    var block = $('<div class="full-start__rate ' + className + '"><div>' + formatRating(rating.value) + '</div><div>' + rating.title + '</div></div>');
                    line.append(block);
                });
                addYummyFullButton(render, movie, anime);
            }).catch(function () {});
        });
    }

    function addYummyFullButton(render, movie, anime) {
        var container = $('.full-start-new__buttons', render);
        if (!container.length) container = $('.full-start__buttons', render);
        if (!container.length) return;

        if (!$('.view--yummyanime', render).length) {
            var button = $('<div class="full-start__button selector view--online view--yummyanime"><span class="view--yummyanime__icon">YA</span><span>YummyAnime</span></div>');
            button.on('hover:enter', function () { openVideos(anime); });
            container.prepend(button);
        }
        if (!$('.view--yummyanime-actions', render).length) {
            var actions = $('<div class="full-start__button selector view--yummyanime-actions"><span>YummyAnime · ' + t('actions_short') + '</span></div>');
            actions.on('hover:enter', function () { showYummyActions(anime); });
            container.append(actions);
        }
    }
}(window));

    try {
        window.LampaYani.register();
    } catch (error) {
        console.error('[YummyAnime] Plugin initialization failed', error);
    }
}

if (!window.plugin_yummy_anime_ready) pluginYummyAnime();
