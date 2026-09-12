import type { APIRoute } from 'astro';
import { getPublishedArticles, toCardData, paginate } from '../../lib/feed.js';

// Genera /feed/1.json, /feed/2.json, ... con las tarjetas paginadas (todas las categorías).
export async function getStaticPaths() {
  const articles = await getPublishedArticles();
  const pages = paginate(articles.map(toCardData));
  return pages.map((items, i) => ({
    params: { page: String(i + 1) },
    props: { items, page: i + 1, total: pages.length },
  }));
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
