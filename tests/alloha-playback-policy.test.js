const assert = require('assert');
const fs = require('fs');

const source = fs.readFileSync('src/ui.js', 'utf8');
const launchStart = source.indexOf('function launchVideo');
const launchEnd = source.indexOf('function launchResolvedVideo', launchStart);
const launchPolicy = source.slice(launchStart, launchEnd);
const allohaStart = source.indexOf('function launchAllohaPlayer');
const allohaEnd = source.indexOf('function setLoading', allohaStart);
const allohaPolicy = source.slice(allohaStart, allohaEnd);

assert.ok(launchStart >= 0 && launchEnd > launchStart, 'video launch policy must exist');
assert.ok(launchPolicy.includes("selected.yani_stream_source || ''"), 'Alloha must identify a resolved Lampac stream');
assert.ok(launchPolicy.includes('allohaSource && !resolvedAlloha'), 'unresolved Alloha must be routed through the strict policy');
assert.ok(allohaPolicy.includes('LampaYaniLampacResolver.enabled()'), 'Alloha direct playback must require configured Lampac');
assert.ok(allohaPolicy.includes("t('alloha_direct_required')"), 'blocked Alloha must display a warning');

// The embedded Alloha page is the only playback path left when no direct
// stream can be resolved, but it must never be reachable by default: it has no
// Lampa timeline and cannot be handed to a media player.
assert.ok(allohaPolicy.includes('allohaIframeEnabled() && openAllohaEmbed'), 'the Alloha embed must stay behind the opt-in setting');
assert.ok(
    source.includes("Lampa.Storage.get('yani_alloha_iframe', false)"),
    'the Alloha embed setting must default to disabled'
);
assert.ok(
    source.includes("param: {name: 'yani_alloha_iframe', type: 'trigger', default: false}"),
    'the Alloha embed setting must be exposed as a disabled-by-default trigger'
);
assert.ok(!source.includes('function showYummyIframe'), 'generic iframe playback must stay disabled');

console.log('Alloha playback policy tests passed');
