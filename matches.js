/* ==========================================================================
   PredictAI — FIXTURES DATA
   --------------------------------------------------------------------------
   You don't know the teams yet? That's fine. Leave a team as "TBD" (or blank)
   and the site shows a clean "TBD" placeholder + counts down to kickoff. As
   each round is decided, fill in the real teams (and your AI pick) and the
   page updates — finished games are marked automatically as dates pass.

   ── Recommended: manage everything from a Google Sheet (no re-uploads) ──────
   1. Import the included  fixtures-template.csv  into a new Google Sheet.
   2. File → Share → Publish to web → (sheet) → CSV → Publish, and copy the link.
   3. Paste that link into  sheetCsvUrl  below (one time) and re-upload this file.
   After that, you only ever edit the spreadsheet.

   Sheet/columns (row 1 = headers, exact names):
     stage, date, home, homeFlag, away, awayFlag, pick, confidence, result
   stage  = group | r16 | qf | sf | third | final  (or any text)
   date   = 'YYYY-MM-DD HH:mm' (in the tzOffset below) or a full ISO string
   flags  = an emoji flag like 🇪🇸 (optional; leave blank for TBD)
   pick   = the team you predict to win (leave blank until you decide)
   result = leave blank until played, then e.g. '2-1' (winner is inferred)
   ========================================================================== */

window.PREDICTAI_CONFIG = {
  sheetCsvUrl: '',        // paste your published Google Sheet CSV link here
  tzLabel: 'GMT+8',       // shown next to kickoff times
  tzOffset: '+08:00'      // used to read dates that have no timezone
};

/* Starter bracket — teams are TBD until you fill them in (here or in the Sheet).
   Dates/times are placeholders; adjust them to the official schedule. */
window.PREDICTAI_MATCHES = [
  { stage: 'qf',    date: '2026-07-09 03:00', home: 'TBD', homeFlag: '', away: 'TBD', awayFlag: '', pick: '', confidence: '', result: '' },
  { stage: 'qf',    date: '2026-07-10 03:00', home: 'TBD', homeFlag: '', away: 'TBD', awayFlag: '', pick: '', confidence: '', result: '' },
  { stage: 'qf',    date: '2026-07-11 03:00', home: 'TBD', homeFlag: '', away: 'TBD', awayFlag: '', pick: '', confidence: '', result: '' },
  { stage: 'qf',    date: '2026-07-11 07:00', home: 'TBD', homeFlag: '', away: 'TBD', awayFlag: '', pick: '', confidence: '', result: '' },
  { stage: 'sf',    date: '2026-07-14 03:00', home: 'TBD', homeFlag: '', away: 'TBD', awayFlag: '', pick: '', confidence: '', result: '' },
  { stage: 'sf',    date: '2026-07-15 03:00', home: 'TBD', homeFlag: '', away: 'TBD', awayFlag: '', pick: '', confidence: '', result: '' },
  { stage: 'third', date: '2026-07-18 03:00', home: 'TBD', homeFlag: '', away: 'TBD', awayFlag: '', pick: '', confidence: '', result: '' },
  { stage: 'final', date: '2026-07-19 03:00', home: 'TBD', homeFlag: '', away: 'TBD', awayFlag: '', pick: '', confidence: '', result: '' }
];
