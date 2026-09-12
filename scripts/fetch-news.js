import fs from 'node:fs';
import Parser from 'rss-parser';
import { PATHS } from './lib/env.js';
import { log, withRetry, stripHtml, hashKey, normalizeTitle } from './lib/util.js';

const parser = new Parser({
  timeout: 20000,
  headers: { 'User-Agent': 'TecnoScrollBot/1.0 (+https://tecnoscroll.es)' },
});

function loadSources() {
  const raw = JSON.parse(fs.readFileSync(PATHS.sources, 'utf8'));
  return (raw.sources || []).filter((s) => s.enabled !== false);
}

/** Extrae el primer ID de vídeo de YouTube que aparezca en el HTML/enlaces del item. */
function extractYouTubeId(...texts) {
  const hay = texts.filter(Boolean).join(' ');
  const m = hay.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^"'\s]*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

/** Convierte un item de RSS al formato interno del pipeline. */
function toItem(item, source) {
  const link = (item.link || item.guid || '').trim();
  const title = (item.title || '').trim();
  const contentHtml = item['content:encoded'] || item.content || '';
  const bodyRaw = contentHtml || item.summary || item.contentSnippet || '';
  const ytId = extractYouTubeId(
    contentHtml,
    item.summary,
    item.contentSnippet,
    item.enclosure?.url,
    item['media:group']?.['media:content']?.url
  );
  return {
    video: ytId ? { type: 'youtube', id: ytId } : null,
    id: hashKey(link || normalizeTitle(title)),
    titleKey: hashKey(normalizeTitle(title)),
    title,
    body: stripHtml(bodyRaw),
    link,
    pubDate: item.isoDate || item.pubDate || new Date().toISOString(),
    source: { id: source.id, name: source.name, url: source.url, lang: source.lang },
    weight: source.weight ?? 1,
  };
}

/**
 * Descarga y normaliza todos los feeds activos. Un feed caído no rompe la ejecución:
 * se registra el error y se continúa con el resto.
 * @returns {Promise<Array>} items normalizados
 */
export async function fetchAllNews() {
  const sources = loadSources();
  log.info(`Descargando ${sources.length} fuentes RSS…`);
  const all = [];

  await Promise.all(
    sources.map(async (source) => {
      try {
        const feed = await withRetry(() => parser.parseURL(source.url), {
          retries: 2,
          label: `RSS ${source.id}`,
        });
        const items = (feed.items || []).map((it) => toItem(it, source)).filter((i) => i.title && i.link);
        log.step(`${source.name}: ${items.length} artículos`);
        all.push(...items);
      } catch (err) {
        log.warn(`${source.name} no disponible: ${err.message}`);
      }
    })
  );

  // Más nuevos primero.
  all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  log.ok(`Total recogido: ${all.length} artículos de ${sources.length} fuentes`);
  return all;
}

// Ejecución directa: `npm run fetch` (solo diagnóstico, no escribe nada).
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchAllNews()
    .then((items) => {
      const bySource = {};
      for (const i of items) bySource[i.source.name] = (bySource[i.source.name] || 0) + 1;
      console.table(bySource);
    })
    .catch((e) => {
      log.err(e);
      process.exit(1);
    });
}
