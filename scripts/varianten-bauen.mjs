// ============================================================
// Baut die aktuelle Website UND die drei Design-Varianten in EIN Paket:
//
//   dist/                      → die aktuelle Website (unverändert)
//   dist/varianten/            → Übersichtsseite zum Umschalten
//   dist/varianten/v1|v2|v3/   → die Entwurfs-Varianten
//
// Aufruf:   npm run build:varianten
// Umgebung: SITE_URL und BASE_PATH wie beim normalen Build.
//
// Bewusst als Node-Skript statt als Kette von Shell-Befehlen: So läuft
// derselbe Ablauf unter Windows (PowerShell) und in der GitHub-Action.
// ============================================================

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const wurzel = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const astroBin = path.join(wurzel, 'node_modules', 'astro', 'astro.js');
const pagefindBin = path.join(wurzel, 'node_modules', 'pagefind', 'lib', 'runner', 'bin.cjs');

// Fehlende Werkzeuge sollen laut scheitern statt halbe Pakete zu erzeugen.
for (const datei of [astroBin, pagefindBin]) {
  if (!existsSync(datei)) {
    throw new Error(`Nicht gefunden: ${datei} — wurde "npm ci" ausgeführt?`);
  }
}

const VARIANTEN = [
  {
    id: 'v1',
    name: 'Frisch',
    grad: 'leicht überarbeitet',
    beschreibung:
      'Gleicher Aufbau wie heute. Neue Überschriften-Schrift, Limette als Signalfarbe, keine Schreibschrift mehr, gerade Kanten.',
  },
  {
    id: 'v2',
    name: 'Kraft',
    grad: 'mittel überarbeitet',
    beschreibung:
      'Dunkle mitlaufende Kopfzeile, randloser dunkler Auftakt mit Riesen-Überschrift, alles linksbündig, Bilder ohne Rahmen.',
  },
  {
    id: 'v3',
    name: 'Bold',
    grad: 'stark überarbeitet',
    beschreibung:
      'Dunkles Magazin-Layout mit Laufband, Artikel als Index-Liste statt Karten, Zitat als leuchtendes Band.',
  },
];

// '' oder z. B. '/achievewear-blog'
const basisPfad = (process.env.BASE_PATH ?? '/').replace(/\/+$/, '');

function lauf(beschreibung, datei, argumente, zusatzEnv = {}) {
  console.log(`\n=== ${beschreibung} ===`);
  const ergebnis = spawnSync(process.execPath, [datei, ...argumente], {
    cwd: wurzel,
    stdio: 'inherit',
    env: { ...process.env, ...zusatzEnv },
  });
  if (ergebnis.error) throw ergebnis.error;
  if (ergebnis.status !== 0) {
    throw new Error(`${beschreibung} fehlgeschlagen (Exit-Code ${ergebnis.status}).`);
  }
}

// ---------- 1. Die aktuelle Website ----------
// VARIANT wird ausdrücklich geleert: Ein von außen gesetzter Wert darf die
// echte Website nicht heimlich zu einer Variante machen.
lauf('Aktuelle Website bauen', astroBin, ['build'], {
  VARIANT: '',
  OUT_DIR: './dist',
  BASE_PATH: basisPfad || '/',
});
lauf('Suchindex (aktuelle Website)', pagefindBin, ['--site', 'dist']);

// ---------- 2. Die Varianten ----------
for (const variante of VARIANTEN) {
  const zielOrdner = `./dist/varianten/${variante.id}`;
  lauf(`Variante ${variante.id} (${variante.name}) bauen`, astroBin, ['build'], {
    VARIANT: variante.id,
    OUT_DIR: zielOrdner,
    BASE_PATH: `${basisPfad}/varianten/${variante.id}`,
  });
  lauf(`Suchindex (${variante.id})`, pagefindBin, ['--site', `dist/varianten/${variante.id}`]);
}

// ---------- 3. Übersichtsseite ----------

function karte(titel, unterzeile, text, ziel, akzent) {
  return `      <a class="karte${akzent ? ' karte--akzent' : ''}" href="${ziel}">
        <span class="karte-grad">${unterzeile}</span>
        <span class="karte-titel">${titel}</span>
        <span class="karte-text">${text}</span>
        <span class="karte-mehr">Ansehen &rarr;</span>
      </a>`;
}

const uebersicht = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>AchieveWear — Design-Varianten</title>
    <link rel="stylesheet" href="schrift.css" />
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: clamp(28px, 6vw, 72px) clamp(18px, 5vw, 48px) 64px;
        background: #101109;
        color: #f2efe3;
        font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
        line-height: 1.65;
      }
      .huelle { max-width: 900px; margin-inline: auto; }
      .kicker {
        margin: 0 0 14px;
        font-family: 'Archivo Black', sans-serif;
        font-size: 12px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: #dcfb4f;
      }
      h1 {
        margin: 0 0 18px;
        font-family: 'Archivo Black', sans-serif;
        font-weight: 400;
        font-size: clamp(36px, 8vw, 68px);
        line-height: 0.92;
        letter-spacing: -0.035em;
        text-transform: uppercase;
      }
      .einleitung { max-width: 60ch; color: rgba(242, 239, 227, 0.72); margin: 0 0 clamp(28px, 5vw, 44px); }
      .raster { display: grid; gap: 14px; }
      .karte {
        display: block;
        padding: clamp(20px, 3.4vw, 30px);
        border: 1px solid rgba(242, 239, 227, 0.16);
        text-decoration: none;
        color: inherit;
        transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
      }
      .karte:hover { border-color: #dcfb4f; background: rgba(220, 251, 79, 0.05); transform: translateY(-2px); }
      .karte--akzent { border-color: rgba(242, 239, 227, 0.4); }
      .karte-grad {
        display: block;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #dcfb4f;
      }
      .karte-titel {
        display: block;
        margin: 8px 0 8px;
        font-family: 'Archivo Black', sans-serif;
        font-size: clamp(24px, 4.4vw, 36px);
        letter-spacing: -0.03em;
        text-transform: uppercase;
        line-height: 1;
      }
      .karte-text { display: block; max-width: 62ch; color: rgba(242, 239, 227, 0.72); font-size: 15px; }
      .karte-mehr {
        display: inline-block;
        margin-top: 14px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #dcfb4f;
      }
      .fuss { margin-top: clamp(32px, 5vw, 48px); font-size: 13.5px; color: rgba(242, 239, 227, 0.5); max-width: 62ch; }
    </style>
  </head>
  <body>
    <div class="huelle">
      <p class="kicker">Zum Vergleichen</p>
      <h1>Vier Wege,<br />dieselbe Seite</h1>
      <p class="einleitung">
        Inhalt, Texte und Bilder sind überall identisch — nur das Aussehen
        unterscheidet sich. Unten auf jeder Varianten-Seite liegt eine Leiste,
        mit der sich direkt umschalten lässt.
      </p>
      <div class="raster">
${karte('Aktuell', 'unverändert', 'Die Website, wie sie heute live ist. Der Vergleichsmaßstab.', '../', true)}
${VARIANTEN.map((v) => karte(v.name, `${v.id} · ${v.grad}`, v.beschreibung, `${v.id}/`, false)).join('\n')}
      </div>
      <p class="fuss">
        Entwurfs-Stand zum Anschauen und Aussuchen. Alle Varianten sind für
        Suchmaschinen gesperrt (noindex) und ändern nichts an der echten Website.
      </p>
    </div>
  </body>
</html>
`;

const uebersichtOrdner = path.join(wurzel, 'dist', 'varianten');
mkdirSync(uebersichtOrdner, { recursive: true });
writeFileSync(path.join(uebersichtOrdner, 'index.html'), uebersicht, 'utf8');

console.log('\n=== Fertig ===');
console.log(`Aktuelle Website : dist/            (${basisPfad || '/'})`);
for (const variante of VARIANTEN) {
  console.log(
    `Variante ${variante.id}     : dist/varianten/${variante.id}/ (${basisPfad}/varianten/${variante.id}/)`
  );
}
console.log(`Übersicht        : dist/varianten/  (${basisPfad}/varianten/)`);
