# Lampa Yani

Плагин для Lampa на базе YummyAnime (Yani) API.

## MVP

- каталог;
- поиск;
- базовые фильтры;
- открытие аниме в Lampa;
- расширяемая модульная структура.

## Структура

- `index.js` — точка входа плагина;
- `src/api.js` — HTTP-клиент Yani;
- `src/catalog.js` — каталог и поиск;
- `src/config.js` — настройки API;
- `src/ui.js` — интеграция с интерфейсом Lampa;
- `style.css` — стили.

## Установка для разработки

Подключите `index.js` как удалённый плагин Lampa. Перед установкой укажите токен приложения в `src/config.js` в поле `applicationHeader`.

Используемые методы Yani: `GET /anime`, `GET /anime/genres`. Поиск передаётся параметром `q`.
