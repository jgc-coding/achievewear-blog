import { describe, it, expect, vi, beforeEach } from 'vitest';

// url.ts liest import.meta.env.BASE_URL EINMALIG beim Modul-Laden (const BASE = ...).
// Deshalb lässt sich der Base-Pfad nicht pro Testfall umschalten, sobald das Modul
// einmal importiert wurde. Lösung: Modul-Registry vor jedem Test zurücksetzen und pro
// Base-Variante die Env frisch stubben und das Modul frisch importieren.
const ladeUrl = async (base: string) => {
  vi.stubEnv('BASE_URL', base);
  return await import('./url');
};

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
});

describe('withBase', () => {
  describe('ohne Base-Pfad (BASE_URL "/")', () => {
    it('lässt einen absoluten internen Pfad unverändert', async () => {
      const { withBase } = await ladeUrl('/');
      expect(withBase('/blog')).toBe('/blog');
    });

    it('gibt für "/" die Wurzel "/" zurück', async () => {
      const { withBase } = await ladeUrl('/');
      expect(withBase('/')).toBe('/');
    });
  });

  describe('mit Base-Pfad, MIT Trailing-Slash (BASE_URL "/achievewear-blog/")', () => {
    it('stellt den Base-Pfad einem absoluten Pfad voran', async () => {
      const { withBase } = await ladeUrl('/achievewear-blog/');
      expect(withBase('/blog')).toBe('/achievewear-blog/blog');
    });

    it('behandelt einen Pfad ohne führenden Slash identisch', async () => {
      const { withBase } = await ladeUrl('/achievewear-blog/');
      expect(withBase('blog')).toBe('/achievewear-blog/blog');
    });

    it('gibt für "/" den Base-Pfad mit Trailing-Slash zurück', async () => {
      const { withBase } = await ladeUrl('/achievewear-blog/');
      expect(withBase('/')).toBe('/achievewear-blog/');
    });
  });

  // Astro-Stolperstein: import.meta.env.BASE_URL kommt je nach Kontext mal MIT, mal OHNE
  // Trailing-Slash. Beide Varianten müssen exakt dasselbe Ergebnis liefern (CLAUDE.md).
  describe('mit Base-Pfad, OHNE Trailing-Slash (BASE_URL "/achievewear-blog")', () => {
    it('stellt den Base-Pfad einem absoluten Pfad voran', async () => {
      const { withBase } = await ladeUrl('/achievewear-blog');
      expect(withBase('/blog')).toBe('/achievewear-blog/blog');
    });

    it('behandelt einen Pfad ohne führenden Slash identisch', async () => {
      const { withBase } = await ladeUrl('/achievewear-blog');
      expect(withBase('blog')).toBe('/achievewear-blog/blog');
    });

    it('gibt für "/" den Base-Pfad mit Trailing-Slash zurück', async () => {
      const { withBase } = await ladeUrl('/achievewear-blog');
      expect(withBase('/')).toBe('/achievewear-blog/');
    });
  });
});

describe('linkUrl', () => {
  it('lässt eine externe https-Adresse unverändert', async () => {
    const { linkUrl } = await ladeUrl('/achievewear-blog/');
    expect(linkUrl('https://example.com/x')).toBe('https://example.com/x');
  });

  it('lässt eine externe http-Adresse unverändert', async () => {
    const { linkUrl } = await ladeUrl('/achievewear-blog/');
    expect(linkUrl('http://example.com/x')).toBe('http://example.com/x');
  });

  it('stellt einem internen CMS-Link den Base-Pfad voran', async () => {
    const { linkUrl } = await ladeUrl('/achievewear-blog/');
    expect(linkUrl('/ueber-mich')).toBe('/achievewear-blog/ueber-mich');
  });
});

describe('absUrl', () => {
  it('baut mit site und Base-Pfad eine absolute URL', async () => {
    const { absUrl } = await ladeUrl('/achievewear-blog/');
    expect(absUrl('/blog', 'https://jgc-coding.github.io')).toBe(
      'https://jgc-coding.github.io/achievewear-blog/blog',
    );
  });

  it('fällt ohne site auf das withBase-Ergebnis zurück', async () => {
    const { absUrl, withBase } = await ladeUrl('/achievewear-blog/');
    expect(absUrl('/blog', undefined)).toBe(withBase('/blog'));
  });
});
