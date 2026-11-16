import { storage } from './ui.js';
export const tracks = [
  { name: 'Theme of Zipped', src: 'audio/normal.mp3' },
  { name: 'Super Shadow', src: 'audio/super.mp3' },
  { name: 'All Hail Shadow', src: 'audio/all_hail_shadow.mp3' },
];
export function clampVolume(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.05;
}
export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}
// Audio is created only after a play request. Old media events and rejected
// play promises cannot overwrite a newer track's state.
export class AudioPlayer {
  constructor({ createAudio = () => new Audio(), onChange = () => {}, volume = storage.get('bgmVolume', '0.05') } = {}) {
    this.createAudio = createAudio;
    this.onChange = onChange;
    this.volume = clampVolume(volume);
    this.index = 0;
    this.audio = null;
    this.desired = false;
    this.pending = false;
    this.error = false;
    this.muted = false;
    this.request = 0;
  }
  get playing() { return !!this.audio && !this.audio.paused && !this.audio.ended; }
  get track() { return tracks[this.index]; }
  notify() { this.onChange(this); }
  ensureAudio() {
    if (this.audio) return this.audio;
    const audio = this.createAudio();
    this.audio = audio;
    audio.preload = 'none';
    audio.src = this.track.src;
    audio.volume = this.volume;
    audio.muted = this.muted;
    audio.loop = false;
    for (const name of ['playing', 'pause', 'waiting', 'timeupdate', 'loadedmetadata', 'durationchange', 'error', 'ended']) {
      audio.addEventListener(name, () => {
        if (audio !== this.audio) return;
        if (name === 'ended') { this.select(this.index + 1, true); return; }
        if (name === 'error') { this.error = true; this.pending = false; this.desired = false; }
        if (name === 'pause' && audio.paused) { this.desired = false; this.pending = false; }
        if (name === 'playing') this.pending = false;
        if (name === 'waiting' && this.desired) this.pending = true;
        this.notify();
      });
    }
    return audio;
  }
  async play() {
    const request = ++this.request;
    this.desired = true;
    this.error = false;
    this.pending = true;
    const audio = this.ensureAudio();
    this.notify();
    try {
      await audio.play();
      if (request !== this.request || audio !== this.audio) return;
      this.pending = false;
    } catch {
      if (request !== this.request || audio !== this.audio) return;
      this.desired = false;
      this.pending = false;
      this.error = true;
    }
    this.notify();
  }
  pause() {
    ++this.request;
    this.desired = false;
    this.pending = false;
    this.audio?.pause();
    this.notify();
  }
  toggle() { return this.desired || this.playing ? this.pause() : this.play(); }
  select(index, autoplay = this.desired || this.playing) {
    if (!Number.isInteger(index)) return;
    ++this.request;
    const old = this.audio;
    this.audio = null;
    old?.pause();
    if (old) { old.removeAttribute('src'); old.load(); }
    this.index = ((index % tracks.length) + tracks.length) % tracks.length;
    this.pending = false;
    this.error = false;
    this.desired = false;
    if (autoplay) return this.play();
    this.notify();
  }
  setVolume(value) {
    this.volume = clampVolume(value);
    if (this.volume > 0) this.muted = false;
    if (this.audio) { this.audio.volume = this.volume; this.audio.muted = this.muted; }
    storage.set('bgmVolume', String(this.volume));
    this.notify();
  }
  toggleMute() {
    if (this.volume === 0) { this.setVolume(0.05); return; }
    this.muted = !this.muted;
    if (this.audio) this.audio.muted = this.muted;
    this.notify();
  }
  seek(percent) {
    if (this.audio && Number.isFinite(this.audio.duration) && this.audio.duration > 0) {
      this.audio.currentTime = this.audio.duration * Math.max(0, Math.min(100, percent)) / 100;
      this.notify();
    }
  }
}
