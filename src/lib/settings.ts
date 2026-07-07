// Typisierte Zugriffe auf die Einstellungs-Collections.
// Fehlende Dateien führen bewusst zu einem lauten Fehler (nie still defaulten).
// Bewusst vier explizite Funktionen statt eines generischen Helpers —
// nur so bleibt die Typ-Zuordnung je Collection erhalten.
import { getEntry } from 'astro:content';

function fehlt(id: string): never {
  throw new Error(`Einstellungen fehlen: src/content/einstellungen/${id}.yml`);
}

export async function getSiteSettings() {
  const entry = await getEntry('site', 'site');
  return entry ? entry.data : fehlt('site');
}

export async function getStartseite() {
  const entry = await getEntry('startseite', 'startseite');
  return entry ? entry.data : fehlt('startseite');
}

export async function getDesign() {
  const entry = await getEntry('design', 'design');
  return entry ? entry.data : fehlt('design');
}

export async function getKategorien() {
  const entry = await getEntry('kategorien', 'kategorien');
  return entry ? entry.data.kategorien : fehlt('kategorien');
}
