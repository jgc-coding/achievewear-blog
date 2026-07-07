# Phase 2: Umzug auf All-Inkl (achievewear.de)

*Anleitung für den Launch — die Website zieht von GitHub Pages auf das bestehende All-Inkl-Hosting um und ersetzt dort das WordPress. Aufwand: ca. 1–2 Stunden, gemeinsam mit Claude.*

## Vorbereitung (vorab klären)

- [ ] **WordPress sichern**: In All-Inkl ein komplettes Backup des WordPress-Verzeichnisses + Datenbank ziehen (Rückweg offenhalten).
- [ ] **FTP-Zugang** bereitlegen (All-Inkl MembersArea → FTP): Server, Benutzername, Passwort.
- [ ] Entscheiden: Website ins Hauptverzeichnis der Domain oder in einen Unterordner mit Domain-Mapping (All-Inkl: Domain auf Verzeichnis zeigen lassen — empfohlen, z. B. `/achievewear-live/`).

## Schritt 1: FTP-Secrets im Repo hinterlegen

GitHub → Repo `achievewear-blog` → Settings → Secrets and variables → Actions → **New repository secret** (3 Stück):

| Name | Wert |
|---|---|
| `FTP_SERVER` | z. B. `wXXXXXXX.kasserver.com` |
| `FTP_USER` | FTP-Benutzername |
| `FTP_PASSWORD` | FTP-Passwort |

## Schritt 2: Workflow umstellen

In `.github/workflows/deploy.yml`:

1. Den auskommentierten Job `deploy-allinkl` aktivieren (Kommentarzeichen entfernen), `server-dir` ggf. auf den Zielordner anpassen.
2. Die beiden Pages-Jobs (`build`, `deploy`) entfernen oder auskommentieren.
3. Prüfen, dass im FTP-Job `SITE_URL: https://achievewear.de` und `BASE_PATH: /` gesetzt sind.

## Schritt 3: CMS-Konfiguration anpassen

In `public/admin/config.yml`:

```yaml
site_url: https://achievewear.de/
display_url: https://achievewear.de/
```

(Backend/Repo bleiben unverändert — die Inhalte leben weiter auf GitHub.)

## Schritt 4: Domain umstellen (All-Inkl MembersArea)

1. Domain achievewear.de auf das neue Verzeichnis zeigen lassen (statt auf das WordPress-Verzeichnis).
2. SSL-Zertifikat (Let's Encrypt) für die Domain aktiv lassen/prüfen.
3. Erster Deploy: Commit pushen oder Workflow manuell starten (Actions → Build & Deploy → Run workflow).

## Schritt 5: Launch-Checkliste

- [ ] Alle Seiten unter https://achievewear.de durchklicken (Start, Blog, Artikel, Kategorien, Über mich, Newsletter, Impressum, Datenschutz, /admin).
- [ ] **Impressum & Datenschutz final einfügen** (eRecht24-Texte, jetzt mit Adresse — ACHTUNG: damit steht die Privatadresse auch im öffentlichen GitHub-Repo; wenn das nicht gewünscht ist, vorher Repo auf privat stellen, GitHub Pages wird dann nicht mehr gebraucht).
- [ ] Im Redaktionsbereich: **„Vor Suchmaschinen verstecken" AUS**schalten und speichern.
- [ ] `https://achievewear.de/robots.txt` prüfen — muss jetzt `Allow` + Sitemap-Zeile zeigen.
- [ ] Google Search Console: Property anlegen, Sitemap `https://achievewear.de/sitemap-index.xml` einreichen.
- [ ] Lisas Anleitung (`docs/anleitung-fuer-lisa.md`): die beiden Adressen oben aktualisieren.
- [ ] Version bumpen (z. B. v1.0.0), CHANGELOG-Eintrag, git-Tag.

## Hinweise

- **Rollback:** Domain in All-Inkl einfach wieder auf das WordPress-Verzeichnis zeigen lassen — das WordPress bleibt bis auf Widerruf unangetastet liegen.
- **404-Seite:** All-Inkl liefert `404.html` nicht automatisch aus. Falls gewünscht, eine `.htaccess` mit `ErrorDocument 404 /404.html` ins Zielverzeichnis legen (kann als Datei in `public/` ins Repo).
- Der FTP-Deploy überträgt nur geänderte Dateien (SamKirkland/FTP-Deploy-Action) — erste Übertragung dauert länger.
