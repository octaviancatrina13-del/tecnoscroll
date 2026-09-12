// @ts-check
import { defineConfig } from 'astro/config';

// URL final del sitio (para SEO, sitemap y URLs absolutas).
// Cámbialo por tu dominio real cuando lo tengas en Netlify.
const SITE = process.env.SITE_URL || 'https://tecnoscroll.es';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: {
    // HTML limpio: /articulo/mi-slug/index.html
    format: 'directory',
  },
});
