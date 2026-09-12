// Tiempo relativo en español ("hace 2 horas", "hace 3 días").
// Se usa tanto en el render estático (SSR) como en el scroll infinito (cliente),
// así que se mantiene una sola implementación sin dependencias.

const DIVISIONS = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.34524, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Number.POSITIVE_INFINITY, unit: 'year' },
];

const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

/**
 * @param {Date|string|number} date
 * @param {Date} [now]
 * @returns {string} p.ej. "hace 2 horas"
 */
export function relativeTime(date, now = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  let duration = (d.getTime() - now.getTime()) / 1000; // segundos, negativo = pasado

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), /** @type {Intl.RelativeTimeFormatUnit} */ (division.unit));
    }
    duration /= division.amount;
  }
  return rtf.format(Math.round(duration), 'year');
}

/** Fecha absoluta legible para la página de artículo. */
export function longDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(d);
}
