const assert = require('assert');
const fs = require('fs');

const source = fs.readFileSync('src/ui.js', 'utf8');
const launchStart = source.indexOf('function launchVideo');
const launchEnd = source.indexOf('function launchResolvedVideo', launchStart);
const launchPolicy = source.slice(launchStart, launchEnd);
const allohaStart = source.indexOf('function allohaResolvers');
const allohaEnd = source.indexOf('function setLoading', allohaStart);
const allohaPolicy = source.slice(allohaStart, allohaEnd);

assert.ok(launchStart >= 0 && launchEnd > launchStart, 'video launch policy must exist');
assert.ok(launchPolicy.includes("selected.yani_stream_source || ''"), 'Alloha must identify a resolved Lampac stream');
assert.ok(launchPolicy.includes('allohaSource && !resolvedAlloha'), 'unresolved Alloha must be routed through the strict policy');
assert.ok(allohaStart >= 0 && allohaEnd > allohaStart, 'Alloha resolver policy must exist');
assert.ok(allohaPolicy.includes('LampaYaniResolver.enabled()'), 'the self-hosted resolver must be opt-in');
assert.ok(allohaPolicy.includes('LampaYaniLampacResolver.enabled()'), 'Alloha direct playback must require a configured service');
assert.ok(allohaPolicy.includes('if (!chain.length) return blockAllohaPlayback'), 'Alloha without any configured resolver must hit the strict policy');
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

const voiceStart = source.indexOf('function allohaDirectResolverEnabled');
const voiceEnd = source.indexOf('function voiceOptionSubtitle', voiceStart);
const voicePolicy = source.slice(voiceStart, voiceEnd);
assert.ok(voicePolicy.includes('function videoPlaybackPriority'), 'playback choices must have a capability priority');
assert.ok(voicePolicy.includes('LampaYaniStreamResolver.canResolve(url)'), 'Kodik and other resolvable sources must receive playable priority');
assert.ok(voicePolicy.includes('allohaDirectResolverEnabled() ? 3 : 0'), 'unresolved Alloha must sort below playable sources');
assert.ok(voicePolicy.includes('if (!allohaIframeEnabled())'), 'capability-first sorting must apply when the Alloha embed is disabled');
assert.ok(voicePolicy.includes('groupPlaybackPriority(a.group)'), 'voice choices must be sorted by playable source capability');

const episodeStart = source.indexOf('function chooseEpisode');
const episodeEnd = source.indexOf('function enrichEpisodeTitles', episodeStart);
const episodePolicy = source.slice(episodeStart, episodeEnd);
assert.ok(episodePolicy.includes('videoPlaybackPriority(a, group)'), 'episode choices must prioritize playable sources');
assert.ok(episodePolicy.indexOf('playableB - playableA') < episodePolicy.indexOf('numberA - numberB'), 'episode capability must sort before episode number');

console.log('Alloha playback policy tests passed');
