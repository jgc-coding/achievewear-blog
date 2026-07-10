import { describe, it, expect } from 'vitest';
import remarkLesezeit from './remark-lesezeit.mjs';

// Frisches file-Objekt, wie Astro es dem Plugin übergibt.
const macheFile = () => ({ data: { astro: { frontmatter: {} } } });
// text-Knoten mit n durch Leerzeichen getrennten Wörtern.
const textMitWorten = (n) => ({ type: 'text', value: Array.from({ length: n }, () => 'wort').join(' ') });
// inlineCode-Knoten mit n Wörtern.
const codeMitWorten = (n) => ({ type: 'inlineCode', value: Array.from({ length: n }, () => 'code').join(' ') });
// root-Baum mit einem Absatz, der die übergebenen Knoten enthält.
const baum = (...children) => ({ type: 'root', children: [{ type: 'paragraph', children }] });
// Wendet das Plugin an und gibt die berechnete Lesezeit (Minuten) zurück.
const lesezeit = (tree) => {
  const file = macheFile();
  remarkLesezeit()(tree, file);
  return file.data.astro.frontmatter.lesezeit;
};

describe('remark-lesezeit', () => {
  it('rundet 100 Wörter auf 1 Minute', () => {
    expect(lesezeit(baum(textMitWorten(100)))).toBe(1);
  });

  it('ergibt bei 400 Wörtern 2 Minuten', () => {
    expect(lesezeit(baum(textMitWorten(400)))).toBe(2);
  });

  it('ergibt bei 1000 Wörtern 5 Minuten', () => {
    expect(lesezeit(baum(textMitWorten(1000)))).toBe(5);
  });

  it('gibt für einen leeren Baum die Mindest-Lesezeit 1 zurück', () => {
    expect(lesezeit({ type: 'root', children: [] })).toBe(1);
  });

  it('zählt inlineCode-Wörter mit (100 Text + 300 Code = 400 → 2)', () => {
    // Ohne die inlineCode-Wörter wären es nur 100 Wörter → 1 Minute.
    expect(lesezeit(baum(textMitWorten(100), codeMitWorten(300)))).toBe(2);
  });
});
