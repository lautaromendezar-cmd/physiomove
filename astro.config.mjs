// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El sitio vive en www: el apex redirige a www, asi que el canonical va con www.
// Se puede sobreescribir sin tocar codigo: SITE_URL=https://... npm run build
const site = (process.env.SITE_URL || '').trim() || 'https://www.physiomove.com.ar';

export default defineConfig({
  site,
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  image: {
    // Las fotos ya vienen pre-optimizadas por scripts/preparar-imagenes.mjs
    responsiveStyles: false,
  },
});
