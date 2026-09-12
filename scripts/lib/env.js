import 'dotenv/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
// scripts/lib/env.js -> raíz del proyecto
export const ROOT = path.resolve(path.dirname(__filename), '..', '..');

export const PATHS = {
  root: ROOT,
  sources: path.join(ROOT, 'src', 'data', 'sources.json'),
  articlesDir: path.join(ROOT, 'src', 'content', 'articles'),
  dataDir: path.join(ROOT, 'data'),
  processed: path.join(ROOT, 'data', 'processed.json'),
  fallbackDir: path.join(ROOT, 'public', 'fallback'),
};

export const ENV = {
  anthropicKey: process.env.ANTHROPIC_API_KEY || '',
  anthropicModel: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5',
  unsplashKey: process.env.UNSPLASH_ACCESS_KEY || '',
  pexelsKey: process.env.PEXELS_API_KEY || '',
  maxArticles: Number(process.env.MAX_ARTICLES_PER_RUN || '12'),
  outputLang: process.env.OUTPUT_LANG || 'es',
};
