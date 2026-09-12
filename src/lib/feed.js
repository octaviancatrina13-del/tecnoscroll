import { getCollection } from 'astro:content';

// Nº de tarjetas por "página" del scroll infinito.
export const PAGE_SIZE = 12;

/** Datos mínimos que necesita una tarjeta del feed (se serializan a JSON). */
export function toCardData(entry) {
  const d = entry.data;
  return {
    slug: entry.id,
    title: d.title,
    teaser: d.teaser,
    category: d.category,
    image: { url: d.image.url, alt: d.image.alt },
    source: { name: d.source.name },
    pubDate: d.pubDate.toISOString(),
  };
}

/**
 * Devuelve los artículos publicados (no draft), del más nuevo al más antiguo.
 * @param {(cat: string) => boolean | null} [categoryFilter] slug de categoría opcional
 */
export async function getPublishedArticles(category = null) {
  const all = await getCollection('articles', ({ data }) => data.draft !== true);
  const filtered = category ? all.filter((e) => e.data.category === category) : all;
  return filtered.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** Trocea un array en páginas de tamaño PAGE_SIZE. */
export function paginate(items, size = PAGE_SIZE) {
  const pages = [];
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size));
  return pages.length ? pages : [[]];
}
