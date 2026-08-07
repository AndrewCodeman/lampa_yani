(function (window) {
    'use strict';

    window.LampaYaniConfig = {
        version: '0.17.0',
        apiBase: 'https://api.yani.tv',
        episodesApiBase: 'https://yummytv.kemonos.win/api',
        statusUrl: 'https://andrewcodeman.github.io/lampa_yani/status/status.json',
        applicationHeader: 'p6_gpujl6d3pho8n', // Public Yani application token
        cacheTtl: 300000,
        cacheEntries: 80,
        requestTimeout: 15000,
        requestRetries: 2
    };
}(window));
