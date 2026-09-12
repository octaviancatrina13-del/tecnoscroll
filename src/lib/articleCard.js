// Render de la tarjeta del feed. UNA sola implementación usada por:
//  - ArticleCard.astro (render estático de la primera página)
//  - InfiniteScroll (cliente, al cargar más páginas)
// Así el markup nunca se desincroniza entre servidor y cliente.

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
 * @param {{
 *   slug: string, title: string, teaser: string, category: string,
 *   image: { url: string, alt: string },
 *   source: { name: string }, pubDate: string|Date
 * }} a
 * @returns {string} HTML de una tarjeta
 */
export function cardHTML(a) {
  const cat = getCategory(a.category);
  const href = `/articulo/${a.slug}`;
  const when = relativeTime(a.pubDate);
  return `
<article class="card">
  <a class="card__link" href="${esc(href)}" aria-label="${esc(a.title)}"></a>
  <div class="card__media">
    <img src="${esc(a.image.url)}" alt="${esc(a.image.alt)}" loading="lazy" decoding="async" />
    <span class="card__badge">${esc(cat.emoji)} ${esc(cat.label)}</span>
  </div>
  <div class="card__body">
    <h2 class="card__title">${esc(a.title)}</h2>
    <p class="card__teaser">${esc(a.teaser)}</p>
    <div class="card__meta">
      <span class="source">${esc(a.source.name)}</span>
      <span class="sep">·</span>
      <time datetime="${esc(new Date(a.pubDate).toISOString())}">${esc(when)}</time>
    </div>
  </div>
</article>`.trim();
}
