# ⚡ TecnoScroll

Sitio de **noticias de tecnología en español** para el público de España. Un pipeline automático recoge artículos de fuentes tech (RSS), los **reescribe de forma original** en español con la API de Claude, les añade una **imagen con licencia** (Unsplash/Pexels — nunca la del artículo fuente) y los publica en un **feed de scroll continuo** estilo tabloid.

- **Framework:** Astro (SSG)
- **Hosting:** Netlify (auto-deploy en cada push)
- **Automatización:** GitHub Actions (cron cada 8 h)
- **Reescritura:** API de Anthropic (Claude)
- **Imágenes:** Unsplash → Pexels → reserva local por categoría

---

## Puesta en marcha

```bash
npm install
cp .env.example .env   # rellena tus claves
npm run dev            # http://localhost:4321
```

El sitio ya trae **artículos de ejemplo** para que veas el diseño sin configurar nada.

## Claves de API (`.env`)

| Variable | Para qué | Obligatoria |
|---|---|---|
| `ANTHROPIC_API_KEY` | Reescribir los artículos | Sí (para el pipeline) |
| `ANTHROPIC_MODEL` | Modelo de Claude (por defecto `claude-sonnet-5`) | No |
| `UNSPLASH_ACCESS_KEY` | Imágenes | Recomendada |
| `PEXELS_API_KEY` | Imágenes (reserva) | Recomendada |
| `MAX_ARTICLES_PER_RUN` | Límite por ejecución (coste) | No (12) |

Sin claves de imágenes, se usan las ilustraciones de reserva de `public/fallback/`.

## El pipeline

```bash
npm run pipeline        # fetch → reescritura → imagen → publicar
npm run pipeline:dry    # prueba sin gastar API ni escribir archivos
npm run fetch           # solo diagnóstico de las fuentes RSS
```

Pasos (carpeta `scripts/`):

1. **`fetch-news.js`** — descarga y normaliza los feeds RSS de `src/data/sources.json` (con reintentos; una fuente caída no rompe la ejecución).
2. **Deduplicación** — `data/processed.json` guarda el historial (por enlace y por título normalizado) para no repetir artículos entre ejecuciones.
3. **`rewrite-and-translate.js`** — una llamada a Claude por artículo: extrae los hechos, redacta un texto **original** en español, clasifica la categoría y genera el teaser. Reglas editoriales en el *system prompt*.
4. **`fetch-image.js`** — busca imagen relevante libre de derechos. **Nunca** usa la del artículo fuente.
5. **`publish.js`** — escribe el `.md` en `src/content/articles/` y actualiza el historial.

## Estructura

```
scripts/            pipeline (fetch, rewrite, image, publish, orquestador)
src/
  data/sources.json fuentes RSS (activar/desactivar con "enabled")
  lib/              categorías, feed, tiempo, render de tarjeta (compartido cliente/servidor)
  content/articles/ artículos publicados (.md)
  pages/
    index.astro           feed principal (scroll infinito)
    categoria/[category]   feed por categoría
    articulo/[slug]        página de artículo
    feed/                  endpoints JSON paginados para el scroll
  components/        ArticleCard, InfiniteScroll
public/fallback/    imágenes de reserva por categoría
.github/workflows/  cron.yml (actualización automática)
```

## Despliegue en Netlify

1. Sube el repo a GitHub y conéctalo en Netlify (build `npm run build`, publish `dist` — ya está en `netlify.toml`).
2. En **GitHub → Settings → Secrets and variables → Actions**, añade los *secrets*: `ANTHROPIC_API_KEY`, `UNSPLASH_ACCESS_KEY`, `PEXELS_API_KEY` (y opcional `ANTHROPIC_MODEL`). Como *variable*, `MAX_ARTICLES_PER_RUN`.
3. El workflow `.github/workflows/cron.yml` se ejecuta cada 8 h (o a mano desde la pestaña **Actions**): genera artículos, hace commit y push → Netlify redepliega solo.

## Nota editorial y legal

- Los artículos se **redactan de forma original** a partir de los hechos; no se copian ni traducen frase a frase.
- Las **citas textuales y la información no confirmada** se atribuyen expresamente ("según…").
- Las **imágenes** proceden de bancos con licencia (Unsplash/Pexels) o de ilustraciones propias; **nunca** del artículo fuente.
- Cada artículo enlaza a la **fuente original** como cortesía editorial.

Revisa los términos de uso de cada fuente RSS y de las APIs de imágenes antes de publicar en producción.
