// Mobile navigation toggle
(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
  });

  // Close the menu after tapping a link
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });
})();

// World Cup 2026 kickoff countdown — July 7, 2026, 03:00 GMT+8 (= 2026-07-06 19:00 UTC)
(function () {
  var root = document.getElementById('wcCountdown');
  if (!root) return;

  var target = Date.parse('2026-07-06T19:00:00Z');
  var el = {
    d: root.querySelector('[data-d]'),
    h: root.querySelector('[data-h]'),
    m: root.querySelector('[data-m]'),
    s: root.querySelector('[data-s]')
  };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  function tick() {
    var diff = Math.max(0, target - Date.now());
    var secs = Math.floor(diff / 1000);
    el.d.textContent = pad(Math.floor(secs / 86400));
    el.h.textContent = pad(Math.floor((secs % 86400) / 3600));
    el.m.textContent = pad(Math.floor((secs % 3600) / 60));
    el.s.textContent = pad(secs % 60);
  }

  tick();
  setInterval(tick, 1000);
})();
