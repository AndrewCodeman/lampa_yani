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
- posters, titles, year, rating and description;
- opening the selected anime in Lampa search;
- modular structure for future development.

## Installation

1. Get a public application token from [yummyani.me/dev/applications](https://yummyani.me/dev/applications).
2. Set it in `src/config.js` as `applicationHeader`.
3. Add the URL of `index.js` to the Lampa extensions section.

After publishing, use:

`https://raw.githubusercontent.com/AndrewCodeman/lampa_yani/main/index.js`

For publication, use the raw file URL from GitHub.

## API

The extension uses:

- `GET /anime` — catalog and filters;
- `GET /anime/genres` — genres.

Search is passed through the `q` parameter. The public token is sent in the `X-Application` header.

## Project structure

- `index.js` — entry point;
- `src/api.js` — Yani API client;
- `src/catalog.js` — catalog module;
- `src/config.js` — configuration;
- `src/ui.js` — Lampa integration;
- `style.css` — styles.

## License

MIT License. See [LICENSE](../LICENSE).

## Roadmap

- detailed anime view;
- recommendations and trailers;
- favorites and user lists;
- Bearer token refresh through `/profile/token`;
- comments: viewing, posting and replies.

Lampa settings include a `YummyAnime Settings` section with a YummyAnime resource and API availability check.

YummyAnime GET requests are cached locally for a short time and may still be shown during temporary API outages.

GitHub Actions automatically checks JavaScript syntax on every push and pull request.

The authenticated token is automatically refreshed through `GET /profile/token`.

The detailed view uses Yani data, while trailers and recommendations are loaded through `/anime/{id}/trailers` and `/anime/{id}/recommendations`.
