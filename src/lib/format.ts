// Datumsformatierung — bewusst deutsch und in Kalendertagen gedacht.
const datumsFormat = new Intl.DateTimeFormat('de-DE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDatum(datum: Date): string {
  return datumsFormat.format(datum);
}

/** Maschinenlesbares Datum für <time datetime="..."> (JJJJ-MM-TT). */
export function isoDatum(datum: Date): string {
  return datum.toISOString().slice(0, 10);
}
