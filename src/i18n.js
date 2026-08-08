(function (window) {
    'use strict';

    var key = 'yani_language';
    var messages = {
        ru: {
            catalog: 'Каталог', genres: 'Жанры', search: 'Поиск', schedule: 'Расписание', continue_watching: 'Продолжить просмотр', history_empty: 'История просмотра YummyAnime пуста', history_load_error: 'Не удалось загрузить историю просмотра YummyAnime', status: 'Статус', top_rated: 'Лучшие', account: 'Аккаунт', anime: 'Аниме', home_sections: 'Разделы главного экрана',
            catalog_load_error: 'Не удалось загрузить каталог YummyAnime', next_page_error: 'Не удалось загрузить следующую страницу YummyAnime',
            login_required: 'Войдите в YummyAnime через настройки YummyAnime', actions: 'Действия YummyAnime', actions_short: 'Действия', yummy_details: 'Подробности YummyAnime', favorite: 'Добавить в любимые', watching: 'Смотрю', planned: 'В планах', completed: 'Просмотрено', dropped: 'Брошено', postponed: 'Отложено', comments: 'Комментарии', comments_empty: 'Комментариев пока нет', replies: 'ответов', replies_title: 'Ответы на комментарий', load_more: 'Загрузить ещё', saved: 'Изменения сохранены в YummyAnime', save_error: 'Не удалось сохранить оценку',
            not_logged_in: 'Вход не выполнен', login_hint: 'Откройте Настройки → YummyAnime и выберите «Войти в YummyAnime».', account_load_error: 'Не удалось загрузить аккаунт YummyAnime', account_retry: 'Обновите токен или выполните вход заново в Настройки → YummyAnime.', authorized: 'Авторизован в YummyAnime', banned: 'Аккаунт заблокирован', registration: 'Регистрация', last_visit: 'Последний визит', roles: 'Роли', user: 'Пользователь', messages: 'Сообщения', unread: 'непрочитанных', notifications: 'Уведомления', total_lists: 'Всего в списках', list_stats: 'Статистика списков', list: 'Список', anime_count: 'аниме', total_time: 'Общее время', days_short: 'д', hours_short: 'ч',
            period_3hour: '3 часа', period_day: 'День', period_week: 'Неделя', period_month: 'Месяц', all_up: 'Все системы работают', all_down: 'Сервисы недоступны', no_monitoring: 'Нет данных мониторинга', degraded: 'Возникли неполадки', checks: 'замеров', availability: 'Доступность', average_load: 'Средняя загрузка', errors: 'Ошибок', updated: 'Обновлено', up: 'Работает', unstable: 'Нестабильно', down: 'Недоступно', source: 'Источник', period: 'период', snapshot_notice: 'снимок обновляется каждые 5 минут', refresh_status: 'Обновить статус', refreshing_status: 'Обновляем статус YummyAnime', status_load_error: 'Не удалось загрузить статус YummyAnime', status_error_hint: 'Данные мониторинга временно недоступны. Это не означает, что сам плагин не работает.', milliseconds: 'мс', domain_old: 'Старый сайт', domain_old_mirror: 'Старый сайт (зеркало)', domain_new: 'Новый сайт', domain_new_mirror: 'Новый сайт (зеркало)', domain_api: 'YummyAnime API', domain_waf: 'Защита',
            schedule_load_error: 'Не удалось загрузить расписание YummyAnime', no_releases: 'Нет запланированных выпусков', local_time: 'местное время', today: 'Сегодня', tomorrow: 'Завтра', release: 'Релиз', episode: 'Серия', of: 'из', watch: 'Смотреть', continue_episode: 'Продолжить с серии', choose_voice: 'Выберите озвучку и источник', choose_episode: 'Выберите серию', choose_anime: 'Выберите аниме YummyAnime', no_yummy_match: 'Аниме не найдено в YummyAnime', lampa_card_fallback: 'Карточка Lampa не найдена — открыты данные YummyAnime', no_videos: 'Для этого аниме пока нет доступных серий', videos_load_error: 'Не удалось загрузить серии YummyAnime', player: 'Плеер', player_preference: 'Предпочтительный плеер', player_preference_description: 'Выбранный источник будет показан первым; остальные варианты останутся доступны', player_last: 'Последний выбранный', player_ask: 'Всегда по алфавиту', minutes_short: 'мин', views_short: 'просм.', thousand_short: ' тыс.', million_short: ' млн', clear_history: 'Очистить историю просмотра', clear_history_description: 'Удалить сохранённые последние серии YummyAnime на этом устройстве', history_cleared: 'История просмотра YummyAnime очищена', open_lampa_search: 'Открыть',
            genres_empty: 'YummyAnime не вернул список жанров', genres_title: 'Жанры YummyAnime', genres_load_error: 'Не удалось загрузить жанры YummyAnime', search_title: 'Поиск YummyAnime', untitled: 'Без названия', ratings_count: 'оценок', voices_short: 'озв.', viewing_order: 'Порядок выхода', more_information: 'Дополнительная информация', recommendations: 'Рекомендации', trailers: 'Трейлеры', no_recommendations: 'Рекомендаций пока нет', no_trailers: 'Трейлеров пока нет',
        language_name: 'Язык / Language', language_description: 'Язык интерфейса расширения YummyAnime', language_changed: 'Язык YummyAnime изменён. Откройте расширение заново.', section_visibility_description: 'Показывать этот раздел на главном экране YummyAnime', lampa_card_integration: 'Карточка Lampa', lampa_card_rating: 'Рейтинг YummyAnime', lampa_card_rating_description: 'Показывать рейтинг YummyAnime на обычной карточке Lampa', lampa_card_button: 'Кнопка YummyAnime', lampa_card_button_description: 'Показывать кнопку с логотипом YummyAnime на обычной карточке Lampa', version_name: 'Версия YummyAnime for Lampa', website_description: 'Официальный сайт YummyAnime', unofficial_extension: 'Неофициальное расширение', account_statistics: 'Статистика', genres_statistics: 'Жанры', ratings_statistics: 'Оценки', types_statistics: 'Типы', auth_manage_description: 'Открыть управление аккаунтом YummyAnime', auth_title: 'Авторизация YummyAnime', auth_authorized: 'Вы вошли в аккаунт YummyAnime', auth_not_authorized: 'Вход не выполнен', auth_login: 'Никнейм или Email', auth_password: 'Пароль', auth_login_empty: 'Нажмите, чтобы ввести логин', auth_password_empty: 'Нажмите, чтобы ввести пароль', auth_submit: 'Войти в аккаунт', auth_account: 'Аккаунт', auth_hint: 'Пароль не сохраняется в Lampa и используется только для входа',
            login_name: 'Войти в YummyAnime', login_description: 'Вход по никнейму или email и паролю YummyAnime', refresh_name: 'Обновить токен YummyAnime', refresh_description: 'Обновить действующий Bearer-токен аккаунта', login_first: 'Сначала войдите в YummyAnime', token_refreshed: 'Токен YummyAnime обновлён', token_refresh_error: 'Не удалось обновить токен YummyAnime', logout_name: 'Выйти из YummyAnime', logout_description: 'Завершить сессию и удалить локальный токен', not_logged: 'Вход в YummyAnime не выполнен', logged_out: 'Вы вышли из YummyAnime', token_removed: 'Локальный токен YummyAnime удалён', api_check_name: 'Проверить YummyAnime API', api_check_description: 'Проверить доступность API и публичный токен приложения', api_ok: 'YummyAnime API работает', api_error: 'YummyAnime API недоступен или публичный токен неверный', email_prompt: 'Никнейм или Email', email_required: 'Введите никнейм или email YummyAnime', password_prompt: 'Пароль YummyAnime', password_required: 'Введите пароль YummyAnime', login_ok: 'Вход в YummyAnime выполнен', login_error: 'Ошибка входа в YummyAnime', input_unavailable: 'Ввод недоступен в этой версии Lampa', comments_title: 'Комментарии YummyAnime', comments_error: 'Не удалось загрузить комментарии', kinopoisk: 'Кинопоиск'
        },
        en: {
            catalog: 'Catalog', genres: 'Genres', search: 'Search', schedule: 'Schedule', continue_watching: 'Continue Watching', history_empty: 'YummyAnime playback history is empty', history_load_error: 'Failed to load YummyAnime playback history', status: 'Status', top_rated: 'Top Rated', account: 'Account', anime: 'Anime', home_sections: 'Home screen sections',
            catalog_load_error: 'Failed to load the YummyAnime catalog', next_page_error: 'Failed to load the next YummyAnime page',
            login_required: 'Sign in to YummyAnime in YummyAnime settings', actions: 'YummyAnime actions', actions_short: 'Actions', yummy_details: 'YummyAnime details', favorite: 'Add to favorites', watching: 'Watching', planned: 'Planned', completed: 'Completed', dropped: 'Dropped', postponed: 'On hold', comments: 'Comments', comments_empty: 'There are no comments yet', replies: 'replies', replies_title: 'Comment replies', load_more: 'Load more', saved: 'Changes saved to YummyAnime', save_error: 'Failed to save the rating',
            not_logged_in: 'Not signed in', login_hint: 'Open Settings → YummyAnime and select “Sign in to YummyAnime”.', account_load_error: 'Failed to load the YummyAnime account', account_retry: 'Refresh the token or sign in again under Settings → YummyAnime.', authorized: 'Signed in to YummyAnime', banned: 'Account is banned', registration: 'Registered', last_visit: 'Last visit', roles: 'Roles', user: 'User', messages: 'Messages', unread: 'unread', notifications: 'Notifications', total_lists: 'Total in lists', list_stats: 'List statistics', list: 'List', anime_count: 'anime', total_time: 'Total time', days_short: 'd', hours_short: 'h',
            period_3hour: '3 hours', period_day: 'Day', period_week: 'Week', period_month: 'Month', all_up: 'All systems operational', all_down: 'Services unavailable', no_monitoring: 'No monitoring data', degraded: 'Service disruption detected', checks: 'checks', availability: 'Availability', average_load: 'Average response', errors: 'Failures', updated: 'Updated', up: 'Operational', unstable: 'Degraded', down: 'Unavailable', source: 'Source', period: 'period', snapshot_notice: 'snapshot refreshes every 5 minutes', refresh_status: 'Refresh status', refreshing_status: 'Refreshing YummyAnime status', status_load_error: 'Failed to load YummyAnime status', status_error_hint: 'Monitoring data is temporarily unavailable. This does not mean that the plugin itself is not working.', milliseconds: 'ms', domain_old: 'Old website', domain_old_mirror: 'Old website (mirror)', domain_new: 'New website', domain_new_mirror: 'New website (mirror)', domain_api: 'YummyAnime API', domain_waf: 'Protection',
            schedule_load_error: 'Failed to load the YummyAnime schedule', no_releases: 'No scheduled releases', local_time: 'local time', today: 'Today', tomorrow: 'Tomorrow', release: 'Release', episode: 'Episode', of: 'of', watch: 'Watch', continue_episode: 'Continue from episode', choose_voice: 'Choose dubbing and source', choose_episode: 'Choose episode', choose_anime: 'Choose YummyAnime title', no_yummy_match: 'Anime was not found on YummyAnime', lampa_card_fallback: 'No Lampa card was found — YummyAnime details were opened', no_videos: 'No episodes are currently available for this anime', videos_load_error: 'Failed to load YummyAnime episodes', player: 'Player', player_preference: 'Preferred player', player_preference_description: 'The selected source is listed first while all other variants remain available', player_last: 'Last selected', player_ask: 'Always alphabetical', minutes_short: 'min', views_short: 'views', thousand_short: 'K', million_short: 'M', clear_history: 'Clear playback history', clear_history_description: 'Remove saved last episodes for YummyAnime on this device', history_cleared: 'YummyAnime playback history cleared', open_lampa_search: 'Open',
            genres_empty: 'YummyAnime returned no genres', genres_title: 'YummyAnime Genres', genres_load_error: 'Failed to load YummyAnime genres', search_title: 'YummyAnime Search', untitled: 'Untitled', ratings_count: 'ratings', voices_short: 'dub.', viewing_order: 'Release order', more_information: 'More information', recommendations: 'Recommendations', trailers: 'Trailers', no_recommendations: 'No recommendations yet', no_trailers: 'No trailers yet',
        language_name: 'Language / Язык', language_description: 'YummyAnime extension interface language', language_changed: 'YummyAnime language changed. Reopen the extension.', section_visibility_description: 'Show this section on the YummyAnime home screen', lampa_card_integration: 'Lampa card', lampa_card_rating: 'YummyAnime rating', lampa_card_rating_description: 'Show the YummyAnime rating on regular Lampa cards', lampa_card_button: 'YummyAnime button', lampa_card_button_description: 'Show the YummyAnime logo button on regular Lampa cards', version_name: 'YummyAnime for Lampa version', website_description: 'Official YummyAnime website', unofficial_extension: 'Unofficial extension', account_statistics: 'Statistics', genres_statistics: 'Genres', ratings_statistics: 'Ratings', types_statistics: 'Types', auth_manage_description: 'Open YummyAnime account management', auth_title: 'YummyAnime sign in', auth_authorized: 'Signed in to YummyAnime', auth_not_authorized: 'Not signed in', auth_login: 'Nickname or Email', auth_password: 'Password', auth_login_empty: 'Select to enter login', auth_password_empty: 'Select to enter password', auth_submit: 'Sign in', auth_account: 'Account', auth_hint: 'The password is not saved in Lampa and is used only for sign in',
            login_name: 'Sign in to YummyAnime', login_description: 'Sign in with your YummyAnime nickname or email and password', refresh_name: 'Refresh YummyAnime token', refresh_description: 'Refresh the current account Bearer token', login_first: 'Sign in to YummyAnime first', token_refreshed: 'YummyAnime token refreshed', token_refresh_error: 'Failed to refresh the YummyAnime token', logout_name: 'Sign out of YummyAnime', logout_description: 'End the session and remove the local token', not_logged: 'Not signed in to YummyAnime', logged_out: 'Signed out of YummyAnime', token_removed: 'Local YummyAnime token removed', api_check_name: 'Check YummyAnime API', api_check_description: 'Check the API and public application token', api_ok: 'YummyAnime API is operational', api_error: 'YummyAnime API is unavailable or the public token is invalid', email_prompt: 'Nickname or Email', email_required: 'Enter your YummyAnime nickname or email', password_prompt: 'YummyAnime password', password_required: 'Enter your YummyAnime password', login_ok: 'Signed in to YummyAnime', login_error: 'YummyAnime sign-in failed', input_unavailable: 'Input is unavailable in this Lampa version', comments_title: 'YummyAnime Comments', comments_error: 'Failed to load comments', kinopoisk: 'KinoPoisk'
        }
    };

    messages.ru.version_name = 'YummyAnime';
    messages.ru.version_label = 'Версия';
    messages.en.version_name = 'YummyAnime';
    messages.en.version_label = 'Version';
    messages.ru.notifications_title = 'Уведомления YummyAnime';
    messages.ru.notifications_empty = 'Новых уведомлений нет';
    messages.ru.notifications_error = 'Не удалось загрузить уведомления';
    messages.ru.mark_all_read = 'Отметить все прочитанными';
    messages.ru.delete_all_notifications = 'Удалить все уведомления';
    messages.ru.notifications_more = 'Загрузить ещё уведомления';
    messages.ru.sync_history = 'Синхронизировать просмотр';
    messages.ru.sync_history_description = 'Отправить локальную историю в аккаунт YummyAnime';
    messages.ru.sync_history_ok = 'История просмотра синхронизирована';
    messages.ru.sync_history_error = 'Не удалось синхронизировать историю';
    messages.ru.my_reviews = 'Мои отзывы';
    messages.ru.my_reviews_description = 'Отзывы пользователя YummyAnime';
    messages.ru.reviews_empty = 'Отзывов пока нет';
    messages.ru.reviews_error = 'Не удалось загрузить отзывы';
    messages.ru.for_you = 'Для вас';
    messages.ru.collections = 'Коллекции';
    messages.ru.collection = 'Коллекция';
    messages.ru.episodes_short = 'серий';
    messages.ru.recommendations_empty = 'Рекомендации появятся после просмотра тайтлов';
    messages.ru.updates = 'Обновления';
    messages.ru.updates_error = 'Не удалось загрузить обновления';
    messages.ru.subscriptions = 'Подписки на новые серии';
    messages.ru.subscriptions_empty = 'Подписок на новые серии нет';
    messages.ru.subscriptions_error = 'Не удалось загрузить подписки';
    messages.ru.notification = 'Уведомление';
    messages.ru.community_stats = 'Статистика сообщества';
    messages.ru.manage_list = 'Изменить список';
    messages.ru.my_rating = 'Моя оценка';
    messages.ru.subscribe_episodes = 'Подписаться на новые серии';
    messages.ru.unsubscribe_episodes = 'Отписаться от новых серий';
    messages.ru.subscription_added = 'Подписка на новые серии включена';
    messages.ru.subscription_removed = 'Подписка на новые серии отключена';
    messages.ru.subscription_error = 'Не удалось изменить подписку';
    messages.en.notifications_title = 'YummyAnime notifications';
    messages.en.notifications_empty = 'There are no notifications';
    messages.en.notifications_error = 'Failed to load notifications';
    messages.en.mark_all_read = 'Mark all as read';
    messages.en.delete_all_notifications = 'Delete all notifications';
    messages.en.notifications_more = 'Load more notifications';
    messages.en.sync_history = 'Sync watch history';
    messages.en.sync_history_description = 'Send local history to your YummyAnime account';
    messages.en.sync_history_ok = 'Watch history synchronized';
    messages.en.sync_history_error = 'Failed to synchronize history';
    messages.en.my_reviews = 'My reviews';
    messages.en.my_reviews_description = 'Your YummyAnime reviews';
    messages.en.reviews_empty = 'There are no reviews yet';
    messages.en.reviews_error = 'Failed to load reviews';
    messages.en.for_you = 'For you';
    messages.en.collections = 'Collections';
    messages.en.collection = 'Collection';
    messages.en.episodes_short = 'episodes';
    messages.en.recommendations_empty = 'Recommendations will appear after you watch some anime';
    messages.en.updates = 'Updates';
    messages.en.updates_error = 'Failed to load updates';
    messages.en.subscriptions = 'New episode subscriptions';
    messages.en.subscriptions_empty = 'There are no episode subscriptions';
    messages.en.subscriptions_error = 'Failed to load subscriptions';
    messages.en.notification = 'Notification';
    messages.en.community_stats = 'Community statistics';
    messages.en.manage_list = 'Change list';
    messages.en.my_rating = 'My rating';
    messages.en.subscribe_episodes = 'Subscribe to new episodes';
    messages.en.unsubscribe_episodes = 'Unsubscribe from new episodes';
    messages.en.subscription_added = 'New episode subscription enabled';
    messages.en.subscription_removed = 'New episode subscription disabled';
    messages.en.subscription_error = 'Could not update subscription';
    messages.uk = Object.assign({}, messages.ru, {
        catalog: 'Каталог', genres: 'Жанри', search: 'Пошук', schedule: 'Розклад', continue_watching: 'Продовжити перегляд', status: 'Статус', top_rated: 'Найкращі', account: 'Обліковий запис', anime: 'Аніме', home_sections: 'Розділи головного екрана',
        catalog_load_error: 'Не вдалося завантажити каталог YummyAnime', next_page_error: 'Не вдалося завантажити наступну сторінку YummyAnime',
        login_required: 'Увійдіть до YummyAnime через налаштування YummyAnime', actions: 'Дії YummyAnime', actions_short: 'Дії', yummy_details: 'Подробиці YummyAnime', favorite: 'Додати до улюблених', watching: 'Переглядаю', planned: 'У планах', completed: 'Переглянуто', dropped: 'Кинуто', postponed: 'Відкладено', comments: 'Коментарі', comments_empty: 'Коментарів ще немає', replies: 'відповідей', replies_title: 'Відповіді на коментар', load_more: 'Завантажити ще', saved: 'Зміни збережено в YummyAnime', save_error: 'Не вдалося зберегти оцінку',
        not_logged_in: 'Вхід не виконано', login_hint: 'Відкрийте Налаштування → YummyAnime та виберіть «Увійти до YummyAnime».', account_load_error: 'Не вдалося завантажити обліковий запис YummyAnime', account_retry: 'Оновіть токен або увійдіть знову в Налаштування → YummyAnime.', authorized: 'Виконано вхід до YummyAnime', banned: 'Обліковий запис заблоковано', registration: 'Реєстрація', last_visit: 'Останній візит', roles: 'Ролі', user: 'Користувач', messages: 'Повідомлення', unread: 'непрочитаних', notifications: 'Сповіщення', total_lists: 'Всього у списках', list_stats: 'Статистика списків', list: 'Список', anime_count: 'аніме', total_time: 'Загальний час', days_short: 'д', hours_short: 'год',
        period_3hour: '3 години', period_day: 'День', period_week: 'Тиждень', period_month: 'Місяць', all_up: 'Усі системи працюють', all_down: 'Сервіси недоступні', no_monitoring: 'Немає даних моніторингу', degraded: 'Виникли неполадки', checks: 'перевірок', availability: 'Доступність', average_load: 'Середнє завантаження', errors: 'Помилок', updated: 'Оновлено', up: 'Працює', unstable: 'Нестабільно', down: 'Недоступно', source: 'Джерело', period: 'період', refresh_status: 'Оновити статус', refreshing_status: 'Оновлюємо статус YummyAnime', status_load_error: 'Не вдалося завантажити статус YummyAnime', milliseconds: 'мс', domain_api: 'YummyAnime API', domain_waf: 'Захист',
        schedule_load_error: 'Не вдалося завантажити розклад YummyAnime', no_releases: 'Запланованих випусків немає', local_time: 'місцевий час', today: 'Сьогодні', tomorrow: 'Завтра', release: 'Реліз', episode: 'Серія', of: 'з', watch: 'Дивитися', continue_episode: 'Продовжити з серії', choose_voice: 'Виберіть озвучення та джерело', choose_episode: 'Виберіть серію', choose_anime: 'Виберіть аніме YummyAnime', no_yummy_match: 'Аніме не знайдено в YummyAnime', no_videos: 'Для цього аніме поки немає доступних серій', videos_load_error: 'Не вдалося завантажити серії YummyAnime', player: 'Плеєр', player_preference: 'Бажаний плеєр', player_last: 'Останній вибраний', player_ask: 'Завжди за алфавітом', minutes_short: 'хв', views_short: 'перегл.', thousand_short: ' тис.', million_short: ' млн', clear_history: 'Очистити історію перегляду', history_cleared: 'Історію перегляду YummyAnime очищено', open_lampa_search: 'Відкрити',
        genres_empty: 'YummyAnime не повернув список жанрів', genres_title: 'Жанри YummyAnime', genres_load_error: 'Не вдалося завантажити жанри YummyAnime', search_title: 'Пошук YummyAnime', untitled: 'Без назви', ratings_count: 'оцінок', voices_short: 'озв.', viewing_order: 'Порядок виходу', more_information: 'Додаткова інформація', recommendations: 'Рекомендації', trailers: 'Трейлери', no_recommendations: 'Рекомендацій ще немає', no_trailers: 'Трейлерів ще немає',
        language_name: 'Мова / Language', language_description: 'Мова інтерфейсу розширення YummyAnime', language_changed: 'Мову YummyAnime змінено. Відкрийте розширення знову.', section_visibility_description: 'Показувати цей розділ на головному екрані YummyAnime', lampa_card_integration: 'Картка Lampa', lampa_card_rating: 'Рейтинг YummyAnime', lampa_card_rating_description: 'Показувати рейтинг YummyAnime на звичайній картці Lampa', lampa_card_button: 'Кнопка YummyAnime', lampa_card_button_description: 'Показувати кнопку з логотипом YummyAnime на звичайній картці Lampa', version_name: 'YummyAnime', version_label: 'Версія', website_description: 'Офіційний сайт YummyAnime', unofficial_extension: 'Неофіційне розширення', account_statistics: 'Статистика', genres_statistics: 'Жанри', ratings_statistics: 'Оцінки', types_statistics: 'Типи', auth_title: 'Авторизація YummyAnime', auth_authorized: 'Ви увійшли до облікового запису YummyAnime', auth_not_authorized: 'Вхід не виконано', auth_login: 'Нікнейм або Email', auth_password: 'Пароль', auth_submit: 'Увійти', auth_account: 'Обліковий запис',
        login_name: 'Увійти до YummyAnime', refresh_name: 'Оновити токен YummyAnime', login_first: 'Спочатку увійдіть до YummyAnime', token_refreshed: 'Токен YummyAnime оновлено', token_refresh_error: 'Не вдалося оновити токен YummyAnime', logout_name: 'Вийти з YummyAnime', logged_out: 'Ви вийшли з YummyAnime', api_check_name: 'Перевірити YummyAnime API', api_ok: 'YummyAnime API працює', api_error: 'YummyAnime API недоступний або публічний токен неправильний', email_prompt: 'Нікнейм або Email', email_required: 'Введіть нікнейм або email YummyAnime', password_prompt: 'Пароль YummyAnime', password_required: 'Введіть пароль YummyAnime', login_ok: 'Вхід до YummyAnime виконано', login_error: 'Помилка входу до YummyAnime', comments_title: 'Коментарі YummyAnime', comments_error: 'Не вдалося завантажити коментарі', kinopoisk: 'Кінопошук'
    });
    messages.uk.notifications_title = 'Сповіщення YummyAnime';
    messages.uk.notifications_empty = 'Нових сповіщень немає';
    messages.uk.notifications_error = 'Не вдалося завантажити сповіщення';
    messages.uk.mark_all_read = 'Позначити всі як прочитані';
    messages.uk.delete_all_notifications = 'Видалити всі сповіщення';
    messages.uk.notifications_more = 'Завантажити ще сповіщення';
    messages.uk.sync_history = 'Синхронізувати перегляд';
    messages.uk.sync_history_description = 'Надіслати локальну історію до облікового запису YummyAnime';
    messages.uk.sync_history_ok = 'Історію перегляду синхронізовано';
    messages.uk.sync_history_error = 'Не вдалося синхронізувати історію';
    messages.uk.my_reviews = 'Мої відгуки';
    messages.uk.my_reviews_description = 'Відгуки користувача YummyAnime';
    messages.uk.reviews_empty = 'Відгуків ще немає';
    messages.uk.reviews_error = 'Не вдалося завантажити відгуки';
    messages.uk.for_you = 'Для вас';
    messages.uk.collections = 'Колекції';
    messages.uk.collection = 'Колекція';
    messages.uk.episodes_short = 'серій';
    messages.uk.recommendations_empty = 'Рекомендації з’являться після перегляду тайтлів';
    messages.uk.updates = 'Оновлення';
    messages.uk.updates_error = 'Не вдалося завантажити оновлення';
    messages.uk.subscriptions = 'Підписки на нові серії';
    messages.uk.subscriptions_empty = 'Підписок на нові серії немає';
    messages.uk.subscriptions_error = 'Не вдалося завантажити підписки';
    messages.uk.notification = 'Сповіщення';
    messages.uk.community_stats = 'Статистика спільноти';
    messages.uk.manage_list = 'Змінити список';
    messages.uk.my_rating = 'Моя оцінка';
    messages.uk.subscribe_episodes = 'Підписатися на нові серії';
    messages.uk.unsubscribe_episodes = 'Відписатися від нових серій';
    messages.uk.subscription_added = 'Підписку на нові серії увімкнено';
    messages.uk.subscription_removed = 'Підписку на нові серії вимкнено';
    messages.uk.subscription_error = 'Не вдалося змінити підписку';

    function language() {
        var value = window.Lampa && Lampa.Storage ? Lampa.Storage.get(key, 'ru') : 'ru';
        return value === 'en' || value === 'uk' ? value : 'ru';
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.I18n = window.LampaYaniI18n = {
        getLanguage: language,
        setLanguage: function (value) {
            var next = value === 'en' || value === 'uk' ? value : 'ru';
            if (window.Lampa && Lampa.Storage) Lampa.Storage.set(key, next);
            return next;
        },
        locale: function () { return language() === 'en' ? 'en-US' : language() === 'uk' ? 'uk-UA' : 'ru-RU'; },
        t: function (name) {
            return (messages[language()] && messages[language()][name]) || messages.ru[name] || name;
        }
    };
}(window));
