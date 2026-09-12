import Anthropic from '@anthropic-ai/sdk';
import { ENV } from './lib/env.js';
import { log, withRetry } from './lib/util.js';
import { CATEGORY_SLUGS } from '../src/lib/categories.js';

const client = ENV.anthropicKey ? new Anthropic({ apiKey: ENV.anthropicKey }) : null;

// ── Reglas editoriales (system prompt) ────────────────────────
const SYSTEM = `Eres redactor/a de TecnoScroll, un medio digital de tecnología en español dirigido al público general de España.

Tu tarea: a partir de los HECHOS de un artículo fuente (que puede estar en cualquier idioma), redactar un artículo ORIGINAL en español de España.

REGLAS INNEGOCIABLES:
1. NO traduzcas. NO parafrasees frase por frase. NO copies la estructura ni las oraciones del original.
2. Extrae los hechos y vuelve a contarlos con tu propia estructura y redacción.
3. Atribuye EXPLÍCITAMENTE toda cita textual y toda información no confirmada oficialmente (rumores, filtraciones). Ejemplo: "según fuentes citadas por Bloomberg", "de acuerdo con The Verge". No inventes citas ni datos que no estén en la fuente.
4. No inventes cifras, fechas, nombres ni declaraciones. Si un dato no está claro, omítelo.
5. Tono accesible y ágil para lector general aficionado a la tecnología, sin tecnicismos excesivos. Español de España (usa "móvil", "ordenador", "coche").
6. Extensión del cuerpo: entre 150 y 300 palabras. Sin titular repetido dentro del cuerpo.
7. El cuerpo va en Markdown ligero: párrafos separados por línea en blanco; como mucho un subtítulo "## " si aporta. Nada de imágenes ni enlaces markdown.
8. El teaser es UNA sola frase tipo gancho (no un resumen completo), máx. ~140 caracteres.
9. El titular: claro y atractivo, sin clickbait engañoso, máx. ~90 caracteres.

RELEVANCIA (filtro de tema): TecnoScroll SOLO publica tecnología de consumo:
móviles, ordenadores/portátiles, cámaras, software/apps, coches y su tecnología
(infoentretenimiento, conducción asistida, eléctricos), chips/procesadores, IA,
gadgets, wearables y gaming. Si el artículo NO trata claramente de eso (p.ej.
salud, política, medicina, turismo, deportes, economía general, cultura), marca
"relevante": false y no te esfuerces en el resto de campos. Si sí es tecnología,
marca "relevante": true y redáctalo con calidad.

Clasifica el artículo en UNA categoría de esta lista (usa el identificador exacto):
${CATEGORY_SLUGS.join(', ')}.

Devuelve el resultado ÚNICAMENTE mediante la herramienta "publicar_articulo".`;

const TOOL = {
  name: 'publicar_articulo',
  description: 'Entrega el artículo reescrito y clasificado.',
  input_schema: {
    type: 'object',
    properties: {
      relevante: { type: 'boolean', description: 'true si el artículo trata de tecnología de consumo; false si no (no se publicará).' },
      title: { type: 'string', description: 'Titular en español, máx ~90 caracteres.' },
      teaser: { type: 'string', description: 'Una frase gancho, máx ~140 caracteres.' },
      body: { type: 'string', description: 'Cuerpo original en español, Markdown, 150-300 palabras.' },
      category: { type: 'string', enum: CATEGORY_SLUGS, description: 'Categoría del artículo.' },
      tags: {
        type: 'array', items: { type: 'string' },
        description: '2-5 etiquetas cortas en minúscula (marcas, productos, temas).',
      },
    },
    required: ['relevante', 'title', 'teaser', 'body', 'category'],
  },
};

/**
 * Reescribe un artículo fuente en un artículo original en español.
 * @param {{title:string, body:string, source:{name:string}, link:string}} item
 * @returns {Promise<{title,teaser,body,category,tags}>}
 */
export async function rewriteArticle(item) {
  if (!client) throw new Error('Falta ANTHROPIC_API_KEY: no se puede reescribir.');

  const userContent = `FUENTE: ${item.source.name}
IDIOMA ORIGINAL: desconocido (dedúcelo del texto)
TITULAR ORIGINAL: ${item.title}

TEXTO FUENTE (puede venir recortado):
"""
${(item.body || item.title).slice(0, 6000)}
"""

Redacta el artículo original en español siguiendo TODAS las reglas y entrégalo con la herramienta "publicar_articulo".`;

  const msg = await withRetry(
    () =>
      client.messages.create({
        model: ENV.anthropicModel,
        max_tokens: 1500,
        system: SYSTEM,
        tools: [TOOL],
        tool_choice: { type: 'tool', name: 'publicar_articulo' },
        messages: [{ role: 'user', content: userContent }],
      }),
    { retries: 3, baseMs: 1500, label: `rewrite ${item.source.id}` }
  );

  const toolUse = msg.content.find((b) => b.type === 'tool_use');
  if (!toolUse) throw new Error('El modelo no devolvió el artículo estructurado.');

  const out = toolUse.input;
  // Salvaguarda: categoría válida.
  if (!CATEGORY_SLUGS.includes(out.category)) out.category = 'gadgets';
  out.tags = Array.isArray(out.tags) ? out.tags.slice(0, 6) : [];
  return out;
}

// Prueba manual: node scripts/rewrite-and-translate.js "titular de prueba"
if (import.meta.url === `file://${process.argv[1]}`) {
  const title = process.argv[2] || 'Apple presenta un nuevo chip para sus portátiles';
  rewriteArticle({ title, body: title, source: { name: 'Fuente Demo', id: 'demo' }, link: '' })
    .then((r) => console.log(JSON.stringify(r, null, 2)))
    .catch((e) => { log.err(e.message); process.exit(1); });
}
