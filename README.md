# PredictAI — Landing Page

A responsive marketing site for **PredictAI**, an AI-powered football (soccer)
prediction product. Built as static HTML/CSS/JS — no build step required.

## Pages

| File | Description |
| --- | --- |
| `index.html` | Landing page: hero with app mockup, features, how-it-works, stats, CTA |
| `terms.html` | Terms of Service |
| `privacy.html` | Privacy Policy |

Shared `styles.css` and `script.js` (mobile nav toggle) power all pages.
Navigation appears in both the top bar and the footer on every page.

## Fixtures (self-updating)

The World Cup banner and the "Road to the Final" list are **data-driven** and
**time-aware** — you do **not** edit HTML to keep them current.

- All matches live in **`matches.js`** (one simple list).
- The banner always shows the **next upcoming match** and counts down to it.
- When a match's date/time passes, it's automatically marked **Full Time**
  and dimmed in the list — the banner advances to the next game on its own.
- Add a `result` (e.g. `'2-0'`) to a match and it shows the score and a ✔/✕
  on whether the AI pick was right.

### Don't know the teams yet?

That's the normal case before/early in a tournament. Leave a team as **`TBD`**
(or blank) and the site shows a tidy "TBD" placeholder and still counts down to
kickoff. The starter data (`matches.js` / `fixtures-template.csv`) is the
knockout bracket with **all teams set to TBD**. As each round is decided, type
in the real teams — and your pick/confidence — and the page fills in.

### Recommended: manage it from a Google Sheet (no re-uploads ever)

1. **Create the sheet from the template.** In Google Sheets: **File → Import →
   Upload → `fixtures-template.csv`** (choose *Replace current sheet*). You now
   have the bracket with the right column headers.
2. **Publish it as CSV.** **File → Share → Publish to web → pick the sheet →
   CSV → Publish**, and copy the link it gives you.
3. **Connect it once.** Paste that link into `sheetCsvUrl` in `matches.js`,
   then upload `matches.js` one final time.

From then on you **only edit the spreadsheet** — add teams, set your pick and
confidence, and once a game is played type the score into `result` (e.g. `2-1`).
The live site reflects it on the next page load. No code, no more uploads. If
the sheet is ever unreachable, the site falls back to the list in `matches.js`.

**Columns:** `stage, date, home, homeFlag, away, awayFlag, pick, confidence, result`
- `stage` = `group` · `r16` · `qf` · `sf` · `third` · `final` (or any text)
- `date` = `YYYY-MM-DD HH:mm` (in the sheet's timezone offset) — edit these to the official schedule
- `homeFlag` / `awayFlag` = an emoji flag (🇪🇸); leave blank for TBD
- `pick` / `confidence` = your prediction; leave blank until you decide
- `result` = blank until played, then e.g. `2-1` (the ✔/✕ is worked out for you)

### Or just edit `matches.js`

Prefer not to use a sheet? Edit the `PREDICTAI_MATCHES` list in `matches.js`
directly and re-upload that one file.

## Languages

The site supports **English, Bahasa Melayu and 中文 (Simplified Chinese)**.

- First-time visitors get a language-picker popup.
- A 🌐 switcher in the top nav lets anyone change language anytime.
- The choice is remembered in `localStorage` (`predictai_lang`); on the
  first visit the browser's language is used as the default.
- Translations live in `i18n.js`. Any element with a `data-i18n="key"`
  attribute is swapped at runtime — add a key to all three dictionaries
  to translate new copy. (Legal body text in `terms.html` / `privacy.html`
  stays in English; only the shared nav/footer are translated there.)

## Design

- Dark stadium theme with purple accents (`#8b5cf6`)
- Bold condensed **Anton** headings + **Inter** body (Google Fonts)
- Fully responsive down to mobile

## Running locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```
