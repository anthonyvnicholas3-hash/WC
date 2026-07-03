/* ==========================================================================
   PredictAI — FIXTURES DATA
   --------------------------------------------------------------------------
   You don't know the teams yet? That's fine. Leave a team as "TBD" (or blank)
   and the site shows a clean "TBD" placeholder + counts down to kickoff. As
   each round is decided, fill in the real teams (and your AI pick) and the
   page updates — finished games are marked automatically as dates pass.

   ── Recommended: manage everything from a public Google Sheet (no re-uploads) ─
   1. Import the included  fixtures-template.csv  into a new Google Sheet.
   2. Make its data public, either way works:
        A) Share → General access → "Anyone with the link" (Viewer), then just
           copy the normal address-bar link, OR
        B) File → Share → Publish to web → CSV → Publish, and copy that link.
   3. Paste whichever link into  sheetCsvUrl  below (one time) and re-upload
      this file. The code auto-converts edit / publish links into a CSV feed.
   After that, you only ever edit the spreadsheet. (If option A is ever blocked
   by the browser, switch to option B — it's the most reliable.)

   Sheet/columns (row 1 = headers, exact names):
     stage, date, home, away, pick, confidence, result
   stage  = group | r16 | qf | sf | third | final  (or any text)
   date   = 'YYYY-MM-DD HH:mm' (in the tzOffset below) or a full ISO string
   home / away = just the COUNTRY NAME (e.g. Spain). The flag emoji is added
                 automatically — you never type flags. (Optional: add homeFlag
                 / awayFlag columns with an emoji to override a specific one.)
   pick   = the team you predict to win (leave blank until you decide)
   result = leave blank until played, then e.g. '2-1' (winner is inferred)
   ========================================================================== */

window.PREDICTAI_CONFIG = {
  sheetCsvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS9xuNruigDpD8tsRR9FDnMs5pdh1tfhR9ZrL6x2lnVOkoTwPh6Lk_N0-_WwVWkPD969l7eCplLaozT/pub?output=csv',
  tzLabel: 'GMT+8',       // shown next to kickoff times
  tzOffset: '+08:00'      // used to read dates that have no timezone
};

/* Starter bracket — teams are TBD until you fill them in (here or in the Sheet).
   Dates/times are placeholders; adjust them to the official schedule. */
window.PREDICTAI_MATCHES = [
  { stage: 'qf',    date: '2026-07-09 03:00', home: 'TBD', away: 'TBD', pick: '', confidence: '', result: '' },
  { stage: 'qf',    date: '2026-07-10 03:00', home: 'TBD', away: 'TBD', pick: '', confidence: '', result: '' },
  { stage: 'qf',    date: '2026-07-11 03:00', home: 'TBD', away: 'TBD', pick: '', confidence: '', result: '' },
  { stage: 'qf',    date: '2026-07-11 07:00', home: 'TBD', away: 'TBD', pick: '', confidence: '', result: '' },
  { stage: 'sf',    date: '2026-07-14 03:00', home: 'TBD', away: 'TBD', pick: '', confidence: '', result: '' },
  { stage: 'sf',    date: '2026-07-15 03:00', home: 'TBD', away: 'TBD', pick: '', confidence: '', result: '' },
  { stage: 'third', date: '2026-07-18 03:00', home: 'TBD', away: 'TBD', pick: '', confidence: '', result: '' },
  { stage: 'final', date: '2026-07-19 03:00', home: 'TBD', away: 'TBD', pick: '', confidence: '', result: '' }
];
