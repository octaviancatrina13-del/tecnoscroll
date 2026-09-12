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

  // 3) Diversidad: limitar cuántos artículos entran por fuente en cada tanda,
  //    para que el feed no lo dominen 2-3 sitios. Se conservan los más recientes
  //    de cada fuente; luego se ordena por peso (oficiales primero) y recencia.
  const PER_SOURCE_CAP = Number(process.env.PER_SOURCE_CAP || '3');
  const perSource = new Map();
  for (const it of fresh) {
    const arr = perSource.get(it.source.id) || [];
    arr.push(it);
    perSource.set(it.source.id, arr);
  }
  const diversified = [];
  for (const arr of perSource.values()) {
    arr.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    diversified.push(...arr.slice(0, PER_SOURCE_CAP));
  }
  diversified.sort((a, b) => b.weight - a.weight || new Date(b.pubDate) - new Date(a.pubDate));
  const batch = diversified.slice(0, ENV.maxArticles);

  const fuentesEnLote = new Set(batch.map((b) => b.source.name)).size;
  log.ok(`Nuevos: ${fresh.length} · a procesar: ${batch.length} de ${fuentesEnLote} fuentes distintas (máx ${PER_SOURCE_CAP}/fuente, límite ${ENV.maxArticles})`);

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
  let ok = 0, failed = 0, skipped = 0;
  for (const item of batch) {
    try {
      log.info(`Procesando: ${item.title}`);
      const rewrite = await rewriteArticle(item);

      // Filtro de tema: si no es tecnología, se descarta (y se marca para no repetir).
      if (rewrite.relevante === false) {
        markProcessed(processed, item, null);
        saveProcessed(processed);
        skipped++;
        log.step(`descartado (no es tecnología): ${item.title}`);
        continue;
      }

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
  log.ok(`Terminado. Publicados: ${ok} · Descartados (no tech): ${skipped} · Fallidos: ${failed}`);
}

main()
  .then(() => process.exit(0)) // cerrar ya, aunque queden sockets keep-alive abiertos
  .catch((err) => {
    log.err(err.stack || err.message);
    process.exit(1);
  });
