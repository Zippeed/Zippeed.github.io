import { staticData } from './data.js';
import { icon } from './icons.js';
import { escapeHtml as esc } from './ui.js';

const socialIcons = ['twitch', 'x-twitter', 'instagram', 'github', 'steam', 'lastfm', 'letterboxd'];
export function renderProfile(t, u, status) {
  return `
    <header class="page-heading"><h1 id="profile-title">${esc(t.title)}</h1></header>
    <dl class="profile-facts">${t.fields.map(field => `<div>${icon(field.icon)}<div><dt>${esc(field.label)}</dt><dd>${esc(field.value)}</dd></div></div>`).join('')}</dl>
    <section class="directive-panel" aria-labelledby="directive-title"><h2 id="directive-title">${esc(t.directive.label)}</h2><p>${esc(t.directive.value)}</p></section>
    <section class="content-section" aria-labelledby="socials-title"><div class="section-heading"><h2 id="socials-title">${esc(t.socialsTitle)}</h2><span>${icon('signal')}</span></div><div class="social-grid">${staticData.socials.map((social, i) => `<a href="${social.url}" class="social-link social-${i}" target="_blank" rel="noopener noreferrer" aria-label="${esc(social.name)} — ${esc(social.user)} (${u.external})"><span class="social-monogram" aria-hidden="true"><img src="imagens/icons/${socialIcons[i]}.svg" width="20" height="20" alt=""></span><span class="social-info"><strong>${social.name}</strong><span>${esc(social.user)}</span></span>${icon('arrow')}</a>`).join('')}</div></section>
    <section class="content-section" aria-labelledby="setup-title"><div class="section-heading"><h2 id="setup-title">${esc(t.setupTitle)}</h2>${icon('cpu')}</div><dl class="setup-grid">${staticData.setup.map((item, i) => `<div class="setup-item">${icon(item.icon)}<div><dt>${esc(t.setup[i].label)}</dt><dd>${esc(item.value)}</dd></div></div>`).join('')}</dl></section>
    ${status ? `<section class="content-section" aria-labelledby="languages-title"><div class="section-heading"><h2 id="languages-title">${esc(status.languagesTitle)}</h2>${icon('globe')}</div><div class="spoken-languages">${status.languages.map((lang,i) => `<div><div><span>${esc(lang.name)}</span><small>${esc(lang.label)}</small></div><div class="language-meter" role="meter" aria-label="${esc(lang.name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${parseInt(staticData.languageLevels[i])}" aria-valuetext="${esc(lang.label)}"><span style="width:${staticData.languageLevels[i]}"></span></div></div>`).join('')}</div></section>` : ''}`;
}
export function renderCollection(items, u, gallery = false) {
  return items.map((item, index) => {
    if (item.isEmbed) {
      // Iframes only get a src after the visitor expands a playlist.
      const match = item.embed.match(/src="(https:\/\/open\.spotify\.com\/embed\/[^"<>]+)"/);
      return `<details class="playlist-card"><summary>${icon('music')}<span>${esc(item.name)}</span>${icon('chevron')}</summary><div class="playlist-embed" data-embed="${esc(match?.[1] || '')}" data-title="${esc(item.name)}"></div></details>`;
    }
    const name = gallery ? `${u.photo} ${index + 1}` : item.name;
    const src = gallery ? item : item.image;
    const thumbnail = src.replace('/imagens/', '/imagens/thumbs/');
    return `<button class="image-card ${gallery ? 'gallery-card' : ''}" data-image="${index}" aria-label="${esc(name)}"><span class="image-surface"><img src="${esc(thumbnail)}" alt="${esc(name)}" loading="lazy" decoding="async" width="${gallery ? 640 : 400}" height="${gallery ? 640 : 600}"><span class="image-open">${icon('arrow')}</span></span><span class="image-caption"><strong>${esc(name)}</strong>${item.artist ? `<small>${esc(item.artist)}</small>` : ''}</span></button>`;
  }).join('');
}
export function renderAffinities(t, u, category) {
  const items = staticData.affinities[category].items;
  return `<header class="page-heading"><h1>${esc(t.title)}</h1></header><div class="category-tabs" role="group" aria-label="${esc(t.title)}">${t.categories.map((cat, index) => `<button data-category="${index}" class="category-button" aria-pressed="${index === category}">${icon(staticData.affinities[index].icon)}${esc(cat.name)}</button>`).join('')}</div><div id="affinities-content" class="${items[0]?.isEmbed ? 'playlist-grid' : 'collection-grid'}">${renderCollection(items, u)}</div>`;
}
export function renderRecords(t, u) {
  return `<header class="page-heading"><h1>${esc(t.title)}</h1></header><div class="records-grid">${t.items.map(item => `<article class="record-card">${icon('records')}<p>${esc(item)}</p></article>`).join('')}</div>`;
}
export function renderGallery(t, u) {
  return `<header class="page-heading"><h1>${esc(t.title)}</h1></header><div class="collection-grid gallery-grid">${renderCollection(staticData.gallery, u, true)}</div>`;
}
export function renderStatus(t, u, activeEmeralds) {
  const colors = ['#6ee7a0', '#ff6573', '#6c9fff', '#ffda70', '#c595ff', '#67dfe3', '#e5e8f0'];
  return `<div class="status-heading"><span>${esc(t.chaos)}</span><span class="energy-count">${activeEmeralds.size}/7</span></div><div class="emeralds">${colors.map((color, i) => `<button class="emerald" style="--emerald:${color}" data-emerald="${i}" aria-label="${u.chaos} ${i + 1}" aria-pressed="${activeEmeralds.has(i)}"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 3 12 0 5 7-11 13L1 10Z" fill="currentColor" fill-opacity=".2" stroke="currentColor"/><path d="M1 10h22M6 3l6 20L18 3" stroke="currentColor" stroke-opacity=".6"/></svg></button>`).join('')}</div><button id="reset-theme" class="reset-theme" ${document.body.classList.contains('super-shadow-mode') ? '' : 'hidden'}>${u.reset}</button>`;
}
