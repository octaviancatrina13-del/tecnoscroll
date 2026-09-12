import { ENV } from './lib/env.js';
import { log, sleep } from './lib/util.js';
import { fetchAllNews } from './fetch-news.js';
import { rewriteArticle } from './rewrite-and-translate.js';
import { fetchImage } from './fetch-image.js';
import { loadProcessed, saveProcessed, isProcessed, markProcessed, publishArticle } from './publish.js';

const DRY = process.argv.includes('--dry-run');

async function main() {
  console.log('');
  log.info(`TecnoScroll — pipeline ${DRY ? '(DRY RUN, sin API ni escritura)' : ''}`);

  // 1) Ingestión
  const news = await fetchAllNews();

  // 2) Historial + deduplicación (entre ejecuciones y dentro de la misma tanda)
  const processed = loadProcessed();
  const seenThisRun = new Set();
  const fresh = [];
  for (const item of news) {
    if (isProcessed(processed, item)) continue;
    if (seenThisRun.has(item.id) || seenThisRun.has(item.titleKey)) continue;
    seenThisRun.add(item.id);
    seenThisRun.add(item.titleKey);
    fresh.push(item);
  }

  // 3) Priorizar por peso de la fuente y recencia, y limitar por ejecución
  fresh.sort((a, b) => b.weight - a.weight || new Date(b.pubDate) - new Date(a.pubDate));
  const batch = fresh.slice(0, ENV.maxArticles);

  log.ok(`Nuevos: ${fresh.length} · a procesar esta vez: ${batch.length} (límite ${ENV.maxArticles})`);

  if (DRY) {
    for (const it of batch) log.step(`[${it.source.name}] ${it.title}`);
    log.info('DRY RUN terminado. No se ha escrito nada.');
    return;
  }

  if (!ENV.anthropicKey) {
    log.err('Falta ANTHROPIC_API_KEY. Configúrala en .env (o como secret en CI).');
    process.exit(1);
  }

  // 4) Reescritura + imagen + publicación (un fallo no detiene la tanda)
  let ok = 0, failed = 0;
  for (const item of batch) {
    try {
      log.info(`Procesando: ${item.title}`);
      const rewrite = await rewriteArticle(item);
      const image = await fetchImage({ title: rewrite.title, category: rewrite.category, tags: rewrite.tags });
      const slug = publishArticle({ item, rewrite, image });
      markProcessed(processed, item, slug);
      saveProcessed(processed); // guardar de forma incremental por si se corta
      ok++;
      await sleep(700); // cortesía con los rate-limits
    } catch (err) {
      failed++;
      log.err(`Fallo con "${item.title}": ${err.message}`);
      // No lo marcamos como procesado: se reintentará en la próxima ejecución.
    }
  }

  console.log('');
  log.ok(`Terminado. Publicados: ${ok} · Fallidos: ${failed}`);
}

main().catch((err) => {
  log.err(err.stack || err.message);
  process.exit(1);
});
