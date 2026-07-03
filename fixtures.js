/* ==========================================================================
   PredictAI — fixtures runtime
   Renders the World Cup banner + "Road to the final" list from matches.js
   (or a connected Google Sheet). Automatically:
     • shows the next upcoming match (or a live one) in the banner,
     • counts down to kickoff,
     • marks past games as finished, showing the result if provided.
   No edits needed as dates pass — the page advances itself.
   ========================================================================== */
(function () {
  var cfg = window.PREDICTAI_CONFIG || {};
  var MATCH_LEN_MS = 2 * 60 * 60 * 1000; // treat a match as "live" for ~2h
  var LOCALE = { en: 'en', ms: 'ms', zh: 'zh-CN' };
  var KNOWN_STAGES = { group: 1, r16: 1, qf: 1, sf: 1, third: 1, final: 1 };

  var state = { matches: null, timer: null };

  /* ---------- helpers ---------- */
  function t(key, fallback) {
    var v = window.PredictAI && window.PredictAI.t ? window.PredictAI.t(key) : null;
    return (v == null) ? (fallback || key) : v;
  }
  function lang() {
    return (window.PredictAI && window.PredictAI.getLang) ? window.PredictAI.getLang() : 'en';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function toDate(str) {
    if (!str) return null;
    var s = String(str).trim();
    if (/[T].*(Z|[+\-]\d\d:?\d\d)$/.test(s) || /Z$/.test(s)) return new Date(s);
    // "YYYY-MM-DD HH:mm" with no timezone -> apply configured offset
    var iso = s.replace(' ', 'T');
    if (!/[+\-]\d\d:?\d\d$/.test(iso)) iso += (cfg.tzOffset || '+00:00');
    return new Date(iso);
  }
  function dateParts(str) {
    // parse the calendar Y-M-D-HH-mm as written (no tz shifting for display)
    var m = String(str).match(/(\d{4})-(\d{2})-(\d{2})[T ]?(\d{2})?:?(\d{2})?/);
    if (!m) return null;
    return { y: +m[1], mo: +m[2], d: +m[3], hh: m[4] || '00', mm: m[5] || '00' };
  }
  function fmtDate(str) {
    var p = dateParts(str);
    if (!p) return esc(str);
    try {
      return new Intl.DateTimeFormat(LOCALE[lang()] || 'en', { year: 'numeric', month: 'short', day: 'numeric' })
        .format(new Date(Date.UTC(p.y, p.mo - 1, p.d)));
    } catch (e) {
      return p.y + '-' + pad(p.mo) + '-' + pad(p.d);
    }
  }
  function fmtTime(str) {
    var p = dateParts(str);
    return p ? (p.hh + ':' + p.mm) : '';
  }
  function stageLabel(stage) {
    var key = String(stage || '').toLowerCase();
    if (KNOWN_STAGES[key]) return { html: '<span data-i18n="stage.' + key + '">' + esc(stage) + '</span>', isFinal: key === 'final' };
    return { html: esc(stage), isFinal: false };
  }
  function statusOf(mDate) {
    if (!mDate) return 'upcoming';
    var now = Date.now(), ts = mDate.getTime();
    if (now < ts) return 'upcoming';
    if (now <= ts + MATCH_LEN_MS) return 'live';
    return 'finished';
  }
  function winnerOf(mt) {
    if (!mt.result) return null;
    var m = String(mt.result).match(/(\d+)\s*[-:]\s*(\d+)/);
    if (!m) return null;
    var h = +m[1], a = +m[2];
    return h === a ? 'draw' : (h > a ? mt.home : mt.away);
  }

  /* ---------- data loading ---------- */
  function normalize(list) {
    return (list || []).map(function (r) {
      return {
        stage: r.stage || '',
        date: r.date || '',
        home: r.home || '', homeFlag: r.homeFlag || r.homeflag || '',
        away: r.away || '', awayFlag: r.awayFlag || r.awayflag || '',
        pick: r.pick || '', confidence: r.confidence != null ? r.confidence : '',
        result: r.result || '',
        _d: toDate(r.date)
      };
    }).filter(function (r) { return r.home && r.away; })
      .sort(function (a, b) { return (a._d ? a._d.getTime() : 0) - (b._d ? b._d.getTime() : 0); });
  }

  function parseCSV(text) {
    var rows = [], row = [], field = '', i = 0, inQ = false, c;
    while (i < text.length) {
      c = text[i];
      if (inQ) {
        if (c === '"' && text[i + 1] === '"') { field += '"'; i += 2; continue; }
        if (c === '"') { inQ = false; i++; continue; }
        field += c; i++; continue;
      }
      if (c === '"') { inQ = true; i++; continue; }
      if (c === ',') { row.push(field); field = ''; i++; continue; }
      if (c === '\r') { i++; continue; }
      if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
      field += c; i++;
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    if (!rows.length) return [];
    var head = rows.shift().map(function (h) { return h.trim().toLowerCase(); });
    return rows.filter(function (r) { return r.join('').trim() !== ''; }).map(function (r) {
      var o = {};
      head.forEach(function (h, idx) { o[h] = (r[idx] || '').trim(); });
      return o;
    });
  }

  function loadMatches() {
    if (cfg.sheetCsvUrl) {
      return fetch(cfg.sheetCsvUrl, { cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw new Error('sheet ' + r.status); return r.text(); })
        .then(function (txt) { return normalize(parseCSV(txt)); })
        .catch(function (e) {
          console.warn('[PredictAI] sheet load failed, using matches.js —', e.message);
          return normalize(window.PREDICTAI_MATCHES);
        });
    }
    return Promise.resolve(normalize(window.PREDICTAI_MATCHES));
  }

  /* ---------- rendering ---------- */
  function pickFeatured(list) {
    var live = list.filter(function (m) { return statusOf(m._d) === 'live'; });
    if (live.length) return live[0];
    var up = list.filter(function (m) { return statusOf(m._d) === 'upcoming'; });
    if (up.length) return up[0];
    return list[list.length - 1] || null;
  }

  function teamHtml(name, flag) {
    return '<div class="wc-team"><span class="wc-flag-e">' + esc(flag) + '</span>' +
           '<span class="wc-team-name">' + esc(name) + '</span></div>';
  }

  function renderBanner(m) {
    var el = document.getElementById('wcMatch');
    if (!el || !m) return;
    var st = statusOf(m._d);
    var stg = stageLabel(m.stage);
    var predTpl = t('wc.predvalue', '{team} Win · <b>{pct}%</b>');
    var predVal = predTpl.replace('{team}', esc(m.pick || m.home)).replace('{pct}', esc(m.confidence));

    var head =
      '<div class="wc-meta">' +
        '<div class="wc-chip"><span class="wc-ico">🏆</span>' + stg.html + '</div>' +
        '<div class="wc-chip"><span class="wc-ico">📅</span><span>' + fmtDate(m.date) + '</span></div>' +
        '<div class="wc-chip"><span class="wc-ico">🕒</span><span>' + esc(fmtTime(m.date)) +
          ' <em>(' + esc(cfg.tzLabel || '') + ')</em></span></div>' +
      '</div>';

    var mid;
    if (st === 'upcoming') {
      mid =
        '<div class="wc-next" data-i18n="status.next">Next up</div>' +
        '<div class="wc-countdown" id="wcCountdown">' +
          unit('data-d', 'wc.days', 'Days') + '<div class="wc-sep">:</div>' +
          unit('data-h', 'wc.hrs', 'Hrs') + '<div class="wc-sep">:</div>' +
          unit('data-m', 'wc.min', 'Min') + '<div class="wc-sep">:</div>' +
          unit('data-s', 'wc.sec', 'Sec') +
        '</div>';
    } else if (st === 'live') {
      mid = '<div class="wc-livewrap"><span class="wc-live"><span class="wc-live-dot"></span>' +
            '<span data-i18n="status.live">LIVE</span></span>' +
            (m.result ? '<span class="wc-score">' + esc(m.result) + '</span>' : '') + '</div>';
    } else {
      mid = '<div class="wc-livewrap"><span class="wc-ft" data-i18n="status.ft">Full Time</span>' +
            (m.result ? '<span class="wc-score">' + esc(m.result) + '</span>' : '') + '</div>';
    }

    var vs = '<div class="wc-vs">' + teamHtml(m.home, m.homeFlag) +
             '<span class="wc-vs-badge">VS</span>' + teamHtml(m.away, m.awayFlag) + '</div>';

    var win = winnerOf(m);
    var correct = win && win !== 'draw' ? (win === m.pick) : null;
    var tag = correct === null ? '' :
      (correct ? ' <span class="wc-hit ok">✔</span>' : ' <span class="wc-hit no">✕</span>');

    var pred =
      '<div class="wc-pred">' +
        '<span class="wc-pred-label" data-i18n="wc.predlabel">AI Pick</span>' +
        '<span class="wc-pred-value">' + predVal + tag + '</span>' +
        '<a href="https://180score.com/" target="_blank" rel="noopener noreferrer" class="wc-pred-cta" data-i18n="wc.predcta">Learn more →</a>' +
      '</div>';

    el.innerHTML = head + mid + vs + pred;
    el.classList.toggle('is-final', stg.isFinal);
  }

  function unit(attr, key, fb) {
    return '<div class="wc-unit"><span class="wc-num" ' + attr + '>00</span>' +
           '<span class="wc-lbl" data-i18n="' + key + '">' + fb + '</span></div>';
  }

  function renderList(list) {
    var el = document.getElementById('fixturesList');
    if (!el) return;
    el.innerHTML = list.map(function (m) {
      var st = statusOf(m._d);
      var stg = stageLabel(m.stage);
      var win = winnerOf(m);
      var correct = win && win !== 'draw' ? (win === m.pick) : null;

      var meta = (st === 'live')
        ? '<span class="fx-live"><span class="wc-live-dot"></span><span data-i18n="status.live">LIVE</span></span>'
        : (st === 'finished'
            ? '<span class="fx-date" data-i18n="status.ft">Full Time</span>'
            : '<span class="fx-date">' + fmtDate(m.date) + ' · ' + esc(fmtTime(m.date)) + '</span>');

      var pickBits = '<span class="fx-pick-val">' + esc(m.pick) + ' · <b>' + esc(m.confidence) + '%</b>' +
        (correct === null ? '' : (correct ? ' <span class="fx-hit ok">✔</span>' : ' <span class="fx-hit no">✕</span>')) +
        '</span>';
      var resultBit = (st !== 'upcoming' && m.result)
        ? '<span class="fx-score">' + esc(m.result) + '</span>' : '';

      var cls = 'fixture' + (stg.isFinal ? ' fixture-final' : '') +
                (st === 'finished' ? ' is-finished' : '') + (st === 'live' ? ' is-live' : '');

      return '<div class="' + cls + '">' +
        '<div class="fx-stage"><span class="fx-badge">' + stg.html + '</span>' + meta + '</div>' +
        '<div class="fx-teams">' +
          '<span class="fx-team"><span class="fx-flag">' + esc(m.homeFlag) + '</span> ' + esc(m.home) + '</span>' +
          resultBit +
          '<span class="fx-vs">VS</span>' +
          '<span class="fx-team"><span class="fx-flag">' + esc(m.awayFlag) + '</span> ' + esc(m.away) + '</span>' +
        '</div>' +
        '<div class="fx-pick"><span class="fx-pick-label" data-i18n="fixtures.aipick">AI pick</span>' + pickBits + '</div>' +
        '<a href="https://180score.com/" target="_blank" rel="noopener noreferrer" class="fx-cta" data-i18n="fixtures.cta">See prediction →</a>' +
        '</div>';
    }).join('');
  }

  function startCountdown(m) {
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
    if (!m || statusOf(m._d) !== 'upcoming') return;
    var root = document.getElementById('wcCountdown');
    if (!root || !m._d) return;
    var target = m._d.getTime();
    var el = {
      d: root.querySelector('[data-d]'), h: root.querySelector('[data-h]'),
      m: root.querySelector('[data-m]'), s: root.querySelector('[data-s]')
    };
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) { clearInterval(state.timer); renderAll(state.matches); return; } // kickoff -> refresh
      var secs = Math.floor(diff / 1000);
      el.d.textContent = pad(Math.floor(secs / 86400));
      el.h.textContent = pad(Math.floor((secs % 86400) / 3600));
      el.m.textContent = pad(Math.floor((secs % 3600) / 60));
      el.s.textContent = pad(secs % 60);
    }
    tick();
    state.timer = setInterval(tick, 1000);
  }

  function renderAll(list) {
    if (!list || !list.length) return;
    var featured = pickFeatured(list);
    renderBanner(featured);
    renderList(list);
    if (window.PredictAI && window.PredictAI.apply) window.PredictAI.apply(); // translate injected labels
    startCountdown(featured);
  }

  function boot() {
    loadMatches().then(function (list) {
      state.matches = list;
      renderAll(list);
    });
    // re-render when the visitor switches language (templated strings + labels)
    document.addEventListener('predictai:langchange', function () {
      if (state.matches) renderAll(state.matches);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
