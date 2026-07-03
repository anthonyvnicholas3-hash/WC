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
