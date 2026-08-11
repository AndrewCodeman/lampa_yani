function pluginYummyAnime() {
    if (window.plugin_yummy_anime_ready) return;
    window.plugin_yummy_anime_ready = true;

    var style = document.createElement('style');
    style.textContent = ".yani-catalog {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 1rem;\n}\n\n.yani-catalog-view {\n    position: relative;\n    height: 100%;\n}\n\n.yani-catalog-toolbar {\n    position: absolute;\n    z-index: 12;\n    right: .8em;\n    top: 50%;\n    margin: 0;\n    padding: .36em;\n    border: .08em solid rgba(255,255,255,.13);\n    border-radius: 1.1em;\n    background: linear-gradient(135deg, rgba(22,25,36,.9), rgba(48,37,52,.82));\n    box-shadow: 0 .65em 1.8em rgba(0,0,0,.2), inset 0 .08em 0 rgba(255,255,255,.08);\n    backdrop-filter: blur(1em);\n    transform: translateY(-50%);\n}\n\n.yani-catalog-toolbar__track {\n    display: flex;\n    flex-direction: column;\n    gap: .3em;\n    overflow: visible;\n    scrollbar-width: none;\n}\n\n.yani-catalog-toolbar__track::-webkit-scrollbar {\n    display: none;\n}\n\n.yani-catalog-sort {\n    position: relative;\n    flex: 0 0 auto;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 2.65em;\n    height: 2.65em;\n    padding: 0;\n    border: .08em solid transparent;\n    border-radius: .72em;\n    color: rgba(255,255,255,.74);\n    background: rgba(255,255,255,.055);\n    transition: color .16s ease, background .16s ease, border-color .16s ease, transform .16s ease;\n}\n\n.yani-catalog-sort__icon {\n    width: 1.2em;\n    height: 1.2em;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.yani-catalog-sort__icon svg {\n    width: 100%;\n    height: 100%;\n    fill: none;\n    stroke: currentColor;\n    stroke-width: 1.7;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n}\n\n.yani-catalog-sort--active {\n    color: #fff;\n    border-color: rgba(239,100,112,.55);\n    background: linear-gradient(135deg, rgba(239,100,112,.65), rgba(184,64,104,.48));\n}\n\n.yani-catalog-filter__count {\n    position: absolute;\n    right: -.22em;\n    top: -.28em;\n    min-width: 1.25em;\n    height: 1.25em;\n    padding: 0 .24em;\n    border: .12em solid rgba(25,24,32,.9);\n    border-radius: 2em;\n    color: #fff;\n    background: #ef6470;\n    font-size: .68em;\n    font-weight: 700;\n    line-height: 1.05em;\n    text-align: center;\n}\n\n.yani-catalog-sort.focus {\n    color: #17151c;\n    border-color: #fff;\n    background: #fff;\n    box-shadow: 0 0 0 .16em rgba(255,255,255,.2), 0 .45em 1.1em rgba(0,0,0,.24);\n    transform: translateX(-.08em);\n}\n\n.yani-catalog-sort__title {\n    display: none;\n    position: absolute;\n    right: calc(100% + .75em);\n    top: 50%;\n    padding: .45em .7em;\n    border-radius: .55em;\n    color: #fff;\n    background: rgba(20,19,26,.94);\n    box-shadow: 0 .4em 1em rgba(0,0,0,.28);\n    transform: translateY(-50%);\n    white-space: nowrap;\n    font-size: .92em;\n    font-weight: 600;\n}\n\n.yani-catalog-sort.focus .yani-catalog-sort__title {\n    display: block;\n}\n\n.yani-catalog-top {\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 2.65em;\n    height: 2.65em;\n    margin-bottom: .28em;\n    padding: 0;\n    border: .08em solid rgba(255,255,255,.2);\n    border-radius: .78em;\n    color: #fff;\n    background: rgba(25,24,32,.82);\n    box-shadow: 0 .7em 1.8em rgba(0,0,0,.28);\n    backdrop-filter: blur(.8em);\n}\n\n.yani-catalog-top.focus {\n    color: #17151c;\n    background: #fff;\n    border-color: #fff;\n}\n\n.yani-catalog-top__icon {\n    font-size: 1.25em;\n    line-height: 1;\n}\n\n.yani-catalog-top__title {\n    display: none;\n    position: absolute;\n    right: calc(100% + .75em);\n    top: 50%;\n    padding: .45em .7em;\n    border-radius: .55em;\n    color: #fff;\n    background: rgba(20,19,26,.94);\n    box-shadow: 0 .4em 1em rgba(0,0,0,.28);\n    transform: translateY(-50%);\n    white-space: nowrap;\n    font-size: .9em;\n    font-weight: 600;\n}\n\n.yani-catalog-top.focus .yani-catalog-top__title {\n    display: block;\n}\n\n@media (max-width: 700px) {\n    .yani-catalog-toolbar {\n        position: relative;\n        right: auto;\n        top: auto;\n        margin: 0 .85em .65em;\n        transform: none;\n    }\n    .yani-catalog-toolbar__track {\n        flex-direction: row;\n        overflow-x: auto;\n    }\n    .yani-catalog-sort,\n    .yani-catalog-top {\n        gap: .45em;\n        width: auto;\n        height: 2.45em;\n        min-width: 2.45em;\n        margin: 0;\n        padding: 0 .65em;\n    }\n    .yani-catalog-sort__title,\n    .yani-catalog-top__title {\n        display: block;\n        position: static;\n        padding: 0;\n        color: inherit;\n        background: none;\n        box-shadow: none;\n        transform: none;\n    }\n}\n\n.icon-yani {\n    width: 2.4em;\n    height: 2.4em;\n    background: center / contain no-repeat url('./assets/yummyanime.svg');\n}\n\n.yani-home {\n    position: relative;\n    min-height: calc(100vh - 5.5em);\n    overflow: hidden;\n    isolation: isolate;\n}\n\n.yani-home__waves {\n    position: absolute;\n    z-index: -1;\n    inset: 0;\n    overflow: hidden;\n    pointer-events: none;\n    opacity: .9;\n}\n\n.yani-home__waves::before {\n    content: '';\n    position: absolute;\n    width: 42em;\n    height: 42em;\n    left: -12em;\n    top: -19em;\n    border-radius: 44% 56% 63% 37% / 38% 42% 58% 62%;\n    background: radial-gradient(circle at 62% 68%, rgba(239,100,112,.22), rgba(145,50,104,.08) 43%, transparent 69%);\n    transform: rotate(-14deg);\n}\n\n.yani-home__waves::after {\n    content: '';\n    position: absolute;\n    width: 52em;\n    height: 34em;\n    right: -18em;\n    bottom: -17em;\n    border-radius: 61% 39% 35% 65% / 57% 64% 36% 43%;\n    background: radial-gradient(circle at 25% 28%, rgba(73,155,255,.16), rgba(92,75,180,.06) 47%, transparent 70%);\n    transform: rotate(11deg);\n}\n\n.yani-home__waves svg {\n    position: absolute;\n    width: 112%;\n    height: 100%;\n    left: -6%;\n    top: 0;\n    overflow: visible;\n}\n\n.yani-home__wave {\n    fill: none;\n    vector-effect: non-scaling-stroke;\n    stroke-linecap: round;\n    stroke-dasharray: 1900;\n    stroke-dashoffset: 0;\n}\n\n.yani-home__wave--far { stroke: rgba(255,255,255,.09); stroke-width: 34; }\n.yani-home__wave--middle { stroke: rgba(239,100,112,.16); stroke-width: 70; }\n.yani-home__wave--near { stroke: rgba(93,153,255,.11); stroke-width: 110; }\n\n.yani-home__pulse {\n    position: absolute;\n    width: .55em;\n    height: .55em;\n    border: .12em solid rgba(255,255,255,.32);\n    border-radius: 50%;\n    box-shadow: 0 0 0 .45em rgba(239,100,112,.05), 0 0 1.4em rgba(239,100,112,.2);\n}\n\n.yani-home__pulse--one { left: 12%; top: 66%; }\n.yani-home__pulse--two { right: 14%; top: 19%; }\n\n.yani-home__grid {\n    position: relative;\n    z-index: 1;\n    display: grid;\n    grid-template-columns: repeat(3, minmax(12em, 1fr));\n    gap: 1.05em;\n    padding: 2.2em;\n    max-width: 94em;\n    margin: 0 auto;\n}\n\n.yani-home__item {\n    position: relative;\n    min-height: 8.3em;\n    padding: 1.35em 1.5em;\n    border: 0.08em solid rgba(255, 255, 255, 0.12);\n    border-radius: 1.55em .85em 1.45em .9em;\n    background: linear-gradient(128deg, rgba(255,255,255,.16), rgba(255,255,255,.055) 72%);\n    box-shadow: 0 0.7em 1.8em rgba(0, 0, 0, .12), inset 0 0.08em 0 rgba(255,255,255,.12);\n    display: flex;\n    align-items: center;\n    gap: 1em;\n    overflow: hidden;\n    transition: transform .2s ease, background .2s ease, border-color .2s ease, border-radius .28s ease;\n}\n\n.yani-home__episode-flow {\n    position: relative;\n    grid-column: span 2;\n    min-width: 0;\n    padding-top: 2.15em;\n}\n\n.yani-home__episode-flow-title {\n    position: absolute;\n    left: .45em;\n    top: 0;\n    color: rgba(255,255,255,.78);\n    font-size: 1.1em;\n    font-weight: 650;\n    letter-spacing: .02em;\n}\n\n.yani-home__episode-flow-items {\n    position: relative;\n    z-index: 1;\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 1.05em;\n}\n\n.yani-home__discover {\n    position: relative;\n    grid-column: span 3;\n    min-width: 0;\n    padding: 1.1em;\n    border: .08em solid rgba(255,255,255,.12);\n    border-radius: 1.8em .95em 1.65em 1.05em;\n    background: linear-gradient(118deg, rgba(239,100,112,.10), rgba(99,76,170,.12) 48%, rgba(255,255,255,.045));\n    box-shadow: inset 0 .08em 0 rgba(255,255,255,.08), 0 .8em 2em rgba(0,0,0,.1);\n    overflow: hidden;\n}\n\n.yani-home__discover::after {\n    content: '';\n    position: absolute;\n    right: -4.5em;\n    top: -7em;\n    width: 16em;\n    height: 16em;\n    border: .18em solid rgba(255,255,255,.09);\n    border-radius: 44% 56% 36% 64% / 61% 39% 61% 39%;\n    transform: rotate(24deg);\n    pointer-events: none;\n}\n\n.yani-home__discover-head {\n    position: relative;\n    z-index: 1;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    min-height: 1.8em;\n    margin: 0 .35em .8em;\n}\n\n.yani-home__discover-title {\n    color: rgba(255,255,255,.84);\n    font-size: 1.1em;\n    font-weight: 650;\n    letter-spacing: .02em;\n}\n\n.yani-home__discover-mark { display: flex; align-items: center; gap: .34em; }\n.yani-home__discover-mark i { display: block; width: .42em; height: .42em; border: .09em solid rgba(255,255,255,.5); border-radius: 50%; }\n.yani-home__discover-mark i:nth-child(2) { width: .62em; height: .62em; border-color: rgba(239,100,112,.78); }\n\n.yani-home__discover-items {\n    position: relative;\n    z-index: 1;\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: .8em;\n}\n\n.yani-home__discover .yani-home__item {\n    min-height: 6.6em;\n    padding: 1em;\n    border-radius: 1.05em .62em 1em .68em;\n    background: linear-gradient(138deg, rgba(255,255,255,.15), rgba(255,255,255,.055));\n}\n\n.yani-home__discover .yani-home__icon { flex-basis: 2.8em; width: 2.8em; height: 2.8em; }\n.yani-home__discover .yani-home__icon svg { width: 1.4em; height: 1.4em; }\n.yani-home__discover .yani-home__title { font-size: 1.02em; }\n.yani-home__discover .yani-home__arrow { font-size: 1.55em; }\n\n.yani-home__episode-flow-wave {\n    position: absolute;\n    z-index: 2;\n    top: 48%;\n    left: calc(50% - 2.7em);\n    width: 5.4em;\n    height: 2.2em;\n    pointer-events: none;\n    opacity: .72;\n}\n\n.yani-home__episode-flow-wave svg { width: 100%; height: 100%; overflow: visible; }\n.yani-home__episode-flow-wave path { fill: none; stroke: rgba(255,255,255,.48); stroke-width: 2; stroke-linecap: round; }\n.yani-home__episode-flow-wave circle { fill: #ef6470; stroke: rgba(255,255,255,.8); stroke-width: 1.5; }\n.yani-home--motion .yani-home__episode-flow-wave circle { animation: yani-home-flow-pulse 2.4s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }\n\n@keyframes yani-home-flow-pulse {\n    0%, 100% { opacity: .55; transform: scale(.8); }\n    50% { opacity: 1; transform: scale(1.3); }\n}\n\n.yani-home__item::before {\n    content: '';\n    position: absolute;\n    z-index: 0;\n    width: 72%;\n    height: 160%;\n    right: -58%;\n    bottom: -116%;\n    pointer-events: none;\n    border: .18em solid rgba(255,255,255,.22);\n    border-radius: 42% 58% 67% 33% / 55% 38% 62% 45%;\n    background: rgba(239,100,112,.09);\n    transform: rotate(-18deg) scale(.8);\n    transition: transform .42s cubic-bezier(.2,.8,.2,1), border-radius .42s ease;\n}\n\n.yani-home__item > * { position: relative; z-index: 1; }\n.yani-home--motion .yani-home__item { animation: yani-home-reveal .46s cubic-bezier(.18,.82,.22,1) backwards; }\n.yani-home--motion .yani-home__item:nth-child(2) { animation-delay: .035s; }\n.yani-home--motion .yani-home__item:nth-child(3) { animation-delay: .07s; }\n.yani-home--motion .yani-home__item:nth-child(4) { animation-delay: .105s; }\n.yani-home--motion .yani-home__item:nth-child(5) { animation-delay: .14s; }\n.yani-home--motion .yani-home__item:nth-child(6) { animation-delay: .175s; }\n.yani-home--motion .yani-home__item:nth-child(7) { animation-delay: .21s; }\n.yani-home--motion .yani-home__item:nth-child(8) { animation-delay: .245s; }\n.yani-home--motion .yani-home__item:nth-child(9) { animation-delay: .28s; }\n.yani-home--motion .yani-home__item:nth-child(10) { animation-delay: .315s; }\n.yani-home--motion .yani-home__item:nth-child(11) { animation-delay: .35s; }\n\n@keyframes yani-home-reveal {\n    from { opacity: 0; transform: translateY(1.2em) rotate(.6deg); }\n    to { opacity: 1; transform: translateY(0) scale(1); }\n}\n\n.yani-home--motion .yani-home__wave { animation: yani-home-wave-draw 1.15s cubic-bezier(.24,.76,.28,1) backwards; }\n.yani-home--motion .yani-home__wave--middle { animation-delay: .08s; }\n.yani-home--motion .yani-home__wave--near { animation-delay: .16s; }\n.yani-home--motion .yani-home__pulse { animation: yani-home-pulse 3.2s ease-in-out infinite; }\n.yani-home--motion .yani-home__pulse--two { animation-delay: -1.6s; }\n\n@keyframes yani-home-wave-draw {\n    from { opacity: 0; stroke-dashoffset: 1900; transform: translateY(1.5em); }\n    to { opacity: 1; stroke-dashoffset: 0; transform: translateY(0); }\n}\n\n@keyframes yani-home-pulse {\n    0%, 100% { opacity: .28; transform: scale(.8); }\n    50% { opacity: .8; transform: scale(1.18); }\n}\n\n.yani-home__item.focus {\n    background: linear-gradient(135deg, #fff, rgba(255,255,255,.82));\n    color: #16151b;\n    border-color: rgba(255,255,255,.95);\n    box-shadow: 0 0 0 .18em rgba(255,255,255,.22), 0 1em 2.4em rgba(0,0,0,.25);\n    transform: translateY(-.12em) scale(1.015);\n    border-radius: .85em 1.55em .9em 1.45em;\n}\n\n.yani-home--motion .yani-home__item.focus::before {\n    transform: translate(-42%, -34%) rotate(22deg) scale(1.08);\n    border-radius: 66% 34% 41% 59% / 45% 62% 38% 55%;\n}\n\n.yani-home__icon {\n    flex: 0 0 3.35em;\n    width: 3.35em;\n    height: 3.35em;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: .85em;\n    background: rgba(0,0,0,.18);\n    color: #fff;\n    box-shadow: inset 0 0 0 .08em rgba(255,255,255,.12);\n    transition: transform .24s ease, box-shadow .24s ease;\n}\n\n.yani-home__icon svg {\n    width: 1.65em;\n    height: 1.65em;\n    fill: none;\n    stroke: currentColor;\n    stroke-width: 1.8;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n}\n\n.yani-home__title {\n    min-width: 0;\n    font-size: 1.3em;\n    font-weight: 600;\n    line-height: 1.2;\n}\n\n.yani-home__text { min-width: 0; }\n.yani-home__subtitle {\n    margin-top: .38em;\n    color: rgba(255,255,255,.58);\n    font-size: .78em;\n    line-height: 1.2;\n}\n.yani-home__item.focus .yani-home__subtitle { color: rgba(22,21,27,.62); }\n\n.yani-home__arrow {\n    margin-left: auto;\n    color: rgba(255,255,255,.55);\n    font-size: 2em;\n    line-height: 1;\n    transition: transform .2s ease, color .2s ease;\n}\n\n.yani-home__count {\n    display: none;\n    flex: 0 0 auto;\n    min-width: 1.65em;\n    padding: .24em .42em;\n    border: .08em solid rgba(255,255,255,.2);\n    border-radius: 99em;\n    background: rgba(12,12,18,.34);\n    color: rgba(255,255,255,.9);\n    font-size: .72em;\n    font-weight: 750;\n    line-height: 1;\n    text-align: center;\n    box-shadow: inset 0 .08em 0 rgba(255,255,255,.08);\n}\n\n.yani-home__count--visible { display: inline-block; }\n.yani-home__item.focus .yani-home__count { border-color: rgba(239,100,112,.32); background: rgba(239,100,112,.14); color: #a92f53; }\n.yani-home__discover .yani-home__count { font-size: .64em; }\n\n.yani-home__item.focus .yani-home__arrow {\n    color: #ef6470;\n    transform: translateX(.15em);\n}\n\n.yani-home__item--catalog .yani-home__icon { background: linear-gradient(135deg, #ef6470, #b84068); }\n.yani-home__item--genres .yani-home__icon { background: linear-gradient(135deg, #9b75e8, #6548b7); }\n.yani-home__item--search .yani-home__icon { background: linear-gradient(135deg, #43b6d8, #2679c2); }\n.yani-home__item--schedule .yani-home__icon { background: linear-gradient(135deg, #42c68a, #218d78); }\n.yani-home__item--new_translations .yani-home__icon { background: linear-gradient(135deg, #49bfe3, #5361d4); }\n.yani-home__item--new_releases .yani-home__icon { background: linear-gradient(135deg, #ff9e54, #e34f6f); }\n.yani-home__item--continue_watching .yani-home__icon { background: linear-gradient(135deg, #f0af54, #d87742); }\n.yani-home__item--status .yani-home__icon { background: linear-gradient(135deg, #48c7a0, #238d8d); }\n.yani-home__item--top_rated .yani-home__icon { background: linear-gradient(135deg, #f5c95e, #d97939); }\n.yani-home__item--for_you .yani-home__icon { background: linear-gradient(135deg, #ff7b93, #a7427f); }\n.yani-home__item--updates .yani-home__icon { background: linear-gradient(135deg, #5eb7ff, #5861c5); }\n.yani-home__item--collections .yani-home__icon { background: linear-gradient(135deg, #ff8f70, #8f4fd1); }\n.yani-home__item--user_lists .yani-home__icon { background: linear-gradient(135deg, #6f8ff3, #5750bb); }\n.yani-home__item--notifications .yani-home__icon { background: linear-gradient(135deg, #ff8b62, #d74c65); }\n.yani-home__item--account .yani-home__icon { background: linear-gradient(135deg, #e77ab3, #9d4b9c); }\n\n.yani-home__item.focus .yani-home__icon {\n    color: #fff;\n    box-shadow: 0 .35em .8em rgba(0,0,0,.2);\n    transform: rotate(-3deg) scale(1.1);\n}\n\n.yani-home--reduced-motion .yani-home__item,\n.yani-home--reduced-motion .yani-home__item::before,\n.yani-home--reduced-motion .yani-home__icon,\n.yani-home--reduced-motion .yani-home__arrow,\n.yani-home--reduced-motion .yani-home__wave,\n.yani-home--reduced-motion .yani-home__pulse { animation: none; transition: none; }\n.yani-home--reduced-motion .yani-home__episode-flow-wave circle { animation: none; }\n\n@media (prefers-reduced-motion: reduce) {\n    .yani-home__item,\n    .yani-home__item::before,\n    .yani-home__icon,\n    .yani-home__arrow,\n    .yani-home__wave,\n    .yani-home__pulse { animation: none !important; transition: none !important; }\n    .yani-home__episode-flow-wave circle { animation: none !important; }\n}\n\n.yani-policy {\n    width: min(54em, calc(100% - 3em));\n    margin: 2.5em auto;\n    padding: 2.2em 2.5em;\n    box-sizing: border-box;\n    border: .08em solid rgba(255,255,255,.16);\n    border-radius: 1.2em;\n    background: linear-gradient(145deg, rgba(35,35,42,.96), rgba(18,18,23,.94));\n    box-shadow: 0 1.4em 4em rgba(0,0,0,.35);\n    color: #f7f7fa;\n}\n\n.yani-policy__mark {\n    width: 4.5em;\n    height: 4.5em;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-bottom: 1.2em;\n    padding: .9em;\n    box-sizing: border-box;\n    border-radius: 1.1em;\n    background: linear-gradient(135deg, #ff6871, #c74766);\n    color: #24242a;\n}\n\n.yani-policy__mark svg { width: 100%; height: 100%; fill: currentColor; }\n.yani-policy__title { width: fit-content; max-width: 100%; padding: .12em .25em; margin: 0 0 .75em -.25em; border-radius: .25em; font-size: 2.25em; font-weight: 700; }\n.yani-policy__title.focus { box-shadow: 0 0 0 .1em rgba(255,104,113,.9); background: rgba(255,104,113,.16); }\n.yani-policy__content { color: rgba(255,255,255,.82); font-size: 1.12em; line-height: 1.55; }\n.yani-policy__paragraph + .yani-policy__paragraph { margin-top: .8em; }\n.yani-policy__accept { width: fit-content; margin-top: 1.6em; padding: .78em 1.35em; border-radius: .55em; background: #ef6470; color: #fff; font-weight: 600; }\n.yani-policy__accept.focus { background: #fff; color: #17171b; box-shadow: 0 0 0 .16em #ef6470; transform: scale(1.035); }\n\n@media (max-width: 700px) {\n    .yani-policy { width: calc(100% - 1.4em); margin: 1em auto; padding: 1.4em; }\n    .yani-policy__title { font-size: 1.75em; }\n}\n\n@media (max-width: 700px) {\n    .yani-home__grid { grid-template-columns: repeat(2, minmax(10em, 1fr)); padding: 1.2em; }\n    .yani-home__episode-flow { grid-column: span 2; }\n    .yani-home__discover { grid-column: span 2; }\n    .yani-home__discover-items { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n    .yani-home__item { min-height: 7em; padding: 1em; }\n    .yani-home__icon { flex-basis: 2.8em; width: 2.8em; height: 2.8em; }\n}\n\n.yani-detail {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 2.5em;\n    padding: 2em;\n    max-width: 100%;\n    box-sizing: border-box;\n    color: #f4f7fb;\n    opacity: 1;\n    filter: none;\n}\n\n.yani-detail__poster {\n    width: 16em;\n    max-height: 24em;\n    object-fit: cover;\n    border-radius: 0.8em;\n}\n\n.yani-detail__info { min-width: 0; max-width: 48em; flex: 1 1 auto; }\n.yani-detail__title { font-size: 2.2em; font-weight: 600; border-radius: .22em; padding: .08em .16em; margin: -.08em -.16em; width: fit-content; max-width: 100%; }\n.yani-detail__title.focus { background: rgba(239,100,112,.22); box-shadow: 0 0 0 .12em #ef6470; color: #fff; }\n.yani-detail__alternative-titles { margin-top: 0.35em; color: rgba(255,255,255,.68); line-height: 1.35; overflow-wrap: anywhere; }\n.yani-detail__genres { display: flex; flex-wrap: wrap; gap: .36em; margin-top: .55em; }\n.yani-detail__type { display: inline-flex; margin-top: .55em; padding: .25em .58em; border: .08em solid rgba(239,100,112,.62); border-radius: 999px; background: rgba(239,100,112,.16); color: rgba(255,255,255,.92); font-size: .78em; font-weight: 700; line-height: 1.2; }\n.yani-detail__genre { padding: .24em .5em; border: .08em solid rgba(255,255,255,.28); border-radius: .35em; color: rgba(255,255,255,.82); font-size: .78em; line-height: 1.2; }\n.yani-detail__genre.focus { background: #fff; border-color: #fff; box-shadow: 0 0 0 .14em #ef6470; color: #111; transform: scale(1.04); }\n.yani-detail__meta { margin: 0.8em 0 1.2em; font-size: 1.2em; }\n.yani-detail__episode-summary { display: flex; flex-wrap: wrap; gap: .38em; width: fit-content; max-width: 100%; margin: -.45em 0 .85em; padding: .34em; border: .08em solid rgba(255,255,255,.14); border-radius: .55em; background: rgba(0,0,0,.2); box-sizing: border-box; }\n.yani-detail__episode-summary.focus { border-color: #ef6470; background: rgba(239,100,112,.16); box-shadow: 0 0 0 .1em rgba(239,100,112,.55); }\n.yani-detail__episode-summary.loading { opacity: .72; }\n.yani-detail__episode-stat { display: inline-flex; align-items: center; gap: .28em; padding: .28em .48em; border-radius: .38em; background: rgba(255,255,255,.1); color: rgba(255,255,255,.9); font-size: .76em; font-weight: 600; line-height: 1.15; white-space: nowrap; }\n.yani-detail__episode-stat-icon { display: inline-flex; width: 1em; height: 1em; color: #ef8992; }\n.yani-detail__episode-stat-icon svg { display: block; width: 100%; height: 100%; fill: currentColor; }\n.yani-detail__overview { line-height: 1.45; margin-bottom: 1.5em; }\n.yani-detail__actions { display: flex; flex-wrap: wrap; gap: 0.7em; max-width: 100%; }\n.yani-detail__button { display: block; max-width: 100%; box-sizing: border-box; padding: 0.8em 1.2em; border: 0.12em solid transparent; border-radius: 0.5em; background: rgba(255,255,255,.15); overflow-wrap: anywhere; }\n.yani-detail__button--watch { background: #ef6470; color: #fff; }\n.yani-detail__button--lampa, .yani-detail__button--external { display: inline-flex; align-items: center; gap: .58em; }\n.yani-detail__button-icon { display: inline-flex; width: 1.25em; height: 1.25em; flex: 0 0 1.25em; }\n.yani-detail__button-icon svg { display: block; width: 100%; height: 100%; fill: currentColor; }\n.yani-detail__button.focus { background: #fff; color: #111; border-color: #fff; box-shadow: 0 0 0 0.2em rgba(239, 100, 112, .95), 0 0 1.2em rgba(255, 255, 255, .55); transform: scale(1.02); }\n.yani-detail__list-panel { display: inline-flex; margin-top: .8em; overflow: hidden; border: .1em solid rgba(255,255,255,.18); border-radius: .45em; background: rgba(0,0,0,.24); }\n.yani-detail__list-action { display: flex; align-items: center; justify-content: center; width: 2.7em; height: 2.35em; border-right: .08em solid rgba(255,255,255,.15); color: rgba(255,255,255,.72); background: transparent; }\n.yani-detail__list-action:last-child { border-right: 0; }\n.yani-detail__list-action.active { color: #fff; background: #ef6470; }\n.yani-detail__list-action.focus { color: #111; background: #fff; box-shadow: inset 0 0 0 .18em #ef6470; transform: scale(1.06); position: relative; z-index: 1; }\n.yani-detail__list-icon { width: 1.25em; height: 1.25em; }\n.yani-detail__list-icon svg { display: block; width: 100%; height: 100%; fill: currentColor; }\n\n.yani-detail__comments { margin-top: 1.5em; padding-top: 1em; border-top: 0.08em solid rgba(255, 255, 255, .18); }\n.yani-detail__comments-title { margin-bottom: 0.7em; font-size: 1.35em; font-weight: 600; }\n.yani-detail__comments-list { display: grid; gap: 0.55em; }\n.yani-detail__comment, .yani-detail__comments-loading, .yani-detail__comments-empty, .yani-detail__comments-error { padding: 0.7em 0.85em; border-radius: 0.45em; background: rgba(255, 255, 255, .08); }\n.yani-detail__comment.focus { background: #fff; color: #111; outline: 0.18em solid #ef6470; }\n.yani-detail__comment-title { line-height: 1.35; }\n.yani-detail__comment-stats { margin-top: 0.25em; opacity: .6; font-size: .82em; }\n.yani-detail__comments-loading, .yani-detail__comments-empty, .yani-detail__comments-error { opacity: .7; }\n\n.yani-detail__order { margin-top: 1.5em; padding: 1em 0; border-top: 0.08em solid rgba(255, 255, 255, .18); border-bottom: 0.08em solid rgba(255, 255, 255, .18); }\n.yani-detail__order-title { margin-bottom: 0.65em; font-size: 1.35em; font-weight: 600; }\n.yani-detail__order-list { display: grid; gap: 0.4em; }\n.yani-detail__order-item { display: flex; align-items: baseline; gap: 0.45em; padding: 0.55em 0.7em; border-radius: 0.4em; background: rgba(255, 255, 255, .07); }\n.yani-detail__order-item.focus { background: #fff; color: #111; outline: 0.16em solid #ef6470; }\n.yani-detail__order-index { opacity: .65; }\n.yani-detail__order-name { font-weight: 600; }\n.yani-detail__order-year, .yani-detail__order-relation { opacity: .7; }\n\n.yani-detail__extra { margin-top: 1.5em; }\n.yani-detail__extra-title { margin-bottom: .65em; font-size: 1.35em; font-weight: 600; }\n.yani-detail__recommendations-list { display: flex; gap: .65em; max-width: 100%; overflow-x: auto; padding: .25em .1em .7em; }\n.yani-detail__recommendation { flex: 0 0 8em; padding-bottom: .45em; border-radius: .45em; background: rgba(255, 255, 255, .08); overflow: hidden; }\n.yani-detail__recommendation.focus { outline: .16em solid #ef6470; background: #fff; color: #111; }\n.yani-detail__recommendation-poster { display: block; width: 8em; height: 11em; object-fit: cover; }\n.yani-detail__recommendation-title { padding: .35em .45em 0; font-size: .82em; font-weight: 600; line-height: 1.2; }\n.yani-detail__recommendation-year { padding: .2em .45em 0; font-size: .75em; opacity: .65; }\n.yani-detail__trailers-list { display: grid; gap: .45em; }\n.yani-detail__trailer { padding: .7em .85em; border-radius: .45em; background: rgba(255, 255, 255, .08); }\n.yani-detail__trailer.focus { background: #fff; color: #111; outline: .16em solid #ef6470; }\n.yani-detail__collection { padding: .7em .85em; border-radius: .45em; background: rgba(255, 255, 255, .08); }\n.yani-detail__collection.focus { background: #fff; color: #111; outline: .16em solid #ef6470; }\n.yani-detail__collection-title { font-weight: 700; }\n.yani-detail__collection-description { margin-top: .25em; opacity: .72; font-size: .85em; white-space: pre-wrap; }\n.yani-detail__collection-count { margin-top: .3em; opacity: .7; font-size: .78em; }\n.yani-detail__order-item.selector:focus,\n.yani-detail__comment.selector:focus,\n.yani-detail__recommendation.selector:focus,\n.yani-detail__trailer.selector:focus { outline: .16em solid #ef6470; }\n\n.yani-trailers {\n    min-height: 100%;\n    padding: 7em 2em 2em;\n    box-sizing: border-box;\n}\n\n.yani-trailers__list {\n    display: grid;\n    gap: .7em;\n    max-width: 62em;\n}\n\n.yani-trailers__item,\n.yani-trailers__empty {\n    display: flex;\n    align-items: center;\n    gap: .9em;\n    min-height: 4.2em;\n    padding: .8em 1em;\n    border-radius: .45em;\n    background: rgba(15, 22, 31, .78);\n    color: #fff;\n    box-sizing: border-box;\n}\n\n.yani-trailers__item.focus,\n.yani-trailers__empty.focus {\n    background: #fff;\n    color: #111;\n    box-shadow: 0 0 0 .16em #ef6470;\n}\n\n.yani-trailers__icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 2.4em;\n    height: 2.4em;\n    flex: 0 0 2.4em;\n}\n\n.yani-trailers__icon svg {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n\n.yani-trailers__body {\n    min-width: 0;\n}\n\n.yani-trailers__title {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-size: 1.18em;\n    font-weight: 600;\n}\n\n.yani-trailers__host {\n    margin-top: .18em;\n    color: rgba(255, 255, 255, .62);\n    font-size: .86em;\n}\n\n.yani-trailers__item.focus .yani-trailers__host {\n    color: rgba(0, 0, 0, .56);\n}\n\n@media (max-width: 700px) {\n    .yani-detail { gap: 1em; padding: 1em; }\n    .yani-detail__poster { width: 10em; }\n}\n\n.yani-player {\n    position: fixed;\n    z-index: 1000;\n    inset: 0;\n    width: 100vw;\n    height: 100vh;\n    background: #000;\n}\n\n.yani-player__iframe {\n    display: block;\n    width: 100%;\n    height: 100%;\n    border: 0;\n    background: #000;\n}\n\n.yani-player__back {\n    position: absolute;\n    z-index: 2;\n    top: 1.25em;\n    left: 1.25em;\n    padding: .65em 1em;\n    border-radius: .45em;\n    color: #fff;\n    background: rgba(20, 20, 24, .82);\n    box-shadow: 0 .35em 1.2em rgba(0, 0, 0, .28);\n}\n\n.yani-player__back.focus {\n    color: #18181b;\n    background: #fff;\n}\n\n.full-start__button.view--yummyanime {\n    background: #ef6470;\n    color: #fff;\n    order: -1;\n    min-width: 3.1em;\n    padding: .45em .6em;\n}\n\n.view--yummyanime__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 1.8em;\n    height: 1.8em;\n    margin: 0;\n}\n\n.view--yummyanime__icon svg {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n\n.full-start__rate .yani-full-rating-logo {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 1.15em;\n    height: 1.15em;\n    margin: 0.12em auto 0;\n    color: #ef6470;\n}\n\n.full-start__rate .yani-full-rating-logo svg {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n\n/* Native Lampa title card: the YummyAnime action has no text, only its mark. */\n.full-start__button.view--yummyanime {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1rem !important;\n    line-height: 1 !important;\n}\n\n.view--yummyanime__icon {\n    box-sizing: border-box;\n    display: inline-flex !important;\n    align-items: center;\n    justify-content: center;\n    width: 2.25rem !important;\n    height: 2.25rem !important;\n    min-width: 2.25rem;\n    min-height: 2.25rem;\n    font-size: 1rem !important;\n    margin: 0 !important;\n    color: #fff;\n}\n\n.view--yummyanime__icon svg {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n\n.yani-schedule__content {\n    padding: 1.2em 2em 3em;\n    color: #f4f7fb !important;\n    opacity: 1 !important;\n    filter: none !important;\n}\n\n.yani-schedule { color: #f4f7fb !important; opacity: 1 !important; filter: none !important; }\n\n.yani-schedule__days {\n    display: flex;\n    gap: 0.65em;\n    margin-bottom: 1.2em;\n    overflow-x: auto;\n    padding: 0.2em 0.15em 0.5em;\n}\n\n.yani-schedule__day-chip {\n    flex: 0 0 auto;\n    min-width: 5.8em;\n    padding: 0.55em 0.75em;\n    border: 0.1em solid rgba(255, 255, 255, .16);\n    border-radius: 0.7em;\n    background: rgba(20, 31, 43, .9);\n    color: #b9c7d5;\n    text-align: center;\n    transition: transform .15s ease, background .15s ease, border-color .15s ease;\n}\n\n.yani-schedule__day-chip.selected {\n    background: #287da9;\n    border-color: #72d8ff;\n    color: #ffffff;\n}\n\n.yani-schedule__day-chip.focus {\n    transform: scale(1.05);\n    border-color: #ffffff;\n    box-shadow: 0 0 0 .14em rgba(98, 201, 255, .65);\n}\n\n.yani-schedule__day-name {\n    font-size: 0.95em;\n    font-weight: 700;\n    white-space: nowrap;\n}\n\n.yani-schedule__day-count {\n    margin-top: 0.25em;\n    color: #72d8ff;\n    font-size: 1.2em;\n    font-weight: 800;\n}\n\n.yani-schedule__day-chip.selected .yani-schedule__day-count { color: #ffffff; }\n\n.yani-schedule__selected-title {\n    margin: 0.3em 0 0.7em;\n    color: #ffffff;\n    font-size: 1.45em;\n    font-weight: 700;\n    text-transform: capitalize;\n}\n\n.yani-schedule__day-title {\n    margin-bottom: 0.7em;\n    font-size: 1.55em;\n    font-weight: 600;\n    color: #ffffff;\n    text-transform: capitalize;\n}\n\n.yani-schedule__item {\n    display: flex;\n    align-items: center;\n    min-height: 6.2em;\n    margin-bottom: 0.65em;\n    padding: 0.65em 1em;\n    border-radius: 0.65em;\n    color: #f4f7fb !important;\n    background: linear-gradient(100deg, #19222d, #313c48) !important;\n    border: 0.08em solid rgba(255, 255, 255, .14);\n    box-shadow: 0 .35em 1em rgba(0, 0, 0, .2);\n    opacity: 1 !important;\n    filter: none !important;\n}\n\n.yani-schedule__item.focus {\n    background: linear-gradient(100deg, #ffffff, #eaf5ff);\n    color: #101820;\n    border-color: #62c9ff;\n    box-shadow: 0 0 0 .14em rgba(98, 201, 255, .75), 0 .5em 1.4em rgba(0, 0, 0, .35);\n}\n\n.yani-schedule__poster {\n    width: 4em;\n    height: 5.5em;\n    margin-right: 1em;\n    border-radius: 0.35em;\n    object-fit: cover;\n    background: rgba(255, 255, 255, 0.08);\n}\n\n.yani-schedule__info {\n    flex: 1;\n    min-width: 0;\n}\n\n.yani-schedule__title {\n    overflow: hidden;\n    font-size: 1.15em;\n    font-weight: 500;\n    color: inherit;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.yani-schedule__episode {\n    margin-top: 0.4em;\n    color: #cbd8e5;\n    opacity: 1;\n}\n\n.yani-schedule__item.focus .yani-schedule__episode,\n.yani-schedule__item.focus .yani-schedule__timezone { color: #41566b; }\n\n.yani-schedule__release {\n    min-width: 8em;\n    margin-left: 1em;\n    text-align: right;\n}\n\n.yani-schedule__time {\n    font-size: 1.25em;\n    font-weight: 600;\n    color: #72d8ff;\n}\n\n.yani-schedule__item.focus .yani-schedule__time { color: #1675a5; }\n\n.yani-schedule__timezone,\n.yani-schedule__empty {\n    color: #b9c7d5;\n    opacity: 1;\n}\n\n.yani-schedule__empty {\n    padding: 1em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.06);\n}\n\n.yani-detail__schedule {\n    margin-bottom: 1.2em;\n    font-size: 1.15em;\n    font-weight: 600;\n}\n\n.yani-detail__community { margin: 1em 0 1.2em; }\n.yani-detail__rating-action { display: inline-flex; align-items: center; gap: .4em; width: fit-content; margin: .5em 0; padding: .45em .7em; border: .1em solid rgba(255,210,122,.35); border-radius: .45em; background: rgba(240,175,84,.14); color: rgba(255,255,255,.86); font-weight: 700; }\n.yani-detail__rating-action.active { background: rgba(240,175,84,.22); color: #ffd27a; }\n.yani-detail__rating-action.focus { border-color: #fff; background: #fff; color: #171717; box-shadow: 0 0 0 .16em #ef6470; transform: scale(1.03); }\n.yani-detail__rating-icon { color: #ffd27a; font-size: 1.08em; line-height: 1; }\n.yani-detail__rating-action.focus .yani-detail__rating-icon { color: #ef9d29; }\n.yani-detail__community-title { margin-bottom: .55em; color: #fff; font-size: 1.15em; font-weight: 700; }\n.yani-detail__community-grid { display: flex; flex-wrap: wrap; gap: .45em; }\n.yani-detail__community-item { padding: .45em .7em; border-radius: .45em; background: rgba(255,255,255,.1); color: #d9e7f2; }\n\n.yani-card-ratings {\n    position: absolute;\n    right: 0.35em;\n    bottom: 0.35em;\n    left: 0.35em;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 0.2em;\n    pointer-events: none;\n}\n\n.yani-card-media {\n    position: absolute;\n    top: 0.35em;\n    left: 0.35em;\n    right: 0.35em;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.25em;\n    pointer-events: none;\n}\n\n.yani-card-media__badge {\n    padding: 0.22em 0.38em;\n    border-radius: 0.25em;\n    background: rgba(0, 0, 0, 0.82);\n    color: #fff;\n    font-size: 0.62em;\n    font-weight: 700;\n    line-height: 1.1;\n}\n\n.yani-card-media__quality { background: #f1c40f; color: #171717; }\n.yani-card-media__voices { background: #3b9bd9; }\n.yani-card-media__type { background: rgba(239, 100, 112, 0.94); }\n.yani-card-update { position: absolute; top: 0.35em; right: 0.35em; z-index: 2; max-width: calc(100% - 0.7em); padding: 0.22em 0.38em; border-radius: 0.25em; background: #ef6470; color: #fff; font-size: 0.62em; font-weight: 700; line-height: 1.1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.yani-card-recommendation { position: absolute; top: .35em; left: .35em; z-index: 3; max-width: calc(100% - .7em); padding: .22em .42em; border-radius: .3em; background: rgba(81, 61, 143, .94); color: #fff; font-size: .58em; font-weight: 700; line-height: 1.15; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.yani-card-list { position: absolute; left: 0.35em; bottom: 0.35em; z-index: 3; max-width: calc(100% - 0.7em); padding: 0.25em 0.45em; border-radius: 0.3em; background: #5f43a8; color: #fff; font-size: 0.68em; font-weight: 700; line-height: 1.1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.yani-card-history { position: absolute; top: 0.35em; right: 0.35em; z-index: 4; max-width: calc(100% - 0.7em); padding: 0.25em 0.45em; border-radius: 0.3em; background: rgba(239, 100, 112, 0.94); color: #fff; font-size: 0.68em; font-weight: 700; line-height: 1.1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.yani-card-history-progress { position: absolute; right: 0; bottom: 0; left: 0; z-index: 5; height: 0.24em; overflow: hidden; background: rgba(255, 255, 255, 0.25); }\n.yani-card-history-progress span { display: block; height: 100%; background: #ef6470; }\n.yani-collection-card__previews { position: absolute; right: .38em; bottom: 2.15em; z-index: 4; display: flex; gap: .22em; }\n.yani-collection-card__previews span { width: 2.15em; height: 3.1em; border: .08em solid rgba(255,255,255,.72); border-radius: .28em; background-position: center; background-size: cover; box-shadow: 0 .25em .7em rgba(0,0,0,.45); }\n.yani-collection-card__meta { position: absolute; right: .35em; bottom: .35em; left: .35em; z-index: 5; overflow: hidden; padding: .3em .45em; border-radius: .32em; background: rgba(21,20,29,.82); color: #fff; font-size: .62em; font-weight: 650; line-height: 1.1; text-overflow: ellipsis; white-space: nowrap; }\n.yani-collection-card.focus .yani-collection-card__meta { background: #ef6470; }\n\n.yani-card-rating {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0.2em 0.3em;\n    border-radius: 0.25em;\n    background: rgba(0, 0, 0, 0.78);\n    color: #fff;\n    font-size: 0.62em;\n}\n\n.yani-rating-logo {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 2.1em;\n    height: 1.45em;\n    padding: 0 0.3em;\n    box-sizing: border-box;\n    border-radius: 0.28em;\n    background: #fff;\n    color: #111;\n    font-size: 0.78em;\n    font-weight: 800;\n    letter-spacing: -0.04em;\n    line-height: 1;\n}\n\n.yani-rating-logo--yummy { background: #ef6470; color: #fff; }\n.yani-rating-logo--kp { background: #f2c94c; color: #171717; }\n.yani-rating-logo--shikimori { background: #8b6fc9; color: #fff; }\n.yani-rating-logo--anidub { background: #3b9bd9; color: #fff; }\n.yani-rating-logo--mal { background: #2e5d93; color: #fff; }\n.yani-rating-logo--worldart { background: #f28c28; color: #fff; }\n.yani-rating-logo--yummy,\n.yani-rating-logo--kp,\n.yani-rating-logo--shikimori,\n.yani-rating-logo--anidub,\n.yani-rating-logo--mal,\n.yani-rating-logo--worldart {\n    overflow: hidden;\n}\n\n.yani-card-rating__logo {\n    margin-right: 0.25em;\n}\n\n.yani-card-rating__value {\n    font-weight: 600;\n}\n\n.yani-ratings {\n    display: grid;\n    grid-template-columns: repeat(3, minmax(8em, 1fr));\n    gap: 0.6em;\n    margin: 1em 0 1.4em;\n}\n\n.yani-ratings__item {\n    padding: 0.65em 0.8em;\n    border-radius: 0.5em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-ratings__header { display: flex; align-items: center; gap: 0.55em; }\n.yani-ratings__logo { min-width: 2.5em; height: 1.7em; font-size: 0.85em; }\n.yani-ratings__value {\n    font-size: 1.35em;\n    font-weight: 600;\n}\n\n.yani-ratings__source {\n    margin-top: 0.15em;\n    opacity: 0.78;\n}\n\n.yani-ratings__votes {\n    margin-top: 0.2em;\n    font-size: 0.75em;\n    opacity: 0.55;\n}\n\n.yani-account__content {\n    padding: 1.5em 2em 3em;\n}\n\n.yani-account__notification-button {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin: 1em 0;\n    padding: 1em 1.2em;\n    border: 0.08em solid rgba(255,255,255,.16);\n    border-radius: .7em;\n    background: rgba(36, 58, 78, .85);\n}\n\n.yani-account__notification-button.focus { background: #287da9; box-shadow: 0 0 0 .14em rgba(98,201,255,.65); }\n.yani-account__notification-button span { color: #72d8ff; }\n.yani-notifications__content { padding: 1.5em 2em 3em; }\n.yani-notifications__title { margin-bottom: .8em; color: #fff; font-size: 1.6em; font-weight: 700; }\n.yani-notification { margin: .7em 0; padding: 1em 1.2em; border-radius: .65em; background: rgba(255,255,255,.08); border: .08em solid rgba(255,255,255,.1); }\n.yani-notification.unread { border-color: #72d8ff; background: rgba(40,125,169,.3); }\n.yani-notification.focus { background: #fff; color: #17222e; box-shadow: 0 0 0 .14em rgba(98,201,255,.75); }\n.yani-notification__title { font-size: 1.15em; font-weight: 700; }\n.yani-notification__text { margin-top: .35em; color: #cbd8e5; }\n.yani-notification.focus .yani-notification__text { color: #41566b; }\n.yani-notification__date { margin-top: .45em; color: #8ea4b8; font-size: .82em; }\n\n.yani-account__profile {\n    display: flex;\n    align-items: center;\n    padding: 1.2em;\n    border-radius: 0.8em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-account__profile.focus,\n.yani-account__info.focus,\n.yani-account__list.focus,\n.yani-account__notice.focus {\n    background: #fff;\n    color: #111;\n}\n\n.yani-account__avatar {\n    width: 7em;\n    height: 7em;\n    margin-right: 1.2em;\n    border-radius: 50%;\n    object-fit: cover;\n}\n\n.yani-account__name {\n    font-size: 1.8em;\n    font-weight: 600;\n}\n\n.yani-account__id,\n.yani-account__about {\n    margin-top: 0.35em;\n    opacity: 0.7;\n}\n\n.yani-account__warning {\n    margin-top: 0.5em;\n    color: #ff6868;\n    font-weight: 600;\n}\n\n.yani-account__grid,\n.yani-account__lists {\n    display: grid;\n    grid-template-columns: repeat(3, minmax(10em, 1fr));\n    gap: 0.7em;\n    margin-top: 1em;\n}\n\n.yani-account__info,\n.yani-account__list,\n.yani-account__notice {\n    padding: 1em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-account__info-title,\n.yani-account__list-time,\n.yani-account__notice-text {\n    opacity: 0.65;\n}\n\n.yani-account__info-value,\n.yani-account__list-count,\n.yani-account__notice-title {\n    margin-top: 0.3em;\n    font-size: 1.2em;\n    font-weight: 600;\n}\n\n.yani-account__list-title {\n    font-size: 1.15em;\n    font-weight: 600;\n}\n\n.yani-account__list-time {\n    margin-top: 0.35em;\n}\n\n.yani-account__section-title {\n    margin-top: 1.5em;\n    font-size: 1.45em;\n    font-weight: 600;\n}\n\n.yani-user-lists__heading {\n    font-size: 2em;\n    font-weight: 700;\n}\n\n.yani-user-lists__description {\n    max-width: 48em;\n    margin-top: .35em;\n    color: rgba(255, 255, 255, .68);\n    font-size: 1.05em;\n}\n\n.yani-user-lists__tile {\n    display: flex;\n    align-items: center;\n    min-height: 5.4em;\n}\n\n.yani-user-lists__icon {\n    width: 2.7em;\n    height: 2.7em;\n    margin-right: 1em;\n    flex: 0 0 auto;\n    color: #ff6674;\n}\n\n.yani-user-lists__icon svg {\n    width: 100%;\n    height: 100%;\n    fill: currentColor;\n}\n\n.yani-user-lists__tile.focus .yani-user-lists__icon {\n    color: #cf3f50;\n}\n\n.yani-user-lists__body {\n    min-width: 0;\n    flex: 1 1 auto;\n}\n\n.yani-user-lists__count {\n    font-size: 1em;\n}\n\n.yani-account__stats {\n    display: inline-flex;\n    flex-direction: column;\n    width: min(100%, 34em);\n    margin: 0.7em 0.7em 0 0;\n    padding: 0.8em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.08);\n    vertical-align: top;\n}\n\n.yani-account__stats-title {\n    margin-bottom: 0.45em;\n    font-size: 1.1em;\n    font-weight: 600;\n}\n\n.yani-account__stats-row {\n    display: flex;\n    justify-content: space-between;\n    gap: 1em;\n    padding: 0.4em 0.55em;\n    border-radius: 0.35em;\n}\n\n.yani-account__stats-row.focus {\n    background: #fff;\n    color: #111;\n}\n\n.yani-auth__content {\n    width: min(100%, 42em);\n    margin: 0 auto;\n    padding: 2em;\n}\n\n.yani-auth__title {\n    margin-bottom: 0.35em;\n    font-size: 2em;\n    font-weight: 600;\n}\n\n.yani-auth__status {\n    margin-bottom: 1.4em;\n    color: #f0a33b;\n    opacity: 0.9;\n}\n\n.yani-auth__status.is-authorized {\n    color: #4caf50;\n}\n\n.yani-auth__form,\n.yani-auth__actions {\n    display: grid;\n    gap: 0.7em;\n}\n\n.yani-auth__field,\n.yani-auth__button {\n    padding: 1em 1.2em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-auth__field.focus,\n.yani-auth__button.focus {\n    background: #fff;\n    color: #111;\n    outline: 0.16em solid #ef6470;\n}\n\n.yani-auth__field-title {\n    margin-bottom: 0.3em;\n    opacity: 0.65;\n}\n\n.yani-auth__field-value {\n    font-size: 1.15em;\n    font-weight: 600;\n}\n\n.yani-auth__button {\n    text-align: center;\n    font-weight: 600;\n}\n\n.yani-auth__button--primary {\n    background: #ef6470;\n    color: #fff;\n}\n\n.yani-auth__account,\n.yani-auth__hint {\n    margin-top: 1em;\n    opacity: 0.65;\n}\n\n.yani-status__content {\n    padding: 1.4em 2em 3em;\n}\n\n.yani-status__periods {\n    display: flex;\n    gap: 0.65em;\n    margin-bottom: 1em;\n}\n\n.yani-status__period {\n    padding: 0.65em 1.15em;\n    border-radius: 0.55em;\n    background: rgba(255, 255, 255, 0.14);\n}\n\n.yani-status__period.active {\n    background: #ef6470;\n    color: #fff;\n}\n\n.yani-status__period.focus {\n    box-shadow: 0 0 0 0.16em #fff;\n}\n\n.yani-status__summary {\n    display: flex;\n    align-items: center;\n    gap: 2em;\n    padding: 1.4em;\n    border-radius: 0.8em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-status__summary.focus,\n.yani-status__domain.focus,\n.yani-status__refresh.focus,\n.yani-status__error.focus {\n    background: #fff;\n    color: #111;\n}\n\n.yani-status__ring {\n    display: flex;\n    flex: 0 0 10em;\n    align-items: center;\n    justify-content: center;\n    width: 10em;\n    height: 10em;\n    border-radius: 50%;\n}\n\n.yani-status__ring-center {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    width: 7em;\n    height: 7em;\n    border-radius: 50%;\n    background: #292929;\n    color: #fff;\n}\n\n.yani-status__ring-center strong {\n    font-size: 1.65em;\n}\n\n.yani-status__ring-center span {\n    margin-top: 0.2em;\n    opacity: 0.7;\n}\n\n.yani-status__summary-info {\n    flex: 1;\n}\n\n.yani-status__headline {\n    margin-bottom: 0.7em;\n    font-size: 1.8em;\n    font-weight: 700;\n}\n\n.yani-status__metrics {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(8em, 1fr));\n    gap: 0.6em;\n}\n\n.yani-status__metric {\n    padding: 0.65em;\n    border-radius: 0.45em;\n    background: rgba(0, 0, 0, 0.18);\n}\n\n.yani-status__metric span,\n.yani-status__metric strong {\n    display: block;\n}\n\n.yani-status__metric span {\n    margin-bottom: 0.25em;\n    opacity: 0.65;\n}\n\n.yani-status__metric strong {\n    font-size: 1.1em;\n}\n\n.yani-status__legend {\n    display: flex;\n    align-items: center;\n    gap: 0.45em;\n    margin: 1.1em 0 0.7em;\n    opacity: 0.75;\n}\n\n.yani-status__dot,\n.yani-status__state {\n    display: inline-block;\n    width: 0.7em;\n    height: 0.7em;\n    border-radius: 50%;\n}\n\n.yani-status__dot--up,\n.yani-status--up .yani-status__state,\n.yani-status__bar--up { background: #4caf50; }\n.yani-status__dot--degraded,\n.yani-status--degraded .yani-status__state,\n.yani-status__bar--degraded { background: #f0a33b; }\n.yani-status__dot--down,\n.yani-status--down .yani-status__state,\n.yani-status__bar--down { background: #db4455; }\n.yani-status__bar--unknown { background: #777; }\n\n.yani-status__domain {\n    margin-bottom: 0.65em;\n    padding: 0.85em 1em;\n    border-radius: 0.65em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-status__domain-head,\n.yani-status__domain-name,\n.yani-status__domain-values {\n    display: flex;\n    align-items: center;\n}\n\n.yani-status__domain-head {\n    justify-content: space-between;\n    margin-bottom: 0.6em;\n}\n\n.yani-status__domain-name {\n    gap: 0.55em;\n}\n\n.yani-status__domain-name strong {\n    font-size: 1.1em;\n}\n\n.yani-status__domain-name small {\n    opacity: 0.5;\n}\n\n.yani-status__domain-values {\n    gap: 1em;\n    opacity: 0.7;\n}\n\n.yani-status__history {\n    display: flex;\n    gap: 0.12em;\n    width: 100%;\n    height: 1.35em;\n}\n\n.yani-status__bar {\n    flex: 1 1 0;\n    min-width: 0.18em;\n    border-radius: 0.15em;\n}\n\n.yani-status__refresh,\n.yani-status__error {\n    margin-top: 1em;\n    padding: 0.9em 1.1em;\n    border-radius: 0.6em;\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.yani-status__source {\n    margin-top: 0.8em;\n    opacity: 0.55;\n}\n\n.yani-status__refresh {\n    display: inline-block;\n}\n\n.yani-status__error strong,\n.yani-status__error span {\n    display: block;\n}\n\n.yani-status__error span {\n    margin-top: 0.4em;\n    opacity: 0.65;\n}\n\n@media (max-width: 700px) {\n    .yani-schedule__content { padding: 1em; }\n    .yani-schedule__release { min-width: 5em; }\n    .yani-schedule__timezone { display: none; }\n    .yani-ratings { grid-template-columns: repeat(2, minmax(7em, 1fr)); }\n    .yani-account__content { padding: 1em; }\n    .yani-account__grid,\n    .yani-account__lists { grid-template-columns: repeat(2, minmax(8em, 1fr)); }\n    .yani-status__content { padding: 1em; }\n    .yani-status__summary { align-items: flex-start; gap: 1em; }\n    .yani-status__ring { flex-basis: 7em; width: 7em; height: 7em; }\n    .yani-status__ring-center { width: 5em; height: 5em; }\n    .yani-status__metrics { grid-template-columns: repeat(2, minmax(7em, 1fr)); }\n    .yani-status__domain-name small { display: none; }\n}\n";
    document.head.appendChild(style);

(function (window) {
    'use strict';

    var defaultApplicationToken = 'p6_gpujl6d3pho8n';
    var applicationTokenStorageKey = 'yani_public_application_token';

    function normalizeApplicationToken(value) {
        return String(value || '').trim();
    }

    function validApplicationToken(value) {
        return !value || /^[A-Za-z0-9_-]{8,128}$/.test(value);
    }

    function storedApplicationToken() {
        if (!window.Lampa || !Lampa.Storage || !Lampa.Storage.get) return '';
        var value = normalizeApplicationToken(Lampa.Storage.get(applicationTokenStorageKey, ''));
        return validApplicationToken(value) ? value : '';
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Config = window.LampaYaniConfig = {
        version: '0.35.1',
        apiBase: 'https://api.yani.tv',
        statusUrl: 'https://andrewcodeman.github.io/lampa_yani/status/status.json',
        applicationHeader: defaultApplicationToken, // Backward-compatible default public token.
        defaultApplicationToken: defaultApplicationToken,
        applicationToken: function () { return storedApplicationToken() || defaultApplicationToken; },
        customApplicationToken: storedApplicationToken,
        setApplicationToken: function (value) {
            value = normalizeApplicationToken(value);
            if (!validApplicationToken(value)) return false;
            if (!window.Lampa || !Lampa.Storage || !Lampa.Storage.set) return false;
            Lampa.Storage.set(applicationTokenStorageKey, value);
            return true;
        },
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
    messages.ru.top_all = 'Общий топ';
    messages.ru.top_tv = 'Сериалы';
    messages.ru.top_movies = 'Фильмы';
    messages.ru.top_ona = 'ONA';
    messages.en.version_name = 'YummyAnime';
    messages.en.version_label = 'Version';
    messages.en.top_all = 'Overall';
    messages.en.top_tv = 'TV series';
    messages.en.top_movies = 'Movies';
    messages.en.top_ona = 'ONA';
    messages.ru.back_to_lampa = 'Вернуться в Lampa';
    messages.en.back_to_lampa = 'Return to Lampa';
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
    messages.ru.auto_sync_progress = 'Автосинхронизация прогресса';
    messages.ru.auto_sync_progress_description = 'Автоматически сохранять в аккаунте YummyAnime прогресс внутреннего плеера Lampa. При отключении доступна ручная синхронизация на странице аккаунта';
    messages.ru.user_lists = 'Мои списки';
    messages.ru.more = 'Ещё';
    messages.ru.user_lists_description = 'Списки вашего аккаунта YummyAnime';
    messages.ru.user_lists_error = 'Не удалось загрузить ваши списки YummyAnime';
    messages.ru.open_list = 'Открыть список';
    messages.ru.watch_history = 'История просмотра';
    messages.ru.favorites = 'Любимое';
    messages.ru.license_notice = 'Расширение распространяется по свободной лицензии MIT · https://github.com/AndrewCodeman/lampa_yani';
    messages.ru.my_reviews = 'Мои отзывы';
    messages.ru.my_reviews_description = 'Отзывы пользователя YummyAnime';
    messages.ru.reviews_empty = 'Отзывов пока нет';
    messages.ru.reviews_error = 'Не удалось загрузить отзывы';
    messages.ru.for_you = 'Для вас';
    messages.ru.episode_flow = 'Выход серий';
    messages.ru.japan_broadcast = 'Эфир в Японии';
    messages.ru.new_translations = 'Новые переводы';
    messages.ru.translations_and_dubs = 'Переводы и озвучки';
    messages.ru.new_translations_error = 'Не удалось загрузить новые переводы и озвучки';
    messages.ru.new_translations_empty = 'Новых переводов и озвучек пока нет';
    messages.ru.new_releases = 'Новые релизы';
    messages.ru.new_releases_empty = 'Новых релизов пока нет';
    messages.ru.new_releases_error = 'Не удалось загрузить новые релизы';
    messages.ru.discover = 'Открывайте новое';
    messages.ru.collections = 'Коллекции';
    messages.ru.collection = 'Коллекция';
    messages.ru.collections_load_error = 'Не удалось загрузить коллекции';
    messages.ru.collection_load_error = 'Не удалось загрузить коллекцию';
    messages.ru.collection_empty = 'В этой коллекции пока нет тайтлов';
    messages.ru.episodes_short = 'серий';
    messages.ru.episode_information = 'Информация о сериях';
    messages.ru.seasons_short = 'сез.';
    messages.ru.episodes_aired = 'Вышло';
    messages.ru.episodes_watched = 'Просмотрено';
    messages.ru.recommendations_empty = 'Рекомендации появятся после просмотра тайтлов';
    messages.ru.recommendations_error = 'Не удалось загрузить рекомендации';
    messages.ru.because_you_watched = 'После просмотра';
    messages.ru.recommended_for_you = 'Рекомендовано для вас';
    messages.ru.popular_fallback = 'Популярное сейчас';
    messages.ru.updates = 'Обновления';
    messages.ru.updates_error = 'Не удалось загрузить обновления';
    messages.ru.updates_empty = 'Для выбранных списков и подписок новых обновлений пока нет';
    messages.ru.upcoming_release = 'Ожидается выпуск';
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
    messages.en.auto_sync_progress = 'Automatic progress sync';
    messages.en.auto_sync_progress_description = 'Automatically save internal Lampa player progress to the YummyAnime account. When disabled, manual sync is available on the account page';
    messages.en.user_lists = 'My Lists';
    messages.en.more = 'More';
    messages.en.user_lists_description = 'Lists from your YummyAnime account';
    messages.en.user_lists_error = 'Failed to load your YummyAnime lists';
    messages.en.open_list = 'Open list';
    messages.en.watch_history = 'Watch history';
    messages.en.favorites = 'Favorites';
    messages.en.license_notice = 'This extension is distributed under the free MIT License · https://github.com/AndrewCodeman/lampa_yani';
    messages.en.my_reviews = 'My reviews';
    messages.en.my_reviews_description = 'Your YummyAnime reviews';
    messages.en.reviews_empty = 'There are no reviews yet';
    messages.en.reviews_error = 'Failed to load reviews';
    messages.en.for_you = 'For you';
    messages.en.episode_flow = 'Episode releases';
    messages.en.japan_broadcast = 'Japanese broadcast';
    messages.en.new_translations = 'New translations';
    messages.en.translations_and_dubs = 'Translations and dubs';
    messages.en.new_translations_error = 'Failed to load new translations and dubs';
    messages.en.new_translations_empty = 'There are no new translations or dubs yet';
    messages.en.new_releases = 'New releases';
    messages.en.new_releases_empty = 'There are no new releases yet';
    messages.en.new_releases_error = 'Failed to load new releases';
    messages.en.discover = 'Discover something new';
    messages.en.collections = 'Collections';
    messages.en.collection = 'Collection';
    messages.en.collections_load_error = 'Failed to load collections';
    messages.en.collection_load_error = 'Failed to load the collection';
    messages.en.collection_empty = 'This collection does not contain any titles yet';
    messages.en.episodes_short = 'episodes';
    messages.en.episode_information = 'Episode information';
    messages.en.seasons_short = 'seasons';
    messages.en.episodes_aired = 'Aired';
    messages.en.episodes_watched = 'Watched';
    messages.en.recommendations_empty = 'Recommendations will appear after you watch some anime';
    messages.en.recommendations_error = 'Failed to load recommendations';
    messages.en.because_you_watched = 'Because you watched';
    messages.en.recommended_for_you = 'Recommended for you';
    messages.en.popular_fallback = 'Popular now';
    messages.en.updates = 'Updates';
    messages.en.updates_error = 'Failed to load updates';
    messages.en.updates_empty = 'There are no new updates for your selected lists and subscriptions';
    messages.en.upcoming_release = 'Upcoming release';
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
    messages.ru.detail_load_error = 'Не удалось загрузить данные YummyAnime';
    messages.ru.aniskip = 'Пропуск опенинга и эндинга';
    messages.ru.aniskip_description = 'Тайминги берутся из AniSkip по идентификатору MyAnimeList. Работает только во внутреннем плеере Lampa';
    messages.ru.aniskip_off = 'Выключено';
    messages.ru.aniskip_openings = 'Только опенинги';
    messages.ru.aniskip_openings_endings = 'Опенинги и эндинги';
    messages.ru.aniskip_opening_skipped = 'Опенинг пропущен';
    messages.ru.aniskip_ending_skipped = 'Эндинг пропущен';
    messages.ru.auto_next = 'Автопереход к следующей серии';
    messages.ru.auto_next_description = 'В конце серии запускать следующую и заранее готовить её поток. Работает только во внутреннем плеере Lampa';
    messages.ru.auto_next_starting = 'Следующая серия:';
    messages.ru.resolver_server = 'Сервер резолвера YummyAnime';
    messages.ru.resolver_server_description = 'Собственный сервис из папки server/, превращающий плеер Alloha в обычный HLS-поток';
    messages.ru.resolver_server_prompt = 'Адрес резолвера, например http://192.168.1.10:8790. Оставьте пустым для отключения';
    messages.ru.resolver_server_saved = 'Сервер резолвера сохранён';
    messages.ru.resolver_server_disabled = 'Резолвер отключён';
    messages.ru.resolver_server_invalid = 'Укажите полный адрес резолвера с http:// или https://';
    messages.ru.resolver_unavailable = 'Модуль резолвера недоступен';
    messages.ru.resolver_check = 'Проверить резолвер';
    messages.ru.resolver_check_description = 'Запросить /health у настроенного сервера';
    messages.ru.resolver_ok = 'Резолвер доступен';
    messages.ru.resolver_error = 'Резолвер недоступен';
    messages.ru.alloha_iframe = 'Alloha: встроенный плеер сайта';
    messages.ru.alloha_iframe_description = 'Если прямой поток получить не удалось, открывать оригинальный плеер Alloha внутри Lampa. Таймлайн Lampa и внешний плеер при этом недоступны';
    messages.ru.usage_policy_title = 'Политика использования';
    messages.ru.usage_policy_as_is = 'Расширение YummyAnime предоставляется «как есть», без каких-либо явных или подразумеваемых гарантий.';
    messages.ru.usage_policy_information = 'Расширение предназначено исключительно для ознакомительных и информационных целей.';
    messages.ru.usage_policy_legal = 'Расширение не предназначено для использования в незаконных действиях, нарушения авторских прав или обхода ограничений доступа.';
    messages.ru.usage_policy_responsibility = 'Пользователь самостоятельно отвечает за соблюдение законодательства своей страны и правил сторонних сервисов.';
    messages.ru.usage_policy_accept = 'Закрыть';
    messages.ru.usage_policy_settings_description = 'Устанавливая и включая расширение, вы автоматически соглашаетесь с установленными правилами. Открыть политику использования';
    messages.ru.api_settings = 'YummyAnime API';
    messages.ru.public_application_token = 'Публичный ключ приложения';
    messages.ru.public_application_token_description = 'Ключ для заголовка X-Application';
    messages.ru.public_application_token_default = 'стандартный ключ YummyAnime for Lampa';
    messages.ru.public_application_token_custom = 'пользовательский ключ';
    messages.ru.public_application_token_prompt = 'Введите публичный ключ приложения YummyAnime. Оставьте поле пустым, чтобы вернуть стандартный ключ. Не вводите приватный ключ';
    messages.ru.public_application_token_saved = 'Пользовательский публичный ключ сохранён';
    messages.ru.public_application_token_restored = 'Восстановлен стандартный публичный ключ YummyAnime for Lampa';
    messages.ru.public_application_token_invalid = 'Некорректный публичный ключ приложения';
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
    messages.en.detail_load_error = 'Failed to load YummyAnime details';
    messages.en.aniskip = 'Skip openings and endings';
    messages.en.aniskip_description = 'Timestamps come from AniSkip by MyAnimeList id. Works in the internal Lampa player only';
    messages.en.aniskip_off = 'Disabled';
    messages.en.aniskip_openings = 'Openings only';
    messages.en.aniskip_openings_endings = 'Openings and endings';
    messages.en.aniskip_opening_skipped = 'Opening skipped';
    messages.en.aniskip_ending_skipped = 'Ending skipped';
    messages.en.auto_next = 'Auto-play the next episode';
    messages.en.auto_next_description = 'Start the next episode when one ends and resolve its stream in advance. Works in the internal Lampa player only';
    messages.en.auto_next_starting = 'Next episode:';
    messages.en.resolver_server = 'YummyAnime resolver server';
    messages.en.resolver_server_description = 'Self-hosted service from the server/ directory that turns the Alloha player into a plain HLS stream';
    messages.en.resolver_server_prompt = 'Resolver address, for example http://192.168.1.10:8790. Leave empty to disable';
    messages.en.resolver_server_saved = 'Resolver server saved';
    messages.en.resolver_server_disabled = 'Resolver disabled';
    messages.en.resolver_server_invalid = 'Enter a full resolver address including http:// or https://';
    messages.en.resolver_unavailable = 'The resolver module is unavailable';
    messages.en.resolver_check = 'Check the resolver';
    messages.en.resolver_check_description = 'Request /health from the configured server';
    messages.en.resolver_ok = 'Resolver is reachable';
    messages.en.resolver_error = 'Resolver is unreachable';
    messages.en.alloha_iframe = 'Alloha: embedded site player';
    messages.en.alloha_iframe_description = 'When no direct stream can be resolved, open the original Alloha player inside Lampa. The Lampa timeline and external players stay unavailable';
    messages.en.usage_policy_title = 'Usage policy';
    messages.en.usage_policy_as_is = 'The YummyAnime extension is provided “as is”, without warranties of any kind, express or implied.';
    messages.en.usage_policy_information = 'The extension is intended solely for informational and introductory purposes.';
    messages.en.usage_policy_legal = 'The extension is not intended for illegal activity, copyright infringement, or circumvention of access restrictions.';
    messages.en.usage_policy_responsibility = 'Users are responsible for complying with the laws of their country and the rules of third-party services.';
    messages.en.usage_policy_accept = 'Close';
    messages.en.usage_policy_settings_description = 'By installing and enabling the extension, you automatically agree to the established rules. Open the usage policy';
    messages.en.api_settings = 'YummyAnime API';
    messages.en.public_application_token = 'Public application key';
    messages.en.public_application_token_description = 'Key sent in the X-Application header';
    messages.en.public_application_token_default = 'default YummyAnime for Lampa key';
    messages.en.public_application_token_custom = 'custom key';
    messages.en.public_application_token_prompt = 'Enter a public YummyAnime application key. Leave empty to restore the default key. Do not enter a private key';
    messages.en.public_application_token_saved = 'Custom public application key saved';
    messages.en.public_application_token_restored = 'Default YummyAnime for Lampa public key restored';
    messages.en.public_application_token_invalid = 'Invalid public application key';
    messages.ru.catalog_sort_top = 'Популярное';
    messages.ru.catalog_sort_new = 'Новинки';
    messages.ru.catalog_sort_rating = 'По рейтингу';
    messages.ru.catalog_sort_votes = 'По оценкам';
    messages.ru.catalog_sort_views = 'По просмотрам';
    messages.ru.catalog_sort_title = 'А–Я';
    messages.ru.catalog_sort_random = 'Случайно';
    messages.ru.scroll_to_top = 'Наверх';
    messages.ru.catalog_filters = 'Фильтры';
    messages.ru.catalog_filter_reset = 'Сбросить фильтры';
    messages.ru.catalog_filter_all = 'Все';
    messages.ru.catalog_filter_type = 'Тип';
    messages.ru.catalog_filter_status = 'Статус выхода';
    messages.ru.catalog_filter_year = 'Период выхода';
    messages.ru.catalog_filter_tv = 'Сериал';
    messages.ru.catalog_filter_movie = 'Фильм';
    messages.ru.catalog_filter_shortfilm = 'Короткометражный фильм';
    messages.ru.catalog_filter_special = 'Спешл';
    messages.ru.catalog_filter_shorttv = 'Короткий сериал';
    messages.ru.catalog_filter_ongoing = 'Онгоинг';
    messages.ru.catalog_filter_released = 'Завершено';
    messages.ru.catalog_filter_announced = 'Анонс';
    messages.ru.catalog_filter_last_3_years = 'Последние 3 года';
    messages.ru.catalog_filter_last_5_years = 'Последние 5 лет';
    messages.ru.catalog_filter_from_2020 = 'С 2020 года';
    messages.ru.catalog_filter_from_2010 = 'С 2010 года';
    messages.ru.media_type_series = 'Сериал';
    messages.ru.media_type_series_short = 'TV';
    messages.ru.media_type_movie = 'Фильм';
    messages.ru.media_type_movie_short = 'Фильм';
    messages.ru.media_type_short = 'Короткометражный фильм';
    messages.ru.media_type_short_short = 'К/м фильм';
    messages.ru.media_type_ova = 'OVA';
    messages.ru.media_type_ova_short = 'OVA';
    messages.ru.media_type_ona = 'ONA';
    messages.ru.media_type_ona_short = 'ONA';
    messages.ru.media_type_special = 'Спецвыпуск';
    messages.ru.media_type_special_short = 'Спешл';
    messages.ru.media_type_music = 'Музыкальное видео';
    messages.ru.media_type_music_short = 'Music';
    messages.ru.set_rating = 'Оценить тайтл';
    messages.ru.remove_rating = 'Удалить оценку';
    messages.ru.rating_removed = 'Оценка удалена из YummyAnime';
    messages.en.catalog_sort_top = 'Popular';
    messages.en.catalog_sort_new = 'Newest';
    messages.en.catalog_sort_rating = 'Top rating';
    messages.en.catalog_sort_votes = 'Most rated';
    messages.en.catalog_sort_views = 'Most viewed';
    messages.en.catalog_sort_title = 'A–Z';
    messages.en.catalog_sort_random = 'Random';
    messages.en.scroll_to_top = 'Back to top';
    messages.en.catalog_filters = 'Filters';
    messages.en.catalog_filter_reset = 'Reset filters';
    messages.en.catalog_filter_all = 'All';
    messages.en.catalog_filter_type = 'Type';
    messages.en.catalog_filter_status = 'Release status';
    messages.en.catalog_filter_year = 'Release period';
    messages.en.catalog_filter_tv = 'TV series';
    messages.en.catalog_filter_movie = 'Movie';
    messages.en.catalog_filter_shortfilm = 'Short film';
    messages.en.catalog_filter_special = 'Special';
    messages.en.catalog_filter_shorttv = 'Short TV series';
    messages.en.catalog_filter_ongoing = 'Ongoing';
    messages.en.catalog_filter_released = 'Completed';
    messages.en.catalog_filter_announced = 'Announced';
    messages.en.catalog_filter_last_3_years = 'Last 3 years';
    messages.en.catalog_filter_last_5_years = 'Last 5 years';
    messages.en.catalog_filter_from_2020 = 'Since 2020';
    messages.en.catalog_filter_from_2010 = 'Since 2010';
    messages.en.media_type_series = 'Series';
    messages.en.media_type_series_short = 'TV';
    messages.en.media_type_movie = 'Film';
    messages.en.media_type_movie_short = 'Film';
    messages.en.media_type_short = 'Short film';
    messages.en.media_type_short_short = 'Short';
    messages.en.media_type_ova = 'OVA';
    messages.en.media_type_ova_short = 'OVA';
    messages.en.media_type_ona = 'ONA';
    messages.en.media_type_ona_short = 'ONA';
    messages.en.media_type_special = 'Special';
    messages.en.media_type_special_short = 'Special';
    messages.en.media_type_music = 'Music video';
    messages.en.media_type_music_short = 'Music';
    messages.en.set_rating = 'Rate title';
    messages.en.remove_rating = 'Remove rating';
    messages.en.rating_removed = 'Rating removed from YummyAnime';

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
    messages.uk.back_to_lampa = 'Повернутися до Lampa';
    messages.uk.top_all = 'Загальний топ';
    messages.uk.top_tv = 'Серіали';
    messages.uk.top_movies = 'Фільми';
    messages.uk.top_ona = 'ONA';
    messages.uk.episode_flow = 'Вихід серій';
    messages.uk.japan_broadcast = 'Ефір у Японії';
    messages.uk.new_translations = 'Нові переклади';
    messages.uk.translations_and_dubs = 'Переклади та озвучення';
    messages.uk.new_translations_error = 'Не вдалося завантажити нові переклади та озвучення';
    messages.uk.new_translations_empty = 'Нових перекладів та озвучень поки немає';
    messages.uk.new_releases = 'Нові релізи';
    messages.uk.new_releases_empty = 'Нових релізів поки немає';
    messages.uk.new_releases_error = 'Не вдалося завантажити нові релізи';
    messages.uk.discover = 'Відкривайте нове';
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
    messages.uk.auto_sync_progress = 'Автосинхронізація прогресу';
    messages.uk.auto_sync_progress_description = 'Автоматично зберігати в обліковому записі YummyAnime прогрес внутрішнього плеєра Lampa. Після вимкнення доступна ручна синхронізація на сторінці облікового запису';
    messages.uk.user_lists = 'Мої списки';
    messages.uk.more = 'Ще';
    messages.uk.user_lists_description = 'Списки вашого облікового запису YummyAnime';
    messages.uk.user_lists_error = 'Не вдалося завантажити ваші списки YummyAnime';
    messages.uk.open_list = 'Відкрити список';
    messages.uk.watch_history = 'Історія перегляду';
    messages.uk.favorites = 'Улюблене';
    messages.uk.license_notice = 'Розширення поширюється за вільною ліцензією MIT · https://github.com/AndrewCodeman/lampa_yani';
    messages.uk.my_reviews = 'Мої відгуки';
    messages.uk.my_reviews_description = 'Відгуки користувача YummyAnime';
    messages.uk.reviews_empty = 'Відгуків ще немає';
    messages.uk.reviews_error = 'Не вдалося завантажити відгуки';
    messages.uk.for_you = 'Для вас';
    messages.uk.collections = 'Колекції';
    messages.uk.collection = 'Колекція';
    messages.uk.collections_load_error = 'Не вдалося завантажити колекції';
    messages.uk.collection_load_error = 'Не вдалося завантажити колекцію';
    messages.uk.collection_empty = 'У цій колекції поки немає тайтлів';
    messages.uk.episodes_short = 'серій';
    messages.uk.episode_information = 'Інформація про серії';
    messages.uk.seasons_short = 'сез.';
    messages.uk.episodes_aired = 'Вийшло';
    messages.uk.episodes_watched = 'Переглянуто';
    messages.uk.recommendations_empty = 'Рекомендації з’являться після перегляду тайтлів';
    messages.uk.recommendations_error = 'Не вдалося завантажити рекомендації';
    messages.uk.because_you_watched = 'Після перегляду';
    messages.uk.recommended_for_you = 'Рекомендовано для вас';
    messages.uk.popular_fallback = 'Популярне зараз';
    messages.uk.updates = 'Оновлення';
    messages.uk.updates_error = 'Не вдалося завантажити оновлення';
    messages.uk.updates_empty = 'Для вибраних списків і підписок нових оновлень поки немає';
    messages.uk.upcoming_release = 'Очікується випуск';
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
    messages.uk.detail_load_error = 'Не вдалося завантажити дані YummyAnime';
    messages.uk.aniskip = 'Пропуск опенінга та ендінга';
    messages.uk.aniskip_description = 'Тайминги беруться з AniSkip за ідентифікатором MyAnimeList. Працює лише у внутрішньому плеєрі Lampa';
    messages.uk.aniskip_off = 'Вимкнено';
    messages.uk.aniskip_openings = 'Лише опенінги';
    messages.uk.aniskip_openings_endings = 'Опенінги та ендінги';
    messages.uk.aniskip_opening_skipped = 'Опенінг пропущено';
    messages.uk.aniskip_ending_skipped = 'Ендінг пропущено';
    messages.uk.auto_next = 'Автоперехід до наступної серії';
    messages.uk.auto_next_description = 'Наприкінці серії запускати наступну та заздалегідь готувати її потік. Працює лише у внутрішньому плеєрі Lampa';
    messages.uk.auto_next_starting = 'Наступна серія:';
    messages.uk.resolver_server = 'Сервер резолвера YummyAnime';
    messages.uk.resolver_server_description = 'Власний сервіс із теки server/, що перетворює плеєр Alloha на звичайний HLS-потік';
    messages.uk.resolver_server_prompt = 'Адреса резолвера, наприклад http://192.168.1.10:8790. Залиште порожнім для вимкнення';
    messages.uk.resolver_server_saved = 'Сервер резолвера збережено';
    messages.uk.resolver_server_disabled = 'Резолвер вимкнено';
    messages.uk.resolver_server_invalid = 'Вкажіть повну адресу резолвера з http:// або https://';
    messages.uk.resolver_unavailable = 'Модуль резолвера недоступний';
    messages.uk.resolver_check = 'Перевірити резолвер';
    messages.uk.resolver_check_description = 'Запитати /health у налаштованого сервера';
    messages.uk.resolver_ok = 'Резолвер доступний';
    messages.uk.resolver_error = 'Резолвер недоступний';
    messages.uk.alloha_iframe = 'Alloha: вбудований плеєр сайту';
    messages.uk.alloha_iframe_description = 'Якщо прямий потік отримати не вдалося, відкривати оригінальний плеєр Alloha всередині Lampa. Таймлайн Lampa та зовнішній плеєр при цьому недоступні';
    messages.uk.usage_policy_title = 'Політика використання';
    messages.uk.usage_policy_as_is = 'Розширення YummyAnime надається «як є», без будь-яких прямих або непрямих гарантій.';
    messages.uk.usage_policy_information = 'Розширення призначене виключно для ознайомлювальних та інформаційних цілей.';
    messages.uk.usage_policy_legal = 'Розширення не призначене для незаконних дій, порушення авторських прав або обходу обмежень доступу.';
    messages.uk.usage_policy_responsibility = 'Користувач самостійно відповідає за дотримання законодавства своєї країни та правил сторонніх сервісів.';
    messages.uk.usage_policy_accept = 'Закрити';
    messages.uk.usage_policy_settings_description = 'Установлюючи та вмикаючи розширення, ви автоматично погоджуєтеся з установленими правилами. Відкрити політику використання';
    messages.uk.api_settings = 'YummyAnime API';
    messages.uk.public_application_token = 'Публічний ключ застосунку';
    messages.uk.public_application_token_description = 'Ключ для заголовка X-Application';
    messages.uk.public_application_token_default = 'стандартний ключ YummyAnime for Lampa';
    messages.uk.public_application_token_custom = 'користувацький ключ';
    messages.uk.public_application_token_prompt = 'Введіть публічний ключ застосунку YummyAnime. Залиште поле порожнім, щоб повернути стандартний ключ. Не вводьте приватний ключ';
    messages.uk.public_application_token_saved = 'Користувацький публічний ключ збережено';
    messages.uk.public_application_token_restored = 'Відновлено стандартний публічний ключ YummyAnime for Lampa';
    messages.uk.public_application_token_invalid = 'Некоректний публічний ключ застосунку';
    messages.uk.catalog_sort_top = 'Популярне';
    messages.uk.catalog_sort_new = 'Новинки';
    messages.uk.catalog_sort_rating = 'За рейтингом';
    messages.uk.catalog_sort_votes = 'За оцінками';
    messages.uk.catalog_sort_views = 'За переглядами';
    messages.uk.catalog_sort_title = 'А–Я';
    messages.uk.catalog_sort_random = 'Випадково';
    messages.uk.scroll_to_top = 'Нагору';
    messages.uk.catalog_filters = 'Фільтри';
    messages.uk.catalog_filter_reset = 'Скинути фільтри';
    messages.uk.catalog_filter_all = 'Усі';
    messages.uk.catalog_filter_type = 'Тип';
    messages.uk.catalog_filter_status = 'Статус виходу';
    messages.uk.catalog_filter_year = 'Період виходу';
    messages.uk.catalog_filter_tv = 'Серіал';
    messages.uk.catalog_filter_movie = 'Фільм';
    messages.uk.catalog_filter_shortfilm = 'Короткометражний фільм';
    messages.uk.catalog_filter_special = 'Спешл';
    messages.uk.catalog_filter_shorttv = 'Короткий серіал';
    messages.uk.catalog_filter_ongoing = 'Онгоїнг';
    messages.uk.catalog_filter_released = 'Завершено';
    messages.uk.catalog_filter_announced = 'Анонс';
    messages.uk.catalog_filter_last_3_years = 'Останні 3 роки';
    messages.uk.catalog_filter_last_5_years = 'Останні 5 років';
    messages.uk.catalog_filter_from_2020 = 'З 2020 року';
    messages.uk.catalog_filter_from_2010 = 'З 2010 року';
    messages.uk.media_type_series = 'Серіал';
    messages.uk.media_type_series_short = 'TV';
    messages.uk.media_type_movie = 'Фільм';
    messages.uk.media_type_movie_short = 'Фільм';
    messages.uk.media_type_short = 'Короткометражний фільм';
    messages.uk.media_type_short_short = 'К/м фільм';
    messages.uk.media_type_ova = 'OVA';
    messages.uk.media_type_ova_short = 'OVA';
    messages.uk.media_type_ona = 'ONA';
    messages.uk.media_type_ona_short = 'ONA';
    messages.uk.media_type_special = 'Спецвипуск';
    messages.uk.media_type_special_short = 'Спешл';
    messages.uk.media_type_music = 'Музичне відео';
    messages.uk.media_type_music_short = 'Music';
    messages.uk.set_rating = 'Оцінити тайтл';
    messages.uk.remove_rating = 'Видалити оцінку';
    messages.uk.rating_removed = 'Оцінку видалено з YummyAnime';

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
    var refreshPromise = null;
    var refreshInterval = 2 * 24 * 60 * 60 * 1000;
    var refreshRetryDelay = 3 * 60 * 60 * 1000;

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

    function applicationToken() {
        return LampaYaniConfig.applicationToken ? LampaYaniConfig.applicationToken() : LampaYaniConfig.applicationHeader;
    }

    function persist(data) {
        memory = data || {};
        Lampa.Storage.set(key, JSON.stringify(memory));
        return memory;
    }

    function refreshRequest(token) {
        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timeout = Number(LampaYaniConfig.requestTimeout || 15000);
        var timer;
        var timeoutPromise = new Promise(function (resolve, reject) {
            timer = setTimeout(function () {
                if (controller) controller.abort();
                reject(new Error('Token refresh timeout'));
            }, timeout);
        });
        var request = fetch(LampaYaniConfig.apiBase + '/profile/token', {
            headers: {
                'X-Application': applicationToken(),
                Authorization: 'Bearer ' + token,
                Accept: 'application/json'
            },
            signal: controller ? controller.signal : undefined
        });
        return Promise.race([request, timeoutPromise]).then(function (response) {
            clearTimeout(timer);
            if (!response.ok) throw new Error('Token refresh failed: ' + response.status);
            return response.json();
        }, function (error) {
            clearTimeout(timer);
            throw error;
        });
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
            var previous = readStored();
            if (!token) throw new Error('Login response did not contain a token');
            memory = {
                token: token,
                refreshed_at: data.refreshed_at || Date.now(),
                login: data.login || previous.login || '',
                display_name: data.display_name || data.login || previous.display_name || previous.login || '',
                user_id: Number(data.user_id || data.id || previous.user_id || 0) || 0,
                refresh_retry_at: Number(data.refresh_retry_at || 0) || 0
            };
            return persist(memory);
        },
        clear: function () { refreshPromise = null; persist({}); },
        needsRefresh: function () {
            var current = this.get();
            if (!tokenFrom(current)) return false;
            var now = Date.now();
            if (Number(current.refresh_retry_at || 0) > now) return false;
            return now - Number(current.refreshed_at || 0) >= refreshInterval;
        },
        refreshIfNeeded: function () {
            var self = this;
            if (!self.needsRefresh()) return Promise.resolve(self.get());
            return self.refresh().catch(function (error) {
                var current = self.get();
                if (!tokenFrom(current)) return current;
                current.refresh_retry_at = Date.now() + refreshRetryDelay;
                persist(current);
                console.warn('[YummyAnime] Automatic token refresh failed; keeping current token', error);
                return current;
            });
        },
        refresh: function () {
            if (!this.token()) return Promise.reject(new Error('Not authorized'));
            if (refreshPromise) return refreshPromise;
            var token = this.token();
            refreshPromise = refreshRequest(token).then(function (payload) {
                var current = LampaYaniAuth.get();
                if (LampaYaniAuth.token() !== token) throw new Error('Authorization changed during token refresh');
                var data = payload.response || payload;
                LampaYaniAuth.save({token: tokenFrom(data), refreshed_at: Date.now(), login: current.login, display_name: current.display_name, user_id: current.user_id});
                return LampaYaniAuth.get();
            });
            refreshPromise = refreshPromise.then(function (result) {
                refreshPromise = null;
                return result;
            }, function (error) {
                refreshPromise = null;
                throw error;
            });
            return refreshPromise;
        },
        login: function (login, password) {
            return fetch(LampaYaniConfig.apiBase + '/profile/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'X-Application': applicationToken(), Accept: 'application/json'},
                body: JSON.stringify({login: login, password: password, need_json: true})
            }).then(function (response) {
                if (!response.ok) throw new Error('Login failed: ' + response.status);
                return response.json();
            }).then(function (payload) {
                var data = payload.response || payload;
                LampaYaniAuth.save({token: tokenFrom(data), refreshed_at: Date.now(), login: login, user_id: data.id || data.user_id});
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
                    'X-Application': applicationToken(),
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
    var pendingRequests = {};

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
            var timer;
            var timeoutPromise = new Promise(function (resolve, reject) {
                timer = setTimeout(function () {
                    if (controller) controller.abort();
                    reject(new Error('YummyAnime request timeout'));
                }, timeout);
            });
            return Promise.race([fetch(url, requestOptions), timeoutPromise]).then(function (response) {
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
        if (options.auth && !options.authRefreshChecked && window.LampaYaniAuth && LampaYaniAuth.token() && LampaYaniAuth.refreshIfNeeded) {
            var refreshedOptions = Object.assign({}, options, {authRefreshChecked: true});
            return LampaYaniAuth.refreshIfNeeded().then(function () {
                return request(path, refreshedOptions);
            });
        }
        var headers = Object.assign({}, options.headers || {});
        var apiLanguage = window.LampaYaniI18n ? LampaYaniI18n.getLanguage() : 'ru';
        var cacheKey = 'lampa_yummyanime_cache_' + apiLanguage + '_' + path;
        var cacheTtl = options.cacheTtl || config.cacheTtl || 300000;
        var method = options.method || 'GET';

        var applicationToken = config.applicationToken ? config.applicationToken() : config.applicationHeader;
        if (applicationToken) headers['X-Application'] = applicationToken;
        if (options.auth && LampaYaniAuth && LampaYaniAuth.token()) headers.Authorization = 'Bearer ' + LampaYaniAuth.token();
        headers.Accept = 'application/json';
        headers.Lang = apiLanguage;
        if (options.token) headers.Authorization = 'Bearer ' + options.token;

        var pendingKey = method === 'GET' && options.dedupe !== false
            ? [apiLanguage, path, options.auth ? 'auth' : 'public', options.token ? 'token' : ''].join('|')
            : '';
        if (pendingKey && pendingRequests[pendingKey]) return pendingRequests[pendingKey];

        var operation = fetchWithRetry(config.apiBase + path, {
            method: method,
            headers: headers,
            body: options.body
        }, method === 'GET').then(function (response) {
            if (!response.ok) throw new Error('YummyAnime API: ' + response.status);
            return response.json();
        }).then(function (payload) {
            if (method === 'GET' && options.cache !== false && window.Lampa && Lampa.Storage) {
                Lampa.Storage.set(cacheKey, JSON.stringify({time: Date.now(), data: payload}));
                rememberCacheKey(cacheKey);
            }
            return payload;
        }).catch(function (error) {
            if (method === 'GET' && options.cache !== false && window.Lampa && Lampa.Storage) {
                try {
                    var cached = JSON.parse(Lampa.Storage.get(cacheKey, 'null'));
                    if (cached && (options.staleFallback || Date.now() - cached.time < cacheTtl)) return cached.data;
                } catch (ignore) {}
            }
            throw error;
        });

        if (!pendingKey) return operation;
        pendingRequests[pendingKey] = operation.then(function (payload) {
            delete pendingRequests[pendingKey];
            return payload;
        }, function (error) {
            delete pendingRequests[pendingKey];
            throw error;
        });
        return pendingRequests[pendingKey];
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
        feed: function () {
            return request('/feed', {
                auth: true,
                cacheTtl: 5 * 60 * 1000,
                staleFallback: true
            });
        },
        collectionCatalog: function (limit, offset) {
            return request('/collection?limit=' + encodeURIComponent(limit || 20) + '&offset=' + encodeURIComponent(offset || 0), {
                auth: true,
                cacheTtl: 10 * 60 * 1000,
                staleFallback: true
            });
        },
        collectionDetail: function (id, limit, offset) {
            var query = '?limit=' + encodeURIComponent(limit || 30) + '&offset=' + encodeURIComponent(offset || 0);
            return request('/collection/' + encodeURIComponent(id) + query, {
                auth: true,
                cacheTtl: 10 * 60 * 1000,
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
            return request('/anime/' + encodeURIComponent(id) + '/videos', {auth: true, cache: false});
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
        watchHistory: function (limit, offset) {
            return request('/video/watch-history?limit=' + encodeURIComponent(limit || 30) + '&offset=' + encodeURIComponent(offset || 0), {
                auth: true,
                cache: false
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

    // Opening and ending timestamps from AniSkip, keyed by MyAnimeList id.
    // YummyAnime already exposes that id on a title (`yani_remote_ids`), which
    // is the only thing AniSkip needs, so no extra matching is involved.

    var API_BASE = 'https://api.aniskip.com/v2';
    var CACHE_TTL = 24 * 60 * 60 * 1000;
    var CACHE_LIMIT = 200;
    var cache = {};
    var cacheKeys = [];

    function responseText(value) {
        if (typeof value === 'string') return value;
        if (value === undefined || value === null) return '';
        try { return JSON.stringify(value); } catch (ignore) { return String(value); }
    }

    function timeout() {
        return Number((window.LampaYaniConfig && LampaYaniConfig.requestTimeout) || 15000);
    }

    function nativeRequestText(url) {
        return new Promise(function (resolve, reject) {
            if (!window.Lampa || !Lampa.Reguest) return reject(new Error('Lampa native request is unavailable'));
            var network = new Lampa.Reguest();
            if (network.timeout) network.timeout(timeout());
            network.native(url, function (value) {
                resolve(responseText(value));
            }, function (error, exception) {
                var message = (error && (error.responseText || error.message || error.status)) || exception || 'AniSkip request failed';
                reject(new Error(String(message)));
            }, false, {dataType: 'text', timeout: timeout()});
        });
    }

    function browserRequestText(url) {
        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timer = setTimeout(function () { if (controller) controller.abort(); }, timeout());
        var options = {method: 'GET', credentials: 'omit'};
        if (controller) options.signal = controller.signal;
        return fetch(url, options).then(function (response) {
            clearTimeout(timer);
            return response.text().then(function (text) {
                // AniSkip answers 404 with a valid body when it simply has no
                // timestamps for an episode, so the body is parsed either way.
                return text;
            });
        }).catch(function (error) {
            clearTimeout(timer);
            throw error;
        });
    }

    function requestText(url) {
        var isAndroid = !!(window.AndroidJS || window.Android) ||
            !!(window.Lampa && Lampa.Platform && Lampa.Platform.is && Lampa.Platform.is('android'));
        if (isAndroid && window.Lampa && Lampa.Reguest) {
            return nativeRequestText(url).catch(function () { return browserRequestText(url); });
        }
        return browserRequestText(url);
    }

    function remember(key, value) {
        delete cache[key];
        cache[key] = {time: Date.now(), value: value};
        cacheKeys = cacheKeys.filter(function (item) { return item !== key; });
        cacheKeys.push(key);
        while (cacheKeys.length > CACHE_LIMIT) delete cache[cacheKeys.shift()];
        return value;
    }

    function cached(key) {
        var item = cache[key];
        if (!item || Date.now() - item.time > CACHE_TTL) return null;
        return item.value;
    }

    function parse(text) {
        var payload;
        try { payload = JSON.parse(text); } catch (error) { return {}; }
        var results = payload && payload.results;
        if (!Array.isArray(results)) return {};
        var intervals = {};
        results.forEach(function (result) {
            var interval = result && result.interval;
            var type = String(result && result.skipType || '').toLowerCase();
            if (!interval || (type !== 'op' && type !== 'ed')) return;
            var start = Number(interval.startTime);
            var end = Number(interval.endTime);
            if (!isFinite(start) || !isFinite(end) || end <= start) return;
            intervals[type] = {start: start, end: end};
        });
        return intervals;
    }

    /**
     * Resolves `{op: {start, end}, ed: {start, end}}` for one episode. Missing
     * data resolves to an empty object rather than rejecting: skip timestamps
     * are a convenience and must never interrupt playback.
     */
    function times(malId, episode, episodeLength) {
        malId = Number(malId) || 0;
        episode = Number(episode) || 0;
        if (!malId || !episode) return Promise.resolve({});
        var key = malId + ':' + episode;
        var hit = cached(key);
        if (hit) return Promise.resolve(hit);
        var url = API_BASE + '/skip-times/' + malId + '/' + episode +
            '?types[]=op&types[]=ed&episodeLength=' + (Math.max(0, Math.round(Number(episodeLength) || 0)));
        return requestText(url).then(function (text) {
            return remember(key, parse(text));
        }).catch(function (error) {
            console.warn('[YummyAnime] AniSkip lookup failed', error);
            return {};
        });
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.AniSkip = window.LampaYaniAniSkip = {
        times: times,
        parse: parse
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

    function positiveNumber(value) {
        value = Number(value);
        return isFinite(value) && value > 0 ? value : 0;
    }

    function explicitSeasonCount(item) {
        var seasons = item && (item.yani_seasons || item.seasons);
        if (Array.isArray(seasons)) return seasons.length;
        return positiveNumber(item && (item.yani_seasons_count || item.seasons_count || item.season_count));
    }

    function median(values) {
        values = values.slice().sort(function (a, b) { return a - b; });
        if (!values.length) return 0;
        var middle = Math.floor(values.length / 2);
        return values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
    }

    function detailEpisodeStats(item, videos, localPlayback) {
        item = item || {};
        videos = Array.isArray(videos) ? videos : [];
        var episodes = item.yani_episodes || item.episodes || {};
        var stats = {
            seasons: explicitSeasonCount(item),
            total: positiveNumber(episodes.count || episodes.total || item.episodes_count),
            aired: positiveNumber(episodes.aired || episodes.released || item.episodes_aired),
            watched: 0,
            minutes: 0
        };
        var grouped = {};

        videos.forEach(function (video, index) {
            video = video || {};
            var number = video.number !== undefined && video.number !== null && video.number !== '' ? String(video.number) :
                video.index !== undefined && video.index !== null && video.index !== '' ? String(video.index) : 'video:' + String(video.video_id || video.id || index);
            var episode = grouped[number] || (grouped[number] = {durations: [], watched: false});
            var duration = positiveNumber(video.duration);
            // YummyAnime video durations are seconds. Ignore implausibly short
            // and long values before calculating one representative duration
            // per episode, so duplicate dubbings do not skew the average.
            if (duration >= 60 && duration <= 4 * 60 * 60) episode.durations.push(duration);
            if (positiveNumber(video.watched && video.watched.end_time) > 0) episode.watched = true;
        });

        if (localPlayback && localPlayback.number !== undefined && localPlayback.number !== null && positiveNumber(localPlayback.time) > 0) {
            var localNumber = String(localPlayback.number || 'local');
            var localEpisode = grouped[localNumber] || (grouped[localNumber] = {durations: [], watched: false});
            localEpisode.watched = true;
            var localDuration = positiveNumber(localPlayback.duration);
            if (localDuration >= 60 && localDuration <= 4 * 60 * 60) localEpisode.durations.push(localDuration);
        }

        var episodeKeys = Object.keys(grouped);
        var durations = [];
        episodeKeys.forEach(function (key) {
            var episode = grouped[key];
            if (episode.watched) stats.watched += 1;
            var representative = median(episode.durations);
            if (representative > 0) durations.push(representative);
        });
        if (!stats.aired && episodeKeys.length) stats.aired = episodeKeys.length;
        if (!stats.total && stats.aired) stats.total = stats.aired;
        if (durations.length) {
            stats.minutes = Math.max(1, Math.round(durations.reduce(function (sum, value) { return sum + value; }, 0) / durations.length / 60));
        } else {
            var fallbackDuration = positiveNumber(item.yani_episode_duration || item.episode_duration || item.duration);
            if (fallbackDuration) stats.minutes = Math.max(1, Math.round(fallbackDuration > 300 ? fallbackDuration / 60 : fallbackDuration));
        }
        return stats;
    }

    function mediaTypeInfo(value) {
        var source = value && typeof value === 'object' ? value : {};
        var full = String(source.name || source.title || source.title_long || '').trim();
        // `alias` is a routing/filter value in parts of the API and is not a
        // user-facing abbreviation. Prefer only the documented short-name
        // fields here.
        var short = String(source.shortname || source.short_name || source.short || '').trim();
        var raw = String(full || short || (typeof value === 'string' ? value : '')).trim();
        if (!raw) return {key: '', full: '', short: ''};

        var normalized = raw.toLowerCase().replace(/[._-]+/g, ' ').replace(/\s+/g, ' ').trim();
        var key = '';
        if (/^(?:tv|tv series|series|serial|сериал|серіал)$/.test(normalized)) key = 'series';
        else if (/^(?:movie|film|feature film|full length film|фильм|полнометражный фильм|фільм|повнометражний фільм)$/.test(normalized)) key = 'movie';
        else if (/^(?:short|short film|короткометражный фильм|короткометражний фільм)$/.test(normalized)) key = 'short';
        else if (/^ova$/.test(normalized)) key = 'ova';
        else if (/^ona$/.test(normalized)) key = 'ona';
        else if (/^(?:special|tv special|спецвыпуск|спецвипуск)$/.test(normalized)) key = 'special';
        else if (/^(?:music|music video|музыкальное видео|музичне відео)$/.test(normalized)) key = 'music';

        return {key: key, full: full, short: short};
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
        detailRouteId: detailRouteId,
        detailEpisodeStats: detailEpisodeStats,
        mediaTypeInfo: mediaTypeInfo
    };
}(window));

(function (window) {
    'use strict';

    // Client for the self-hosted resolver shipped in `server/`. It exists
    // because Alloha's manifest can only be fetched with rotating signed
    // headers, which a browser cannot attach cross-origin, so the work has to
    // happen in a process the user runs themselves. The service answers with a
    // plain HLS URL that both the internal and the external player can open.

    var STORAGE_KEY = 'yani_resolver_url';

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

    function responseText(value) {
        if (typeof value === 'string') return value;
        if (value === undefined || value === null) return '';
        try { return JSON.stringify(value); } catch (ignore) { return String(value); }
    }

    function timeout() {
        return Number((window.LampaYaniConfig && LampaYaniConfig.requestTimeout) || 15000);
    }

    function nativeRequestText(url) {
        return new Promise(function (resolve, reject) {
            if (!window.Lampa || !Lampa.Reguest) return reject(new Error('Lampa native request is unavailable'));
            var network = new Lampa.Reguest();
            if (network.timeout) network.timeout(timeout());
            network.native(url, function (value) {
                resolve(responseText(value));
            }, function (error, exception) {
                var message = (error && (error.responseText || error.message || error.status)) || exception || 'Resolver request failed';
                reject(new Error(String(message)));
            }, false, {dataType: 'text', timeout: timeout()});
        });
    }

    function browserRequestText(url) {
        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timer = setTimeout(function () { if (controller) controller.abort(); }, timeout());
        var options = {method: 'GET', credentials: 'omit'};
        if (controller) options.signal = controller.signal;
        return fetch(url, options).then(function (response) {
            clearTimeout(timer);
            return response.text().then(function (text) {
                if (!response.ok) {
                    var error = new Error('HTTP ' + response.status);
                    error.status = response.status;
                    error.body = text;
                    throw error;
                }
                return text;
            });
        }).catch(function (error) {
            clearTimeout(timer);
            throw error;
        });
    }

    function requestText(url) {
        // The resolver usually lives on the local network over plain HTTP while
        // Lampa itself may be served over HTTPS, so prefer the native Android
        // bridge when it exists and keep the browser request as the fallback.
        var isAndroid = !!(window.AndroidJS || window.Android) ||
            !!(window.Lampa && Lampa.Platform && Lampa.Platform.is && Lampa.Platform.is('android'));
        if (isAndroid && window.Lampa && Lampa.Reguest) {
            return nativeRequestText(url).catch(function (error) {
                console.warn('[YummyAnime] Native resolver request failed, trying browser request', error);
                return browserRequestText(url);
            });
        }
        return browserRequestText(url);
    }

    function requestJson(url) {
        return requestText(url).then(function (text) {
            var payload;
            try { payload = JSON.parse(text); } catch (error) { throw new Error('Invalid resolver response'); }
            if (payload && payload.error) {
                var failure = new Error(String(payload.error));
                failure.unavailable = Boolean(payload.unavailable);
                throw failure;
            }
            return payload;
        });
    }

    function resolve(iframeUrl) {
        var base = baseUrl();
        if (!base) return Promise.reject(new Error('Resolver server is not configured'));
        if (!iframeUrl) return Promise.reject(new Error('Empty stream URL'));
        return requestJson(base + '/resolve?url=' + encodeURIComponent(iframeUrl)).then(function (payload) {
            if (!payload || !payload.url) throw new Error('Resolver returned no stream');
            return {
                url: payload.url,
                quality: payload.quality || 'auto',
                qualities: payload.qualities || null,
                headers: payload.headers || null,
                session: payload.session || '',
                source: payload.source || 'yani-resolver',
                direct: true
            };
        });
    }

    function release(session) {
        var base = baseUrl();
        if (!base || !session) return Promise.resolve(false);
        return requestJson(base + '/release?session=' + encodeURIComponent(session))
            .then(function (payload) { return Boolean(payload && payload.released); })
            .catch(function () { return false; });
    }

    function health() {
        var base = baseUrl();
        if (!base) return Promise.reject(new Error('Resolver server is not configured'));
        return requestJson(base + '/health');
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Resolver = window.LampaYaniResolver = {
        baseUrl: baseUrl,
        setBaseUrl: setBaseUrl,
        normalizeBaseUrl: normalizeBaseUrl,
        enabled: function () { return Boolean(baseUrl()); },
        resolve: resolve,
        release: release,
        health: health
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

    // The YummyAnime player URL already states which season, episode and
    // dubbing were picked: `?token_movie=…&translation=128&season=1&episode=2`.
    // Lampac has to rediscover the title from scratch, so feeding these back is
    // the difference between landing on the requested episode and landing on
    // whatever the balancer happens to list first.
    function sourceHints(sourceUrl) {
        var hints = {season: 0, episode: 0, translation: ''};
        try {
            var query = new URL(String(sourceUrl || '')).searchParams;
            hints.season = Number(query.get('season')) || 0;
            hints.episode = Number(query.get('episode')) || 0;
            hints.translation = String(query.get('translation') || '');
        } catch (ignore) {}
        return hints;
    }

    function buildRootUrl(card, sourceUrl) {
        var base = baseUrl();
        if (!base) return '';
        card = card || {};
        var ids = externalIds(card);
        var params = new URLSearchParams();
        var hints = sourceHints(sourceUrl);
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
        if (hints.season) params.set('s', String(hints.season));
        params.set('serial', '1');
        params.set('original_language', 'ja');
        // `orid` is an Alloha-internal movie token, not something Lampac can
        // look a title up by, so it does not count as an identifier here: for
        // anime without an IMDb or Kinopoisk id, title matching is all Lampac
        // has to work with.
        if (!imdb && !kinopoisk) params.set('similar', 'true');
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

    function chooseSeason(items, selected, hints) {
        var data = window.LampaYaniUiUtils ? LampaYaniUiUtils.videoData(selected || {}) : {};
        var season = Number(firstValue([selected && selected.season, data.season, hints && hints.season, 1]));
        return items.filter(function (item) { return Number(item.season || item.text || 0) === season; })[0] || items[0];
    }

    function chooseVoice(buttons, group) {
        var wanted = cleanText(group && group.title);
        return buttons.filter(function (item) {
            var title = cleanText(item.title || item.name || item.text);
            return wanted && title && (wanted.indexOf(title) >= 0 || title.indexOf(wanted) >= 0);
        })[0] || buttons.filter(function (item) { return item.active; })[0] || buttons[0];
    }

    function chooseEpisode(items, selected, hints) {
        var number = Number(firstValue([selected && selected.number, selected && selected.episode, selected && selected.index, hints && hints.episode]));
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

    function resolvePage(markup, card, selected, group, hints, visited, depth) {
        var base = baseUrl();
        var jsonResult = parseJsonResult(markup, base);
        if (jsonResult) return Promise.resolve(jsonResult);
        if (depth >= MAX_STEPS) return Promise.reject(new Error('Lampac resolution limit reached'));

        var items = parseDataItems(markup, 'videos__item');
        var buttons = parseDataItems(markup, 'videos__button');
        if (!items.length) return Promise.reject(new Error('Lampac returned no playable items'));

        if (buttons.length) {
            var voice = chooseVoice(buttons, group);
            if (voice && voice.url && !voice.active) return follow(voice.url, card, selected, group, hints, visited, depth);
        }

        var playable = items.filter(function (item) { return item.method === 'play' || item.method === 'call' || item.stream; });
        if (playable.length) {
            var episode = chooseEpisode(playable, selected, hints);
            var direct = directResult(episode, base);
            if (direct) return Promise.resolve(direct);
            if (episode.url) return follow(episode.url, card, selected, group, hints, visited, depth);
        }

        var links = items.filter(function (item) { return item.url; });
        if (links.length) {
            var target = links.some(function (item) { return item.similar; }) ? chooseByTitle(links, card) : chooseSeason(links, selected, hints);
            if (target && target.url) return follow(target.url, card, selected, group, hints, visited, depth);
        }
        return Promise.reject(new Error('Lampac did not expose a direct stream'));
    }

    function follow(url, card, selected, group, hints, visited, depth) {
        var base = baseUrl();
        url = absoluteUrl(base, url);
        if (!url || visited[url]) return Promise.reject(new Error('Lampac returned a repeated URL'));
        visited[url] = true;
        return requestText(url).then(function (markup) {
            return resolvePage(markup, card, selected, group, hints, visited, depth + 1);
        });
    }

    function resolveAlloha(card, selected, group, sourceUrl) {
        var root = buildRootUrl(card, sourceUrl);
        if (!root) return Promise.reject(new Error('Lampac server is not configured'));
        return follow(root, card, selected, group, sourceHints(sourceUrl), {}, 0);
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.LampacResolver = window.LampaYaniLampacResolver = {
        baseUrl: baseUrl,
        setBaseUrl: setBaseUrl,
        enabled: function () { return Boolean(baseUrl()); },
        normalizeBaseUrl: normalizeBaseUrl,
        extractOrid: extractOrid,
        sourceHints: sourceHints,
        buildRootUrl: buildRootUrl,
        parseDataItems: parseDataItems,
        resolveAlloha: resolveAlloha
    };
}(window));

(function (global) {
    'use strict';

    var cache = {};
    var order = [];
    var pending = {};
    var queue = [];
    var active = 0;
    var limit = 80;
    var maxActive = 2;
    var requestTimeout = 8000;

    function remember(key, value) {
        if (Object.prototype.hasOwnProperty.call(cache, key)) {
            order = order.filter(function (item) { return item !== key; });
        }
        cache[key] = value;
        order.push(key);
        while (order.length > limit) delete cache[order.shift()];
    }

    function enqueue(task) {
        return new Promise(function (resolve, reject) {
            queue.push({task: task, resolve: resolve, reject: reject});
            drain();
        });
    }

    function drain() {
        while (active < maxActive && queue.length) {
            (function (entry) {
                active++;
                var operation;
                try { operation = entry.task(); } catch (error) { operation = Promise.reject(error); }
                operation.then(entry.resolve, entry.reject).then(function () {
                    active--;
                    drain();
                });
            }(queue.shift()));
        }
    }

    function requestJson(source) {
        return enqueue(function () {
            var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
            var options = source.query
                ? {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({query: 'query ($search: String) { Page(perPage: 1) { media(search: $search, type: ANIME) { coverImage { extraLarge large } } } }', variables: {search: source.query}})}
                : {};
            if (controller) options.signal = controller.signal;
            var timer;
            var timeout = new Promise(function (resolve, reject) {
                timer = setTimeout(function () {
                    if (controller) controller.abort();
                    reject(new Error('poster request timeout'));
                }, requestTimeout);
            });
            return Promise.race([fetch(source.url, options), timeout]).then(function (response) {
                clearTimeout(timer);
                if (!response.ok) throw new Error('poster source ' + response.status);
                return response.json();
            }).catch(function (error) {
                clearTimeout(timer);
                throw error;
            });
        });
    }

    function titles(item) {
        var values = [];
        var add = function (value) {
            value = typeof value === 'string' ? value.trim() : '';
            if (value && values.indexOf(value) < 0) values.push(value);
        };
        ['title', 'name', 'russian', 'english', 'original_title', 'original_name', 'japanese', 'romaji', 'synonym'].forEach(function (key) { add(item && item[key]); });
        ['aliases', 'alternative_titles', 'alternative_names', 'titles', 'synonyms', 'names'].forEach(function (key) {
            var list = item && item[key];
            if (Array.isArray(list)) list.forEach(function (value) { add(typeof value === 'string' ? value : value && (value.title || value.name || value.value)); });
        });
        // A missing poster must not fan out into dozens of requests on a TV.
        return values.slice(0, 2);
    }

    function posterFromPayload(payload, aniList) {
        var item = aniList && payload && payload.data && payload.data.Page
            ? payload.data.Page.media && payload.data.Page.media[0]
            : payload && payload.data
                ? (Array.isArray(payload.data) ? payload.data[0] : payload.data)
                : payload;
        var images = item && item.images || {};
        return aniList
            ? item && item.coverImage && (item.coverImage.large || item.coverImage.extraLarge)
            : images.jpg && (images.jpg.image_url || images.jpg.large_image_url) ||
                images.webp && (images.webp.image_url || images.webp.large_image_url) ||
                item && (item.poster || item.image);
    }

    function find(card) {
        var key = String(card && (card.yani_id || card.title) || '').toLowerCase();
        if (!key) return Promise.resolve('');
        if (Object.prototype.hasOwnProperty.call(cache, key)) return Promise.resolve(cache[key] || '');
        if (pending[key]) return pending[key];

        var ids = card.yani_remote_ids || {};
        var urls = [];
        if (ids.mal || ids.myanimelist) urls.push({url: 'https://api.jikan.moe/v4/anime/' + encodeURIComponent(ids.mal || ids.myanimelist) + '/full'});
        if (ids.shikimori) urls.push({url: 'https://shikimori.one/api/animes/' + encodeURIComponent(ids.shikimori) + '.json'});
        titles(card).forEach(function (title) {
            urls.push({url: 'https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(title) + '&limit=1'});
            urls.push({url: 'https://graphql.anilist.co', query: title});
        });

        function load(index) {
            if (index >= urls.length) return Promise.resolve('');
            var source = urls[index];
            var aniList = source.url === 'https://graphql.anilist.co';
            return requestJson(source).then(function (payload) {
                var poster = posterFromPayload(payload, aniList);
                if (!poster) throw new Error('alternative poster is empty');
                return poster;
            }).catch(function () { return load(index + 1); });
        }

        pending[key] = (urls.length ? load(0) : Promise.resolve('')).then(function (poster) {
            delete pending[key];
            remember(key, poster || null);
            return poster || '';
        }, function () {
            delete pending[key];
            remember(key, null);
            return '';
        });
        return pending[key];
    }

    function renderElement(element, card) {
        var render = element && element.jquery ? element : element ? $(element) : $();
        if (!render.length && card && card.render) render = $(card.render(true));
        return render;
    }

    function prepareImage(image) {
        if (!image || !image.length) return;
        image.attr('loading', 'lazy').attr('decoding', 'async');
    }

    function attach(element, card) {
        var render = renderElement(element, card);
        var image = render.find('img').first();
        var box = render.find('.card__img').first();
        var apply = function (poster) {
            if (!poster) return;
            if (image.length) image.attr('src', poster);
            if (box.length) box.css('background-image', 'url("' + poster.replace(/"/g, '%22') + '")');
        };
        var alternative = function () { find(card).then(apply); };
        prepareImage(image);
        if (image.length) image.off('error.yaniPoster').one('error.yaniPoster', alternative);
        // Do not create a second hidden Image probe. On low-memory WebViews it
        // decoded every catalog poster twice and could terminate the process.
        if (!card.poster && !card.img) alternative();
    }

    function bind(image, card) {
        prepareImage(image);
        image.off('error.yaniPoster').one('error.yaniPoster', function () {
            find(card).then(function (poster) { if (poster) image.attr('src', poster); });
        });
        if (!card.poster && !card.img) find(card).then(function (poster) { if (poster) image.attr('src', poster); });
    }

    global.LampaYani = global.LampaYani || {};
    global.LampaYani.Media = global.LampaYaniMedia = {
        findAlternativePoster: find,
        attachPosterFallback: attach,
        bindPosterFallback: bind
    };
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

    var DEFAULT_DELAY = 400;
    var CACHE_TTL = 2 * 60 * 1000;
    var CACHE_LIMIT = 20;

    function safeQuery(params) {
        var value = params && params.query !== undefined ? params.query : params;
        value = String(value || '').replace(/\+/g, ' ');
        try { value = decodeURIComponent(value); } catch (error) { /* Keep the original input. */ }
        return value.trim();
    }

    function rankCards(cards, query, utils) {
        var normalize = utils && utils.normalizeMatchTitle || function (value) {
            return String(value || '').toLowerCase().trim();
        };
        var titleValues = utils && utils.titleValues || function (card) {
            return [card && card.title, card && card.original_title].filter(Boolean);
        };
        var wanted = normalize(query);

        return (cards || []).map(function (card, index) {
            var values = titleValues(card || {});
            if (Array.isArray(card && card.yani_titles)) values = values.concat(card.yani_titles);
            var score = 0;

            values.forEach(function (value, titleIndex) {
                var candidate = normalize(value);
                if (!candidate || !wanted) return;
                var current = candidate === wanted ? 400 :
                    candidate.indexOf(wanted) === 0 ? 260 :
                    candidate.indexOf(wanted) >= 0 ? 160 :
                    wanted.indexOf(candidate) >= 0 ? 100 : 0;
                if (titleIndex === 0 && current) current += 20;
                if (current > score) score = current;
            });

            return {card: card, index: index, score: score};
        }).sort(function (left, right) {
            return right.score - left.score || left.index - right.index;
        }).map(function (entry) { return entry.card; });
    }

    function create(options) {
        options = options || {};
        var api = options.api;
        var lampa = options.lampa;
        var utils = options.utils || {};
        var delay = options.delay === undefined ? DEFAULT_DELAY : Math.max(0, Number(options.delay) || 0);
        var timer = null;
        var generation = 0;
        var pendingComplete = null;
        var cache = {};
        var cacheOrder = [];

        function completeOnce(callback) {
            var completed = false;
            return function (value) {
                if (completed) return;
                completed = true;
                callback(value);
            };
        }

        function cacheGet(key) {
            var entry = cache[key];
            if (!entry || Date.now() - entry.time > CACHE_TTL) {
                if (entry) delete cache[key];
                return null;
            }
            return entry.cards;
        }

        function cacheSet(key, cards) {
            if (!cache[key]) cacheOrder.push(key);
            cache[key] = {time: Date.now(), cards: cards};
            while (cacheOrder.length > CACHE_LIMIT) delete cache[cacheOrder.shift()];
        }

        function groups(cards) {
            return cards.length ? [{
                title: options.sourceTitle || 'YummyAnime',
                type: 'anime',
                results: cards,
                total: cards.length,
                total_pages: 1
            }] : [];
        }

        function search(params, oncomplete) {
            var query = safeQuery(params);
            var done = completeOnce(typeof oncomplete === 'function' ? oncomplete : function () {});
            var requestGeneration = ++generation;
            var key = (utils.normalizeMatchTitle ? utils.normalizeMatchTitle(query) : query.toLowerCase());

            if (timer) clearTimeout(timer);
            timer = null;
            if (pendingComplete) pendingComplete([]);
            pendingComplete = done;

            if (!query) {
                pendingComplete = null;
                done([]);
                return;
            }

            var cached = cacheGet(key);
            if (cached) {
                pendingComplete = null;
                done(groups(cached));
                return;
            }

            timer = setTimeout(function () {
                timer = null;
                api.search(query, {limit: 30}).then(function (payload) {
                    if (requestGeneration !== generation) return;
                    var cards = api.normalize(payload).map(options.toCard);
                    cards = rankCards(cards, query, utils);
                    cacheSet(key, cards);
                    pendingComplete = null;
                    done(groups(cards));
                }).catch(function (error) {
                    if (requestGeneration !== generation) return;
                    pendingComplete = null;
                    if (options.onError) options.onError(error);
                    done([]);
                });
            }, delay);
        }

        function register() {
            if (!lampa || !lampa.Search || !lampa.Search.addSource || window.yummyanime_search_source_ready) return false;
            window.yummyanime_search_source_ready = true;
            lampa.Search.addSource({
                title: options.sourceTitle || 'YummyAnime',
                search: search,
                onSelect: function (params, close) {
                    if (typeof close === 'function') close();
                    if (options.openDetail) options.openDetail(params && params.element);
                }
            });
            return true;
        }

        function open() {
            if (!options.showInput) return;
            options.showInput({title: options.searchTitle || 'Search', value: ''}, function (value) {
                var query = safeQuery(value);
                if (!query) return;
                if (options.openResults) options.openResults(query);
            });
        }

        function destroy() {
            generation++;
            if (timer) clearTimeout(timer);
            timer = null;
            if (pendingComplete) pendingComplete([]);
            pendingComplete = null;
        }

        return {search: search, register: register, open: open, destroy: destroy};
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Search = window.LampaYaniSearch = {
        create: create,
        safeQuery: safeQuery,
        rankCards: rankCards
    };
}(window));

(function (window) {
    'use strict';

    function definitions(t, currentYear) {
        currentYear = Number(currentYear) || new Date().getFullYear();
        return [
            {
                key: 'type',
                title: t('catalog_filter_type'),
                values: [
                    {key: 'all', title: t('catalog_filter_all'), value: ''},
                    {key: 'tv', title: t('catalog_filter_tv'), value: 'tv'},
                    {key: 'movie', title: t('catalog_filter_movie'), value: 'movie'},
                    {key: 'shortfilm', title: t('catalog_filter_shortfilm'), value: 'shortfilm'},
                    {key: 'ova', title: 'OVA', value: 'ova'},
                    {key: 'ona', title: 'ONA', value: 'ona'},
                    {key: 'special', title: t('catalog_filter_special'), value: 'special'},
                    {key: 'shorttv', title: t('catalog_filter_shorttv'), value: 'shorttv'}
                ]
            },
            {
                key: 'status',
                title: t('catalog_filter_status'),
                values: [
                    {key: 'all', title: t('catalog_filter_all'), value: ''},
                    {key: 'ongoing', title: t('catalog_filter_ongoing'), value: 'ongoing'},
                    {key: 'released', title: t('catalog_filter_released'), value: 'released'},
                    {key: 'announcement', title: t('catalog_filter_announced'), value: 'announcement'}
                ]
            },
            {
                key: 'year',
                title: t('catalog_filter_year'),
                values: [
                    {key: 'all', title: t('catalog_filter_all'), value: null},
                    {key: 'current', title: String(currentYear), value: {from_year: currentYear, to_year: currentYear}},
                    {key: 'last3', title: t('catalog_filter_last_3_years'), value: {from_year: currentYear - 2, to_year: currentYear}},
                    {key: 'last5', title: t('catalog_filter_last_5_years'), value: {from_year: currentYear - 4, to_year: currentYear}},
                    {key: 'from2020', title: t('catalog_filter_from_2020'), value: {from_year: 2020}},
                    {key: 'from2010', title: t('catalog_filter_from_2010'), value: {from_year: 2010}}
                ]
            }
        ];
    }

    function isSet(value) {
        return value !== undefined && value !== null && value !== '';
    }

    function currentValue(params, field) {
        params = params || {};
        if (field.key === 'type') return String(params.types || '');
        if (field.key === 'status') return String(params.status || '');
        if (field.key === 'year') {
            var from = isSet(params.from_year) ? Number(params.from_year) : null;
            var to = isSet(params.to_year) ? Number(params.to_year) : null;
            return {from_year: from, to_year: to};
        }
        return '';
    }

    function selected(field, params) {
        var current = currentValue(params, field);
        return field.values.filter(function (item) {
            if (field.key !== 'year') return String(item.value || '') === String(current || '');
            var value = item.value || {};
            return (value.from_year || null) === current.from_year && (value.to_year || null) === current.to_year;
        })[0] || field.values[0];
    }

    function apply(params, field, value) {
        var result = Object.assign({}, params || {});
        result.offset = 0;
        if (field.key === 'type') {
            if (value) result.types = value;
            else delete result.types;
        } else if (field.key === 'status') {
            if (value) result.status = value;
            else delete result.status;
        } else if (field.key === 'year') {
            delete result.from_year;
            delete result.to_year;
            if (value && isSet(value.from_year)) result.from_year = Number(value.from_year);
            if (value && isSet(value.to_year)) result.to_year = Number(value.to_year);
        }
        return result;
    }

    function activeCount(params) {
        params = params || {};
        return (isSet(params.types) ? 1 : 0) +
            (isSet(params.status) ? 1 : 0) +
            (isSet(params.from_year) || isSet(params.to_year) ? 1 : 0);
    }

    function clear(params) {
        var result = Object.assign({}, params || {});
        ['types', 'status', 'from_year', 'to_year'].forEach(function (key) { delete result[key]; });
        result.offset = 0;
        return result;
    }

    function signature(params) {
        params = params || {};
        return [params.types || 'all', params.status || 'all', params.from_year || 'any', params.to_year || 'any'].join('-');
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.CatalogFilters = window.LampaYaniCatalogFilters = {
        definitions: definitions,
        selected: selected,
        apply: apply,
        clear: clear,
        activeCount: activeCount,
        signature: signature
    };
}(window));

(function (window) {
    'use strict';

    function catalogSortIcon(key) {
        var icons = {
            top: '<svg viewBox="0 0 24 24"><path d="M8 4h8v3c0 4-1.5 6-4 7-2.5-1-4-3-4-7V4zM8 6H4v2c0 2.2 1.6 4 4.1 4.5M16 6h4v2c0 2.2-1.6 4-4.1 4.5M12 14v4M8 20h8"/></svg>',
            new: '<svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4M16 3v4M5 9h14"/></svg>',
            rating: '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
            votes: '<svg viewBox="0 0 24 24"><path d="M7 11a3 3 0 100-6 3 3 0 000 6zm10 0a3 3 0 100-6 3 3 0 000 6zM2 20c0-4 2-6 5-6s5 2 5 6m0 0c0-4 2-6 5-6s5 2 5 6"/></svg>',
            views: '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z"/></svg>',
            title: '<svg viewBox="0 0 24 24"><path d="M4 19l4-14 4 14M5.5 14h5M15 6h6l-6 12h6"/></svg>',
            random: '<svg viewBox="0 0 24 24"><path d="M4 7h3c5 0 5 10 10 10h3M17 4l3 3-3 3M4 17h3c2.5 0 3.7-2.5 5-5M17 14l3 3-3 3"/></svg>'
        };
        return icons[key] || icons.top;
    }

    function topTypeIcon(key) {
        var icons = {
            all: '<svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.9-5.4 2.9 1-6-4.3-4.2 6-.9z"/></svg>',
            tv: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="m8 3 4 3 4-3M9 22h6"/></svg>',
            movie: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 10h18M7 5l3 5M14 5l3 5"/></svg>',
            ona: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4zM4 12h2M18 12h2"/></svg>'
        };
        return icons[key] || icons.all;
    }

    function create(options) {
        options = options || {};
        var comp = options.comp;
        var object = options.object || {};
        var baseParams = options.baseParams || {};
        var topMode = Boolean(options.topMode);
        var t = options.t;
        var copyParams = options.copyParams;
        var showSelect = options.showSelect;
        var navigationSnapshot = options.navigationSnapshot;
        var filterModel = options.filterModel;
        var toolbar;
        var toolbarTrack;
        var topButton;
        var filterButton;
        var controlsReady = false;
        var toolbarFocused = false;
        var lastCatalogCard = null;
        var sortDefinitions = [
            {key: 'top', sort: 'top', forward: false, title: t('catalog_sort_top')},
            {key: 'new', sort: 'year', forward: false, title: t('catalog_sort_new')},
            {key: 'rating', sort: 'rating', forward: false, title: t('catalog_sort_rating')},
            {key: 'votes', sort: 'rating_counters', forward: false, title: t('catalog_sort_votes')},
            {key: 'views', sort: 'views', forward: false, title: t('catalog_sort_views')},
            {key: 'title', sort: 'title', forward: true, title: t('catalog_sort_title')},
            {key: 'random', sort: 'random', forward: false, title: t('catalog_sort_random')}
        ];
        var topDefinitions = [
            {key: 'all', types: '', title: t('top_all')},
            {key: 'tv', types: 'tv', title: t('top_tv')},
            {key: 'movie', types: 'movie', title: t('top_movies')},
            {key: 'ona', types: 'ona', title: t('top_ona')}
        ];
        var controlDefinitions = topMode ? topDefinitions : sortDefinitions;

        function activeSort(definition) {
            if (topMode) return String(baseParams.types || '') === definition.types;
            return definition.sort === baseParams.sort && definition.forward === baseParams.sort_forward;
        }

        function cleanCatalogRoute() {
            return String(object.url || 'yani/catalog').replace(/\/(?:sort|filter)\/[^/]+/g, '');
        }

        function changeSort(definition) {
            if (activeSort(definition) && definition.key !== 'random') return;
            var params = copyParams(baseParams);
            params.offset = 0;
            if (topMode) {
                params.sort = 'top';
                params.sort_forward = true;
                params.from_year = 1900;
                if (definition.types) params.types = definition.types;
                else delete params.types;
                var topRoute = String(object.url || 'yani/top').replace(/\/type\/[^/]+$/, '');
                Lampa.Activity.replace({
                    url: topRoute + '/type/' + definition.key,
                    title: object.title || ('YummyAnime ' + t('top_rated')),
                    component: 'yani_top',
                    topMode: true,
                    params: params
                });
                return;
            }
            params.sort = definition.sort;
            params.sort_forward = definition.forward;
            Lampa.Activity.replace({
                url: cleanCatalogRoute() + '/sort/' + definition.key,
                title: object.title || ('YummyAnime ' + t('catalog')),
                component: 'yani_catalog',
                params: params
            });
        }

        function replaceWithFilters(params) {
            Lampa.Activity.replace({
                url: cleanCatalogRoute() + '/filter/' + filterModel.signature(params),
                title: object.title || ('YummyAnime ' + t('catalog')),
                component: 'yani_catalog',
                params: params
            });
        }

        function openFilterValues(field, navigation) {
            showSelect({
                title: field.title,
                items: field.values.map(function (item) {
                    var isSelected = filterModel.selected(field, baseParams).key === item.key;
                    return {title: item.title, value: item.value, subtitle: isSelected ? '✓' : '', selected: isSelected};
                }),
                onSelect: function (item) {
                    replaceWithFilters(filterModel.apply(baseParams, field, item.value));
                },
                onBack: function () {
                    setTimeout(function () { openFilterMenu(navigation); }, 0);
                }
            }, navigation);
        }

        function openFilterMenu(navigation) {
            navigation = navigation || navigationSnapshot();
            var fields = filterModel.definitions(t, new Date().getFullYear());
            var items = fields.map(function (field) {
                var current = filterModel.selected(field, baseParams);
                return {title: field.title, subtitle: current.title, field: field};
            });
            if (filterModel.activeCount(baseParams)) items.unshift({title: t('catalog_filter_reset'), reset: true});
            showSelect({
                title: t('catalog_filters'),
                items: items,
                onSelect: function (item) {
                    if (item.reset) return replaceWithFilters(filterModel.clear(baseParams));
                    openFilterValues(item.field, navigation);
                }
            }, navigation);
        }

        function firstCard() {
            if (comp.items && comp.items.length && comp.items[0].render) return comp.items[0].render(true);
            var collection = comp.scroll && comp.scroll.render ? comp.scroll.render() : comp.render();
            return collection && collection.find ? collection.find('.card.selector, .selector').first()[0] : null;
        }

        function navigationCollection() {
            var root = comp.render();
            return root && root.length ? root : (comp.scroll && comp.scroll.render ? comp.scroll.render() : comp.render());
        }

        function syncNavigationCollection() {
            if (!controlsReady) return;
            var enabled = Lampa.Controller && Lampa.Controller.enabled ? Lampa.Controller.enabled() : null;
            var controller = enabled && enabled.controller;
            var ownsController = enabled && enabled.name === 'content' && controller &&
                (controller.yaniCatalogOwner === comp || controller.link === comp);
            if (!ownsController) return;
            var selectors = toolbarTrack && toolbarTrack[0] ? Array.prototype.slice.call(toolbarTrack[0].querySelectorAll('.selector')).filter(function (element) {
                return element.offsetParent !== null;
            }) : [];
            selectors.forEach(function (element) { Navigator.add(element); });
        }

        function focusCards(first) {
            var collection = navigationCollection();
            var target = first ? firstCard() : lastCatalogCard || comp.last || firstCard();
            if (target && !document.documentElement.contains(target)) target = firstCard();
            toolbarFocused = false;
            if (target) {
                lastCatalogCard = target;
                comp.last = target;
                Navigator.add(target);
            }
            if (first) Lampa.Controller.collectionSet(collection, false, true);
            else syncNavigationCollection();
            Lampa.Controller.collectionFocus(target || false, collection, true);
        }

        function focusToolbar(preferred) {
            if (!toolbarTrack || !toolbarTrack.length) return;
            var focusedCard = comp.scroll && comp.scroll.render ? comp.scroll.render().find('.selector.focus').first() : null;
            if (focusedCard && focusedCard.length) {
                lastCatalogCard = focusedCard[0];
                comp.last = focusedCard[0];
            }
            var target = preferred && preferred.length ? preferred : toolbarTrack.find('.yani-catalog-sort--active').first();
            if (!target.length) target = toolbarTrack.find('.selector').first();
            var collection = navigationCollection();
            toolbarFocused = true;
            syncNavigationCollection();
            Lampa.Controller.collectionFocus(target, collection, true);
        }

        function toolbarHasFocus() {
            return toolbarFocused || Boolean(toolbar && toolbar.find('.selector.focus, .focus.selector').length);
        }

        function focusedCatalogCard() {
            var collection = comp.scroll && comp.scroll.render ? comp.scroll.render() : comp.render();
            var focused = collection && collection.find ? collection.find('.card.selector.focus, .selector.focus').first() : null;
            return focused && focused.length ? focused : $();
        }

        function toolbarTargetForCard(card) {
            if (!toolbarTrack || !toolbarTrack.length || !card || !card.length) return topButton;
            var cardRect = card[0].getBoundingClientRect();
            var cardCenter = cardRect.top + cardRect.height / 2;
            var target = topButton;
            var distance = Infinity;
            toolbarTrack.find('.selector').each(function () {
                if (this.offsetParent === null) return;
                var rect = this.getBoundingClientRect();
                var currentDistance = Math.abs((rect.top + rect.height / 2) - cardCenter);
                if (currentDistance < distance) {
                    distance = currentDistance;
                    target = $(this);
                }
            });
            return target;
        }

        function shouldEnterToolbarOnRight() {
            if (!toolbar || !toolbar.length || window.innerWidth <= 700) return false;
            var collection = comp.scroll && comp.scroll.render ? comp.scroll.render() : comp.render();
            var focused = focusedCatalogCard();
            if (!focused || !focused.length) return !Navigator.canmove('right');
            var currentRect = focused[0].getBoundingClientRect();
            var toolbarRect = toolbar[0].getBoundingClientRect();
            var currentCenter = currentRect.top + currentRect.height / 2;
            var rightmostVisible = focused[0];
            var rightmostLeft = currentRect.left;
            collection.find('.card.selector').each(function () {
                if (this.offsetParent === null) return;
                var rect = this.getBoundingClientRect();
                var sameRow = Math.abs((rect.top + rect.height / 2) - currentCenter) < Math.max(20, currentRect.height * 0.45);
                var visibleBeforeToolbar = rect.left + rect.width / 2 < toolbarRect.left;
                if (sameRow && visibleBeforeToolbar && rect.left > rightmostLeft) {
                    rightmostLeft = rect.left;
                    rightmostVisible = this;
                }
            });
            return rightmostVisible === focused[0] || currentRect.right >= toolbarRect.left - 8;
        }

        function scrollToTop() {
            if (comp.scroll && comp.scroll.reset) comp.scroll.reset();
            else if (comp.scroll && comp.scroll.render) comp.scroll.render(true).scrollTop = 0;
            focusCards(true);
        }

        function install() {
            if (controlsReady) return;
            var root = comp.render();
            if (!root || !root.length) return;
            controlsReady = true;
            root.addClass('yani-catalog-view');
            toolbar = $('<div class="yani-catalog-toolbar"></div>');
            toolbarTrack = $('<div class="yani-catalog-toolbar__track"></div>');
            topButton = $('<div class="yani-catalog-top selector" aria-label="' + t('scroll_to_top') + '"></div>');
            topButton.append('<span class="yani-catalog-top__icon">↑</span>');
            topButton.append($('<span class="yani-catalog-top__title"></span>').text(t('scroll_to_top')));
            topButton.on('hover:focus', function () { toolbarFocused = true; });
            topButton.on('hover:enter click.yaniCatalogTop', scrollToTop);
            toolbarTrack.append(topButton);
            if (!topMode) {
                var activeFilters = filterModel.activeCount(baseParams);
                filterButton = $('<div class="yani-catalog-sort yani-catalog-filter selector"></div>');
                filterButton.toggleClass('yani-catalog-sort--active', activeFilters > 0);
                filterButton.append($('<span class="yani-catalog-sort__icon"></span>').html('<svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>'));
                if (activeFilters) filterButton.append($('<span class="yani-catalog-filter__count"></span>').text(activeFilters));
                filterButton.append($('<span class="yani-catalog-sort__title"></span>').text(t('catalog_filters')));
                filterButton.on('hover:focus', function () { toolbarFocused = true; });
                filterButton.on('hover:enter click.yaniCatalogFilter', function () { openFilterMenu(); });
                toolbarTrack.append(filterButton);
            }
            controlDefinitions.forEach(function (definition) {
                var button = $('<div class="yani-catalog-sort selector"></div>');
                button.toggleClass('yani-catalog-sort--active', activeSort(definition));
                button.append($('<span class="yani-catalog-sort__icon"></span>').html(topMode ? topTypeIcon(definition.key) : catalogSortIcon(definition.key)));
                button.append($('<span class="yani-catalog-sort__title"></span>').text(definition.title));
                button.on('hover:focus', function () {
                    toolbarFocused = true;
                    toolbarTrack[0].scrollLeft = Math.max(0, button[0].offsetLeft - toolbarTrack[0].clientWidth / 3);
                });
                button.on('hover:enter click.yaniCatalogSort', function () { changeSort(definition); });
                toolbarTrack.append(button);
            });
            toolbar.append(toolbarTrack);
            root.prepend(toolbar);
            if (window.innerWidth <= 700 && comp.scroll && comp.scroll.minus) comp.scroll.minus(toolbar);
            setTimeout(syncNavigationCollection, 0);
        }

        function patchCatalogController(controller) {
            if (!controller || controller.yaniCatalogOwner === comp) return;
            var originalLeft = controller.left;
            var originalRight = controller.right;
            var originalUp = controller.up;
            var originalDown = controller.down;
            controller.yaniCatalogOwner = comp;
            controller.left = function () {
                if (toolbarHasFocus()) return focusCards(false);
                if (originalLeft) originalLeft();
            };
            controller.right = function () {
                if (toolbarHasFocus()) return;
                var focusedCard = focusedCatalogCard();
                if (shouldEnterToolbarOnRight() && topButton) return focusToolbar(toolbarTargetForCard(focusedCard));
                if (Navigator.canmove('right')) return Navigator.move('right');
                if (topButton) return focusToolbar(toolbarTargetForCard(focusedCard));
                if (originalRight) originalRight();
            };
            controller.up = function () {
                if (toolbarHasFocus()) {
                    if (Navigator.canmove('up')) return Navigator.move('up');
                    return Lampa.Controller.toggle('head');
                }
                if (Navigator.canmove('up')) return Navigator.move('up');
                Lampa.Controller.toggle('head');
            };
            controller.down = function () {
                if (toolbarHasFocus()) {
                    if (Navigator.canmove('down')) return Navigator.move('down');
                    return;
                }
                if (Navigator.canmove('down')) return Navigator.move('down');
                if (originalDown) originalDown();
            };
        }

        if (comp.on) {
            comp.on('toggle', function () { setTimeout(syncNavigationCollection, 0); });
            comp.on('scroll', function () { setTimeout(syncNavigationCollection, 0); });
            comp.on('controller', patchCatalogController);
        }

        var originalStart = comp.start;
        comp.start = function () {
            var result = originalStart.apply(this, arguments);
            var enabled = Lampa.Controller && Lampa.Controller.enabled ? Lampa.Controller.enabled() : null;
            if (enabled && enabled.name === 'content') patchCatalogController(enabled.controller);
            syncNavigationCollection();
            return result;
        };

        return {install: install, sync: syncNavigationCollection};
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.CatalogControls = window.LampaYaniCatalogControls = {
        create: create,
        catalogSortIcon: catalogSortIcon,
        topTypeIcon: topTypeIcon
    };
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
        function focusable(element) {
            LampaYaniNavigation.bindFocus(element, scroll, {set last(value) { last = value; }});
            return element;
        }
        function refreshFocus(preferred) {
            setTimeout(function () {
                var collection = scroll.render();
                var target = preferred && preferred.offsetParent !== null ? preferred : (last && last.offsetParent !== null ? last : collection.find('.selector').first()[0]);
                if (target) last = target;
                Lampa.Controller.collectionSet(collection, false, true);
                Lampa.Controller.collectionFocus(target || false, collection, true);
            }, 0);
        }
        function render(items, append) {
            if (!append) content.empty();
            var title = $('<div class="yani-notifications__title"></div>').text(deps.t('notifications_title'));
            var mark = focusable($('<div class="yani-detail__button selector"></div>')).text(deps.t('mark_all_read')).on('hover:enter click', function () { LampaYaniApi.markAllNotificationsRead().then(function () { content.find('.yani-notification').removeClass('unread'); Lampa.Noty.show(deps.t('saved')); refreshFocus(mark[0]); }); });
            var remove = focusable($('<div class="yani-detail__button selector"></div>')).text(deps.t('delete_all_notifications')).on('hover:enter click', function () { LampaYaniApi.deleteAllNotifications().then(function () { var empty = focusable($('<div class="yani-account__notice selector"></div>')).text(deps.t('notifications_empty')); content.empty().append(title).append(empty); refreshFocus(empty[0]); }); });
            if (!append) content.append(title, mark, remove);
            if (!items.length) { if (!append) content.append(focusable($('<div class="yani-account__notice selector"></div>')).text(deps.t('notifications_empty'))); return; }
            items.forEach(function (notification) {
                var item = focusable($('<div class="yani-notification selector"></div>')); if (!notification.viewed && !notification.read) item.addClass('unread');
                item.append($('<div class="yani-notification__title"></div>').text(notification.title || notification.type || deps.t('notification')));
                if (notification.text || notification.message) item.append($('<div class="yani-notification__text"></div>').text(notification.text || notification.message));
                var date = notification.date || notification.date_seconds || notification.dateSeconds; if (date) item.append($('<div class="yani-notification__date"></div>').text(deps.formatDate(date)));
                item.on('hover:enter click', function () { if (notification.id && !notification.viewed) LampaYaniApi.markNotificationRead(notification.id).catch(function () {}); var animeId = notification.anime_id || notification.object_id || notification.objectId; if (animeId) deps.openDetail(deps.toCard({anime_id: animeId, title: notification.title || deps.t('anime')}), false); });
                content.append(item);
            });
            var more = focusable($('<div class="yani-detail__button selector"></div>')).text(deps.t('notifications_more')).on('hover:enter click', function () { var previous = more.prev('.selector')[0]; more.remove(); offset += items.length; LampaYaniApi.notifications(30, offset).then(function (payload) { render(deps.normalize(payload), true); refreshFocus(previous); }); });
            content.append(more);
        }
        return {create: function () { var self = this; this.activity.loader(true); LampaYaniApi.notifications(30, offset).then(function (payload) { render(deps.normalize(payload), false); scroll.append(content); html.append(scroll.render(true)); self.activity.loader(false); self.activity.toggle(); }).catch(function (error) { console.error('[YummyAnime Notifications]', error); content.append(focusable($('<div class="yani-account__notice selector"></div>')).text(deps.t('notifications_error'))); scroll.append(content); html.append(scroll.render(true)); self.activity.loader(false); self.activity.toggle(); }); }, start: function () { Lampa.Controller.add('content', {toggle: function () { Lampa.Controller.collectionSet(scroll.render(), false, true); Lampa.Controller.collectionFocus(last || false, scroll.render(), true); }, left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); }, right: function () { if (Navigator.canmove('right')) Navigator.move('right'); }, up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); }, down: function () { LampaYaniNavigation.moveDown(scroll); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { scroll.destroy(); html.remove(); }};
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Notifications = window.LampaYaniNotifications = {create: create};
}(window));

(function (window) {
    'use strict';
    function create(object, deps) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250}), html = $('<div class="yani-auth"></div>'), content = $('<div class="yani-auth__content"></div>'), login = (LampaYaniAuth.get().login || '').trim(), password = '', last, lastKey = '', ready = false;
        scroll.minus();
        function focus(element, key) { element.attr('data-yani-focus-key', key); element.on('hover:focus', function (event) { var target = event.currentTarget || event.target; last = target; lastKey = key; scroll.update($(target), true); }); return element; }
        function focusTarget() { var target = last && document.documentElement.contains(last) ? $(last) : lastKey ? content.find('[data-yani-focus-key="' + lastKey + '"]').first() : $(); if (!target.length) target = content.find('.selector').first(); if (target.length) { last = target[0]; lastKey = target.attr('data-yani-focus-key') || lastKey; } return target; }
        function refreshFocus() { if (!ready) return; var target = focusTarget(); Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(target.length ? target[0] : false, scroll.render()); if (target.length) scroll.update(target, true); }
        function render() {
            content.empty(); var account = LampaYaniAuth.get(), authorized = Boolean(LampaYaniAuth.token());
            content.append($('<div class="yani-auth__title"></div>').text(deps.t('auth_title'))).append($('<div class="yani-auth__status ' + (authorized ? 'is-authorized' : '') + '"></div>').text(authorized ? deps.t('auth_authorized') : deps.t('auth_not_authorized')));
            var form = $('<div class="yani-auth__form"></div>');
            field(form, 'login', deps.t('auth_login'), login || deps.t('auth_login_empty'), function () { deps.input({title: deps.t('email_prompt'), value: login, nosave: true, align: 'center'}, function (value) { login = String(value || '').trim(); render(); setTimeout(refreshFocus, 30); }); });
            field(form, 'password', deps.t('auth_password'), password ? '••••••••' : deps.t('auth_password_empty'), function () { deps.input({title: deps.t('password_prompt'), value: '', password: true, nosave: true, align: 'center'}, function (value) { password = String(value || ''); render(); setTimeout(refreshFocus, 30); }); });
            content.append(form); var actions = $('<div class="yani-auth__actions"></div>');
            if (!authorized) action(actions, 'submit', deps.t('auth_submit'), 'primary', submit); else { action(actions, 'refresh', deps.t('refresh_name'), '', refresh); action(actions, 'logout', deps.t('logout_name'), '', logout); }
            content.append(actions); if (authorized && account.login) content.append($('<div class="yani-auth__account"></div>').text(deps.t('auth_account') + ': ' + account.login)); content.append($('<div class="yani-auth__hint"></div>').text(deps.t('auth_hint')));
            setTimeout(refreshFocus, 0);
        }
        function field(parent, key, title, value, handler) { var item = focus($('<div class="yani-auth__field selector"></div>'), key); item.append($('<div class="yani-auth__field-title"></div>').text(title), $('<div class="yani-auth__field-value"></div>').text(value)); item.on('hover:enter', handler); parent.append(item); }
        function action(parent, key, title, kind, handler) { var item = focus($('<div class="yani-auth__button selector ' + (kind ? 'yani-auth__button--' + kind : '') + '"></div>').text(title), key); item.on('hover:enter', handler); parent.append(item); }
        function submit() {
            if (!login) return Lampa.Noty.show(deps.t('email_required')); if (!password) return Lampa.Noty.show(deps.t('password_required'));
            Lampa.Loading && Lampa.Loading.start && Lampa.Loading.start();
            LampaYaniAuth.login(login, password).then(function () { return LampaYaniApi.profile().then(function (payload) { var profile = payload && payload.response ? payload.response : payload, current = LampaYaniAuth.get(); LampaYaniAuth.save({token: current.token, login: current.login, display_name: profile && (profile.nickname || profile.name) || current.login}); }).catch(function () {}); }).then(function () { password = ''; Lampa.Noty.show(deps.t('login_ok')); deps.goBack(); }).catch(function (error) { console.error('[YummyAnime Auth]', error); Lampa.Noty.show(deps.t('login_error')); }).then(function () { Lampa.Loading && Lampa.Loading.stop && Lampa.Loading.stop(); });
        }
        function refresh() { LampaYaniAuth.refresh().then(function () { Lampa.Noty.show(deps.t('token_refreshed')); render(); }).catch(function () { Lampa.Noty.show(deps.t('token_refresh_error')); }); }
        function logout() { LampaYaniAuth.logout().then(function () { Lampa.Noty.show(deps.t('logged_out')); render(); }).catch(function () { Lampa.Noty.show(deps.t('token_removed')); render(); }); }
        return {create: function () { render(); scroll.append(content); html.append(scroll.render(true)); ready = true; this.activity.loader(false); this.activity.toggle(); }, start: function () { Lampa.Controller.add('content', {toggle: refreshFocus, left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); }, right: function () { Navigator.move('right'); }, up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); }, down: function () { LampaYaniNavigation.moveDown(scroll); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { ready = false; scroll.destroy(); html.remove(); }};
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.AuthPage = window.LampaYaniAuthPage = {create: create};
}(window));

(function (window) {
    'use strict';
    function create(object, deps) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250}), html = $('<div class="yani-status"></div>'), content = $('<div class="yani-status__content"></div>'), last, lastKey = '', ready = false, period = '3hour', component;
        scroll.minus();
        function date(value) { if (!value) return '—'; try { return new Date(value).toLocaleString(deps.locale(), {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'}); } catch (error) { return new Date(value).toLocaleString(); } }
        function focus(element, key) { if (key) element.attr('data-yani-focus-key', key); element.on('hover:focus', function (event) { var target = event.currentTarget || event.target; last = target; lastKey = key || $(target).attr('data-yani-focus-key') || ''; scroll.update($(target), true); }); return element; }
        function metric(title, value) { return $('<div class="yani-status__metric"></div>').append($('<span></span>').text(title), $('<strong></strong>').text(value)); }
        function domainName(domain) { var names = {'old.yummyani.me': 'domain_old', 'old.yummy-ani.me': 'domain_old_mirror', 'ru.yummyani.me': 'domain_new', 'ru.yummy-ani.me': 'domain_new_mirror', 'api.yani.tv': 'domain_api', 'waf.valtrix.org': 'domain_waf'}; return names[domain.domain] ? deps.t(names[domain.domain]) : (domain.label || domain.domain); }
        function renderError() { content.empty(); var error = focus($('<div class="yani-status__error selector"></div>')); error.append($('<strong></strong>').text(deps.t('status_load_error')), $('<span></span>').text(deps.t('status_error_hint'))); content.append(error); refreshFocus(); }
        function render(data) {
            content.empty(); var periods = data.periods || null, selected = periods ? (periods[period] || periods[data.default_period] || periods['3hour']) : data; if (!selected) return renderError();
            var labels = {'3hour': deps.t('period_3hour'), day: deps.t('period_day'), week: deps.t('period_week'), month: deps.t('period_month')}, switches = $('<div class="yani-status__periods"></div>');
            Object.keys(labels).forEach(function (key) { var button = focus($('<div class="yani-status__period selector"></div>').text(labels[key]), 'period-' + key); if (key === period) button.addClass('active'); button.on('hover:enter', function () { period = key; lastKey = 'period-' + key; render(data); }); switches.append(button); }); content.append(switches);
            var summary = selected.summary || {}, state = summary.status || 'unknown', title = state === 'up' ? deps.t('all_up') : state === 'down' ? deps.t('all_down') : state === 'unknown' ? deps.t('no_monitoring') : deps.t('degraded'), color = state === 'up' ? '#4caf50' : state === 'down' ? '#db4455' : state === 'unknown' ? '#888' : '#f0a33b';
            var block = focus($('<div class="yani-status__summary selector yani-status--' + state + '"></div>')), ring = $('<div class="yani-status__ring"><div class="yani-status__ring-center"></div></div>'); ring.css('background', 'conic-gradient(#4caf50 0 ' + Number(summary.uptime_percent || 0) + '%, #db4455 ' + Number(summary.uptime_percent || 0) + '% 100%)'); ring.find('.yani-status__ring-center').append($('<strong></strong>').text(summary.checks || 0), $('<span></span>').text(deps.t('checks')));
            var info = $('<div class="yani-status__summary-info"></div>').append($('<div class="yani-status__headline"></div>').css('color', color).text(title)); var metrics = $('<div class="yani-status__metrics"></div>').append(metric(deps.t('availability'), Number(summary.uptime_percent || 0).toFixed(1) + '%'), metric(deps.t('average_load'), String(summary.average_ms || 0) + ' ' + deps.t('milliseconds')), metric(deps.t('errors'), String(summary.failed || 0)), metric(deps.t('updated'), date(selected.generated_at))); info.append(metrics); block.append(ring, info); content.append(block);
            var legend = focus($('<div class="yani-status__legend selector"></div>')).html('<span class="yani-status__dot yani-status__dot--up"></span>' + deps.t('up') + ' <span class="yani-status__dot yani-status__dot--degraded"></span>' + deps.t('unstable') + ' <span class="yani-status__dot yani-status__dot--down"></span>' + deps.t('down')); content.append(legend);
            (selected.domains || []).forEach(function (domain) { var row = focus($('<div class="yani-status__domain selector yani-status--' + domain.status + '"></div>')), head = $('<div class="yani-status__domain-head"></div>'), name = $('<div class="yani-status__domain-name"></div>').append('<span class="yani-status__state"></span>', $('<strong></strong>').text(domainName(domain)), $('<small></small>').text(domain.domain)), values = $('<div class="yani-status__domain-values"></div>').append($('<span></span>').text('HTTP ' + (domain.average_ms || 0) + ' ' + deps.t('milliseconds')), $('<span></span>').text('Ping ' + (domain.ping_ms || 0) + ' ' + deps.t('milliseconds'))), history = $('<div class="yani-status__history"></div>'); (domain.history || []).forEach(function (point) { history.append($('<i class="yani-status__bar yani-status__bar--' + point.status + '"></i>').attr('title', date(point.time))); }); head.append(name, values); row.append(head, history); content.append(row); });
            content.append(focus($('<div class="yani-status__source selector"></div>').text(deps.t('source') + ': YummyStatus · ' + deps.t('period') + ': ' + labels[period] + ' · ' + deps.t('snapshot_notice'))));
            content.append(focus($('<div class="yani-status__refresh selector"></div>').text(deps.t('refresh_status')).on('hover:enter', function () { Lampa.Noty.show(deps.t('refreshing_status')); load(false); }))); refreshFocus();
        }
        function refreshFocus() { if (!ready) return; var target = last && document.documentElement.contains(last) ? $(last) : lastKey ? content.find('[data-yani-focus-key="' + lastKey + '"]').first() : $(); if (!target.length) target = content.find('.selector').first(); last = target.length ? target[0] : null; Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); if (target.length) scroll.update(target, true); }
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
        var html = $('<div class="yani-player"></div>'), iframe = $('<iframe class="yani-player__iframe" frameborder="0" allowfullscreen></iframe>'), back = $('<div class="yani-player__back selector"></div>').text(deps.t('back_to_lampa')).on('hover:enter click', deps.goBack);
        return {create: function () { iframe.attr('src', deps.sourceUrl(object)).attr('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; payment'); html.append(iframe, back); this.activity.loader(false); this.activity.toggle(); }, start: function () { Lampa.Controller.add('content', {toggle: function () { Lampa.Controller.collectionSet(html, false, true); Lampa.Controller.collectionFocus(back, html, true); }, left: function () {}, right: function () {}, up: function () { Lampa.Controller.toggle('head'); }, down: function () {}, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { iframe.attr('src', 'about:blank'); iframe.remove(); back.remove(); html.remove(); }};
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Player = window.LampaYaniPlayer = {create: create};
}(window));

(function (window) {
    'use strict';

    function responseItems(payload) {
        var value = payload;
        var fields = ['anime', 'animes', 'results', 'items', 'data', 'list', 'values'];
        var depth = 0;

        while (value && !Array.isArray(value) && depth < 4) {
            if (value.response && value.response !== value) {
                value = value.response;
                depth += 1;
                continue;
            }

            var next;
            fields.some(function (field) {
                if (Array.isArray(value[field])) {
                    next = value[field];
                    return true;
                }
                return false;
            });
            if (next) return next;
            break;
        }

        return Array.isArray(value) ? value : [];
    }

    function normalize(payload) {
        return responseItems(payload).map(function (item) {
            if (!item || !item.anime || typeof item.anime !== 'object') return item;
            var anime = Object.assign({}, item.anime);
            if (item.user) anime.user = item.user;
            if (item.date && !anime.date) anime.date = item.date;
            return anime;
        }).filter(Boolean);
    }

    function state(item) {
        return item && (item.user && item.user.list || item.user_list || item.list_state) || null;
    }

    function filterItems(definition, items) {
        return (items || []).filter(function (item) {
            var current = state(item);
            if (!current) return false;
            if (definition.id === 4) return Boolean(current.is_fav || current.is_favorite || current.favorite);
            var list = current.list && typeof current.list === 'object' ? current.list : current;
            return typeof list.id !== 'undefined' && Number(list.id) === Number(definition.id);
        });
    }

    function accountList(object, deps) {
        // InteractionCategory only requests the next page when object.page is
        // numeric. Account-list activities are opened without API pagination,
        // so initialise the local pager explicitly for both old and current
        // Lampa builds.
        object.page = 1;
        var comp = new Lampa.InteractionCategory(object);
        var items = [];
        var pageSize = 30;
        var totalPages = 1;
        var destroyed = false;

        function pageCards(page) {
            var start = Math.max(0, (page - 1) * pageSize);
            return items.slice(start, start + pageSize).map(deps.toCard);
        }

        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            var source = object.lazy && deps.loadItems
                ? deps.loadItems(object.definition)
                : Promise.resolve(object.items || []);
            source.then(function (loaded) {
                if (destroyed) return;
                items = Array.isArray(loaded) ? loaded : [];
                totalPages = Math.max(1, Math.ceil(items.length / pageSize));
                self.build({results: pageCards(1), total_pages: totalPages, title: object.title});
            }).catch(function (error) {
                if (destroyed) return;
                console.error('[YummyAnime User List]', error);
                self.build({results: [], total_pages: 1, title: object.title});
                if (deps.onError) deps.onError(error);
            });
        };
        comp.nextPageReuest = function (requestObject, resolve) {
            var page = Math.max(2, Number(requestObject.page) || 2);
            resolve({results: pageCards(page), total_pages: totalPages, title: object.title});
        };
        comp.nextPageRequest = comp.nextPageReuest;
        comp.cardRender = deps.cardRender;
        var originalDestroy = comp.destroy;
        comp.destroy = function () {
            destroyed = true;
            if (originalDestroy) originalDestroy.apply(this, arguments);
        };
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

    function userLists(object, deps) {
        var component = new Lampa.InteractionMain(object);
        var destroyed = false;

        function morePoster() {
            var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="360" height="540" viewBox="0 0 360 540">' +
                '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#63574b"/><stop offset="1" stop-color="#9d8a65"/></linearGradient></defs>' +
                '<rect width="360" height="540" rx="22" fill="url(#g)"/><rect x="9" y="9" width="342" height="522" rx="18" fill="none" stroke="#fff" stroke-width="7" opacity=".9"/>' +
                '<text x="180" y="286" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="54">' + deps.t('more') + '</text></svg>';
            return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
        }

        function withMore(row) {
            var results = (row.results || []).slice(0, 10);
            results.push({
                title: deps.t('more'),
                poster: morePoster(),
                img: morePoster(),
                yani_more: true,
                yani_definition: row.definition,
                yani_history: Boolean(row.history)
            });
            return {
                title: row.title + (typeof row.total === 'number' ? ' · ' + row.total : ''),
                results: results,
                nomore: true,
                definition: row.definition,
                history: row.history,
                card_events: {
                    onEnter: function (target, card) {
                        if (card && card.yani_more) {
                            if (card.yani_history) deps.openHistory();
                            else deps.openList(card.yani_definition);
                            return;
                        }
                        deps.openCard(card);
                    }
                }
            };
        }

        component.create = function () {
            if (!LampaYaniAuth.token()) {
                Lampa.Noty.show(deps.t('login_required'));
                deps.goBack();
                return;
            }
            var self = this;
            this.activity.loader(true);
            deps.loadRows().then(function (rows) {
                if (destroyed) return;
                self.build((rows || []).map(withMore));
            }).catch(function (error) {
                if (destroyed) return;
                console.error('[YummyAnime User Lists]', error);
                self.build([]);
                if (deps.onError) deps.onError(error);
            });
        };
        var originalDestroy = component.destroy;
        component.destroy = function () {
            destroyed = true;
            if (originalDestroy) originalDestroy.apply(this, arguments);
        };
        return component;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.AccountLists = window.LampaYaniAccountLists = {
        accountList: accountList,
        subscriptions: subscriptions,
        userLists: userLists,
        normalize: normalize,
        filterItems: filterItems
    };
}(window));

(function (window) {
    'use strict';

    function historyPayloadItems(payload) {
        var value = payload && payload.response !== undefined ? payload.response : payload;
        if (Array.isArray(value)) return value;
        return value && (value.items || value.data || value.history || value.watches) || [];
    }

    function historyTimestamp(value) {
        if (!value) return 0;
        if (typeof value === 'string' && !/^\d+$/.test(value)) return Date.parse(value) || 0;
        var number = Number(value) || 0;
        return number > 0 && number < 100000000000 ? number * 1000 : number;
    }

    function historyPoster(value) {
        if (!value) return '';
        if (typeof value === 'string') return value;
        return value.fullsize || value.original || value.huge || value.mega || value.big || value.medium || value.small || value.url || '';
    }

    function historyScreenshot(value) {
        if (!value) return '';
        if (typeof value === 'string') return value;
        var sizes = value.sizes || value.images || {};
        return value.full || value.url || sizes.full || sizes.big || sizes.medium || sizes.small || '';
    }

    function normalizeRemoteHistory(payload) {
        return historyPayloadItems(payload).map(function (item) {
            item = item || {};
            var screenshot = item.screenshot || {};
            var animeId = item.anime_id || item.animeId || item.id;
            if (!animeId) return null;
            return {
                anime_id: animeId,
                video_id: item.video_id || item.videoId || '',
                number: String(item.episode || screenshot.episode || item.number || ''),
                episode_title: item.ep_title || item.episode_title || screenshot.title || '',
                title: item.title || item.anime_title || '',
                poster: historyPoster(item.poster) || historyPoster(screenshot.poster) || historyPoster(screenshot),
                screenshot: historyScreenshot(item.screenshot_url || screenshot),
                player: String(item.player_title || item.player || ''),
                voice: String(item.dub_title || item.dubbing || ''),
                time: Math.max(0, Number(item.end_time || item.time || 0)),
                duration: Math.max(0, Number(item.duration || 0)),
                updated_at: historyTimestamp(item.date || item.updated_at || item.created_at),
                remote: true
            };
        }).filter(Boolean);
    }

    function normalizeLocalHistory(saved) {
        return Object.keys(saved || {}).map(function (id) {
            var item = saved[id] || {};
            return {
                anime_id: item.anime_id || id,
                video_id: item.video_id || '',
                number: String(item.number || item.episode || ''),
                episode_title: item.episode_title || '',
                title: item.title || item.card && item.card.title || '',
                poster: historyPoster(item.poster || item.card && item.card.poster),
                screenshot: historyScreenshot(item.screenshot || item.screenshot_url),
                player: String(item.player || ''),
                voice: String(item.voice || ''),
                time: Math.max(0, Number(item.time || 0)),
                duration: Math.max(0, Number(item.duration || 0)),
                updated_at: historyTimestamp(item.updated_at),
                card: item.card || null,
                remote: false
            };
        });
    }

    function historyEntryKey(entry) {
        if (entry.video_id) return 'video:' + String(entry.video_id);
        return 'anime:' + String(entry.anime_id) + ':episode:' + String(entry.number || '');
    }

    function mergeHistory(localSaved, remoteEntries) {
        var merged = {};
        normalizeLocalHistory(localSaved).concat(remoteEntries || []).forEach(function (entry) {
            var key = historyEntryKey(entry);
            var current = merged[key];
            if (!current) {
                merged[key] = entry;
                return;
            }
            var newer = Number(entry.updated_at || 0) >= Number(current.updated_at || 0) ? entry : current;
            var older = newer === entry ? current : entry;
            merged[key] = Object.assign({}, older, newer, {
                time: Number(newer.time || older.time || 0),
                duration: Number(newer.duration || older.duration || 0),
                title: newer.title || older.title || '',
                poster: newer.poster || older.poster || '',
                screenshot: newer.screenshot || older.screenshot || '',
                card: newer.card || older.card || null
            });
        });
        return Object.keys(merged).map(function (key) { return merged[key]; }).sort(function (a, b) {
            return Number(b.updated_at || 0) - Number(a.updated_at || 0);
        });
    }

    function isContinueEntry(entry) {
        var position = Math.max(0, Number(entry && entry.time || 0));
        var duration = Math.max(0, Number(entry && entry.duration || 0));
        var hasTarget = Boolean(entry && (entry.video_id || entry.number));
        if (!hasTarget) return false;
        if (!duration) return position >= 30 || position === 0;
        if (position < 30) return false;
        // When the API does not provide an explicit completion state, use a
        // predictable percentage fallback for both short and regular videos.
        return position / duration < 0.75;
    }

    function continueWatchingEntries(entries, excludedAnimeIds) {
        var latest = {};
        excludedAnimeIds = excludedAnimeIds || {};
        (entries || []).forEach(function (entry) {
            if (!isContinueEntry(entry)) return;
            var key = String(entry.anime_id || '');
            if (!key || excludedAnimeIds[key]) return;
            var current = latest[key];
            if (!current || Number(entry.updated_at || 0) > Number(current.updated_at || 0)) latest[key] = entry;
        });
        return Object.keys(latest).map(function (key) { return latest[key]; }).sort(function (a, b) {
            return Number(b.updated_at || 0) - Number(a.updated_at || 0);
        });
    }

    function attachHistoryEntry(card, entry) {
        card.yani_id = card.yani_id || Number(entry.anime_id) || entry.anime_id;
        card.yani_resume = {
            number: String(entry.number || ''),
            video_id: entry.video_id || '',
            time: Number(entry.time || 0),
            duration: Number(entry.duration || 0),
            player: entry.player || '',
            voice: entry.voice || '',
            updated_at: Number(entry.updated_at || 0)
        };
        card.yani_history_entry = entry;
        return card;
    }

    function historyCard(entry, deps) {
        var source = Object.assign({}, entry.card || {}, {
            anime_id: entry.anime_id,
            title: entry.title || entry.card && entry.card.title || deps.t('untitled'),
            poster: entry.poster || entry.card && entry.card.poster || ''
        });
        var fallback = attachHistoryEntry(deps.toCard(source), entry);
        if (entry.title && fallback.poster) return Promise.resolve(fallback);
        return deps.detail(entry.anime_id).then(function (payload) {
            var value = payload && payload.response ? payload.response : payload;
            return value ? attachHistoryEntry(deps.toCard(value), entry) : fallback;
        }).catch(function () { return fallback; });
    }

    function history(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        var continueMode = object.mode === 'continue';
        var limit = continueMode ? 100 : 30;
        var offset = 0;
        var hasMore = false;
        var seen = {};
        object.page = 1;

        function uniqueEntries(entries) {
            return entries.filter(function (entry) {
                var key = historyEntryKey(entry);
                if (seen[key]) return false;
                seen[key] = true;
                return true;
            });
        }

        function loadRemotePage() {
            if (!deps.authorized()) return Promise.resolve({entries: [], count: 0});
            return deps.fetchRemote(limit, offset).then(function (payload) {
                var raw = historyPayloadItems(payload);
                offset += raw.length;
                return {entries: normalizeRemoteHistory(payload), count: raw.length};
            });
        }

        function cardsFor(entries) {
            return Promise.all(entries.map(function (entry) { return historyCard(entry, deps); }));
        }

        comp.create = function () {
            var self = this;
            var local = deps.history();
            this.activity.loader(true);
            var remote = loadRemotePage().catch(function (error) {
                console.warn('[YummyAnime History] Server history is unavailable', error);
                return {entries: [], count: 0, failed: true};
            });
            var exclusions = continueMode && deps.fetchExcluded ? deps.fetchExcluded().catch(function (error) {
                console.warn('[YummyAnime Continue Watching] User-list filter is unavailable', error);
                return {};
            }) : Promise.resolve({});
            Promise.all([remote, exclusions]).then(function (result) {
                var page = result[0];
                hasMore = !continueMode && deps.authorized() && !page.failed && page.count >= limit;
                var entries = mergeHistory(local, page.entries);
                if (continueMode) entries = continueWatchingEntries(entries, result[1]);
                return cardsFor(uniqueEntries(entries));
            }).then(function (cards) {
                var totalPages = hasMore ? 2 : 1;
                self.build({results: cards.filter(Boolean), total_pages: totalPages, title: deps.t(continueMode ? 'continue_watching' : 'watch_history')});
                if (!cards.length) Lampa.Noty.show(deps.t('history_empty'));
            }).catch(function (error) {
                console.error('[YummyAnime History]', error);
                self.activity.loader(false);
                Lampa.Noty.show(deps.t('history_load_error'));
            });
        };

        comp.nextPageReuest = function (requestObject, resolve, reject) {
            if (!hasMore) {
                resolve({results: [], total_pages: requestObject.page, title: deps.t('watch_history')});
                return;
            }
            loadRemotePage().then(function (page) {
                hasMore = page.count >= limit;
                return cardsFor(uniqueEntries(page.entries));
            }).then(function (cards) {
                resolve({
                    results: cards.filter(Boolean),
                    total_pages: hasMore ? requestObject.page + 1 : requestObject.page,
                    title: deps.t(continueMode ? 'continue_watching' : 'watch_history')
                });
            }).catch(function (error) {
                requestObject.page = Math.max(1, requestObject.page - 1);
                console.error('[YummyAnime History]', error);
                Lampa.Noty.show(deps.t('next_page_error'));
                reject(error);
            });
        };
        comp.nextPageRequest = comp.nextPageReuest;
        comp.cardRender = deps.historyCardRender;
        return comp;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.HomeSections = window.LampaYaniHomeSections = {
        history: history,
        normalizeRemoteHistory: normalizeRemoteHistory,
        normalizeLocalHistory: normalizeLocalHistory,
        mergeHistory: mergeHistory,
        historyEntryKey: historyEntryKey,
        isContinueEntry: isContinueEntry,
        continueWatchingEntries: continueWatchingEntries
    };
}(window));

(function (window) {
    'use strict';

    function response(payload) {
        return payload && payload.response ? payload.response : payload || {};
    }

    function uniqueCount(items, id) {
        var seen = {};
        (items || []).forEach(function (item) {
            var value = id(item || {});
            if (value === null || typeof value === 'undefined' || value === '') return;
            var key = String(value);
            seen[key] = true;
        });
        return Object.keys(seen).length;
    }

    function counts(payload) {
        var value = response(payload);
        var releases = Array.isArray(value.new) ? value.new : [];
        var videos = Array.isArray(value.new_videos) ? value.new_videos : [];
        var collections = Array.isArray(value.collections) ? value.collections : [];
        return {
            new_releases: uniqueCount(releases, function (item) {
                return item.anime_id || item.animeId || item.id;
            }),
            new_translations: uniqueCount(videos, function (item) {
                return item.anime_id || item.animeId || item.anime && (item.anime.anime_id || item.anime.id);
            }),
            collections: uniqueCount(collections, function (item) {
                return item.collection_id || item.id || item.slug || item.title;
            })
        };
    }

    function load(feed) {
        return feed().then(counts);
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.HomeInsights = window.LampaYaniHomeInsights = {
        counts: counts,
        load: load,
        uniqueCount: uniqueCount
    };
}(window));

(function (window) {
    'use strict';

    function responseValue(payload) {
        return payload && payload.response !== undefined ? payload.response : payload;
    }

    function collectionItems(payload) {
        var value = responseValue(payload);
        if (Array.isArray(value)) return value;
        return value && (value.collections || value.items || value.data || value.results) || [];
    }

    function posterUrl(poster) {
        if (typeof poster === 'string') return poster;
        if (!poster || typeof poster !== 'object') return '';
        return poster.medium || poster.big || poster.fullsize || poster.small || poster.mega || poster.url || '';
    }

    function previewPosters(collection) {
        var previews = Array.isArray(collection.poster_previews) ? collection.poster_previews : [];
        if (!previews.length && Array.isArray(collection.animes)) {
            previews = collection.animes.map(function (anime) { return anime && anime.poster; });
        }
        return previews.map(posterUrl).filter(Boolean).filter(function (url, index, list) {
            return list.indexOf(url) === index;
        }).slice(0, 4);
    }

    function collectionCard(collection) {
        var previews = previewPosters(collection);
        var likes = collection.likes && typeof collection.likes === 'object' ? Number(collection.likes.likes || 0) : Number(collection.likes || 0);
        return {
            title: collection.title || collection.name || '',
            overview: collection.description || '',
            poster: previews[0] || '',
            img: previews[0] || '',
            yani_collection_id: collection.id,
            yani_collection: collection,
            yani_collection_previews: previews,
            yani_collection_views: Number(collection.views || 0),
            yani_collection_likes: likes,
            yani_collection_count: Array.isArray(collection.animes) ? collection.animes.length : 0
        };
    }

    function renderElement(first, second, third) {
        var values = [first, second, third];
        var element;
        var card;
        values.forEach(function (value) {
            if (!value) return;
            var isElement = value.jquery || value.nodeType || (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement);
            if (isElement) element = value;
            else if (!card && value.yani_collection_id) card = value;
        });
        values.forEach(function (value) {
            if (!value || card) return;
            var candidate = value.card || value.object || value.data;
            if (candidate && candidate.yani_collection_id) card = candidate;
        });
        if (!element && card && card.render) element = card.render(true);
        return {element: element && element.jquery ? element : element ? $(element) : $(), card: card};
    }

    function bindCollectionCard(first, second, third, deps) {
        var resolved = renderElement(first, second, third);
        var element = resolved.element;
        var card = resolved.card;
        if (!element.length || !card) return;
        var rendered = element;
        var view = $('.card__view', rendered).first();
        var previews = card.yani_collection_previews || [];

        rendered.add(rendered.find('*')).off('hover:enter click');
        rendered.on('hover:enter.yaniCollection click.yaniCollection', function (event) {
            if (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            deps.open(card.yani_collection);
        });
        rendered.addClass('yani-collection-card');

        if (view.length && previews.length > 1 && !view.find('.yani-collection-card__previews').length) {
            var mosaic = $('<div class="yani-collection-card__previews"></div>');
            previews.slice(1, 4).forEach(function (url) {
                mosaic.append($('<span></span>').css('background-image', 'url("' + String(url).replace(/"/g, '%22') + '")'));
            });
            view.append(mosaic);
        }

        if (view.length && !view.find('.yani-collection-card__meta').length) {
            var labels = [];
            if (card.yani_collection_count) labels.push(card.yani_collection_count + ' ' + deps.t('anime_count'));
            if (card.yani_collection_views) labels.push('◉ ' + card.yani_collection_views);
            if (card.yani_collection_likes) labels.push('♥ ' + card.yani_collection_likes);
            if (labels.length) view.append($('<div class="yani-collection-card__meta"></div>').text(labels.join(' · ')));
        }
    }

    function catalog(object, deps) {
        object.page = 1;
        var comp = new Lampa.InteractionCategory(object);
        var limit = 20;
        var maxPages = 1000;
        var seen = {};
        var requestedOffsets = {};
        var nextCatalogOffset = 0;
        var catalogDone = false;

        function uniqueCards(items) {
            return (items || []).map(function (collection) {
                var id = collection && collection.id;
                var key = id === undefined || id === null ? String(collection && collection.title || '') : String(id);
                if (!key || seen[key]) return null;
                seen[key] = true;
                return collectionCard(collection);
            }).filter(Boolean);
        }

        function buildInitial(self, items) {
            self.build({results: uniqueCards(items), total_pages: maxPages, title: deps.t('collections')});
        }

        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            deps.feed().then(function (payload) {
                var response = responseValue(payload) || {};
                var items = Array.isArray(response.collections) ? response.collections : [];
                if (items.length) return buildInitial(self, items);
                requestedOffsets[0] = true;
                return deps.load(limit, 0).then(function (fallback) {
                    var raw = collectionItems(fallback);
                    nextCatalogOffset = raw.length;
                    catalogDone = raw.length < limit;
                    buildInitial(self, raw);
                });
            }).catch(function (error) {
                requestedOffsets[0] = true;
                deps.load(limit, 0).then(function (fallback) {
                    var raw = collectionItems(fallback);
                    nextCatalogOffset = raw.length;
                    catalogDone = raw.length < limit;
                    buildInitial(self, raw);
                }).catch(function (fallbackError) {
                    console.error('[YummyAnime Collections]', fallbackError || error);
                    self.activity.loader(false);
                    deps.error(deps.t('collections_load_error'));
                });
            });
        };

        comp.nextPageReuest = function (requestObject, resolve, reject) {
            function loadNext(attempt) {
                if (catalogDone || attempt > 4) {
                    requestObject.page = maxPages;
                    resolve({results: [], total_pages: maxPages, title: deps.t('collections')});
                    return;
                }
                var offset = nextCatalogOffset;
                if (requestedOffsets[offset]) {
                    nextCatalogOffset += limit;
                    loadNext(attempt + 1);
                    return;
                }
                requestedOffsets[offset] = true;
                deps.load(limit, offset).then(function (payload) {
                    var raw = collectionItems(payload);
                    nextCatalogOffset = offset + raw.length;
                    catalogDone = raw.length < limit;
                    var cards = uniqueCards(raw);
                    if (!cards.length && !catalogDone) return loadNext(attempt + 1);
                    if (catalogDone) requestObject.page = maxPages;
                    resolve({results: cards, total_pages: maxPages, title: deps.t('collections')});
                }).catch(function (error) {
                    delete requestedOffsets[offset];
                    requestObject.page = Math.max(1, Number(requestObject.page || 2) - 1);
                    deps.error(deps.t('next_page_error'));
                    reject(error);
                });
            }
            loadNext(0);
        };
        comp.nextPageRequest = comp.nextPageReuest;
        comp.cardRender = function (first, second, third) { bindCollectionCard(first, second, third, deps); };
        return comp;
    }

    function detail(object, deps) {
        object.page = 1;
        var comp = new Lampa.InteractionCategory(object);
        var limit = 30;
        var maxPages = 1000;
        var seen = {};

        function detailCards(collection) {
            return (Array.isArray(collection.animes) ? collection.animes : []).map(deps.toCard).filter(function (card) {
                var key = String(card.yani_id || '');
                if (!key || seen[key]) return false;
                seen[key] = true;
                return true;
            });
        }

        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            deps.detail(object.collectionId, limit, 0).then(function (payload) {
                var collection = responseValue(payload) || {};
                var anime = Array.isArray(collection.animes) ? collection.animes : [];
                var cards = detailCards(collection);
                if (anime.length < limit) object.page = maxPages;
                self.build({results: cards, total_pages: maxPages, title: collection.title || deps.t('collection')});
                if (!cards.length) deps.error(deps.t('collection_empty'));
            }).catch(function (error) {
                console.error('[YummyAnime Collection]', error);
                self.activity.loader(false);
                deps.error(deps.t('collection_load_error'));
            });
        };
        comp.nextPageReuest = function (requestObject, resolve, reject) {
            var offset = Math.max(0, (Number(requestObject.page || 2) - 1) * limit);
            deps.detail(object.collectionId, limit, offset).then(function (payload) {
                var collection = responseValue(payload) || {};
                var anime = Array.isArray(collection.animes) ? collection.animes : [];
                if (anime.length < limit) requestObject.page = maxPages;
                resolve({results: detailCards(collection), total_pages: maxPages, title: collection.title || deps.t('collection')});
            }).catch(function (error) {
                requestObject.page = Math.max(1, Number(requestObject.page || 2) - 1);
                deps.error(deps.t('next_page_error'));
                reject(error);
            });
        };
        comp.nextPageRequest = comp.nextPageReuest;
        comp.cardRender = deps.cardRender;
        return comp;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Collections = window.LampaYaniCollections = {
        catalog: catalog,
        detail: detail,
        normalize: collectionItems,
        card: collectionCard
    };
}(window));

(function (window) {
    'use strict';

    function response(payload) {
        return payload && payload.response ? payload.response : payload || {};
    }

    function releaseItems(payload) {
        var value = response(payload);
        return Array.isArray(value.new) ? value.new : [];
    }

    function releaseLabel(item) {
        item = item || {};
        var status = item.anime_status && (item.anime_status.title || item.anime_status.alias) || '';
        var type = item.type && (item.type.name || item.type.shortname || item.type.alias) || '';
        return [status, type].filter(Boolean).join(' · ');
    }

    function normalize(payload, toCard) {
        var seen = {};
        return releaseItems(payload).map(function (item) {
            var card = toCard(item);
            var key = String(card && (card.yani_id || card.title) || '');
            if (!card || !card.yani_id || !key || seen[key]) return null;
            seen[key] = true;
            card.yani_update_label = releaseLabel(item);
            return card;
        }).filter(Boolean);
    }

    function component(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            deps.feed().then(function (payload) {
                var cards = normalize(payload, deps.toCard);
                self.build({results: cards, total_pages: 1, title: deps.t('new_releases')});
                if (!cards.length) deps.notice(deps.t('new_releases_empty'));
            }).catch(function (error) {
                console.error('[YummyAnime New Releases]', error);
                self.activity.loader(false);
                deps.notice(deps.t('new_releases_error'));
            });
        };
        comp.cardRender = deps.cardRender;
        return comp;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Releases = window.LampaYaniReleases = {
        component: component,
        normalize: normalize,
        releaseItems: releaseItems,
        releaseLabel: releaseLabel
    };
}(window));

(function (window) {
    'use strict';

    function payloadItems(payload) {
        var value = payload && payload.response !== undefined ? payload.response : payload;
        if (Array.isArray(value)) return value;
        return value && (value.items || value.data || value.history || value.watches) || [];
    }

    function timestamp(value) {
        if (!value) return 0;
        if (typeof value === 'string' && !/^\d+$/.test(value)) return Date.parse(value) || 0;
        var number = Number(value) || 0;
        return number > 0 && number < 100000000000 ? number * 1000 : number;
    }

    function recentSources(localHistory, remotePayload, limit) {
        var candidates = [];
        Object.keys(localHistory || {}).forEach(function (key) {
            var item = localHistory[key] || {};
            candidates.push({
                id: item.anime_id || key,
                title: item.title || item.card && item.card.title || '',
                updatedAt: timestamp(item.updated_at || item.date)
            });
        });
        payloadItems(remotePayload).forEach(function (item) {
            item = item || {};
            candidates.push({
                id: item.anime_id || item.animeId || item.anime && (item.anime.anime_id || item.anime.id),
                title: item.title || item.anime_title || item.anime && item.anime.title || '',
                updatedAt: timestamp(item.updated_at || item.date || item.created_at)
            });
        });
        candidates.sort(function (a, b) { return b.updatedAt - a.updatedAt; });
        var seen = {};
        return candidates.filter(function (item) {
            var key = String(item.id || '');
            if (!key || seen[key]) return false;
            seen[key] = true;
            return true;
        }).slice(0, limit || 4);
    }

    function cardsFromRows(rows, sources, toCard, t) {
        var seen = {};
        (sources || []).forEach(function (source) { seen[String(source.id)] = true; });
        var cards = [];
        (rows || []).forEach(function (row, index) {
            var source = sources[index] || {};
            (row || []).forEach(function (item) {
                var card = toCard(item);
                var key = String(card && (card.yani_id || card.title) || '');
                if (!card || !card.yani_id || !key || seen[key]) return;
                seen[key] = true;
                card.yani_recommendation_label = source.title
                    ? t('because_you_watched') + ' ' + source.title
                    : t('recommended_for_you');
                cards.push(card);
            });
        });
        return cards.slice(0, 40);
    }

    function fallback(comp, deps) {
        return deps.catalog({limit: 30, sort: 'top', sort_forward: true, from_year: 1900}).then(function (payload) {
            var cards = deps.normalize(payload).map(deps.toCard).filter(function (card) { return Boolean(card.yani_id); });
            cards.forEach(function (card) { card.yani_recommendation_label = deps.t('popular_fallback'); });
            comp.build({results: cards, total_pages: 1, title: deps.t('for_you')});
            if (!cards.length) deps.notice(deps.t('recommendations_empty'));
        });
    }

    function component(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            var remote = deps.authorized()
                ? deps.watchHistory(30, 0).catch(function (error) {
                    console.warn('[YummyAnime Recommendations] Remote history is unavailable', error);
                    return [];
                })
                : Promise.resolve([]);
            remote.then(function (remotePayload) {
                var sources = recentSources(deps.history(), remotePayload, 4);
                if (!sources.length) return fallback(self, deps);
                return Promise.all(sources.map(function (source) {
                    return deps.recommendations(source.id).then(deps.normalize).catch(function (error) {
                        console.warn('[YummyAnime Recommendations] Source failed', source.id, error);
                        return [];
                    });
                })).then(function (rows) {
                    var cards = cardsFromRows(rows, sources, deps.toCard, deps.t);
                    if (!cards.length) return fallback(self, deps);
                    self.build({results: cards, total_pages: 1, title: deps.t('for_you')});
                });
            }).catch(function (error) {
                console.error('[YummyAnime Recommendations]', error);
                self.activity.loader(false);
                deps.notice(deps.t('recommendations_error'));
            });
        };
        comp.cardRender = deps.cardRender;
        return comp;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Recommendations = window.LampaYaniRecommendations = {
        component: component,
        payloadItems: payloadItems,
        recentSources: recentSources,
        cardsFromRows: cardsFromRows
    };
}(window));

(function (window) {
    'use strict';

    function responseItems(payload, fields) {
        var value = payload && payload.response !== undefined ? payload.response : payload;
        if (Array.isArray(value)) return value;
        fields = fields || [];
        for (var index = 0; value && index < fields.length; index += 1) {
            if (Array.isArray(value[fields[index]])) return value[fields[index]];
        }
        return [];
    }

    function animeSource(item) {
        return item && (item.anime || item.title_data || item.object) || item || {};
    }

    function animeId(item) {
        var source = animeSource(item);
        return source.anime_id || source.animeId || source.yani_id || source.id || '';
    }

    function listId(item) {
        var source = animeSource(item);
        var state = source.user && source.user.list || item && item.user && item.user.list || source.user_list || source.list_state;
        var list = state && state.list && typeof state.list === 'object' ? state.list : state;
        return list && typeof list.id !== 'undefined' ? Number(list.id) : null;
    }

    function relevantTitles(listItems, subscriptionPayload) {
        var values = {};
        (listItems || []).forEach(function (item) {
            if ([0, 1, 5].indexOf(listId(item)) < 0) return;
            var id = String(animeId(item));
            if (id) values[id] = animeSource(item);
        });
        responseItems(subscriptionPayload, ['items', 'data', 'subscriptions', 'anime']).forEach(function (item) {
            var id = String(animeId(item));
            if (id && !values[id]) values[id] = animeSource(item);
        });
        return values;
    }

    function latestVideoEvents(feedPayload) {
        var events = responseItems(feedPayload, ['new_videos']).slice().sort(function (a, b) {
            return Number(b && b.date || 0) - Number(a && a.date || 0);
        });
        var latest = {};
        events.forEach(function (event) {
            var id = String(animeId(event));
            if (id && !latest[id]) latest[id] = event;
        });
        return latest;
    }

    function updateLabel(event, episodes, t) {
        if (event) {
            return [event.ep_title || event.number && t('episode') + ' ' + event.number, event.dub_title, event.player_title]
                .filter(Boolean).join(' · ');
        }
        if (episodes && Number(episodes.aired || 0)) return t('episode') + ' ' + Number(episodes.aired);
        return t('upcoming_release');
    }

    function cards(listItems, subscriptionPayload, schedulePayload, feedPayload, deps) {
        var relevant = relevantTitles(listItems, subscriptionPayload);
        var schedule = {};
        deps.normalize(schedulePayload).forEach(function (item) {
            var id = String(animeId(item));
            if (id) schedule[id] = item;
        });
        var events = latestVideoEvents(feedPayload);
        var results = Object.keys(relevant).map(function (id) {
            var scheduled = schedule[id] || {};
            var event = events[id] || null;
            var source = Object.assign({}, relevant[id], scheduled, event || {});
            var card = deps.toCard(source);
            var episodes = scheduled.episodes || source.episodes || {};
            card.yani_update_date = Number(event && event.date || episodes.prev_date || episodes.next_date || 0);
            card.yani_update_label = updateLabel(event, episodes, deps.t);
            return card;
        }).filter(function (card) { return Boolean(card.yani_id && card.yani_update_date); });
        return results.sort(function (a, b) {
            return Number(b.yani_update_date || 0) - Number(a.yani_update_date || 0);
        }).slice(0, 40);
    }

    function component(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            if (!deps.authorized()) {
                self.build({results: [], total_pages: 1, title: deps.t('updates')});
                deps.notice(deps.t('login_required'));
                return;
            }
            deps.resolveUserId().then(function (userId) {
                return Promise.all([
                    deps.loadLists(userId),
                    deps.subscriptions(userId).catch(function () { return []; }),
                    deps.schedule().catch(function () { return []; }),
                    deps.feed().catch(function () { return {}; })
                ]);
            }).then(function (result) {
                var resultCards = cards(result[0], result[1], result[2], result[3], deps);
                self.build({results: resultCards, total_pages: 1, title: deps.t('updates')});
                if (!resultCards.length) deps.notice(deps.t('updates_empty'));
            }).catch(function (error) {
                console.error('[YummyAnime Updates]', error);
                self.activity.loader(false);
                deps.notice(deps.t('updates_error'));
            });
        };
        comp.cardRender = deps.cardRender;
        return comp;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Updates = window.LampaYaniUpdates = {
        component: component,
        animeId: animeId,
        listId: listId,
        relevantTitles: relevantTitles,
        latestVideoEvents: latestVideoEvents,
        cards: cards
    };
}(window));

(function (window) {
    'use strict';

    function videoItems(payload) {
        var value = payload && payload.response ? payload.response : payload || {};
        return Array.isArray(value.new_videos) ? value.new_videos : [];
    }

    function animeId(video) {
        video = video || {};
        return video.anime_id || video.animeId || video.anime && (video.anime.anime_id || video.anime.id) || '';
    }

    function latestEvents(payload) {
        var grouped = {};
        videoItems(payload).slice().sort(function (a, b) {
            return Number(b && b.date || 0) - Number(a && a.date || 0);
        }).forEach(function (video) {
            var id = String(animeId(video));
            if (!id) return;
            if (!grouped[id]) grouped[id] = {latest: video, count: 0};
            grouped[id].count += 1;
        });
        return Object.keys(grouped).map(function (id) { return grouped[id]; });
    }

    function label(video, additional) {
        var labels = [video.ep_title, video.dub_title, video.player_title].filter(Boolean);
        if (additional > 0) labels.push('+' + additional);
        return labels.join(' · ');
    }

    function normalize(payload, toCard) {
        return latestEvents(payload).map(function (group) {
            var video = group.latest;
            var card = toCard(video);
            card.yani_id = animeId(video);
            card.yani_update_date = Number(video.date || 0);
            card.yani_translation_count = group.count;
            card.yani_update_label = label(video, group.count - 1);
            card.overview = [video.description, video.dub_title, video.player_title].filter(Boolean).join(' · ');
            return card;
        }).filter(function (card) { return Boolean(card.yani_id); }).sort(function (a, b) {
            return Number(b.yani_update_date || 0) - Number(a.yani_update_date || 0);
        });
    }

    function component(object, deps) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            deps.feed().then(function (payload) {
                var cards = normalize(payload, deps.toCard);
                self.build({results: cards, total_pages: 1, title: deps.t('new_translations')});
                if (!cards.length) deps.notice(deps.t('new_translations_empty'));
            }).catch(function (error) {
                console.error('[YummyAnime New Translations]', error);
                self.activity.loader(false);
                deps.notice(deps.t('new_translations_error'));
            });
        };
        comp.cardRender = deps.cardRender;
        return comp;
    }

    window.LampaYani = window.LampaYani || {};
    window.LampaYani.Translations = window.LampaYaniTranslations = {
        component: component,
        videoItems: videoItems,
        animeId: animeId,
        latestEvents: latestEvents,
        normalize: normalize
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

    var externalRestoreState = {
        pending: false,
        installed: false,
        openedAt: 0,
        departed: false,
        controller: 'content',
        element: null,
        collection: null
    };
    var playbackReturnState = {
        active: false,
        controller: 'content',
        element: null,
        collection: null
    };
    var usagePolicyVisible = false;

    function goBack() {
        if (window.Lampa && Lampa.Activity && Lampa.Activity.backward) {
            Lampa.Activity.backward();
        }
    }

    function transientNavigationSnapshot() {
        var element = document.querySelector('.yani-home .selector.focus, .yani-detail .selector.focus, .yani-account .selector.focus, .yani-schedule .selector.focus') ||
            document.querySelector('.selector.focus') ||
            document.querySelector('.yani-home .selector, .yani-detail .selector, .yani-account .selector, .yani-schedule .selector') ||
            document.querySelector('.selector');
        var collection = element ? $(element).closest('.scroll, .yani-detail, .yani-home, .yani-account, .yani-schedule') : null;
        return {
            controller: currentControllerName() || 'content',
            element: element || null,
            collection: collection && collection.length ? collection : null
        };
    }

    function restoreTransientInteraction(snapshot) {
        snapshot = snapshot || transientNavigationSnapshot();
        setTimeout(function () {
            try {
                var controller = snapshot.controller && snapshot.controller !== 'select' && snapshot.controller !== 'input'
                    ? snapshot.controller
                    : 'content';
                var element = snapshot.element;
                if (!element || !document.documentElement.contains(element)) {
                    element = document.querySelector('.yani-home .selector') ||
                        document.querySelector('.yani-detail .selector') ||
                        document.querySelector('.yani-account .selector') ||
                        document.querySelector('.yani-schedule .selector') ||
                        document.querySelector('.selector');
                }
                var collection = snapshot.collection;
                if (!collection || !collection.length || !document.documentElement.contains(collection[0])) {
                    collection = element ? $(element).closest('.scroll, .yani-detail, .yani-home, .yani-account, .yani-schedule') : null;
                }
                if (Lampa.Controller && Lampa.Controller.toggle) Lampa.Controller.toggle(controller);
                if (collection && collection.length && Lampa.Controller && Lampa.Controller.collectionSet) {
                    Lampa.Controller.collectionSet(collection);
                }
                if (element && Lampa.Controller && Lampa.Controller.collectionFocus) {
                    Lampa.Controller.collectionFocus(element, collection && collection.length ? collection : undefined);
                }
            } catch (error) {
                console.warn('[YummyAnime] Could not restore transient navigation', error);
            }
        }, 0);
    }

    function showYummySelect(params, snapshot) {
        if (!Lampa.Select || !Lampa.Select.show) return false;
        snapshot = snapshot || transientNavigationSnapshot();
        params = Object.assign({}, params || {});
        var originalBack = params.onBack;
        params.onBack = function () {
            // A nested Select may deliberately rebuild its parent list.
            // Only the root window should restore the underlying Activity.
            if (originalBack) return originalBack();
            restoreTransientInteraction(snapshot);
        };
        Lampa.Select.show(params);
        return true;
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
            if (account.token && LampaYaniAuth.refreshIfNeeded) {
                LampaYaniAuth.refreshIfNeeded();
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

            Lampa.Component.add('yani_catalog', Catalog);
            Lampa.Component.add('yani_top', Top);

            Lampa.Component.add('yani_recommended', Recommended);
            Lampa.Component.add('yani_updates', Updates);
            Lampa.Component.add('yani_new_translations', NewTranslations);
            Lampa.Component.add('yani_new_releases', NewReleases);
            Lampa.Component.add('yani_collections', Collections);
            Lampa.Component.add('yani_collection', CollectionDetail);
            Lampa.Component.add('yani_schedule', Schedule);
            Lampa.Component.add('yani_history', History);

            Lampa.Component.add('yani_detail', Detail);
            Lampa.Component.add('yani_policy', UsagePolicy);
            Lampa.Component.add('yani_trailers', TrailerList);
            Lampa.Component.add('yani_account', Account);
            Lampa.Component.add('yani_user_lists', UserLists);
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

    function Top(object) {
        object.topMode = true;
        object.params = Object.assign({limit: 30, sort: 'top', sort_forward: true, from_year: 1900}, object.params || {});
        return Catalog(object);
    }

    function Catalog(object) {
        var comp = new Lampa.InteractionCategory(object);
        var topMode = Boolean(object.topMode);
        var baseParams = copyParams(object.params || {limit: 30, sort: 'top', sort_forward: false});
        var limit = Number(baseParams.limit || 30);
        var maxPages = Math.ceil(20000 / limit) + 1;
        var seen = {};
        var requestedOffsets = {};

        object.page = 1;
        baseParams.limit = limit;
        baseParams.offset = Number(baseParams.offset || 0);
        baseParams.sort = baseParams.sort || 'top';
        baseParams.sort_forward = baseParams.sort_forward === true || baseParams.sort_forward === 'true';
        var controls = LampaYaniCatalogControls.create({
            comp: comp,
            object: object,
            baseParams: baseParams,
            topMode: topMode,
            t: t,
            copyParams: copyParams,
            showSelect: showYummySelect,
            navigationSnapshot: transientNavigationSnapshot,
            filterModel: LampaYaniCatalogFilters
        });

        comp.create = function () {
            var self = this;
            this.activity.loader(true);
            LampaYaniApi.catalog(baseParams)
                .then(function (payload) {
                    var raw = LampaYaniApi.normalize(payload);
                    var results = mapUniqueCards(raw, seen);
                    requestedOffsets[baseParams.offset] = true;
                    if (raw.length < limit) object.page = maxPages;
                    self.build({results: results, total_pages: maxPages, title: t(topMode ? 'top_rated' : 'anime')});
                    controls.install();
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
                resolve({results: [], total_pages: maxPages, title: t(topMode ? 'top_rated' : 'anime')});
                return;
            }
            requestedOffsets[params.offset] = true;

            LampaYaniApi.catalog(params).then(function (payload) {
                var raw = LampaYaniApi.normalize(payload);
                var results = mapUniqueCards(raw, seen);
                if (raw.length < limit) requestObject.page = maxPages;
                resolve({results: results, total_pages: maxPages, title: t(topMode ? 'top_rated' : 'anime')});
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
    }

    function Home(object) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
        scroll.minus();
        var html = $('<div class="yani-home"></div>');
        var grid = $('<div class="yani-home__grid"></div>');
        var last;
        var homeButtons = {};
        var destroyed = false;
        var navigatorInfo = window.navigator || {};
        var reducedMotion = Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        var lowMemoryDevice = Number(navigatorInfo.deviceMemory || 0) > 0 && Number(navigatorInfo.deviceMemory) <= 2;
        var lowCpuDevice = Number(navigatorInfo.hardwareConcurrency || 0) > 0 && Number(navigatorInfo.hardwareConcurrency) <= 2;
        html.addClass(reducedMotion || lowMemoryDevice || lowCpuDevice ? 'yani-home--reduced-motion' : 'yani-home--motion');

        var items = [
            {key: 'catalog', title: t('catalog'), action: function () {
                Lampa.Activity.push({url: 'yani/catalog', title: 'YummyAnime ' + t('catalog'), component: 'yani_catalog', params: {limit: 30, sort: 'top', sort_forward: false}});
            }},
            {key: 'genres', title: t('genres'), action: openGenres},
            {key: 'search', title: t('search'), action: openSearch},
            {key: 'schedule', title: t('schedule'), subtitle: t('japan_broadcast'), group: 'episode_flow', action: function () {
                Lampa.Activity.push({url: 'yani/schedule', title: 'YummyAnime ' + t('schedule'), component: 'yani_schedule'});
            }},
            {key: 'new_translations', title: t('new_translations'), subtitle: t('translations_and_dubs'), group: 'episode_flow', action: function () {
                Lampa.Activity.push({url: 'yani/new-translations', title: 'YummyAnime ' + t('new_translations'), component: 'yani_new_translations'});
            }},
            {key: 'continue_watching', title: t('continue_watching'), action: function () {
                openContinueWatching();
            }},
            {key: 'user_lists', title: t('user_lists'), authorized: true, action: openUserLists},
            {key: 'new_releases', title: t('new_releases'), group: 'discover', action: function () {
                Lampa.Activity.push({url: 'yani/new-releases', title: 'YummyAnime ' + t('new_releases'), component: 'yani_new_releases'});
            }},
            {key: 'top_rated', title: t('top_rated'), group: 'discover', action: function () {
                Lampa.Activity.push({url: 'yani/top', title: 'YummyAnime ' + t('top_rated'), component: 'yani_top', topMode: true, params: {limit: 30, sort: 'top', sort_forward: true, from_year: 1900}});
            }},
            {key: 'for_you', title: t('for_you'), group: 'discover', action: function () {
                Lampa.Activity.push({url: 'yani/for-you', title: 'YummyAnime ' + t('for_you'), component: 'yani_recommended'});
            }},
            {key: 'updates', title: t('updates'), action: function () {
                Lampa.Activity.push({url: 'yani/updates', title: 'YummyAnime ' + t('updates'), component: 'yani_updates'});
            }},
            {key: 'collections', title: t('collections'), group: 'discover', action: openCollections},
            {key: 'notifications', title: t('notifications'), authorized: true, action: openNotifications},
            {key: 'account', title: t('account'), action: openAccount},
            {key: 'status', title: t('status'), action: function () {
                Lampa.Activity.push({url: 'yani/status', title: 'YummyAnime ' + t('status'), component: 'yani_status'});
            }}
        ].filter(function (item) {
            return (!item.authorized || LampaYaniAuth.token()) && homeSectionEnabled(item.key);
        });

        this.create = function () {
            var waves = $(
                '<div class="yani-home__waves" aria-hidden="true">' +
                    '<svg viewBox="0 0 1440 760" preserveAspectRatio="none" focusable="false">' +
                        '<path class="yani-home__wave yani-home__wave--far" d="M-120 190 C 120 25 315 335 555 188 S 940 48 1135 215 S 1450 292 1570 115"/>' +
                        '<path class="yani-home__wave yani-home__wave--middle" d="M-110 445 C 115 235 330 565 565 380 S 925 245 1130 420 S 1455 505 1560 330"/>' +
                        '<path class="yani-home__wave yani-home__wave--near" d="M-100 650 C 170 430 350 735 625 560 S 1015 430 1210 585 S 1465 660 1570 505"/>' +
                    '</svg>' +
                    '<span class="yani-home__pulse yani-home__pulse--one"></span>' +
                    '<span class="yani-home__pulse yani-home__pulse--two"></span>' +
                '</div>'
            );
            var episodeFlow;
            var episodeFlowItems;
            var discover;
            var discoverItems;
            items.forEach(function (item) {
                var text = $('<div class="yani-home__text"></div>');
                text.append($('<div class="yani-home__title"></div>').text(item.title));
                if (item.subtitle) text.append($('<div class="yani-home__subtitle"></div>').text(item.subtitle));
                var button = $('<div class="yani-home__item yani-home__item--' + item.key + ' selector"></div>');
                button.append(
                    $('<div class="yani-home__icon"></div>').html(homeIcon(item.key)),
                    text,
                    $('<span class="yani-home__count" aria-hidden="true"></span>'),
                    $('<div class="yani-home__arrow">›</div>')
                );
                homeButtons[item.key] = button;
                button.on('hover:focus', function (event) {
                    var target = event.currentTarget || event.target;
                    last = target;
                    scroll.update($(target), true);
                });
                button.on('hover:enter', item.action);
                if (item.group === 'episode_flow') {
                    if (!episodeFlow) {
                        episodeFlow = $('<div class="yani-home__episode-flow"><div class="yani-home__episode-flow-title"></div><div class="yani-home__episode-flow-items"></div><div class="yani-home__episode-flow-wave" aria-hidden="true"><svg viewBox="0 0 240 44" preserveAspectRatio="none"><path d="M2 28 C58 2 83 43 121 23 S185 4 238 25"/><circle cx="121" cy="23" r="4"/></svg></div></div>');
                        episodeFlow.find('.yani-home__episode-flow-title').text(t('episode_flow'));
                        episodeFlowItems = episodeFlow.find('.yani-home__episode-flow-items');
                        grid.append(episodeFlow);
                    }
                    episodeFlowItems.append(button);
                } else if (item.group === 'discover') {
                    if (!discover) {
                        discover = $('<div class="yani-home__discover"><div class="yani-home__discover-head"><span class="yani-home__discover-title"></span><span class="yani-home__discover-mark" aria-hidden="true"><i></i><i></i><i></i></span></div><div class="yani-home__discover-items"></div></div>');
                        discover.find('.yani-home__discover-title').text(t('discover'));
                        discoverItems = discover.find('.yani-home__discover-items');
                        grid.append(discover);
                    }
                    discoverItems.append(button);
                } else {
                    grid.append(button);
                }
            });
            scroll.append(grid);
            html.append(waves);
            html.append(scroll.render(true));
            this.activity.loader(false);
            this.activity.toggle();
            if (homeButtons.new_translations || homeButtons.new_releases || homeButtons.collections) {
                LampaYaniHomeInsights.load(LampaYaniApi.feed).then(function (insights) {
                    if (destroyed) return;
                    Object.keys(insights).forEach(function (key) {
                        var button = homeButtons[key];
                        var count = Number(insights[key] || 0);
                        if (!button || !count) return;
                        $('.yani-home__count', button)
                            .text(count > 99 ? '99+' : String(count))
                            .attr('aria-hidden', 'false')
                            .addClass('yani-home__count--visible');
                    });
                }).catch(function (error) {
                    console.warn('[YummyAnime Home] Feed insights are unavailable', error);
                });
            }
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
        this.destroy = function () { destroyed = true; homeButtons = {}; scroll.destroy(); html.remove(); };
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
            new_translations: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h10v9H9l-4 4v-4H4zM14 10h6v8h-3l-3 3v-3h-2"/><path d="M7 9h4M16 14h2"/></svg>',
            new_releases: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 13v7h14v-7M8 17h8"/></svg>',
            continue_watching: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/></svg>',
            status: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h4l2-6 4 12 2-6h6"/></svg>',
            top_rated: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/></svg>',
            for_you: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5S4 15.7 4 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.2-8 11-8 11Z"/><path d="M12 11v5M9.5 13.5h5"/></svg>',
            updates: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h7"/><circle cx="18" cy="16" r="3"/><path d="M18 14v2l1.3 1"/></svg>',
            collections: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5 12 3l8 3.5-8 3.5-8-3.5Z"/><path d="m4 11 8 3.5 8-3.5M4 15.5 12 19l8-3.5"/></svg>',
            user_lists: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v5H5zM5 11h14v9H5z"/><path d="M8 6.5h6M8 14h8M8 17h5"/></svg>',
            notifications: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17h12l-1.5-2.2V10a4.5 4.5 0 0 0-9 0v4.8L6 17zM10 20h4"/><path d="M18.5 5.5 20 4M5.5 5.5 4 4"/></svg>',
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
        return LampaYaniRecommendations.component(object, {
            t: t,
            history: playbackHistory,
            authorized: function () { return Boolean(LampaYaniAuth.token()); },
            watchHistory: LampaYaniApi.watchHistory,
            recommendations: LampaYaniApi.recommendations,
            catalog: LampaYaniApi.catalog,
            normalize: LampaYaniApi.normalize,
            toCard: toCard,
            cardRender: bindRecommendedCardRender,
            notice: function (message) { Lampa.Noty.show(message); }
        });
    }

    function NewTranslations(object) {
        return LampaYaniTranslations.component(object, {
            t: t,
            feed: LampaYaniApi.feed,
            toCard: toCard,
            cardRender: bindRecommendedCardRender,
            notice: function (message) { Lampa.Noty.show(message); }
        });
    }

    function NewReleases(object) {
        return LampaYaniReleases.component(object, {
            t: t,
            feed: LampaYaniApi.feed,
            toCard: toCard,
            cardRender: bindRecommendedCardRender,
            notice: function (message) { Lampa.Noty.show(message); }
        });
    }

    function Collections(object) {
        return LampaYaniCollections.catalog(object, {
            t: t,
            feed: LampaYaniApi.feed,
            load: LampaYaniApi.collectionCatalog,
            open: openCollection,
            error: function (message) { Lampa.Noty.show(message); }
        });
    }

    function CollectionDetail(object) {
        return LampaYaniCollections.detail(object, {
            t: t,
            detail: LampaYaniApi.collectionDetail,
            toCard: toCard,
            cardRender: bindRecommendedCardRender,
            error: function (message) { Lampa.Noty.show(message); }
        });
    }

    function Updates(object) {
        return LampaYaniUpdates.component(object, {
            t: t,
            authorized: function () { return Boolean(LampaYaniAuth.token()); },
            resolveUserId: resolveUserListsUserId,
            loadLists: loadUserListsSnapshot,
            subscriptions: LampaYaniApi.subscriptions,
            schedule: LampaYaniApi.schedule,
            feed: LampaYaniApi.feed,
            normalize: LampaYaniApi.normalize,
            toCard: toCard,
            cardRender: bindYummyCardRender,
            notice: function (message) { Lampa.Noty.show(message); }
        });
    }

    function History(object) {
        return LampaYaniHomeSections.history(object, {
            t: t,
            history: playbackHistory,
            toCard: toCard,
            detail: LampaYaniApi.detail,
            authorized: function () { return Boolean(LampaYaniAuth.token()); },
            fetchRemote: LampaYaniApi.watchHistory,
            fetchExcluded: loadContinueWatchingExclusions,
            historyCardRender: bindHistoryCardRender
        });
    }

    function loadContinueWatchingExclusions() {
        if (!LampaYaniAuth.token()) return Promise.resolve({});
        var account = LampaYaniAuth.get();

        function withUserId() {
            var storedId = Number(account && account.user_id || 0);
            if (storedId) return Promise.resolve(storedId);
            return LampaYaniApi.profile().then(function (payload) {
                var profile = payload && payload.response ? payload.response : payload;
                var userId = Number(profile && (profile.id || profile.user_id || profile.user && profile.user.id) || 0);
                if (!userId) throw new Error('YummyAnime profile id is missing');
                LampaYaniAuth.save({
                    token: LampaYaniAuth.token(),
                    login: account && account.login,
                    display_name: account && account.display_name,
                    user_id: userId
                });
                return userId;
            });
        }

        function cacheKey(userId) { return 'yani_continue_excluded_' + userId; }
        function readCache(userId) {
            try {
                var cached = Lampa.Storage.get(cacheKey(userId), '{}');
                if (typeof cached === 'string') cached = JSON.parse(cached || '{}');
                return cached && cached.ids || {};
            } catch (error) { return {}; }
        }

        return withUserId().then(function (userId) {
            return LampaYaniApi.userLists(userId).then(normalizeUserList).then(function (items) {
                var excluded = {};
                [2, 3].forEach(function (listId) {
                    filterAccountListItems({id: listId}, items).forEach(function (item) {
                        var animeId = item && (item.anime_id || item.id || item.yani_id);
                        if (animeId) excluded[String(animeId)] = true;
                    });
                });
                try {
                    Lampa.Storage.set(cacheKey(userId), JSON.stringify({updated_at: Date.now(), ids: excluded}));
                } catch (error) {
                    console.warn('[YummyAnime Continue Watching] Could not cache exclusions', error);
                }
                return excluded;
            }).catch(function (error) {
                var cached = readCache(userId);
                if (Object.keys(cached).length) return cached;
                throw error;
            });
        });
    }

    function bindHistoryCardRender(first, second, third) {
        bindYummyCardRender(first, second, third);
        var card;
        var element;
        [first, second, third].forEach(function (value) {
            if (!value) return;
            if (!element && (value.jquery || value.nodeType || (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement))) element = value;
            if (!card && (value.render || value.yani_id || value.title)) card = value;
            else if (!card) {
                var candidate = value.card || value.object || value.data;
                if (candidate && (candidate.render || candidate.yani_id || candidate.title)) card = candidate;
            }
        });
        if (card && card.yani_id) {
            // Continue Watching is a playback queue, not an information catalog.
            var openHistoryEntry = function () { openVideos(card, true); };
            var rendered = cardRenderElement(element, card);
            rendered.addClass('yani-history-card').attr('data-yani-history-id', String(card.yani_id));
            rendered.add(rendered.find('*')).off('hover:enter.yaniOpen click.yaniOpen hover:enter.yaniHistory click.yaniHistory');
            rendered.on('hover:enter.yaniHistory click.yaniHistory', function (event) {
                if (event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
                openHistoryEntry();
                return false;
            });
            card.onEnter = openHistoryEntry;
            renderHistoryProgress(rendered, card.yani_resume || {});
        }
    }

    function renderHistoryProgress(rendered, playback) {
        var view = $('.card__view', rendered).first();
        if (!view.length) return;
        view.find('.yani-card-history, .yani-card-history-progress').remove();
        var duration = Math.max(0, Number(playback.duration || 0));
        var position = Math.max(0, Number(playback.time || 0));
        var percent = duration > 0 ? Math.min(100, Math.round(position / duration * 100)) : 0;
        var label = playback.number ? t('episode') + ' ' + playback.number : t('continue_watching');
        if (percent) label += ' · ' + percent + '%';
        view.append($('<span class="yani-card-history"></span>').text(label));
        if (duration > 0) {
            view.append($('<span class="yani-card-history-progress"><span></span></span>').find('span').css('width', percent + '%').end());
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

    function cardRenderElement(element, card) {
        var render = element && element.jquery ? element : element ? $(element) : $();
        if (!render.length && card && card.render) render = $(card.render(true));
        return render;
    }

    function bindYummyCard(element, card, options) {
        // Keep an explicit marker on the original Lampa card.  Some Lampa
        // versions preserve only custom fields when forwarding a card to the
        // default detail handler.
        card._yani_card = true;
        addCardRatings(element, card);
        addCardMediaBadges(element, card);
        addCardUpdateBadge(element, card);
        addCardRecommendationBadge(element, card);
        addCardListBadge(element, card);
        LampaYaniMedia.attachPosterFallback(element, card);
        // Some Lampa versions clone the card object after cardRender. Keep a
        // DOM-level handler as a fallback so search results remain clickable.
        var rendered = cardRenderElement(element, card);
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
            if (card.yani_id) showYummyActions(card, rendered, rendered.closest('.scroll, .yani-home'));
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
        var cardRender = cardRenderElement(element, card);
        renderCardMediaBadges(element, card, card.yani_media || mediaMeta(card));
        if (!card.yani_id || (card.yani_media && card.yani_media.loaded)) return;

        cardRender.off('hover:focus.yaniMedia').one('hover:focus.yaniMedia', function () {
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
        var mediaType = mediaTypeLabels(card && card.yani_type);
        if (!mediaType && !meta.quality && !meta.voices) return;
        var render = cardRenderElement(element, card);
        var view = $('.card__view', render).first();
        if (!view.length) return;
        var block = $('.yani-card-media', view);
        if (!block.length) block = $('<div class="yani-card-media"></div>').appendTo(view);
        block.empty();
        if (mediaType) block.append($('<span class="yani-card-media__badge yani-card-media__type"></span>').text(mediaType.short));
        if (meta.quality) block.append($('<span class="yani-card-media__badge yani-card-media__quality"></span>').text(meta.quality));
        if (meta.voices) block.append($('<span class="yani-card-media__badge yani-card-media__voices"></span>').text(meta.voices + ' ' + t('voices_short')));
    }

    function addCardUpdateBadge(element, card) {
        if (!card || (!card.yani_update_episode && !card.yani_update_label)) return;
        var render = cardRenderElement(element, card);
        var view = $('.card__view', render).first();
        if (!view.length || view.find('.yani-card-update').length) return;
        var label = card.yani_update_label || t('episode') + ' ' + card.yani_update_episode;
        view.append($('<span class="yani-card-update"></span>').text(label));
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

    function showYummyActions(card, originElement, originCollection) {
        if (!card || !card.yani_id) return;
        var originNode = originElement && originElement.jquery ? originElement[0] : originElement;
        var navigation = {
            controller: 'content',
            element: originNode || null,
            collection: originCollection && originCollection.length ? originCollection : null
        };
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

        showYummySelect({
            title: t('actions'),
            items: items,
            onSelect: function (item) {
                if (item.action === 'watch') {
                    beginPlaybackNavigation(originElement, originCollection);
                    return openVideos(card);
                }
                if (item.action === 'details') return openYummyDetail(card, false);
                if (item.action === 'comments') return commentsMenu(card.yani_id, 0, [], navigation);
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
        }, navigation);
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
            // Manual synchronization remains available from the account page
            // when automatic progress synchronization is deliberately off.
            if (!autoProgressSyncEnabled()) {
                var syncButton = $('<div class="yani-account__notification-button selector"></div>');
                syncButton.append($('<strong></strong>').text(t('sync_history')));
                syncButton.append($('<span></span>').text(t('sync_history_description')));
                bindAccountFocus(syncButton);
                syncButton.on('hover:enter click.yaniSync', syncPlaybackHistoryManually);
                content.append(syncButton);
            }
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

    function openNotifications() {
        Lampa.Activity.push({url: 'yani/notifications', title: t('notifications_title'), component: 'yani_notifications'});
    }

    function openUserLists() {
        if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('login_required'));
        Lampa.Activity.push({
            url: 'yani/user-lists',
            title: 'YummyAnime · ' + t('user_lists'),
            component: 'yani_user_lists'
        });
    }

    function openWatchHistory() {
        Lampa.Activity.push({
            url: 'yani/history',
            title: 'YummyAnime · ' + t('watch_history'),
            component: 'yani_history',
            mode: 'history'
        });
    }

    function openContinueWatching() {
        Lampa.Activity.push({
            url: 'yani/continue-watching',
            title: 'YummyAnime · ' + t('continue_watching'),
            component: 'yani_history',
            mode: 'continue'
        });
    }

    function openSubscriptions(userId) {
        Lampa.Activity.push({url: 'yani/subscriptions', title: t('subscriptions'), component: 'yani_subscriptions', userId: userId});
    }

    function openUserReviews(userId) {
        LampaYaniApi.userReviews(userId, 30, 0).then(function (payload) {
            var response = payload && payload.response ? payload.response : payload;
            var items = Array.isArray(response) ? response : response && (response.items || response.data || response.reviews) || [];
            if (!items.length) return Lampa.Noty.show(t('reviews_empty'));
            showYummySelect({title: t('my_reviews'), items: items.map(function (review) {
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

    function accountListDefinitions() {
        return [
            {id: 0, key: 'watching', title: t('watching'), icon: 'eye'},
            {id: 1, key: 'planned', title: t('planned'), icon: 'cloud'},
            {id: 2, key: 'completed', title: t('completed'), icon: 'flag'},
            {id: 3, key: 'dropped', title: t('dropped'), icon: 'eye-off'},
            {id: 4, key: 'favorites', title: t('favorites'), icon: 'heart'},
            {id: 5, key: 'postponed', title: t('postponed'), icon: 'hourglass'}
        ];
    }

    var userListsSnapshot = null;

    function resolveUserListsUserId() {
        var account = LampaYaniAuth.get();
        var storedId = Number(account && account.user_id || 0);
        if (storedId) return Promise.resolve(storedId);
        return LampaYaniApi.profile().then(function (payload) {
            var profile = payload && payload.response ? payload.response : payload;
            var userId = Number(profile && (profile.id || profile.user_id || profile.user && profile.user.id) || 0);
            if (!userId) throw new Error('YummyAnime profile id is missing');
            LampaYaniAuth.save({
                token: LampaYaniAuth.token(),
                login: account && account.login,
                display_name: account && account.display_name,
                user_id: userId
            });
            return userId;
        });
    }

    function loadUserListsSnapshot(userId) {
        var now = Date.now();
        if (userListsSnapshot && userListsSnapshot.userId === userId && now - userListsSnapshot.createdAt < 300000) {
            return userListsSnapshot.promise;
        }
        var promise = LampaYaniApi.userLists(userId).then(normalizeUserList);
        userListsSnapshot = {userId: userId, createdAt: now, promise: promise};
        promise.catch(function () {
            if (userListsSnapshot && userListsSnapshot.promise === promise) userListsSnapshot = null;
        });
        return promise;
    }

    function loadUserListShortcutCounts() {
        var counts = {history: Object.keys(playbackHistory()).length};
        return resolveUserListsUserId().then(function (id) {
            return Promise.all([
                loadUserListsSnapshot(id),
                LampaYaniApi.watchHistory(100, 0).catch(function () { return []; })
            ]);
        }).then(function (result) {
            var definitions = accountListDefinitions();
            definitions.forEach(function (definition) {
                counts[definition.key] = filterAccountListItems(definition, result[0]).length;
            });
            var historyPayload = result[1] && result[1].response ? result[1].response : result[1];
            var remoteHistory = Array.isArray(historyPayload) ? historyPayload : historyPayload && (historyPayload.items || historyPayload.data || historyPayload.history || historyPayload.results) || [];
            counts.history = Math.max(counts.history, remoteHistory.length);
            return counts;
        });
    }

    function userListItemTime(item) {
        item = item || {};
        var current = item.user && item.user.list || item.user_list || item.list_state || {};
        var nested = current.list && typeof current.list === 'object' ? current.list : {};
        var value = item.updated_at || item.date || item.created_at || current.updated_at || current.date ||
            current.created_at || nested.updated_at || nested.date || nested.created_at || 0;
        var numeric = Number(value);
        if (numeric > 0) return numeric < 100000000000 ? numeric * 1000 : numeric;
        var parsed = Date.parse(value);
        return isNaN(parsed) ? 0 : parsed;
    }

    function localHistoryCards(remotePayload) {
        var remote = LampaYaniHomeSections.normalizeRemoteHistory(remotePayload || []);
        return LampaYaniHomeSections.mergeHistory(playbackHistory(), remote).map(function (entry) {
            return toCard(Object.assign({}, entry.card || {}, {
                anime_id: entry.anime_id,
                title: entry.title || entry.card && entry.card.title,
                poster: entry.poster || entry.card && entry.card.poster,
                updated_at: entry.updated_at || 0
            }));
        });
    }

    function hydrateHistoryPosters(cards, listItems) {
        var known = {};
        (listItems || []).forEach(function (item) {
            var card = toCard(item);
            if (card.yani_id && card.poster) known[String(card.yani_id)] = card.poster;
        });
        cards.forEach(function (card) {
            var poster = known[String(card.yani_id || '')];
            if (!card.poster && poster) card.poster = card.img = poster;
        });

        var missing = cards.filter(function (card) { return card.yani_id && !card.poster; }).slice(0, 10);
        function next(offset) {
            if (offset >= missing.length) return Promise.resolve(cards);
            return Promise.all(missing.slice(offset, offset + 2).map(function (card) {
                return LampaYaniApi.detail(card.yani_id).then(function (payload) {
                    var value = payload && payload.response ? payload.response : payload;
                    var detailed = toCard(value || {});
                    if (detailed.poster) card.poster = card.img = detailed.poster;
                }).catch(function () {});
            })).then(function () { return next(offset + 2); });
        }
        return next(0);
    }

    function loadUserListRows() {
        return resolveUserListsUserId().then(function (userId) {
            return Promise.all([
                loadUserListsSnapshot(userId),
                LampaYaniApi.watchHistory(30, 0).catch(function () { return []; })
            ]);
        }).then(function (result) {
            var items = result[0];
            var rows = accountListDefinitions().map(function (definition) {
                var selected = filterAccountListItems(definition, items).slice().sort(function (a, b) {
                    return userListItemTime(b) - userListItemTime(a);
                });
                return {
                    title: definition.title,
                    definition: definition,
                    total: selected.length,
                    results: selected.slice(0, 10).map(toCard)
                };
            });
            var history = localHistoryCards(result[1]);
            return hydrateHistoryPosters(history.slice(0, 10), items).then(function (preview) {
                rows.push({title: t('watch_history'), history: true, total: history.length, results: preview});
                return rows;
            });
        });
    }

    function filterAccountListItems(definition, items) {
        return LampaYaniAccountLists.filterItems(definition, items);
    }

    function pushAccountList(definition, items, lazy) {
        Lampa.Activity.push({
            url: 'yani/account/list/' + definition.key,
            title: 'YummyAnime · ' + definition.title,
            component: 'yani_account_list',
            definition: definition,
            page: 1,
            lazy: Boolean(lazy),
            items: items || []
        });
    }

    function openAccountList(definition, items, userId) {
        var selected = filterAccountListItems(definition, items);
        var load = definition.id === 4 || !userId ? Promise.resolve(selected) : LampaYaniApi.userList(userId, definition.id).then(function (payload) {
            var result = normalizeUserList(payload);
            return result.length ? result : selected;
        }).catch(function () { return selected; });
        load.then(function (result) {
            pushAccountList(definition, result);
        });
    }

    function openUserListShortcut(definition) {
        if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('login_required'));
        pushAccountList(definition, [], true);
        return Promise.resolve();
    }

    function loadUserListShortcutItems(definition) {
        function cacheKey(userId) { return 'yani_user_list_' + userId + '_' + definition.id; }
        function readCache(userId) {
            try {
                var cached = Lampa.Storage.get(cacheKey(userId), '{}');
                if (typeof cached === 'string') cached = JSON.parse(cached || '{}');
                return cached && Array.isArray(cached.items) ? cached.items : null;
            } catch (error) { return null; }
        }
        function writeCache(userId, items) {
            try { Lampa.Storage.set(cacheKey(userId), JSON.stringify({updated_at: Date.now(), items: items || []})); }
            catch (error) { console.warn('[YummyAnime User Lists] Could not cache list', error); }
            return items || [];
        }

        return resolveUserListsUserId().then(function (userId) {
            return loadUserListsSnapshot(userId).then(function (items) {
                return writeCache(userId, filterAccountListItems(definition, items));
            }).catch(function (error) {
                var cached = readCache(userId);
                if (cached) return cached;
                throw error;
            });
        });
    }

    function normalizeUserList(payload) {
        return LampaYaniAccountLists.normalize(payload);
    }

    function AccountList(object) {
        return LampaYaniAccountLists.accountList(object, {
            toCard: toCard,
            cardRender: bindYummyCardRender,
            loadItems: loadUserListShortcutItems,
            onError: function () { Lampa.Noty.show(t('user_lists_error')); }
        });
    }

    function UserLists(object) {
        return LampaYaniAccountLists.userLists(object, {
            t: t,
            openList: openUserListShortcut,
            openHistory: openWatchHistory,
            // These previews belong to the YummyAnime account, so avoid a
            // second native-card lookup before opening their details.
            openCard: function (card) { openYummyDetail(card, false); },
            loadRows: loadUserListRows,
            goBack: goBack,
            onError: function () { Lampa.Noty.show(t('user_lists_error')); }
        });
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

    function Schedule(object) {
        return LampaYaniSchedule.create(object, {
            t: t,
            locale: locale,
            toCard: toCard,
            openYummyDetail: openYummyDetail,
            goBack: goBack
        });
    }

    function Detail(object) {
        var detailComponent = this;
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
        var destroyed = false;

        function appendDetailNavigation(container) {
            if (destroyed || !container || !Lampa.Controller || !Lampa.Controller.enabled || !Lampa.Controller.collectionAppend) return;
            var enabled = Lampa.Controller.enabled();
            if (!enabled || enabled.name !== 'content' || !enabled.controller || enabled.controller.yaniDetailOwner !== detailComponent) return;
            var targets = container.hasClass && container.hasClass('selector')
                ? container.add(container.find('.selector'))
                : container.find('.selector');
            if (targets.length) Lampa.Controller.collectionAppend(targets);
        }

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
            var detailType = mediaTypeLabels(data.yani_type);
            if (detailType) info.append($('<div class="yani-detail__type"></div>').text(detailType.full));
            var genres = detailGenres(data);
            if (genres.length) info.append(createDetailGenres(genres));
            if (data.release_date) info.append($('<div class="yani-detail__meta"></div>').text(data.release_date));
            var episodeSummary = createDetailEpisodeSummary(data);
            if (episodeSummary) info.append(episodeSummary);
            info.append(createDetailRatings(data.yani_ratings || [], data.vote_count));
            info.append(createDetailRatingAction(data));
            if (data.yani_schedule) info.append($('<div class="yani-detail__schedule"></div>').text(data.yani_schedule));
            info.append($('<div class="yani-detail__overview"></div>').text(data.overview || ''));
            var actions = $('<div class="yani-detail__actions"></div>');
            button = $('<div class="yani-detail__button yani-detail__button--watch selector"></div>').text(t('watch'));
            // Keep playback behind one action. When YummyTV is enabled the
            // destination is selected first; regular playback then opens the
            // dubbing/source and episode selectors as before.
            button.on('hover:enter click.yaniWatch', function () {
                beginPlaybackNavigation(button, scroll.render());
                openTitlePlaybackOptions(data);
            });
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
            loadDetailRecommendations(data, info, bindDetailScrollTargets, appendDetailNavigation);
            info.append(comments);
            html.append(poster, info);
            scroll.append(html);
            bindDetailScrollTargets(html);
            loadInlineComments(data, comments);
        }

        function createDetailEpisodeSummary(cardData) {
            var local = getPlayback(cardData.yani_id);
            var stats = LampaYaniUiUtils.detailEpisodeStats(cardData, [], local);
            if (!stats.seasons && !stats.total && !stats.aired && !stats.watched && !stats.minutes) return null;
            var block = $('<div class="yani-detail__episode-summary selector"></div>')
                .attr('aria-label', t('episode_information'));
            var loading = false;
            var loaded = false;

            function render(values) {
                var items = [];
                if (values.seasons) items.push({icon: 'seasons', text: values.seasons + ' ' + t('seasons_short')});
                if (values.total) items.push({icon: 'episodes', text: values.total + ' ' + t('episodes_short')});
                if (values.aired) items.push({icon: 'aired', text: t('episodes_aired') + ' ' + values.aired});
                if (values.watched) items.push({icon: 'watched', text: t('episodes_watched') + ' ' + values.watched});
                if (values.minutes) items.push({icon: 'duration', text: '≈ ' + values.minutes + ' ' + t('minutes_short')});
                block.empty();
                items.forEach(function (item) {
                    block.append($('<span class="yani-detail__episode-stat"></span>')
                        .append($('<span class="yani-detail__episode-stat-icon"></span>').html(detailEpisodeIcon(item.icon)))
                        .append($('<span></span>').text(item.text)));
                });
            }

            function enrich() {
                if (loading || loaded) return;
                loading = true;
                block.addClass('loading');
                LampaYaniApi.videos(cardData.yani_id).then(function (payload) {
                    var videos = payload && payload.response ? payload.response : payload;
                    loaded = true;
                    loading = false;
                    block.removeClass('loading');
                    render(LampaYaniUiUtils.detailEpisodeStats(cardData, Array.isArray(videos) ? videos : [], local));
                }).catch(function (error) {
                    loading = false;
                    loaded = true;
                    block.removeClass('loading');
                    console.warn('[YummyAnime] Episode summary enrichment failed', error);
                });
            }

            render(stats);
            bindDetailButtonFocus(block);
            block.one('hover:focus.yaniEpisodeSummary', enrich);
            // Normal one-cour titles are cheap to enrich in the background.
            // Very long shows wait until this compact row receives focus to
            // avoid loading thousands of video variants on weak devices.
            if (stats.total > 0 && stats.total <= 100) setTimeout(enrich, 350);
            return block;
        }

        function detailEpisodeIcon(name) {
            var icons = {
                seasons: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v4H5V4Zm-2 6h18v4H3v-4Zm2 6h14v4H5v-4Z"/></svg>',
                episodes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4V4Zm2 2v5h5V6H6Zm7 0v5h5V6h-5ZM6 13v5h5v-5H6Zm7 0v5h5v-5h-5Z"/></svg>',
                aired: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.2 16.6-4.1-4.1 1.4-1.4 2.7 2.7 8.3-8.3 1.4 1.4-9.7 9.7ZM4 20h16v2H4v-2Z"/></svg>',
                watched: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c-5.2 0-9.4 3.4-11 7 1.6 3.6 5.8 7 11 7s9.4-3.4 11-7c-1.6-3.6-5.8-7-11-7Zm0 11.2A4.2 4.2 0 1 1 12 7.8a4.2 4.2 0 0 1 0 8.4Zm0-2A2.2 2.2 0 1 0 12 9.8a2.2 2.2 0 0 0 0 4.4Z"/></svg>',
                duration: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm1-13h-2v6l5 3 1-1.7-4-2.3V7Z"/></svg>'
            };
            return icons[name] || '';
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

        function createDetailRatingAction(cardData) {
            var action = $('<div class="yani-detail__rating-action selector"></div>');
            action.append('<span class="yani-detail__rating-icon" aria-hidden="true">★</span>');
            action.append('<span class="yani-detail__rating-label"></span>');

            function update() {
                var value = Number(cardData.yani_user_rating || 0);
                action.toggleClass('active', value > 0);
                action.attr('aria-label', value > 0 ? t('my_rating') + ': ' + value + '/10' : t('set_rating'));
                action.find('.yani-detail__rating-label').text(value > 0 ? t('my_rating') + ': ' + value + '/10' : t('set_rating'));
            }

            action.on('hover:enter click.yaniDetailRating', function () {
                if (!LampaYaniAuth.token()) {
                    Lampa.Noty.show(t('login_required'));
                    return;
                }
                var items = [];
                for (var value = 10; value >= 1; value--) {
                    items.push({
                        title: (Number(cardData.yani_user_rating) === value ? '✓ ' : '') + value + '/10',
                        value: value
                    });
                }
                if (Number(cardData.yani_user_rating || 0) > 0) items.push({title: t('remove_rating'), remove: true});

                showYummySelect({
                    title: t('set_rating'),
                    items: items,
                    onSelect: function (selected) {
                        var request = selected.remove
                            ? LampaYaniApi.removeRate(cardData.yani_id)
                            : LampaYaniApi.rate(cardData.yani_id, selected.value);
                        request.then(function () {
                            cardData.yani_user_rating = selected.remove ? null : Number(selected.value);
                            update();
                            Lampa.Noty.show(selected.remove ? t('rating_removed') : t('saved'));
                        }).catch(function (error) {
                            console.error('[YummyAnime Rating]', error);
                            Lampa.Noty.show(t('save_error'));
                        });
                    }
                });
            });
            bindDetailButtonFocus(action);
            update();
            return action;
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
                    appendDetailNavigation(empty);
                    return;
                }
                comments.forEach(function (comment) {
                    var item = commentItem(comment);
                    var row = $('<div class="yani-detail__comment selector"></div>');
                    row.append($('<div class="yani-detail__comment-title"></div>').text(item.title));
                    if (item.subtitle) row.append($('<div class="yani-detail__comment-stats"></div>').text(item.subtitle));
                    row.on('hover:focus', function () { row.addClass('focus'); });
                    row.on('hover:enter click.yaniComment', function () {
                        var navigation = transientNavigationSnapshot();
                        if (Number(comment.children_count) > 0) commentReplies(comment, 0, [], null, navigation);
                        else commentsMenu(cardData.yani_id, 0, [], navigation);
                    });
                    list.append(row);
                    bindDetailScrollTargets(row);
                    appendDetailNavigation(row);
                });
            }).catch(function (error) {
                console.error('[YummyAnime Comments]', error);
                var errorRow = $('<div class="yani-detail__comments-error selector"></div>').text(t('comments_error'));
                errorRow.on('hover:focus', function () { errorRow.addClass('focus'); });
                list.empty().append(errorRow);
                bindDetailScrollTargets(errorRow);
                appendDetailNavigation(errorRow);
            });
        }

        this.start = function () {
            var controller = {
                link: detailComponent,
                yaniDetailOwner: detailComponent,
                toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(button, scroll.render()); },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right: function () { Navigator.move('right'); },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); },
                down: function () { movePageDown(scroll); },
                back: goBack
            };
            Lampa.Controller.add('content', controller);
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
        this.destroy = function () { destroyed = true; scroll.destroy(); html.remove(); };
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

    function allohaDirectResolverEnabled() {
        return Boolean(
            window.LampaYaniResolver && LampaYaniResolver.enabled && LampaYaniResolver.enabled() ||
            window.LampaYaniLampacResolver && LampaYaniLampacResolver.enabled && LampaYaniLampacResolver.enabled()
        );
    }

    function videoPlaybackPriority(video, group) {
        var url = videoSourceUrl(video);
        if (!url) return 0;
        if (isExternalPlayableUrl(url, video)) return 4;
        var player = String(group && (group.player || group.title) || '');
        var alloha = isAllohaUrl(url) || /alloha/i.test(player);
        if (alloha) return allohaDirectResolverEnabled() ? 3 : 0;
        if (window.LampaYaniStreamResolver && LampaYaniStreamResolver.canResolve && LampaYaniStreamResolver.canResolve(url)) return 3;
        return 1;
    }

    function groupPlaybackPriority(group) {
        return (group && group.videos || []).reduce(function (priority, video) {
            return Math.max(priority, videoPlaybackPriority(video, group));
        }, 0);
    }

    function openVideos(card, resume) {
        beginPlaybackNavigation();
        if (!card || !card.yani_id) {
            Lampa.Noty.show(t('no_videos'));
            restorePlaybackInteraction();
            return;
        }
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
            if (!videos.length) {
                Lampa.Noty.show(t('no_videos'));
                restorePlaybackInteraction();
                return;
            }

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
                if (!allohaIframeEnabled()) {
                    var playableA = groupPlaybackPriority(a.group);
                    var playableB = groupPlaybackPriority(b.group);
                    if (playableA !== playableB) return playableB - playableA;
                }
                var preferredA = playerMatchesPreference(a.group, preferredPlayer) ? 1 : 0;
                var preferredB = playerMatchesPreference(b.group, preferredPlayer) ? 1 : 0;
                return preferredB - preferredA || a.title.localeCompare(b.title);
            });
            if (voices.length && playerMatchesPreference(voices[0].group, preferredPlayer)) voices[0].title = '★ ' + voices[0].title;

            if (resume) {
                var playback = card.yani_resume || getPlayback(card.yani_id);
                var resumeVoice = playback && voices.filter(function (voice) {
                    if (playback.video_id && voice.group.videos.some(function (video) {
                        return String(video.video_id || video.id || '') === String(playback.video_id);
                    })) return true;
                    return playerMatchesPreference(voice.group, playback.player);
                })[0];
                var resumeVideo = resumeVoice && resumeVoice.group.videos.filter(function (video) {
                    if (playback.video_id && String(video.video_id || video.id || '') === String(playback.video_id)) return true;
                    return String(video.number || video.index || '') === String(playback.number || '');
                })[0];
                if (resumeVideo) {
                    resumeVideo.watched = resumeVideo.watched || {};
                    resumeVideo.watched.end_time = Math.max(Number(resumeVideo.watched.end_time || 0), Number(playback.time || 0));
                    if (!resumeVideo.duration && playback.duration) resumeVideo.duration = Number(playback.duration);
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
            showPlaybackSelect({
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
            restorePlaybackInteraction();
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

    var searchController;

    function getSearchController() {
        if (!searchController) {
            searchController = LampaYaniSearch.create({
                lampa: Lampa,
                api: LampaYaniApi,
                utils: LampaYaniUiUtils,
                toCard: toCard,
                sourceTitle: 'YummyAnime',
                searchTitle: t('search_title'),
                showInput: showYummyInput,
                openDetail: function (card) { openYummyDetail(card, false); },
                openResults: function (query) {
                    Lampa.Activity.push({
                        url: 'yani/search/' + encodeURIComponent(query),
                        title: query,
                        component: 'yani_catalog',
                        params: {q: query, limit: 30}
                    });
                },
                onError: function (error) {
                    console.warn('[YummyAnime] Global search failed', error);
                }
            });
        }
        return searchController;
    }

    function registerSearchSource() {
        getSearchController().register();
    }

    function openYummyForMovie(movie) {
        beginPlaybackNavigation();
        if (movie && movie.yani_card) return openVideos(movie.yani_card);
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        findYummyMatches(movie).then(function (matches) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            if (!matches.length) {
                Lampa.Noty.show(t('no_yummy_match'));
                restorePlaybackInteraction();
                return;
            }
            if (matches.length === 1) return openVideos(matches[0]);

            showPlaybackSelect({
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
            restorePlaybackInteraction();
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
        setTimeout(function () { finish(null); }, 12000);
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
            // Search aliases in small batches. Eight aliases multiplied by
            // movie and TV endpoints created a large simultaneous request
            // burst that could terminate low-memory Android WebViews.
            var titlesToSearch = (searchTitles || []).slice(0, 6);
            var collected = [];
            function next(offset) {
                if (offset >= titlesToSearch.length) return Promise.resolve(bestStandardCard(collected, card));
                return Promise.all(titlesToSearch.slice(offset, offset + 2).map(function (title) {
                    return searchTmdbTitle(tmdb, title).catch(function () { return []; });
                })).then(function (rows) {
                    rows.forEach(function (row) { collected = collected.concat(Array.isArray(row) ? row : []); });
                    var match = bestStandardCard(collected, card);
                    return match || next(offset + 2);
                });
            }
            return next(0);
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
            return searchTmdbCardEndpoints(tmdb, title).then(function (result) {
                // An empty but successful movie/TV response is authoritative.
                // Repeating it through aggregate search doubled every miss.
                return result.usable ? result.items : searchTmdbAggregate(tmdb, title);
            });
        }
        return searchTmdbAggregate(tmdb, title);
    }

    function searchTmdbCardEndpoints(tmdb, title) {
        return new Promise(function (resolve) {
            var pending = 2;
            var completed = false;
            var items = [];
            var responses = 0;
            var timeout = setTimeout(finish, 3000);

            function finish() {
                if (completed) return;
                completed = true;
                clearTimeout(timeout);
                resolve({items: items, usable: responses > 0});
            }

            function complete() {
                pending--;
                if (pending <= 0) finish();
            }

            ['tv', 'movie'].forEach(function (method) {
                try {
                    tmdb.get('search/' + method, {query: title, page: 1}, function (response) {
                        responses++;
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

    var nativeMatchCache = {};
    var nativeMatchPending = {};
    var nativeMatchOrder = [];

    function nativeMatchKey(movie) {
        return [movie && (movie.source || ''), movie && (movie.id || ''), movie && (movie.title || movie.name || ''), movie && (movie.release_date || movie.first_air_date || '')].join('|').toLowerCase();
    }

    function rememberNativeMatch(key, cards) {
        nativeMatchCache[key] = cards;
        nativeMatchOrder = nativeMatchOrder.filter(function (item) { return item !== key; });
        nativeMatchOrder.push(key);
        while (nativeMatchOrder.length > 50) delete nativeMatchCache[nativeMatchOrder.shift()];
    }

    function findYummyMatches(movie) {
        movie = movie || {};
        var title = movie.title || movie.name || movie.original_title || movie.original_name || '';
        var year = String(movie.release_date || movie.first_air_date || movie.year || '').slice(0, 4);
        if (!title) return Promise.resolve([]);
        var cacheKey = nativeMatchKey(movie);
        if (Object.prototype.hasOwnProperty.call(nativeMatchCache, cacheKey)) return Promise.resolve(nativeMatchCache[cacheKey]);
        if (nativeMatchPending[cacheKey]) return nativeMatchPending[cacheKey];

        var queries = LampaYaniUiUtils.titleValues(movie);
        if (queries.indexOf(title) < 0) queries.unshift(title);
        // Native cards usually expose a localized and an original title. Two
        // queries are enough for matching and avoid an eight-request burst on
        // low-memory TVs whenever Lampa emits the full-card event twice.
        nativeMatchPending[cacheKey] = Promise.all(queries.slice(0, 2).map(function (query) {
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
        }).then(function (cards) {
            delete nativeMatchPending[cacheKey];
            rememberNativeMatch(cacheKey, cards);
            return cards;
        }, function (error) {
            delete nativeMatchPending[cacheKey];
            throw error;
        });
        return nativeMatchPending[cacheKey];
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

        // Missing genres used to classify every film and series as anime,
        // causing background YummyAnime searches on every native detail page.
        // A Japanese origin is a safer fallback when genre metadata is absent.
        var language = String(movie && (movie.original_language || movie.language) || '').toLowerCase();
        var countries = movie && (movie.origin_country || movie.production_countries) || [];
        var japaneseOrigin = Array.isArray(countries) && countries.some(function (country) {
            return String(typeof country === 'string' ? country : country && (country.iso_3166_1 || country.code) || '').toUpperCase() === 'JP';
        });
        return language === 'ja' && japaneseOrigin;
    }

    function movePageDown(scroll) { LampaYaniNavigation.moveDown(scroll); }

    function homeSectionEnabled(key) {
        if (!Lampa.Storage || !Lampa.Storage.get) return true;
        var value = Lampa.Storage.get('yani_section_' + key, true);
        return value !== false && value !== 'false';
    }

    function chooseEpisode(card, group) {
        var videos = group.videos.slice().sort(function (a, b) {
            if (!allohaIframeEnabled()) {
                var playableA = videoPlaybackPriority(a, group);
                var playableB = videoPlaybackPriority(b, group);
                if (playableA !== playableB) return playableB - playableA;
            }
            var numberA = parseFloat(a.number);
            var numberB = parseFloat(b.number);
            if (isFinite(numberA) && isFinite(numberB)) return numberA - numberB;
            return Number(a.index || 0) - Number(b.index || 0);
        });
        var episodes = videos.map(function (video) {
            return {title: episodeOptionTitle(card, video), video: video};
        });
        if (episodes.length === 1) return launchVideo(card, group, videos, videos[0]);
        showPlaybackSelect({
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

    // Stream sources that already carry a direct Alloha stream and must not be
    // routed through the Alloha policy a second time.
    var ALLOHA_RESOLVED_SOURCES = ['lampac-alloha', 'yani-resolver'];

    function launchVideo(card, group, videos, selected, options) {
        options = options || {};
        var url = videoSourceUrl(selected);
        if (!url) {
            Lampa.Noty.show(t('no_videos'));
            restorePlaybackInteraction();
            return;
        }
        var allohaSource = isAllohaUrl(url) || /alloha/i.test(String(group && (group.player || group.title) || ''));
        var resolvedAlloha = ALLOHA_RESOLVED_SOURCES.indexOf(String(selected.yani_stream_source || '').toLowerCase()) >= 0;
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
                launchResolvedVideo(card, group, videos, selected, videoSourceUrl(selected) || url, options);
            }).catch(function (error) {
                setLoading(false);
                console.warn('[YummyAnime] Stream resolve failed', error);
                launchResolvedVideo(card, group, videos, selected, url, options);
            });
            return;
        }
        launchResolvedVideo(card, group, videos, selected, url, options);
    }

    function launchResolvedVideo(card, group, videos, selected, url, options) {
        options = options || {};
        var title = (card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + (selected.number || selected.index || '?') + ' · ' + group.title;
        playbackContext = {card: card, group: group, videos: videos, selected: selected};
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

        if (showDirectPlaybackOptions(card, current, playlist, options)) {
            return;
        }

        if (openExternalPlayer(current, playlist, card)) {
            return;
        }

        if (playInternalPlayer(current, playlist)) {
            return;
        }

        Lampa.Noty.show(url);
        restorePlaybackInteraction();
    }

    // Both services answer the same question - "give me a direct stream for this
    // Alloha page" - so they are tried in order and the first usable answer
    // wins. The self-hosted resolver goes first because it drives the real
    // player page and therefore matches the exact episode and dubbing, while
    // Lampac has to find the title again by its external ids.
    function allohaResolvers(card, group, selected, url) {
        var chain = [];
        if (window.LampaYaniResolver && LampaYaniResolver.enabled()) {
            chain.push(function () { return LampaYaniResolver.resolve(url); });
        }
        if (window.LampaYaniLampacResolver && LampaYaniLampacResolver.enabled()) {
            chain.push(function () { return LampaYaniLampacResolver.resolveAlloha(card, selected, group, url); });
        }
        return chain;
    }

    function resolveInOrder(chain, index) {
        index = index || 0;
        if (index >= chain.length) return Promise.reject(new Error('No Alloha resolver produced a stream'));
        return chain[index]().then(function (result) {
            if (result && result.url) return result;
            throw new Error('Empty resolver result');
        }).catch(function (error) {
            if (index + 1 >= chain.length) throw error;
            console.warn('[YummyAnime] Alloha resolver failed, trying the next one', error);
            return resolveInOrder(chain, index + 1);
        });
    }

    function launchAllohaPlayer(card, group, selected, url) {
        var chain = allohaResolvers(card, group, selected, url);
        if (!chain.length) return blockAllohaPlayback(card, group, selected, url);
        setLoading(true);
        resolveInOrder(chain).then(function (result) {
            setLoading(false);
            selected.yani_stream_url = result.url;
            selected.yani_stream_quality = result.quality || '';
            selected.yani_stream_qualities = result.qualities || null;
            selected.yani_stream_headers = result.headers || null;
            selected.yani_stream_source = result.source || 'lampac-alloha';
            launchResolvedVideo(card, group, group.videos || [selected], selected, result.url);
        }).catch(function (error) {
            setLoading(false);
            console.warn('[YummyAnime] Alloha resolve failed; playback blocked', error);
            blockAllohaPlayback(card, group, selected, url);
        });
        return true;
    }

    // Alloha streams only from inside its own signed player page: the page
    // refuses to run outside an iframe and its CDN requires rotating headers a
    // media player cannot supply. Without a direct stream the embedded page is
    // therefore the last remaining playback path, and it stays opt-in because
    // it has no Lampa timeline and cannot be handed to an external player.
    function allohaIframeEnabled() {
        if (!Lampa.Storage || !Lampa.Storage.get) return false;
        var value = Lampa.Storage.get('yani_alloha_iframe', false);
        return value === true || value === 'true';
    }

    function blockAllohaPlayback(card, group, selected, url) {
        if (url && allohaIframeEnabled() && openAllohaEmbed(card, group, selected, url)) return true;
        Lampa.Noty.show(t('alloha_direct_required'));
        restorePlaybackInteraction();
        return true;
    }

    function openAllohaEmbed(card, group, selected, url) {
        if (!Lampa.Activity || !Lampa.Activity.push) return false;
        try {
            rememberPlayback(card, group, selected);
            // Activity owns the back stack for the embedded page and will
            // restart the detail controller itself.
            clearPlaybackReturn();
            Lampa.Activity.push({
                url: 'yani/player',
                title: (card && card.title || 'YummyAnime') + ' · ' + t('episode') + ' ' + ((selected && (selected.number || selected.index)) || '?'),
                component: 'yani_player',
                iframe_url: url
            });
            return true;
        } catch (error) {
            console.warn('[YummyAnime] Alloha embedded player failed to open', error);
            return false;
        }
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
            if (Lampa.Player.callback) {
                Lampa.Player.callback(function () {
                    flushPlaybackProgress(true);
                    restorePlaybackInteraction();
                });
            }
            return true;
        } catch (error) {
            console.warn('[YummyAnime] Internal Lampa player failed to start', error);
            return false;
        }
    }

    function showDirectPlaybackOptions(card, current, playlist, options) {
        // An automatic episode change must never interrupt viewing with a
        // dialog: playback simply continues where it already was.
        var target = options && options.autoAdvance ? 'internal' : playbackTargetPreference();
        if (target === 'external') return openExternalPlayer(current, playlist, card);
        if (target === 'internal') {
            if (playInternalPlayer(current, playlist)) return true;
            Lampa.Noty.show(t('internal_player_unavailable'));
            restorePlaybackInteraction();
            return true;
        }
        if (!Lampa.Select || !Lampa.Select.show) return false;
        showPlaybackSelect({
            title: t('choose_playback'),
            items: [
                {title: t('watch_external_player'), subtitle: t('watch_external_player_description'), action: 'external'},
                {title: t('watch_internal_lampa'), subtitle: t('watch_internal_lampa_description'), action: 'internal'}
            ],
            onSelect: function (item) {
                if (item && item.action === 'internal') {
                    if (playInternalPlayer(current, playlist)) return;
                    Lampa.Noty.show(t('internal_player_unavailable'));
                    restorePlaybackInteraction();
                    return;
                }
                if (openExternalPlayer(current, playlist, card)) return;
                if (playInternalPlayer(current, playlist)) return;
                Lampa.Noty.show(current.url);
                restorePlaybackInteraction();
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
        var started = isDirectVideoUrl(current && current.url) && playInternalDirectVideo(current, playlist);
        if (started) startPlaybackWatcher(playbackContext);
        return started;
    }

    // Set right before playback is dispatched so the watcher knows which title
    // and episode started, whichever of the three entry points ran.
    var playbackContext = null;
    var playbackWatcher = null;
    var playbackWatcherGeneration = 0;
    var PLAYER_STARTUP_GRACE_MS = 120000;
    var NEXT_PREFETCH_LEAD = 90;
    var NEXT_ADVANCE_LEAD = 5;

    function skipPreference() {
        var value = Lampa.Storage && Lampa.Storage.get ? Lampa.Storage.get('yani_aniskip', 'off') : 'off';
        return value === 'op' || value === 'op_ed' ? value : 'off';
    }

    function autoNextEnabled() {
        if (!Lampa.Storage || !Lampa.Storage.get) return false;
        var value = Lampa.Storage.get('yani_auto_next', false);
        return value === true || value === 'true';
    }

    function autoProgressSyncEnabled() {
        if (!LampaYaniAuth.token() || !Lampa.Storage || !Lampa.Storage.get) return false;
        var value = Lampa.Storage.get('yani_auto_sync_progress', true);
        return value !== false && value !== 'false';
    }

    // Lampa's internal player is an HTML5 video element whichever skin is
    // active, and reading it directly avoids depending on player internals that
    // differ between Lampa builds. External players are out of reach by design.
    function playerVideoElement() {
        var selectors = ['.player-video video', '.player video', 'video'];
        for (var i = 0; i < selectors.length; i++) {
            var element = document.querySelector(selectors[i]);
            if (element && isFinite(element.duration) && element.duration > 0) return element;
        }
        return null;
    }

    function stopPlaybackWatcher() {
        if (!playbackWatcher) return;
        clearInterval(playbackWatcher.timer);
        playbackWatcher = null;
    }

    function startPlaybackWatcher(context) {
        stopPlaybackWatcher();
        var generation = ++playbackWatcherGeneration;
        if (!context) return;
        var skipMode = skipPreference();
        var autoNext = autoNextEnabled();
        var progressSync = autoProgressSyncEnabled();

        var state = {
            context: context,
            timer: 0,
            segments: [],
            skipped: {},
            autoNext: autoNext,
            progressSync: progressSync,
            lastLocalSync: 0,
            lastLocalPosition: Number(context.selected && context.selected.watched && context.selected.watched.end_time || 0),
            lastObservedPosition: Number(context.selected && context.selected.watched && context.selected.watched.end_time || 0),
            lastObservedDuration: Number(context.selected && context.selected.duration || 0),
            lastServerSync: Date.now(),
            lastServerPosition: Number(context.selected && context.selected.watched && context.selected.watched.end_time || 0),
            prefetched: false,
            advanced: false,
            lastSeenAt: Date.now()
        };
        playbackWatcher = state;
        state.timer = setInterval(function () { watchPlayback(generation, context, state); }, 1000);
        if (skipMode !== 'off') loadSkipSegments(generation, context, state, skipMode);
    }

    function flushPlaybackProgress(remote) {
        var state = playbackWatcher;
        var context = state && state.context || playbackContext;
        if (!context || !context.selected) {
            stopPlaybackWatcher();
            return;
        }
        var element = playerVideoElement();
        var position = element ? Number(element.currentTime || 0) : Number(state && state.lastObservedPosition || context.selected.watched && context.selected.watched.end_time || 0);
        var duration = element ? Number(element.duration || 0) : Number(state && state.lastObservedDuration || context.selected.duration || 0);
        if (position > 0) updatePlaybackProgress(context, position, duration, Boolean(remote));
        stopPlaybackWatcher();
    }

    function loadSkipSegments(generation, context, state, mode) {
        if (!window.LampaYaniAniSkip) return;
        var ids = (context.card && context.card.yani_remote_ids) || {};
        var malId = Number(ids.myanimelist_id || ids.mal_id || 0);
        var selected = context.selected || {};
        var episode = Number(selected.number || selected.index || 0);
        if (!malId || !episode) return;
        LampaYaniAniSkip.times(malId, episode, selected.duration).then(function (intervals) {
            if (generation !== playbackWatcherGeneration) return;
            var segments = [];
            if (intervals.op) segments.push({type: 'op', interval: intervals.op, label: t('aniskip_opening_skipped')});
            if (mode === 'op_ed' && intervals.ed) segments.push({type: 'ed', interval: intervals.ed, label: t('aniskip_ending_skipped')});
            state.segments = segments;
        });
    }

    function watchPlayback(generation, context, state) {
        if (generation !== playbackWatcherGeneration) return stopPlaybackWatcher();
        var video = playerVideoElement();
        if (!video) {
            // The player may still be starting up, so give it a grace period
            // before the watcher gives up on this episode.
            if (Date.now() - state.lastSeenAt > PLAYER_STARTUP_GRACE_MS) stopPlaybackWatcher();
            return;
        }
        state.lastSeenAt = Date.now();
        var position = Number(video.currentTime) || 0;
        var duration = Number(video.duration) || 0;
        state.lastObservedPosition = position;
        state.lastObservedDuration = duration;

        if (position > 0) {
            var now = Date.now();
            var finalState = video.paused || video.ended || duration > 0 && position >= duration - 2;
            if (now - state.lastLocalSync >= 10000 || finalState && Math.abs(position - state.lastLocalPosition) >= 2) {
                state.lastLocalSync = now;
                state.lastLocalPosition = position;
                updatePlaybackProgress(context, position, duration, false);
            }
            if (state.progressSync && (now - state.lastServerSync >= 60000 || finalState && Math.abs(position - state.lastServerPosition) >= 5)) {
                state.lastServerSync = now;
                state.lastServerPosition = position;
                updatePlaybackProgress(context, position, duration, true);
            }
        }

        state.segments.forEach(function (segment) {
            if (state.skipped[segment.type]) return;
            if (position < segment.interval.start || position >= segment.interval.end - 1) return;
            state.skipped[segment.type] = true;
            try {
                video.currentTime = segment.interval.end;
            } catch (error) {
                console.warn('[YummyAnime] Could not skip a segment', error);
                return;
            }
            Lampa.Noty.show(segment.label);
        });

        if (!state.autoNext || duration < 60 || position <= 0) return;
        var remaining = duration - position;
        if (!state.prefetched && remaining <= NEXT_PREFETCH_LEAD) {
            state.prefetched = true;
            prefetchNextEpisode(context);
        }
        if (!state.advanced && remaining <= NEXT_ADVANCE_LEAD && !video.paused) {
            state.advanced = true;
            stopPlaybackWatcher();
            advanceToNextEpisode(context);
        }
    }

    function nextEpisodeVideo(context) {
        var videos = (context && context.videos) || [];
        var index = videos.indexOf(context.selected);
        if (index < 0 || index + 1 >= videos.length) return null;
        return videos[index + 1];
    }

    // Resolving a stream costs a round trip through the source's player page,
    // which is long enough to be noticeable between episodes. Doing it while
    // the current episode still plays hides that entirely, and the resolver
    // caches the result for the launch that follows.
    function prefetchNextEpisode(context) {
        var next = nextEpisodeVideo(context);
        if (!next || next.yani_stream_url) return;
        var url = videoSourceUrl(next);
        if (!url || isExternalPlayableUrl(url, next)) return;
        if (!window.LampaYaniStreamResolver || !LampaYaniStreamResolver.canResolve(url)) return;
        LampaYaniStreamResolver.resolve(url, next).then(function (result) {
            if (!result || !result.url) return;
            next.yani_stream_url = result.url;
            next.yani_stream_quality = result.quality || '';
            next.yani_stream_qualities = result.qualities || null;
            next.yani_stream_source = result.source || '';
            next.yani_stream_headers = result.headers || null;
        }).catch(function (error) {
            // The episode is launched normally later; a failed prefetch only
            // costs the time it would have saved.
            console.warn('[YummyAnime] Next episode prefetch failed', error);
        });
    }

    function advanceToNextEpisode(context) {
        var next = nextEpisodeVideo(context);
        if (!next) return;
        Lampa.Noty.show(t('auto_next_starting') + ' ' + (next.number || next.index || ''));
        launchVideo(context.card, context.group, context.videos, next, {autoAdvance: true});
    }

    function externalPlayablePlaylist(playlist) {
        return (playlist || []).filter(function (item) { return isExternalPlayableUrl(item.url, item.source); });
    }

    function syncServerProgress(video) {
        if (!autoProgressSyncEnabled() || !video || !video.video_id) return;
        LampaYaniApi.syncVideoProgress(video.video_id, video.watched && video.watched.end_time, video.duration).catch(function (error) {
            console.warn('[YummyAnime] Progress sync failed', error);
        });
    }

    function updatePlaybackProgress(context, position, duration, remote) {
        if (!context || !context.selected || !context.card) return;
        var video = context.selected;
        video.watched = video.watched || {};
        video.watched.end_time = Math.max(0, Math.floor(Number(position) || 0));
        if (duration > 0) video.duration = Math.floor(duration);
        var saved = rememberPlayback(context.card, context.group, video);
        if (saved) {
            context.card.yani_resume = {
                number: saved.number,
                video_id: saved.video_id,
                time: saved.time,
                duration: saved.duration,
                player: saved.player,
                voice: saved.voice,
                updated_at: saved.updated_at
            };
            refreshVisiblePlaybackProgress(context.card);
        }
        if (remote) syncServerProgress(video);
    }

    function refreshVisiblePlaybackProgress(card) {
        if (!card || !card.yani_id) return;
        $('.yani-history-card').each(function () {
            var rendered = $(this);
            if (String(rendered.attr('data-yani-history-id') || '') !== String(card.yani_id)) return;
            renderHistoryProgress(rendered, card.yani_resume || getPlayback(card.yani_id) || {});
        });
    }

    function syncPlaybackHistoryManually() {
        if (!LampaYaniAuth.token()) return Lampa.Noty.show(t('login_required'));
        var history = playbackHistory();
        var videos = Object.keys(history).map(function (id) {
            var item = history[id] || {};
            if (!item.video_id) return null;
            return {video_id: Number(item.video_id), time: Number(item.time || 0), date: Math.floor(Number(item.updated_at || Date.now()) / 1000)};
        }).filter(function (item) { return item && item.video_id; });
        if (!videos.length) return Lampa.Noty.show(t('history_empty'));
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        LampaYaniApi.syncVideoWatches(videos).then(function () {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            Lampa.Noty.show(t('sync_history_ok'));
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime] History sync failed', error);
            Lampa.Noty.show(t('sync_history_error'));
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
        if (!Lampa.Storage || !card || !card.yani_id) return null;
        var history = playbackHistory();
        var saved = history[String(card.yani_id)] = {
            number: String(video.number || video.index || ''),
            video_id: video.video_id || '',
            time: Number(video.watched && video.watched.end_time || 0),
            duration: Math.max(0, Number(video.duration || 0)),
            player: playerKey(group),
            voice: String(LampaYaniUiUtils.videoData(video).dubbing || ''),
            episode_url: videoSourceUrl(video),
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
        return saved;
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

    function openGenres() {
        var navigation = transientNavigationSnapshot();
        LampaYaniApi.genres().then(function (payload) {
            var genres = LampaYaniApi.normalizeGenres(payload);
            if (!genres.length) {
                Lampa.Noty.show(t('genres_empty'));
                return;
            }
            showYummySelect({
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
            }, navigation);
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
        getSearchController().open();
    }

    function openAccount() {
        Lampa.Activity.push({url: 'yani/account', title: 'YummyAnime ' + t('account'), component: 'yani_account'});
    }

    function openCollections() {
        Lampa.Activity.push({url: 'yani/collections', title: 'YummyAnime ' + t('collections'), component: 'yani_collections'});
    }

    function openCollection(collection) {
        if (!collection || collection.id === undefined || collection.id === null) return;
        Lampa.Activity.push({
            url: 'yani/collection/' + encodeURIComponent(collection.id),
            title: collection.title || t('collection'),
            component: 'yani_collection',
            collectionId: collection.id
        });
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
        var poster = typeof item.poster === 'string' ? item.poster : typeof item.cover === 'string' ? item.cover : typeof item.image === 'string' ? item.image : item.poster_url ||
            image.medium || image.large || image.url || image.original || cover.medium || cover.large || cover.url || cover.original || '';
        if (!poster && item.poster) poster = item.poster.medium || item.poster.big || item.poster.large || item.poster.mega || item.poster.huge || item.poster.fullsize || item.poster.small || item.poster.url || item.poster.original || '';
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
            yani_episodes: item.episodes || null,
            yani_seasons: Array.isArray(item.seasons) ? item.seasons : null,
            yani_seasons_count: Number(item.seasons_count || item.season_count || 0) || 0,
            yani_episode_duration: Number(item.episode_duration || item.average_episode_duration || item.duration || 0) || 0,
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
            // Viewing-order entries already contain YummyAnime identifiers.
            // Open them directly without a misleading native-Lampa fallback.
            row.on('hover:enter click.yaniOrder', function () { openYummyDetail(related, false); });
            list.append(row);
        });
        section.append(list);
        return section;
    }

    function loadDetailRecommendations(data, container, bindFocus, appendNavigation) {
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
                row.on('hover:focus', function () {
                    row.addClass('focus');
                    keepHorizontalFocusVisible(list, row);
                });
                row.on('hover:blur', function () { row.removeClass('focus'); });
                // Recommendations already originate from YummyAnime. Do not
                // show a misleading Lampa-card fallback message before their
                // direct YummyAnime detail page opens.
                row.on('hover:enter click.yaniRecommendation', function () { openYummyDetail(card, false); });
                list.append(row);
                if (bindFocus) bindFocus(row);
                if (appendNavigation) appendNavigation(row);
            });
        }).catch(function () { section.remove(); });
    }

    function keepHorizontalFocusVisible(container, element) {
        var viewport = container && container[0];
        var target = element && element[0];
        if (!viewport || !target) return;
        var padding = Math.max(8, Math.round(viewport.clientWidth * 0.035));
        var visibleLeft = viewport.scrollLeft;
        var visibleRight = visibleLeft + viewport.clientWidth;
        var targetLeft = target.offsetLeft;
        var targetRight = targetLeft + target.offsetWidth;
        if (targetLeft < visibleLeft + padding) {
            viewport.scrollLeft = Math.max(0, targetLeft - padding);
        } else if (targetRight > visibleRight - padding) {
            viewport.scrollLeft = targetRight - viewport.clientWidth + padding;
        }
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
                    showYummySelect({title: collection.title || t('collection'), items: animes.map(function (item) {
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
            showYummySelect({
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
        cancelExternalRestore();
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
        cancelExternalRestore();
        return false;
    }

    function beginPlaybackNavigation(element, collection) {
        // Temporary Select windows must not replace the detail controller and
        // focus target that need to be restored after playback.
        if (playbackReturnState.active) return;
        var controller = currentControllerName() || 'content';
        if (controller === 'select') controller = 'content';
        var target = element && element.jquery ? element[0] : element;
        if (!target) target = document.querySelector('.selector.focus') || document.querySelector('.selector');
        var root = collection && collection.jquery ? collection : collection ? $(collection) : null;
        if ((!root || !root.length) && target) root = $(target).closest('.scroll, .yani-detail, .yani-home');
        playbackReturnState.active = true;
        playbackReturnState.controller = controller;
        playbackReturnState.element = target || null;
        playbackReturnState.collection = root && root.length ? root : null;
    }

    function playbackReturnSnapshot() {
        return {
            controller: playbackReturnState.controller || 'content',
            element: playbackReturnState.element,
            collection: playbackReturnState.collection
        };
    }

    function clearPlaybackReturn() {
        playbackReturnState.active = false;
        playbackReturnState.controller = 'content';
        playbackReturnState.element = null;
        playbackReturnState.collection = null;
    }

    function restorePlaybackInteraction(snapshot) {
        snapshot = snapshot && snapshot.controller ? snapshot : playbackReturnSnapshot();
        setTimeout(function () {
            try {
                var controller = snapshot.controller && snapshot.controller !== 'select' ? snapshot.controller : 'content';
                if (Lampa.Controller && Lampa.Controller.toggle) Lampa.Controller.toggle(controller);
                var element = snapshot.element;
                if (!element || !document.documentElement.contains(element)) {
                    element = document.querySelector('.yani-detail .selector.focus') ||
                        document.querySelector('.yani-detail .selector') ||
                        document.querySelector('.selector.focus') || document.querySelector('.selector');
                }
                var collection = snapshot.collection;
                if (!collection || !collection.length || !document.documentElement.contains(collection[0])) {
                    collection = element ? $(element).closest('.scroll, .yani-detail, .yani-home') : $('body');
                }
                if (collection && collection.length && Lampa.Controller && Lampa.Controller.collectionSet) {
                    Lampa.Controller.collectionSet(collection);
                }
                if (element && Lampa.Controller && Lampa.Controller.collectionFocus) {
                    Lampa.Controller.collectionFocus(element, collection);
                }
            } catch (error) {
                console.warn('[YummyAnime] Could not restore playback navigation', error);
            } finally {
                clearPlaybackReturn();
            }
        }, 0);
    }

    function showPlaybackSelect(params) {
        if (!Lampa.Select || !Lampa.Select.show) {
            restorePlaybackInteraction();
            return false;
        }
        params = Object.assign({}, params || {});
        var originalBack = params.onBack;
        params.onBack = function () {
            if (originalBack) originalBack();
            restorePlaybackInteraction();
        };
        showYummySelect(params);
        return true;
    }

    function prepareExternalRestore() {
        installExternalRestoreHooks();
        if (!playbackReturnState.active) beginPlaybackNavigation();
        var origin = playbackReturnSnapshot();
        externalRestoreState.pending = true;
        externalRestoreState.openedAt = Date.now();
        externalRestoreState.departed = false;
        externalRestoreState.controller = origin.controller;
        externalRestoreState.element = origin.element;
        externalRestoreState.collection = origin.collection;
        // Some Android launchers show their chooser without emitting blur or
        // Cordova pause. A delayed check prevents the underlying detail page
        // from remaining attached to a stale Select controller in that case.
        setTimeout(restoreExternalFocus, 1500);
    }

    function cancelExternalRestore() {
        externalRestoreState.pending = false;
        externalRestoreState.departed = false;
        externalRestoreState.openedAt = 0;
        externalRestoreState.element = null;
        externalRestoreState.collection = null;
    }

    function installExternalRestoreHooks() {
        if (externalRestoreState.installed) return;
        externalRestoreState.installed = true;
        window.addEventListener('blur', markExternalDeparture, false);
        window.addEventListener('focus', restoreExternalFocus, false);
        window.addEventListener('pageshow', restoreExternalFocus, false);
        document.addEventListener('pause', markExternalDeparture, false);
        document.addEventListener('resume', function () {
            externalRestoreState.departed = true;
            restoreExternalFocus();
        }, false);
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) markExternalDeparture();
            else restoreExternalFocus();
        }, false);
    }

    function markExternalDeparture() {
        if (externalRestoreState.pending) externalRestoreState.departed = true;
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
        var elapsed = Date.now() - externalRestoreState.openedAt;
        // Android may emit focus while the chooser is only starting. Ignore
        // that event until the app departed or enough time has passed.
        if (!externalRestoreState.departed && elapsed < 1200) {
            setTimeout(restoreExternalFocus, 1200 - elapsed);
            return;
        }
        var delay = Math.max(0, 250 - elapsed);
        setTimeout(function () {
            if (!externalRestoreState.pending) return;
            externalRestoreState.pending = false;
            restorePlaybackInteraction({
                controller: externalRestoreState.controller || 'content',
                element: externalRestoreState.element,
                collection: externalRestoreState.collection
            });
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
            restorePlaybackInteraction();
            return false;
        }
        showPlaybackSelect({
            title: t('choose_playback'),
            items: items,
            onSelect: function (item) {
                if (item && item.action === 'player') {
                    if (options.onPlayer && options.onPlayer()) return;
                    if (options.url && openExternalUri(options.url)) return;
                    Lampa.Noty.show(t('external_stream_unavailable'));
                    restorePlaybackInteraction();
                    return;
                }
                if (item && item.action === 'yummytv' && !openYummyTv(card)) restorePlaybackInteraction();
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

        showPlaybackSelect({
            title: t('choose_playback'),
            items: [
                {title: t('watch_in_player'), subtitle: t('watch_in_player_description'), action: 'player'},
                {title: t('watch_in_yummytv'), subtitle: t('watch_in_yummytv_description'), action: 'yummytv'}
            ],
            onSelect: function (item) {
                if (item && item.action === 'yummytv') {
                    if (!openYummyTv(card)) restorePlaybackInteraction();
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
            param: {
                name: 'yani_aniskip',
                type: 'select',
                values: {off: t('aniskip_off'), op: t('aniskip_openings'), op_ed: t('aniskip_openings_endings')},
                default: 'off'
            },
            field: {name: t('aniskip'), description: t('aniskip_description')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_auto_next', type: 'trigger', default: false},
            field: {name: t('auto_next'), description: t('auto_next_description')}
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

        var resolverUrl = window.LampaYaniResolver ? LampaYaniResolver.baseUrl() : '';
        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_resolver_server', type: 'button'},
            field: {
                name: t('resolver_server'),
                description: t('resolver_server_description') + ': ' + (resolverUrl || t('not_configured'))
            },
            onChange: editResolverServer
        });

        if (resolverUrl) {
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_resolver_check', type: 'button'},
                field: {name: t('resolver_check'), description: t('resolver_check_description')},
                onChange: function () {
                    LampaYaniResolver.health().then(function (payload) {
                        Lampa.Noty.show(t('resolver_ok') + (payload && payload.version ? ' · v' + payload.version : ''));
                    }).catch(function (error) {
                        console.error('[YummyAnime]', error);
                        Lampa.Noty.show(t('resolver_error'));
                    });
                }
            });
        }

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
            param: {name: 'yani_alloha_iframe', type: 'trigger', default: false},
            field: {name: t('alloha_iframe'), description: t('alloha_iframe_description')}
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
                param: {name: 'yani_auto_sync_progress', type: 'trigger', default: true},
                field: {name: t('auto_sync_progress'), description: t('auto_sync_progress_description')}
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
            param: {name: 'yani_api_settings_title', type: 'title'},
            field: {name: t('api_settings')}
        });

        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_public_application_token', type: 'button'},
            field: {
                name: t('public_application_token'),
                description: t('public_application_token_description') + ': ' +
                    (LampaYaniConfig.customApplicationToken() ? t('public_application_token_custom') : t('public_application_token_default'))
            },
            onChange: editPublicApplicationToken
        });

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
            ['new_translations', 'new_translations'],
            ['continue_watching', 'continue_watching'],
            ['user_lists', 'user_lists'],
            ['new_releases', 'new_releases'],
            ['top_rated', 'top_rated'],
            ['for_you', 'for_you'],
            ['updates', 'updates'],
            ['collections', 'collections'],
            ['notifications', 'notifications'],
            ['account', 'account'],
            ['status', 'status']
        ].forEach(function (section) {
            Lampa.SettingsApi.addParam({
                component: 'yani',
                param: {name: 'yani_section_' + section[0], type: 'trigger', default: true},
                field: {name: t(section[1]), description: t('section_visibility_description')}
            });
        });

        // A title row is deliberately non-interactive: the repository URL is
        // reference text, not another settings action or external link.
        Lampa.SettingsApi.addParam({
            component: 'yani',
            param: {name: 'yani_license_notice', type: 'title'},
            field: {name: t('license_notice')}
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

    function editResolverServer() {
        if (!window.LampaYaniResolver) return Lampa.Noty.show(t('resolver_unavailable'));
        showYummyInput({
            title: t('resolver_server_prompt'),
            value: LampaYaniResolver.baseUrl(),
            nosave: true
        }, function (value) {
            value = String(value || '').trim();
            var saved = LampaYaniResolver.setBaseUrl(value);
            if (value && !saved) return Lampa.Noty.show(t('resolver_server_invalid'));
            Lampa.Noty.show(saved ? t('resolver_server_saved') : t('resolver_server_disabled'));
        });
    }

    function editPublicApplicationToken() {
        showYummyInput({
            title: t('public_application_token_prompt'),
            value: LampaYaniConfig.customApplicationToken(),
            nosave: true
        }, function (value) {
            value = String(value || '').trim();
            if (!LampaYaniConfig.setApplicationToken(value)) {
                Lampa.Noty.show(t('public_application_token_invalid'));
                return;
            }
            Lampa.Noty.show(value ? t('public_application_token_saved') : t('public_application_token_restored'));
        });
    }

    function showYummyInput(params, callback) {
        if (!Lampa.Input) {
            Lampa.Noty.show(t('input_unavailable'));
            return;
        }
        var navigation = transientNavigationSnapshot();
        var inputParams = Object.assign({}, params || {});
        var originalBack = inputParams.onBack;
        var complete = function (value) {
            var result = callback(value);
            setTimeout(function () {
                var controller = currentControllerName();
                if (!controller || controller === 'input' || controller === 'settings_component') {
                    restoreTransientInteraction(navigation);
                }
            }, 0);
            return result;
        };
        inputParams.onBack = function () {
            if (originalBack) originalBack();
            restoreTransientInteraction(navigation);
        };
        if (Lampa.Input.show) {
            inputParams.onEnter = complete;
            return Lampa.Input.show(inputParams);
        }
        if (Lampa.Input.edit) return Lampa.Input.edit(inputParams, complete);
        Lampa.Noty.show(t('input_unavailable'));
    }

    function commentsMenu(id, skip, existing, navigation) {
        skip = Number(skip || 0);
        existing = existing || [];
        navigation = navigation || transientNavigationSnapshot();
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        LampaYaniApi.comments(id, skip).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var page = LampaYaniApi.normalizeComments(payload);
            var comments = existing.concat(page);
            if (!comments.length) return Lampa.Noty.show(t('comments_empty'));
            renderCommentList(t('comments_title'), comments, page.length >= 20 ? function () {
                commentsMenu(id, skip + page.length, comments, navigation);
            } : null, null, navigation);
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Comments]', error);
            Lampa.Noty.show(t('comments_error'));
        });
    }

    function commentReplies(comment, skip, existing, onBack, navigation) {
        skip = Number(skip || 0);
        existing = existing || [];
        navigation = navigation || transientNavigationSnapshot();
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start();
        LampaYaniApi.commentChildren(comment.id, skip).then(function (payload) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            var page = LampaYaniApi.normalizeComments(payload);
            var comments = existing.concat(page);
            if (!comments.length) return Lampa.Noty.show(t('comments_empty'));
            renderCommentList(t('replies_title'), comments, page.length >= 20 ? function () {
                commentReplies(comment, skip + page.length, comments, onBack, navigation);
            } : null, onBack, navigation);
        }).catch(function (error) {
            if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
            console.error('[YummyAnime Comment Replies]', error);
            Lampa.Noty.show(t('comments_error'));
        });
    }

    function renderCommentList(title, comments, onMore, onBack, navigation) {
        navigation = navigation || transientNavigationSnapshot();
        var items = comments.map(commentItem);
        if (onMore) items.push({title: t('load_more'), load_more: true});
        var params = {
            title: title,
            items: items,
            onSelect: function (item) {
                if (item.load_more) return onMore();
                if (item.comment && Number(item.comment.children_count) > 0) {
                    return commentReplies(item.comment, 0, [], function () {
                        // Lampa closes the current Select after onBack. Reopen
                        // the parent on the next turn so that it is not removed
                        // together with the child dialog.
                        setTimeout(function () {
                            renderCommentList(title, comments, onMore, onBack, navigation);
                        }, 0);
                    }, navigation);
                }
            }
        };
        if (onBack) params.onBack = onBack;
        showYummySelect(params, navigation);
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
            if (!movie || !event.object || !event.object.activity) return;
            if (!lampaCardIntegrationEnabled('rating') && !lampaCardIntegrationEnabled('button')) return;
            // A native Lampa card may be a film or a live-action series with
            // an accidentally similar title. Do not decorate those cards
            // with a YummyAnime action.
            if (!movie.yani_card && !isNativeAnimeCard(movie)) return;

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
            var button = $('<div class="full-start__button selector view--yummyanime" title="YummyAnime" aria-label="YummyAnime"><span class="view--yummyanime__icon" aria-hidden="true">' + yummyRatingLogo() + '</span></div>');
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
