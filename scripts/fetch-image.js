import { ENV } from './lib/env.js';
import { log, withRetry } from './lib/util.js';

// Semillas de búsqueda en inglés por categoría (los bancos de imágenes
// indexan mejor en inglés). Se combinan con la primera etiqueta del artículo.
const CATEGORY_QUERY = {
  moviles: 'smartphone',
  ordenadores: 'laptop computer',
  camaras: 'camera photography',
  software: 'software code screen',
  coches: 'car dashboard technology',
  chips: 'microchip processor',
  ia: 'artificial intelligence technology',
  gadgets: 'tech gadget',
  wearables: 'smartwatch wearable',
  gaming: 'gaming setup',
};

function buildQuery({ category, tags }) {
  const seed = CATEGORY_QUERY[category] || 'technology';
  const tag = Array.isArray(tags) && tags.length ? tags[0] : '';
  return [tag, seed].filter(Boolean).join(' ').trim();
}

// ── Unsplash ──────────────────────────────────────────────────
async function fromUnsplash(query) {
  if (!ENV.unsplashKey) return null;
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&content_filter=high`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${ENV.unsplashKey}` } });
  if (res.status === 403) throw new Error('Unsplash rate-limit (403)');
  if (!res.ok) throw new Error(`Unsplash HTTP ${res.status}`);
  const data = await res.json();
  const p = data.results?.[0];
  if (!p) return null;
  // Unsplash API Guidelines: registrar la "descarga" cuando se usa la foto.
  try {
    if (p.links?.download_location) {
      await fetch(p.links.download_location, { headers: { Authorization: `Client-ID ${ENV.unsplashKey}` } });
    }
  } catch (_) { /* no bloquear por esto */ }
  return {
    url: p.urls.regular,
    alt: p.alt_description || query,
    credit: `Foto de ${p.user.name} en Unsplash`,
    creditUrl: `${p.links.html}?utm_source=tecnoscroll&utm_medium=referral`,
    provider: 'unsplash',
  };
}

// ── Pexels ────────────────────────────────────────────────────
async function fromPexels(query) {
  if (!ENV.pexelsKey) return null;
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: ENV.pexelsKey } });
  if (res.status === 429) throw new Error('Pexels rate-limit (429)');
  if (!res.ok) throw new Error(`Pexels HTTP ${res.status}`);
  const data = await res.json();
  const p = data.photos?.[0];
  if (!p) return null;
  return {
    url: p.src.large,
    alt: p.alt || query,
    credit: `Foto de ${p.photographer} en Pexels`,
    creditUrl: p.url,
    provider: 'pexels',
  };
}

function fallback(category) {
  return {
    url: `/fallback/${category}.svg`,
    alt: `Ilustración de la categoría ${category}`,
    credit: 'Ilustración de TecnoScroll',
    creditUrl: undefined,
    provider: 'fallback',
  };
}

/**
 * Busca una imagen libre de derechos y relevante. NUNCA usa la imagen del
 * artículo fuente. Orden: Unsplash → Pexels → reserva local por categoría.
 * @param {{title:string, category:string, tags?:string[]}} article
 */
export async function fetchImage(article) {
  const query = buildQuery(article);

  for (const [name, fn] of [['Unsplash', fromUnsplash], ['Pexels', fromPexels]]) {
    try {
      const img = await withRetry(() => fn(query), { retries: 1, baseMs: 1200, label: name });
      if (img) {
        log.step(`imagen (${img.provider}): "${query}"`);
        return img;
      }
    } catch (err) {
      log.warn(`${name} falló: ${err.message}`);
    }
  }

  log.step(`imagen (reserva) para categoría "${article.category}"`);
  return fallback(article.category);
}

// Prueba: node scripts/fetch-image.js ia openai
if (import.meta.url === `file://${process.argv[1]}`) {
  const category = process.argv[2] || 'ia';
  const tags = process.argv.slice(3);
  fetchImage({ title: 'demo', category, tags })
    .then((img) => console.log(JSON.stringify(img, null, 2)))
    .catch((e) => { log.err(e.message); process.exit(1); });
}
