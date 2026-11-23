import { describe, it, expect } from 'vitest';
import { datumPlakette, formatDatum, isoDatum } from './format';

describe('datumPlakette', () => {
  it('liefert Tag und kurzen deutschen Monat (12. April)', () => {
    expect(datumPlakette(new Date('2026-04-12'))).toEqual({ tag: '12', monat: 'Apr.' });
  });

  // Monatsanfang ist der Off-by-one-Kandidat: westlich von UTC würde ohne
  // UTC-Getter der 30. Juni erscheinen.
  it('bleibt am Monatsersten beim richtigen Tag (1. Juli)', () => {
    expect(datumPlakette(new Date('2026-07-01'))).toEqual({ tag: '1', monat: 'Juli' });
  });

  it('kennt alle zwölf Monate', () => {
    const monate = Array.from({ length: 12 }, (_, i) =>
      datumPlakette(new Date(Date.UTC(2026, i, 15))).monat
    );
    expect(monate).toEqual([
      'Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni',
      'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.',
    ]);
  });
});

describe('formatDatum', () => {
  // Der 24.06. muss der 24. bleiben, egal in welcher Zeitzone der Test-Rechner steht:
  // Frontmatter-Daten sind UTC-Mitternacht, der Formatter nutzt timeZone 'UTC' — sonst
  // gäbe es westlich von UTC einen Off-by-one (Anzeige einen Tag zu früh).
  it('formatiert ein Sommerdatum deutsch (24. Juni 2026)', () => {
    expect(formatDatum(new Date('2026-06-24'))).toBe('24. Juni 2026');
  });

  // Winter-/DST-Gegenprobe: auch am Jahresanfang kein Off-by-one.
  it('formatiert ein Winterdatum deutsch (1. Januar 2026)', () => {
    expect(formatDatum(new Date('2026-01-01'))).toBe('1. Januar 2026');
  });
});

describe('isoDatum', () => {
  it('gibt das maschinenlesbare ISO-Datum (JJJJ-MM-TT) zurück', () => {
    expect(isoDatum(new Date('2026-06-24'))).toBe('2026-06-24');
  });
});
