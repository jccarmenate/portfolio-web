import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { alternatesFor } from './src/i18n/paths.mjs';

const SITE = 'https://portfolio-web-eight-rose.vercel.app';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  // The whole stylesheet is ~9 KB brotli: inline it so first paint doesn't wait
  // on a second request.
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // Pair each page with its translation (`/proyectos/` ↔ `/en/projects/`).
      serialize(item) {
        const alt = alternatesFor(new URL(item.url).pathname);
        if (alt) {
          item.links = [
            { lang: 'es', url: new URL(alt.es, SITE).href },
            { lang: 'en', url: new URL(alt.en, SITE).href },
            { lang: 'x-default', url: new URL(alt.en, SITE).href },
          ];
        }
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Self-hosted variable fonts (SIL OFL, see src/assets/fonts/OFL.txt): the
  // build never depends on a font CDN being reachable.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Geist',
      cssVariable: '--font-geist',
      fallbacks: ['sans-serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/geist.woff2'], weight: '100 900', style: 'normal' }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      fallbacks: ['monospace'],
      options: {
        variants: [{ src: ['./src/assets/fonts/geist-mono.woff2'], weight: '100 900', style: 'normal' }],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
