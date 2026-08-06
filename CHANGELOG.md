# Changelog

## 0.6.0 — 2026-08-06

- registered YummyAnime with Lampa Online when that module is available;
- added a YummyAnime playback button to matching standard Lampa cards;
- exposed every player, dubbing and episode returned by the YummyAnime API.

## 0.5.0 — 2026-08-06

- added YummyAnime dubbing and episode selection;
- added embedded playback for official iframe players;
- direct media URLs are handed to the native Lampa Player with a playlist.

## 0.4.1 — 2026-08-06

- clarified that YummyAnime login accepts a nickname or email.

## 0.4.0 — 2026-08-06

- added a Russian/English language selector under YummyAnime settings;
- localized the plugin interface, notifications, dates and YummyAnime API language header.

## 0.3.1 — 2026-08-06

- added 3-hour, day, week and month switches to the YummyStatus dashboard.

## 0.3.0 — 2026-08-06

- added a TV-friendly YummyStatus dashboard with five-minute monitoring snapshots.

## 0.2.0 — 2026-08-06

- account settings and read-only profile statistics;
- verified YummyAnime API request contracts;
- fixed genres, ratings, daily schedule and infinite catalog pagination;
- public catalog requests no longer send stale account Bearer tokens.

## 0.1.0 — 2026-08-06

- initial YummyAnime Lampa extension;
- anime catalog, search, genres and schedule;
- seven-day schedule grouped by date with local release time and episode numbers;
- all YummyAnime rating sources on catalog cards and anime details;
- infinite offset pagination for catalog, search, genres and top-rated lists;
- fixed YummyAnime genre response parsing and genre filter values;
- audited API routes and fixed JSON login plus numeric user-list IDs;
- moved YummyAnime login, token refresh and logout to settings;
- added read-only YummyAnime account profile and list statistics page;
- isolated public catalog requests from stale or invalid account Bearer tokens;
- ratings, favorites and user lists;
- YummyAnime account login and token refresh;
- read-only comments;
- anime details, trailers and recommendations;
- local API cache and API health check;
- bundled `dist/index.js` for Lampa installation;
- Russian and English documentation;
- MIT License.
