import type { APIRoute } from 'astro';
import { getPublishedArticles, toCardData, paginate } from '../../../lib/feed.js';
import { CATEGORY_SLUGS } from '../../../lib/categories.js';

// Genera /feed/<categoria>/1.json, /2.json, ... con las tarjetas de esa categoría.
export async function getStaticPaths() {
  const paths = [];
  for (const category of CATEGORY_SLUGS) {
    const articles = await getPublishedArticles(category);
    const pages = paginate(articles.map(toCardData));
    for (let i = 0; i < pages.length; i++) {
      paths.push({
        params: { category, page: String(i + 1) },
        props: { items: pages[i], page: i + 1, total: pages.length },
      });
    }
  }
  return paths;
}

export const GET: APIRoute = ({ props }) => {
  const { items, page, total } = props as { items: unknown[]; page: number; total: number };
  return new Response(
    JSON.stringify({
      articles: items,
      page,
      totalPages: total,
      nextPage: page < total ? page + 1 : null,
    }),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  );
};
