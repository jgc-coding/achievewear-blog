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

/** Maschinenlesbares Datum für <time datetime="..."> (JJJJ-MM-TT). */
export function isoDatum(datum: Date): string {
  return datum.toISOString().slice(0, 10);
}
