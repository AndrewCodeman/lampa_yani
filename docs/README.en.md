# Lampa Yani — Documentation

A new Lampa extension powered by the official YummyAnime (Yani) API.

## MVP features

- anime catalog;
- genre catalog;
- title search;
- ongoing schedule;
- Yani ratings and a top-rated section;
- Yani account login;
- rating anime from 1 to 10;
- favorites and user lists;
- viewing comments;
- dubbing and episode selection with direct-stream playback in Lampa or an external player;
- opening the official Alloha player inside Lampa when no direct stream is available;
- optional self-hosted Lampac resolution of Alloha sources into direct HLS;
- optional, disabled-by-default YummyTV app integration;
- YummyAnime button on standard Lampa cards and Online registration when that module is available;
- all players and dubbings returned by the YummyAnime API;
- preferred-player setting with the last selected source remembered;
- local playback history, one-click resume, episode duration and view counts;
- standard Lampa detail cards for matched YummyAnime catalog and schedule entries;
- a Continue Watching catalog built from local playback history;
- YummyAnime actions and correctly normalized read-only comments on standard Lampa cards;
- paginated comments and nested read-only reply threads;
- YummyAnime service status with availability, latency and per-service history;
- Russian and English extension interface;
- posters, titles, year, rating and description;
- rating-service logos on cards and detail pages;
- alternative poster sources through Jikan, Shikimori and AniList;
- opening the selected anime in Lampa search;
- modular structure for future development.

## Installation

1. Get a public application token from [yummyani.me/dev/applications](https://yummyani.me/dev/applications).
2. Set it in `src/config.js` as `applicationHeader`.
3. Add the URL of `index.js` to the Lampa extensions section.

Install the bundled file from GitHub Pages:

`https://andrewcodeman.github.io/lampa_yani/dist/index.js?v=0.20.17`

The `YummyAnime → Status` screen shows YummyStatus history for three hours, one day, one week or one month. GitHub Actions refreshes the monitoring snapshot every five minutes.

## API

The extension uses:

- `GET /anime` — catalog and filters;
- `GET /anime/genres` — genres.
- `GET /anime/{id}/videos` — available dubbings, episodes and iframe players.

Search is passed through the `q` parameter. The public token is sent in the `X-Application` header.

## Project structure

- `index.js` — entry point;
- `src/api.js` — Yani API client;
- `src/catalog.js` — catalog module;
- `src/config.js` — configuration;
- `src/i18n.js` — Russian and English localization;
- `src/ui.js` — Lampa integration;
- `src/stream-resolver.js` — direct Kodik, CVH, Aksor, Sibnet, Rutube and VK stream resolution;
- `src/lampac-resolver.js` — optional self-hosted Lampac adapter for Alloha;
- `style.css` — styles.

## Playback and Lampac

Direct HLS/DASH/MP4/WebM URLs can be played in Lampa or handed to an external Android player. Choose the behavior under `Settings → YummyAnime → Playback target`.

Without Lampac, an Alloha source opens as its official visible web player. To use your own Lampac instance, enter its complete local or HTTPS URL under `Settings → YummyAnime → Lampac server`. An empty value disables the adapter. The extension contains no Alloha or Lampac credentials.

The private YummyTV application integration is disabled by default and can be enabled separately in the playback sources settings block.

## License

MIT License. See [LICENSE](../LICENSE).

## Implemented

- detailed anime view;
- recommendations and trailers;
- favorites and user lists;
- Bearer token refresh through `/profile/token`;
- read-only comments.

Lampa settings include a `YummyAnime` section with a YummyAnime resource and API availability check.

YummyAnime GET requests are cached locally for a short time and may still be shown during temporary API outages.

GitHub Actions automatically checks JavaScript syntax on every push and pull request.

The authenticated token is automatically refreshed through `GET /profile/token`.

The detailed view uses Yani data, while trailers and recommendations are loaded through `/anime/{id}/trailers` and `/anime/{id}/recommendations`.
