// Zentrale Helfer für den Base-Pfad. Auf GitHub Pages läuft die Seite unter
// /achievewear-blog/, auf All-Inkl später unter /. Deshalb gilt (CLAUDE.md):
// interne Pfade NIE hart mit führendem "/" verlinken — immer withBase() benutzen.

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Hängt den Base-Pfad vor einen internen Pfad: withBase('/blog') → '/achievewear-blog/blog' */
export function withBase(path: string): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `${BASE}/${clean}` : `${BASE}/`;
}

/** Interne CMS-Links (z. B. "/ueber-mich") bekommen den Base-Pfad, externe bleiben unverändert. */
export function linkUrl(url: string): string {
  return /^https?:\/\//.test(url) ? url : withBase(url);
}

/** Absolute URL für RSS, Canonical und Open Graph. `site` ist Astro.site. */
export function absUrl(path: string, site: URL | string | undefined): string {
  if (!site) return withBase(path);
  return new URL(withBase(path), site).href;
}
