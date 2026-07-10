import { describe, it, expect } from 'vitest';
import remarkYoutube from './remark-youtube.mjs';

// Baut einen paragraph-Knoten mit genau den übergebenen Kind-Knoten.
const absatz = (...children) => ({ type: 'paragraph', children });
// Absatz, dessen einziges Kind ein text-Knoten mit der URL ist.
const textAbsatz = (url) => absatz({ type: 'text', value: url });
// Absatz, dessen einziges Kind ein link-Knoten mit der URL ist.
const linkAbsatz = (url) =>
  absatz({ type: 'link', url, children: [{ type: 'text', value: url }] });
// Wendet das Plugin auf einen frisch gebauten root-Baum an (mutiert in place) und gibt ihn zurück.
const wandle = (...children) => {
  const tree = { type: 'root', children };
  remarkYoutube()(tree);
  return tree;
};

const VIDEO_ID = 'dQw4w9WgXcQ';

describe('remark-youtube — Positivfälle (Absatz wird zu html-Knoten mit richtiger data-yt-id)', () => {
  it('wandelt eine watch?v=-URL als text-Knoten um', () => {
    const tree = wandle(textAbsatz(`https://www.youtube.com/watch?v=${VIDEO_ID}`));
    expect(tree.children[0].type).toBe('html');
    expect(tree.children[0].value).toContain(`data-yt-id="${VIDEO_ID}"`);
  });

  it('wandelt eine youtu.be-URL als link-Knoten um', () => {
    const tree = wandle(linkAbsatz(`https://youtu.be/${VIDEO_ID}`));
    expect(tree.children[0].type).toBe('html');
    expect(tree.children[0].value).toContain(`data-yt-id="${VIDEO_ID}"`);
  });

  it('wandelt eine shorts/-URL um', () => {
    const tree = wandle(textAbsatz(`https://www.youtube.com/shorts/${VIDEO_ID}`));
    expect(tree.children[0].type).toBe('html');
    expect(tree.children[0].value).toContain(`data-yt-id="${VIDEO_ID}"`);
  });

  it('wandelt eine embed/-URL um', () => {
    const tree = wandle(textAbsatz(`https://www.youtube.com/embed/${VIDEO_ID}`));
    expect(tree.children[0].type).toBe('html');
    expect(tree.children[0].value).toContain(`data-yt-id="${VIDEO_ID}"`);
  });

  it('wandelt eine youtube-nocookie.com-URL um', () => {
    const tree = wandle(textAbsatz(`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`));
    expect(tree.children[0].type).toBe('html');
    expect(tree.children[0].value).toContain(`data-yt-id="${VIDEO_ID}"`);
  });

  it('wandelt eine URL mit ?t=30-Anhang um', () => {
    const tree = wandle(textAbsatz(`https://youtu.be/${VIDEO_ID}?t=30`));
    expect(tree.children[0].type).toBe('html');
    expect(tree.children[0].value).toContain(`data-yt-id="${VIDEO_ID}"`);
  });
});

describe('remark-youtube — Negativfälle (Absatz bleibt paragraph)', () => {
  it('lässt einen Absatz mit URL UND weiterem Text (zwei Kinder) unangetastet', () => {
    const tree = wandle(
      absatz(
        { type: 'text', value: 'Schau mal: ' },
        { type: 'text', value: `https://www.youtube.com/watch?v=${VIDEO_ID}` },
      ),
    );
    expect(tree.children[0].type).toBe('paragraph');
  });

  it('lässt eine vimeo.com-URL unangetastet', () => {
    const tree = wandle(textAbsatz('https://vimeo.com/123456789'));
    expect(tree.children[0].type).toBe('paragraph');
  });

  it('lässt eine youtu.be-URL mit nur 10-Zeichen-ID unangetastet', () => {
    // 'abcdefghij' sind 10 Zeichen — die Regex verlangt exakt 11.
    const tree = wandle(textAbsatz('https://youtu.be/abcdefghij'));
    expect(tree.children[0].type).toBe('paragraph');
  });
});

describe('remark-youtube — Rekursion', () => {
  it('wandelt einen YouTube-Absatz auch innerhalb eines blockquote um', () => {
    const blockquote = {
      type: 'blockquote',
      children: [textAbsatz(`https://www.youtube.com/watch?v=${VIDEO_ID}`)],
    };
    const tree = wandle(blockquote);
    // Der blockquote bleibt bestehen, sein Kind-Absatz wird zum html-Knoten.
    expect(tree.children[0].type).toBe('blockquote');
    expect(tree.children[0].children[0].type).toBe('html');
    expect(tree.children[0].children[0].value).toContain(`data-yt-id="${VIDEO_ID}"`);
  });
});
