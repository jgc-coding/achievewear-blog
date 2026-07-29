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
    id: 'v4',
    name: 'Schnittmuster',
    grad: 'leicht überarbeitet',
    schrift: "'Fraunces Variable', Georgia, serif",
    schriftName: 'Fraunces',
    beschreibung:
      'Die Seite als Schnittmusterbogen. Papierton, Schneiderkreide-Oliv und Rotstift; gestrichelte Zuschneidelinie um jedes Bild, Heftstich statt Zierlinie, Etiketten statt Schreibschrift. Aufbau bleibt wie heute.',
    farben: ['#fbf6ee', '#f2e6d8', '#566b3c', '#c0452f', '#e7bca8'],
  },
  {
    id: 'v5',
    name: 'Tempo',
    grad: 'mittel überarbeitet',
    schrift: "'Archivo Black', sans-serif",
    schriftName: 'Archivo Black',
    beschreibung:
      'Renntag. Alles linksbündig an einer Kante, dicke Signalbalken als Startlinie über Auftakt und Abschnitten, Versalien in schwerer Groteske. Zahlen laufen tabellarisch wie Zwischenzeiten; das Zitat bleibt bewusst leise.',
    farben: ['#f7f4eb', '#ece5d5', '#22252a', '#e2481f', '#2f4a3a'],
  },
  {
    id: 'v6',
    name: 'Stoffbahn',
    grad: 'stark überarbeitet',
    schrift: "'Bricolage Grotesque Variable', sans-serif",
    schriftName: 'Bricolage Grotesque',
    beschreibung:
      'Die Seite aus Stoffbahnen gelegt: große satte Farbfelder, mit der Zackenschere geschnitten. Eigener Auftakt, bei dem sich das Bild über die Kante schiebt; Artikel-Raster versetzt wie aneinandergelegte Bahnen.',
    farben: ['#fffaf1', '#b8512c', '#556a34', '#e9a98f', '#2c241e'],
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

function farbreihe(farben) {
  if (!farben) return '';
  const felder = farben
    .map((farbe) => `<span class="farbe" style="background:${farbe}"></span>`)
    .join('');
  return `\n        <span class="farbreihe">${felder}</span>`;
}

function karte({ titel, unterzeile, text, ziel, schrift, schriftName, farben }) {
  const stil = schrift ? ` style="--karten-schrift:${schrift}"` : '';
  const schriftZeile = schriftName
    ? `\n        <span class="karte-schrift">Schrift: ${schriftName}</span>`
    : '';
  return `      <a class="karte" href="${ziel}"${stil}>
        <span class="karte-grad">${unterzeile}</span>
        <span class="karte-titel">${titel}</span>${farbreihe(farben)}
        <span class="karte-text">${text}</span>${schriftZeile}
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
        padding: clamp(28px, 6vw, 72px) clamp(18px, 5vw, 48px) 72px;
        background: #fbf7f0;
        color: #33302a;
        font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
        line-height: 1.65;
      }
      .huelle { max-width: 880px; margin-inline: auto; }
      .kicker {
        margin: 0 0 14px;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: #b1502f;
      }
      h1 {
        margin: 0 0 18px;
        font-family: 'Fraunces Variable', Georgia, serif;
        font-variation-settings: 'opsz' 100, 'SOFT' 40, 'WONK' 1;
        font-weight: 700;
        font-size: clamp(36px, 7.4vw, 62px);
        line-height: 1;
        letter-spacing: -0.02em;
      }
      .einleitung { max-width: 58ch; color: #6e6858; margin: 0 0 clamp(28px, 5vw, 44px); }
      .raster { display: grid; gap: 12px; }
      .karte {
        display: block;
        padding: clamp(20px, 3.4vw, 30px);
        background: #fff;
        border: 2px solid rgba(51, 48, 42, 0.12);
        text-decoration: none;
        color: inherit;
        transition: border-color 0.25s ease, transform 0.25s ease;
      }
      .karte:hover { border-color: #33302a; transform: translateY(-2px); }
      .karte-grad {
        display: block;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #b1502f;
      }
      .karte-titel {
        display: block;
        margin: 8px 0 0;
        font-family: var(--karten-schrift, 'Fraunces Variable', Georgia, serif);
        font-variation-settings: 'opsz' 100, 'SOFT' 40, 'WONK' 1;
        font-weight: 800;
        font-size: clamp(26px, 4.6vw, 40px);
        letter-spacing: -0.03em;
        line-height: 1;
      }
      .farbreihe { display: flex; gap: 5px; margin: 14px 0 12px; }
      .farbe {
        width: 30px;
        height: 30px;
        border: 1px solid rgba(51, 48, 42, 0.14);
      }
      .karte-text { display: block; max-width: 62ch; color: #6e6858; font-size: 15px; }
      .karte-schrift {
        display: block;
        margin-top: 10px;
        font-size: 12px;
        letter-spacing: 0.04em;
        color: #8b8474;
      }
      .karte-mehr {
        display: inline-block;
        margin-top: 14px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #b1502f;
      }
      .fuss { margin-top: clamp(32px, 5vw, 48px); font-size: 13.5px; color: #8b8474; max-width: 62ch; }
    </style>
  </head>
  <body>
    <div class="huelle">
      <p class="kicker">Zum Vergleichen</p>
      <h1>Vier Wege, dieselbe Seite</h1>
      <p class="einleitung">
        Inhalt, Texte und Bilder sind überall gleich — nur das Aussehen
        unterscheidet sich. Unten auf jeder Varianten-Seite liegt eine Leiste
        zum direkten Umschalten. Einzelne Teile lassen sich mischen: Wenn die
        Schrift der einen und das Farbfeld der anderen gefällt, sag Bescheid.
      </p>
      <div class="raster">
${karte({
  titel: 'Aktuell',
  unterzeile: 'unverändert',
  text: 'Die Website, wie sie heute live ist. Der Vergleichsmaßstab.',
  ziel: '../',
  schrift: "'Cormorant Garamond', Georgia, serif",
})}
${VARIANTEN.map((v) =>
  karte({
    titel: v.name,
    unterzeile: `${v.id} · ${v.grad}`,
    text: v.beschreibung,
    ziel: `${v.id}/`,
    schrift: v.schrift,
    schriftName: v.schriftName,
    farben: v.farben,
  })
).join('\n')}
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
