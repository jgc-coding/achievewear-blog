# weitermachen.md — AchieveWear-Blog

## Stand (2026-07-07, v0.1.0)
- Website + CMS komplett gebaut, live: https://jgc-coding.github.io/achievewear-blog/ (noindex aktiv)
- Redaktionsbereich /admin verifiziert: Anlegen/Bearbeiten E2E getestet (CMS → Commit → Auto-Deploy ~2 Min.)
- Repo: https://github.com/jgc-coding/achievewear-blog · Release-Tag v0.1.0
- Doku: docs/anleitung-fuer-lisa.md · docs/hosting-phase2-allinkl.md · CLAUDE.md (Stolperfallen!)

## Offen
- **Zugangs-Token für Lisa erstellen** (Gabriel, 5 Min.): GitHub → Settings → Developer settings → Personal access tokens → Fine-grained → nur Repo achievewear-blog, Permission „Contents: Read and write", 366 Tage. Dann Lisa: /admin → „Sign In Using Access Token". Kalender-Erinnerung „Token erneuern" in ~11 Monaten!
- Gabriel + Lisa: Design-Sichtcheck; Platzhalter-Texte/-Bilder nach und nach ersetzen (über /admin)
- MailerLite-Link in Einstellungen → Website eintragen, sobald vorhanden
- Zum Launch (KW 38): Umzug auf All-Inkl nach docs/hosting-phase2-allinkl.md + noindex aus + Impressum/DSE final

## Nächste Schritte (nächste Session)
- Feedback von Lisa einarbeiten (Farben/Texte/Feinschliff)
- Optional: Pinterest-taugliche Teilen-Bilder, Freebie-Download-Seite

## Aktuelle Stolperfallen
- CMS-Löschen bleibt AUS (Sveltia-Bug löscht alle Collection-Bilder — 2× nachgewiesen; Details CLAUDE.md)
- Astro bewusst ^5 (nicht 7), Sveltia exakt 0.170.2 gepinnt
- Base-Pfad nur über withBase(); Build-Matrix-Test vor Releases
