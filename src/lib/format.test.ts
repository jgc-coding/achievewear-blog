import { describe, it, expect } from 'vitest';
import { formatDatum, isoDatum } from './format';

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
