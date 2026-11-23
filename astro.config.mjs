// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkLesezeit from './src/plugins/remark-lesezeit.mjs';
import remarkYoutube from './src/plugins/remark-youtube.mjs';

// Einzige Quelle für Site-URL und Base-Pfad (siehe CLAUDE.md, "Eiserne Regeln"):
// - lokal:        Defaults (localhost, Base "/")
// - GitHub Pages: SITE_URL=https://jgc-coding.github.io  BASE_PATH=/achievewear-blog
// - All-Inkl:     SITE_URL=https://achievewear.de        BASE_PATH=/
const SITE_URL = process.env.SITE_URL ?? 'http://localhost:4321';
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // Redaktionsbereich gehört nicht in die Sitemap
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkLesezeit, remarkYoutube],
  },
});
