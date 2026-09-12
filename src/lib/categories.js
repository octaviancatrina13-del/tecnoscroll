// Categorías del sitio. Fuente única de verdad, compartida por el pipeline
// (clasificación) y por la UI (badges, filtros, imágenes de reserva).
// El campo `slug` se usa en URLs y nombres de archivo; `label` es lo que se muestra.

export const CATEGORIES = [
  { slug: 'moviles',     label: 'Móviles',      emoji: '📱' },
  { slug: 'ordenadores', label: 'Ordenadores',  emoji: '💻' },
  { slug: 'camaras',     label: 'Cámaras',      emoji: '📷' },
  { slug: 'software',    label: 'Software',     emoji: '🧩' },
  { slug: 'coches',      label: 'Coches',       emoji: '🚗' },
  { slug: 'chips',       label: 'Chips',        emoji: '🔩' },
  { slug: 'ia',          label: 'IA',           emoji: '🤖' },
  { slug: 'gadgets',     label: 'Gadgets',      emoji: '🎛️' },
  { slug: 'wearables',   label: 'Wearables',    emoji: '⌚' },
  { slug: 'gaming',      label: 'Gaming',       emoji: '🎮' },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

/** Devuelve la categoría (objeto) por slug, o la de reserva 'gadgets'. */
export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || CATEGORIES.find((c) => c.slug === 'gadgets');
}

/** Etiqueta legible a partir de un slug. */
export function categoryLabel(slug) {
  return getCategory(slug).label;
}
