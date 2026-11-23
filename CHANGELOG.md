# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/), Versionierung nach [SemVer](https://semver.org/lang/de/).

## [0.5.1] — 2026-11-23

### Geändert
- **Vorschaubild beim Teilen** (WhatsApp, Pinterest, Facebook) im neuen Stil: Startseite und alle festen Seiten zeigen das große Titelbild, Artikel ihr eigenes Titelbild — jeweils 1200 × 630, mittig zugeschnitten. Tauscht Lisa ein Foto im Redaktionsbereich, folgt das Teilen-Bild automatisch. Die alte Pastell-Illustration ist entfernt.

### Behoben
- Geteilte Artikel lieferten ihr Vorschaubild als WebP, das nicht jeder Messenger anzeigt — jetzt JPEG.

## [0.5.0] — 2026-11-23

Neues Aussehen nach Lisas Vorlage (der Blog „Make it Yours", vor allem die Handy-Ansicht) — in Lisas eigenen Farben und Schriften. Die Design-Varianten V4–V6 sind damit erledigt und entfernt.

### Geändert
- **Stil wie die Vorlage:** viel Weißraum, weißer Grund mit Farbbändern in Creme und Mint, schlanke Serifen-Überschriften (Cormorant Garamond), Fließtext in Inter mit mindestens 16 px und Zeilenabstand 1,7. Umrandete rechteckige Knöpfe, die beim Darüberfahren dunkel werden.
- **Lisas CI-Farben:** Volt und Volt tief neu im Redaktionsbereich (Volt nur auf Anthrazit, Volt tief nur als Linie); die beiden Altrosé-Töne sind entfallen. Jedes Farbfeld erklärt jetzt, wo die Farbe auftaucht.
- **Keine Schreibschrift mehr** außer im Logo-Wort „wear“ (Teil von Lisas CI). Frühere Schreibschrift-Zeilen sind jetzt kursive Serifen-Zeilen.
- **Kopfzeile:** am Handy Menü-Knopf links, Logo in der Mitte, Lupe rechts; das Menü klappt unter der Kopfzeile auf. Am Desktop Menü links und rechts vom Logo.
- **Startseite neu aufgebaut:** großes Titelbild mit Schriftzug und kursiver Zeile · Willkommen · „Neu im Blog“ (neuester Artikel groß) · Themen als drei runde Bilder auf schrägem Creme-Band · „Aus dem Blog“ (am Handy zum Wischen) · Über mich halb Bild, halb Text · Zitat · Newsletter-Band in Mint.
- **Artikel-Karten:** Bild quer mit runder Datums-Plakette (Anthrazit mit Volt), Kategorie, Titel, kurze Linie, Anriss, „Lesen“.
- **Artikelseite:** der Artikel steht als weißes Blatt mit feiner Kante; Meta-Zeile „Veröffentlicht am … · Lesezeit“; Zitate im Text als helle Kästen.
- **Fußzeile** mit den Spalten „Rechtliches“ und „Links“.
- Platzhalter-Illustrationen durch Platzhalter-Fotos ersetzt (Titelbild, Über mich, drei Themen, drei Artikelbilder) — bis Lisa eigene Fotos einstellt.

### Hinzugefügt
- „Über mich“-Kasten am Ende der Blog-Übersicht, der Themenseiten und jedes Artikels (liest den Über-mich-Bereich der Startseite).
- Neue Felder im Redaktionsbereich: „Kursive Zeile im Titelbild“ und der Bereich „Themen“ — beide mit Vorgabewerten, alte Einstellungen bleiben gültig.
- Test für die Datums-Plakette (alle zwölf Monate, Monatsanfang ohne Off-by-one).

### Entfernt
- Design-Varianten V4–V6 samt Vergleichsseite `/varianten/`, Varianten-Build und drei Varianten-Schriften (Rückkehrpunkt: Tag `v0.4.0`).

### Behoben
- Tests liefen lokal dreifach mit, weil Arbeitskopien unter `.claude/worktrees/` mitgezählt wurden.
- Die Blog-Übersicht hatte keine Hauptüberschrift (h1) — jetzt „Der Blog“.

## [0.4.0] — 2026-07-29

Zweiter Anlauf bei den Design-Varianten: Die erste Runde (dunkel, Neon-Akzent) gefiel nicht. Drei neue Entwürfe, alle hell, in der warmen Farbwelt der Website — kräftig durch Fläche, Größe und Ausrichtung statt durch Dunkelheit.

### Geändert
- **Varianten ersetzt:** `v1|v2|v3` entfernt, dafür `v4` „Schnittmuster" (leicht), `v5` „Tempo" (mittel), `v6` „Stoffbahn" (stark). Neue Kennungen statt Wiederverwendung, damit ein alter Link nicht plötzlich etwas anderes zeigt.
- Die Bildsprache kommt aus Lisas eigener Welt statt aus dem allgemeinen Design-Baukasten: Zuschneidelinien und Heftstich (V4), Startlinie und Zwischenzeiten-Ziffern (V5), Zackenschnitt-Kante an den Farbbahnen (V6).
- Übersichtsseite und Umschalt-Leiste jetzt hell, die Übersicht zeigt je Variante Farbfelder und Schriftname.
- Kategorie-Farbe in `PostKarte.astro` kommt als CSS-Variable statt als direkte Farbe im style-Attribut — Inline-Farben lassen sich sonst nicht überschreiben. Die Darstellung bleibt gleich.

### Hinzugefügt
- Zwei weitere selbst gehostete Anzeigeschriften (SIL Open Font License): **Fraunces** (V4) und **Bricolage Grotesque** (V6); **Archivo Black** bleibt für V5.
- Alle Text-auf-Farbfeld-Kombinationen auf den Mindestkontrast 4,5:1 geprüft; zwei gedämpfte Textfarben dafür bewusst tiefer gesetzt.

## [0.3.0] — 2026-07-29

Drei Design-Varianten zum Aussuchen — kräftiger, kühler, weniger verspielt. Die bestehende Website bleibt unverändert live und dient als Vergleichsmaßstab.

### Hinzugefügt
- **Drei Entwurfs-Varianten** unter `/varianten/v1|v2|v3` plus Übersichtsseite unter `/varianten/`, mit unterschiedlich starkem Abstand zum heutigen Stand: V1 „Frisch" (leicht), V2 „Kraft" (mittel), V3 „Bold" (stark). Gleicher Inhalt, nur andere Optik; alle mit `noindex`.
- **Archivo Black** als Überschriften-Schrift der Varianten (selbst gehostet aus `@fontsource/archivo-black`, SIL Open Font License) — die kräftige Groteske aus der Vorlage.
- **Umschalt-Leiste** am unteren Rand jeder Varianten-Seite: springt direkt zwischen den Varianten und zurück zur aktuellen Website (auch auf dem Handy).
- **Varianten-Build** `npm run build:varianten` (`scripts/varianten-bauen.mjs`): baut die echte Website plus alle Varianten in ein Paket; der Deploy nutzt ihn.
- `docs/design-varianten.md` — was die Varianten unterscheidet, wie man sie lokal baut und wie man sie nach der Entscheidung wieder entfernt.

### Geändert
- `astro.config.mjs` kennt `OUT_DIR` (Zielordner aus der Umgebung) — nötig, damit die Varianten in Unterordner von `dist/` bauen.
- GitHub-Action baut mit `npm run build:varianten` statt `npm run build`. Die echte Website entsteht dabei aus demselben Ablauf wie vorher.

## [0.2.0] — 2026-07-10

Qualitätspaket nach Projekt-Analyse: zwei Live-Bugs behoben, CMS gegen Fehleingaben abgesichert, Suche + Teilen-Bilder + Testfundament ergänzt.

### Hinzugefügt
- **Volltext-Suche** unter `/suche` (Pagefind — rein statisch, keine externen Requests): durchsucht genau die veröffentlichten Blog-Artikel; Suche-Link in der Fußzeile; im lokalen Dev-Modus erscheint ein Hinweis statt der Suche (Index entsteht beim Build).
- **Standard-Teilen-Bild** für alle Seiten ohne eigenes Bild (og:image-Fallback, textfreie Marken-Illustration 1200×630) plus `twitter:card` — Artikel behalten weiterhin ihr Titelbild. Design-Quelle `src/assets/og-standard.svg`, Neu-Raster-Befehl im Kommentar.
- **Testfundament:** 31 Vitest-Tests für die Kern-Helfer (Base-Pfad inkl. Trailing-Slash-Fall, UTC-Datumsformat, YouTube- und Lesezeit-Plugin); `npm test`.
- Sichtbarer **RSS-Link** in der Fußzeile.

### Behoben
- **Kategorie-Seiten waren live ungestylt** (Filter-Leiste als nackte Links, Artikel ohne Raster): geteilte Styles der Blog-Übersicht nach `global.css` verschoben — Astro legt Seiten-Styles nur in die eigene Route.
- **YouTube-Video-Boxen auf festen Seiten** (z. B. Über mich) waren ohne Funktion: Klick-Script liegt jetzt im Grund-Layout.
- Datumsanzeige ist jetzt **unabhängig von der Zeitzone des Build-Servers** (UTC) — vorher drohte westlich von UTC ein Off-by-one; `{jahr}` im Fußzeilen-Text wird an allen Stellen ersetzt.

### Geändert
- Newsletter-Knopf der Startseite öffnet externe Anmeldelinks im neuen Tab (konsistent zur Newsletter-Seite).
- Schlagwörter unter Artikeln als schlichter Text — sie sahen klickbar aus, sind aber keine Links.
- Deploy prüft vor jedem Build Typen und Tests (`npm run check` + `npm test`) — kaputte Änderungen gehen nicht mehr live.

### Sicherheit / Robustheit
- **CMS-Absicherung:** Der technische Kategorie-Name lässt sich nur noch mit einem der drei gültigen Werte speichern; Farbwerte müssen Hex-Codes sein (Prüfung im CMS-Formular UND im Build-Schema). Vorher konnte ein Tippfehler die Website unbemerkt einfrieren bzw. das Design still zerlegen.
- Neue esbuild-Advisory bewertet (Datei-Lesen über den lokalen Dev-Server, nur Windows): betrifft die Live-Website nicht; als akzeptiert in CLAUDE.md dokumentiert.

## [0.1.0] — 2026-07-07

Erstes lauffähiges Release: komplette Website + Redaktionsbereich, live auf GitHub Pages.

### Hinzugefügt
- **Website (Astro 5, statisch):** Startseite nach „Modern Bohemian"-Vorlage in der AchieveWear-Palette (Welcome mit Polaroid-Bild, Über-mich-Band, drei Kategorie-Karten mit vertikalen Labels, Zitat-Band, Newsletter-Band); Blog-Übersicht mit Kategorie-Filter und Blätter-Navigation; Artikelseiten mit Lesezeit, Signatur-Zeile und verwandten Artikeln; Kategorie-Seiten; Über mich / Newsletter / Impressum / Datenschutz; 404-Seite; RSS-Feed; Sitemap; robots.txt mit noindex-Schalter.
- **Redaktionsbereich (`/admin`, Sveltia CMS 0.170.2, lokal gebundelt):** Artikel anlegen/bearbeiten mit deutschen Beschriftungen und Hilfetexten; Bild-Upload in Pro-Artikel-Ordner; Seiten bearbeiten; Einstellungen für Website, Startseite, **Farben** (9 Farbwähler) und Kategorien; Login per Zugangs-Token.
- **DSGVO-freundlich:** Fonts self-hosted (Inter, Cormorant Garamond, Great Vibes), null externe Requests, YouTube nur als 2-Klick-Einbettung (youtube-nocookie), Newsletter als Link-out.
- **Deploy:** GitHub Actions baut und veröffentlicht bei jedem Push/CMS-Speichern automatisch auf GitHub Pages (~2 Min.); FTP-Deploy für All-Inkl vorbereitet (`docs/hosting-phase2-allinkl.md`).
- **Doku:** Redaktions-Anleitung für Lisa (`docs/anleitung-fuer-lisa.md`), Projekt-Regeln (`CLAUDE.md`).

### Sicherheit / Robustheit
- Schema toleriert leere optionale Datumsfelder aus dem CMS (Live-Roundtrip-Test).
- **Artikel-Löschen im CMS deaktiviert:** Sveltia 0.170.2 löscht dabei nachweislich alle Bilder der Collection mit. Ersatz: Entwurf-Schalter; endgültiges Löschen per git.
- Base-Pfad komplett env-gesteuert (`withBase()`-Helper) — verifiziert mit und ohne `/achievewear-blog`-Präfix.
