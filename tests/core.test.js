import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AudioPlayer, clampVolume, formatTime } from '../audio.js';
import { storage, escapeHtml, ui } from '../ui.js';
import { languageData, staticData } from '../data.js';
import { renderAffinities, renderGallery, renderProfile, renderRecords } from '../renderers.js';

class FakeAudio extends EventTarget {
  paused=true;ended=false;currentTime=0;duration=180;volume=0;muted=false;
  async play(){this.paused=false;this.dispatchEvent(new Event('playing'));}
  pause(){this.paused=true;this.dispatchEvent(new Event('pause'));}
  removeAttribute(){}
  load(){}
}
function setup(factory=()=>new FakeAudio()) { const audio=[];const player=new AudioPlayer({createAudio:()=>{const a=factory();audio.push(a);return a;},volume:'0.05'});return {player,audio}; }
test('does not create or fetch audio until an explicit play request',()=>{const {player,audio}=setup();player.select(1);assert.equal(audio.length,0);assert.equal(player.playing,false);assert.equal(player.index,1);});
test('failed playback stays paused and can be retried',async()=>{let fail=true;const {player}=setup(()=>{const a=new FakeAudio();a.play=async()=>{if(fail)throw new Error('blocked');a.paused=false;};return a;});await player.play();assert.equal(player.playing,false);assert.equal(player.desired,false);assert.equal(player.error,true);fail=false;await player.play();assert.equal(player.playing,true);assert.equal(player.error,false);});
test('track switches preserve pause, wrap, and stop the previous audio',async()=>{const {player,audio}=setup();player.select(-1);assert.equal(player.index,2);await player.play();player.select(3);assert.equal(player.index,0);assert.equal(audio[0].paused,true);await Promise.resolve();assert.equal(player.playing,true);player.pause();player.select(1);assert.equal(player.playing,false);assert.equal(player.audio,null);});
test('obsolete play rejection does not overwrite a newer track',async()=>{let reject;let count=0;const {player}=setup(()=>{const a=new FakeAudio();if(count++===0)a.play=()=>new Promise((_,r)=>reject=r);return a;});const old=player.play();await player.select(1,true);reject(new Error('interrupted'));await old;assert.equal(player.index,1);assert.equal(player.playing,true);assert.equal(player.error,false);});
test('pause cancels pending playback state',async()=>{let reject;const {player}=setup(()=>{const a=new FakeAudio();a.play=()=>new Promise((_,r)=>reject=r);return a;});const pending=player.play();player.pause();reject(new Error('paused'));await pending;assert.equal(player.pending,false);assert.equal(player.error,false);assert.equal(player.desired,false);});
test('old media events cannot stop a new track',async()=>{const {player,audio}=setup();await player.play();await player.select(1,true);audio[0].dispatchEvent(new Event('error'));audio[0].dispatchEvent(new Event('ended'));assert.equal(player.index,1);assert.equal(player.error,false);assert.equal(player.playing,true);});
test('volume is bounded, zero is respected, mute and seek work',async()=>{assert.equal(clampVolume('invalid'),.05);assert.equal(clampVolume('-1'),0);assert.equal(clampVolume('9'),1);const {player}=setup();player.setVolume(0);await player.play();assert.equal(player.audio.volume,0);player.toggleMute();assert.equal(player.volume,.05);player.toggleMute();assert.equal(player.audio.muted,true);player.setVolume(.2);assert.equal(player.audio.muted,false);player.seek(50);assert.equal(player.audio.currentTime,90);});
test('native ended event advances exactly one track',async()=>{const {player,audio}=setup();await player.play();audio[0].ended=true;audio[0].dispatchEvent(new Event('ended'));await Promise.resolve();assert.equal(player.index,1);assert.equal(player.playing,true);});
test('pause from native media controls synchronizes the requested state',async()=>{const {player,audio}=setup();await player.play();audio[0].pause();assert.equal(player.desired,false);assert.equal(player.pending,false);await player.toggle();assert.equal(player.playing,true);});
test('storage failures do not stop site or audio',()=>{Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw new Error('blocked');}});assert.equal(storage.get('language','pt'),'pt');assert.doesNotThrow(()=>storage.set('language','en'));assert.doesNotThrow(()=>new AudioPlayer());delete globalThis.localStorage;});
test('player time formatting handles unknown metadata',()=>{assert.equal(formatTime(NaN),'0:00');assert.equal(formatTime(Infinity),'0:00');assert.equal(formatTime(125),'2:05');});
test('all languages render every section without inline handlers or missing translations',()=>{for(const [lang,t] of Object.entries(languageData)){for(const html of [renderProfile(t.profile,ui[lang]),renderGallery(t.gallery,ui[lang]),renderRecords(t.records,ui[lang]),...staticData.affinities.map((_,i)=>renderAffinities(t.affinities,ui[lang],i))]){assert.doesNotMatch(html,/undefined|onclick=|onload=|<iframe/i);assert.match(html,/<(?:h1|section|header)/);}}});
test('playlist URLs remain inert until opened',()=>{const html=renderAffinities(languageData.pt.affinities,ui.pt,8);assert.match(html,/<details/);assert.match(html,/data-embed="https:\/\/open.spotify.com/);assert.doesNotMatch(html,/<iframe/);});
test('external text is escaped',()=>{assert.equal(escapeHtml('<img onerror="x">'), '&lt;img onerror=&quot;x&quot;&gt;');});
