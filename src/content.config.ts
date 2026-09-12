import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_SLUGS } from './lib/categories.js';

// Colección de artículos. Cada artículo es un .md en src/content/articles/
// generado por scripts/publish.js. El cuerpo (markdown) es el artículo reescrito;
// el frontmatter lleva metadatos para el feed y las páginas.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    teaser: z.string(),
    category: z.enum(CATEGORY_SLUGS as [string, ...string[]]),
    pubDate: z.coerce.date(),

    // Imagen con licencia (Unsplash / Pexels / Openverse) — NUNCA del artículo fuente.
    image: z.object({
      // URL absoluta (proveedor) o ruta local de reserva (p.ej. "/fallback/ia.svg").
      url: z.string().refine((s) => /^https?:\/\//.test(s) || s.startsWith('/'), {
        message: 'image.url debe ser una URL http(s) o una ruta que empiece por "/"',
      }),
      alt: z.string(),
      credit: z.string(),        // p.ej. "Foto de Jane Doe en Unsplash"
      creditUrl: z.string().url().optional(),
      provider: z.string().optional(),
    }),

    // Atribución a la fuente original (footer editorial).
    source: z.object({
      name: z.string(),
      url: z.string().url(),
    }),

    // Etiquetas opcionales para SEO / relacionados.
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
