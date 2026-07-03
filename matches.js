/* ==========================================================================
   PredictAI — FIXTURES DATA  (this is the only file you edit for matches)
   --------------------------------------------------------------------------
   • The banner automatically shows the NEXT upcoming match.
   • Once a match's date/time passes, it is marked finished automatically —
     you do NOT need to change anything as games are played.
   • To add / change a game, edit the list below and re-upload this one file.

   ── Prefer not to touch code at all? ──────────────────────────────────────
   Put your Google Sheet "Publish to web → CSV" link in sheetCsvUrl below and
   manage everything from the spreadsheet — no re-upload needed ever again.
   Sheet columns (first row = headers, exact names):
     stage, date, home, homeFlag, away, awayFlag, pick, confidence, result
   (stage = group | r16 | qf | sf | third | final, or any text you like)
   ========================================================================== */

window.PREDICTAI_CONFIG = {
  sheetCsvUrl: '',        // e.g. 'https://docs.google.com/spreadsheets/d/e/XXXX/pub?output=csv'
  tzLabel: 'GMT+8',       // shown next to kickoff times
  tzOffset: '+08:00'      // used to read dates that have no timezone
};

/* date: 'YYYY-MM-DD HH:mm' (interpreted in the tzOffset above), or a full ISO
   string. result: leave '' until played, then e.g. '2-0' (winner is inferred). */
window.PREDICTAI_MATCHES = [
  { stage: 'qf',    date: '2026-07-07 03:00', home: 'Portugal',   homeFlag: '🇵🇹', away: 'Spain',       awayFlag: '🇪🇸', pick: 'Spain',     confidence: 81, result: '' },
  { stage: 'qf',    date: '2026-07-10 03:00', home: 'Brazil',     homeFlag: '🇧🇷', away: 'France',      awayFlag: '🇫🇷', pick: 'France',    confidence: 54, result: '' },
  { stage: 'qf',    date: '2026-07-11 03:00', home: 'Argentina',  homeFlag: '🇦🇷', away: 'Netherlands', awayFlag: '🇳🇱', pick: 'Argentina', confidence: 60, result: '' },
  { stage: 'sf',    date: '2026-07-14 03:00', home: 'Spain',      homeFlag: '🇪🇸', away: 'Brazil',      awayFlag: '🇧🇷', pick: 'Spain',     confidence: 57, result: '' },
  { stage: 'sf',    date: '2026-07-15 03:00', home: 'Argentina',  homeFlag: '🇦🇷', away: 'Germany',     awayFlag: '🇩🇪', pick: 'Argentina', confidence: 55, result: '' },
  { stage: 'third', date: '2026-07-18 03:00', home: 'Brazil',     homeFlag: '🇧🇷', away: 'Germany',     awayFlag: '🇩🇪', pick: 'Brazil',    confidence: 62, result: '' },
  { stage: 'final', date: '2026-07-19 03:00', home: 'Spain',      homeFlag: '🇪🇸', away: 'Argentina',   awayFlag: '🇦🇷', pick: 'Spain',     confidence: 52, result: '' }
];
