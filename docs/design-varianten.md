# Design-Varianten zum Aussuchen

Drei Entwürfe des Aussehens, damit Lisa vergleichen kann. **Inhalt, Texte und
Bilder sind überall identisch — nur die Optik unterscheidet sich.** Die
bestehende Website bleibt unverändert und ist weiterhin der Vergleichsmaßstab.

Einzelne Teile lassen sich mischen: Schrift von der einen, Farbfeld von der
anderen. Genau dafür sind die drei Richtungen bewusst weit auseinander gelegt.

## Wo anschauen (Handy oder Rechner)

| Seite | Adresse |
| --- | --- |
| Übersicht mit allen vier | https://jgc-coding.github.io/achievewear-blog/varianten/ |
| Aktuell (unverändert) | https://jgc-coding.github.io/achievewear-blog/ |
| V4 „Schnittmuster" | https://jgc-coding.github.io/achievewear-blog/varianten/v4/ |
| V5 „Tempo" | https://jgc-coding.github.io/achievewear-blog/varianten/v5/ |
| V6 „Stoffbahn" | https://jgc-coding.github.io/achievewear-blog/varianten/v6/ |

Unten auf jeder Varianten-Seite schwebt eine Leiste zum direkten Umschalten.
Alle Varianten tragen `noindex` — sie landen in keiner Suchmaschine.

## Die Richtungen

Alle drei bleiben **hell** und in der warmen Farbwelt der Website — nur mit
mehr Pigment statt Pastell. Kraft kommt aus Fläche, Größe und Ausrichtung,
nicht aus Dunkelheit. Die Bildsprache stammt jeweils aus Lisas eigener Welt
statt aus dem allgemeinen Design-Baukasten.

**V4 „Schnittmuster" — leicht überarbeitet.**
Die Seite als Schnittmusterbogen. Papierton, Schneiderkreide-Oliv, Rotstift.
Jedes Bild bekommt die gestrichelte Zuschneidelinie eines Schnittteils, aus der
Zierlinie wird ein Heftstich, aus der Schreibschrift ein Teil-Etikett. Der
Aufbau bleibt exakt wie heute. Schrift: **Fraunces** — eine warme Serife mit
Eigensinn (schräge, handgemacht wirkende Formen), nicht die glatte Modeheft-Serife.

**V5 „Tempo" — mittel überarbeitet.**
Renntag. Alles richtet sich an einer linken Kante aus, dicke Signalbalken
liegen als Startlinie über Auftakt und Abschnitten, Überschriften stehen in
Versalien. Zahlen (Datum, Lesezeit, Seitenzahl) laufen tabellarisch wie
Zwischenzeiten. Das Zitat bleibt bewusst leise — eine kursive Serife als
Gegenstimme. Schrift: **Archivo Black**.

**V6 „Stoffbahn" — stark überarbeitet.**
Die Seite aus Stoffbahnen gelegt: große, satte Farbfelder, mit der
Zackenschere geschnitten. Der Auftakt ist eine Terrakotta-Bahn, über deren
Zackenkante sich das Bild schiebt; das Artikel-Raster liegt versetzt wie
aneinandergelegte Bahnen. Schrift: **Bricolage Grotesque**.

## Wie es technisch funktioniert

- **Eine Umgebungsvariable steuert alles:** `VARIANT=v4|v5|v6` beim Build.
  Ohne diese Variable entsteht die bestehende Website — Zeichen für Zeichen
  dieselbe Ausgabe wie vorher.
- **Steuerstelle:** `src/lib/variante.ts`. Ein unbekannter Wert bricht den
  Build ab (statt still die normale Website zu bauen).
- **Aussehen:** `public/varianten/v4.css` · `v5.css` · `v6.css`, dazu
  `schrift.css` (die drei Anzeigeschriften, selbst gehostet) und `leiste.css`
  (Umschalter). Diese Dateien liegen bewusst in `public/` und werden nur im
  Varianten-Build per `<link>` eingebunden — dadurch bleibt das
  Stylesheet-Paket der echten Website unangetastet.
- **Stolperfalle Rangfolge:** Astro hängt seine gebündelten Stylesheets HINTER
  die eingebundenen `public/`-Dateien. Eine Farbdefinition in `:root` würde
  deshalb von `global.css` überstimmt. Alle Varianten-Regeln hängen darum an
  der ID `#variante` (setzt das BaseLayout nur im Varianten-Build) — eine ID
  gewinnt unabhängig von der Reihenfolge und schlägt auch Astros
  komponenteneigene Styles mit ihren `data-astro-cid`-Attributen.
- **Einziger Eingriff im Markup:** die Startseite bekommt für die stark
  überarbeitete Variante einen eigenen Auftakt (`src/pages/index.astro`,
  gesteuert über `EIGENER_AUFTAKT` in `variante.ts`). Ohne gesetzte Variante
  wird dieser Zweig nicht gerendert.
- **Zackenkante (V6):** zwei übereinandergelegte CSS-Masken — oben ein voller
  Block, unten eine gekachelte Zacke aus einer eingebetteten SVG-Form. Kann ein
  Browser keine Masken, bleibt die Farbbahn gerade abgeschnitten; nichts geht
  kaputt.
- **Schrift-Herkunft:** `@fontsource-variable/fraunces`,
  `@fontsource/archivo-black`, `@fontsource-variable/bricolage-grotesque`
  (devDependencies) — die woff2-Dateien liegen als Kopie in
  `public/varianten/schriften/` samt Lizenz (SIL Open Font License), damit kein
  Build von einem npm-Paket abhängt.
- **Lesbarkeit:** Alle Text-auf-Farbfeld-Kombinationen wurden auf den
  Mindestkontrast 4,5:1 geprüft; zwei gedämpfte Textfarben sind dafür bewusst
  etwas tiefer gesetzt (Kommentar in `v4.css` und `v5.css`).

## Selbst bauen und anschauen

```powershell
# Alle vier auf einmal (wie auf GitHub Pages, aber lokal unter "/")
npm run build:varianten
npm run preview
# → http://localhost:4321/varianten/

# Nur eine Variante im Entwicklungsmodus
$env:VARIANT='v5'; npm run dev
Remove-Item Env:VARIANT
```

## Wenn die Entscheidung gefallen ist

1. Die gewählte Richtung fest in `src/styles/global.css` und die Komponenten
   übernehmen (nicht die Varianten-CSS dauerhaft mitschleppen).
2. In `.github/workflows/deploy.yml` wieder auf `npm run build` umstellen.
3. Löschen: `public/varianten/`, `scripts/varianten-bauen.mjs`,
   `src/lib/variante.ts`, die Varianten-Zweige in `BaseLayout.astro` und
   `index.astro`, `outDir` in `astro.config.mjs`, dieses Dokument.
