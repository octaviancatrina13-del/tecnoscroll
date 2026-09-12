import crypto from 'node:crypto';

// ── logging con color mínimo ──────────────────────────────────
const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
};
export const log = {
  info: (...a) => console.log(c.cyan('▶'), ...a),
  ok: (...a) => console.log(c.green('✓'), ...a),
  warn: (...a) => console.warn(c.yellow('!'), ...a),
  err: (...a) => console.error(c.red('✗'), ...a),
  step: (...a) => console.log(c.dim('  ·'), ...a),
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Reintentos con backoff exponencial. Ideal para RSS caídos o rate-limit de APIs.
 * @param {() => Promise<T>} fn
 * @param {{retries?: number, baseMs?: number, label?: string}} [opts]
 * @returns {Promise<T>}
 * @template T
 */
export async function withRetry(fn, { retries = 3, baseMs = 800, label = 'op' } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === retries) break;
      const wait = baseMs * 2 ** attempt + Math.random() * 300;
      log.warn(`${label}: intento ${attempt + 1} falló (${err.message}). Reintento en ${Math.round(wait)}ms`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

/** Hash estable para deduplicar por enlace (o título normalizado como respaldo). */
export function hashKey(str) {
  return crypto.createHash('sha1').update(String(str).trim().toLowerCase()).digest('hex').slice(0, 16);
}

/** Normaliza un título para detectar duplicados aunque cambie el enlace. */
export function normalizeTitle(title) {
  return String(title)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** slug amigable para URLs / nombres de archivo. */
export function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
    .replace(/-+$/g, '');
}

/** Quita etiquetas HTML de un fragmento (para pasar texto limpio al modelo). */
export function stripHtml(html = '') {
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}
