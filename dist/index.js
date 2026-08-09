function pluginYummyAnime() {
    if (window.plugin_yummy_anime_ready) return;
    window.plugin_yummy_anime_ready = true;

    var style = document.createElement('style');
    style.textContent = ".yani-catalog {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 1rem;\n}\n\n.icon-yani {\n    width: 2.4em;\n    height: 2.4em;\n    background: center / contain no-repeat url('./assets/yummyanime.svg');\n}\n\n.yani-home__grid {\n    display: grid;\n    grid-template-columns: repeat(3, minmax(12em, 1fr));\n    gap: 1.05em;\n    padding: 2.2em;\n    max-width: 94em;\n    margin: 0 auto;\n}\n\n.yani-home__item {\n    position: relative;\n    min-height: 8.3em;\n    padding: 1.35em 1.5em;\n    border: 0.08em solid rgba(255, 255, 255, 0.12);\n    border-radius: 1em;\n    background: linear-gradient(135deg, rgba(255,255,255,.16), rgba(255,255,255,.06));\n    box-shadow: 0 0.7em 1.8em rgba(0, 0, 0, .12), inset 0 0.08em 0 rgba(255,255,255,.12);\n    display: flex;\n    align-items: center;\n    gap: 1em;\n    overflow: hidden;\n    transition: transform .18s ease, background .18s ease, border-color .18s ease;\n}\n\n.yani-home__item.focus {\n    background: linear-gradient(135deg, #fff, rgba(255,255,255,.82));\n    color: #16151b;\n    border-color: rgba(255,255,255,.95);\n    box-shadow: 0 0 0 .18em rgba(255,255,255,.22), 0 1em 2.4em rgba(0,0,0,.25);\n    transform: translateY(-.12em) scale(1.015);\n}\n\n.yani-home__icon {\n    flex: 0 0 3.35em;\n    width: 3.35em;\n    height: 3.35em;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: .85em;\n    background: rgba(0,0,0,.18);\n    color: #fff;\n    box-shadow: inset 0 0 0 .08em rgba(255,255,255,.12);\n}\n\n.yani-home__icon svg {\n    width: 1.65em;\n    height: 1.65em;\n    fill: none;\n    stroke: currentColor;\n    stroke-width: 1.8;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n}\n\n.yani-home__title {\n    min-width: 0;\n    font-size: 1.3em;\n    font-weight: 600;\n    line-height: 1.2;\n}\n\n.yani-home__arrow {\n    margin-left: auto;\n    color: rgba(255,255,255,.55);\n    font-size: 2em;\n    line-height: 1;\n}\n\n.yani-home__item.focus .yani-home__arrow {\n    color: #ef6470;\n    transform: translateX(.15em);\n}\n\n.yani-home__item--catalog .yani-home__icon { background: linear-gradient(135deg, #ef6470, #b84068); }\n.yani-home__item--genres .yani-home__icon { background: linear-gradient(135deg, #9b75e8, #6548b7); }\n.yani-home__item--search .yani-home__icon { background: linear-gradient(135deg, #43b6d8, #2679c2); }\n.yani-home__item--schedule .yani-home__icon { background: linear-gradient(135deg, #42c68a, #218d78); }\n.yani-home__item--continue_watching .yani-home__icon { background: linear-gradient(135deg, #f0af54, #d87742); }\n.yani-home__item--status .yani-home__icon { background: linear-gradient(135deg, #48c7a0, #238d8d); }\n.yani-home__item--top_rated .yani-home__icon { background: linear-gradient(135deg, #f5c95e, #d97939); }\n.yani-home__item--account .yani-home__icon { background: linear-gradient(135deg, #e77ab3, #9d4b9c); }\n\n.yani-home__item.focus .yani-home__icon {\n    color: #fff;\n    box-shadow: 0 .35em .8em rgba(0,0,0,.2);\n}\n\n.yani-policy {\n    width: min(54em, calc(100% - 3em));\n    margin: 2.5em auto;\n    padding: 2.2em 2.5em;\n    box-sizing: border-box;\n    border: .08em solid rgba(255,255,255,.16);\n    border-radius: 1.2em;\n    background: linear-gradient(145deg, rgba(35,35,42,.96), rgba(18,18,23,.94));\n    box-shadow: 0 1.4em 4em rgba(0,0,0,.35);\n    color: #f7f7fa;\n}\n\n.yani-policy__mark {\n    width: 4.5em;\n    height: 4.5em;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-bottom: 1.2em;\n    padding: .9em;\n    box-sizing: border-box;\n    border-radius: 1.1em;\n    background: linear-gradient(135deg, #ff6871, #c74766);\n    color: #24242a;\n}\n\n.yani-policy__mark svg { width: 100%; height: 100%; fill: currentColor; }\n.yani-policy__title { width: fit-content; max-width: 100%; padding: .12em .25em; margin: 0 0 .75em -.25em; border-radius: .25em; font-size: 2.25em; font-weight: 700; }\n.yani-policy__title.focus { box-shadow: 0 0 0 .1em rgba(255,104,113,.9); background: rgba(255,104,113,.16); }\n.yani-policy__content { color: rgba(255,255,255,.82); font-size: 1.12em; line-height: 1.55; }\n.yani-policy__paragraph + .yani-policy__paragraph { margin-top: .8em; }\n.yani-policy__accept { width: fit-content; margin-top: 1.6em; padding: .78em 1.35em; border-radius: .55em; background: #ef6470; color: #fff; font-weight: 600; }\n.yani-policy__accept.focus { background: #fff; color: #17171b; box-shadow: 0 0 0 .16em #ef6470; transform: scale(1.035); }\n\n@media (max-width: 700px) {\n    .yani-policy { width: calc(100% - 1.4em); margin: 1em auto; padding: 1.4em; }\n    .yani-policy__title { font-size: 1.75em; }\n}\n\n@media (max-width: 700px) {\n    .yani-home__grid { grid-template-columns: repeat(2, minmax(10em, 1fr)); padding: 1.2em; }\n    .yani-home__item { min-height: 7em; padding: 1em; }\n    .yani-home__icon { flex-basis: 2.8em; width: 2.8em; height: 2.8em; }\n}\n\n.yani-detail {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 2.5em;\n    padding: 2em;\n    max-width: 100%;\n    box-sizing: border-box;\n    color: #f4f7fb;\n    opacity: 1;\n    filter: none;\n}\n\n.yani-detail__poster {\n    width: 16em;\n    max-height: 24em;\n    object-fit: cover;\n    border-radius: 0.8em;\n}\n\n.yani-detail__info { min-width: 0; max-width: 48em; flex: 1 1 auto; }\n.yani-detail__title { font-size: 2.2em; font-weight: 600; border-radius: .22em; padding: .08em .16em; margin: -.08em -.16em; width: fit-content; max-width: 100%; }\n.yani-detail__title.focus { background: rgba(239,100,112,.22); box-shadow: 0 0 0 .12em #ef6470; color: #fff; }\n.yani-detail__alternative-titles { margin-top: 0.35em; color: rgba(255,255,255,.68); line-height: 1.35; overflow-wrap: anywhere; }\n.yani-detail__genres { display: flex; flex-wrap: wrap; gap: .36em; margin-top: .55em; }\n.yani-detail__genre { padding: .24em .5em; border: .08em solid rgba(255,255,255,.28); border-radius: .35em; color: rgba(255,255,255,.82); font-size: .78em; line-height: 1.2; }\n.yani-detail__genre.focus { background: #fff; border-color: #fff; box-shadow: 0 0 0 .14em #ef6470; color: #111; transform: scale(1.04); }\n.yani-detail__meta { margin: 0.8em 0 1.2em; font-size: 1.2em; }\n.yani-detail__overview { line-height: 1.45; margin-bottom: 1.5em; }\n.yani-detail__actions { display: flex; flex-wrap: wrap; gap: 0.7em; max-width: 100%; }\n.yani-detail__button { display: block; max-width: 100%; box-sizing: border-box; padding: 0.8em 1.2em; border: 0.12em solid transparent; border-radius: 0.5em; background: rgba(255,255,255,.15); overflow-wrap: anywhere; }\n.yani-detail__button--watch { background: #ef6470; color: #fff; }\n.yani-detail__button--lampa, .yani-detail__button--external { display: inline-flex; align-items: center; gap: .58em; }\n.yani-detail__button-icon { display: inline-flex; width: 1.25em; height: 1.25em; flex: 0 0 1.25em; }\n.yani-detail__button-icon svg { display: block; width: 100%; height: 100%; fill: currentColor; }\n.yani-detail__button.focus { background: #fff; color: #111; border-color: #fff; box-shadow: 0 0 0 0.2em rgba(239, 100, 112, .95), 0 0 1.2em rgba(255, 255, 255, .55); transform: scale(1.02); }\n.yani-detail__list-panel { display: inline-flex; margin-top: .8em; overflow: hidden; border: .1em solid rgba(255,255,255,.18); border-radius: .45em; background: rgba(0,0,0,.24); }\n.yani-detail__list-action { display: flex; align-items: center; justify-content: center; width: 2.7em; height: 2.35em; border-right: .08em solid rgba(255,255,255,.15); color: rgba(255,255,255,.72); background: transparent; }\n.yani-detail__list-action:last-child { border-right: 0; }\n.yani-detail__list-action.active { color: #fff; background: #ef6470; }\n.yani-detail__list-action.focus { color: #111; background: #fff; box-shadow: inset 0 0 0 .18em #ef6470; transform: scale(1.06); position: relative; z-index: 1; }\n.yani-detail__list-icon { width: 1.25em; height: 1.25em; }\n.yani-detail__list-icon svg { display: block; width: 100%; height: 100%; fill: currentColor; }\n\n.yani-detail__comments { margin-top: 1.5em; padding-top: 1em; border-top: 0.08em solid rgba(255, 255, 255, .18); }\n.yani-detail__comments-title { margin-bottom: 0.7em; font-size: 1.35em; font-weight: 600; }\n.yani-detail__comments-list { display: grid; gap: 0.55em; }\n.yani-detail__comment, .yani-detail__comments-loading, .yani-detail__comments-empty, .yani-detail__comments-error { padding: 0.7em 0.85em; border-radius: 0.45em; background: rgba(255, 255, 255, .08); }\n.yani-detail__comment.focus { background: #fff; color: #111; outline: 0.18em solid #ef6470; }\n.yani-detail__comment-title { line-height: 1.35; }\n.yani-detail__comment-stats { margin-top: 0.25em; opacity: .6; font-size: .82em; }\n.yani-detail__comments-loading, .yani-detail__comments-empty, .yani-detail__comments-error { opacity: .7; }\n\n.yani-detail__order { margin-top: 1.5em; padding: 1em 0; border-top: 0.08em solid rgba(255, 255, 255, .18); border-bottom: 0.08em solid rgba(255, 255, 255, .18); }\n.yani-detail__order-title { margin-bottom: 0.65em; font-size: 1.35em; font-weight: 600; }\n.yani-detail__order-list { display: grid; gap: 0.4em; }\n.yani-detail__order-item { display: flex; align-items: baseline; gap: 0.45em; padding: 0.55em 0.7em; border-radius: 0.4em; background: rgba(255, 255, 255, .07); }\n.yani-detail__order-item.focus { background: #fff; color: #111; outline: 0.16em solid #ef6470; }\n.yani-detail__order-index { opacity: .65; }\n.yani-detail__order-name { font-weight: 600; }\n.yani-detail__order-year, .yani-detail__order-relation { opacity: .7; }\n\n.yani-detail__extra { margin-top: 1.5em; }\n.yani-detail__extra-title { margin-bottom: .65em; font-size: 1.35em; font-weight: 600; }\n.yani-detail__recommendations-list { display: flex; gap: .65em; max-width: 100%; overflow-x: auto; padding: .25em .1em .7em; }\n.yani-detail__recommendation { flex: 0 0 8em; padding-bottom: .45em; border-radius: .45em; background: rgba(255, 255, 255, .08); overflow: hidden; }\n.yani-detail__recommendation.focus { outline: .16em solid #ef6470; background: #fff; color: #111; }\n.yani-detail__recommendation-poster { display: block; width: 8em; height: 11em; object-fit: cover; }\n.yani-detail__recommendation-title { padding: .35em .45em 0; font-size: .82em; font-weight: 600; line-height: 1.2; }\n.yani-detail__recommendation-year { padding: .2em .45em 0; font-size: .75em; opacity: .65; }\n.yani-detail__trailers-list { display: grid; gap: .45em; }\n.yani-detail__trailer { padding: .7em .85em; border-radius: .45em; background: rgba(255, 255, 255, .08); }\n.yani-detail__trailer.focus { background: #fff; color: #111; outline: .16em solid #ef6470; }\n.yani-detail__collection { padding: .7em .85em; border-radius: .45em; background: rgba(255, 255, 255, .08); }\n.yani-detail__collection.focus { background: #fff; color: #111; outline: .16em solid #ef6470; }\n.yani-detail__collection-title { font-weight: 700; }\n.yani-detail__collection-description { margin-top: .25em; opacity: .72; font-size: .85em; white-space: pre-wrap; }\n.yani-detail__collection-count { margin-top: .3em; opacity: .7; font-size: .78em; }\n.yani-detail__order-item.selector:focus,\n.yani-detail__comment.selector:focus,\n.yani-detail__recommendation.selector:focus,\n.yani-detail__trailer.selector:focus { outline: .16em solid #ef6470; }\n\n.yani-trailers {\n    min-height: 100%;\n    padding: 7em 2em 2em;\n    box-sizing: border-box;\n}\n\n.yani-trailers__list {\n    display: grid;\n    gap: .7em;\n    max-width: 62em;\n}\n\n.yani-trailers__item,\n.yani-trailers__empty {\n    display: flex;\n    align-items: center;\n    gap: .9em;\n    min-height: 4.2em;\n    padding: .8em 1em;\n    border-radius: .45em;\n    background: rgba(15, 22, 31, .78);\n    color: #fff;\n    box-sizing: border-box;\n}\n\n.yani-trailers__item.focus,\n.yani-trailers__empty.focus {\n    background: #fff;\n    color: #111;\n    box-shadow: 0 0 0 .16em #ef6470;\n}\n\n.yani-trailers__icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 2.4em;\n    height: 2.4em;\n    flex: 0 0 2.4em;\n}\n\n.yani-trailers__icon svg {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n\n.yani-trailers__body {\n    min-width: 0;\n}\n\n.yani-trailers__title {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-size: 1.18em;\n    font-weight: 600;\n}\n\n.yani-trailers__host {\n    margin-top: .18em;\n    color: rgba(255, 255, 255, .62);\n    font-size: .86em;\n}\n\n.yani-trailers__item.focus .yani-trailers__host {\n    color: rgba(0, 0, 0, .56);\n}\n\n@media (max-width: 700px) {\n    .yani-detail { gap: 1em; padding: 1em; }\n    .yani-detail__poster { width: 10em; }\n}\n\n.yani-player {\n    position: fixed;\n    z-index: 1000;\n    inset: 0;\n    width: 100vw;\n    height: 100vh;\n    background: #000;\n}\n\n.yani-player__iframe {\n    display: block;\n    width: 100%;\n    height: 100%;\n    border: 0;\n    background: #000;\n}\n\n.full-start__button.view--yummyanime {\n    background: #ef6470;\n    color: #fff;\n    order: -1;\n    min-width: 3.1em;\n    padding: .45em .6em;\n}\n\n.view--yummyanime__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 1.8em;\n    height: 1.8em;\n    margin: 0;\n}\n\n.view--yummyanime__icon svg {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n\n.full-start__rate .yani-full-rating-logo {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 1.15em;\n    height: 1.15em;\n    margin: 0.12em auto 0;\n    color: #ef6470;\n}\n\n.full-start__rate .yani-full-rating-logo svg {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n\n/* Native Lampa title card: the YummyAnime action has no text, only its mark. */\n.full-start__button.view--yummyanime {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1rem !important;\n    line-height: 1 !important;\n}\n\n.view--yummyanime__icon {\n    box-sizing: border-box;\n    display: block !important;\n    width: 2.25rem !important;\n    height: 2.25rem !important;\n    min-width: 2.25rem;\n    min-height: 2.25rem;\n    font-size: 1rem !important;\n    margin: 0 !important;\n    object-fit: contain;\n    filter: brightness(0) invert(1);\n}\n\n.view--yummyanime__icon svg {\n    display: none;\n}\n\n.yani-schedule__content {\n    padding: 1.2em 2em 3em;\n    color: #f4f7fb !important;\n    opacity: 1 !important;\n    filter: none !important;\n}\n\n.yani-schedule { color: #f4f7fb !important; opacity: 1 !important; filter: none !important; }\n\n.yani-schedule__days {\n    display: flex;\n    gap: 0.65em;\n    margin-bottom: 1.2em;\n    overflow-x: auto;\n    padding: 0.2em 0.15em 0.5em;\n}\n\n.yani-schedule__day-chip {\n    flex: 0 0 auto;\n    min-width: 5.8em;\n    padding: 0.55em 0.75em;\n    border: 0.1em solid rgba(255, 255, 255, .16);\n    border-radius: 0.7em;\n    background: rgba(20, 31, 43, .9);\n    color: #b9c7d5;\n    text-align: center;\n    transition: transform .15s ease, background .15s ease, border-color .15s ease;\n}\n\n.yani-schedule__day-chip.selected {\n    background: #287da9;\n    border-color: #72d8ff;\n    color: #ffffff;\n}\n\n.yani-schedule__day-chip.focus {\n    transform: scale(1.05);\n    border-color: #ffffff;\n    box-shadow: 0 0 0 .14em rgba(98, 201, 255, .65);\n}\n\n.yani-schedule__day-name {\n    font-size: 0.95em;\n    font-weight: 700;\n    white-space: nowrap;\n}\n\n.yani-schedule__day-count {\n    margin-top: 0.25em;\n    color: #72d8ff;\n    font-size: 1.2em;\n    font-weight: 800;\n}\n\n.yani-schedule__day-chip.selected .yani-schedule__day-count { color: #ffffff; }\n\n.yani-schedule__selected-title {\n    margin: 0.3em 0 0.7em;\n    color: #ffffff;\n    font-size: 1.45em;\n    font-weight: 700;\n    text-transform: capitalize;\n}\n\n.yani-schedule__day-title {\n    margin-bottom: 0.7em;\n    font-size: 1.55em;\n    font-weight: 600;\n    color: #ffffff;\n    text-transform: capitalize;\n}\n\n.yani-schedule__item {\n    display: flex;\n    align-items: center;\n    min-height: 6.2em;\n    margin-bottom: 0.65em;\n    padding: 0.65em 1em;\n    border-radius: 0.65em;\n    color: #f4f7fb !important;\n    background: linear-gradient(100deg, #19222d, #313c48) !important;\n    border: 0.08em solid rgba(255, 255, 255, .14);\n    box-shadow: 0 .35em 1em rgba(0, 0, 0, .2);\n    opacity: 1 !important;\n    filter: none !important;\n}\n\n.yani-schedule__item.focus {\n    background: linear-gradient(100deg, #ffffff, #eaf5ff);\n    color: #101820;\n    border-color: #62c9ff;\n    box-shadow: 0 0 0 .14em rgba(98, 201, 255, .75), 0 .5em 1.4em rgba(0, 0, 0, .35);\n}\n\n.yani-schedule__poster {\n    width: 4em;\n    height: 5.5em;\n    margin-right: 1em;\n    border-radius: 0.35em;\n    object-fit: cover;\n    background: rgba(255, 255, 255, 0.08);\n}\n\n.yani-schedule__info {\n    flex: 1;\n    min-width: 0;\n}\n\n.yani-schedule__title {\n    overflow: hidden;\n    font-size: 1.15em;\n    font-weight: 500;\n    color: inherit;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.yani-schedule__episode {\n    margin-top: 0.4em;\n    color: #cbd8e5;\n    opacity: 1;\n}\n\n.yani-schedule__item.focus .yani-schedule__episode,\n.yani-schedule__item.focus .yani-schedule__timezone { color: #41566b; }\n\n.yani-schedule__release {\n    min-width: 8em;\n    margin-left: 1em;\n    text-align: right;\n}\n\n.yani-schedule__time {\n    font-size: 1.25em;\n    font-weight: 600;\n    color: #72d8ff;\n}\n\n.yani-schedule__item.focus .yani-schedule__time { color: #1675a5; }\n\n.yani-schedule__timezone,\n.yani-schedule__empty {\n    color: #b9c7d5;\n    opacity: 1;\n}\n\n.yani-schedule__empty {\n    padding: 1em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.06);\n}\n\n.yani-detail__schedule {\n    margin-bottom: 1.2em;\n    font-size: 1.15em;\n    font-weight: 600;\n}\n\n.yani-detail__community { margin: 1em 0 1.2em; }\n.yani-detail__personal-rating { display: inline-block; margin: .5em 0; padding: .45em .7em; border-radius: .45em; background: rgba(240, 175, 84, .22); color: #ffd27a; font-weight: 700; }\n.yani-detail__community-title { margin-bottom: .55em; color: #fff; font-size: 1.15em; font-weight: 700; }\n.yani-detail__community-grid { display: flex; flex-wrap: wrap; gap: .45em; }\n.yani-detail__community-item { padding: .45em .7em; border-radius: .45em; background: rgba(255,255,255,.1); color: #d9e7f2; }\n\n.yani-card-ratings {\n    position: absolute;\n    right: 0.35em;\n    bottom: 0.35em;\n    left: 0.35em;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 0.2em;\n    pointer-events: none;\n}\n\n.yani-card-media {\n    position: absolute;\n    top: 0.35em;\n    left: 0.35em;\n    display: flex;\n    gap: 0.25em;\n    pointer-events: none;\n}\n\n.yani-card-media__badge {\n    padding: 0.22em 0.38em;\n    border-radius: 0.25em;\n    background: rgba(0, 0, 0, 0.82);\n    color: #fff;\n    font-size: 0.62em;\n    font-weight: 700;\n    line-height: 1.1;\n}\n\n.yani-card-media__quality { background: #f1c40f; color: #171717; }\n.yani-card-media__voices { background: #3b9bd9; }\n.yani-card-update { position: absolute; top: 0.35em; right: 0.35em; z-index: 2; padding: 0.22em 0.38em; border-radius: 0.25em; background: #ef6470; color: #fff; font-size: 0.62em; font-weight: 700; line-height: 1.1; }\n.yani-card-list { position: absolute; left: 0.35em; bottom: 0.35em; z-index: 3; max-width: calc(100% - 0.7em); padding: 0.25em 0.45em; border-radius: 0.3em; background: #5f43a8; color: #fff; font-size: 0.68em; font-weight: 700; line-height: 1.1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n\n.yani-card-rating {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0.2em 0.3em;\n    border-radius: 0.25em;\n    background: rgba(0, 0, 0, 0.78);\n    color: #fff;\n    font-size: 0.62em;\n}\n\n.yani-rating-logo {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 2.1em;\n    height: 1.45em;\n    padding: 0 0.3em;\n    box-sizing: border-box;\n    border-radius: 0.28em;\n    background: #fff;\n    color: #111;\n    font-size: 0.78em;\n    font-weight: 800;\n    letter-spacing: -0.04em;\n    line-height: 1;\n}\n\n.yani-rating-logo--yummy { background: #ef6470; color: #fff; }\n.yani-rating-logo--kp { background: #f2c94c; color: #171717; }\n.yani-rating-logo--shikimori { background: #8b6fc9; color: #fff; }\n.yani-rating-logo--anidub { background: #3b9bd9; color: #fff; }\n.yani-rating-logo--mal { background: #2e5d93; color: #fff; }\n.yani-rating-logo--worldart { background: #f28c28; color: #fff; }\n.yani-rating-logo--yummy,\n.yani-rating-logo--kp,\n.yani-rating-logo--shikimori,\n.yani-rating-logo--anidub,\n.yani-rating-logo--mal,\n.yani-rating-logo--worldart {\n    overflow: hidden;\n}\n\n.yani-card-rating__logo {\n    margin-right: 0.25em;\n}\n\n.yani-card-rating__value {\n    font-weight: 600;\n}\n\n.yani-ratings {\n    display: grid;\n    grid-template-columns: repeat(3, minmax(8em, 1fr));\n    gap: 0.6em;\n    margin: 1em 0 1.4em;\n}\n\n.yani-ratings__item {\n    padding: 0.65em 0.8em;\n    border-radius: 0.5em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-ratings__header { display: flex; align-items: center; gap: 0.55em; }\n.yani-ratings__logo { min-width: 2.5em; height: 1.7em; font-size: 0.85em; }\n.yani-ratings__value {\n    font-size: 1.35em;\n    font-weight: 600;\n}\n\n.yani-ratings__source {\n    margin-top: 0.15em;\n    opacity: 0.78;\n}\n\n.yani-ratings__votes {\n    margin-top: 0.2em;\n    font-size: 0.75em;\n    opacity: 0.55;\n}\n\n.yani-account__content {\n    padding: 1.5em 2em 3em;\n}\n\n.yani-account__notification-button {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin: 1em 0;\n    padding: 1em 1.2em;\n    border: 0.08em solid rgba(255,255,255,.16);\n    border-radius: .7em;\n    background: rgba(36, 58, 78, .85);\n}\n\n.yani-account__notification-button.focus { background: #287da9; box-shadow: 0 0 0 .14em rgba(98,201,255,.65); }\n.yani-account__notification-button span { color: #72d8ff; }\n.yani-notifications__content { padding: 1.5em 2em 3em; }\n.yani-notifications__title { margin-bottom: .8em; color: #fff; font-size: 1.6em; font-weight: 700; }\n.yani-notification { margin: .7em 0; padding: 1em 1.2em; border-radius: .65em; background: rgba(255,255,255,.08); border: .08em solid rgba(255,255,255,.1); }\n.yani-notification.unread { border-color: #72d8ff; background: rgba(40,125,169,.3); }\n.yani-notification.focus { background: #fff; color: #17222e; box-shadow: 0 0 0 .14em rgba(98,201,255,.75); }\n.yani-notification__title { font-size: 1.15em; font-weight: 700; }\n.yani-notification__text { margin-top: .35em; color: #cbd8e5; }\n.yani-notification.focus .yani-notification__text { color: #41566b; }\n.yani-notification__date { margin-top: .45em; color: #8ea4b8; font-size: .82em; }\n\n.yani-account__profile {\n    display: flex;\n    align-items: center;\n    padding: 1.2em;\n    border-radius: 0.8em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-account__profile.focus,\n.yani-account__info.focus,\n.yani-account__list.focus,\n.yani-account__notice.focus {\n    background: #fff;\n    color: #111;\n}\n\n.yani-account__avatar {\n    width: 7em;\n    height: 7em;\n    margin-right: 1.2em;\n    border-radius: 50%;\n    object-fit: cover;\n}\n\n.yani-account__name {\n    font-size: 1.8em;\n    font-weight: 600;\n}\n\n.yani-account__id,\n.yani-account__about {\n    margin-top: 0.35em;\n    opacity: 0.7;\n}\n\n.yani-account__warning {\n    margin-top: 0.5em;\n    color: #ff6868;\n    font-weight: 600;\n}\n\n.yani-account__grid,\n.yani-account__lists {\n    display: grid;\n    grid-template-columns: repeat(3, minmax(10em, 1fr));\n    gap: 0.7em;\n    margin-top: 1em;\n}\n\n.yani-account__info,\n.yani-account__list,\n.yani-account__notice {\n    padding: 1em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-account__info-title,\n.yani-account__list-time,\n.yani-account__notice-text {\n    opacity: 0.65;\n}\n\n.yani-account__info-value,\n.yani-account__list-count,\n.yani-account__notice-title {\n    margin-top: 0.3em;\n    font-size: 1.2em;\n    font-weight: 600;\n}\n\n.yani-account__list-title {\n    font-size: 1.15em;\n    font-weight: 600;\n}\n\n.yani-account__list-time {\n    margin-top: 0.35em;\n}\n\n.yani-account__section-title {\n    margin-top: 1.5em;\n    font-size: 1.45em;\n    font-weight: 600;\n}\n\n.yani-account__stats {\n    display: inline-flex;\n    flex-direction: column;\n    width: min(100%, 34em);\n    margin: 0.7em 0.7em 0 0;\n    padding: 0.8em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.08);\n    vertical-align: top;\n}\n\n.yani-account__stats-title {\n    margin-bottom: 0.45em;\n    font-size: 1.1em;\n    font-weight: 600;\n}\n\n.yani-account__stats-row {\n    display: flex;\n    justify-content: space-between;\n    gap: 1em;\n    padding: 0.4em 0.55em;\n    border-radius: 0.35em;\n}\n\n.yani-account__stats-row.focus {\n    background: #fff;\n    color: #111;\n}\n\n.yani-auth__content {\n    width: min(100%, 42em);\n    margin: 0 auto;\n    padding: 2em;\n}\n\n.yani-auth__title {\n    margin-bottom: 0.35em;\n    font-size: 2em;\n    font-weight: 600;\n}\n\n.yani-auth__status {\n    margin-bottom: 1.4em;\n    color: #f0a33b;\n    opacity: 0.9;\n}\n\n.yani-auth__status.is-authorized {\n    color: #4caf50;\n}\n\n.yani-auth__form,\n.yani-auth__actions {\n    display: grid;\n    gap: 0.7em;\n}\n\n.yani-auth__field,\n.yani-auth__button {\n    padding: 1em 1.2em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-auth__field.focus,\n.yani-auth__button.focus {\n    background: #fff;\n    color: #111;\n    outline: 0.16em solid #ef6470;\n}\n\n.yani-auth__field-title {\n    margin-bottom: 0.3em;\n    opacity: 0.65;\n}\n\n.yani-auth__field-value {\n    font-size: 1.15em;\n    font-weight: 600;\n}\n\n.yani-auth__button {\n    text-align: center;\n    font-weight: 600;\n}\n\n.yani-auth__button--primary {\n    background: #ef6470;\n    color: #fff;\n}\n\n.yani-auth__account,\n.yani-auth__hint {\n    margin-top: 1em;\n    opacity: 0.65;\n}\n\n.yani-status__content {\n    padding: 1.4em 2em 3em;\n}\n\n.yani-status__periods {\n    display: flex;\n    gap: 0.65em;\n    margin-bottom: 1em;\n}\n\n.yani-status__period {\n    padding: 0.65em 1.15em;\n    border-radius: 0.55em;\n    background: rgba(255, 255, 255, 0.14);\n}\n\n.yani-status__period.active {\n    background: #ef6470;\n    color: #fff;\n}\n\n.yani-status__period.focus {\n    box-shadow: 0 0 0 0.16em #fff;\n}\n\n.yani-status__summary {\n    display: flex;\n    align-items: center;\n    gap: 2em;\n    padding: 1.4em;\n    border-radius: 0.8em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-status__summary.focus,\n.yani-status__domain.focus,\n.yani-status__refresh.focus,\n.yani-status__error.focus {\n    background: #fff;\n    color: #111;\n}\n\n.yani-status__ring {\n    display: flex;\n    flex: 0 0 10em;\n    align-items: center;\n    justify-content: center;\n    width: 10em;\n    height: 10em;\n    border-radius: 50%;\n}\n\n.yani-status__ring-center {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    width: 7em;\n    height: 7em;\n    border-radius: 50%;\n    background: #292929;\n    color: #fff;\n}\n\n.yani-status__ring-center strong {\n    font-size: 1.65em;\n}\n\n.yani-status__ring-center span {\n    margin-top: 0.2em;\n    opacity: 0.7;\n}\n\n.yani-status__summary-info {\n    flex: 1;\n}\n\n.yani-status__headline {\n    margin-bottom: 0.7em;\n    font-size: 1.8em;\n    font-weight: 700;\n}\n\n.yani-status__metrics {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(8em, 1fr));\n    gap: 0.6em;\n}\n\n.yani-status__metric {\n    padding: 0.65em;\n    border-radius: 0.45em;\n    background: rgba(0, 0, 0, 0.18);\n}\n\n.yani-status__metric span,\n.yani-status__metric strong {\n    display: block;\n}\n\n.yani-status__metric span {\n    margin-bottom: 0.25em;\n    opacity: 0.65;\n}\n\n.yani-status__metric strong {\n    font-size: 1.1em;\n}\n\n.yani-status__legend {\n    display: flex;\n    align-items: center;\n    gap: 0.45em;\n    margin: 1.1em 0 0.7em;\n    opacity: 0.75;\n}\n\n.yani-status__dot,\n.yani-status__state {\n    display: inline-block;\n    width: 0.7em;\n    height: 0.7em;\n    border-radius: 50%;\n}\n\n.yani-status__dot--up,\n.yani-status--up .yani-status__state,\n.yani-status__bar--up { background: #4caf50; }\n.yani-status__dot--degraded,\n.yani-status--degraded .yani-status__state,\n.yani-status__bar--degraded { background: #f0a33b; }\n.yani-status__dot--down,\n.yani-status--down .yani-status__state,\n.yani-status__bar--down { background: #db4455; }\n.yani-status__bar--unknown { background: #777; }\n\n.yani-status__domain {\n    margin-bottom: 0.65em;\n    padding: 0.85em 1em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-status__domain-head,\n.yani-status__domain-name,\n.yani-status__domain-values {\n    display: flex;\n    align-items: center;\n}\n\n.yani-status__domain-head {\n    justify-content: space-between;\n    margin-bottom: 0.6em;\n}\n\n.yani-status__domain-name {\n    gap: 0.55em;\n}\n\n.yani-status__domain-name strong {\n    font-size: 1.1em;\n}\n\n.yani-status__domain-name small {\n    opacity: 0.5;\n}\n\n.yani-status__domain-values {\n    gap: 1em;\n    opacity: 0.7;\n}\n\n.yani-status__history {\n    display: flex;\n    gap: 0.12em;\n    width: 100%;\n    height: 1.35em;\n}\n\n.yani-status__bar {\n    flex: 1 1 0;\n    min-width: 0.18em;\n    border-radius: 0.15em;\n}\n\n.yani-status__refresh,\n.yani-status__error {\n    margin-top: 1em;\n    padding: 0.9em 1.1em;\n    border-radius: 0.6em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-status__source {\n    margin-top: 0.8em;\n    opacity: 0.55;\n}\n\n.yani-status__refresh {\n    display: inline-block;\n}\n\n.yani-status__error strong,\n.yani-status__error span {\n    display: block;\n}\n\n.yani-status__error span {\n    margin-top: 0.4em;\n    opacity: 0.65;\n}\n\n@media (max-width: 700px) {\n    .yani-schedule__content { padding: 1em; }\n    .yani-schedule__release { min-width: 5em; }\n    .yani-schedule__timezone { display: none; }\n    .yani-ratings { grid-template-columns: repeat(2, minmax(7em, 1fr)); }\n    .yani-account__content { padding: 1em; }\n    .yani-account__grid,\n    .yani-account__lists { grid-template-columns: repeat(2, minmax(8em, 1fr)); }\n    .yani-status__content { padding: 1em; }\n    .yani-status__summary { align-items: flex-start; gap: 1em; }\n    .yani-status__ring { flex-basis: 7em; width: 7em; height: 7em; }\n    .yani-status__ring-center { width: 5em; height: 5em; }\n    .yani-status__metrics { grid-template-columns: repeat(2, minmax(7em, 1fr)); }\n    .yani-status__domain-name small { display: none; }\n}\n";
    document.head.appendChild(style);

(function (window) {
    'use strict';

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Config = window.LampaYaniConfig = {
        version: '0.20.22',
        apiBase: 'https://api.yani.tv',
        statusUrl: 'https://andrewcodeman.github.io/lampa_yani/status/status.json',
        applicationHeader: 'p6_gpujl6d3pho8n', // Public Yani application token
        cacheTtl: 300000,
        cacheEntries: 100,
        requestTimeout: 15000,
        requestRetries: 2
    };
}(window));

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
            schedule_load_error: 'Не удалось загрузить расписание YummyAnime', no_releases: 'Нет запланированных выпусков', local_time: 'местное время', today: 'Сегодня', tomorrow: 'Завтра', release: 'Релиз', episode: 'Серия', of: 'из', watch: 'Смотреть', continue_episode: 'Продолжить с серии', choose_voice: 'Выберите озвучку и источник', choose_episode: 'Выберите серию', choose_anime: 'Выберите аниме YummyAnime', no_yummy_match: 'Аниме не найдено в YummyAnime', lampa_card_fallback: 'Карточка Lampa не найдена — открыты данные YummyAnime', no_videos: 'Для этого аниме пока нет доступных серий', videos_load_error: 'Не удалось загрузить серии YummyAnime', external_stream_unavailable: 'Этот источник отдаёт страницу плеера, а не прямой видеопоток для внешнего плеера', player: 'Плеер', player_preference: 'Предпочтительный плеер', player_preference_description: 'Выбранный источник будет показан первым; остальные варианты останутся доступны', player_last: 'Последний выбранный', player_ask: 'Всегда по алфавиту', minutes_short: 'мин', views_short: 'просм.', thousand_short: ' тыс.', million_short: ' млн', clear_history: 'Очистить историю просмотра', clear_history_description: 'Удалить сохранённые последние серии YummyAnime на этом устройстве', history_cleared: 'История просмотра YummyAnime очищена', open_lampa_search: 'Открыть',
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
            schedule_load_error: 'Failed to load the YummyAnime schedule', no_releases: 'No scheduled releases', local_time: 'local time', today: 'Today', tomorrow: 'Tomorrow', release: 'Release', episode: 'Episode', of: 'of', watch: 'Watch', continue_episode: 'Continue from episode', choose_voice: 'Choose dubbing and source', choose_episode: 'Choose episode', choose_anime: 'Choose YummyAnime title', no_yummy_match: 'Anime was not found on YummyAnime', lampa_card_fallback: 'No Lampa card was found — YummyAnime details were opened', no_videos: 'No episodes are currently available for this anime', videos_load_error: 'Failed to load YummyAnime episodes', external_stream_unavailable: 'This source returns a player page, not a direct video stream for an external player', player: 'Player', player_preference: 'Preferred player', player_preference_description: 'The selected source is listed first while all other variants remain available', player_last: 'Last selected', player_ask: 'Always alphabetical', minutes_short: 'min', views_short: 'views', thousand_short: 'K', million_short: 'M', clear_history: 'Clear playback history', clear_history_description: 'Remove saved last episodes for YummyAnime on this device', history_cleared: 'YummyAnime playback history cleared', open_lampa_search: 'Open',
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
    messages.ru.video_quality = 'Качество';
    messages.ru.quality_auto = 'авто';
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
    messages.en.video_quality = 'Quality';
    messages.en.quality_auto = 'auto';
    messages.ru.open_yummytv = 'Открыть в YummyTV';
    messages.ru.yummytv_open_failed = 'Не удалось открыть YummyTV. Убедитесь, что приложение установлено';
    messages.ru.yummytv_id_missing = 'Не удалось определить ID тайтла YummyAnime';
    messages.ru.watch_in_player = 'Смотреть в плеере';
    messages.ru.watch_in_player_description = 'Открыть источник во внешнем плеере или браузере';
    messages.ru.watch_in_yummytv = 'Смотреть в YummyTV';
    messages.ru.watch_in_yummytv_description = 'Открыть тайтл в установленном приложении YummyTV';
    messages.ru.choose_playback = 'Выберите способ просмотра';
    messages.ru.watch_external_player = 'Внешний плеер';
    messages.ru.watch_external_player_description = 'Открыть поток во внешнем Android-плеере';
    messages.ru.watch_internal_lampa = 'Внутренний плеер Lampa';
    messages.ru.watch_internal_lampa_description = 'Проигрывать прямой поток внутри Lampa';
    messages.ru.internal_player_unavailable = 'Не удалось запустить внутренний плеер Lampa';
    messages.ru.playback_target = 'Способ просмотра';
    messages.ru.playback_target_description = 'Как открывать прямые видеопотоки YummyAnime';
    messages.ru.playback_target_ask = 'Спрашивать';
    messages.ru.playback_target_external = 'Внешний плеер';
    messages.ru.playback_target_internal = 'Внутренний плеер Lampa';
    messages.ru.playback_services = 'Источники воспроизведения';
    messages.ru.yummytv_integration = 'Интеграция с YummyTV';
    messages.ru.yummytv_integration_description = 'Показывать необязательные кнопки открытия тайтлов в приложении YummyTV';
    messages.ru.lampac_server = 'Сервер Lampac';
    messages.ru.lampac_server_description = 'Необязательный собственный сервер для получения прямого потока Alloha';
    messages.ru.lampac_server_prompt = 'Адрес Lampac, например http://192.168.1.10:9118. Оставьте пустым для отключения';
    messages.ru.lampac_server_saved = 'Сервер Lampac сохранён';
    messages.ru.lampac_server_disabled = 'Интеграция Lampac отключена';
    messages.ru.lampac_server_invalid = 'Укажите полный адрес Lampac с http:// или https://';
    messages.ru.lampac_unavailable = 'Модуль Lampac недоступен';
    messages.ru.not_configured = 'не настроен';
    messages.ru.alloha_direct_required = 'Alloha недоступен во внутреннем и внешнем плеере без прямого потока. Настройте сервер Lampac или выберите другой источник';
    messages.ru.usage_policy_title = 'Политика использования';
    messages.ru.usage_policy_as_is = 'Расширение YummyAnime предоставляется «как есть», без каких-либо явных или подразумеваемых гарантий.';
    messages.ru.usage_policy_information = 'Расширение предназначено исключительно для ознакомительных и информационных целей.';
    messages.ru.usage_policy_legal = 'Расширение не предназначено для использования в незаконных действиях, нарушения авторских прав или обхода ограничений доступа.';
    messages.ru.usage_policy_responsibility = 'Пользователь самостоятельно отвечает за соблюдение законодательства своей страны и правил сторонних сервисов.';
    messages.ru.usage_policy_accept = 'Закрыть';
    messages.ru.usage_policy_settings_description = 'Устанавливая и включая расширение, вы автоматически соглашаетесь с установленными правилами. Открыть политику использования';
    messages.en.open_yummytv = 'Open in YummyTV';
    messages.en.yummytv_open_failed = 'Could not open YummyTV. Make sure the app is installed';
    messages.en.yummytv_id_missing = 'Could not determine the YummyAnime title ID';
    messages.en.watch_in_player = 'Watch in player';
    messages.en.watch_in_player_description = 'Open the source in an external player or browser';
    messages.en.watch_in_yummytv = 'Watch in YummyTV';
    messages.en.watch_in_yummytv_description = 'Open the title in the installed YummyTV app';
    messages.en.choose_playback = 'Choose how to watch';
    messages.en.watch_external_player = 'External player';
    messages.en.watch_external_player_description = 'Open the stream in an external Android player';
    messages.en.watch_internal_lampa = 'Internal Lampa player';
    messages.en.watch_internal_lampa_description = 'Play the direct stream inside Lampa';
    messages.en.internal_player_unavailable = 'Could not start the internal Lampa player';
    messages.en.playback_target = 'Playback target';
    messages.en.playback_target_description = 'How YummyAnime should open direct video streams';
    messages.en.playback_target_ask = 'Ask every time';
    messages.en.playback_target_external = 'External player';
    messages.en.playback_target_internal = 'Internal Lampa player';
    messages.en.playback_services = 'Playback sources';
    messages.en.yummytv_integration = 'YummyTV integration';
    messages.en.yummytv_integration_description = 'Show optional actions for opening titles in the YummyTV app';
    messages.en.lampac_server = 'Lampac server';
    messages.en.lampac_server_description = 'Optional self-hosted server for resolving a direct Alloha stream';
    messages.en.lampac_server_prompt = 'Lampac URL, for example http://192.168.1.10:9118. Leave empty to disable';
    messages.en.lampac_server_saved = 'Lampac server saved';
    messages.en.lampac_server_disabled = 'Lampac integration disabled';
    messages.en.lampac_server_invalid = 'Enter a complete Lampac URL starting with http:// or https://';
    messages.en.lampac_unavailable = 'Lampac module is unavailable';
    messages.en.not_configured = 'not configured';
    messages.en.alloha_direct_required = 'Alloha cannot use the internal or external player without a direct stream. Configure a Lampac server or choose another source';
    messages.en.usage_policy_title = 'Usage policy';
    messages.en.usage_policy_as_is = 'The YummyAnime extension is provided “as is”, without warranties of any kind, express or implied.';
    messages.en.usage_policy_information = 'The extension is intended solely for informational and introductory purposes.';
    messages.en.usage_policy_legal = 'The extension is not intended for illegal activity, copyright infringement, or circumvention of access restrictions.';
    messages.en.usage_policy_responsibility = 'Users are responsible for complying with the laws of their country and the rules of third-party services.';
    messages.en.usage_policy_accept = 'Close';
    messages.en.usage_policy_settings_description = 'By installing and enabling the extension, you automatically agree to the established rules. Open the usage policy';
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
    messages.uk.video_quality = 'Якість';
    messages.uk.quality_auto = 'авто';
    messages.uk.open_yummytv = 'Відкрити в YummyTV';
    messages.uk.yummytv_open_failed = 'Не вдалося відкрити YummyTV. Переконайтеся, що застосунок установлено';
    messages.uk.yummytv_id_missing = 'Не вдалося визначити ID тайтлу YummyAnime';
    messages.uk.watch_in_player = 'Дивитися в плеєрі';
    messages.uk.watch_in_player_description = 'Відкрити джерело у зовнішньому плеєрі або браузері';
    messages.uk.watch_in_yummytv = 'Дивитися в YummyTV';
    messages.uk.watch_in_yummytv_description = 'Відкрити тайтл у встановленому застосунку YummyTV';
    messages.uk.choose_playback = 'Виберіть спосіб перегляду';
    messages.uk.watch_external_player = 'Зовнішній плеєр';
    messages.uk.watch_external_player_description = 'Відкрити потік у зовнішньому Android-плеєрі';
    messages.uk.watch_internal_lampa = 'Внутрішній плеєр Lampa';
    messages.uk.watch_internal_lampa_description = 'Програвати прямий потік усередині Lampa';
    messages.uk.internal_player_unavailable = 'Не вдалося запустити внутрішній плеєр Lampa';
    messages.uk.playback_target = 'Спосіб перегляду';
    messages.uk.playback_target_description = 'Як відкривати прямі відеопотоки YummyAnime';
    messages.uk.playback_target_ask = 'Запитувати';
    messages.uk.playback_target_external = 'Зовнішній плеєр';
    messages.uk.playback_target_internal = 'Внутрішній плеєр Lampa';
    messages.uk.playback_services = 'Джерела відтворення';
    messages.uk.yummytv_integration = 'Інтеграція з YummyTV';
    messages.uk.yummytv_integration_description = 'Показувати необов’язкові дії для відкриття тайтлів у застосунку YummyTV';
    messages.uk.lampac_server = 'Сервер Lampac';
    messages.uk.lampac_server_description = 'Необов’язковий власний сервер для отримання прямого потоку Alloha';
    messages.uk.lampac_server_prompt = 'Адреса Lampac, наприклад http://192.168.1.10:9118. Залиште порожнім для вимкнення';
    messages.uk.lampac_server_saved = 'Сервер Lampac збережено';
    messages.uk.lampac_server_disabled = 'Інтеграцію Lampac вимкнено';
    messages.uk.lampac_server_invalid = 'Вкажіть повну адресу Lampac з http:// або https://';
    messages.uk.lampac_unavailable = 'Модуль Lampac недоступний';
    messages.uk.not_configured = 'не налаштовано';
    messages.uk.alloha_direct_required = 'Alloha недоступний у внутрішньому та зовнішньому плеєрі без прямого потоку. Налаштуйте сервер Lampac або виберіть інше джерело';
    messages.uk.usage_policy_title = 'Політика використання';
    messages.uk.usage_policy_as_is = 'Розширення YummyAnime надається «як є», без будь-яких прямих або непрямих гарантій.';
    messages.uk.usage_policy_information = 'Розширення призначене виключно для ознайомлювальних та інформаційних цілей.';
    messages.uk.usage_policy_legal = 'Розширення не призначене для незаконних дій, порушення авторських прав або обходу обмежень доступу.';
    messages.uk.usage_policy_responsibility = 'Користувач самостійно відповідає за дотримання законодавства своєї країни та правил сторонніх сервісів.';
    messages.uk.usage_policy_accept = 'Закрити';
    messages.uk.usage_policy_settings_description = 'Установлюючи та вмикаючи розширення, ви автоматично погоджуєтеся з установленими правилами. Відкрити політику використання';

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

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Auth = window.LampaYaniAuth = {
        get: function () {
            var stored = readStored();
            return tokenFrom(stored) ? stored : memory;
        },
        token: function () { return tokenFrom(this.get()); },
        save: function (data) {
            var token = tokenFrom(data);
            if (!token) throw new Error('Login response did not contain a token');
            memory = {token: token, refreshed_at: data.refreshed_at || Date.now(), login: data.login || '', display_name: data.display_name || data.login || ''};
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
                LampaYaniAuth.save({token: tokenFrom(data), refreshed_at: Date.now(), login: current.login, display_name: current.display_name});
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

    function sleep(milliseconds) {
        return new Promise(function (resolve) { setTimeout(resolve, milliseconds); });
    }

    function fetchWithRetry(url, options, canRetry) {
        var retries = canRetry ? Number(config.requestRetries || 0) : 0;
        var timeout = Number(config.requestTimeout || 15000);
        function attempt(number) {
            var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
            var requestOptions = Object.assign({}, options);
            if (controller) requestOptions.signal = controller.signal;
            var timer = setTimeout(function () { if (controller) controller.abort(); }, timeout);
            return fetch(url, requestOptions).then(function (response) {
                clearTimeout(timer);
                var retryableStatus = response.status === 408 || response.status === 425 || response.status === 429 || response.status >= 500;
                if (!response.ok && retryableStatus && number < retries) {
                    return sleep(Math.pow(2, number) * 400).then(function () { return attempt(number + 1); });
                }
                return response;
            }).catch(function (error) {
                clearTimeout(timer);
                var aborted = error && error.name === 'AbortError';
                if (number < retries && !aborted) return sleep(Math.pow(2, number) * 400).then(function () { return attempt(number + 1); });
                throw error;
            });
        }
        return attempt(0);
    }

    function rememberCacheKey(key) {
        if (!window.Lampa || !Lampa.Storage) return;
        var indexKey = 'lampa_yummyanime_cache_index';
        var keys = [];
        try { keys = JSON.parse(Lampa.Storage.get(indexKey, '[]')) || []; } catch (ignore) {}
        keys = keys.filter(function (item) { return item !== key; });
        keys.push(key);
        while (keys.length > Number(config.cacheEntries || 80)) {
            var expired = keys.shift();
            try { Lampa.Storage.remove(expired); } catch (ignoreRemove) {}
        }
        Lampa.Storage.set(indexKey, JSON.stringify(keys));
    }

    function request(path, options) {
        options = options || {};
        var headers = options.headers || {};
        var apiLanguage = window.LampaYaniI18n ? LampaYaniI18n.getLanguage() : 'ru';
        var cacheKey = 'lampa_yummyanime_cache_' + apiLanguage + '_' + path;
        var cacheTtl = options.cacheTtl || config.cacheTtl || 300000;

        if (config.applicationHeader) headers['X-Application'] = config.applicationHeader;
        if (options.auth && LampaYaniAuth && LampaYaniAuth.token()) headers.Authorization = 'Bearer ' + LampaYaniAuth.token();
        headers.Accept = 'application/json';
        headers.Lang = apiLanguage;
        if (options.token) headers.Authorization = 'Bearer ' + options.token;

        return fetchWithRetry(config.apiBase + path, {
            method: options.method || 'GET',
            headers: headers,
            body: options.body
        }, (options.method || 'GET') === 'GET').then(function (response) {
            if (!response.ok) throw new Error('YummyAnime API: ' + response.status);
            return response.json();
        }).then(function (payload) {
            if ((options.method || 'GET') === 'GET' && options.cache !== false && window.Lampa && Lampa.Storage) {
                Lampa.Storage.set(cacheKey, JSON.stringify({time: Date.now(), data: payload}));
                rememberCacheKey(cacheKey);
            }
            return payload;
        }).catch(function (error) {
            if ((options.method || 'GET') === 'GET' && options.cache !== false && window.Lampa && Lampa.Storage) {
                try {
                    var cached = JSON.parse(Lampa.Storage.get(cacheKey, 'null'));
                    if (cached && (options.staleFallback || Date.now() - cached.time < cacheTtl)) return cached.data;
                } catch (ignore) {}
            }
            throw error;
        });
    }

    function externalRequest(base, path, options) {
        options = options || {};
        var url = base.replace(/\/$/, '') + path;
        return fetchWithRetry(url, {
            method: options.method || 'GET',
            headers: {Accept: 'application/json'}
        }, true).then(function (response) {
            if (!response.ok) throw new Error('External API: ' + response.status);
            return response.json();
        });
    }

    var malTitlesCache = {};

    function malTitles(malId) {
        if (!malId) return Promise.resolve([]);
        var key = String(malId);
        if (malTitlesCache[key]) return malTitlesCache[key];
        malTitlesCache[key] = externalRequest('https://api.jikan.moe/v4', '/anime/' + encodeURIComponent(key) + '/full').then(function (payload) {
            var anime = payload && payload.data || {};
            var titles = [anime.title, anime.title_english, anime.title_japanese].concat(Array.isArray(anime.title_synonyms) ? anime.title_synonyms : []);
            return titles.filter(function (title, index, list) {
                return typeof title === 'string' && title.trim() && list.indexOf(title) === index;
            });
        }).catch(function (error) {
            delete malTitlesCache[key];
            throw error;
        });
        return malTitlesCache[key];
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Api = window.LampaYaniApi = {
        request: request,
        search: function (query, params) {
            params = params || {};
            params.q = query || undefined;
            params.limit = params.limit || 20;
            return request('/anime?' + new URLSearchParams(params), {auth: true});
        },
        catalog: function (params) {
            return request('/anime?' + new URLSearchParams(params || {limit: 20}), {auth: true});
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
        schedule: function () {
            return request('/anime/schedule', {
                cacheTtl: 60 * 60 * 1000,
                staleFallback: true
            });
        },
        episodeInfo: function (malId) {
            if (!malId) return Promise.reject(new Error('MAL id is missing'));
            return externalRequest('https://api.jikan.moe/v4', '/anime/' + encodeURIComponent(malId) + '/episodes').then(function (payload) {
                return {
                    episodes: (payload && payload.data || []).map(function (item) {
                        return {episodeNumber: item.mal_id, title: item.title || item.title_romanji || item.title_japanese || ''};
                    })
                };
            });
        },
        malTitles: malTitles,
        detail: function (id) {
            return request('/anime/' + encodeURIComponent(id), {auth: true});
        },
        videos: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/videos', {cache: false});
        },
        subscribeVideo: function (videoId) {
            return request('/video/' + encodeURIComponent(videoId) + '/subscribe', {
                method: 'PUT',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: '{}'
            });
        },
        unsubscribeVideo: function (videoId) {
            return request('/video/' + encodeURIComponent(videoId) + '/subscribe', {
                method: 'DELETE',
                auth: true
            });
        },
        trailers: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/trailers');
        },
        recommendations: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/recommendations');
        },
        collections: function (id, limit, offset) {
            return request('/anime/' + encodeURIComponent(id) + '/collections?limit=' + encodeURIComponent(limit || 10) + '&offset=' + encodeURIComponent(offset || 0));
        },
        ratingBuckets: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/rates', {auth: true});
        },
        listStats: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/lists', {auth: true});
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
        removeFromList: function (id) {
            return request('/anime/' + encodeURIComponent(id) + '/list', {method: 'DELETE', auth: true});
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
        subscriptions: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/lists/subs', {auth: true, cache: false});
        },
        userList: function (id, listId) {
            return request('/users/' + encodeURIComponent(id) + '/lists/' + encodeURIComponent(listId), {auth: true, cache: false});
        },
        userStatsGenres: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/stats/genres', {auth: true, cache: false});
        },
        userStatsRatings: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/stats/ratings', {auth: true, cache: false});
        },
        userStatsTypes: function (id) {
            return request('/users/' + encodeURIComponent(id) + '/stats/types-v2', {auth: true, cache: false});
        },
        userReviews: function (id, limit, offset) {
            return request('/users/' + encodeURIComponent(id) + '/reviews?type=approved&limit=' + encodeURIComponent(limit || 30) + '&offset=' + encodeURIComponent(offset || 0), {auth: true, cache: false});
        },
        notifications: function (limit, offset) {
            return request('/profile/notifications?limit=' + encodeURIComponent(limit || 30) + '&offset=' + encodeURIComponent(offset || 0), {auth: true, cache: false});
        },
        notificationCounts: function () {
            return request('/profile/notifications/counts', {auth: true, cache: false});
        },
        markNotificationRead: function (id) {
            return request('/profile/notifications/' + encodeURIComponent(id) + '/read', {method: 'POST', auth: true, cache: false});
        },
        markAllNotificationsRead: function () {
            return request('/profile/notifications/read', {method: 'POST', auth: true, cache: false, headers: {'Content-Type': 'application/json'}, body: '{}'});
        },
        deleteNotification: function (id) {
            return request('/profile/notifications/' + encodeURIComponent(id), {method: 'DELETE', auth: true, cache: false});
        },
        deleteAllNotifications: function () {
            return request('/profile/notifications', {method: 'DELETE', auth: true, cache: false});
        },
        syncVideoProgress: function (videoId, time, duration) {
            return request('/video/' + encodeURIComponent(videoId), {
                method: 'PUT',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({time: Math.max(0, Number(time) || 0), duration: Math.max(0, Number(duration) || 0), times: []})
            });
        },
        syncVideoWatches: function (videos) {
            return request('/video', {
                method: 'POST',
                auth: true,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({videos: videos || []})
            });
        },
        health: function () {
            return request('/anime?limit=1');
        },
        status: function () {
            return fetchWithRetry(config.statusUrl + '?_=' + Date.now(), {cache: 'no-store'}, true).then(function (response) {
                if (!response.ok) throw new Error('YummyStatus snapshot: ' + response.status);
                return response.json();
            })
        }
    };
}(window));

(function (window) {
    'use strict';

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Catalog = window.LampaYaniCatalog = {
        search: function (query, params) {
            return window.LampaYaniApi.search(query, params);
        }
    };
}(window));

(function (window) {
    'use strict';

    var CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
    var QUALITY_ORDER = [240, 360, 480, 720, 1080];
    var HLS_QUALITY_MANIFEST_PATTERN = /\/(\d+)\.mp4:hls:manifest\.m3u8(?=$|[?#])/i;
    var cache = {};
    var cacheKeys = [];
    var CACHE_LIMIT = 50;

    function normalizeUrl(url) {
        url = String(url || '').trim();
        if (!url) return '';
        if (url.indexOf('//') === 0) return 'https:' + url;
        if (/^https?:\/\//i.test(url)) return url;
        return 'https://' + url.replace(/^\/+/, '');
    }

    function isDirectVideoUrl(url) {
        return /\.(m3u8|mpd|mp4|webm)(?:[?#].*)?$/i.test(String(url || ''));
    }

    function isKodikUrl(url) {
        return /kodik/i.test(String(url || ''));
    }

    function isCvhUrl(url) {
        url = String(url || '');
        return /iframeCVH\.html/i.test(url) || /cdnvideohub/i.test(url);
    }

    function isAksorUrl(url) {
        return /(?:^|\.)aksor\.tv(?:[/:]|$)/i.test(String(url || '').replace(/^https?:\/\//i, ''));
    }

    function isSibnetUrl(url) {
        return /(?:^|\.)video\.sibnet\.ru(?:[/:]|$)/i.test(String(url || '').replace(/^https?:\/\//i, ''));
    }

    function isRutubeUrl(url) {
        return /(?:^|\.)rutube\.ru(?:[/:]|$)/i.test(String(url || '').replace(/^https?:\/\//i, '')) && /[a-f0-9]{32}/i.test(String(url || ''));
    }

    function isVkUrl(url) {
        url = String(url || '');
        return /iframeVK\.html/i.test(url) || /(?:^|\.)(?:vk\.com|vkvideo\.ru)(?:[/:]|$)/i.test(url.replace(/^https?:\/\//i, ''));
    }

    function originOf(url) {
        var match = String(url || '').match(/^(https?:\/\/[^/]+)/i);
        return match ? match[1] : '';
    }

    function sameOriginPath(origin, src) {
        if (!src) return '';
        if (src.indexOf('//') === 0) return 'https:' + src;
        if (/^https?:\/\//i.test(src)) return src;
        if (src.charAt(0) === '/') return origin.replace(/\/$/, '') + src;
        return origin.replace(/\/$/, '') + '/' + src;
    }

    function responseText(value) {
        if (typeof value === 'string') return value;
        if (value === undefined || value === null) return '';
        try { return JSON.stringify(value); } catch (ignore) { return String(value); }
    }

    function nativeRequestText(url, options) {
        options = options || {};
        return new Promise(function (resolve, reject) {
            if (!window.Lampa || !Lampa.Reguest) return reject(new Error('Lampa native request is unavailable'));
            var network = new Lampa.Reguest();
            var timeout = Number((window.LampaYaniConfig && LampaYaniConfig.requestTimeout) || 15000);
            if (network.timeout) network.timeout(timeout);
            network.native(url, function (value) {
                resolve(responseText(value));
            }, function (error, exception) {
                var message = error && (error.responseText || error.message || error.status) || exception || 'Native request failed';
                reject(new Error(String(message)));
            }, options.body, {
                dataType: 'text',
                type: options.method || 'GET',
                timeout: timeout,
                headers: options.headers || {}
            });
        });
    }

    function browserRequestText(url, options) {
        options = options || {};
        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timeout = Number((window.LampaYaniConfig && LampaYaniConfig.requestTimeout) || 15000);
        var timer = setTimeout(function () { if (controller) controller.abort(); }, timeout);
        var headers = Object.assign({
            'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
            'User-Agent': CHROME_UA
        }, options.headers || {});
        if (options.referer) headers.Referer = options.referer;
        var requestOptions = {
            method: options.method || 'GET',
            headers: headers,
            body: options.body,
            credentials: options.credentials || 'include'
        };
        if (controller) requestOptions.signal = controller.signal;
        return fetch(url, requestOptions).then(function (response) {
            clearTimeout(timer);
            if (!response.ok) {
                var error = new Error('HTTP ' + response.status);
                error.status = response.status;
                throw error;
            }
            return response.text();
        }).catch(function (error) {
            clearTimeout(timer);
            throw error;
        });
    }

    function requestText(url, options) {
        options = options || {};
        var isAndroid = !!(window.AndroidJS || window.Android) || !!(window.Lampa && Lampa.Platform && Lampa.Platform.is && Lampa.Platform.is('android'));
        if (isAndroid && window.Lampa && Lampa.Reguest) {
            return nativeRequestText(url, options).catch(function (nativeError) {
                console.warn('[YummyAnime] Native stream request failed, trying browser request', nativeError);
                return browserRequestText(url, options);
            });
        }
        return browserRequestText(url, options);
    }

    function requestJson(url, options) {
        return requestText(url, options).then(function (text) {
            try { return JSON.parse(text); } catch (error) { throw new Error('Invalid player API response'); }
        });
    }

    function atobSafe(value) {
        try {
            return window.atob(value);
        } catch (ignore) {
            return '';
        }
    }

    function decodeKodikSrc(src) {
        if (!src) return '';
        if (src.indexOf('//') >= 0) return src;
        try {
            var rotated = String(src).split('').map(function (char) {
                if (!/[a-z]/i.test(char)) return char;
                var code = char.charCodeAt(0) + 18;
                var limit = char <= 'Z' ? 90 : 122;
                return String.fromCharCode(code <= limit ? code : code - 26);
            }).join('');
            rotated += '='.repeat((4 - rotated.length % 4) % 4);
            return atobSafe(rotated);
        } catch (ignore) {
            return '';
        }
    }

    function fixProtocol(url) {
        url = String(url || '');
        if (url.indexOf('//') === 0) return 'https:' + url;
        if (/^https?:\/\//i.test(url)) return url;
        return url ? 'https://' + url : '';
    }

    function hlsManifestQuality(url) {
        var match = HLS_QUALITY_MANIFEST_PATTERN.exec(String(url || ''));
        return match ? Number(match[1]) : 0;
    }

    function replaceHlsManifestQuality(url, quality) {
        return String(url || '').replace(HLS_QUALITY_MANIFEST_PATTERN, '/' + quality + '.mp4:hls:manifest.m3u8');
    }

    function headOk(url) {
        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timer = setTimeout(function () { if (controller) controller.abort(); }, 5000);
        var options = {
            method: 'HEAD',
            headers: {'User-Agent': CHROME_UA},
            credentials: 'omit'
        };
        if (controller) options.signal = controller.signal;
        return fetch(url, options).then(function (response) {
            clearTimeout(timer);
            return response.ok;
        }).catch(function () {
            clearTimeout(timer);
            return false;
        });
    }

    function resolveQualityStreamUrl(url, expectedQuality) {
        var actualQuality = hlsManifestQuality(url);
        if (!actualQuality || actualQuality === expectedQuality) {
            return Promise.resolve({label: expectedQuality + 'p', url: url});
        }
        if (expectedQuality <= actualQuality) {
            return Promise.resolve({label: actualQuality + 'p', url: url});
        }
        var repairedUrl = replaceHlsManifestQuality(url, expectedQuality);
        if (repairedUrl === url) return Promise.resolve({label: actualQuality + 'p', url: url});
        return headOk(repairedUrl).then(function (ok) {
            return ok ? {label: expectedQuality + 'p', url: repairedUrl} : {label: actualQuality + 'p', url: url};
        });
    }

    function parseQualityMap(responseText) {
        var json;
        try {
            json = JSON.parse(responseText);
        } catch (ignore) {
            return Promise.resolve(null);
        }
        var links = json && json.links;
        if (!links) return Promise.resolve(null);
        var qualities = {};
        var tasks = QUALITY_ORDER.map(function (quality) {
            var list = links[String(quality)];
            var src = Array.isArray(list) && list[0] && list[0].src;
            if (!src) return null;
            var decoded = fixProtocol(decodeKodikSrc(src));
            if (!decoded) return null;
            return resolveQualityStreamUrl(decoded, quality).then(function (result) {
                if (result && result.url && !qualities[result.label]) qualities[result.label] = result.url;
            });
        }).filter(Boolean);
        return Promise.all(tasks).then(function () {
            return Object.keys(qualities).length ? qualities : null;
        });
    }

    function extractFirst(regex, text) {
        var match = regex.exec(text);
        return match ? match[1] : '';
    }

    function extractEndpointPath(playerScript) {
        var regex = /atob\("([A-Za-z0-9+/=]+)"\)/g;
        var match;
        while ((match = regex.exec(playerScript))) {
            var decoded = atobSafe(match[1]);
            if (decoded && decoded.charAt(0) === '/' && decoded.indexOf('//') !== 0 && decoded.length <= 10) return decoded;
        }
        return '/ftor';
    }

    function cacheResult(key, result) {
        if (!key || !result) return result;
        delete cache[key];
        cache[key] = {time: Date.now(), result: result};
        cacheKeys = cacheKeys.filter(function (item) { return item !== key; });
        cacheKeys.push(key);
        while (cacheKeys.length > CACHE_LIMIT) delete cache[cacheKeys.shift()];
        return result;
    }

    function cached(key) {
        var item = cache[key];
        if (!item || Date.now() - item.time > 10 * 60 * 1000) return null;
        return item.result;
    }

    function resolveKodik(iframeUrl) {
        var fullUrl = normalizeUrl(iframeUrl);
        var hit = cached(fullUrl);
        if (hit) return Promise.resolve(hit);
        return requestText(fullUrl, {referer: 'https://yani.tv/'}).then(function (html) {
            var flat = String(html || '').replace(/[\n\r]/g, '');
            var urlParamsStr = extractFirst(/\burlParams\s*=\s*'([^']+)'/, flat);
            var type = extractFirst(/\b(?:videoInfo|vInfo)\.type\s*=\s*'([^']+)'/, flat);
            var hash = extractFirst(/\b(?:videoInfo|vInfo)\.hash\s*=\s*'([^']+)'/, flat);
            var id = extractFirst(/\b(?:videoInfo|vInfo)\.id\s*=\s*'([^']+)'/, flat);
            var playerSrc = extractFirst(/src="((?:(?:https?:)?\/\/[^"]+)?\/assets\/js\/app\.player_single[^"]+)"/, flat);
            if (!urlParamsStr || !type || !hash || !id || !playerSrc) throw new Error('Kodik player data not found');

            var iframeOrigin = originOf(fullUrl);
            var playerScriptUrl = sameOriginPath(iframeOrigin, playerSrc);
            var playerOrigin = playerScriptUrl.split('/assets/js/')[0] || iframeOrigin;
            var urlParams = JSON.parse(urlParamsStr);
            return requestText(playerScriptUrl, {referer: fullUrl}).then(function (playerScript) {
                var endpointUrl = playerOrigin + extractEndpointPath(playerScript);
                var body = [
                    ['d', urlParams.d],
                    ['d_sign', urlParams.d_sign],
                    ['pd', urlParams.pd],
                    ['pd_sign', urlParams.pd_sign],
                    ['ref', urlParams.ref],
                    ['ref_sign', urlParams.ref_sign],
                    ['bad_user', 'true'],
                    ['cdn_is_working', 'true'],
                    ['type', type],
                    ['hash', hash],
                    ['id', id],
                    ['info', '{}']
                ].map(function (pair) {
                    var value = pair[0] === 'ref' ? String(pair[1] || '') : encodeURIComponent(String(pair[1] || ''));
                    return pair[0] + '=' + value;
                }).join('&');
                return requestText(endpointUrl, {
                    method: 'POST',
                    body: body,
                    referer: fullUrl,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
            });
        }).then(parseQualityMap).then(function (qualities) {
            if (!qualities) throw new Error('Kodik stream links not found');
            var labels = Object.keys(qualities);
            var label = labels[labels.length - 1];
            return cacheResult(fullUrl, {url: qualities[label], quality: label, qualities: qualities, source: 'kodik'});
        });
    }

    function queryParams(url) {
        var result = {};
        var query = String(url || '').split('?')[1] || '';
        query.split('&').forEach(function (pair) {
            var split = pair.indexOf('=');
            if (split < 0) return;
            var key = pair.slice(0, split);
            var value = pair.slice(split + 1).replace(/\+/g, ' ');
            try { result[decodeURIComponent(key)] = decodeURIComponent(value); } catch (ignore) { result[key] = value; }
        });
        return result;
    }

    function replaceIpHost(url, failoverHost) {
        if (!url || !failoverHost) return url;
        try {
            var parsed = new URL(url);
            if (parsed.protocol === 'https:' && /^\d{1,3}(?:\.\d{1,3}){3}$/.test(parsed.hostname)) parsed.hostname = failoverHost;
            return parsed.toString();
        } catch (ignore) {
            return url;
        }
    }

    function resolveCvh(iframeUrl) {
        var fullUrl = normalizeUrl(iframeUrl);
        var hit = cached(fullUrl);
        if (hit) return Promise.resolve(hit);
        var params = queryParams(fullUrl);
        var animeId = params.anime_id;
        var episode = Number(params.episode || 1);
        var dubbingCode = String(params.dubbing_code || '').toLowerCase();
        if (!animeId) return Promise.reject(new Error('CVH anime id not found'));

        var headers = {
            Referer: 'https://ru.yummyani.me/',
            'User-Agent': CHROME_UA,
            Accept: 'application/json'
        };
        var playlistUrl = 'https://plapi.cdnvideohub.com/api/v1/player/sv/playlist?pub=745&id=' + encodeURIComponent(animeId) + '&aggr=mali';
        return requestJson(playlistUrl, {headers: headers}).then(function (playlist) {
            var candidates = (playlist && Array.isArray(playlist.items) ? playlist.items : []).filter(function (item) {
                return Number(item && item.episode) === episode;
            });
            var selected = candidates.filter(function (item) {
                return String(item && item.voiceStudio || '').toLowerCase() === dubbingCode;
            })[0] || candidates[0];
            if (!selected || !selected.vkId) throw new Error('CVH episode not found');
            return requestJson('https://plapi.cdnvideohub.com/api/v1/player/sv/video/' + encodeURIComponent(selected.vkId), {headers: headers});
        }).then(function (video) {
            var sources = video && video.sources || {};
            var failoverHost = video && video.failoverHost || '';
            var qualities = {};
            [
                ['240p', 'mpegLowestUrl'],
                ['360p', 'mpegLowUrl'],
                ['480p', 'mpegMediumUrl'],
                ['720p', 'mpegHighUrl'],
                ['1080p', 'mpegFullHdUrl']
            ].forEach(function (item) {
                var streamUrl = replaceIpHost(String(sources[item[1]] || '').trim(), failoverHost);
                if (streamUrl) qualities[item[0]] = streamUrl;
            });
            var labels = Object.keys(qualities);
            if (!labels.length) throw new Error('CVH stream links not found');
            var label = labels[labels.length - 1];
            return cacheResult(fullUrl, {url: qualities[label], quality: label, qualities: qualities, source: 'cvh', direct: true});
        });
    }

    function resolveAksor(iframeUrl) {
        var fullUrl = normalizeUrl(iframeUrl);
        var hit = cached(fullUrl);
        if (hit) return Promise.resolve(hit);
        var hash = '';
        try {
            var parts = new URL(fullUrl).pathname.split('/').filter(Boolean);
            var videoIndex = parts.indexOf('video');
            hash = videoIndex >= 0 ? parts[videoIndex + 1] : parts[parts.length - 1];
        } catch (ignore) {}
        if (!hash) return Promise.reject(new Error('Aksor video hash not found'));

        var headers = {
            Referer: fullUrl,
            'User-Agent': CHROME_UA,
            Accept: 'application/json'
        };
        return requestJson('https://player.aksor.tv/api/video/' + encodeURIComponent(hash), {headers: headers}).then(function (payload) {
            var raw = payload && payload.qualities || {};
            var qualities = {};
            [
                ['360p', 'q360'],
                ['480p', 'q480'],
                ['720p', 'q720'],
                ['1080p', 'q1080'],
                ['2K', 'q2k'],
                ['4K', 'q4k']
            ].forEach(function (item) {
                var streamUrl = String(raw[item[1]] || '').trim().replace(/ /g, '%20');
                if (streamUrl && streamUrl.toLowerCase() !== 'null') qualities[item[0]] = streamUrl;
            });
            var labels = Object.keys(qualities);
            if (!labels.length) throw new Error('Aksor stream links not found');
            var label = labels[labels.length - 1];
            return cacheResult(fullUrl, {url: qualities[label], quality: label, qualities: qualities, source: 'aksor', direct: true});
        });
    }

    function decodeHtmlUrl(value) {
        return String(value || '')
            .replace(/\\\//g, '/')
            .replace(/\\u0026/gi, '&')
            .replace(/&amp;/gi, '&')
            .replace(/&#0*38;/gi, '&');
    }

    function resolveSibnet(iframeUrl) {
        var fullUrl = normalizeUrl(iframeUrl);
        var hit = cached(fullUrl);
        if (hit) return Promise.resolve(hit);
        var requestHeaders = {
            Referer: 'https://yani.tv/',
            'User-Agent': CHROME_UA,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        };
        return requestText(fullUrl, {headers: requestHeaders}).then(function (html) {
            var text = String(html || '');
            var streamUrl = extractFirst(/player\.src\s*\(\s*\[\s*\{\s*src\s*:\s*["']([^"']+)["']/i, text) ||
                extractFirst(/<source[^>]+src\s*=\s*["']([^"']+)["']/i, text);
            streamUrl = sameOriginPath(originOf(fullUrl), decodeHtmlUrl(streamUrl));
            if (!streamUrl || !/\.mp4(?:[?#]|$)/i.test(streamUrl)) throw new Error('Sibnet MP4 stream not found');
            var playbackHeaders = {
                Referer: fullUrl,
                Origin: 'https://video.sibnet.ru',
                'User-Agent': CHROME_UA
            };
            return cacheResult(fullUrl, {
                url: streamUrl,
                quality: 'auto',
                source: 'sibnet',
                direct: true,
                headers: playbackHeaders
            });
        });
    }

    function absoluteUrl(url, baseUrl) {
        url = String(url || '').trim();
        if (!url) return '';
        try { return new URL(url, baseUrl).toString(); } catch (ignore) { return sameOriginPath(originOf(baseUrl), url); }
    }

    function rutubeQualityMap(masterText, masterUrl) {
        var found = {};
        var pending = '';
        String(masterText || '').split(/\r?\n/).forEach(function (line) {
            line = line.trim();
            if (!line) return;
            if (/^#EXT-X-STREAM-INF/i.test(line)) {
                var resolution = /RESOLUTION=\d+x(\d+)/i.exec(line);
                pending = resolution ? resolution[1] + 'p' : '';
                return;
            }
            if (pending && line.charAt(0) !== '#') {
                found[pending] = absoluteUrl(line, masterUrl);
                pending = '';
            }
        });
        var ordered = {};
        [144, 240, 360, 480, 720, 1080, 1440, 2160].forEach(function (quality) {
            var label = quality + 'p';
            if (found[label]) ordered[label] = found[label];
        });
        return ordered;
    }

    function resolveRutube(iframeUrl) {
        var fullUrl = normalizeUrl(iframeUrl);
        var hit = cached(fullUrl);
        if (hit) return Promise.resolve(hit);
        var idMatch = /([a-f0-9]{32})/i.exec(fullUrl);
        if (!idMatch) return Promise.reject(new Error('Rutube video id not found'));
        var playbackHeaders = {
            Referer: fullUrl,
            Origin: 'https://rutube.ru',
            'User-Agent': CHROME_UA
        };
        var requestHeaders = Object.assign({Accept: '*/*'}, playbackHeaders);
        var optionsUrl = 'https://rutube.ru/api/play/options/' + idMatch[1] + '/?no_404=true';
        return requestJson(optionsUrl, {headers: requestHeaders}).then(function (payload) {
            var balancer = payload && payload.video_balancer || {};
            var streamUrl = String(balancer.m3u8 || balancer.default || '').trim();
            if (!streamUrl) throw new Error('Rutube HLS stream not found');
            return requestText(streamUrl, {headers: requestHeaders}).then(function (master) {
                var qualities = rutubeQualityMap(master, streamUrl);
                var labels = Object.keys(qualities);
                if (!labels.length) qualities.auto = streamUrl;
                labels = Object.keys(qualities);
                var label = labels[labels.length - 1];
                return cacheResult(fullUrl, {
                    url: qualities[label],
                    quality: label,
                    qualities: qualities,
                    source: 'rutube',
                    direct: true,
                    headers: playbackHeaders
                });
            }).catch(function () {
                return cacheResult(fullUrl, {
                    url: streamUrl,
                    quality: 'auto',
                    qualities: {auto: streamUrl},
                    source: 'rutube',
                    direct: true,
                    headers: playbackHeaders
                });
            });
        });
    }

    function vkVideoPair(url) {
        var params = queryParams(url);
        var combined = String(params.id || '');
        var combinedMatch = /^(-?\d+)_(\d+)$/.exec(combined);
        if (combinedMatch) return {owner: combinedMatch[1], video: combinedMatch[2]};
        if (/^-?\d+$/.test(String(params.oid || '')) && /^\d+$/.test(String(params.id || ''))) {
            return {owner: String(params.oid), video: String(params.id)};
        }
        var pathMatch = /(?:video|clip)(-?\d+)_(\d+)/i.exec(String(url || ''));
        return pathMatch ? {owner: pathMatch[1], video: pathMatch[2]} : null;
    }

    function decodeVkPayload(value) {
        return decodeHtmlUrl(value)
            .replace(/\\u003a/gi, ':')
            .replace(/\\u003d/gi, '=')
            .replace(/\\u002f/gi, '/')
            .replace(/\\x26/gi, '&');
    }

    function addVkQuality(qualities, label, value, baseUrl) {
        var streamUrl = absoluteUrl(decodeVkPayload(value), baseUrl);
        if (!streamUrl || !/^https?:\/\//i.test(streamUrl) || !/\.(?:m3u8|mp4)(?:[?#]|$)/i.test(streamUrl)) return;
        if (!qualities[label]) qualities[label] = streamUrl;
    }

    function vkQualityMap(html, baseUrl) {
        var text = decodeVkPayload(String(html || ''));
        var qualities = {};
        var match;
        var qualityPattern = /["'](?:url|mp4_)(2160|1440|1080|720|480|360|240)["']\s*:\s*["']([^"']+)["']/gi;
        while ((match = qualityPattern.exec(text))) addVkQuality(qualities, match[1] + 'p', match[2], baseUrl);

        var hlsPattern = /["'](?:hls_fmp4|hls|url_hls)["']\s*:\s*["']([^"']+)["']/gi;
        while ((match = hlsPattern.exec(text))) addVkQuality(qualities, 'auto', match[1], baseUrl);

        if (!Object.keys(qualities).length) {
            var directPattern = /(https?:\/\/[^\s"'<>\\]+\.(?:m3u8|mp4)(?:\?[^\s"'<>\\]*)?)/gi;
            while ((match = directPattern.exec(text))) addVkQuality(qualities, 'auto', match[1], baseUrl);
        }

        var ordered = {};
        [240, 360, 480, 720, 1080, 1440, 2160].forEach(function (quality) {
            var label = quality + 'p';
            if (qualities[label]) ordered[label] = qualities[label];
        });
        if (qualities.auto) ordered.auto = qualities.auto;
        return ordered;
    }

    function resolveVk(iframeUrl) {
        var fullUrl = normalizeUrl(iframeUrl);
        var hit = cached(fullUrl);
        if (hit) return Promise.resolve(hit);
        var pair = vkVideoPair(fullUrl);
        if (!pair) return Promise.reject(new Error('VK video id not found'));
        var playerUrl = 'https://vk.com/video_ext.php?oid=' + encodeURIComponent(pair.owner) + '&id=' + encodeURIComponent(pair.video) + '&hd=1';
        var requestHeaders = {
            Referer: fullUrl,
            'User-Agent': CHROME_UA,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        };
        return requestText(playerUrl, {headers: requestHeaders}).then(function (html) {
            if (/embedErrorCallback\s*\?\.?\s*\(\s*8\s*\)/i.test(String(html || ''))) throw new Error('VK video unavailable');
            var qualities = vkQualityMap(html, playerUrl);
            var labels = Object.keys(qualities);
            if (!labels.length) throw new Error('VK stream links not found');
            var playableLabels = labels.filter(function (label) { return label !== 'auto'; });
            var label = playableLabels.length ? playableLabels[playableLabels.length - 1] : labels[labels.length - 1];
            return cacheResult(fullUrl, {
                url: qualities[label],
                quality: label,
                qualities: qualities,
                source: 'vk',
                direct: true,
                headers: {
                    Referer: playerUrl,
                    Origin: 'https://vk.com',
                    'User-Agent': CHROME_UA
                }
            });
        });
    }

    function resolve(url) {
        url = normalizeUrl(url);
        if (!url) return Promise.reject(new Error('Empty stream URL'));
        if (isDirectVideoUrl(url)) return Promise.resolve({url: url, source: 'direct'});
        if (isKodikUrl(url)) return resolveKodik(url);
        if (isCvhUrl(url)) return resolveCvh(url);
        if (isAksorUrl(url)) return resolveAksor(url);
        if (isSibnetUrl(url)) return resolveSibnet(url);
        if (isRutubeUrl(url)) return resolveRutube(url);
        if (isVkUrl(url)) return resolveVk(url);
        return Promise.reject(new Error('Unsupported player URL'));
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.StreamResolver = window.LampaYaniStreamResolver = {
        canResolve: function (url) { return isDirectVideoUrl(url) || isKodikUrl(url) || isCvhUrl(url) || isAksorUrl(url) || isSibnetUrl(url) || isRutubeUrl(url) || isVkUrl(url); },
        resolve: resolve,
        isDirectVideoUrl: isDirectVideoUrl
    };
}(window));

(function (window) {
    'use strict';

    function videoData(video) {
        var value = video && video.data;
        if (!value) return {};
        if (typeof value === 'object') return value;
        if (typeof value === 'string') {
            try { return JSON.parse(value) || {}; } catch (error) { return {}; }
        }
        return {};
    }

    function normalizeVideoUrl(url) {
        if (!url) return '';
        url = String(url).trim();
        if (url.indexOf('//') === 0) url = 'https:' + url;
        if (/^http:\/\/(?:www\.)?kodik\./i.test(url)) url = 'https://' + url.slice(7);
        return url;
    }

    function videoHost(url) {
        try { return new URL(url).hostname.replace(/^www\./, ''); } catch (error) { return ''; }
    }

    function titleValues(item) {
        var values = [];
        var add = function (value) { if (typeof value === 'string' && value.trim() && values.indexOf(value.trim()) < 0) values.push(value.trim()); };
        ['title', 'name', 'russian', 'english', 'original_title', 'original_name', 'japanese', 'romaji', 'synonym'].forEach(function (key) { add(item && item[key]); });
        // YummyAnime keeps the most useful international aliases in
        // `other_titles` (for example, "Наруто" -> "NARUTO", "ナルト").
        // Include it together with the generic alias fields so both native
        // Lampa and YummyAnime searches can resolve the same title.
        ['aliases', 'alternative_titles', 'alternative_names', 'other_titles', 'titles', 'synonyms', 'names'].forEach(function (key) {
            var list = item && item[key];
            if (Array.isArray(list)) list.forEach(function (value) { add(typeof value === 'string' ? value : value && (value.title || value.name || value.value)); });
        });
        return values;
    }

    function normalizeMatchTitle(value) { return String(value || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/gi, ' ').trim(); }

    function standardSearchTitles(card) {
        var result = [], values = titleValues(card || {});
        if (card && Array.isArray(card.yani_titles)) values = values.concat(card.yani_titles);
        values.forEach(function (title) {
            if (result.indexOf(title) < 0) result.push(title);
            var withoutYear = String(title).replace(/\s*[\(\[]?\s*\d{4}\s*[\)\]]?\s*$/i, '').trim();
            if (withoutYear && result.indexOf(withoutYear) < 0) result.push(withoutYear);
        });
        return result;
    }

    function yummyTvDetailsUrl(animeId) {
        var id = Number(animeId);
        if (!isFinite(id) || id <= 0) return '';
        return 'yummytv://details/' + Math.floor(id);
    }

    function internalPlayerItem(item) {
        item = item || {};
        var url = normalizeVideoUrl(item.url);
        if (!url) return null;
        var result = {
            title: String(item.title || 'YummyAnime'),
            url: url,
            time: Math.max(0, Number(item.time || 0)),
            isonline: true
        };
        if (item.quality && typeof item.quality === 'object') result.quality = item.quality;
        if (item.headers && typeof item.headers === 'object') result.headers = item.headers;
        if (item.poster) result.poster = item.poster;
        return result;
    }

    function detailRouteId(activity) {
        activity = activity || {};
        var candidates = [activity, activity.card, activity.object, activity.data, activity.movie];
        var result = '';

        candidates.some(function (candidate) {
            if (!candidate || typeof candidate !== 'object') return false;
            var anime = candidate.anime && typeof candidate.anime === 'object' ? candidate.anime : {};
            var value = candidate.yani_id || candidate.anime_id || candidate.animeId ||
                anime.yani_id || anime.anime_id || anime.animeId;
            if (value === undefined || value === null || value === '' || value === 'undefined') return false;
            result = String(value);
            return true;
        });

        if (result) return result;

        var route = String(activity.url || activity.route || '');
        var match = route.match(/(?:^|\/)yani\/detail\/([^/?#]+)/i);
        if (match && match[1]) {
            try { result = decodeURIComponent(match[1]); } catch (error) { result = match[1]; }
        }

        if (!result && activity.component === 'yani_detail' && activity.id !== undefined && activity.id !== null && activity.id !== '' && activity.id !== 'undefined') {
            result = String(activity.id);
        }
        return result;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.UiUtils = window.LampaYaniUiUtils = {
        videoData: videoData,
        normalizeVideoUrl: normalizeVideoUrl,
        videoHost: videoHost,
        titleValues: titleValues,
        normalizeMatchTitle: normalizeMatchTitle,
        standardSearchTitles: standardSearchTitles,
        yummyTvDetailsUrl: yummyTvDetailsUrl,
        internalPlayerItem: internalPlayerItem,
        detailRouteId: detailRouteId
    };
}(window));

(function (window) {
    'use strict';

    var STORAGE_KEY = 'yani_lampac_url';
    var MAX_STEPS = 5;

    function normalizeBaseUrl(value) {
        value = String(value || '').trim().replace(/\/+$/, '');
        if (!value) return '';
        if (!/^https?:\/\//i.test(value)) return '';
        return value;
    }

    function baseUrl() {
        if (!window.Lampa || !Lampa.Storage || !Lampa.Storage.get) return '';
        return normalizeBaseUrl(Lampa.Storage.get(STORAGE_KEY, ''));
    }

    function setBaseUrl(value) {
        var normalized = normalizeBaseUrl(value);
        if (window.Lampa && Lampa.Storage && Lampa.Storage.set) Lampa.Storage.set(STORAGE_KEY, normalized);
        return normalized;
    }

    function absoluteUrl(base, value) {
        value = String(value || '').trim();
        if (!value) return '';
        if (/^https?:\/\//i.test(value)) return value;
        if (value.indexOf('//') === 0) return 'https:' + value;
        return base.replace(/\/$/, '') + '/' + value.replace(/^\//, '');
    }

    function responseText(value) {
        if (typeof value === 'string') return value;
        if (value === undefined || value === null) return '';
        try { return JSON.stringify(value); } catch (ignore) { return String(value); }
    }

    function requestText(url) {
        return new Promise(function (resolve, reject) {
            if (!window.Lampa || !Lampa.Reguest) return reject(new Error('Lampa native request is unavailable'));
            var network = new Lampa.Reguest();
            var timeout = Number((window.LampaYaniConfig && LampaYaniConfig.requestTimeout) || 15000);
            if (network.timeout) network.timeout(timeout);
            network.native(url, function (value) {
                resolve(responseText(value));
            }, function (error, exception) {
                var message = error && (error.responseText || error.message || error.status) || exception || 'Lampac request failed';
                reject(new Error(String(message)));
            }, false, {dataType: 'text', timeout: timeout});
        });
    }

    function decodeAttribute(value) {
        return String(value || '')
            .replace(/&quot;/gi, '"')
            .replace(/&#34;/g, '"')
            .replace(/&#39;|&apos;/gi, "'")
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/gi, '>')
            .replace(/&amp;/gi, '&');
    }

    function parseDataItems(markup, className) {
        var result = [];
        var tagPattern = /<[^>]+>/g;
        var tag;
        while ((tag = tagPattern.exec(String(markup || '')))) {
            var text = tag[0];
            var classMatch = text.match(/\bclass\s*=\s*(["'])(.*?)\1/i);
            if (!classMatch || classMatch[2].split(/\s+/).indexOf(className) < 0) continue;
            var jsonMatch = text.match(/\bdata-json\s*=\s*(["'])([\s\S]*?)\1/i);
            if (!jsonMatch) continue;
            try {
                var item = JSON.parse(decodeAttribute(jsonMatch[2]));
                var seasonMatch = text.match(/\bs\s*=\s*(["'])(.*?)\1/i);
                var episodeMatch = text.match(/\be\s*=\s*(["'])(.*?)\1/i);
                var tagNameMatch = text.match(/^<([a-z0-9]+)/i);
                if (tagNameMatch) {
                    var closing = '</' + tagNameMatch[1] + '>';
                    var closingAt = String(markup || '').toLowerCase().indexOf(closing.toLowerCase(), tagPattern.lastIndex);
                    if (closingAt >= 0) {
                        var inner = String(markup || '').slice(tagPattern.lastIndex, closingAt).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
                        if (inner && !item.text) item.text = decodeAttribute(inner);
                    }
                }
                if (seasonMatch) item.season = Number(seasonMatch[2]);
                if (episodeMatch) item.episode = Number(episodeMatch[2]);
                if (/\bactive\b/i.test(classMatch[2])) item.active = true;
                result.push(item);
            } catch (ignore) {}
        }
        return result;
    }

    function firstValue(values) {
        for (var i = 0; i < values.length; i++) {
            if (values[i] !== undefined && values[i] !== null && String(values[i]).trim()) return values[i];
        }
        return '';
    }

    function externalIds(card) {
        return card && (card.yani_remote_ids || card.external_ids || card.ids) || {};
    }

    function extractOrid(sourceUrl) {
        sourceUrl = String(sourceUrl || '');
        try {
            var parsed = new URL(sourceUrl);
            var value = firstValue([
                parsed.searchParams.get('orid'),
                parsed.searchParams.get('token_movie'),
                parsed.searchParams.get('token')
            ]);
            if (value && String(value).length >= 6) return String(value);
        } catch (ignore) {}
        var pathMatch = sourceUrl.match(/\/(?:embed|iframe|player)\/([a-z0-9_-]{6,})/i);
        return pathMatch ? pathMatch[1] : '';
    }

    function buildRootUrl(card, sourceUrl) {
        var base = baseUrl();
        if (!base) return '';
        card = card || {};
        var ids = externalIds(card);
        var params = new URLSearchParams();
        var orid = extractOrid(sourceUrl);
        var imdb = firstValue([ids.imdb_id, ids.imdb, card.imdb_id]);
        var kinopoisk = firstValue([ids.kinopoisk_id, ids.kp_id, ids.kp, card.kinopoisk_id]);
        var titles = window.LampaYaniUiUtils ? LampaYaniUiUtils.titleValues(card) : [card.title];
        var title = firstValue([card.title, card.name, titles[0]]);
        var originalTitle = firstValue([card.original_title, card.original_name, titles[1], title]);
        var year = String(firstValue([card.release_date, card.year, card.first_air_date]) || '').match(/\d{4}/);

        if (orid) params.set('orid', orid);
        if (imdb) params.set('imdb_id', imdb);
        if (kinopoisk) params.set('kinopoisk_id', kinopoisk);
        if (title) params.set('title', title);
        if (originalTitle) params.set('original_title', originalTitle);
        if (year) params.set('year', year[0]);
        params.set('serial', '1');
        params.set('original_language', 'ja');
        if (!orid && !imdb && !kinopoisk) params.set('similar', 'true');
        return base + '/lite/alloha?' + params.toString();
    }

    function cleanText(value) {
        return String(value || '').toLowerCase().replace(/[^a-zа-я0-9]+/gi, ' ').trim();
    }

    function chooseByTitle(items, card) {
        var wanted = (window.LampaYaniUiUtils ? LampaYaniUiUtils.titleValues(card || {}) : [card && card.title]).map(cleanText).filter(Boolean);
        var best = null;
        var bestScore = -1;
        items.forEach(function (item) {
            var candidate = cleanText(item.title || item.name || item.text);
            var score = wanted.indexOf(candidate) >= 0 ? 100 : wanted.some(function (title) {
                return title && candidate && (title.indexOf(candidate) >= 0 || candidate.indexOf(title) >= 0);
            }) ? 40 : 0;
            if (score > bestScore) { best = item; bestScore = score; }
        });
        return best || items[0];
    }

    function chooseSeason(items, selected) {
        var data = window.LampaYaniUiUtils ? LampaYaniUiUtils.videoData(selected || {}) : {};
        var season = Number(firstValue([selected && selected.season, data.season, 1]));
        return items.filter(function (item) { return Number(item.season || item.text || 0) === season; })[0] || items[0];
    }

    function chooseVoice(buttons, group) {
        var wanted = cleanText(group && group.title);
        return buttons.filter(function (item) {
            var title = cleanText(item.title || item.name || item.text);
            return wanted && title && (wanted.indexOf(title) >= 0 || title.indexOf(wanted) >= 0);
        })[0] || buttons.filter(function (item) { return item.active; })[0] || buttons[0];
    }

    function chooseEpisode(items, selected) {
        var number = Number(firstValue([selected && selected.number, selected && selected.episode, selected && selected.index]));
        return items.filter(function (item) { return Number(item.episode || item.e || 0) === number; })[0] || items[0];
    }

    function directResult(item, base) {
        item = item || {};
        var url = firstValue([item.stream, item.streamlink, item.file, item.url]);
        if (typeof url !== 'string') return null;
        url = url.split(' or ')[0].trim();
        url = absoluteUrl(base, url);
        if (!url || !/\.m3u8|\.mpd|\.mp4|\.webm/i.test(url)) return null;
        return {
            url: url,
            quality: typeof item.quality === 'string' ? item.quality : item.voice_name || '',
            qualities: item.qualitys || (typeof item.quality === 'object' ? item.quality : null),
            headers: item.headers || null,
            source: 'lampac-alloha'
        };
    }

    function parseJsonResult(text, base) {
        try {
            var payload = typeof text === 'string' ? JSON.parse(text) : text;
            return directResult(payload, base);
        } catch (ignore) {
            return null;
        }
    }

    function resolvePage(markup, card, selected, group, visited, depth) {
        var base = baseUrl();
        var jsonResult = parseJsonResult(markup, base);
        if (jsonResult) return Promise.resolve(jsonResult);
        if (depth >= MAX_STEPS) return Promise.reject(new Error('Lampac resolution limit reached'));

        var items = parseDataItems(markup, 'videos__item');
        var buttons = parseDataItems(markup, 'videos__button');
        if (!items.length) return Promise.reject(new Error('Lampac returned no playable items'));

        if (buttons.length) {
            var voice = chooseVoice(buttons, group);
            if (voice && voice.url && !voice.active) return follow(voice.url, card, selected, group, visited, depth);
        }

        var playable = items.filter(function (item) { return item.method === 'play' || item.method === 'call' || item.stream; });
        if (playable.length) {
            var episode = chooseEpisode(playable, selected);
            var direct = directResult(episode, base);
            if (direct) return Promise.resolve(direct);
            if (episode.url) return follow(episode.url, card, selected, group, visited, depth);
        }

        var links = items.filter(function (item) { return item.url; });
        if (links.length) {
            var target = links.some(function (item) { return item.similar; }) ? chooseByTitle(links, card) : chooseSeason(links, selected);
            if (target && target.url) return follow(target.url, card, selected, group, visited, depth);
        }
        return Promise.reject(new Error('Lampac did not expose a direct stream'));
    }

    function follow(url, card, selected, group, visited, depth) {
        var base = baseUrl();
        url = absoluteUrl(base, url);
        if (!url || visited[url]) return Promise.reject(new Error('Lampac returned a repeated URL'));
        visited[url] = true;
        return requestText(url).then(function (markup) {
            return resolvePage(markup, card, selected, group, visited, depth + 1);
        });
    }

    function resolveAlloha(card, selected, group, sourceUrl) {
        var root = buildRootUrl(card, sourceUrl);
        if (!root) return Promise.reject(new Error('Lampac server is not configured'));
        return follow(root, card, selected, group, {}, 0);
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.LampacResolver = window.LampaYaniLampacResolver = {
        baseUrl: baseUrl,
        setBaseUrl: setBaseUrl,
        enabled: function () { return Boolean(baseUrl()); },
        normalizeBaseUrl: normalizeBaseUrl,
        extractOrid: extractOrid,
        buildRootUrl: buildRootUrl,
        parseDataItems: parseDataItems,
        resolveAlloha: resolveAlloha
    };
}(window));

(function (global) {
    'use strict';
    var cache = {}, order = [], limit = 200;
    function remember(key, value) {
        if (Object.prototype.hasOwnProperty.call(cache, key)) order = order.filter(function (item) { return item !== key; });
        cache[key] = value; order.push(key);
        while (order.length > limit) delete cache[order.shift()];
    }
    function titles(item) {
        var values = [], add = function (value) {
            value = typeof value === 'string' ? value.trim() : '';
            if (value && values.indexOf(value) < 0) values.push(value);
        };
        ['title', 'name', 'russian', 'english', 'original_title', 'original_name', 'japanese', 'romaji', 'synonym'].forEach(function (key) { add(item && item[key]); });
        ['aliases', 'alternative_titles', 'alternative_names', 'titles', 'synonyms', 'names'].forEach(function (key) {
            var list = item && item[key];
            if (Array.isArray(list)) list.forEach(function (value) { add(typeof value === 'string' ? value : value && (value.title || value.name || value.value)); });
        });
        return values.slice(0, 5);
    }
    function find(card) {
        var key = String(card && (card.yani_id || card.title) || '').toLowerCase();
        if (!key) return Promise.resolve('');
        if (cache[key]) return Promise.resolve(cache[key]);
        if (cache[key] === null) return Promise.resolve('');
        var ids = card.yani_remote_ids || {}, urls = [];
        if (ids.mal || ids.myanimelist) urls.push({url: 'https://api.jikan.moe/v4/anime/' + encodeURIComponent(ids.mal || ids.myanimelist) + '/full'});
        if (ids.shikimori) urls.push({url: 'https://shikimori.one/api/animes/' + encodeURIComponent(ids.shikimori) + '.json'});
        titles(card).forEach(function (title) { urls.push({url: 'https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(title) + '&limit=1'}); urls.push({url: 'https://graphql.anilist.co', query: title}); });
        function load(index) {
            if (index >= urls.length) { remember(key, null); return Promise.resolve(''); }
            var source = urls[index], ani = source.url === 'https://graphql.anilist.co';
            var request = ani ? fetch(source.url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({query: 'query ($search: String) { Page(perPage: 1) { media(search: $search, type: ANIME) { coverImage { extraLarge large } } } }', variables: {search: source.query}})}) : fetch(source.url);
            return request.then(function (response) { if (!response.ok) throw new Error('poster source ' + response.status); return response.json(); }).then(function (payload) {
                var item = ani && payload && payload.data && payload.data.Page ? payload.data.Page.media && payload.data.Page.media[0] : payload && payload.data ? (Array.isArray(payload.data) ? payload.data[0] : payload.data) : payload;
                var images = item && item.images || {};
                var poster = ani ? item && item.coverImage && (item.coverImage.extraLarge || item.coverImage.large) : images.jpg && (images.jpg.large_image_url || images.jpg.image_url) || images.webp && (images.webp.large_image_url || images.webp.image_url) || item && (item.poster || item.image);
                if (!poster) throw new Error('alternative poster is empty'); remember(key, poster); return poster;
            }).catch(function () { return load(index + 1); });
        }
        return urls.length ? load(0) : (remember(key, null), Promise.resolve(''));
    }
    function attach(element, card) {
        var render = card && card.render ? $(card.render(true)) : $(element), image = render.find('img').first(), box = render.find('.card__img').first();
        var apply = function (poster) { if (!poster) return; if (image.length) image.attr('src', poster); if (box.length) box.css('background-image', 'url("' + poster.replace(/"/g, '%22') + '")'); };
        var alternative = function () { find(card).then(apply); };
        if (image.length) image.off('error.yaniPoster').on('error.yaniPoster', alternative);
        if (!card.poster) return alternative();
        var probe = new Image(); probe.onload = function () {}; probe.onerror = alternative; probe.src = card.poster;
    }
    function bind(image, card) { image.off('error.yaniPoster').on('error.yaniPoster', function () { find(card).then(function (poster) { if (poster) image.attr('src', poster); }); }); if (!card.poster && !card.img) find(card).then(function (poster) { if (poster) image.attr('src', poster); }); }
    global.LampaYani = global.LampaYani || {};
    global.LampaYani.Media = global.LampaYaniMedia = {findAlternativePoster: find, attachPosterFallback: attach, bindPosterFallback: bind};
}(window));

(function (window) {
    'use strict';

    function moveDown(scroll) {
        if (Navigator.canmove('down')) Navigator.move('down');
        else if (scroll && scroll.wheel) scroll.wheel(250);
    }

    function moveUp(scroll) {
        if (Navigator.canmove('up')) Navigator.move('up');
        else if (scroll && scroll.wheel) scroll.wheel(-250);
    }

    function bindFocus(element, scroll, state) {
        element.on('hover:focus', function (event) {
            // `target` can be an icon or a text node inside a selector.  Lampa
            // Scroll must receive the selector itself, otherwise the focus can
            // travel below the viewport without moving the visible area.
            var target = event.currentTarget || event.target;
            if (state) state.last = target;
            if (scroll) scroll.update($(target), true);
        });
        return element;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Navigation = window.LampaYaniNavigation = {moveDown: moveDown, moveUp: moveUp, bindFocus: bindFocus};
}(window));

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
        function episodeLabel(episodes, isAired) { var aired = Number(episodes.aired || 0), count = Number(episodes.count || 0); if (count === 1 && aired === 0) return t('release'); var number = isAired ? aired : aired + 1; return count > 1 ? t('episode') + ' ' + number + ' ' + t('of') + ' ' + count : t('episode') + ' ' + number; }
        function createItem(entry) {
            var item = entry.item, card = toCard(item), episodes = item.episodes || {}, releaseDate = entry.date || new Date();
            var row = $('<div class="yani-schedule__item selector"></div>'), poster = $('<img class="yani-schedule__poster" alt="">').attr('src', card.poster || '');
            LampaYaniMedia.bindPosterFallback(poster, card);
            var info = $('<div class="yani-schedule__info"></div>'), release = $('<div class="yani-schedule__release"></div>');
            info.append($('<div class="yani-schedule__title"></div>').text(card.title)); info.append($('<div class="yani-schedule__episode"></div>').text(episodeLabel(episodes, entry.aired)));
            release.append($('<div class="yani-schedule__time"></div>').text(timeLabel(releaseDate))); release.append($('<div class="yani-schedule__timezone"></div>').text(t('local_time')));
            row.append(poster, info, release);
            // A schedule item already has a YummyAnime id.  Opening its
            // native Lampa match first can show a transient "not found" page
            // before the inevitable YummyAnime fallback, so go straight to
            // the known detail card.
            var opened = false, open = function () { if (opened) return; opened = true; card.yani_schedule = episodeLabel(episodes, entry.aired) + ', ' + dateTimeLabel(releaseDate); deps.openYummyDetail(card, false); setTimeout(function () { opened = false; }, 500); };
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
            var releases = content.find('.yani-schedule__releases').empty(); if (!group.releases.length) releases.append($('<div class="yani-schedule__empty"></div>').text(t('no_releases'))); else group.releases.forEach(function (entry) { releases.append(createItem(entry)); });
            revealDayChip(chip);
            if (focus) last = chip[0];
        }
        function scheduleItems(items) {
            var normalized = [];
            (items || []).forEach(function (item) {
                var episodes = item && item.episodes || {};
                [
                    {value: episodes.prev_date, aired: true},
                    {value: episodes.next_date, aired: false}
                ].forEach(function (release) {
                    var releaseDate = timestampDate(release.value);
                    if (releaseDate) normalized.push({item: item, date: releaseDate, aired: release.aired});
                });
            });
            return normalized;
        }
        function render(items) {
            var today = startOfDay(new Date()), currentWeek = startOfWeek(today), rangeStart = new Date(currentWeek.getTime()), releasesByDay = {}, scheduled = scheduleItems(items);
            rangeStart.setDate(rangeStart.getDate() - 7);
            scheduled.forEach(function (entry) {
                var key = startOfDay(entry.date).getTime();
                if (!releasesByDay[key]) releasesByDay[key] = [];
                // Keep the release wrapper here, rather than only the anime.
                // The wrapper carries the concrete date and whether this is a
                // previous or upcoming episode; losing it made the following
                // sort call access `undefined.date` and aborted the page.
                releasesByDay[key].push(entry);
            });
            dayGroups = [];
            for (var offset = 0; offset < 28; offset++) {
                var day = new Date(rangeStart.getTime()); day.setDate(rangeStart.getDate() + offset);
                var releases = releasesByDay[day.getTime()] || [];
                releases.sort(function (a, b) {
                    var first = a && a.date instanceof Date ? a.date.getTime() : 0;
                    var second = b && b.date instanceof Date ? b.date.getTime() : 0;
                    return first - second;
                });
                dayGroups.push({day: day, relativeOffset: Math.round((day.getTime() - today.getTime()) / 86400000), releases: releases});
            }
            var days = $('<div class="yani-schedule__days"></div>'); dayGroups.forEach(function (group, index) { var chip = $('<div class="yani-schedule__day-chip selector"></div>'); chip.append($('<div class="yani-schedule__day-name"></div>').text(dayLabel(group.day, group.relativeOffset))); chip.append($('<div class="yani-schedule__day-count"></div>').text(group.releases.length)); chip.on('hover:focus', function (event) { content.find('.yani-schedule__day-chip.focus').removeClass('focus'); chip.addClass('focus'); last = event.currentTarget || chip[0]; revealDayChip(chip); }); chip.on('hover:blur', function () { chip.removeClass('focus'); }); chip.on('hover:enter click.yaniScheduleDay', function () { select(index, true); }); days.append(chip); });
            content.append(days).append($('<div class="yani-schedule__selected-title"></div>')).append($('<div class="yani-schedule__releases"></div>')); select(dayGroups.findIndex(function (group) { return group.relativeOffset === 0; }), true);
        }
        function focusFirstRelease() {
            var first = content.find('.yani-schedule__releases .yani-schedule__item.selector').first();
            if (!first.length) return false;
            last = first[0];
            Lampa.Controller.collectionFocus(last, scroll.render());
            scroll.update(first, true);
            return true;
        }
        var comp = {create: function () { var self = this; this.activity.loader(true); LampaYaniApi.schedule({}).then(function (payload) { render(LampaYaniApi.normalize(payload)); scroll.append(content); html.append(scroll.render(true)); self.activity.loader(false); self.activity.toggle(); }).catch(function (error) { console.error('[YummyAnime]', error); self.activity.loader(false); Lampa.Noty.show(t('schedule_load_error')); }); }, start: function () { Lampa.Controller.add('content', {toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); }, left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); }, right: function () { Navigator.move('right'); }, up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); }, down: function () { var current = $(last); if (current.hasClass('yani-schedule__day-chip') && focusFirstRelease()) return; if (Navigator.canmove('down')) Navigator.move('down'); else scroll.wheel(300); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { scroll.destroy(); html.remove(); } };
        return comp;
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Schedule = window.LampaYaniSchedule = {create: create};
}(window));

(function (window) {
    'use strict';
    function create(object, deps) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250}), html = $('<div class="yani-notifications"></div>'), content = $('<div class="yani-notifications__content"></div>'), last, offset = 0;
        scroll.minus();
        function render(items, append) {
            if (!append) content.empty();
            var title = $('<div class="yani-notifications__title"></div>').text(deps.t('notifications_title'));
            var mark = $('<div class="yani-detail__button selector"></div>').text(deps.t('mark_all_read')).on('hover:enter click', function () { LampaYaniApi.markAllNotificationsRead().then(function () { content.find('.yani-notification').removeClass('unread'); Lampa.Noty.show(deps.t('saved')); }); });
            var remove = $('<div class="yani-detail__button selector"></div>').text(deps.t('delete_all_notifications')).on('hover:enter click', function () { LampaYaniApi.deleteAllNotifications().then(function () { content.empty().append(title).append($('<div class="yani-account__notice"></div>').text(deps.t('notifications_empty'))); }); });
            if (!append) content.append(title, mark, remove);
            if (!items.length) { if (!append) content.append($('<div class="yani-account__notice selector"></div>').text(deps.t('notifications_empty'))); return; }
            items.forEach(function (notification) {
                var item = $('<div class="yani-notification selector"></div>'); if (!notification.viewed && !notification.read) item.addClass('unread');
                item.append($('<div class="yani-notification__title"></div>').text(notification.title || notification.type || deps.t('notification')));
                if (notification.text || notification.message) item.append($('<div class="yani-notification__text"></div>').text(notification.text || notification.message));
                var date = notification.date || notification.date_seconds || notification.dateSeconds; if (date) item.append($('<div class="yani-notification__date"></div>').text(deps.formatDate(date)));
                item.on('hover:focus', function (event) { var target = event.currentTarget || event.target; last = target; scroll.update($(target), true); });
                item.on('hover:enter click', function () { if (notification.id && !notification.viewed) LampaYaniApi.markNotificationRead(notification.id).catch(function () {}); var animeId = notification.anime_id || notification.object_id || notification.objectId; if (animeId) deps.openDetail(deps.toCard({anime_id: animeId, title: notification.title || deps.t('anime')}), false); });
                content.append(item);
            });
            var more = $('<div class="yani-detail__button selector"></div>').text(deps.t('notifications_more')).on('hover:enter click', function () { more.remove(); offset += items.length; LampaYaniApi.notifications(30, offset).then(function (payload) { render(deps.normalize(payload), true); }); });
            content.append(more);
        }
        return {create: function () { var self = this; this.activity.loader(true); LampaYaniApi.notifications(30, offset).then(function (payload) { render(deps.normalize(payload), false); scroll.append(content); html.append(scroll.render(true)); self.activity.loader(false); self.activity.toggle(); }).catch(function (error) { console.error('[YummyAnime Notifications]', error); content.append($('<div class="yani-account__notice selector"></div>').text(deps.t('notifications_error'))); scroll.append(content); html.append(scroll.render(true)); self.activity.loader(false); self.activity.toggle(); }); }, start: function () { Lampa.Controller.add('content', {toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); }, left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); }, right: function () { Navigator.move('right'); }, up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); }, down: function () { LampaYaniNavigation.moveDown(scroll); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { scroll.destroy(); html.remove(); }};
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Notifications = window.LampaYaniNotifications = {create: create};
}(window));

(function (window) {
    'use strict';
    function create(object, deps) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250}), html = $('<div class="yani-auth"></div>'), content = $('<div class="yani-auth__content"></div>'), login = (LampaYaniAuth.get().login || '').trim(), password = '', last;
        scroll.minus();
        function focus(element) { element.on('hover:focus', function (event) { var target = event.currentTarget || event.target; last = target; scroll.update($(target), true); }); return element; }
        function render() {
            content.empty(); var account = LampaYaniAuth.get(), authorized = Boolean(LampaYaniAuth.token());
            content.append($('<div class="yani-auth__title"></div>').text(deps.t('auth_title'))).append($('<div class="yani-auth__status ' + (authorized ? 'is-authorized' : '') + '"></div>').text(authorized ? deps.t('auth_authorized') : deps.t('auth_not_authorized')));
            var form = $('<div class="yani-auth__form"></div>');
            field(form, deps.t('auth_login'), login || deps.t('auth_login_empty'), function () { deps.input({title: deps.t('email_prompt'), value: login, nosave: true, align: 'center'}, function (value) { login = String(value || '').trim(); render(); }); });
            field(form, deps.t('auth_password'), password ? '••••••••' : deps.t('auth_password_empty'), function () { deps.input({title: deps.t('password_prompt'), value: '', password: true, nosave: true, align: 'center'}, function (value) { password = String(value || ''); render(); }); });
            content.append(form); var actions = $('<div class="yani-auth__actions"></div>');
            if (!authorized) action(actions, deps.t('auth_submit'), 'primary', submit); else { action(actions, deps.t('refresh_name'), '', refresh); action(actions, deps.t('logout_name'), '', logout); }
            content.append(actions); if (authorized && account.login) content.append($('<div class="yani-auth__account"></div>').text(deps.t('auth_account') + ': ' + account.login)); content.append($('<div class="yani-auth__hint"></div>').text(deps.t('auth_hint')));
        }
        function field(parent, title, value, handler) { var item = focus($('<div class="yani-auth__field selector"></div>')); item.append($('<div class="yani-auth__field-title"></div>').text(title), $('<div class="yani-auth__field-value"></div>').text(value)); item.on('hover:enter', handler); parent.append(item); }
        function action(parent, title, kind, handler) { var item = focus($('<div class="yani-auth__button selector ' + (kind ? 'yani-auth__button--' + kind : '') + '"></div>').text(title)); item.on('hover:enter', handler); parent.append(item); }
        function submit() {
            if (!login) return Lampa.Noty.show(deps.t('email_required')); if (!password) return Lampa.Noty.show(deps.t('password_required'));
            Lampa.Loading && Lampa.Loading.start && Lampa.Loading.start();
            LampaYaniAuth.login(login, password).then(function () { return LampaYaniApi.profile().then(function (payload) { var profile = payload && payload.response ? payload.response : payload, current = LampaYaniAuth.get(); LampaYaniAuth.save({token: current.token, login: current.login, display_name: profile && (profile.nickname || profile.name) || current.login}); }).catch(function () {}); }).then(function () { password = ''; Lampa.Noty.show(deps.t('login_ok')); deps.goBack(); }).catch(function (error) { console.error('[YummyAnime Auth]', error); Lampa.Noty.show(deps.t('login_error')); }).then(function () { Lampa.Loading && Lampa.Loading.stop && Lampa.Loading.stop(); });
        }
        function refresh() { LampaYaniAuth.refresh().then(function () { Lampa.Noty.show(deps.t('token_refreshed')); render(); }).catch(function () { Lampa.Noty.show(deps.t('token_refresh_error')); }); }
        function logout() { LampaYaniAuth.logout().then(function () { Lampa.Noty.show(deps.t('logged_out')); render(); }).catch(function () { Lampa.Noty.show(deps.t('token_removed')); render(); }); }
        return {create: function () { render(); scroll.append(content); html.append(scroll.render(true)); this.activity.loader(false); this.activity.toggle(); }, start: function () { Lampa.Controller.add('content', {toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); }, left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); }, right: function () { Navigator.move('right'); }, up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); }, down: function () { LampaYaniNavigation.moveDown(scroll); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { scroll.destroy(); html.remove(); }};
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.AuthPage = window.LampaYaniAuthPage = {create: create};
}(window));

(function (window) {
    'use strict';
    function create(object, deps) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250}), html = $('<div class="yani-status"></div>'), content = $('<div class="yani-status__content"></div>'), last, ready = false, period = '3hour', component;
        scroll.minus();
        function date(value) { if (!value) return '—'; try { return new Date(value).toLocaleString(deps.locale(), {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'}); } catch (error) { return new Date(value).toLocaleString(); } }
        function focus(element) { element.on('hover:focus', function (event) { var target = event.currentTarget || event.target; last = target; scroll.update($(target), true); }); return element; }
        function metric(title, value) { return $('<div class="yani-status__metric"></div>').append($('<span></span>').text(title), $('<strong></strong>').text(value)); }
        function domainName(domain) { var names = {'old.yummyani.me': 'domain_old', 'old.yummy-ani.me': 'domain_old_mirror', 'ru.yummyani.me': 'domain_new', 'ru.yummy-ani.me': 'domain_new_mirror', 'api.yani.tv': 'domain_api', 'waf.valtrix.org': 'domain_waf'}; return names[domain.domain] ? deps.t(names[domain.domain]) : (domain.label || domain.domain); }
        function renderError() { content.empty(); var error = focus($('<div class="yani-status__error selector"></div>')); error.append($('<strong></strong>').text(deps.t('status_load_error')), $('<span></span>').text(deps.t('status_error_hint'))); content.append(error); refreshFocus(); }
        function render(data) {
            content.empty(); var periods = data.periods || null, selected = periods ? (periods[period] || periods[data.default_period] || periods['3hour']) : data; if (!selected) return renderError();
            var labels = {'3hour': deps.t('period_3hour'), day: deps.t('period_day'), week: deps.t('period_week'), month: deps.t('period_month')}, switches = $('<div class="yani-status__periods"></div>');
            Object.keys(labels).forEach(function (key) { var button = focus($('<div class="yani-status__period selector"></div>').text(labels[key])); if (key === period) button.addClass('active'); button.on('hover:enter', function () { period = key; render(data); }); switches.append(button); }); content.append(switches);
            var summary = selected.summary || {}, state = summary.status || 'unknown', title = state === 'up' ? deps.t('all_up') : state === 'down' ? deps.t('all_down') : state === 'unknown' ? deps.t('no_monitoring') : deps.t('degraded'), color = state === 'up' ? '#4caf50' : state === 'down' ? '#db4455' : state === 'unknown' ? '#888' : '#f0a33b';
            var block = focus($('<div class="yani-status__summary selector yani-status--' + state + '"></div>')), ring = $('<div class="yani-status__ring"><div class="yani-status__ring-center"></div></div>'); ring.css('background', 'conic-gradient(#4caf50 0 ' + Number(summary.uptime_percent || 0) + '%, #db4455 ' + Number(summary.uptime_percent || 0) + '% 100%)'); ring.find('.yani-status__ring-center').append($('<strong></strong>').text(summary.checks || 0), $('<span></span>').text(deps.t('checks')));
            var info = $('<div class="yani-status__summary-info"></div>').append($('<div class="yani-status__headline"></div>').css('color', color).text(title)); var metrics = $('<div class="yani-status__metrics"></div>').append(metric(deps.t('availability'), Number(summary.uptime_percent || 0).toFixed(1) + '%'), metric(deps.t('average_load'), String(summary.average_ms || 0) + ' ' + deps.t('milliseconds')), metric(deps.t('errors'), String(summary.failed || 0)), metric(deps.t('updated'), date(selected.generated_at))); info.append(metrics); block.append(ring, info); content.append(block);
            var legend = focus($('<div class="yani-status__legend selector"></div>')).html('<span class="yani-status__dot yani-status__dot--up"></span>' + deps.t('up') + ' <span class="yani-status__dot yani-status__dot--degraded"></span>' + deps.t('unstable') + ' <span class="yani-status__dot yani-status__dot--down"></span>' + deps.t('down')); content.append(legend);
            (selected.domains || []).forEach(function (domain) { var row = focus($('<div class="yani-status__domain selector yani-status--' + domain.status + '"></div>')), head = $('<div class="yani-status__domain-head"></div>'), name = $('<div class="yani-status__domain-name"></div>').append('<span class="yani-status__state"></span>', $('<strong></strong>').text(domainName(domain)), $('<small></small>').text(domain.domain)), values = $('<div class="yani-status__domain-values"></div>').append($('<span></span>').text('HTTP ' + (domain.average_ms || 0) + ' ' + deps.t('milliseconds')), $('<span></span>').text('Ping ' + (domain.ping_ms || 0) + ' ' + deps.t('milliseconds'))), history = $('<div class="yani-status__history"></div>'); (domain.history || []).forEach(function (point) { history.append($('<i class="yani-status__bar yani-status__bar--' + point.status + '"></i>').attr('title', date(point.time))); }); head.append(name, values); row.append(head, history); content.append(row); });
            content.append(focus($('<div class="yani-status__source selector"></div>').text(deps.t('source') + ': YummyStatus · ' + deps.t('period') + ': ' + labels[period] + ' · ' + deps.t('snapshot_notice'))));
            content.append(focus($('<div class="yani-status__refresh selector"></div>').text(deps.t('refresh_status')).on('hover:enter', function () { Lampa.Noty.show(deps.t('refreshing_status')); load(false); }))); refreshFocus();
        }
        function refreshFocus() { if (ready) { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); } }
        function load(first) { if (first) component.activity.loader(true); LampaYaniApi.status().then(function (data) { render(data); if (first) { component.activity.loader(false); component.activity.toggle(); ready = true; } }).catch(function (error) { console.error('[YummyAnime Status]', error); renderError(); if (first) { component.activity.loader(false); component.activity.toggle(); ready = true; } }); }
        component = {create: function () { scroll.append(content); html.append(scroll.render(true)); load(true); }, start: function () { Lampa.Controller.add('content', {toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); }, left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); }, right: function () { Navigator.move('right'); }, up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); }, down: function () { LampaYaniNavigation.moveDown(scroll); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { scroll.destroy(); html.remove(); }};
        return component;
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Status = window.LampaYaniStatus = {create: create};
}(window));

(function (window) {
    'use strict';
    function create(object, deps) {
        var html = $('<div class="yani-player"></div>'), iframe = $('<iframe class="yani-player__iframe" frameborder="0" allowfullscreen></iframe>');
        return {create: function () { iframe.attr('src', deps.sourceUrl(object)).attr('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; payment').on('load', function () { if (iframe[0] && iframe[0].focus) iframe[0].focus(); }); html.append(iframe); this.activity.loader(false); this.activity.toggle(); }, start: function () { Lampa.Controller.add('content', {toggle: function () { iframe.attr('tabindex', '0'); if (iframe[0] && iframe[0].focus) iframe[0].focus(); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { iframe.attr('src', 'about:blank'); iframe.remove(); html.remove(); }};
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Player = window.LampaYaniPlayer = {create: create};
}(window));

(function (window) {
    'use strict';
    function create(deps) {
        function order(data) { var section = $('<div class="yani-detail__order"></div>').append($('<div class="yani-detail__order-title"></div>').text(deps.t('viewing_order'))), list = $('<div class="yani-detail__order-list"></div>'); (data.yani_viewing_order || []).forEach(function (entry, index) { var card = deps.toCard(entry), relation = entry.data && (entry.data.text || entry.data.title) || '', row = $('<div class="yani-detail__order-item selector"></div>').append($('<span class="yani-detail__order-index"></span>').text((index + 1) + '.')).append($('<span class="yani-detail__order-name"></span>').text(card.title)); if (card.release_date) row.append($('<span class="yani-detail__order-year"></span>').text(card.release_date)); if (relation) row.append($('<span class="yani-detail__order-relation"></span>').text('· ' + relation)); row.on('hover:focus', function () { row.addClass('focus'); }).on('hover:blur', function () { row.removeClass('focus'); }).on('hover:enter click.yaniOrder', function () { deps.openDetail(card, true); }); list.append(row); }); return section.append(list); }
        function recommendations(data, container) { var section = $('<div class="yani-detail__extra yani-detail__recommendations"><div class="yani-detail__extra-title"></div></div>'), list = $('<div class="yani-detail__recommendations-list"></div>'); section.find('.yani-detail__extra-title').text(deps.t('recommendations')); container.append(section.append(list)); LampaYaniApi.recommendations(data.yani_id).then(function (payload) { var items = LampaYaniApi.normalize(payload).slice(0, 12); if (!items.length) return section.remove(); items.forEach(function (item) { var card = deps.toCard(item), row = $('<div class="yani-detail__recommendation selector"></div>'), poster = $('<img class="yani-detail__recommendation-poster" alt="">').attr('src', card.poster || ''); LampaYaniMedia.bindPosterFallback(poster, card); row.append(poster, $('<div class="yani-detail__recommendation-title"></div>').text(card.title)); if (card.release_date) row.append($('<div class="yani-detail__recommendation-year"></div>').text(card.release_date)); row.on('hover:focus', function () { row.addClass('focus'); }).on('hover:blur', function () { row.removeClass('focus'); }).on('hover:enter click.yaniRecommendation', function () { deps.openDetail(card, true); }); list.append(row); }); }).catch(function () { section.remove(); }); }
        function collections(data, container) { var section = $('<div class="yani-detail__extra yani-detail__collections"><div class="yani-detail__extra-title"></div></div>'), list = $('<div class="yani-detail__collections-list"></div>'); section.find('.yani-detail__extra-title').text(deps.t('collections')); container.append(section.append(list)); LampaYaniApi.collections(data.yani_id, 10, 0).then(function (payload) { var response = payload && payload.response ? payload.response : payload, items = Array.isArray(response) ? response : response && (response.items || response.data || response.collections) || []; if (!items.length) return section.remove(); items.forEach(function (collection) { var animes = Array.isArray(collection.animes) ? collection.animes : [], row = $('<div class="yani-detail__collection selector"></div>').append($('<div class="yani-detail__collection-title"></div>').text(collection.title || collection.name || deps.t('collection'))); if (collection.description) row.append($('<div class="yani-detail__collection-description"></div>').text(deps.clean(collection.description))); if (animes.length) row.append($('<div class="yani-detail__collection-count"></div>').text(animes.length + ' ' + deps.t('anime_count'))); row.on('hover:focus', function () { row.addClass('focus'); }).on('hover:blur', function () { row.removeClass('focus'); }).on('hover:enter click.yaniCollection', function () { if (animes.length) Lampa.Select.show({title: collection.title || deps.t('collection'), items: animes.map(function (item) { var card = deps.toCard(item); return {title: card.title, card: card}; }), onSelect: function (item) { deps.openDetail(item.card, true); }}); }); list.append(row); }); }).catch(function () { section.remove(); }); }
        function trailers(data, container) { var section = $('<div class="yani-detail__extra yani-detail__trailers"><div class="yani-detail__extra-title"></div></div>'), list = $('<div class="yani-detail__trailers-list"></div>'); section.find('.yani-detail__extra-title').text(deps.t('trailers')); container.append(section.append(list)); LampaYaniApi.trailers(data.yani_id).then(function (payload) { var items = payload && payload.response ? payload.response : payload; if (!Array.isArray(items) || !items.length) return section.remove(); items.forEach(function (trailer, index) { var title = trailer.title || trailer.name || ('Trailer ' + (index + 1)), url = trailer.iframe_url || trailer.url || trailer.video_url || trailer.link, row = $('<div class="yani-detail__trailer selector"></div>').text('▶ ' + title); row.on('hover:focus', function () { row.addClass('focus'); }).on('hover:blur', function () { row.removeClass('focus'); }); if (url) row.on('hover:enter click.yaniTrailer', function () { url = LampaYaniUiUtils.normalizeVideoUrl(url); if (!deps.showIframe(url)) Lampa.Activity.push({url: 'yani/trailer/' + encodeURIComponent(title), title: title, component: 'yani_player', iframe_url: url}); }); list.append(row); }); }).catch(function () { section.remove(); }); }
        return {order: order, recommendations: recommendations, collections: collections, trailers: trailers};
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.DetailSections = window.LampaYaniDetailSections = {create: create};
}(window));

(function (window) {
    'use strict';
    function accountList(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () { this.build({results: (object.items || []).map(deps.toCard), total_pages: 1, title: object.title}); };
        comp.cardRender = deps.cardRender;
        return comp;
    }
    function subscriptions(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this; this.activity.loader(true);
            LampaYaniApi.subscriptions(object.userId).then(function (payload) {
                var response = payload && payload.response ? payload.response : payload, values = Array.isArray(response) ? response : response && (response.anime || response.items || response.data || response.subscriptions) || [];
                var cards = values.map(function (item) { var source = item && (item.anime || item.title_data || item.object) || item; return source && (source.anime_id || source.id || source.title) ? deps.toCard(source) : null; }).filter(Boolean);
                if (!cards.length) Lampa.Noty.show(deps.t('subscriptions_empty'));
                self.build({results: cards, total_pages: 1, title: deps.t('subscriptions')});
            }).catch(function (error) { console.error('[YummyAnime Subscriptions]', error); self.activity.loader(false); Lampa.Noty.show(deps.t('subscriptions_error')); });
        };
        comp.cardRender = deps.cardRender;
        return comp;
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.AccountLists = window.LampaYaniAccountLists = {accountList: accountList, subscriptions: subscriptions};
}(window));

(function (window) {
    'use strict';
    function recommended(object, deps) { var comp = new Lampa.InteractionCategory(object); comp.create = function () { var self = this, history = deps.history(), ids = Object.keys(history).sort(function (a, b) { return Number(history[b].updated_at || 0) - Number(history[a].updated_at || 0); }).slice(0, 3); this.activity.loader(true); if (!ids.length) return LampaYaniApi.catalog({limit: 30, sort: 'top', sort_forward: false}).then(function (payload) { self.build({results: LampaYaniApi.normalize(payload).map(deps.toCard), total_pages: 1, title: deps.t('for_you')}); }).catch(function () { self.build({results: [], total_pages: 1, title: deps.t('for_you')}); }); Promise.all(ids.map(function (id) { return LampaYaniApi.recommendations(id).then(LampaYaniApi.normalize).catch(function () { return []; }); })).then(function (rows) { var seen = {}, cards = []; rows.forEach(function (items) { items.forEach(function (item) { var card = deps.toCard(item), key = String(card.yani_id || card.title); if (!seen[key]) { seen[key] = true; cards.push(card); } }); }); self.build({results: cards.slice(0, 40), total_pages: 1, title: deps.t('for_you')}); }).catch(function () { self.build({results: [], total_pages: 1, title: deps.t('for_you')}); }); }; comp.cardRender = deps.cardRender; return comp; }
    function updates(object, deps) { var comp = new Lampa.InteractionCategory(object); comp.create = function () { var self = this; this.activity.loader(true); if (!LampaYaniAuth.token()) return self.build({results: [], total_pages: 1, title: deps.t('updates')}); LampaYaniApi.profile().then(function (payload) { var profile = payload && payload.response ? payload.response : payload; return Promise.all([LampaYaniApi.userLists(profile.id).then(deps.normalizeList).catch(function () { return []; }), LampaYaniApi.subscriptions(profile.id).then(function (response) { var value = response && response.response ? response.response : response, items = Array.isArray(value) ? value : value && (value.items || value.data || value.subscriptions || value.anime) || []; return items.map(function (item) { var source = item && (item.anime || item.title_data || item.object) || item; return source && (source.anime_id || source.id || source.title) ? deps.toCard(source) : null; }).filter(Boolean); }).catch(function () { return []; }), LampaYaniApi.schedule().then(LampaYaniApi.normalize).catch(function () { return []; })]); }).then(function (result) { var cards = result[0].filter(function (item) { var list = item.user && item.user.list && item.user.list.list; return list && [0, 1, 5].indexOf(Number(list.id)) >= 0; }).map(deps.toCard).concat(result[1]), schedule = {}; result[2].forEach(function (item) { schedule[String(item.anime_id || item.id)] = item.episodes || {}; }); var seen = {}; cards = cards.filter(function (card) { var key = String(card.yani_id || card.title); if (seen[key]) return false; seen[key] = true; var episode = schedule[key] || {}; card.yani_update_date = Number(episode.prev_date || episode.next_date || 0); card.yani_update_episode = Number(episode.aired || 0) || null; return true; }).sort(function (a, b) { return Number(b.yani_update_date || 0) - Number(a.yani_update_date || 0); }); self.build({results: cards.slice(0, 20), total_pages: 1, title: deps.t('updates')}); }).catch(function (error) { console.error('[YummyAnime Updates]', error); self.activity.loader(false); Lampa.Noty.show(deps.t('updates_error')); }); }; comp.cardRender = deps.cardRender; return comp; }
    function history(object, deps) { var comp = new Lampa.InteractionCategory(object); comp.create = function () { var self = this, saved = deps.history(), ids = Object.keys(saved).sort(function (a, b) { return Number(saved[b].updated_at || 0) - Number(saved[a].updated_at || 0); }).slice(0, 20); this.activity.loader(true); if (!ids.length) return self.build({results: [], total_pages: 1, title: deps.t('history_empty')}); Promise.all(ids.map(function (id) { var item = saved[id] || {}, fallback = deps.toCard(item.card || {anime_id: id, title: item.title || deps.t('untitled'), poster: item.poster || ''}); return LampaYaniApi.detail(id).then(function (payload) { var value = payload && payload.response ? payload.response : payload, card = value ? deps.toCard(value) : fallback; card.yani_id = card.yani_id || Number(id) || id; return card; }).catch(function () { return fallback; }); })).then(function (cards) { self.build({results: cards.filter(Boolean), total_pages: 1, title: deps.t('continue_watching')}); }).catch(function (error) { console.error('[YummyAnime History]', error); self.activity.loader(false); Lampa.Noty.show(deps.t('history_load_error')); }); }; comp.cardRender = deps.historyCardRender; return comp; }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.HomeSections = window.LampaYaniHomeSections = {recommended: recommended, updates: updates, history: history};
}(window));

(function (window) {
    'use strict';

    function t(name) {
        return window.LampaYaniI18n ? LampaYaniI18n.t(name) : name;
    }

    function locale() {
        return window.LampaYaniI18n ? LampaYaniI18n.locale() : 'ru-RU';
    }

    var externalRestoreState = {
        pending: false,
        installed: false,
        openedAt: 0,
        controller: 'content',
        element: null
    };
    var usagePolicyVisible = false;

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
                registerSearchSource();
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
                // Lampa builds use both spellings across releases.
                comp.nextPageRequest = comp.nextPageReuest;
                comp.cardRender = bindYummyCardRender;
                return comp;
            });

            Lampa.Component.add('yani_recommended', Recommended);
            Lampa.Component.add('yani_updates', Updates);
            Lampa.Component.add('yani_schedule', Schedule);
            Lampa.Component.add('yani_history', History);

            Lampa.Component.add('yani_detail', Detail);
            Lampa.Component.add('yani_policy', UsagePolicy);
            Lampa.Component.add('yani_trailers', TrailerList);
            Lampa.Component.add('yani_account', Account);
            Lampa.Component.add('yani_account_list', AccountList);
            Lampa.Component.add('yani_notifications', Notifications);
            Lampa.Component.add('yani_subscriptions', Subscriptions);
            Lampa.Component.add('yani_auth', AuthPage);

            Lampa.Component.add('yani_status', StatusDashboard);
            Lampa.Component.add('yani_player', IframePlayer);

            installUndefinedTmdbGuard();
            installFullRating();

            console.log('[YummyAnime] Extension registered');
        }
    };

    function Home(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-home"></div>');
        var grid = $('<div class="yani-home__grid"></div>');
        var last;

        var items = [
            {key: 'catalog', title: t('catalog'), action: function () {
                Lampa.Activity.push({url: 'yani/catalog', title: 'YummyAnime ' + t('catalog'), component: 'yani_catalog', params: {limit: 30, sort: 'top', sort_forward: false}});
            }},
            {key: 'genres', title: t('genres'), action: openGenres},
            {key: 'search', title: t('search'), action: openSearch},
            {key: 'schedule', title: t('schedule'), action: function () {
                Lampa.Activity.push({url: 'yani/schedule', title: 'YummyAnime ' + t('schedule'), component: 'yani_schedule'});
            }},
            {key: 'continue_watching', title: t('continue_watching'), action: function () {
                Lampa.Activity.push({url: 'yani/history', title: 'YummyAnime ' + t('continue_watching'), component: 'yani_history'});
            }},
            {key: 'status', title: t('status'), action: function () {
                Lampa.Activity.push({url: 'yani/status', title: 'YummyAnime ' + t('status'), component: 'yani_status'});
            }},
            {key: 'top_rated', title: t('top_rated'), action: function () {
                Lampa.Activity.push({url: 'yani/top-rated', title: 'YummyAnime ' + t('top_rated'), component: 'yani_catalog', params: {limit: 30, sort: 'rating', sort_forward: false}});
            }},
            {key: 'for_you', title: t('for_you'), action: function () {
                Lampa.Activity.push({url: 'yani/for-you', title: 'YummyAnime ' + t('for_you'), component: 'yani_recommended'});
            }},
            {key: 'updates', title: t('updates'), action: function () {
                Lampa.Activity.push({url: 'yani/updates', title: 'YummyAnime ' + t('updates'), component: 'yani_updates'});
            }},
            {key: 'account', title: t('account'), action: openAccount}
        ].filter(function (item) { return homeSectionEnabled(item.key); });

        this.create = function () {
            items.forEach(function (item) {
                var button = $('<div class="yani-home__item yani-home__item--' + item.key + ' selector"><div class="yani-home__icon">' + homeIcon(item.key) + '</div><div class="yani-home__title">' + item.title + '</div><div class="yani-home__arrow">›</div></div>');
                button.on('hover:focus', function (event) {
                    var target = event.currentTarget || event.target;
                    last = target;
                    scroll.update($(target), true);
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
                down: function () { movePageDown(scroll); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function UsagePolicy(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-policy"></div>');
        var title;
        var accept;

        this.create = function () {
            var self = this;
            var mark = $('<div class="yani-policy__mark" aria-hidden="true"></div>').html(yummyAnimeIcon());
            title = $('<div class="yani-policy__title selector"></div>').text(t('usage_policy_title'));
            var content = $('<div class="yani-policy__content"></div>');
            [
                t('usage_policy_as_is'),
                t('usage_policy_information'),
                t('usage_policy_legal'),
                t('usage_policy_responsibility')
            ].forEach(function (paragraph) {
                content.append($('<div class="yani-policy__paragraph"></div>').text(paragraph));
            });
            accept = $('<div class="yani-policy__accept selector"></div>').text(t('usage_policy_accept'));
            accept.on('hover:enter click.yaniPolicyAccept', function () {
                usagePolicyVisible = false;
                goBack();
            });
            html.append(mark, title, content, accept);
            html.on('hover:focus', function (event) {
                var target = $(event.target).closest('.selector');
                html.find('.focus').removeClass('focus');
                target.addClass('focus');
                scroll.update(target, true);
            });
            scroll.append(html);
            self.activity.loader(false);
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(title, scroll.render()); },
                left: function () { Lampa.Controller.toggle('menu'); },
                right: function () {},
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { movePageDown(scroll); },
                back: function () { usagePolicyVisible = false; goBack(); }
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? scroll.render(true) : scroll.render(); };
        this.destroy = function () { usagePolicyVisible = false; scroll.destroy(); html.remove(); };
    }

    function showUsagePolicy() {
        if (!Lampa.Activity || !Lampa.Activity.push || usagePolicyVisible) return;
        usagePolicyVisible = true;
        Lampa.Activity.push({
            url: 'yani/policy',
            title: t('usage_policy_title'),
            component: 'yani_policy'
        });
    }

    function homeIcon(key) {
        var icons = {
            catalog: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
            genres: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="18" r="2"/></svg>',
            search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>',
            schedule: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h3M14 14h3M7 18h3"/></svg>',
            continue_watching: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/></svg>',
            status: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h4l2-6 4 12 2-6h6"/></svg>',
            top_rated: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/></svg>',
            for_you: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5S4 15.7 4 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.2-8 11-8 11Z"/><path d="M12 11v5M9.5 13.5h5"/></svg>',
            updates: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h7"/><circle cx="18" cy="16" r="3"/><path d="M18 14v2l1.3 1"/></svg>',
            account: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4 3.3-6 8-6s7.3 2 8 6"/></svg>'
        };
        return icons[key] || icons.catalog;
    }

    function lampaIcon() {
        return '<svg viewBox="0 0 110 104" aria-hidden="true"><path d="M81.674 103.11C98.568 93.723 110 75.697 110 55 110 24.624 85.376 0 55 0S0 24.624 0 55c0 20.697 11.432 38.723 28.326 48.11C14.887 94.372 6 79.224 6 62 6 34.938 27.938 13 55 13s49 21.938 49 49c0 17.224-8.887 32.373-22.326 41.11Z"/><path d="M92.955 80.008C95.549 74.55 97 68.445 97 62 97 38.804 78.196 20 55 20S13 38.804 13 62c0 6.445 1.452 12.55 4.045 18.008C16.362 77.116 16 74.1 16 71c0-21.539 17.461-39 39-39s39 17.461 39 39c0 3.1-.362 6.116-1.045 9.008Z"/><path d="M55 89c14.359 0 26-11.641 26-26 0-5.071-1.451-9.802-3.961-13.801C82.579 54.799 86 62.5 86 71c0 17.121-13.879 31-31 31S24 88.121 24 71c0-8.5 3.421-16.201 8.961-21.801C30.451 53.198 29 57.929 29 63c0 14.359 11.641 26 26 26Z"/><circle cx="55" cy="63" r="18"/></svg>';
    }

    function yummyAnimeIcon() {
        return '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M18.45 0H1.55A1.55 1.55 0 0 0 0 1.55v16.9A1.54 1.54 0 0 0 1.55 20h16.9A1.55 1.55 0 0 0 20 18.45V1.55A1.54 1.54 0 0 0 18.45 0Zm-2.83 5.93-2.1 2.66-2.3-5.43a6.95 6.95 0 0 1 4.4 2.77Zm-2.9 6.57h-4l2.03-4.8 1.98 4.8Zm-2.37-9.34L7.8 9.06 4.87 5.33c.64-.7 1.4-1.26 2.27-1.65a8.18 8.18 0 0 1 3.2-.52ZM3.57 7.39l3.2 4.06-1.56 3.58A6.96 6.96 0 0 1 3.57 7.39Zm6.57 9.56c-1.05.01-2.1-.2-3.05-.65l.76-1.8h5.7l.49 1.15a6.93 6.93 0 0 1-3.9 1.3Zm6.8-7.07a7.8 7.8 0 0 1-1.17 4L14.55 11l2.17-2.77c.14.54.21 1.1.23 1.65Z"/></svg>';
    }

    function Recommended(object) {
        return LampaYaniHomeSections.recommended(object, {t: t, history: playbackHistory, toCard: toCard, cardRender: bindRecommendedCardRender});
    }

    function LegacyRecommended(object) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            var history = playbackHistory();
            var ids = Object.keys(history).sort(function (a, b) {
                return Number(history[b].updated_at || 0) - Number(history[a].updated_at || 0);
            }).slice(0, 3);
            this.activity.loader(true);
            if (!ids.length) {
                Lampa.Noty.show(t('recommendations_empty'));
                return LampaYaniApi.catalog({limit: 30, sort: 'top', sort_forward: false}).then(function (payload) {
                    self.build({results: LampaYaniApi.normalize(payload).map(toCard), total_pages: 1, title: t('for_you')});
                }).catch(function () {
                    self.build({results: [], total_pages: 1, title: t('for_you')});
                });
            }
            Promise.all(ids.map(function (id) {
                return LampaYaniApi.recommendations(id).then(LampaYaniApi.normalize).catch(function () { return []; });
            })).then(function (rows) {
                var seen = {};
                var cards = [];
                rows.forEach(function (items) {
                    items.forEach(function (item) {
                        var card = toCard(item);
                        var key = String(card.yani_id || card.title);
                        if (!seen[key]) { seen[key] = true; cards.push(card); }
                    });
                });
                self.build({results: cards.slice(0, 40), total_pages: 1, title: t('for_you')});
            }).catch(function () {
                self.build({results: [], total_pages: 1, title: t('for_you')});
            });
        };
        comp.cardRender = bindYummyCardRender;
        return comp;
    }

    function Updates(object) {
        return LampaYaniHomeSections.updates(object, {t: t, toCard: toCard, normalizeList: normalizeUserList, cardRender: bindYummyCardRender});
    }

    function LegacyUpdates(object) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            if (!LampaYaniAuth.token()) {
                Lampa.Noty.show(t('login_required'));
                return self.build({results: [], total_pages: 1, title: t('updates')});
            }
            LampaYaniApi.profile().then(function (payload) {
                var profile = payload && payload.response ? payload.response : payload;
                return Promise.all([
                    LampaYaniApi.userLists(profile.id).then(normalizeUserList).catch(function () { return []; }),
                    LampaYaniApi.subscriptions(profile.id).then(function (response) {
                        var value = response && response.response ? response.response : response;
                        var items = Array.isArray(value) ? value : value && (value.items || value.data || value.subscriptions || value.anime) || [];
                        return items.map(function (item) {
                            var source = item && (item.anime || item.title_data || item.object) || item;
                            return source && (source.anime_id || source.id || source.title) ? toCard(source) : null;
                        }).filter(Boolean);
                    }).catch(function () { return []; }),
                    LampaYaniApi.schedule().then(function (response) {
                        return LampaYaniApi.normalize(response);
                    }).catch(function () { return []; })
                ]);
            }).then(function (result) {
                var listCards = result[0].filter(function (item) {
                    var list = item.user && item.user.list && item.user.list.list;
                    return list && [0, 1, 5].indexOf(Number(list.id)) >= 0;
                }).map(toCard);
                var cards = listCards.concat(result[1]);
                var schedule = {};
                result[2].forEach(function (item) { schedule[String(item.anime_id || item.id)] = item.episodes || {}; });
                var seen = {};
                cards = cards.filter(function (card) {
                    var key = String(card.yani_id || card.title);
                    if (seen[key]) return false;
                    seen[key] = true;
                    var episodeDates = schedule[key] || {};
                    card.yani_update_date = Number(episodeDates.prev_date || episodeDates.next_date || 0);
                    card.yani_update_episode = Number(episodeDates.aired || 0) || null;
                    return true;
                }).sort(function (a, b) {
                    return Number(b.yani_update_date || 0) - Number(a.yani_update_date || 0);
                });
                self.build({results: cards.slice(0, 20), total_pages: 1, title: t('updates')});
            }).catch(function (error) {
                console.error('[YummyAnime Updates]', error);
                self.activity.loader(false);
                Lampa.Noty.show(t('updates_error'));
            });
        };
        comp.cardRender = bindYummyCardRender;
        return comp;
    }

    function History(object) {
        return LampaYaniHomeSections.history(object, {t: t, history: playbackHistory, toCard: toCard, historyCardRender: bindHistoryCardRender});
    }

    function LegacyHistory(object) {
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
                var saved = history[id] || {};
                var fallback = toCard(saved.card || {anime_id: id, title: saved.title || t('untitled'), poster: saved.poster || ''});
                return LampaYaniApi.detail(id).then(function (payload) {
                    var item = payload && payload.response ? payload.response : payload;
                    var card = item ? toCard(item) : fallback;
                    card.yani_id = card.yani_id || Number(id) || id;
                    return card;
                }).catch(function () { return fallback; });
            })).then(function (cards) {
                self.build({results: cards.filter(Boolean), total_pages: 1, title: t('continue_watching')});
            }).catch(function (error) {
                console.error('[YummyAnime History]', error);
                self.activity.loader(false);
                Lampa.Noty.show(t('history_load_error'));
            });
        };

        comp.cardRender = bindHistoryCardRender;

        return comp;
    }

    function bindHistoryCardRender(first, second, third) {
        bindYummyCardRender(first, second, third);
        var card;
        [first, second, third].forEach(function (value) {
            if (!value || card) return;
            if (value.render || value.yani_id || value.title) card = value;
            else {
                var candidate = value.card || value.object || value.data;
                if (candidate && (candidate.render || candidate.yani_id || candidate.title)) card = candidate;
            }
        });
        if (card && card.yani_id) {
            // Continue Watching is a playback queue, not an information catalog.
            card.onEnter = function () { openVideos(card, true); };
        }
    }

    function bindYummyCardRender(first, second, third, options) {
        var element;
        var card;
        [first, second, third].forEach(function (value) {
            if (!value) return;
            var isElement = value.jquery || value.nodeType || (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement);
            if (isElement) element = value;
            else if (!card && hasYummyCardData(value)) card = value;
        });
        [first, second, third].forEach(function (value) {
            if (!value || card) return;
            var candidate = value.card || value.object || value.data;
            if (candidate && hasYummyCardData(candidate)) card = candidate;
        });
        if (!element && second && (second.jquery || second.nodeType)) element = second;
        if (!card && first && hasYummyCardData(first)) card = first;
        if (!element && card && card.render) element = card.render(true);
        if (!card || !element) return;
        bindYummyCard(element, card, options);
    }

    function hasYummyCardData(value) {
        // Do not attach YummyAnime handlers to arbitrary Lampa cards.  The
        // previous title-based check also matched native TMDB cards and left
        // Lampa trying to open a movie with an undefined id.
        return Boolean(value && (value.yani_id || value.anime_id || value.animeId ||
            value.anime && (value.anime.yani_id || value.anime.anime_id || value.anime.animeId)));
    }

    function bindRecommendedCardRender(first, second, third) {
        bindYummyCardRender(first, second, third, {openYummyDetail: true});
    }

    function bindYummyCard(element, card, options) {
        // Keep an explicit marker on the original Lampa card.  Some Lampa
        // versions preserve only custom fields when forwarding a card to the
        // default detail handler.
        card._yani_card = true;
        addCardRatings(element, card);
        addCardMediaBadges(element, card);
        addCardUpdateBadge(element, card);
        addCardListBadge(element, card);
        LampaYaniMedia.attachPosterFallback(element, card);
        // Some Lampa versions clone the card object after cardRender. Keep a
        // DOM-level handler as a fallback so search results remain clickable.
        var rendered = element && element.jquery ? element : $(element);
        // Lampa cards already have a default `hover:enter` handler. Some
        // builds attach it to an inner card element, not the rendered root.
        // Remove it from the full YummyAnime card tree: otherwise one Enter
        // can still attempt a native TMDB detail with id=undefined before our
        // resolver has chosen a real match or the YummyAnime fallback.
        rendered.add(rendered.find('*')).off('hover:enter click');
        var openCard = options && options.openYummyDetail ? function () { openYummyDetail(card, false); } : function () { openCardOnce(card); };
        rendered.on('hover:enter.yaniOpen click.yaniOpen', function (event) {
            if (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            openCard();
            return false;
        });
        card.onEnter = openCard;
        card.onMenu = function () {
            if (card.yani_id) showYummyActions(card);
        };
    }

    function openCardOnce(card) {
        var id = getYummyId(card);
        if (!card || !id || card._yani_opening) return;
        card.yani_id = id;
        card._yani_opening = true;
        openStandardLampaCard(card);
        setTimeout(function () { card._yani_opening = false; }, 10000);
    }

    function getYummyId(card) {
        if (!card) return null;
        return card.yani_id || card.anime_id || card.animeId ||
            card.anime && (card.anime.yani_id || card.anime.anime_id || card.anime.animeId) || null;
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

    function addCardUpdateBadge(element, card) {
        if (!card || !card.yani_update_episode) return;
        var render = card.render ? $(card.render(true)) : $(element);
        var view = $('.card__view', render).first();
        if (!view.length || view.find('.yani-card-update').length) return;
        view.append($('<span class="yani-card-update"></span>').text(t('episode') + ' ' + card.yani_update_episode));
    }

    function addCardListBadge(element, card) {
        if (!card || (card.yani_list_id === null && !card.yani_is_favorite)) return;
        var render = card.render ? $(card.render(true)) : $(element);
        var view = $('.card__view', render).first();
        if (!view.length) return;
        var badge = $('.yani-card-list', view);
        if (!badge.length) badge = $('<span class="yani-card-list"></span>').appendTo(view);
        var labels = {0: t('watching'), 1: t('planned'), 2: t('completed'), 3: t('dropped'), 5: t('postponed')};
        var label = labels[card.yani_list_id] || '';
        if (card.yani_is_favorite) label = label ? label + ' · ♥' : '♥';
        badge.text(label);
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
                {title: listActionTitle(card, 'watching'), action: 'watching'},
                {title: listActionTitle(card, 'planned'), action: 'planned'},
                {title: listActionTitle(card, 'completed'), action: 'completed'},
                {title: listActionTitle(card, 'dropped'), action: 'dropped'},
                {title: listActionTitle(card, 'postponed'), action: 'postponed'}
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
                action.then(function () {
                    if (item.action === 'favorite') card.yani_is_favorite = true;
                    else if (item.action) card.yani_list_id = {watching: 0, planned: 1, completed: 2, dropped: 3, postponed: 5}[item.action];
                    addCardListBadge(null, card);
                    Lampa.Noty.show(t('saved'));
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    Lampa.Noty.show(t('save_error'));
                });
            }
        });
    }

    function listActionTitle(card, key) {
        var ids = {watching: 0, planned: 1, completed: 2, dropped: 3, postponed: 5};
        var title = t(key);
        return hasYummyList(card, ids[key]) ? '✓ ' + title : title;
    }

    function hasYummyList(card, listId) {
        return Boolean(card) && card.yani_list_id !== null && card.yani_list_id !== undefined && card.yani_list_id !== '' && Number(card.yani_list_id) === listId;
    }

    function Account(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
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
                    LampaYaniApi.userLists(profile.id).then(responseData).catch(function () { return []; }),
                    LampaYaniApi.userStatsGenres(profile.id).then(responseData).catch(function () { return []; }),
                    LampaYaniApi.userStatsRatings(profile.id).then(responseData).catch(function () { return []; }),
                    LampaYaniApi.userStatsTypes(profile.id).then(responseData).catch(function () { return []; })
                ]);
            }).then(function (result) {
                renderAccount(result[0], result[1], result[2], result[3], result[4], result[5]);
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

        function renderAccount(profile, stats, lists, genreStats, ratingStats, typeStats) {
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

            var notificationButton = $('<div class="yani-account__notification-button selector"></div>');
            notificationButton.append($('<strong></strong>').text(t('notifications')));
            notificationButton.append($('<span></span>').text(String(profile.notifications && (profile.notifications.unread_count || profile.notifications.count) || 0) + ' ' + t('unread')));
            bindAccountFocus(notificationButton);
            notificationButton.on('hover:enter click.yaniNotifications', openNotifications);
            content.append(notificationButton);
            var subscriptionsButton = $('<div class="yani-account__notification-button selector"></div>');
            subscriptionsButton.append($('<strong></strong>').text(t('subscriptions')));
            subscriptionsButton.append($('<span></span>').text(t('subscriptions')));
            bindAccountFocus(subscriptionsButton);
            subscriptionsButton.on('hover:enter click.yaniSubscriptions', function () { openSubscriptions(profile.id); });
            content.append(subscriptionsButton);
            var syncButton = $('<div class="yani-account__notification-button selector"></div>');
            syncButton.append($('<strong></strong>').text(t('sync_history')));
            syncButton.append($('<span></span>').text(t('sync_history_description')));
            bindAccountFocus(syncButton);
            syncButton.on('hover:enter click.yaniSync', function () {
                var history = playbackHistory();
                var videos = Object.keys(history).map(function (id) {
                    var item = history[id] || {};
                    if (!item.video_id) return null;
                    return {video_id: Number(item.video_id), time: Number(item.time || 0), date: Math.floor(Number(item.updated_at || Date.now()) / 1000)};
                }).filter(function (item) { return item && item.video_id; });
                if (!videos.length) return Lampa.Noty.show(t('history_empty'));
                LampaYaniApi.syncVideoWatches(videos).then(function () {
                    Lampa.Noty.show(t('sync_history_ok'));
                }).catch(function (error) {
                    console.error('[YummyAnime] History sync failed', error);
                    Lampa.Noty.show(t('sync_history_error'));
                });
            });
            content.append(syncButton);
            var reviewsButton = $('<div class="yani-account__notification-button selector"></div>');
            reviewsButton.append($('<strong></strong>').text(t('my_reviews')));
            reviewsButton.append($('<span></span>').text(t('my_reviews_description')));
            bindAccountFocus(reviewsButton);
            reviewsButton.on('hover:enter click.yaniReviews', function () { openUserReviews(profile.id); });
            content.append(reviewsButton);

            var counts = {};
            lists.forEach(function (anime) {
                var userList = anime.user && anime.user.list;
                if (!userList) return;
                if (userList.list && typeof userList.list.id !== 'undefined') counts[userList.list.id] = (counts[userList.list.id] || 0) + 1;
                if (userList.is_fav) counts[4] = (counts[4] || 0) + 1;
            });

            content.append($('<div class="yani-account__section-title"></div>').text(t('list_stats')));
            var listGrid = $('<div class="yani-account__lists"></div>');
            accountListDefinitions().forEach(function (definition) {
                var stat = stats.filter(function (item) { return Number(item.list && item.list.id) === definition.id; })[0] || {};
                var tile = $('<div class="yani-account__list selector"></div>');
                tile.append($('<div class="yani-account__list-title"></div>').text(definition.title));
                tile.append($('<div class="yani-account__list-count"></div>').text(String(counts[definition.id] || 0) + ' ' + t('anime_count')));
                tile.append($('<div class="yani-account__list-time"></div>').text(t('total_time') + ': ' + formatWatchTime(stat.seconds)));
                bindAccountFocus(tile);
                tile.on('hover:enter', function () { openAccountList(definition, lists, profile.id); });
                listGrid.append(tile);
            });
            content.append(listGrid);
            renderAccountStatistics(genreStats, ratingStats, typeStats);
        }

        function renderAccountStatistics(genreStats, ratingStats, typeStats) {
            var sections = [
                {title: t('genres_statistics'), items: genreStats, label: function (item) { return item.title || item.name; }},
                {title: t('ratings_statistics'), items: ratingStats, label: function (item) { return String(item.rating || '—'); }},
                {title: t('types_statistics'), items: typeStats, label: function (item) { return item.type && (item.type.name || item.type.shortname) || item.name; }}
            ];
            var available = sections.filter(function (section) { return Array.isArray(section.items) && section.items.length; });
            if (!available.length) return;
            content.append($('<div class="yani-account__section-title"></div>').text(t('account_statistics')));
            available.forEach(function (section) {
                var block = $('<div class="yani-account__stats"></div>');
                block.append($('<div class="yani-account__stats-title"></div>').text(section.title));
                section.items.slice(0, 12).forEach(function (item) {
                    var row = $('<div class="yani-account__stats-row selector"></div>');
                    row.append($('<span></span>').text(section.label(item) || '—'));
                    row.append($('<strong></strong>').text(String(item.count || 0)));
                    bindAccountFocus(row);
                    block.append(row);
                });
                content.append(block);
            });
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
                var target = event.currentTarget || event.target;
                last = target;
                scroll.update($(target), true);
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
                down: function () { LampaYaniNavigation.moveDown(scroll); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function AuthPage(object) {
        return LampaYaniAuthPage.create(object, {
            t: t,
            input: showYummyInput,
            goBack: goBack
        });
    }

    function LegacyAuthPage(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-auth"></div>');
        var content = $('<div class="yani-auth__content"></div>');
        var loginValue = (LampaYaniAuth.get().login || '').trim();
        var passwordValue = '';
        var last;

        this.create = function () {
            render();
            scroll.append(content);
            html.append(scroll.render(true));
            this.activity.loader(false);
            this.activity.toggle();
        };

        function render() {
            content.empty();
            var account = LampaYaniAuth.get();
            var authorized = Boolean(LampaYaniAuth.token());
            content.append($('<div class="yani-auth__title"></div>').text(t('auth_title')));
            content.append($('<div class="yani-auth__status ' + (authorized ? 'is-authorized' : '') + '"></div>').text(authorized ? t('auth_authorized') : t('auth_not_authorized')));

            var form = $('<div class="yani-auth__form"></div>');
            addField(form, t('auth_login'), loginValue || t('auth_login_empty'), function () {
                showYummyInput({title: t('email_prompt'), value: loginValue, nosave: true, align: 'center'}, function (value) {
                    loginValue = String(value || '').trim();
                    render();
                });
            });
            addField(form, t('auth_password'), passwordValue ? '••••••••' : t('auth_password_empty'), function () {
                showYummyInput({title: t('password_prompt'), value: '', password: true, nosave: true, align: 'center'}, function (value) {
                    passwordValue = String(value || '');
                    render();
                });
            });
            content.append(form);

            var actions = $('<div class="yani-auth__actions"></div>');
            if (!authorized) addAction(actions, t('auth_submit'), 'primary', submitLogin);
            if (authorized) {
                addAction(actions, t('refresh_name'), '', refreshToken);
                addAction(actions, t('logout_name'), '', logout);
            }
            content.append(actions);
            if (authorized && account.login) content.append($('<div class="yani-auth__account"></div>').text(t('auth_account') + ': ' + account.login));
            content.append($('<div class="yani-auth__hint"></div>').text(t('auth_hint')));
        }

        function addField(parent, title, value, action) {
            var field = $('<div class="yani-auth__field selector"></div>');
            field.append($('<div class="yani-auth__field-title"></div>').text(title));
            field.append($('<div class="yani-auth__field-value"></div>').text(value));
            bindFocus(field);
            field.on('hover:enter', action);
            parent.append(field);
        }

        function addAction(parent, title, className, action) {
            var button = $('<div class="yani-auth__button selector ' + (className ? 'yani-auth__button--' + className : '') + '"></div>').text(title);
            bindFocus(button);
            button.on('hover:enter', action);
            parent.append(button);
        }

        function bindFocus(element) {
            element.on('hover:focus', function (event) {
                var target = event.currentTarget || event.target;
                last = target;
                scroll.update($(target), true);
            });
        }

        function submitLogin() {
            if (!loginValue) return Lampa.Noty.show(t('email_required'));
            if (!passwordValue) return Lampa.Noty.show(t('password_required'));
            Lampa.Loading && Lampa.Loading.start && Lampa.Loading.start();
            LampaYaniAuth.login(loginValue, passwordValue).then(function () {
                return LampaYaniApi.profile().then(function (payload) {
                    var profile = payload && payload.response ? payload.response : payload;
                    var current = LampaYaniAuth.get();
                    LampaYaniAuth.save({token: current.token, login: current.login, display_name: profile && (profile.nickname || profile.name) || current.login});
                }).catch(function () {});
            }).then(function () {
                passwordValue = '';
                Lampa.Noty.show(t('login_ok'));
                goBack();
            }).catch(function (error) {
                console.error('[YummyAnime Auth]', error);
                Lampa.Noty.show(t('login_error'));
            }).then(function () { Lampa.Loading && Lampa.Loading.stop && Lampa.Loading.stop(); });
        }

        function refreshToken() {
            LampaYaniAuth.refresh().then(function () {
                Lampa.Noty.show(t('token_refreshed'));
                render();
            }).catch(function () { Lampa.Noty.show(t('token_refresh_error')); });
        }

        function logout() {
            LampaYaniAuth.logout().then(function () {
                Lampa.Noty.show(t('logged_out'));
                render();
            }).catch(function () {
                Lampa.Noty.show(t('token_removed'));
                render();
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
                down: function () { LampaYaniNavigation.moveDown(scroll); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function openNotifications() {
        Lampa.Activity.push({url: 'yani/notifications', title: t('notifications_title'), component: 'yani_notifications'});
    }

    function openSubscriptions(userId) {
        Lampa.Activity.push({url: 'yani/subscriptions', title: t('subscriptions'), component: 'yani_subscriptions', userId: userId});
    }

    function openUserReviews(userId) {
        LampaYaniApi.userReviews(userId, 30, 0).then(function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            var items = Array.isArray(response) ? response : response && (response.items || response.data || response.reviews) || [];
            if (!items.length) return Lampa.Noty.show(t('reviews_empty'));
            Lampa.Select.show({title: t('my_reviews'), items: items.map(function (review) {
                var anime = review.anime || review.title_data || review.object || {};
                var title = anime.title || anime.name || review.anime_title || review.title || t('anime');
                var text = cleanCommentText(review.text || review.body || review.description || '');
                var score = review.rate || review.rating || review.score;
                return {
                    title: title + (score ? ' · ' + score + '/10' : ''),
                    subtitle: text.slice(0, 180),
                    review: review,
                    anime: anime
                };
            }), onSelect: function (item) {
                var anime = item.anime || {};
                var id = anime.anime_id || anime.id || item.review.anime_id;
                if (id) openYummyDetail(toCard(anime.anime_id || anime.id ? anime : {anime_id: id, title: item.title}), true);
            }});
        }).catch(function (error) {
            console.error('[YummyAnime Reviews]', error);
            Lampa.Noty.show(t('reviews_error'));
        });
    }

    function Subscriptions(object) {
        return LampaYaniAccountLists.subscriptions(object, {toCard: toCard, cardRender: bindYummyCardRender, t: t});
    }

    function LegacySubscriptions(object) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            LampaYaniApi.subscriptions(object.userId).then(function (payload) {
                var response = payload && payload.response ? payload.response : payload;
                var values = Array.isArray(response) ? response : response && (response.anime || response.items || response.data || response.subscriptions) || [];
                var cards = values.map(function (item) {
                    var source = item && (item.anime || item.title_data || item.object) || item;
                    return source && (source.anime_id || source.id || source.title) ? toCard(source) : null;
                }).filter(Boolean);
                if (!cards.length) Lampa.Noty.show(t('subscriptions_empty'));
                self.build({results: cards, total_pages: 1, title: t('subscriptions')});
            }).catch(function (error) {
                console.error('[YummyAnime Subscriptions]', error);
                self.activity.loader(false);
                Lampa.Noty.show(t('subscriptions_error'));
            });
        };
        comp.cardRender = bindYummyCardRender;
        return comp;
    }

    function Notifications(object) {
        return LampaYaniNotifications.create(object, {
            t: t,
            normalize: normalizeNotifications,
            formatDate: formatNotificationDate,
            toCard: toCard,
            openDetail: openYummyDetail,
            goBack: goBack
        });
    }

    function LegacyNotifications(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-notifications"></div>');
        var content = $('<div class="yani-notifications__content"></div>');
        var last;
        var offset = 0;

        this.create = function () {
            var self = this;
            this.activity.loader(true);
            LampaYaniApi.notifications(30, offset).then(function (payload) {
                renderNotifications(normalizeNotifications(payload), offset > 0);
                scroll.append(content);
                html.append(scroll.render(true));
                self.activity.loader(false);
                self.activity.toggle();
            }).catch(function (error) {
                console.error('[YummyAnime Notifications]', error);
                content.append($('<div class="yani-account__notice"></div>').text(t('notifications_error')));
                scroll.append(content);
                html.append(scroll.render(true));
                self.activity.loader(false);
                self.activity.toggle();
            });
        };

        function renderNotifications(items, append) {
            if (!append) content.empty();
            var title = $('<div class="yani-notifications__title"></div>').text(t('notifications_title'));
            var markAll = $('<div class="yani-detail__button selector"></div>').text(t('mark_all_read'));
            markAll.on('hover:enter click', function () {
                LampaYaniApi.markAllNotificationsRead().then(function () {
                    content.find('.yani-notification').removeClass('unread');
                    Lampa.Noty.show(t('saved'));
                });
            });
            var deleteAll = $('<div class="yani-detail__button selector"></div>').text(t('delete_all_notifications'));
            deleteAll.on('hover:enter click', function () {
                LampaYaniApi.deleteAllNotifications().then(function () { content.empty(); content.append(title).append($('<div class="yani-account__notice"></div>').text(t('notifications_empty'))); });
            });
            if (!append) content.append(title, markAll, deleteAll);
            if (!items.length) {
                if (!append) content.append($('<div class="yani-account__notice"></div>').text(t('notifications_empty')));
                return;
            }
            items.forEach(function (notification) {
                var item = $('<div class="yani-notification selector"></div>');
                if (!notification.viewed && !notification.read) item.addClass('unread');
                item.append($('<div class="yani-notification__title"></div>').text(notification.title || notification.type || t('notification')));
                if (notification.text || notification.message) item.append($('<div class="yani-notification__text"></div>').text(notification.text || notification.message));
                var notificationDate = notification.date || notification.date_seconds || notification.dateSeconds;
                if (notificationDate) item.append($('<div class="yani-notification__date"></div>').text(formatNotificationDate(notificationDate)));
                item.on('hover:focus', function (event) { var target = event.currentTarget || event.target; last = target; scroll.update($(target), true); });
                item.on('hover:enter click', function () {
                    if (notification.id && !notification.viewed) LampaYaniApi.markNotificationRead(notification.id).catch(function () {});
                    var animeId = notification.anime_id || notification.object_id || notification.objectId;
                    if (animeId) openYummyDetail(toCard({anime_id: animeId, title: notification.title || t('anime')}), false);
                });
                content.append(item);
            });
            var more = $('<div class="yani-detail__button selector"></div>').text(t('notifications_more'));
            more.on('hover:enter click', function () {
                more.remove();
                offset += items.length;
                LampaYaniApi.notifications(30, offset).then(function (payload) { renderNotifications(normalizeNotifications(payload), true); });
            });
            content.append(more);
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { LampaYaniNavigation.moveDown(scroll); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };
        this.render = function (js) { return js ? html[0] : html; };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function accountListDefinitions() {
        var favorites = LampaYaniI18n.getLanguage() === 'en' ? 'Favorites' : 'Любимые';
        return [
            {id: 0, key: 'watching', title: t('watching')},
            {id: 1, key: 'planned', title: t('planned')},
            {id: 2, key: 'completed', title: t('completed')},
            {id: 3, key: 'dropped', title: t('dropped')},
            {id: 4, key: 'favorites', title: favorites},
            {id: 5, key: 'postponed', title: t('postponed')}
        ];
    }

    function openAccountList(definition, items, userId) {
        var selected = (items || []).filter(function (item) {
            var userList = item.user && item.user.list;
            return definition.id === 4 ? Boolean(userList && userList.is_fav) : Boolean(userList && userList.list && Number(userList.list.id) === definition.id);
        });
        var load = definition.id === 4 || !userId ? Promise.resolve(selected) : LampaYaniApi.userList(userId, definition.id).then(function (payload) {
            var result = normalizeUserList(payload);
            return result.length ? result : selected;
        }).catch(function () { return selected; });
        load.then(function (result) {
            Lampa.Activity.push({
                url: 'yani/account/list/' + definition.key,
                title: 'YummyAnime · ' + definition.title,
                component: 'yani_account_list',
                items: result
            });
        });
    }

    function normalizeUserList(payload) {
        var response = payload && payload.response ? payload.response : payload;
        var values = Array.isArray(response) ? response : response && (response.anime || response.results || response.items || response.data) || [];
        return values.map(function (item) {
            if (!item || !item.anime || typeof item.anime !== 'object') return item;
            var anime = Object.assign({}, item.anime);
            if (item.user) anime.user = item.user;
            return anime;
        }).filter(Boolean);
    }

    function AccountList(object) {
        return LampaYaniAccountLists.accountList(object, {toCard: toCard, cardRender: bindYummyCardRender});
    }

    function LegacyAccountList(object) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            this.build({results: (object.items || []).map(toCard), total_pages: 1, title: object.title});
        };
        comp.cardRender = bindYummyCardRender;
        return comp;
    }

    function formatAccountDate(timestamp) {
        if (!timestamp) return '—';
        try {
            return new Date(Number(timestamp) * 1000).toLocaleDateString(locale(), {day: 'numeric', month: 'long', year: 'numeric'});
        } catch (error) {
            return new Date(Number(timestamp) * 1000).toLocaleDateString();
        }
    }

    function normalizeNotifications(payload) {
        var response = payload && payload.response ? payload.response : payload;
        var values = Array.isArray(response) ? response : response && (response.notifications || response.items || response.data) || [];
        return Array.isArray(values) ? values : [];
    }

    function formatNotificationDate(value) {
        if (!value) return '';
        if (typeof value === 'number' || /^\d+$/.test(String(value))) return formatAccountDate(value);
        var parsed = new Date(value);
        return isNaN(parsed.getTime()) ? String(value) : parsed.toLocaleString(locale(), {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'});
    }

    function formatWatchTime(seconds) {
        var hours = Math.floor(Number(seconds || 0) / 3600);
        var days = Math.floor(hours / 24);
        var restHours = hours % 24;
        return days ? days + ' ' + t('days_short') + ' ' + restHours + ' ' + t('hours_short') : hours + ' ' + t('hours_short');
    }

    function StatusDashboard(object) {
        return LampaYaniStatus.create(object, {
            t: t,
            locale: locale,
            goBack: goBack
        });
    }

    function LegacyStatusDashboard(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
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

            var legend = $('<div class="yani-status__legend selector"></div>');
            legend.append('<span class="yani-status__dot yani-status__dot--up"></span>' + t('up') + ' <span class="yani-status__dot yani-status__dot--degraded"></span>' + t('unstable') + ' <span class="yani-status__dot yani-status__dot--down"></span>' + t('down'));
            bindStatusFocus(legend);
            content.append(legend);

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

            var source = $('<div class="yani-status__source selector"></div>').text(t('source') + ': YummyStatus · ' + t('period') + ': ' + periodLabels[currentPeriod] + ' · ' + t('snapshot_notice'));
            bindStatusFocus(source);
            content.append(source);

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
                var target = event.currentTarget || event.target;
                last = target;
                scroll.update($(target), true);
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
                down: function () { LampaYaniNavigation.moveDown(scroll); },
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
        return LampaYaniSchedule.create(object, {
            t: t,
            locale: locale,
            toCard: toCard,
            openYummyDetail: openYummyDetail,
            goBack: goBack
        });
    }

    // Kept temporarily as an internal fallback while deployed clients refresh the bundle.
    function LegacySchedule(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-schedule"></div>');
        var content = $('<div class="yani-schedule__content"></div>');
        var last;
        var dayGroups = [];
        var selectedDay = 0;

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
            dayGroups = [];

            // Keep a short history as well as upcoming releases. The API
            // may return no items for a past day, but the date remains
            // navigable so the user can move backward and forward uniformly.
            for (var dayOffset = -7; dayOffset <= 7; dayOffset++) {
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

                dayGroups.push({day: day, offset: dayOffset, releases: releases});
            }

            var days = $('<div class="yani-schedule__days"></div>');
            dayGroups.forEach(function (group, index) {
                var chip = $('<div class="yani-schedule__day-chip selector"></div>');
                chip.append($('<div class="yani-schedule__day-name"></div>').text(formatScheduleDay(group.day, group.offset)));
                chip.append($('<div class="yani-schedule__day-count"></div>').text(group.releases.length));
                chip.on('hover:focus', function () {
                    content.find('.yani-schedule__day-chip.focus').removeClass('focus');
                    chip.addClass('focus');
                });
                chip.on('hover:blur', function () { chip.removeClass('focus'); });
                chip.on('hover:enter click.yaniScheduleDay', function () { selectScheduleDay(index); });
                days.append(chip);
            });
            content.append(days);
            content.append($('<div class="yani-schedule__selected-title"></div>'));
            content.append($('<div class="yani-schedule__releases"></div>'));
            selectScheduleDay(dayGroups.findIndex(function (group) { return group.offset === 0; }));
        }

        function selectScheduleDay(index) {
            selectedDay = Math.max(0, Math.min(index, dayGroups.length - 1));
            var group = dayGroups[selectedDay];
            if (!group) return;
            content.find('.yani-schedule__day-chip').removeClass('selected');
            content.find('.yani-schedule__day-chip').eq(selectedDay).addClass('selected');
            content.find('.yani-schedule__selected-title').text(formatScheduleDay(group.day, group.offset));
            var releases = content.find('.yani-schedule__releases').empty();
            if (!group.releases.length) releases.append($('<div class="yani-schedule__empty"></div>').text(t('no_releases')));
            else group.releases.forEach(function (item) { releases.append(createScheduleItem(item)); });
        }

        function createScheduleItem(item) {
            var card = toCard(item);
            var episodes = item.episodes || {};
            var releaseDate = new Date(Number(episodes.next_date) * 1000);
            var row = $('<div class="yani-schedule__item selector"></div>');
            var poster = $('<img class="yani-schedule__poster" alt="">').attr('src', card.poster || '');
            LampaYaniMedia.bindPosterFallback(poster, card);
            var info = $('<div class="yani-schedule__info"></div>');
            var release = $('<div class="yani-schedule__release"></div>');

            info.append($('<div class="yani-schedule__title"></div>').text(card.title));
            info.append($('<div class="yani-schedule__episode"></div>').text(formatEpisode(episodes)));
            release.append($('<div class="yani-schedule__time"></div>').text(formatScheduleTime(releaseDate)));
            release.append($('<div class="yani-schedule__timezone"></div>').text(t('local_time')));
            row.append(poster, info, release);
            var opened = false;
            function openScheduleCard() {
                if (opened) return;
                opened = true;
                card.yani_schedule = formatEpisode(episodes) + ', ' + formatScheduleDateTime(releaseDate);
                openStandardLampaCard(card);
                setTimeout(function () { opened = false; }, 500);
            }

            row.on('hover:focus', function (event) {
                var target = event.currentTarget || event.target;
                content.find('.yani-schedule__item.focus').removeClass('focus');
                row.addClass('focus');
                last = target;
                scroll.update($(target), true);
            });
            row.on('hover:blur', function () { row.removeClass('focus'); });
            row.on('hover:enter click.yaniSchedule', openScheduleCard);

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
                down: function () { if (Navigator.canmove('down')) Navigator.move('down'); else scroll.wheel(300); },
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
        object = object || {};
        var restoredActivity = !object.card || typeof object.card !== 'object' || !getYummyId(object.card);
        var data = object.card || object.object || object.data || {};
        var routeId = LampaYaniUiUtils.detailRouteId(object);
        if (routeId && !getYummyId(data)) data = Object.assign({}, data, {yani_id: routeId});
        if (!data.title && object.title) data.title = object.title;
        var html = $('<div class="yani-detail"></div>');
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var button;

        html.on('hover:focus', function (event) {
            var target = $(event.target).closest('.selector');
            if (target.hasClass('selector')) scroll.update(target, true);
        });

        this.create = function () {
            var self = this;
            var settled = false;
            var timeoutId;
            this.activity.loader(true);

            function finish(card) {
                if (settled) return;
                settled = true;
                if (timeoutId) clearTimeout(timeoutId);
                try {
                    renderDetail(card);
                } catch (error) {
                    console.error('[YummyAnime Detail render]', error);
                    html.empty().append($('<div class="yani-detail__error selector"></div>').text(t('detail_load_error')));
                } finally {
                    self.activity.loader(false);
                    self.activity.toggle();
                }
            }

            function canRenderSnapshot(card) {
                return Boolean(card && (card.img || card.poster || card.overview ||
                    card.yani_titles && card.yani_titles.length || card.yani_ratings && card.yani_ratings.length));
            }

            function fail(error) {
                if (settled) return;
                settled = true;
                if (timeoutId) clearTimeout(timeoutId);
                if (error) console.error('[YummyAnime Detail restore]', error);
                self.activity.loader(false);

                // Plugin cache resets can restore the route but discard its
                // transient card object. If the route can no longer be
                // hydrated, replace the broken activity with YummyAnime Home
                // instead of leaving an unusable partial title page onscreen.
                if (restoredActivity && Lampa.Activity && Lampa.Activity.replace) {
                    setTimeout(function () {
                        Lampa.Activity.replace({url: 'yani', title: 'YummyAnime', component: 'yani_home'});
                    }, 0);
                    return;
                }
                html.empty();
                button = $('<div class="yani-detail__error selector"></div>').text(t('detail_load_error'));
                bindDetailButtonFocus(button);
                html.append(button);
                scroll.append(html);
                self.activity.toggle();
            }

            timeoutId = setTimeout(function () {
                console.error('[YummyAnime Detail] timeout');
                if (canRenderSnapshot(data)) finish(data);
                else fail(new Error('Detail restore timed out'));
            }, 20000);

            if (routeId || data.yani_id) {
                var detailId = routeId || data.yani_id;
                data.yani_id = detailId;
                LampaYaniApi.detail(detailId).then(function (payload) {
                    var item = payload && payload.response ? payload.response : payload;
                    var detailed = item ? toCard(item) : data;
                    if (!detailed.yani_id) detailed.yani_id = detailId;
                    detailed.yani_schedule = data.yani_schedule;
                    finish(detailed);
                }).catch(function (error) {
                    console.error('[YummyAnime]', error);
                    if (canRenderSnapshot(data)) finish(data);
                    else fail(error);
                });
            } else {
                if (canRenderSnapshot(data)) finish(data);
                else fail(new Error('YummyAnime detail id is missing'));
            }
        };

        function renderDetail(cardData) {
            data = cardData;
            var poster = $('<img class="yani-detail__poster">').attr('src', data.img || data.poster || '');
            LampaYaniMedia.bindPosterFallback(poster, data);
            var info = $('<div class="yani-detail__info"></div>');
            // The title is deliberately a selector: it is the first focusable
            // item on the page, so moving up from the actions returns the
            // viewport to the beginning of the detail card.
            var title = $('<div class="yani-detail__title selector"></div>').text(data.title || 'YummyAnime');
            bindDetailButtonFocus(title);
            info.append(title);
            var alternativeTitles = (data.yani_titles || []).filter(function (title) { return title && title !== data.title; });
            if (alternativeTitles.length) info.append($('<div class="yani-detail__alternative-titles"></div>').text(alternativeTitles.join(' · ')));
            var genres = detailGenres(data);
            if (genres.length) info.append(createDetailGenres(genres));
            if (data.release_date) info.append($('<div class="yani-detail__meta"></div>').text(data.release_date));
            info.append(createDetailRatings(data.yani_ratings || [], data.vote_count));
            if (data.yani_user_rating) info.append($('<div class="yani-detail__personal-rating"></div>').text(t('my_rating') + ': ' + data.yani_user_rating + '/10'));
            if (data.yani_schedule) info.append($('<div class="yani-detail__schedule"></div>').text(data.yani_schedule));
            info.append($('<div class="yani-detail__overview"></div>').text(data.overview || ''));
            var actions = $('<div class="yani-detail__actions"></div>');
            button = $('<div class="yani-detail__button yani-detail__button--watch selector"></div>').text(t('watch'));
            // Keep playback behind one action. When YummyTV is enabled the
            // destination is selected first; regular playback then opens the
            // dubbing/source and episode selectors as before.
            button.on('hover:enter click.yaniWatch', function () { openTitlePlaybackOptions(data); });
            bindDetailButtonFocus(button);
            var trailersButton = $('<div class="yani-detail__button selector"></div>').text(t('trailers'));
            trailersButton.on('hover:enter click.yaniDetailTrailers', function () { openTrailers(data); });
            bindDetailButtonFocus(trailersButton);
            var searchButton = $('<div class="yani-detail__button yani-detail__button--lampa selector"></div>');
            searchButton.append($('<span class="yani-detail__button-icon"></span>').html(lampaIcon()));
            searchButton.append($('<span></span>').text(t('open_lampa_search')));
            searchButton.on('hover:enter', function () {
                openStandardLampaCard(data);
            });
            bindDetailButtonFocus(searchButton);
            var subscribeButton = $('<div class="yani-detail__button selector"></div>').text(t('subscribe_episodes'));
            if (Lampa.Storage && Lampa.Storage.get('yani_subscribed_video_' + data.yani_id, '')) {
                subscribeButton.text(t('unsubscribe_episodes'));
            }
            subscribeButton.on('hover:enter', function () { toggleEpisodeSubscription(data, subscribeButton); });
            bindDetailButtonFocus(subscribeButton);
            var comments = $('<div class="yani-detail__comments"></div>');
            var listPanel = createDetailListPanel(data);
            actions.append(button, trailersButton, searchButton);
            actions.append(subscribeButton);
            // Keep the principal actions next to the synopsis, before the
            // long viewing-order, recommendations and comments sections.
            info.append(actions);
            info.append(listPanel);
            if (data.yani_viewing_order && data.yani_viewing_order.length) info.append(createViewingOrder(data));
            loadDetailRecommendations(data, info, bindDetailScrollTargets);
            info.append(comments);
            html.append(poster, info);
            scroll.append(html);
            bindDetailScrollTargets(html);
            loadInlineComments(data, comments);
        }

        function createDetailListPanel(cardData) {
            var panel = $('<div class="yani-detail__list-panel"></div>');
            var actions = [
                {key: 'watching', id: 0, icon: 'eye'},
                {key: 'planned', id: 1, icon: 'cloud'},
                {key: 'completed', id: 2, icon: 'flag'},
                {key: 'dropped', id: 3, icon: 'eye-off'},
                {key: 'postponed', id: 5, icon: 'hourglass'},
                {key: 'favorite', favorite: true, icon: 'heart'}
            ];

            actions.forEach(function (action) {
                var item = $('<div class="yani-detail__list-action selector"></div>')
                    .attr('title', t(action.key))
                    .attr('aria-label', t(action.key))
                    .append($('<span class="yani-detail__list-icon"></span>').html(detailListIcon(action.icon)));
                item.on('hover:enter click.yaniDetailList', function () {
                    toggleDetailListState(cardData, action, panel);
                });
                bindDetailButtonFocus(item);
                panel.append(item);
            });
            updateDetailListPanel(panel, cardData);
            return panel;
        }

        function createDetailGenres(genres) {
            var block = $('<div class="yani-detail__genres"></div>');
            genres.forEach(function (genre) {
                var title = genreTitle(genre);
                var value = genreValue(genre);
                if (!title || value === null) return;
                var chip = $('<div class="yani-detail__genre selector"></div>').text(title);
                chip.on('hover:enter click.yaniDetailGenre', function () { openGenreCatalog(title, value); });
                bindDetailButtonFocus(chip);
                block.append(chip);
            });
            return block;
        }

        function updateDetailListPanel(panel, cardData) {
            panel.children('.yani-detail__list-action').each(function (index) {
                var action = [
                    {id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 5}, {favorite: true}
                ][index];
                var active = action.favorite ? Boolean(cardData.yani_is_favorite) : hasYummyList(cardData, action.id);
                $(this).toggleClass('active', active).attr('aria-pressed', active ? 'true' : 'false');
            });
            addCardListBadge(null, cardData);
        }

        function toggleDetailListState(cardData, action, panel) {
            if (!LampaYaniAuth.token()) {
                Lampa.Noty.show(t('login_required'));
                return;
            }
            var active = action.favorite ? Boolean(cardData.yani_is_favorite) : hasYummyList(cardData, action.id);
            var request = action.favorite
                ? (active ? LampaYaniApi.removeFavorite(cardData.yani_id) : LampaYaniApi.addFavorite(cardData.yani_id))
                : (active ? LampaYaniApi.removeFromList(cardData.yani_id) : LampaYaniApi.addToList(cardData.yani_id, action.id));
            request.then(function () {
                if (action.favorite) cardData.yani_is_favorite = !active;
                else cardData.yani_list_id = active ? null : action.id;
                updateDetailListPanel(panel, cardData);
                Lampa.Noty.show(t('saved'));
            }).catch(function (error) {
                console.error('[YummyAnime]', error);
                Lampa.Noty.show(t('save_error'));
            });
        }

        function detailListIcon(name) {
            var icons = {
                eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c-5.2 0-9.4 3.4-11 7 1.6 3.6 5.8 7 11 7s9.4-3.4 11-7c-1.6-3.6-5.8-7-11-7Zm0 11.2A4.2 4.2 0 1 1 12 7.8a4.2 4.2 0 0 1 0 8.4Zm0-2A2.2 2.2 0 1 0 12 9.8a2.2 2.2 0 0 0 0 4.4Z"/></svg>',
                cloud: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.5 19H6.2A4.2 4.2 0 1 1 7 10.7 5.5 5.5 0 0 1 17.5 12 3.5 3.5 0 0 1 18.5 19Zm-12.3-2h12.3a1.5 1.5 0 0 0 0-3c-.4 0-.8.1-1.1.3l-1.6.8.1-1.8A3.5 3.5 0 0 0 9 12.5l.1 1.4-1.3-1A2.2 2.2 0 1 0 6.2 17Z"/></svg>',
                flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h2v2h9.2l-1 3 1 3H8v10H6V3Zm2 6h6.3l-.3-1 .3-1H8v2Z"/></svg>',
                'eye-off': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.3 2 18.7 18.7-1.4 1.4-3.1-3.1a11.7 11.7 0 0 1-5.5 1.5c-5.2 0-9.4-3.4-11-7a12.7 12.7 0 0 1 4.5-5.1L1.9 3.4 3.3 2ZM12 8.5a3.5 3.5 0 0 0-1.3.2l4.6 4.6A3.5 3.5 0 0 0 12 8.5Zm0-3.5c5.2 0 9.4 3.4 11 7a12.8 12.8 0 0 1-4.1 4.8l-1.5-1.5A10.8 10.8 0 0 0 20.8 12c-1.8-3-5.2-5-8.8-5-1 0-1.9.1-2.8.4L7.6 5.8C9 5.3 10.5 5 12 5ZM3.2 12c.6 1.1 1.5 2.1 2.5 2.9l-1.4-1.4A9.7 9.7 0 0 1 3.2 12Z"/></svg>',
                hourglass: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h12v2c0 3-1.2 5.2-3.5 7 2.3 1.8 3.5 4 3.5 7v2H6v-2c0-3 1.2-5.2 3.5-7C7.2 9.2 6 7 6 4V2Zm2 2c0 2.6 1.2 4.5 4 6.3C14.8 8.5 16 6.6 16 4H8Zm0 16h8c0-2.6-1.2-4.5-4-6.3C9.2 15.5 8 17.4 8 20Z"/></svg>',
                heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.2 3.7 13A5.6 5.6 0 0 1 11.6 5L12 5.5l.4-.5a5.6 5.6 0 0 1 7.9 8l-8.3 8.2ZM7.6 6.4A3.6 3.6 0 0 0 5.1 12L12 18.3l6.9-6.8a3.6 3.6 0 0 0-5.1-5.1L12 8l-1.4-1.6a3.6 3.6 0 0 0-3-1Z"/></svg>'
            };
            return icons[name] || '';
        }

        function loadDetailCommunityStats(cardData, container) {
            var section = $('<div class="yani-detail__community selector"><div class="yani-detail__community-title"></div><div class="yani-detail__community-grid"></div></div>');
            section.on('hover:focus', function () { section.addClass('focus'); });
            section.find('.yani-detail__community-title').text(t('community_stats'));
            container.append(section);
            bindDetailScrollTargets(section);
            Promise.all([LampaYaniApi.ratingBuckets(cardData.yani_id), LampaYaniApi.listStats(cardData.yani_id)]).then(function (responses) {
                var rates = normalizeDetailStats(responses[0]);
                var lists = normalizeDetailStats(responses[1]);
                if (!rates.length && !lists.length) return section.remove();
                var grid = section.find('.yani-detail__community-grid');
                rates.slice(0, 10).forEach(function (item) {
                    var label = item.rating || item.value || item.name || item.title;
                    var count = item.count || item.counters || item.total || 0;
                    if (label !== undefined) grid.append($('<div class="yani-detail__community-item"></div>').text(String(label) + ': ' + String(count)));
                });
                lists.slice(0, 8).forEach(function (item) {
                    var label = item.list && (item.list.title || item.list.name) || item.title || item.name || item.status;
                    var count = item.count || item.total || item.counters || 0;
                    if (label) grid.append($('<div class="yani-detail__community-item"></div>').text(String(label) + ': ' + String(count)));
                });
                if (!grid.children().length) section.remove();
            }).catch(function () { section.remove(); });
        }

        function normalizeDetailStats(payload) {
            var response = payload && payload.response ? payload.response : payload;
            return Array.isArray(response) ? response : response && (response.items || response.data || response.rates || response.lists) || [];
        }

        function bindDetailButtonFocus(element) {
            element.on('hover:focus', function () {
                element.siblings('.focus').removeClass('focus');
                element.addClass('focus');
                scroll.update(element, true);
            });
            element.on('hover:blur', function () { element.removeClass('focus'); });
        }

        function bindDetailScrollTargets(container) {
            var targets = container.hasClass && container.hasClass('selector') ? container.add(container.find('.selector')) : container.find('.selector');
            targets.each(function () {
                var element = $(this);
                element.off('hover:focus.yaniDetailScroll').on('hover:focus.yaniDetailScroll', function () {
                    // Bind on the selector itself. In some Lampa builds the
                    // custom hover event does not bubble to the detail root,
                    // which previously allowed focus to leave the viewport
                    // when moving back up through a long page.
                    scroll.update(element, true);
                });
            });
        }

        function loadInlineComments(cardData, container) {
            var commentsTitle = $('<div class="yani-detail__comments-title selector"></div>').text(t('comments_title') + (cardData.yani_comments_count ? ' (' + cardData.yani_comments_count + ')' : ''));
            commentsTitle.on('hover:focus', function () { commentsTitle.addClass('focus'); });
            container.append(commentsTitle);
            var list = $('<div class="yani-detail__comments-list"></div>');
            list.append($('<div class="yani-detail__comments-loading"></div>').text('…'));
            container.append(list);
            bindDetailScrollTargets(container);
            LampaYaniApi.comments(cardData.yani_id, 0).then(function (payload) {
                var comments = LampaYaniApi.normalizeComments(payload);
                list.empty();
                if (!comments.length) {
                    var empty = $('<div class="yani-detail__comments-empty selector"></div>').text(t('comments_empty'));
                    empty.on('hover:focus', function () { empty.addClass('focus'); });
                    list.append(empty);
                    bindDetailScrollTargets(empty);
                    return;
                }
                comments.forEach(function (comment) {
                    var item = commentItem(comment);
                    var row = $('<div class="yani-detail__comment selector"></div>');
                    row.append($('<div class="yani-detail__comment-title"></div>').text(item.title));
                    if (item.subtitle) row.append($('<div class="yani-detail__comment-stats"></div>').text(item.subtitle));
                    row.on('hover:focus', function () { row.addClass('focus'); });
                    row.on('hover:enter click.yaniComment', function () {
                        if (Number(comment.children_count) > 0) commentReplies(comment, 0, [], function () {});
                        else commentsMenu(cardData.yani_id);
                    });
                    list.append(row);
                    bindDetailScrollTargets(row);
                });
            }).catch(function (error) {
                console.error('[YummyAnime Comments]', error);
                var errorRow = $('<div class="yani-detail__comments-error selector"></div>').text(t('comments_error'));
                errorRow.on('hover:focus', function () { errorRow.addClass('focus'); });
                list.empty().append(errorRow);
                bindDetailScrollTargets(errorRow);
            });
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(button, scroll.render()); },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { movePageDown(scroll); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
            setTimeout(function () {
                var first = html.find('.yani-detail__button.selector, .yani-detail__order-item.selector, .yani-detail__comment.selector').first();
                if (first.length) {
                    scroll.update(first, true);
                    Lampa.Controller.collectionFocus(first, scroll.render());
                }
            }, 0);
        };

        this.render = function (js) { return js ? scroll.render(true) : scroll.render(); };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function toggleEpisodeSubscription(card, button) {
        if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('login_required'));
        if (!card || !card.yani_id) return;
        var key = 'yani_subscribed_video_' + card.yani_id;
        var subscribed = Lampa.Storage && Lampa.Storage.get(key, '');
        var videoRequest = subscribed ? Promise.resolve(String(subscribed)) : LampaYaniApi.videos(card.yani_id).then(function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            var videos = Array.isArray(response) ? response : response && (response.videos || response.items) || [];
            videos = videos.filter(function (video) { return video && (video.video_id || video.id); });
            if (!videos.length) throw new Error('No subscribable videos');
            videos.sort(function (a, b) { return Number(b.number || b.index || 0) - Number(a.number || a.index || 0); });
            return String(videos[0].video_id || videos[0].id);
        });
        videoRequest.then(function (videoId) {
            var action = subscribed ? LampaYaniApi.unsubscribeVideo(videoId) : LampaYaniApi.subscribeVideo(videoId);
            return action.then(function () {
                if (Lampa.Storage) {
                    if (subscribed) Lampa.Storage.set(key, '');
                    else Lampa.Storage.set(key, String(videoId));
                }
                button.text(subscribed ? t('subscribe_episodes') : t('unsubscribe_episodes'));
                Lampa.Noty.show(subscribed ? t('subscription_removed') : t('subscription_added'));
            });
        }).catch(function (error) {
            console.error('[YummyAnime] Subscription failed', error);
            Lampa.Noty.show(t('subscription_error'));
        });
    }

    function openVideos(card, resume) {
        if (!card || !card.yani_id) return Lampa.Noty.show(t('no_videos'));
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();

        LampaYaniApi.videos(card.yani_id).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var videos = payload && payload.response ? payload.response : payload;
            videos = (Array.isArray(videos) ? videos : []).filter(function (video) {
                return video && videoSourceUrl(video);
            });
            videos.forEach(function (video) {
                // Keep one normalized field for all player implementations.
                video.iframe_url = videoSourceUrl(video);
            });
            if (!videos.length) return Lampa.Noty.show(t('no_videos'));

            var groups = {};
            videos.forEach(function (video) {
                var data = LampaYaniUiUtils.videoData(video);
                var title = data.dubbing || data.player || t('player');
                var quality = videoQualityLabel(video);
                var key = title + '|' + String(data.player_id || data.player || '') + '|' + quality;
                if (!groups[key]) groups[key] = {title: title, player: data.player || '', quality: quality, source: LampaYaniUiUtils.videoHost(videoSourceUrl(video)), videos: []};
                groups[key].videos.push(video);
            });

            var voices = Object.keys(groups).map(function (key) {
                var group = groups[key];
                return {
                    title: group.title + (group.player && group.player !== group.title ? ' · ' + group.player : ''),
                    subtitle: voiceOptionSubtitle(group),
                    group: group
                };
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
                return enrichEpisodeTitles(card, voices[0].group).then(function () {
                    chooseEpisode(card, voices[0].group);
                });
            }
            Lampa.Select.show({
                title: t('choose_voice'),
                items: voices,
                onFocus: enrichVoiceOptionQuality,
                onSelect: function (item) {
                    rememberPlayer(item.group);
                    enrichEpisodeTitles(card, item.group).then(function () {
                        chooseEpisode(card, item.group);
                    });
                }
            });
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Videos]', error);
            Lampa.Noty.show(t('videos_load_error'));
        });
    }

    function voiceOptionSubtitle(group) {
        return t('video_quality') + ': ' + (group.quality || t('quality_auto')) +
            (group.source ? ' · ' + group.source : '') + ' · ' + group.videos.length + ' ' + t('episodes_short');
    }

    function enrichVoiceOptionQuality(item, target) {
        var group = item && item.group;
        if (!group || group.quality || group.qualityLoading || group.qualityLoaded || !group.videos.length) return;
        var probe = group.videos[0];
        var url = videoSourceUrl(probe);
        if (!url || !window.LampaYaniStreamResolver || !LampaYaniStreamResolver.canResolve(url)) return;
        group.qualityLoading = true;
        LampaYaniStreamResolver.resolve(url, probe).then(function (result) {
            group.qualityLoading = false;
            group.qualityLoaded = true;
            if (!result || !result.url) return;
            probe.yani_stream_url = result.url;
            probe.yani_stream_quality = result.quality || '';
            probe.yani_stream_qualities = result.qualities || null;
            probe.yani_stream_source = result.source || '';
            probe.yani_stream_headers = result.headers || null;
            group.quality = result.quality || group.quality;
            item.subtitle = voiceOptionSubtitle(group);
            $(target).find('.selectbox-item__subtitle').text(item.subtitle);
        }).catch(function (error) {
            group.qualityLoading = false;
            group.qualityLoaded = true;
            console.warn('[YummyAnime] Could not inspect voice quality', error);
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

    function registerSearchSource() {
        if (!Lampa.Search || !Lampa.Search.addSource || window.yummyanime_search_source_ready) return;
        window.yummyanime_search_source_ready = true;

        Lampa.Search.addSource({
            title: 'YummyAnime',
            search: function (params, oncomplite) {
                var query = decodeURIComponent(params && params.query || '').trim();
                if (!query) return oncomplite([]);

                LampaYaniApi.search(query, {limit: 20}).then(function (payload) {
                    var results = LampaYaniApi.normalize(payload).map(toCard);
                    oncomplite(results.length ? [{
                        title: 'YummyAnime',
                        type: 'anime',
                        results: results,
                        total: results.length,
                        total_pages: 1
                    }] : []);
                }).catch(function (error) {
                    console.warn('[YummyAnime] Global search failed', error);
                    oncomplite([]);
                });
            },
            onSelect: function (params, close) {
                close();
                openYummyDetail(params && params.element, false);
            }
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
        // Resolve a real TMDB card before opening Lampa's native detail page.
        // Never call `full` with an absent id: some Lampa builds then request
        // `/movie/undefined` forever.  A YummyAnime detail remains a useful
        // fallback when TMDB has no equivalent title.
        var settled = false;
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();

        function finish(match) {
            if (settled) return;
            settled = true;
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();

            if (!match || !match.card || !isValidNativeId(match.card.id) || !match.method) {
                openYummyDetail(card, true);
                return;
            }

            var nativeCard = match.card;
            nativeCard.source = nativeCard.source || 'tmdb';
            nativeCard.yani_card = card;
            Lampa.Activity.push({
                url: nativeCard.url || '',
                component: 'full',
                id: nativeCard.id,
                method: match.method,
                card: nativeCard,
                source: nativeCard.source
            });
        }

        // Do not leave the UI blocked if a third-party TMDB proxy silently
        // drops a request. The normal request callbacks still win when they
        // finish in time.
        setTimeout(function () { finish(null); }, 9000);
        enrichCardForStandardSearch(card).then(findStandardLampaCard).then(finish).catch(function (error) {
            console.warn('[YummyAnime] Native Lampa card lookup failed', error);
            finish(null);
        });
    }

    function enrichCardForStandardSearch(card) {
        // Catalog responses deliberately stay small.  The detail response
        // contains `other_titles`, including romanised and Japanese names,
        // which TMDB indexes more reliably than a single localised title.
        var id = getYummyId(card);
        if (!id || !LampaYaniApi || !LampaYaniApi.detail) return Promise.resolve(card);

        return LampaYaniApi.detail(id).then(function (payload) {
            var item = payload && payload.response ? payload.response : payload;
            if (!item || typeof item !== 'object') return card;

            var detailed = toCard(item);
            var titles = (card.yani_titles || []).concat(detailed.yani_titles || []);
            card.yani_titles = titles.filter(function (title, index, list) {
                return title && list.indexOf(title) === index;
            });
            card.yani_remote_ids = Object.assign({}, card.yani_remote_ids || {}, detailed.yani_remote_ids || {});
            if (!card.original_title || card.original_title === card.title) card.original_title = detailed.original_title || card.original_title;
            if (!card.release_date) card.release_date = detailed.release_date || '';
            return card;
        }).catch(function (error) {
            // A temporary YummyAnime detail failure must not prevent the
            // existing list-card title from being looked up in Lampa.
            console.warn('[YummyAnime] Could not enrich title aliases', error);
            return card;
        });
    }

    function installUndefinedTmdbGuard() {
        if (!Lampa.Activity || !Lampa.Activity.push || Lampa.Activity.push._yaniUndefinedTmdbGuard) return;

        var originalPush = Lampa.Activity.push;
        function guardedPush(activity) {
            var card = activity && (activity.card || activity.object || activity.data);
            var missingId = !activity || activity.id === undefined || activity.id === null || activity.id === '' || activity.id === 'undefined';
            var isNativeDetail = activity && activity.component === 'full';
            var isYummyCard = card && (card._yani_card || hasYummyCardData(card));

            // A native Lampa detail page cannot open an anime without a TMDB
            // id.  Redirect only our marked cards, leaving all normal Lampa
            // activity navigation untouched.
            if (isNativeDetail && missingId && isYummyCard) {
                var yaniId = getYummyId(card);
                if (yaniId) {
                    console.warn('[YummyAnime] Blocked native TMDB detail with undefined id', yaniId);
                    return originalPush.call(this, {
                        url: 'yani/detail/' + encodeURIComponent(yaniId),
                        title: card.title || card.name || 'YummyAnime',
                        component: 'yani_detail',
                        id: yaniId,
                        yani_id: yaniId,
                        card: card
                    });
                }
            }
            return originalPush.apply(this, arguments);
        }

        guardedPush._yaniUndefinedTmdbGuard = true;
        guardedPush._yaniOriginalPush = originalPush;
        Lampa.Activity.push = guardedPush;
    }

    function openYummyDetail(card, notifyFallback) {
        var id = getYummyId(card);
        if (!id) {
            Lampa.Noty.show(t('no_yummy_match'));
            return;
        }
        card.yani_id = id;
        if (notifyFallback && Lampa.Noty) Lampa.Noty.show(t('lampa_card_fallback'));
        Lampa.Activity.push({
            url: 'yani/detail/' + encodeURIComponent(id),
            title: card.title,
            component: 'yani_detail',
            id: id,
            yani_id: id,
            card: card
        });
    }

    function findStandardLampaCard(card) {
        // Use the same public resolver as Lampa's own search screen. Calling
        // individual API endpoints skipped parts of the active TMDB source
        // configuration on some builds, so YummyAnime titles never matched.
        // Online plugins which work with Cub TMDB Proxy use this source. The
        // proxy may decorate it while leaving Lampa.TMDB untouched, so prefer
        // it and retain the public object as a fallback for newer builds.
        var tmdb = Lampa.Api && Lampa.Api.sources && Lampa.Api.sources.tmdb || Lampa.TMDB;
        if (!tmdb || (!tmdb.search && !tmdb.get)) return Promise.resolve(null);
        var titles = LampaYaniUiUtils.standardSearchTitles(card).filter(function (title, index, list) {
            return title && list.indexOf(title) === index;
        });
        console.info('[YummyAnime] Native TMDB resolve started', {yaniId: getYummyId(card), titles: titles});

        function resolveTitles(searchTitles) {
            // The native-card watchdog is intentionally short. Searching a
            // long alias list one by one meant a slow first alias could keep
            // an exact English/Japanese title from ever being queried. Run
            // the bounded title set together and score the combined results.
            return Promise.all((searchTitles || []).slice(0, 8).map(function (title) {
                return searchTmdbTitle(tmdb, title).catch(function () { return []; });
            })).then(function (rows) {
                var items = [];
                rows.forEach(function (row) { items = items.concat(Array.isArray(row) ? row : []); });
                return bestStandardCard(items, card);
            });
        }

        return resolveTitles(titles).then(function (match) {
            if (match) return match;
            var remoteIds = card.yani_remote_ids || {};
            var malId = remoteIds.myanimelist_id || remoteIds.mal_id;
            if (!malId || !LampaYaniApi.malTitles) return null;
            return LampaYaniApi.malTitles(malId).then(function (malTitles) {
                var known = card.yani_titles || [];
                card.yani_titles = known.concat(malTitles || []).filter(function (title, index, list) {
                    return title && list.indexOf(title) === index;
                });
                // Retry only newly acquired names. Otherwise a long Yummy
                // alias list could consume the eight-query budget first.
                var retryTitles = (malTitles || []).filter(function (title, index, list) {
                    return title && known.indexOf(title) < 0 && list.indexOf(title) === index;
                });
                return resolveTitles(retryTitles);
            }).catch(function (error) {
                console.warn('[YummyAnime] Could not load MyAnimeList title aliases', error);
                return null;
            });
        }).then(function (match) {
            if (match) {
                console.info('[YummyAnime] Native TMDB match found', {
                    id: match.card.id,
                    method: match.method,
                    title: match.card.name || match.card.title || '',
                    source: match.card.source || ''
                });
            } else {
                console.warn('[YummyAnime] Native TMDB resolver found no matching card', {yaniId: getYummyId(card), titles: titles});
            }
            return match;
        });
    }

    function searchTmdbTitle(tmdb, title) {
        if (!title) return Promise.resolve([]);
        // Lampa.TMDB.search waits for movie, TV and person requests together.
        // Some proxy configurations fail only the person request and never
        // reach that aggregate callback.  Resolve the two card endpoints
        // directly first, through the same Lampa TMDB client and credentials.
        if (tmdb.get) {
            return searchTmdbCardEndpoints(tmdb, title).then(function (items) {
                return items.length ? items : searchTmdbAggregate(tmdb, title);
            });
        }
        return searchTmdbAggregate(tmdb, title);
    }

    function searchTmdbCardEndpoints(tmdb, title) {
        return new Promise(function (resolve) {
            var pending = 2;
            var completed = false;
            var items = [];
            var timeout = setTimeout(finish, 6000);

            function finish() {
                if (completed) return;
                completed = true;
                clearTimeout(timeout);
                resolve(items);
            }

            function complete() {
                pending--;
                if (pending <= 0) finish();
            }

            ['tv', 'movie'].forEach(function (method) {
                try {
                    tmdb.get('search/' + method, {query: title, page: 1}, function (response) {
                        var results = response && Array.isArray(response.results) ? response.results : [];
                        results.forEach(function (card) { items.push({card: card, method: method}); });
                        complete();
                    }, complete);
                } catch (error) {
                    console.warn('[YummyAnime] TMDB ' + method + ' search call failed', error);
                    complete();
                }
            });
        });
    }

    function searchTmdbAggregate(tmdb, title) {
        return new Promise(function (resolve) {
            var completed = false;
            var timeout = setTimeout(function () { finish([]); }, 6000);

            function finish(items) {
                if (completed) return;
                completed = true;
                clearTimeout(timeout);
                resolve(items);
            }

            try {
                tmdb.search({query: title, page: 1}, function (groups) {
                    var items = [];
                    (Array.isArray(groups) ? groups : []).forEach(function (group) {
                        var method = group && group.type;
                        if (method !== 'tv' && method !== 'movie') return;
                        (group.results || []).forEach(function (item) {
                            items.push({card: item, method: method});
                        });
                    });
                    finish(items);
                });
            } catch (error) {
                console.warn('[YummyAnime] TMDB search call failed', error);
                finish([]);
            }
        });
    }

    function isValidNativeId(id) {
        return id !== undefined && id !== null && id !== '' && id !== 'undefined' &&
            String(id).match(/^\d+$/) !== null;
    }

    function bestStandardCard(items, yaniCard) {
        var expectedTitles = LampaYaniUiUtils.standardSearchTitles(yaniCard).map(LampaYaniUiUtils.normalizeMatchTitle).filter(Boolean);
        var expectedYear = String(yaniCard.release_date || '').slice(0, 4);
        items.forEach(function (entry) {
            var candidate = entry.card || {};
            var titles = [candidate.title, candidate.name, candidate.original_title, candidate.original_name].map(LampaYaniUiUtils.normalizeMatchTitle).filter(Boolean);
            var exact = titles.some(function (title) { return expectedTitles.indexOf(title) >= 0; });
            var partial = !exact && titles.some(function (title) {
                return expectedTitles.some(function (expected) { return title.indexOf(expected) >= 0 || expected.indexOf(title) >= 0; });
            });
            var candidateYear = String(candidate.release_date || candidate.first_air_date || '').slice(0, 4);
            entry.score = (exact ? 100 : partial ? 40 : 0) + (expectedYear && candidateYear === expectedYear ? 30 : 0);
        });
        items.sort(function (a, b) { return b.score - a.score; });
        if (!items.length || items[0].score < 70 || !isValidNativeId(items[0].card && items[0].card.id)) return null;
        items[0].card.source = items[0].card.source || 'tmdb';
        return items[0];
    }

    function findYummyMatches(movie) {
        movie = movie || {};
        var title = movie.title || movie.name || movie.original_title || movie.original_name || '';
        var year = String(movie.release_date || movie.first_air_date || movie.year || '').slice(0, 4);
        if (!title) return Promise.resolve([]);

        var queries = LampaYaniUiUtils.titleValues(movie);
        if (queries.indexOf(title) < 0) queries.unshift(title);
        return Promise.all(queries.slice(0, 8).map(function (query) {
            return LampaYaniApi.search(query, {limit: 10}).then(function (payload) {
                return LampaYaniApi.normalize(payload).map(toCard);
            }).catch(function () { return []; });
        })).then(function (rows) {
            var cardsById = {};
            rows.forEach(function (cards) { cards.forEach(function (card) {
                var key = String(card.yani_id || card.title);
                if (!cardsById[key]) cardsById[key] = card;
            }); });
            var cards = Object.keys(cardsById).map(function (key) { return cardsById[key]; });
            var expected = LampaYaniUiUtils.normalizeMatchTitle(title);
            cards.forEach(function (card) {
                var titles = card.yani_titles.map(LampaYaniUiUtils.normalizeMatchTitle);
                card._match_score = (titles.indexOf(expected) >= 0 ? 100 : titles.some(function (value) { return value.indexOf(expected) >= 0 || expected.indexOf(value) >= 0; }) ? 40 : 0) + (year && card.release_date === year ? 30 : 0);
            });
            cards.sort(function (a, b) { return b._match_score - a._match_score; });
            // A partial title without a matching year is not sufficient for
            // the native-card integration: it produces false YummyAnime
            // buttons on unrelated live-action titles.
            if (!cards.length || cards[0]._match_score < 70) return [];
            var best = cards[0]._match_score;
            return cards.filter(function (card, index) { return index < 5 && (card._match_score === best || card._match_score >= 70); });
        });
    }

    function isNativeAnimeCard(movie) {
        var ids = movie && (movie.genre_ids || movie.genres_ids || movie.genre_id);
        if (Array.isArray(ids) && ids.some(function (id) { return Number(id) === 16; })) return true; // TMDB: Animation

        var source = movie && (movie.genres || movie.genre || movie.category || movie.categories);
        var values = Array.isArray(source) ? source : source ? [source] : [];
        var names = values.map(function (genre) {
            if (typeof genre === 'string') return genre;
            return genre && (genre.name || genre.title || genre.label) || '';
        }).join(' ').toLowerCase();
        if (/(?:animation|animated|anime|аниме|мультфильм|мультипликац)/.test(names)) return true;

        // Some Lampa builds expose only the numeric TMDB genre ids after the
        // detail is rendered. In that case keep the exact-title resolver as
        // the fallback instead of rejecting an otherwise valid anime.
        return !source && !Array.isArray(ids);
    }

    function movePageDown(scroll) { LampaYaniNavigation.moveDown(scroll); }

    function homeSectionEnabled(key) {
        if (!Lampa.Storage || !Lampa.Storage.get) return true;
        var value = Lampa.Storage.get('yani_section_' + key, true);
        return value !== false && value !== 'false';
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

    function enrichEpisodeTitles(card, group) {
        var malId = card && card.yani_remote_ids && (card.yani_remote_ids.myanimelist_id || card.yani_remote_ids.mal_id);
        if (!malId || !group || group.episodeTitlesLoaded) return Promise.resolve();
        group.episodeTitlesLoaded = true;
        return LampaYaniApi.episodeInfo(malId).then(function (payload) {
            var items = payload && payload.episodes;
            if (!Array.isArray(items)) return;
            var titles = {};
            items.forEach(function (item) {
                var number = Number(item.episodeNumber || item.episode || item.number);
                if (number > 0 && item.title) titles[number] = item.title;
            });
            group.videos.forEach(function (video) {
                var number = Number(video.number || video.index);
                if (titles[number]) video.yani_episode_title = titles[number];
            });
        }).catch(function () {
            // Episode metadata is optional; playback must continue if the helper API is down.
        });
    }

    function launchVideo(card, group, videos, selected) {
        var url = videoSourceUrl(selected);
        if (!url) return Lampa.Noty.show(t('no_videos'));
        var allohaSource = isAllohaUrl(url) || /alloha/i.test(String(group && (group.player || group.title) || ''));
        var resolvedAlloha = String(selected.yani_stream_source || '').toLowerCase() === 'lampac-alloha';
        if (allohaSource && !resolvedAlloha) {
            return launchAllohaPlayer(card, group, selected, url);
        }
        if (!isExternalPlayableUrl(url, selected) && window.LampaYaniStreamResolver && LampaYaniStreamResolver.canResolve(url)) {
            setLoading(true);
            LampaYaniStreamResolver.resolve(url, selected).then(function (result) {
                setLoading(false);
                if (result && result.url) {
                    selected.yani_stream_url = result.url;
                    selected.yani_stream_quality = result.quality || '';
                    selected.yani_stream_qualities = result.qualities || null;
                    selected.yani_stream_source = result.source || '';
                    selected.yani_stream_headers = result.headers || null;
                }
                launchResolvedVideo(card, group, videos, selected, videoSourceUrl(selected) || url);
            }).catch(function (error) {
                setLoading(false);
                console.warn('[YummyAnime] Stream resolve failed', error);
                launchResolvedVideo(card, group, videos, selected, url);
            });
            return;
        }
        launchResolvedVideo(card, group, videos, selected, url);
    }

    function launchResolvedVideo(card, group, videos, selected, url) {
        var title = (card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + (selected.number || selected.index || '?') + ' · ' + group.title;
        rememberPlayback(card, group, selected);
        syncServerProgress(selected);

        var playlist = buildExternalPlaylist(card, videos);
        var current = playlist.filter(function (item) { return item.source === selected; })[0] || {
            title: title,
            url: url,
            time: Number(selected.watched && selected.watched.end_time || 0),
            source: selected,
            headers: videoStreamHeaders(selected),
            quality: videoStreamQualities(selected),
            poster: card.poster || card.img || ''
        };
        if (!isExternalPlayableUrl(current.url, current.source)) {
            showExternalPlaybackOptions(card, {
                url: current.url,
                title: current.title,
                onPlayer: function () {
                    if (openAndroidAppUri(current.url)) return true;
                    return openExternalUri(current.url);
                }
            });
            return;
        }

        if (showDirectPlaybackOptions(card, current, playlist)) {
            return;
        }

        if (openExternalPlayer(current, playlist, card)) {
            return;
        }

        if (playInternalPlayer(current, playlist)) {
            return;
        }

        Lampa.Noty.show(url);
    }

    function launchAllohaPlayer(card, group, selected, url) {
        if (window.LampaYaniLampacResolver && LampaYaniLampacResolver.enabled()) {
            setLoading(true);
            LampaYaniLampacResolver.resolveAlloha(card, selected, group, url).then(function (result) {
                setLoading(false);
                if (!result || !result.url) return blockAllohaPlayback();
                selected.yani_stream_url = result.url;
                selected.yani_stream_quality = result.quality || '';
                selected.yani_stream_qualities = result.qualities || null;
                selected.yani_stream_headers = result.headers || null;
                selected.yani_stream_source = result.source || 'lampac-alloha';
                launchResolvedVideo(card, group, group.videos || [selected], selected, result.url);
            }).catch(function (error) {
                setLoading(false);
                console.warn('[YummyAnime] Lampac Alloha resolve failed; playback blocked', error);
                blockAllohaPlayback();
            });
            return true;
        }
        return blockAllohaPlayback();
    }

    function blockAllohaPlayback() {
        Lampa.Noty.show(t('alloha_direct_required'));
        return true;
    }

    function setLoading(enabled) {
        if (!window.Lampa || !Lampa.Loading) return;
        try {
            if (enabled && Lampa.Loading.start) Lampa.Loading.start();
            if (!enabled && Lampa.Loading.stop) Lampa.Loading.stop();
        } catch (ignore) {}
    }

    function buildExternalPlaylist(card, videos) {
        return (videos || []).map(function (video) {
            var url = videoSourceUrl(video);
            if (!url) return null;
            return {
                title: (card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + (video.number || video.index || '?'),
                url: url,
                time: Number(video.watched && video.watched.end_time || 0),
                source: video,
                headers: videoStreamHeaders(video),
                quality: videoStreamQualities(video),
                poster: card.poster || card.img || ''
            };
        }).filter(Boolean);
    }

    function playInternalDirectVideo(current, playlist) {
        if (!Lampa.Player || !Lampa.Player.play || !Lampa.Player.runas) return false;
        var directPlaylist = (playlist || []).filter(function (item) { return isDirectVideoUrl(item.url); }).map(function (item) {
            return LampaYaniUiUtils.internalPlayerItem({
                title: item.title,
                url: item.url,
                time: item.time,
                quality: item.quality || videoStreamQualities(item.source),
                headers: item.headers || videoStreamHeaders(item.source),
                poster: item.poster || ''
            });
        }).filter(Boolean);
        var directCurrent = directPlaylist.filter(function (item) { return item.url === current.url; })[0] || LampaYaniUiUtils.internalPlayerItem({
            title: current.title,
            url: current.url,
            time: current.time,
            quality: current.quality || videoStreamQualities(current.source),
            headers: current.headers || videoStreamHeaders(current.source),
            poster: current.poster || ''
        });
        if (!directCurrent) return false;
        if (!directPlaylist.length) directPlaylist = [directCurrent];
        try {
            // Lampa.Player.play follows the globally configured player unless
            // the caller explicitly selects the built-in Lampa engine.
            Lampa.Player.runas('lampa');
            Lampa.Player.play(directCurrent);
            if (Lampa.Player.playlist) Lampa.Player.playlist(directPlaylist);
            return true;
        } catch (error) {
            console.warn('[YummyAnime] Internal Lampa player failed to start', error);
            return false;
        }
    }

    function showDirectPlaybackOptions(card, current, playlist) {
        var target = playbackTargetPreference();
        if (target === 'external') return openExternalPlayer(current, playlist, card);
        if (target === 'internal') {
            if (playInternalPlayer(current, playlist)) return true;
            Lampa.Noty.show(t('internal_player_unavailable'));
            return true;
        }
        if (!Lampa.Select || !Lampa.Select.show) return false;
        Lampa.Select.show({
            title: t('choose_playback'),
            items: [
                {title: t('watch_external_player'), subtitle: t('watch_external_player_description'), action: 'external'},
                {title: t('watch_internal_lampa'), subtitle: t('watch_internal_lampa_description'), action: 'internal'}
            ],
            onSelect: function (item) {
                if (item && item.action === 'internal') {
                    if (playInternalPlayer(current, playlist)) return;
                    Lampa.Noty.show(t('internal_player_unavailable'));
                    return;
                }
                if (openExternalPlayer(current, playlist, card)) return;
                if (playInternalPlayer(current, playlist)) return;
                Lampa.Noty.show(current.url);
            }
        });
        return true;
    }

    function playbackTargetPreference() {
        var value = Lampa.Storage && Lampa.Storage.get ? Lampa.Storage.get('yani_playback_target', 'ask') : 'ask';
        return value === 'internal' || value === 'external' ? value : 'ask';
    }

    function openExternalPlayer(current, playlist, card) {
        return openExternalVideo(current.url, current.title, {
            playlist: externalPlayablePlaylist(playlist),
            time: current.time,
            poster: card.poster || card.img || '',
            requireDirect: true,
            source: current.source,
            headers: current.headers || videoStreamHeaders(current.source),
            quality: current.quality || videoStreamQualities(current.source)
        });
    }

    function playInternalPlayer(current, playlist) {
        return isDirectVideoUrl(current && current.url) && playInternalDirectVideo(current, playlist);
    }

    function externalPlayablePlaylist(playlist) {
        return (playlist || []).filter(function (item) { return isExternalPlayableUrl(item.url, item.source); });
    }

    function syncServerProgress(video) {
        if (!LampaYaniAuth.token() || !video || !video.video_id) return;
        LampaYaniApi.syncVideoProgress(video.video_id, video.watched && video.watched.end_time, video.duration).catch(function (error) {
            console.warn('[YummyAnime] Progress sync failed', error);
        });
    }

    function videoSourceUrl(video) {
        if (!video) return '';
        var data = LampaYaniUiUtils.videoData(video);
        return LampaYaniUiUtils.normalizeVideoUrl(video.yani_stream_url || data.yani_stream_url || video.iframe_url || video.url || video.player_url || video.link ||
            data.iframe_url || data.url || data.player_url || data.link);
    }

    function videoStreamHeaders(video) {
        if (!video) return null;
        var data = LampaYaniUiUtils.videoData(video);
        return video.yani_stream_headers || data.yani_stream_headers || null;
    }

    function videoStreamQualities(video) {
        if (!video) return null;
        var data = LampaYaniUiUtils.videoData(video);
        return video.yani_stream_qualities || data.yani_stream_qualities || null;
    }

    function isDirectVideoUrl(url) {
        return /\.(m3u8|mpd|mp4|webm)(?:[?#].*)?$/i.test(String(url || ''));
    }

    function isExternalPlayableUrl(url, source) {
        return isDirectVideoUrl(url) || !!(source && source.yani_stream_url && source.yani_stream_url === url);
    }

    function isKodikUrl(url) {
        return /(^|\/\/)(?:www\.)?kodik\.(?:info|cc|biz|site|com|tv)(?:[/:]|$)/i.test(url || '');
    }

    function isAllohaUrl(url) {
        return /(^|\/\/)(?:www\.)?alloha(?:\.[a-z0-9-]+)+(?::\d+)?(?:[/:]|$)/i.test(url || '');
    }


    function videoQualityLabel(video) {
        var data = LampaYaniUiUtils.videoData(video);
        var values = [video && video.yani_stream_quality, video && video.quality, video && video.resolution, data.quality, data.resolution, videoSourceUrl(video)];
        var best = 0;
        values.forEach(function (value) {
            var text = String(value || '');
            var match = text.match(/(2160|1440|1080|720|576|480|360)\s*p?/i);
            if (match) best = Math.max(best, Number(match[1]));
            if (/4k/i.test(text)) best = Math.max(best, 2160);
        });
        return best >= 2160 ? '4K' : best ? best + 'p' : '';
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
        try {
            var value = Lampa.Storage.get('yani_playback_history', '{}');
            if (value && typeof value === 'object') return value;
            return JSON.parse(value || '{}');
        } catch (error) { return {}; }
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
            time: Number(video.watched && video.watched.end_time || 0),
            player: playerKey(group),
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
        var ids = Object.keys(history).sort(function (a, b) { return Number(history[b].updated_at || 0) - Number(history[a].updated_at || 0); });
        ids.slice(100).forEach(function (id) { delete history[id]; });
        Lampa.Storage.set('yani_playback_history', JSON.stringify(history));
    }

    function episodeOptionTitle(card, video) {
        var number = String(video.number || video.index || '?');
        var parts = [t('episode') + ' ' + number];
        var quality = videoQualityLabel(video);
        if (quality) parts.push(quality);
        if (video.yani_episode_title) parts.push(video.yani_episode_title);
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
        return LampaYaniPlayer.create(object, {sourceUrl: videoSourceUrl, goBack: goBack});
    }

    function LegacyIframePlayer(object) {
        var html = $('<div class="yani-player"></div>');
        var iframe = $('<iframe class="yani-player__iframe" frameborder="0" allowfullscreen></iframe>');

        this.create = function () {
            iframe.attr('src', videoSourceUrl(object));
            iframe.attr('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; payment');
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
                    openGenreCatalog(item.title, item.value);
                }
            });
        }).catch(function () { Lampa.Noty.show(t('genres_load_error')); });
    }

    function genreTitle(genre) {
        return typeof genre === 'string' ? genre : genre && (genre.title || genre.name || genre.label || genre.alias) || '';
    }

    function genreValue(genre) {
        if (typeof genre === 'string') return genre;
        if (!genre) return null;
        var value = genre.value;
        if (value === undefined || value === null || value === '') value = genre.id;
        if (value === undefined || value === null || value === '') value = genre.href;
        if (value === undefined || value === null || value === '') value = genre.alias;
        if (value === undefined || value === null || value === '') value = genre.slug;
        return value === undefined || value === null || value === '' ? null : value;
    }

    function detailGenres(card) {
        var raw = card && (card.yani_genres || card.genres || card.genre) || [];
        if (!Array.isArray(raw)) raw = raw && (raw.items || raw.data || raw.genres) || [];
        var seen = {};
        return raw.filter(function (genre) {
            var title = genreTitle(genre), value = genreValue(genre), key = String(value === null ? title : value);
            if (!title || value === null || seen[key]) return false;
            seen[key] = true;
            return true;
        });
    }

    function openGenreCatalog(title, value) {
        Lampa.Activity.push({url: 'yani/genre/' + encodeURIComponent(value), title: title, component: 'yani_catalog', params: {limit: 30, genres: value}});
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
        item = item || {};
        if (item.anime && typeof item.anime === 'object') {
            var nestedAnime = Object.assign({}, item.anime);
            if (item.user) nestedAnime.user = item.user;
            item = nestedAnime;
        }
        var title = item.title || item.name || item.russian || item.original_title || t('untitled');
        var titles = LampaYaniUiUtils.titleValues(item);
        if (titles.indexOf(title) < 0) titles.unshift(title);
        var image = item.image && typeof item.image === 'object' ? item.image : {};
        var cover = item.cover && typeof item.cover === 'object' ? item.cover : {};
        var poster = typeof item.cover === 'string' ? item.cover : typeof item.image === 'string' ? item.image : item.poster_url ||
            image.large || image.original || image.url || cover.large || cover.original || cover.url || '';
        if (!poster && item.poster) poster = item.poster.fullsize || item.poster.medium || item.poster.original || '';
        if (typeof poster !== 'string') poster = '';
        if (poster.indexOf('//') === 0) poster = 'https:' + poster;
        var rating = typeof item.rating === 'object' ? item.rating.average : item.rating;
        var votes = typeof item.rating === 'object' ? item.rating.counters : item.rating_counters;
        var ratings = extractRatings(item.rating);
        return {
            title: title,
            original_title: item.original_title || item.japanese || title,
            yani_titles: titles,
            poster: poster,
            img: poster,
            release_date: String(item.year || item.release_year || ''),
            vote_average: rating || item.score || item.rating_score || 0,
            vote_count: votes || item.votes || item.vote_count || 0,
            yani_rating: rating || item.score || item.rating_score || 0,
            yani_ratings: ratings,
            yani_media: mediaMeta(item),
            overview: item.description || item.synopsis || '',
            yani_id: item.anime_id || item.animeId || item.id || item._id,
            yani_url: item.anime_url || item.url,
            yani_comments_count: Number(item.comments_count || 0),
            yani_list_id: item.user && item.user.list && item.user.list.list ? Number(item.user.list.list.id) : null,
            yani_is_favorite: Boolean(item.user && item.user.list && item.user.list.is_fav),
            yani_user_rating: Number(item.user && (item.user.rate || item.user.rating || item.user.score) || item.user_rate || 0) || null,
            yani_viewing_order: Array.isArray(item.viewing_order) ? item.viewing_order : [],
            yani_genres: item.genres || item.genre || [],
            yani_type: item.type || null,
            yani_remote_ids: item.remote_ids || {}
        };
    }

    function createViewingOrder(data) {
        var section = $('<div class="yani-detail__order"></div>');
        section.append($('<div class="yani-detail__order-title"></div>').text(t('viewing_order')));
        var list = $('<div class="yani-detail__order-list"></div>');
        data.yani_viewing_order.forEach(function (entry, index) {
            var related = toCard(entry);
            var relation = entry.data && (entry.data.text || entry.data.title) || '';
            var row = $('<div class="yani-detail__order-item selector"></div>');
            row.append($('<span class="yani-detail__order-index"></span>').text((index + 1) + '.'));
            row.append($('<span class="yani-detail__order-name"></span>').text(related.title));
            if (related.release_date) row.append($('<span class="yani-detail__order-year"></span>').text(related.release_date));
            if (relation) row.append($('<span class="yani-detail__order-relation"></span>').text('· ' + relation));
            row.on('hover:focus', function () { row.addClass('focus'); });
            row.on('hover:blur', function () { row.removeClass('focus'); });
            row.on('hover:enter click.yaniOrder', function () { openYummyDetail(related, true); });
            list.append(row);
        });
        section.append(list);
        return section;
    }

    function loadDetailRecommendations(data, container, bindFocus) {
        var section = $('<div class="yani-detail__extra yani-detail__recommendations"><div class="yani-detail__extra-title"></div></div>');
        $('.yani-detail__extra-title', section).text(t('recommendations'));
        var list = $('<div class="yani-detail__recommendations-list"></div>');
        section.append(list);
        container.append(section);
        LampaYaniApi.recommendations(data.yani_id).then(function (payload) {
            var items = LampaYaniApi.normalize(payload).slice(0, 12);
            if (!items.length) return section.remove();
            items.forEach(function (item) {
                var card = toCard(item);
                var row = $('<div class="yani-detail__recommendation selector"></div>');
                var recommendationPoster = $('<img class="yani-detail__recommendation-poster" alt="">').attr('src', card.poster || '');
                LampaYaniMedia.bindPosterFallback(recommendationPoster, card);
                row.append(recommendationPoster);
                row.append($('<div class="yani-detail__recommendation-title"></div>').text(card.title));
                if (card.release_date) row.append($('<div class="yani-detail__recommendation-year"></div>').text(card.release_date));
                row.on('hover:focus', function () { row.addClass('focus'); });
                row.on('hover:blur', function () { row.removeClass('focus'); });
                // Recommendations already originate from YummyAnime. Do not
                // show a misleading Lampa-card fallback message before their
                // direct YummyAnime detail page opens.
                row.on('hover:enter click.yaniRecommendation', function () { openYummyDetail(card, false); });
                list.append(row);
                if (bindFocus) bindFocus(row);
            });
        }).catch(function () { section.remove(); });
    }

    function loadDetailCollections(data, container, bindFocus) {
        var section = $('<div class="yani-detail__extra yani-detail__collections"><div class="yani-detail__extra-title"></div></div>');
        section.find('.yani-detail__extra-title').text(t('collections'));
        var list = $('<div class="yani-detail__collections-list"></div>');
        section.append(list);
        container.append(section);
        LampaYaniApi.collections(data.yani_id, 10, 0).then(function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            var items = Array.isArray(response) ? response : response && (response.items || response.data || response.collections) || [];
            if (!items.length) return section.remove();
            items.forEach(function (collection) {
                var row = $('<div class="yani-detail__collection selector"></div>');
                row.append($('<div class="yani-detail__collection-title"></div>').text(collection.title || collection.name || t('collection')));
                if (collection.description) row.append($('<div class="yani-detail__collection-description"></div>').text(cleanCommentText(collection.description)));
                var animes = Array.isArray(collection.animes) ? collection.animes : [];
                if (animes.length) row.append($('<div class="yani-detail__collection-count"></div>').text(animes.length + ' ' + t('anime_count')));
                row.on('hover:focus', function () { row.addClass('focus'); });
                row.on('hover:blur', function () { row.removeClass('focus'); });
                row.on('hover:enter click.yaniCollection', function () {
                    if (!animes.length) return;
                    Lampa.Select.show({title: collection.title || t('collection'), items: animes.map(function (item) {
                        var card = toCard(item);
                        return {title: card.title, card: card};
                    }), onSelect: function (item) { openYummyDetail(item.card, true); }});
                });
                list.append(row);
                if (bindFocus) bindFocus(row);
            });
        }).catch(function () { section.remove(); });
    }

    function openTrailers(card) {
        if (!card || !card.yani_id) return;
        if (Lampa.Select && Lampa.Select.show) {
            legacyOpenTrailers(card);
            return;
        }
        Lampa.Activity.push({
            url: 'yani/trailers/' + encodeURIComponent(card.yani_id),
            title: t('trailers'),
            component: 'yani_trailers',
            card: card
        });
    }

    function TrailerList(object) {
        var card = object.card || {};
        var html = $('<div class="yani-trailers"></div>');
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        var last;

        scroll.minus();

        this.create = function () {
            var self = this;
            this.activity.loader(true);
            LampaYaniApi.trailers(card.yani_id).then(function (payload) {
                var items = payload && payload.response ? payload.response : payload;
                items = Array.isArray(items) ? items.filter(function (trailer) { return trailerUrl(trailer); }) : [];
                render(items);
                self.activity.loader(false);
                self.activity.toggle();
            }).catch(function (error) {
                console.error('[YummyAnime] Trailers failed', error);
                html.append($('<div class="yani-trailers__empty selector"></div>').text(t('catalog_load_error')));
                scroll.append(html);
                self.activity.loader(false);
                self.activity.toggle();
            });
        };

        function render(items) {
            if (!items.length) {
                html.append($('<div class="yani-trailers__empty selector"></div>').text(t('no_videos')));
                scroll.append(html);
                return;
            }
            var list = $('<div class="yani-trailers__list"></div>');
            items.forEach(function (trailer, index) {
                var url = trailerUrl(trailer);
                var title = trailer.title || trailer.name || ('Trailer ' + (index + 1));
                var row = $('<div class="yani-trailers__item selector"></div>');
                row.append($('<div class="yani-trailers__icon"></div>').html(isYouTubeTrailer(url) ? youtubeLogoSvg() : externalVideoIcon()));
                row.append($('<div class="yani-trailers__body"></div>').append($('<div class="yani-trailers__title"></div>').text(title)).append($('<div class="yani-trailers__host"></div>').text(trailerHostLabel(url))));
                row.on('hover:focus', function () {
                    last = row[0];
                    row.addClass('focus');
                    scroll.update(row, true);
                });
                row.on('hover:blur', function () { row.removeClass('focus'); });
                row.on('hover:enter click.yaniTrailer', function () { openTrailer(url, title); });
                list.append(row);
            });
            html.append(list);
            scroll.append(html);
        }

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || scroll.render().find('.selector')[0] || false, scroll.render());
                },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { if (Navigator.canmove('down')) Navigator.move('down'); else scroll.wheel(300); },
                back: goBack
            });
            Lampa.Controller.toggle('content');
        };

        this.render = function (js) { return js ? scroll.render()[0] : scroll.render(); };
        this.destroy = function () { scroll.destroy(); html.remove(); };
    }

    function trailerUrl(trailer) {
        return LampaYaniUiUtils.normalizeVideoUrl(trailer && (trailer.iframe_url || trailer.url || trailer.video_url || trailer.link || trailer.src));
    }

    function trailerHostLabel(url) {
        var host = LampaYaniUiUtils.videoHost(url);
        if (!host) return t('trailers');
        return host.replace(/^m\./, '').replace(/^youtu\.be$/, 'youtube.com');
    }

    function legacyOpenTrailers(card) {
        if (!card || !card.yani_id) return;
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        LampaYaniApi.trailers(card.yani_id).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var items = payload && payload.response ? payload.response : payload;
            items = Array.isArray(items) ? items.map(function (trailer, index) {
                var url = trailerUrl(trailer);
                return {
                    title: trailer.title || trailer.name || ('Trailer ' + (index + 1)),
                    url: url,
                    // Lampa Select renders item icons next to the title.
                    // Keep it local so the mark is available offline too.
                    icon: isYouTubeTrailer(url) ? youtubeLogoDataUri() : null
                };
            }).filter(function (item) { return item.url; }) : [];
            if (!items.length) {
                Lampa.Noty.show(t('no_videos'));
                return;
            }
            if (items.length === 1) {
                openTrailer(items[0].url, items[0].title);
                return;
            }
            Lampa.Select.show({
                title: t('trailers'),
                items: items,
                onSelect: function (item) { openTrailer(item.url, item.title); }
            });
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime] Trailers failed', error);
            Lampa.Noty.show(t('catalog_load_error'));
        });
    }

    function isYouTubeTrailer(url) {
        return /(^|\/\/)(?:www\.)?(?:youtube\.com|youtube-nocookie\.com|youtu\.be)\//i.test(String(url || ''));
    }

    function youtubeLogoDataUri() {
        return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff0033" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"/><path fill="#fff" d="m9.6 15.8 6.3-3.8-6.3-3.8v7.6Z"/></svg>');
    }

    function youtubeLogoSvg() {
        return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#ff0033" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"/><path fill="#fff" d="m9.6 15.8 6.3-3.8-6.3-3.8v7.6Z"/></svg>';
    }

    function externalVideoIcon() {
        return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"/></svg>';
    }

    function openTrailer(url, title) {
        url = LampaYaniUiUtils.normalizeVideoUrl(url);
        if (!url) return;
        // Trailers are normally YouTube links. An iframe inside Lampa cannot
        // reliably play them on Android TV, while External lets Android route
        // the URL to the installed YouTube (or another matching) application.
        if (openExternalVideo(url, title, {youtubeIntent: true})) return;
        Lampa.Noty.show(url);
    }

    function openExternalVideo(url, title, options) {
        options = options || {};
        url = options.youtubeIntent ? externalTrailerUrl(url) : LampaYaniUiUtils.normalizeVideoUrl(url);
        if (options.requireDirect && !isExternalPlayableUrl(url, options.source)) return false;
        var intentUrl = options.youtubeIntent ? youtubeIntentUrl(url) : '';
        var externalUrl = intentUrl || url;
        var playlist = Array.isArray(options.playlist) ? options.playlist.map(function (item) {
            return {
                title: cleanPlaybackTitle(item.title),
                url: item.url,
                time: Number(item.time || 0),
                headers: item.headers || null,
                quality: item.quality || null
            };
        }).filter(function (item) { return item.url; }) : [];
        var payload = {
            title: cleanPlaybackTitle(title || 'YummyAnime'),
            url: url,
            poster: options.poster || '',
            time: Number(options.time || 0),
            playlist: playlist,
            headers: options.headers || null,
            quality: options.quality || null
        };
        if (!options.youtubeIntent) {
            if (tryExternalOpen('Lampa.Android.openPlayer', function () {
                if (!Lampa.Android || !Lampa.Android.openPlayer) return false;
                prepareExternalRestore();
                Lampa.Android.openPlayer(url, payload);
                return true;
            })) return true;
            if (tryExternalOpen('Android.openPlayer', function () {
                if (!window.Android || typeof Android.openPlayer !== 'function') return false;
                prepareExternalRestore();
                Android.openPlayer(url, JSON.stringify(payload));
                return true;
            })) return true;
            if (tryExternalOpen('AndroidJS.openPlayer', function () {
                if (!window.AndroidJS || typeof AndroidJS.openPlayer !== 'function') return false;
                prepareExternalRestore();
                AndroidJS.openPlayer(url, JSON.stringify(payload));
                return true;
            })) return true;
        }
        if (options.youtubeIntent) {
            if (openAndroidAppUri(externalUrl)) return true;
            if (url !== externalUrl && openAndroidAppUri(url)) return true;
        }
        return openExternalUri(externalUrl);
    }

    function openExternalUri(externalUrl) {
        if (!externalUrl) return false;
        if (tryExternalOpen('Lampa.External.open', function () {
            if (!Lampa.External || !Lampa.External.open) return false;
            prepareExternalRestore();
            Lampa.External.open(externalUrl);
            return true;
        })) return true;
        if (tryExternalOpen('Lampa.Utils.open', function () {
            if (!Lampa.Utils || !Lampa.Utils.open) return false;
            prepareExternalRestore();
            Lampa.Utils.open(externalUrl);
            return true;
        })) return true;
        if (tryExternalOpen('navigator.app.loadUrl', function () {
            if (!window.navigator || !navigator.app || !navigator.app.loadUrl) return false;
            prepareExternalRestore();
            navigator.app.loadUrl(externalUrl, {openExternal: true});
            return true;
        })) return true;
        if (tryExternalOpen('window.open', function () {
            if (!window.open) return false;
            prepareExternalRestore();
            window.open(externalUrl, '_system');
            return true;
        })) return true;
        return false;
    }

    function yummyTvEnabled() {
        if (!Lampa.Storage || !Lampa.Storage.get) return false;
        var value = Lampa.Storage.get('yani_yummytv_enabled', false);
        return value === true || value === 'true' || value === 1 || value === '1';
    }

    function yummyTvAnimeId(card) {
        return card && (card.yani_id || card.anime_id || card.yummy_id);
    }

    function openYummyTv(card) {
        if (!yummyTvEnabled()) return false;
        var url = LampaYaniUiUtils.yummyTvDetailsUrl(yummyTvAnimeId(card));
        if (!url) {
            Lampa.Noty.show(t('yummytv_id_missing'));
            return false;
        }
        if (openAndroidAppUri(url)) return true;
        Lampa.Noty.show(t('yummytv_open_failed'));
        return false;
    }

    function openAndroidAppUri(url) {
        if (!url) return false;
        if (tryExternalOpen('Lampa.Android.openBrowser', function () {
            if (!Lampa.Android || typeof Lampa.Android.openBrowser !== 'function') return false;
            prepareExternalRestore();
            Lampa.Android.openBrowser(url);
            return true;
        })) return true;
        if (tryExternalOpen('AndroidJS.openBrowser', function () {
            if (!window.AndroidJS || typeof AndroidJS.openBrowser !== 'function') return false;
            prepareExternalRestore();
            AndroidJS.openBrowser(url);
            return true;
        })) return true;
        if (tryExternalOpen('Android.openBrowser', function () {
            if (!window.Android || typeof Android.openBrowser !== 'function') return false;
            prepareExternalRestore();
            Android.openBrowser(url);
            return true;
        })) return true;
        return false;
    }

    function prepareExternalRestore() {
        installExternalRestoreHooks();
        externalRestoreState.pending = true;
        externalRestoreState.openedAt = Date.now();
        externalRestoreState.controller = currentControllerName() || 'content';
        externalRestoreState.element = document.querySelector('.selector.focus') || document.querySelector('.selector');
    }

    function installExternalRestoreHooks() {
        if (externalRestoreState.installed) return;
        externalRestoreState.installed = true;
        window.addEventListener('focus', restoreExternalFocus, false);
        window.addEventListener('pageshow', restoreExternalFocus, false);
        document.addEventListener('resume', restoreExternalFocus, false);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) restoreExternalFocus();
        }, false);
    }

    function currentControllerName() {
        try {
            var enabled = Lampa.Controller && Lampa.Controller.enabled ? Lampa.Controller.enabled() : null;
            return enabled && enabled.name || '';
        } catch (ignore) {
            return '';
        }
    }

    function restoreExternalFocus() {
        if (!externalRestoreState.pending) return;
        var delay = Math.max(0, 600 - (Date.now() - externalRestoreState.openedAt));
        setTimeout(function () {
            if (!externalRestoreState.pending) return;
            externalRestoreState.pending = false;
            try {
                var controller = externalRestoreState.controller || 'content';
                if (Lampa.Controller && Lampa.Controller.toggle) Lampa.Controller.toggle(controller);
                var element = externalRestoreState.element;
                if (!element || !document.documentElement.contains(element)) {
                    element = document.querySelector('.selector.focus') || document.querySelector('.selector');
                }
                if (element && Lampa.Controller && Lampa.Controller.collectionFocus) {
                    Lampa.Controller.collectionFocus(element, $(element).closest('.scroll, .yani-detail, .yani-home, body'));
                }
            } catch (error) {
                console.warn('[YummyAnime] Could not restore Lampa focus after external player', error);
            }
        }, delay);
    }

    function showExternalPlaybackOptions(card, options) {
        options = options || {};
        var items = [];
        var yummyTvUrl = yummyTvEnabled() ? LampaYaniUiUtils.yummyTvDetailsUrl(yummyTvAnimeId(card)) : '';
        if (options.url || options.onPlayer) {
            items.push({title: t('watch_in_player'), subtitle: t('watch_in_player_description'), action: 'player'});
        }
        if (yummyTvUrl) items.push({title: t('watch_in_yummytv'), subtitle: t('watch_in_yummytv_description'), action: 'yummytv'});
        if (!items.length || !Lampa.Select || !Lampa.Select.show) {
            if (options.onPlayer && options.onPlayer()) return true;
            if (yummyTvUrl && openYummyTv(card)) return true;
            Lampa.Noty.show(t('external_stream_unavailable'));
            return false;
        }
        Lampa.Select.show({
            title: t('choose_playback'),
            items: items,
            onSelect: function (item) {
                if (item && item.action === 'player') {
                    if (options.onPlayer && options.onPlayer()) return;
                    if (options.url && openExternalUri(options.url)) return;
                    Lampa.Noty.show(t('external_stream_unavailable'));
                    return;
                }
                if (item && item.action === 'yummytv') openYummyTv(card);
            }
        });
        return true;
    }

    function openTitlePlaybackOptions(card) {
        var yummyTvUrl = yummyTvEnabled() ? LampaYaniUiUtils.yummyTvDetailsUrl(yummyTvAnimeId(card)) : '';
        if (!yummyTvUrl || !Lampa.Select || !Lampa.Select.show) {
            openVideos(card, false);
            return;
        }

        Lampa.Select.show({
            title: t('choose_playback'),
            items: [
                {title: t('watch_in_player'), subtitle: t('watch_in_player_description'), action: 'player'},
                {title: t('watch_in_yummytv'), subtitle: t('watch_in_yummytv_description'), action: 'yummytv'}
            ],
            onSelect: function (item) {
                if (item && item.action === 'yummytv') {
                    openYummyTv(card);
                    return;
                }
                openVideos(card, false);
            }
        });
    }

    function tryExternalOpen(name, callback) {
        try {
            return !!callback();
        } catch (error) {
            console.warn('[YummyAnime] Could not open trailer through ' + name, error);
            return false;
        }
    }

    function cleanPlaybackTitle(value) {
        return String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    }

    function externalTrailerUrl(url) {
        var id = youtubeVideoId(url);
        return id ? 'https://www.youtube.com/watch?v=' + encodeURIComponent(id) : url;
    }

    function youtubeVideoId(url) {
        url = String(url || '');
        try {
            var parsed = new URL(url);
            var host = parsed.hostname.replace(/^www\./, '').replace(/^m\./, '');
            if (host === 'youtu.be') return parsed.pathname.replace(/^\/+/, '').split('/')[0] || '';
            if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
                if (parsed.searchParams.get('v')) return parsed.searchParams.get('v');
                var match = parsed.pathname.match(/\/(?:embed|shorts|v)\/([^/?#]+)/i);
                if (match) return match[1];
            }
        } catch (error) {
            var fallback = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?.*?[?&]v=|embed\/|shorts\/|v\/))([^&#?/]+)/i);
            return fallback ? fallback[1] : '';
        }
        return '';
    }

    function youtubeIntentUrl(url) {
        var id = youtubeVideoId(url);
        if (!id || !Lampa.Platform || !Lampa.Platform.is || !Lampa.Platform.is('android')) return '';
        var watch = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
        return 'intent://www.youtube.com/watch?v=' + encodeURIComponent(id) + '#Intent;scheme=https;package=com.google.android.youtube;S.browser_fallback_url=' + encodeURIComponent(watch) + ';end';
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
        var data = LampaYaniUiUtils.videoData(video);
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
            param: {name: 'yani_about', type: 'button'},
            field: {
                name: t('version_name'),
                description: t('version_label') + ' ' + LampaYaniConfig.version + ' · ' + t('unofficial_extension') + ' · ' + t('website_description') + ': ' + yummyWebsiteUrl()
            },
            onChange: openYummyWebsite
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_usage_policy', type: 'button'},
            field: {name: t('usage_policy_title'), description: t('usage_policy_settings_description')},
            onChange: showUsagePolicy
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_language', type: 'select', values: {ru: 'Русский', uk: 'Українська', en: 'English'}, default: 'ru'},
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
            param: {
                name: 'yani_playback_target',
                type: 'select',
                values: {ask: t('playback_target_ask'), external: t('playback_target_external'), internal: t('playback_target_internal')},
                default: 'ask'
            },
            field: {name: t('playback_target'), description: t('playback_target_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_playback_services_title', type: 'title'},
            field: {name: t('playback_services')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_yummytv_enabled', type: 'trigger', default: false},
            field: {name: t('yummytv_integration'), description: t('yummytv_integration_description')}
        });

        var lampacUrl = window.LampaYaniLampacResolver ? LampaYaniLampacResolver.baseUrl() : '';
        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_lampac_server', type: 'button'},
            field: {
                name: t('lampac_server'),
                description: t('lampac_server_description') + ': ' + (lampacUrl || t('not_configured'))
            },
            onChange: editLampacServer
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_clear_playback_history', type: 'button'},
            field: {name: t('clear_history'), description: t('clear_history_description')},
            onChange: function () {
                if (Lampa.Storage) Lampa.Storage.set('yani_playback_history', '{}');
                Lampa.Noty.show(t('history_cleared'));
            }
        });

        var authorized = Boolean(LampaYaniAuth.token());
        if (authorized) {
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_account_state', type: 'button'},
                field: {name: t('authorized') + ': ' + authDisplayName(), description: t('auth_manage_description')},
                onChange: openSettingsLogin
            });
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_account_refresh', type: 'button'},
                field: {name: t('refresh_name'), description: t('refresh_description')},
                onChange: function () {
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
                param: {name: 'yani_account_logout', type: 'button'},
                field: {name: t('logout_name'), description: t('logout_description')},
                onChange: function () {
                    LampaYaniAuth.logout().then(function () {
                        Lampa.Noty.show(t('logged_out'));
                    }).catch(function (error) {
                        console.error('[YummyAnime]', error);
                        Lampa.Noty.show(t('token_removed'));
                    });
                }
            });
        } else {
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_account_login', type: 'button'},
                field: {name: t('login_name'), description: t('login_description')},
                onChange: openSettingsLogin
            });
        }

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_api_check', type: 'button'},
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

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_lampa_card_title', type: 'title'},
            field: {name: t('lampa_card_integration')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_lampa_card_rating', type: 'trigger', default: true},
            field: {name: t('lampa_card_rating'), description: t('lampa_card_rating_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_lampa_card_button', type: 'trigger', default: true},
            field: {name: t('lampa_card_button'), description: t('lampa_card_button_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_home_sections_title', type: 'title'},
            field: {name: t('home_sections')}
        });

        [
            ['catalog', 'catalog'],
            ['genres', 'genres'],
            ['search', 'search'],
            ['schedule', 'schedule'],
            ['continue_watching', 'continue_watching'],
            ['status', 'status'],
            ['top_rated', 'top_rated'],
            ['for_you', 'for_you'],
            ['updates', 'updates'],
            ['account', 'account']
        ].forEach(function (section) {
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_section_' + section[0], type: 'trigger', default: true},
                field: {name: t(section[1]), description: t('section_visibility_description')}
            });
        });
    }

    function yummyWebsiteUrl() {
        var language = LampaYaniI18n.getLanguage();
        return language === 'en' || language === 'uk' ? 'https://en.yummyani.me/' : 'https://ru.yummyani.me/';
    }

    function yummyTitleUrl(card) {
        var slug = card && card.yani_url;
        if (!slug || typeof slug !== 'string') return '';
        if (/^https?:\/\//i.test(slug)) return slug;
        slug = slug.replace(/^\/+/, '').replace(/^catalog\/item\//i, '');
        return yummyWebsiteUrl().replace(/\/$/, '') + '/catalog/item/' + encodeURIComponent(slug);
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
        Lampa.Activity.push({
            url: 'yani/auth',
            title: 'YummyAnime · ' + t('auth_title'),
            component: 'yani_auth'
        });
    }

    function authDisplayName() {
        var account = LampaYaniAuth.get();
        return account.display_name || account.login || t('user');
    }

    function editLampacServer() {
        if (!window.LampaYaniLampacResolver) return Lampa.Noty.show(t('lampac_unavailable'));
        showYummyInput({
            title: t('lampac_server_prompt'),
            value: LampaYaniLampacResolver.baseUrl(),
            nosave: true
        }, function (value) {
            value = String(value || '').trim();
            var saved = LampaYaniLampacResolver.setBaseUrl(value);
            if (value && !saved) return Lampa.Noty.show(t('lampac_server_invalid'));
            Lampa.Noty.show(saved ? t('lampac_server_saved') : t('lampac_server_disabled'));
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
            // A native Lampa card may be a film or a live-action series with
            // an accidentally similar title. Do not decorate those cards
            // with a YummyAnime action.
            if (!isNativeAnimeCard(movie)) return;

            var matchRequest = movie.yani_card ? Promise.resolve([movie.yani_card]) : findYummyMatches(movie);
            matchRequest.then(function (matches) {
                var anime = matches[0];
                if (!anime) return;
                var render = event.object.activity.render();
                var line = $('.full-start-new__rate-line, .full-start__rate-line', render).first();
                // Lampa already owns the usual TMDB/IMDb/Kinopoisk rating
                // line, and rating plugins may add MAL/Shikimori too.  The
                // native card needs one clear YummyAnime marker, not a second
                // competing list of the same services.
                nativeLampaRatings(anime.yani_ratings || []).forEach(function (rating) {
                    var className = 'rate--yummyanime-' + rating.key;
                    if ($('.' + className, render).length) return;
                    var block = $('<div class="full-start__rate ' + className + '"><div>' + formatRating(rating.value) + '</div><div class="yani-full-rating-logo" title="' + rating.title + '" aria-label="' + rating.title + '">' + yummyRatingLogo() + '</div></div>');
                    line.append(block);
                });
                addYummyFullButton(render, movie, anime);
            }).catch(function () {});
        });
    }

    function nativeLampaRatings(ratings) {
        if (!lampaCardIntegrationEnabled('rating')) return [];
        return (ratings || []).filter(function (rating) {
            return rating && rating.key === 'yummy' && Number(rating.value) > 0;
        });
    }

    function lampaCardIntegrationEnabled(feature) {
        if (!Lampa.Storage || !Lampa.Storage.get) return true;
        var value = Lampa.Storage.get('yani_lampa_card_' + feature, true);
        return value !== false && value !== 'false';
    }

    function yummyRatingLogo() {
        return '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M18.45 0H1.55A1.55 1.55 0 000 1.55v16.9A1.54 1.54 0 001.55 20h16.9A1.55 1.55 0 0020 18.45V1.55A1.54 1.54 0 0018.45 0Zm-2.83 5.93-2.1 2.66-2.3-5.43a6.95 6.95 0 014.4 2.77Zm-2.9 6.57h-4l2.03-4.8 1.98 4.8Zm-2.37-9.34L7.8 9.06 4.87 5.33c.64-.7 1.4-1.26 2.27-1.65a8.18 8.18 0 013.2-.52ZM3.57 7.39l3.2 4.06-1.56 3.58A6.96 6.96 0 013.57 7.39Zm6.57 9.56c-1.05.01-2.1-.2-3.05-.65l.76-1.8h5.7l.49 1.15a6.93 6.93 0 01-3.9 1.3Zm6.8-7.07a7.8 7.8 0 01-1.17 4L14.55 11l2.17-2.77c.14.54.21 1.1.23 1.65Z"/></svg>';
    }

    function addYummyFullButton(render, movie, anime) {
        if (!lampaCardIntegrationEnabled('button')) return;
        var container = $('.full-start-new__buttons', render);
        if (!container.length) container = $('.full-start__buttons', render);
        if (!container.length) return;

        if (!$('.view--yummyanime', render).length) {
            var button = $('<div class="full-start__button selector view--yummyanime" title="YummyAnime" aria-label="YummyAnime"><img class="view--yummyanime__icon" alt="YummyAnime" src="https://andrewcodeman.github.io/lampa_yani/assets/yummyanime.svg"></div>');
            button.on('hover:enter click.yaniFullDetail', function () { openYummyDetail(anime, false); });
            container.prepend(button);
        }
    }
}(window));

    if (window.Lampa && Lampa.Manifest && window.LampaYaniConfig) {
        Lampa.Manifest.plugins = {
            type: 'other',
            version: LampaYaniConfig.version,
            name: 'YummyAnime',
            author: 'Andrew Codeman',
            description: 'YummyAnime catalog, ratings, lists and account integration',
            component: 'yani_home'
        };
    }
    try {
        window.LampaYani.register();
    } catch (error) {
        console.error('[YummyAnime] Plugin initialization failed', error);
    }
}

if (!window.plugin_yummy_anime_ready) pluginYummyAnime();
