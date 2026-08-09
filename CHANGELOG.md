# Changelog

## 0.29.5 — 2026-08-10

- Add a compact, focusable episode-information row to YummyAnime title details.
- Show explicit season count when available, total and aired episodes, watched episodes and average unique-episode duration.
- Enrich ordinary titles in the background while deferring large video lists until focus to protect low-memory devices.

## 0.29.4 — 2026-08-10

- Load the authorized user's server-side viewing history and progress from YummyAnime.
- Merge server records with local Lampa progress, deduplicate matching videos and keep local history available offline or without authorization.
- Load long server histories page by page and resume the exact saved video, episode and position.

## 0.29.3 — 2026-08-10

- Add Watch History to the Your Lists shortcut screen and reuse the existing Continue Watching component.

## 0.29.2 — 2026-08-10

- Replace the eager Your Lists API dashboard with a reliable shortcut menu for Watching, Planned, Completed, Dropped, Postponed and Favorites.
- Load only the selected account list and fall back to filtering the complete account list when a dedicated endpoint is unavailable.

## 0.29.1 — 2026-08-10

- Preserve the title-detail controller and focused action throughout the playback selection chain.
- Restore title interaction after cancelling source, dubbing, episode or playback-target selection and after returning from internal and external players or YummyTV.
- Avoid capturing the temporary Select controller as the external-player return target.
- Add a non-interactive MIT License and repository notice at the bottom of YummyAnime settings.

## 0.29.0 — 2026-08-09

- Add an authorized-only Your Lists section to the YummyAnime home screen.
- Show Watching, Planned, Completed, Dropped, On hold and Favorites with title counts and watched time.
- Open each category through the existing account-list catalog and add a visibility switch for the new section.
- Localize the new section in Russian, English and Ukrainian.

## 0.28.0 — 2026-08-09

- Add opt-out automatic viewing-progress synchronization for authorized YummyAnime users.
- Track the internal Lampa player's real position locally every ten seconds and synchronize it to YummyAnime at a bounded interval and on pause or completion.
- Keep manual account-page synchronization available when automatic synchronization is disabled.
- Clarify that external Android players cannot report their playback position back to Lampa.

## 0.27.2 — 2026-08-09

- Give a captured Alloha master an assumed lifetime, so the session is refreshed ahead of time even when the player never states one; a 12-minute test showed playback stalling after roughly eight minutes without it.
- Stop a request from blocking on a full session refresh for longer than a client will wait, and let that refresh finish in the background.

## 0.27.1 — 2026-08-09

- Translate the detail-loading error, which used to render its own key name to the user.
- Add a test asserting that every key the UI asks for is translated and that all locales cover the Russian reference.

## 0.27.0 — 2026-08-09

- Capture the Alloha session from the browser driver rather than from injected page code, so it is in place before the player issues its first request; this is what makes the resolver actually return a stream.
- Offer the full Alloha quality ladder and default to the best rung instead of whatever the offscreen player settled on.
- Keep the player's WebSocket alive from an init script so the session token keeps rotating.

## 0.26.0 — 2026-08-09

- Add an opt-in automatic switch to the next episode at the end of the current one.
- Resolve the next episode's stream a minute and a half before it is needed, so the switch is not spent waiting on the source's player page.
- Keep an automatic switch inside the running player instead of asking again where to play.

## 0.25.0 — 2026-08-09

- Skip openings and endings in the internal player using AniSkip timestamps, resolved from the MyAnimeList id YummyAnime already reports.
- Add a disabled-by-default setting choosing between openings only and openings with endings.

## 0.24.0 — 2026-08-09

- Pass the season, episode and dubbing stated in the YummyAnime player URL into the Lampac Alloha request and its season/episode selection.
- Ask Lampac to match by title whenever the title has no IMDb or Kinopoisk id, which is the common case for anime.

## 0.23.0 — 2026-08-09

- Add a self-hosted resolver service in `server/` that opens a live Alloha session in a headless browser and proxies its HLS stream with the rotating headers the CDN requires.
- Add a resolver client and settings entry, and try the resolver before Lampac when both are configured.
- Treat every resolved Alloha source as direct, whichever service produced it.
- Run the whole test suite in CI instead of a single test file.

## 0.22.0 — 2026-08-09

- Allow unresolved Alloha sources to fall back to the original embedded site player behind a new opt-in setting.
- Keep the embed disabled by default and keep the explicit warning when it is off, because it offers no Lampa timeline and no external player.
- Record playback history when the embedded Alloha player actually opens.

## 0.21.0 — 2026-08-09

- Reduce poster memory pressure by removing duplicate hidden image decoding and preferring medium-size artwork.
- Limit and deduplicate fallback-poster, YummyAnime and TMDB requests to avoid network bursts on low-memory devices.
- Stop treating every native Lampa title without genre metadata as anime.
- Remove an unused duplicate detail-sections module from the production bundle.
- Inline and restore the YummyAnime logo on the native Lampa title-card button.

## 0.20.23 — 2026-08-09

- Keep the YummyAnime for Lampa public application key as the default API identity.
- Add an optional settings action for entering or clearing a custom public `X-Application` key.
- Use the selected public application key for login, token refresh, logout and all API requests while keeping the user Bearer token separate.
- Do not create developer applications automatically.

## 0.20.22 — 2026-08-09

- Stop showing the usage policy automatically.
- Keep the policy available as an explicit action in YummyAnime settings.
- Explain that installing and enabling the extension constitutes agreement with the stated rules.

## 0.20.21 — 2026-08-09

- Add a localized usage-policy window shown once on first launch.
- State that the extension is provided as is, is intended for informational purposes and must not be used for illegal activity.
- Add a settings action for reopening the policy at any time.

## 0.20.20 — 2026-08-09

- Restore an open YummyAnime title after Lampa clears its plugin cache or reloads extensions.
- Persist the YummyAnime title id outside the transient card object and recover legacy saved activities from their detail URL.
- Return to YummyAnime Home instead of leaving a broken partial card when a restored activity can no longer be loaded.

## 0.20.19 — 2026-08-09

- Block unresolved Alloha sources from both internal and external media players.
- Allow Alloha playback only after a configured Lampac server returns a direct stream.
- Replace the iframe fallback with an explicit localized warning and avoid recording blocked attempts as watched.

## 0.20.18 — 2026-08-09

- Force the built-in Lampa engine with `Lampa.Player.runas('lampa')` when internal playback is selected.
- Preserve online-stream, quality, header and poster metadata in the internal player playlist.
- Stop silently falling back to an external Android player when internal playback cannot start.

## 0.20.17 — 2026-08-09

- Merge player and YummyTV actions into one "Watch" button on the YummyAnime title card.
- Show the destination picker only when the optional YummyTV integration is enabled and a title ID is available.

## 0.20.16 — 2026-08-09

- Rename the title-card playback actions to "Watch in player" and "Watch in YummyTV".
- Keep the YummyTV action hidden unless its optional integration is enabled in settings.

## 0.20.15 — 2026-08-09

- Open unresolved Alloha sources in the official visible player instead of trying to send iframe URLs to a media player.
- Add an optional self-hosted Lampac adapter for `/lite/alloha` and direct `/lite/alloha/video.m3u8` playback.
- Keep direct HLS/DASH/MP4/WebM playback selectable between Lampa and external Android players.
- Make the private YummyTV application integration disabled by default and configurable in settings.
- Replace the YummyTV episode metadata dependency with Jikan episode data.

## 0.20.14 — 2026-08-09

- Add a playback target setting and direct-stream picker for choosing between an external Android player and Lampa's internal player.

## 0.20.13 — 2026-08-09

- Restore Lampa controller focus after returning from external players, browsers, YouTube, or YummyTV deep links.

## 0.20.12 — 2026-08-09

- Replace unsupported-player fallback with a two-action playback picker: watch in player or watch in YummyTV when the app is installed.

## 0.20.11 — 2026-08-09

- Shorten Alloha playback handling by opening unsupported Alloha iframe players through Android's external browser bridge instead of first sending them through video-player resolution.

## 0.20.10 — 2026-08-09

- Reduce trailer navigation by opening a compact trailer picker over the detail card, and open the trailer directly when only one trailer is available.

## 0.20.9 — 2026-08-09

- Route YouTube trailer intents through the native Android browser bridge before Lampa external media handlers, so trailers open in YouTube or a browser instead of Kodi-like players.

## 0.20.8 — 2026-08-09

- Launch YummyTV deep links through Lampa's native Android bridge.
- Prevent custom `yummytv://` links from opening inside Lampa's WebView.

## 0.20.7 — 2026-08-09

- Added an Open in YummyTV action using the native `yummytv://details/{animeId}` deep link.
- Offer YummyTV when a selected source cannot be converted to a direct external-player stream.

## 0.20.6 — 2026-08-09

- Added VK playback by resolving active embeds to direct MP4 or HLS streams with quality selection.
- Reject unavailable or deleted VK videos before opening an external player.

## 0.20.5 — 2026-08-09

- Added Rutube HLS playback with master-playlist quality discovery.
- Forwarded resolved quality maps to Android players instead of keeping them only in the YummyAnime UI.

## 0.20.4 — 2026-08-09

- Added Sibnet playback by resolving its player page to a direct MP4 stream.
- Forwarded source-specific HTTP headers to supported Android external players.

## 0.20.3 — 2026-08-09

- Show video quality, source host and episode count as a compact subtitle under each dubbing option.
- Detect quality information embedded in player URLs.
- Add Aksor player resolution and external DASH (`.mpd`) playback support.

## 0.20.2 — 2026-08-08

- Always open dubbing/source and episode selection from the detail-card Watch action.
- Keep automatic episode resume exclusive to the dedicated Continue Watching section.

## 0.20.1 — 2026-08-08

- Resolve player pages through Lampa's native Android request bridge to avoid WebView CORS failures.
- Add CVH iframe resolution with direct signed MP4 qualities up to 1080p.
- Accept extensionless signed media URLs only after a trusted stream resolver has produced them.

## 0.20.0 — 2026-08-08

- Resolve Kodik iframe/player URLs into direct HLS streams before handing playback to an external Android player.
- Keep non-direct unsupported player pages blocked from external playback instead of passing iframe URLs as media files.

## 0.19.20 — 2026-08-08

- Send episode playback to external players only when the selected source exposes a direct media stream URL.
- Use Lampa's Android player bridge before raw Android bridge fallbacks and avoid sending iframe/player pages to VLC/MX-style players.

## 0.19.19 — 2026-08-08

- Route YummyAnime episode playback to external Android/Lampa player handlers instead of iframe or in-app browser pages.
- Pass episode playlist, resume time and poster metadata to the external player handoff.

## 0.19.18 — 2026-08-08

- Open trailers through a dedicated YummyAnime trailer list with visible YouTube icons.
- Route trailer playback to external Android/Lampa handlers instead of the internal iframe player.

## 0.19.17 — 2026-08-08

- Render the native-card YummyAnime action with a standalone logo image.
- Show that action only for cards identified as animation/anime and with a high-confidence YummyAnime title match.

## 0.19.16 — 2026-08-08

- Render the YummyAnime mark in the native Lampa-card action with an embedded SVG fallback that is independent of Lampa's button typography.

## 0.19.15 — 2026-08-08

- Fix schedule rendering: preserve release metadata while grouping items by day, preventing the page from failing during time sorting.

## 0.18.17 — 2026-08-08

- Open recommended titles directly in YummyAnime instead of showing a transient native Lampa-card lookup failure.
- Add the Lampa logo to the action that opens a title in the Lampa application.

## 0.18.16 — 2026-08-08

- Fix TMDB resolution when the proxy-aware Lampa source exposes `get` but not `search`.
- On an unresolved title with a MyAnimeList ID, retry TMDB matching using its English, Japanese and synonym titles.

## 0.18.15 — 2026-08-08

- Prefer the TMDB source used by Lampa online plugins and Cub TMDB Proxy when resolving YummyAnime titles; retain the modern Lampa TMDB API as fallback.

## 0.18.14 — 2026-08-08

- Remove the redundant More information action from the title page.
- Add concise console diagnostics for native Lampa TMDB resolution, so a failed proxy lookup and a failed card transition are distinguishable.

## 0.18.13 — 2026-08-08

- Place title actions directly after the synopsis and add a Trailers action that opens its list on demand.
- Remove the permanent trailers section from the title page.
- Keep every focused detail selector visible while moving both down and up the page.
- Resolve native Lampa cards through direct TV and movie TMDB searches before using Lampa's aggregate search fallback.

## 0.18.12 — 2026-08-08

- Use the complete YummyAnime detail aliases, including `other_titles`, before resolving a title through Lampa's native TMDB search.
- Keep the original catalog title as a fallback if the YummyAnime detail request is temporarily unavailable.

## 0.18.11 — 2026-08-08

- Added `Andrew Codeman` as the YummyAnime extension author in Lampa metadata.

## 0.18.10 — 2026-08-08

- Reworked YummyAnime-to-TMDB matching to use `Lampa.TMDB.search`, the same resolver as Lampa's own search screen, before opening the shared card and its standard player sources.

## 0.18.9 — 2026-08-08

- Added YummyAnime as a source in Lampa's global search, with opening through the known YummyAnime title id.
- Protected Alloha sources now open the official YummyAnime title page in Lampa Browser; this preserves the required referrer and signed-player session instead of failing in a raw iframe.

## 0.18.8 — 2026-08-08

- Restored safe YummyAnime-to-Lampa card matching through the current `Lampa.TMDB` API; all known title variants are checked and native detail is opened only with a valid TMDB id.
- Fall back to the YummyAnime detail page if no reliable TMDB match is available, rather than requesting `movie/undefined`.

## 0.18.7 — 2026-08-08

- Restored immediate loading of trailers, recommendations and comments on title details; community statistics and collections remain optional.

## 0.18.6 — 2026-08-08

- Enabled the native Lampa scroll viewport on every custom YummyAnime page, so focus movement scrolls the visible area instead of escaping below it.

## 0.18.5 — 2026-08-07

- Kept the focused item visible on every YummyAnime page by scrolling to each selector root instead of an inner text or icon node.

## 0.18.4 — 2026-08-07

- Added a final activity-level guard that redirects YummyAnime cards with a missing TMDB ID to the YummyAnime detail page before Lampa requests `movie/undefined`.

## 0.18.3 — 2026-08-07

- Prevented YummyAnime card clicks from also invoking Lampa's native TMDB handler with an undefined ID.
- Open schedule items in the stable YummyAnime detail page; native Lampa search remains an explicit action.
- Deferred optional detail sections until the user requests them, reducing memory and network pressure on Android devices.

## 0.18.2 — 2026-08-07

- Prevent opening a TMDB detail page when the matched card has no TMDB ID.

## 0.18.1 — 2026-08-07

- Restored the proven local detail-section renderer to fix card opening.

## 0.18.0 — 2026-08-07

- Added a detail-page timeout guard to prevent infinite loading.
- Continued splitting UI pages into independent components.

## 0.17.0 — 2026-08-07

- Added collections, personalized updates, watch synchronization and account reviews.
- Unified the plugin version source in `src/config.js`.

## 0.16.1 — 2026-08-07

- standard Lampa card matching now tries alternate YummyAnime titles one by one;
- matching still validates title similarity and release year before opening the shared card.

## 0.16.0 — 2026-08-07

- redesigned the YummyAnime home screen with responsive SVG icons, color accents, depth, arrows and clearer focus styling.

## 0.15.2 — 2026-08-07

- added an 8-second timeout for standard Lampa card matching;
- fall back to the YummyAnime detail page instead of leaving an endless loader.

## 0.15.1 — 2026-08-07

- changed action settings to button rows without `Да/Нет` or `undefined` values;
- moved home-section switches into a visually separated section at the bottom of settings.

## 0.15.0 — 2026-08-07

- added rating-service logos for card and detail rating badges;
- added AniList and Shikimori poster fallbacks after the primary/Jikan sources;
- synchronized the README, bilingual documentation and installation URL with the current release.

## 0.14.9 — 2026-08-07

- restored card focus, opening and action menus across supported Lampa card render signatures;
- added configurable visibility switches for YummyAnime home sections.

## 0.14.8 — 2026-08-07

- added home section visibility switches;
- added alternative-title search and poster fallback improvements.

## 0.12.1 — 2026-08-06

- fixed premature catalog completion when a full API page contains duplicate titles;
- failed pagination requests now retry the same offset instead of skipping a page;
- prevented duplicate requests for an offset already loaded by Lampa.

## 0.12.0 — 2026-08-06

- added read-only nested comment replies through `/comments/{id}/children`;
- added 20-item pagination for anime comments and reply threads;
- added comment markup cleanup and dislike counters.

## 0.11.0 — 2026-08-06

- added YummyAnime actions to standard Lampa detail cards;
- comments are now available without account authorization and use the actual `response.comments` payload;
- added comment authors, dates, likes and reply counts;
- consolidated watch, details, comments, favorites, lists and ratings into one reusable action menu.

## 0.10.0 — 2026-08-06

- added a Continue Watching catalog for the 20 most recently opened anime;
- history cards use standard Lampa detail pages when a safe match exists;
- standard cards now retain their exact YummyAnime mapping without a second API search.

## 0.9.0 — 2026-08-06

- YummyAnime catalog and schedule entries now open standard Lampa detail cards;
- matched titles are resolved through Lampa's built-in TMDB source by title and year;
- unmatched or ambiguous titles safely fall back to the YummyAnime detail view.

## 0.8.0 — 2026-08-06

- added local playback history for the last 100 anime;
- added one-click resume from the last opened episode and player;
- added episode duration and view counts to the episode selector;
- added a playback-history reset under YummyAnime settings.

## 0.7.0 — 2026-08-06

- added a preferred-player setting;
- remembered the last selected player and placed it first in the source list;
- kept every available player and dubbing visible for manual selection.

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
