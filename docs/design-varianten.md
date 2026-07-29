# Design-Varianten zum Aussuchen

Drei Entwürfe des Aussehens, damit Lisa vergleichen kann. **Inhalt, Texte und
Bilder sind überall identisch — nur die Optik unterscheidet sich.** Die
bestehende Website bleibt unverändert und ist weiterhin der Vergleichsmaßstab.

## Wo anschauen (Handy oder Rechner)

| Seite | Adresse |
| --- | --- |
| Übersicht mit allen vier | https://jgc-coding.github.io/achievewear-blog/varianten/ |
| Aktuell (unverändert) | https://jgc-coding.github.io/achievewear-blog/ |
| V1 „Frisch" | https://jgc-coding.github.io/achievewear-blog/varianten/v1/ |
| V2 „Kraft" | https://jgc-coding.github.io/achievewear-blog/varianten/v2/ |
| V3 „Bold" | https://jgc-coding.github.io/achievewear-blog/varianten/v3/ |

Unten auf jeder Varianten-Seite schwebt eine Leiste zum direkten Umschalten.
Alle Varianten tragen `noindex` — sie landen in keiner Suchmaschine.

## Was die drei unterscheidet

Gemeinsam ist allen dreien: **Archivo Black** als Überschriften-Schrift
(die kräftige Groteske aus Lisas Vorlage), **Limette** als Signalfarbe, keine
Schreibschrift mehr, gerade Kanten statt runder Ecken. Der weibliche Anteil
bleibt über warme Töne (Altrosé/Clay) und die kursive Serife erhalten.

**V1 „Frisch" — leicht überarbeitet.**
Gleicher Seitenaufbau wie heute. Getauscht sind Schrift, Farbtiefe und die
verspielten Kleinteile: Überschriften in Archivo Black statt Serife, aus der
Schreibschrift wird eine kursive Serife, das Polaroid steht gerade statt
schräg, das Zitat-Band ist dunkel, der Newsletter-Block leuchtet limette.

**V2 „Kraft" — mittel überarbeitet.**
Dunkle mitlaufende Kopfzeile mit Limetten-Logo, randloser dunkler Auftakt mit
Riesen-Überschrift, alles linksbündig (Magazin-Charakter), Bilder ohne weißen
Rahmen mit Zoom beim Überfahren, dunkle Fußzeile.

**V3 „Bold" — stark überarbeitet.**
Dunkles Magazin-Layout. Eigener Auftakt mit Riesen-Schriftzug und Laufband,
Artikel-Übersicht als Index-Liste statt Karten-Raster, Zitat als leuchtendes
Limetten-Band, Altrosé als warmer Gegenpol.

## Wie es technisch funktioniert

- **Eine Umgebungsvariable steuert alles:** `VARIANT=v1|v2|v3` beim Build.
  Ohne diese Variable entsteht die bestehende Website — Zeichen für Zeichen
  dieselbe Ausgabe wie vorher.
- **Steuerstelle:** `src/lib/variante.ts`. Ein unbekannter Wert bricht den
  Build ab (statt still die normale Website zu bauen).
- **Aussehen:** `public/varianten/v1.css` · `v2.css` · `v3.css`, dazu
  `schrift.css` (Archivo Black, selbst gehostet) und `leiste.css` (Umschalter).
  Diese Dateien liegen bewusst in `public/` und werden nur im Varianten-Build
  per `<link>` eingebunden — dadurch bleibt das Stylesheet-Paket der echten
  Website unangetastet.
- **Stolperfalle Rangfolge:** Astro hängt seine gebündelten Stylesheets HINTER
  die eingebundenen `public/`-Dateien. Eine Farbdefinition in `:root` würde
  deshalb von `global.css` überstimmt. Alle Varianten-Regeln hängen darum an
  der ID `#variante` (setzt das BaseLayout nur im Varianten-Build) — eine ID
  gewinnt unabhängig von der Reihenfolge und schlägt auch Astros
  komponenteneigene Styles mit ihren `data-astro-cid`-Attributen.
- **Einziger Eingriff im Markup:** die Startseite bekommt für V3 einen eigenen
  Auftakt (`src/pages/index.astro`). Ohne gesetzte Variante wird dieser Zweig
  nicht gerendert.
- **Schrift-Herkunft:** `@fontsource/archivo-black` (devDependency) — die
  woff2-Datei liegt als Kopie in `public/varianten/schriften/` samt Lizenz
  (SIL Open Font License), damit kein Build von einem npm-Paket abhängt.

## Selbst bauen und anschauen

```powershell
# Alle vier auf einmal (wie auf GitHub Pages, aber lokal unter "/")
npm run build:varianten
npm run preview
# → http://localhost:4321/varianten/

# Nur eine Variante im Entwicklungsmodus
$env:VARIANT='v2'; npm run dev
Remove-Item Env:VARIANT
```

## Wenn die Entscheidung gefallen ist

1. Die gewählte Variante fest in `src/styles/global.css` und die Komponenten
   übernehmen (nicht die Varianten-CSS dauerhaft mitschleppen).
2. In `.github/workflows/deploy.yml` wieder auf `npm run build` umstellen.
3. Löschen: `public/varianten/`, `scripts/varianten-bauen.mjs`,
   `src/lib/variante.ts`, die Varianten-Zweige in `BaseLayout.astro` und
   `index.astro`, `outDir` in `astro.config.mjs`, dieses Dokument.
