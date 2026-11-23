// Vorschaubild beim Teilen (og:image) — EINE Stelle für alle Seiten.
// Startseite & Co. nehmen das große Titelbild aus den Startseiten-Einstellungen,
// Artikel ihr Titelbild. So folgt das Teilen-Bild automatisch, wenn Lisa ein
// Foto im Redaktionsbereich tauscht.
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/** Empfohlene Größe für Facebook, WhatsApp, Pinterest-Links & Co. */
export const TEILEN_BREITE = 1200;
export const TEILEN_HOEHE = 630;

/**
 * Liefert die absolute Adresse des Teilen-Bilds (1200×630, mittig zugeschnitten,
 * JPEG — WebP zeigen nicht alle Messenger an). `site` ist Astro.site.
 *
 * SVG-Bilder kann Astro nicht in JPEG umwandeln (still ignoriert, siehe
 * CLAUDE.md). Statt dann ein Bild zu liefern, das viele Dienste nicht anzeigen,
 * gibt es kein Teilen-Bild und eine sichtbare Warnung im Build-Log.
 */
export async function teilenBildUrl(
  bild: ImageMetadata,
  site: URL | undefined
): Promise<string | undefined> {
  if (!site) return undefined;
  if (bild.format === 'svg') {
    console.warn(
      `[AchieveWear] [WARN] Teilen-Bild übersprungen: ${bild.src} ist ein SVG — bitte ein Foto (JPG/PNG) verwenden.`
    );
    return undefined;
  }
  // Astro vergrößert nie. Ist das Foto schmaler als 1200 px, wird kleiner
  // zugeschnitten — aber immer im selben Seitenverhältnis 1200:630.
  const breite = Math.min(TEILEN_BREITE, bild.width);
  const hoehe = Math.round((breite * TEILEN_HOEHE) / TEILEN_BREITE);
  const ergebnis = await getImage({
    src: bild,
    width: breite,
    height: hoehe,
    fit: 'cover',
    format: 'jpg',
    quality: 82,
  });
  return new URL(ergebnis.src, site).href;
}
