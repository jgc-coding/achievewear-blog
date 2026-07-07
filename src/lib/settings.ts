// Typisierte Zugriffe auf die Einstellungs-Collections.
// Fehlende Dateien führen bewusst zu einem lauten Fehler (nie still defaulten).
import { getEntry } from 'astro:content';

async function mustGet<C extends 'site' | 'startseite' | 'design' | 'kategorien'>(
  collection: C,
  id: string
) {
  const entry = await getEntry(collection, id);
  if (!entry) {
    throw new Error(
      `Einstellungen fehlen: src/content/einstellungen/${id}.yml (Collection "${collection}")`
    );
  }
  return entry.data;
}

export const getSiteSettings = () => mustGet('site', 'site');
export const getStartseite = () => mustGet('startseite', 'startseite');
export const getDesign = () => mustGet('design', 'design');
export const getKategorien = async () => (await mustGet('kategorien', 'kategorien')).kategorien;
