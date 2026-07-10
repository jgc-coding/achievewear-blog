# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/), Versionierung nach [SemVer](https://semver.org/lang/de/).

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
