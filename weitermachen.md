# weitermachen.md — AchieveWear-Blog

## Stand (2026-11-23, v0.5.1)
- **Neues Aussehen nach Lisas Vorlage** (Blog „Make it Yours", vor allem die Handy-Ansicht) in Lisas CI-Farben und -Schriften — live: https://jgc-coding.github.io/achievewear-blog/ (noindex weiter aktiv). Details: CHANGELOG 0.5.0.
- v0.5.1: Vorschaubild beim Teilen kommt jetzt aus dem Titelbild der Startseite bzw. des Artikels (1200×630 JPEG, `src/lib/teilen.ts`), alte Pastell-Illustration entfernt.
- Design-Varianten V4–V6 entfernt; Rückkehrpunkt davor ist Tag `v0.4.0` (jetzt auch auf GitHub).
- Geprüft: Typprüfung, 34 Tests, Build mit und ohne Base-Pfad, GitHub-Deploy grün; Optik am nachgebildeten Handy (412 px) und Desktop (1280 px) angesehen, alle Seiten ohne Überbreite, Suche findet Artikel.
- Repo: https://github.com/jgc-coding/achievewear-blog · Doku: docs/anleitung-fuer-lisa.md (Farben/Startseite/Bilder nachgezogen)

## Aktuelle Stolperfallen
- **Alle Fotos sind KI-Platzhalter** (über Gabriels ChatGPT erzeugt, 23.11.). Originale liegen in `C:\Users\chime\Downloads\aw-*.png`; dort auch vier ungenutzte Reservebilder: `aw-raster4.png` Feld unten rechts (Notizbuch, Medaille, Tee) und `aw-raster6.png` Felder oben Mitte (Trail-Schuhe), unten links (Nähmaschinen-Nadel), unten rechts (Armsleeves mit Startnummer). Zerschneiden: Skript-Idee in Memory „chatgpt-bilder-ueber-chrome".
- Alte Vorschau-Adressen `/varianten/…` gibt es nicht mehr (404). Falls Lisa noch Lesezeichen darauf hat: neue Startseite schicken.

## Nächste Schritte (Claude)
1. Lisas Rückmeldung zu v0.5.0 einarbeiten (Farben, Texte, Feinschliff).
2. Optional: Pinterest-taugliche Teilen-Bilder (Hochformat 2:3), Freebie-Download-Seite.
3. Zum Launch: Umzug auf All-Inkl nach docs/hosting-phase2-allinkl.md + noindex aus + Impressum/Datenschutz final.

## Offen
- Nichts angefangen und liegen geblieben.

## Was Gabriel selbst tun muss
- Lisa den neuen Stand zeigen und ihre Rückmeldung einholen: https://jgc-coding.github.io/achievewear-blog/ (seit 2026-11-23)
- Am echten Handy durchklicken (geprüft ist nur das nachgebildete Android-Chrome): Menü auf/zu, Artikel-Karten unter „Aus dem Blog" seitlich wischen, Titelbild-Ausschnitt, ein Artikel bis zum Ende, Suche. Auf einem iPhone besonders das Wischen und die schräge Kante des Themen-Bands. (seit 2026-11-23)
- Eigene Fotos von Lisa besorgen, damit die KI-Platzhalter rausfliegen: Titelbild hell im Querformat mit ruhiger Mitte, Über-mich-Foto, drei quadratische Themenbilder (Motiv mittig), je Artikel ein Querformat-Bild. Lisa kann sie selbst im Redaktionsbereich tauschen. (seit 2026-11-23)
- **Zugangs-Token für Lisa erstellen** (5 Min.): GitHub → Settings → Developer settings → Personal access tokens → Fine-grained → nur Repo achievewear-blog, Permission „Contents: Read and write", 366 Tage. Dann Lisa: /admin → „Sign In Using Access Token". Kalender-Erinnerung „Token erneuern" in ~11 Monaten! (seit 2026-07-07)
- MailerLite-Link in Einstellungen → Website eintragen, sobald vorhanden. (seit 2026-07-07)
- Launch-Termin mit Lisa klären (geplant war KW 38): dann Umzug auf All-Inkl, noindex aus, Impressum/Datenschutz final. (seit 2026-07-07)
