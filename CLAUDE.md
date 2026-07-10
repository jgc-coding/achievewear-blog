# AchieveWear-Blog — Projekt-CLAUDE.md

Deutschsprachiger Blog (Nähen + Laufen) für Lisa, mit Redaktionsbereich unter `/admin`.
Nutzerin des Backends ist eine Nicht-Technikerin — **alles Sichtbare deutsch und einfach halten.**

## Tech-Stack

- **Astro 5** (statisch, kein SSR) — bewusst `^5` gepinnt, npm-latest wäre Astro 7 (nicht ungefragt upgraden!)
- **Sveltia CMS** `0.170.2` (exakt gepinnt, pre-1.0) — lokal gebundelt via npm, KEIN CDN (DSGVO)
- Vanilla-CSS mit Custom Properties (keine CSS-Frameworks), Fonts self-hosted via @fontsource
  (Inter, Cormorant Garamond, Great Vibes)
- Pagefind (statische Volltext-Suche, devDependency — läuft als Teil von `npm run build`), Vitest (Tests)
- Hosting Phase 1: GitHub Pages (`jgc-coding/achievewear-blog`, öffentlich) · Phase 2: All-Inkl per FTP (siehe `docs/hosting-phase2-allinkl.md`)

## Befehle (PowerShell)

```powershell
npm run dev        # Dev-Server http://localhost:4321
npm run build      # Produktions-Build nach dist/ (Base "/") inkl. Pagefind-Suchindex
npm run preview    # dist/ lokal ansehen
npm run check      # Astro/TypeScript-Prüfung
npm test           # Vitest (31 Tests: URL-Helfer, Datumsformat, remark-Plugins)

# Build wie auf GitHub Pages (Base-Pfad-Test — vor jedem Release einmal laufen lassen):
$env:BASE_PATH='/achievewear-blog'; $env:SITE_URL='https://jgc-coding.github.io'; npm run build; npm run preview
# danach Env wieder leeren:
Remove-Item Env:BASE_PATH; Remove-Item Env:SITE_URL
```

## Architektur-Karte

- `astro.config.mjs` — `site`/`base` kommen NUR aus Env (`SITE_URL`, `BASE_PATH`); remark-Plugins
- `src/content.config.ts` — Collections: `blog`, `seiten`, `site`, `startseite`, `design`, `kategorien`; `relImage()` normalisiert CMS-Bildpfade (`bilder/x.jpg` → `./bilder/x.jpg`)
- `src/content/` — alle Inhalte (Markdown + YAML). **Bilder liegen entry-relativ in `bilder/`-Unterordnern**, damit Astro sie optimiert und der Base-Pfad egal ist
- `src/lib/url.ts` — `withBase()` / `absUrl()`: die EINZIGE Stelle für Pfad-Präfixe
- `src/lib/settings.ts` — typisierte Helper für die Einstellungs-Collections
- `public/admin/config.yml` — Sveltia-Konfiguration (deutsche Labels/Hints)
- `src/pages/admin/index.astro` — Redaktionsbereich (bundelt `@sveltia/cms` lokal)
- `src/pages/suche.astro` — Pagefind-Suche (Index nur über Artikel via `data-pagefind-body`; Assets erst nach Build vorhanden)
- `src/assets/og-standard.svg|png` — Standard-Teilen-Bild (SVG = Design-Quelle, PNG = gerastert eingecheckt; Neu-Raster-Befehl im BaseLayout-Kommentar)
- `.github/workflows/deploy.yml` — Build + Pages-Deploy; FTP-Job für Phase 2 vorbereitet (auskommentiert)

## Eiserne Regeln

1. **Nie `/pfad` hart verlinken** — immer `withBase('/pfad')` (Base-Pfad auf GitHub Pages ist `/achievewear-blog/`!). Ausnahme: `href` aus CMS-Settings werden zentral in den Komponenten durch `withBase` geschickt.
2. **CMS-Bilder nach `src/content/**/bilder/`**, nie nach `public/` (sonst keine Optimierung + Base-Pfad-Bruch).
3. **Version nur in `package.json`** pflegen (wird im Footer angezeigt). Jede abgeschlossene Änderung: Version bumpen + CHANGELOG-Eintrag; Release zusätzlich als git-Tag (`vX.Y.Z`).
4. **Dateien nur über Edit/Write-Tools** ändern — PowerShell-Umleitungen zerstören UTF-8-Umlaute.
5. **Öffentliches Repo:** keine privaten Daten (keine Privatadresse im Impressum vor dem Launch, keine Erwähnung von Lisas Kindern, keine unlizenzierten Bilder, niemals Tokens/Secrets).
6. **noindex** bleibt bis zum Launch aktiv (Schalter in den Website-Einstellungen im CMS).
7. Sveltia-Version nur bewusst und mit Test aktualisieren (pre-1.0, Breaking Changes möglich).
8. Vor jedem größeren Änderungspaket: sauberer Commit als Rückkehrpunkt.

## Stolperfallen (gelernt/verifiziert)

- **Sveltia 0.170.2: Eintrag-Löschen entfernt ALLE Bilder der Collection** (zweifach live nachgewiesen, auch mit Pro-Artikel-Ordnern `bilder/{{slug}}`). Deshalb `delete: false` für Blog-Artikel; „Löschen" = Entwurf-Schalter, endgültig löscht Gabriel per git. Nach jedem Sveltia-Update in einem Test-Repo neu prüfen, bevor delete wieder aktiviert wird.
- Sveltia schreibt leere optionale Datumsfelder als `''` — Schema fängt das ab (`optionalesDatum()` in content.config.ts). Beim Anlegen neuer optionaler Datetime-Felder daran denken.
- npm audit meldet Astro-5-Advisories (XSS/SSRF) mit Fix erst in Astro 7: betreffen SSR/Dev-Server-Szenarien, nicht unsere statische Seite mit vertrauenswürdiger Autorin. Bewusst akzeptiert; bei Astro-Major-Upgrade neu bewerten. Zusätzlich seit Juli 2026: esbuild-Advisory (arbitrary file read über den Dev-Server, nur Windows, nur lokal) — ebenfalls akzeptiert; den Dev-Server nicht in fremden/öffentlichen Netzen laufen lassen.

- Sveltia-UI-Chrome ist englisch (nur en/ja) — Inhaltsfelder sind deutsch gelabelt, Rest erklärt `docs/anleitung-fuer-lisa.md`.
- Sveltia hat keinen Editorial Workflow: **jeder Save committet direkt auf `main`** und löst einen Deploy aus. Entwürfe (`Entwurf`-Schalter) erscheinen nicht auf der Website, liegen aber sichtbar im Repo.
- Sveltia-Login: „Sign In with Token" mit fine-grained PAT (nur dieses Repo, Contents Read/Write). PATs anderer Konten funktionieren NICHT für dieses Repo (GitHub-Limitation) — Token muss von jgc-coding kommen.
- Lokaler CMS-Test: „Work with Local Repository" nur in Chrome/Edge; macht KEINE git-Commits.
- `import.meta.env.BASE_URL` hat je nach Konfiguration mal einen Trailing-Slash, mal nicht — deshalb immer über `withBase()` gehen.
- **Styles, die mehrere Routen teilen, gehören nach `global.css`:** Astro legt Seiten-`<style>` (auch `is:global`) nur in die eigene Route. Die Kategorie-Seiten nutzten Klassen aus dem Blog-Index-Style und waren dadurch live ungestylt (in v0.2.0 behoben).
- **Astro rastert importierte SVGs nicht zu PNG** (`getImage` mit `format: 'png'` wird bei SVG-Quellen still ignoriert) — deshalb liegt das og-Standard-Bild als eingechecktes PNG neben seiner SVG-Quelle.
