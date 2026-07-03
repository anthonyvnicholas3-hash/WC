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
