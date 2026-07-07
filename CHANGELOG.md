# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/), Versionierung nach [SemVer](https://semver.org/lang/de/).

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
