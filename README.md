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

### Editing matches

Open `matches.js`, edit the `PREDICTAI_MATCHES` list (teams, flags, date,
pick, confidence, result), save, re-upload that one file. Done.

### Zero-upload option — Google Sheet

To manage fixtures without touching any file:

1. Make a Google Sheet with headers in row 1:
   `stage, date, home, homeFlag, away, awayFlag, pick, confidence, result`
2. **File → Share → Publish to web → (this sheet) → CSV → Publish.**
3. Copy that CSV link into `sheetCsvUrl` in `matches.js` (one time).

After that, edit the spreadsheet anytime and the live site updates on the
next page load — no code, no re-upload. If the sheet is ever unreachable,
the site falls back to the built-in list in `matches.js`.

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
