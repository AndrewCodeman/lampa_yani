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
assert.ok(!source.includes('function openAllohaEmbed'), 'Alloha iframe fallback must stay disabled');
assert.ok(!source.includes('function showYummyIframe'), 'generic iframe playback must stay disabled');

console.log('Alloha playback policy tests passed');
