// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El dominio definitivo todavia no esta confirmado por el cliente.
// Se puede sobreescribir sin tocar codigo: SITE_URL=https://... npm run build
const site = (process.env.SITE_URL || '').trim() || 'https://physiomove.com.ar';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  image: {
    // Las fotos ya vienen pre-optimizadas por scripts/preparar-imagenes.mjs
    responsiveStyles: false,
  },
});
