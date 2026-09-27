import type { APIRoute } from 'astro';

// Se genera desde Astro.site para que el sitemap nunca quede apuntando
// a un host distinto del canonical.
export const GET: APIRoute = ({ site }) => {
  const cuerpo = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
    '',
  ].join('\n');

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
