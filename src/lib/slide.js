// Render de una "diapositiva" del feed a pantalla completa (estilo tabloid vertical).
// UNA sola implementación, usada por index.astro (SSR de la primera página) y por
// el scroll infinito del cliente, para que el markup nunca se desincronice.

import { relativeTime } from './time.js';
import { getCategory } from './categories.js';

function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * @param {{slug,title,teaser,category,image:{url,alt},source:{name},pubDate}} a
 * @param {{lead?:boolean, ticker?:string[]}} [opts]
 * @returns {string} HTML de una .slide
 */
export function slideHTML(a, { lead = false, ticker = [] } = {}) {
  const cat = getCategory(a.category);
  const href = `/articulo/${a.slug}`;
  const when = relativeTime(a.pubDate);

  let breaking = '';
  if (lead && ticker.length) {
    const line = ticker.map((t) => esc(t)).join('&nbsp;&nbsp;•&nbsp;&nbsp;');
    const run = `${line}&nbsp;&nbsp;•&nbsp;&nbsp;`;
    breaking = `
    <div class="breaking">
      <span class="lbl">Última hora</span>
      <div class="track"><div class="marq">${run}${run}</div></div>
    </div>`;
  }

  return `
<article class="slide${lead ? ' slide--lead' : ''}">${breaking}
  <div class="shot">
    <img class="photo" src="${esc(a.image.url)}" alt="${esc(a.image.alt)}" ${lead ? '' : 'loading="lazy" '}decoding="async" />
    <div class="abs wm"></div>
    <div class="abs fade"></div>
  </div>
  <a class="caption" href="${esc(href)}">
    <span class="tag">${esc(cat.emoji)} ${esc(cat.label)}</span>
    <h2 class="hl">${esc(a.title)}</h2>
    <p class="dek"><mark>${esc(a.teaser)}</mark></p>
    <div class="meta"><span class="src">${esc(a.source.name)}</span> · <time datetime="${esc(new Date(a.pubDate).toISOString())}">${esc(when)}</time></div>
  </a>
</article>`.trim();
}
