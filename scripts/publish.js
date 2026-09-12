import fs from 'node:fs';
import path from 'node:path';
import { PATHS } from './lib/env.js';
import { log, slugify } from './lib/util.js';

// ── Historial persistente (deduplicación entre ejecuciones del cron) ──
export function loadProcessed() {
  try {
    return JSON.parse(fs.readFileSync(PATHS.processed, 'utf8'));
  } catch {
    return { ids: {}, titles: {} };
  }
}

export function saveProcessed(processed) {
  fs.mkdirSync(PATHS.dataDir, { recursive: true });
  fs.writeFileSync(PATHS.processed, JSON.stringify(processed, null, 2));
}

/** ¿Ya procesamos este artículo? Comprueba por enlace y por título normalizado. */
export function isProcessed(processed, item) {
  return Boolean(processed.ids?.[item.id] || processed.titles?.[item.titleKey]);
}

export function markProcessed(processed, item, slug) {
  processed.ids ||= {};
  processed.titles ||= {};
  const rec = { slug, title: item.title, source: item.source.id, at: new Date().toISOString() };
  processed.ids[item.id] = rec;
  processed.titles[item.titleKey] = true;
}

// ── Escritura del artículo (.md con frontmatter) ──────────────
function yamlStr(s = '') {
  return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function buildFrontmatter({ rewrite, image, item, slug }) {
  const lines = [
    '---',
    `title: ${yamlStr(rewrite.title)}`,
    `teaser: ${yamlStr(rewrite.teaser)}`,
    `category: ${yamlStr(rewrite.category)}`,
    `pubDate: ${yamlStr(new Date(item.pubDate).toISOString())}`,
    'image:',
    `  url: ${yamlStr(image.url)}`,
    `  alt: ${yamlStr(image.alt)}`,
    `  credit: ${yamlStr(image.credit)}`,
    ...(image.creditUrl ? [`  creditUrl: ${yamlStr(image.creditUrl)}`] : []),
    ...(image.provider ? [`  provider: ${yamlStr(image.provider)}`] : []),
    'source:',
    `  name: ${yamlStr(item.source.name)}`,
    `  url: ${yamlStr(item.link)}`,
    `tags: [${(rewrite.tags || []).map(yamlStr).join(', ')}]`,
    'draft: false',
    '---',
    '',
  ];
  return lines.join('\n');
}

/**
 * Publica un artículo reescrito en la content collection de Astro.
 * @returns {string} slug del artículo publicado
 */
export function publishArticle({ item, rewrite, image }) {
  const slug = `${slugify(rewrite.title)}-${item.id.slice(0, 6)}`;
  const frontmatter = buildFrontmatter({ rewrite, image, item, slug });
  const contents = frontmatter + rewrite.body.trim() + '\n';

  fs.mkdirSync(PATHS.articlesDir, { recursive: true });
  const file = path.join(PATHS.articlesDir, `${slug}.md`);
  fs.writeFileSync(file, contents);
  log.ok(`publicado: ${path.relative(PATHS.root, file)}`);
  return slug;
}
