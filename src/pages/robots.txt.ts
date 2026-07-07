// robots.txt — gesteuert über den noindex-Schalter in den Website-Einstellungen:
// noindex an  → Suchmaschinen komplett aussperren (Bau-/Vorlaunch-Phase)
// noindex aus → alles erlauben und auf die Sitemap verweisen (Launch)
import type { APIContext } from 'astro';
import { getSiteSettings } from '../lib/settings';
import { withBase } from '../lib/url';

export async function GET(context: APIContext) {
  const site = await getSiteSettings();

  const body = site.noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(withBase('/sitemap-index.xml'), context.site).href}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
