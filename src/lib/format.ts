// Datumsformatierung — bewusst deutsch und in Kalendertagen gedacht.
// Frontmatter-Daten sind reine Datumsangaben, die Zod zu UTC-Mitternacht parst;
// mit timeZone 'UTC' bleibt die Anzeige unabhängig von der Zeitzone des Build-Servers
// (sonst würde ein Server westlich von UTC einen Tag zu früh anzeigen — Off-by-one).
const datumsFormat = new Intl.DateTimeFormat('de-DE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDatum(datum: Date): string {
  return datumsFormat.format(datum);
}

// Kurze Monatsnamen für die runde Datums-Plakette auf den Artikel-Karten.
// Bewusst als eigene Liste statt Intl: Intl liefert je nach Node-/ICU-Version
// "Apr." oder "Apr" (lokal nachgewiesen) — die Plakette soll überall gleich aussehen.
const MONATE_KURZ = [
  'Jan.',
  'Feb.',
  'März',
  'Apr.',
  'Mai',
  'Juni',
  'Juli',
  'Aug.',
  'Sept.',
  'Okt.',
  'Nov.',
  'Dez.',
] as const;

/** Tag und kurzer Monat für die Datums-Plakette: 12. April → { tag: '12', monat: 'Apr.' } */
export function datumPlakette(datum: Date): { tag: string; monat: string } {
  // UTC-Getter — gleicher Grund wie bei formatDatum (kein Off-by-one).
  return { tag: String(datum.getUTCDate()), monat: MONATE_KURZ[datum.getUTCMonth()] };
}

/** Maschinenlesbares Datum für <time datetime="..."> (JJJJ-MM-TT). */
export function isoDatum(datum: Date): string {
  return datum.toISOString().slice(0, 10);
}
