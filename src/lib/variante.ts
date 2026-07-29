// Design-Varianten zum Vergleichen (Vorschau-Entwürfe, nicht die echte Website).
//
// Gesteuert über die Umgebungsvariable VARIANT beim Build:
//   VARIANT leer  → die aktuelle Website, exakt wie bisher (Standardfall)
//   VARIANT=v1|v2|v3 → eine der Entwurfs-Varianten
//
// Alles Varianten-Spezifische hängt an dieser einen Stelle. Ist VARIANT nicht
// gesetzt, entsteht ausgabeseitig kein einziges zusätzliches Zeichen — die
// bestehende Website bleibt unangetastet.

export const VARIANTEN = ['v1', 'v2', 'v3'] as const;
export type Variante = (typeof VARIANTEN)[number];

const roh = (process.env.VARIANT ?? '').trim();

// Tippfehler sollen laut scheitern statt still die Standard-Website zu bauen.
if (roh && !(VARIANTEN as readonly string[]).includes(roh)) {
  throw new Error(
    `Unbekannte Variante "${roh}". Erlaubt: ${VARIANTEN.join(', ')} — oder VARIANT leer lassen für die aktuelle Website.`
  );
}

export const VARIANTE: Variante | '' = roh as Variante | '';

/** Anzeigenamen für die Umschalt-Leiste und die Übersichtsseite. */
export const VARIANTEN_INFO: Record<Variante, { name: string; beschreibung: string }> = {
  v1: {
    name: 'Frisch',
    beschreibung: 'Gleicher Aufbau, kräftige Schrift, Limette als Signalfarbe.',
  },
  v2: {
    name: 'Kraft',
    beschreibung: 'Dunkle Bänder, großer Auftritt, klare Kanten statt Rahmen.',
  },
  v3: {
    name: 'Bold',
    beschreibung: 'Dunkles Magazin-Layout, Artikel als Index-Liste, voller Kontrast.',
  },
};

/**
 * Wurzel des gesamten Vorschau-Pakets. Die Varianten liegen unter
 * <wurzel>/varianten/vN, die aktuelle Website unter <wurzel>/ — der Pfad
 * lässt sich also aus dem Base-Pfad des laufenden Builds ableiten.
 */
export function wurzelPfad(): string {
  const basis = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return basis.replace(/\/varianten\/v\d+$/, '');
}
