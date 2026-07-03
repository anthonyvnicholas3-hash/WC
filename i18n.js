/* ==========================================================================
   PredictAI — internationalization (English · Bahasa Melayu · 中文)
   Runtime swaps any element carrying a data-i18n="key" attribute.
   Choice is remembered in localStorage; first-time visitors see a picker.
   ========================================================================== */
(function () {
  var LANGS = ['en', 'ms', 'zh'];
  var LANG_NAMES = { en: 'English', ms: 'Bahasa Melayu', zh: '中文' };
  var LANG_SHORT = { en: 'EN', ms: 'BM', zh: '中文' };

  var T = {
    en: {
      'meta.title': 'PredictAI — AI Football Predictions & Live Scores',

      'nav.match': 'Match', 'nav.features': 'Features', 'nav.how': 'How it works',
      'nav.accuracy': 'Accuracy', 'nav.terms': 'Terms', 'nav.privacy': 'Privacy',
      'nav.cta': 'Learn More',

      'hero.eyebrow': 'AI-powered football insights',
      'hero.h1': 'How accurate<br />are your<br /><span class="line-2">football<br />predictions?</span>',
      'hero.sub': 'Make smarter football picks with AI — up to <b>82% accuracy</b> on match outcomes, with confidence scores and live match stats.',
      'hero.cta1': 'Learn More', 'hero.cta2': 'See how it works',
      'hero.stat1': 'Peak accuracy', 'hero.stat2': 'Leagues covered', 'hero.stat3': 'Live scores',

      'mock.tab': 'Predictions',
      'mock.pred': 'AI Prediction', 'mock.win': 'Argentina Win', 'mock.correct': 'Correct',
      'mock.conf': 'AI Confidence', 'mock.high': 'High',

      'wc.title1': 'World Cup', 'wc.date': 'July 7, 2026',
      'wc.days': 'Days', 'wc.hrs': 'Hrs', 'wc.min': 'Min', 'wc.sec': 'Sec',
      'wc.predlabel': 'Sample AI Pick',
      'wc.predvalue': '{team} Win · <b>{pct}%</b> confidence',
      'wc.predcta': 'Learn more →',

      'fixtures.kicker': 'Road to the final',
      'fixtures.h2': 'Every big game <span class="accent">to the final</span>',
      'fixtures.sub': 'AI predictions for the key knockout fixtures — updated as the bracket unfolds.',
      'stage.qf': 'Quarter-final', 'stage.sf': 'Semi-final', 'stage.third': 'Third place', 'stage.final': 'Final',
      'stage.group': 'Group stage', 'stage.r16': 'Round of 16',
      'status.live': 'LIVE', 'status.ft': 'Full Time', 'status.next': 'Next up',
      'fixtures.aipick': 'AI pick', 'fixtures.cta': 'See prediction →',

      'strip.live.t': 'Live Matches', 'strip.live.s': 'Watch anytime',
      'strip.stats.t': 'Real-Time Stats', 'strip.stats.s': 'Stay ahead',
      'strip.any.t': 'Play Anywhere', 'strip.any.s': 'Any device',
      'strip.safe.t': 'Safe & Secure', 'strip.safe.s': 'Trusted platform',
      'strip.bonus.t': 'Exclusive Bonuses', 'strip.bonus.s': 'More rewards',

      'feat.kicker': 'Why PredictAI',
      'feat.h2': 'Predictions built on <span class="accent">real intelligence</span>',
      'feat.intro': "Our models crunch form, xG, injuries, weather and head-to-head history so you don't have to.",
      'feat.1.t': 'AI match engine',
      'feat.1.d': 'A model trained on millions of fixtures rates every outcome — win, draw, over/under and both-teams-to-score.',
      'feat.2.t': 'Confidence scores',
      'feat.2.d': 'Every pick ships with a transparent confidence rating so you know exactly how strong the signal is.',
      'feat.3.t': 'Live updates',
      'feat.3.d': 'Predictions refresh in real time as lineups drop and the match unfolds — stay a step ahead.',
      'feat.4.t': '900+ leagues',
      'feat.4.d': 'From the Champions League to lower divisions worldwide, coverage that goes far beyond the headlines.',
      'feat.5.t': 'Goal Power trends',
      'feat.5.d': 'Visualize momentum, attacking threat and defensive form with clean, readable performance graphs.',
      'feat.6.t': 'Smart alerts',
      'feat.6.d': 'Follow your teams and get notified the moment a high-confidence prediction lands.',

      'how.kicker': 'How it works',
      'how.h2': 'Smarter picks in <span class="accent">three steps</span>',
      'how.1.t': 'Pick a match',
      'how.1.d': 'Choose any fixture across 900+ leagues, from the weekend blockbuster to the midweek underdog.',
      'how.2.t': 'See the AI call',
      'how.2.d': 'Get the predicted outcome, a confidence score and the stats that drove the decision.',
      'how.3.t': 'Make your move',
      'how.3.d': 'Use the insight to sharpen your own picks and track how the model performs over time.',

      'band.1': 'Peak accuracy', 'band.2': 'Leagues covered', 'band.3': 'Live scores', 'band.4': 'Powered picks',

      'learn.kicker': 'Learn more',
      'learn.h2': 'See it in action on <span class="accent">180Score</span>',
      'learn.lead': 'PredictAI brings AI-powered football predictions, confidence scores and live match stats together in one place. Head over to <b>180Score</b> to explore live scores and predictions for yourself.',
      'learn.li1': 'AI match predictions with confidence scores',
      'learn.li2': 'Live scores and stats across hundreds of leagues',
      'learn.li3': 'Free to explore — no sign-up needed to look around',
      'learn.cta1': 'Visit 180Score', 'learn.cta2': 'Browse features',
      'learn.email': 'Open it directly at <a href="https://180score.com/" target="_blank" rel="noopener noreferrer">180score.com</a>',

      'footer.about': 'AI-powered football predictions with confidence scores and live match stats. Explore live scores and predictions on 180Score.',
      'footer.explore': 'Explore', 'footer.company': 'Company', 'footer.legal': 'Legal',
      'footer.featmatch': 'Featured match', 'footer.road': 'Road to the final', 'footer.features': 'Features', 'footer.how': 'How it works',
      'footer.learn': 'Learn More', 'footer.aboutlink': 'About', 'footer.accuracy': 'Accuracy',
      'footer.visit': 'Visit 180Score',
      'footer.tos': 'Terms of Service', 'footer.pp': 'Privacy Policy', 'footer.cookie': 'Cookie Policy',
      'footer.rights': '© 2026 PredictAI. All rights reserved.',
      'footer.disclaimer': 'PredictAI provides statistical predictions and informational content for entertainment purposes only. No outcome is guaranteed. Predictions are not betting or financial advice. If you choose to gamble, please do so responsibly and only where legal — you must be of legal age in your jurisdiction. Gambling can be addictive.',

      'modal.title': 'Choose your language', 'modal.subtitle': 'Select a language to continue'
    },

    ms: {
      'meta.title': 'PredictAI — Ramalan Bola Sepak AI & Skor Langsung',

      'nav.match': 'Perlawanan', 'nav.features': 'Ciri', 'nav.how': 'Cara ia berfungsi',
      'nav.accuracy': 'Ketepatan', 'nav.terms': 'Terma', 'nav.privacy': 'Privasi',
      'nav.cta': 'Ketahui Lagi',

      'hero.eyebrow': 'Wawasan bola sepak dikuasakan AI',
      'hero.h1': 'Seberapa tepat<br />ramalan<br /><span class="line-2">bola sepak<br />anda?</span>',
      'hero.sub': 'Buat pilihan bola sepak yang lebih bijak dengan AI — sehingga <b>82% ketepatan</b> pada keputusan perlawanan, lengkap dengan skor keyakinan dan statistik langsung.',
      'hero.cta1': 'Ketahui Lagi', 'hero.cta2': 'Lihat cara ia berfungsi',
      'hero.stat1': 'Ketepatan puncak', 'hero.stat2': 'Liga diliputi', 'hero.stat3': 'Skor langsung',

      'mock.tab': 'Ramalan',
      'mock.pred': 'Ramalan AI', 'mock.win': 'Argentina Menang', 'mock.correct': 'Betul',
      'mock.conf': 'Keyakinan AI', 'mock.high': 'Tinggi',

      'wc.title1': 'Piala Dunia', 'wc.date': '7 Julai 2026',
      'wc.days': 'Hari', 'wc.hrs': 'Jam', 'wc.min': 'Minit', 'wc.sec': 'Saat',
      'wc.predlabel': 'Contoh Pilihan AI',
      'wc.predvalue': '{team} Menang · <b>{pct}%</b> keyakinan',
      'wc.predcta': 'Ketahui lagi →',

      'fixtures.kicker': 'Menuju ke final',
      'fixtures.h2': 'Setiap perlawanan besar <span class="accent">hingga ke final</span>',
      'fixtures.sub': 'Ramalan AI untuk perlawanan kalah mati utama — dikemas kini apabila pusingan berlangsung.',
      'stage.qf': 'Suku akhir', 'stage.sf': 'Separuh akhir', 'stage.third': 'Tempat ketiga', 'stage.final': 'Final',
      'stage.group': 'Peringkat kumpulan', 'stage.r16': 'Pusingan 16',
      'status.live': 'LANGSUNG', 'status.ft': 'Tamat Masa', 'status.next': 'Seterusnya',
      'fixtures.aipick': 'Pilihan AI', 'fixtures.cta': 'Lihat ramalan →',

      'strip.live.t': 'Perlawanan Langsung', 'strip.live.s': 'Tonton bila-bila masa',
      'strip.stats.t': 'Statistik Masa Nyata', 'strip.stats.s': 'Sentiasa di hadapan',
      'strip.any.t': 'Main Di Mana-Mana', 'strip.any.s': 'Mana-mana peranti',
      'strip.safe.t': 'Selamat & Terjamin', 'strip.safe.s': 'Platform dipercayai',
      'strip.bonus.t': 'Bonus Eksklusif', 'strip.bonus.s': 'Lebih banyak ganjaran',

      'feat.kicker': 'Mengapa PredictAI',
      'feat.h2': 'Ramalan berdasarkan <span class="accent">kecerdasan sebenar</span>',
      'feat.intro': 'Model kami menganalisis prestasi, xG, kecederaan, cuaca dan sejarah pertemuan supaya anda tidak perlu.',
      'feat.1.t': 'Enjin perlawanan AI',
      'feat.1.d': 'Model yang dilatih dengan jutaan perlawanan menilai setiap keputusan — menang, seri, over/under dan kedua-dua pasukan menjaringkan gol.',
      'feat.2.t': 'Skor keyakinan',
      'feat.2.d': 'Setiap pilihan disertakan penarafan keyakinan yang telus supaya anda tahu betapa kuatnya isyarat itu.',
      'feat.3.t': 'Kemas kini langsung',
      'feat.3.d': 'Ramalan dikemas kini secara langsung apabila barisan pemain diumumkan dan perlawanan berlangsung — sentiasa selangkah di hadapan.',
      'feat.4.t': '900+ liga',
      'feat.4.d': 'Daripada Liga Juara-Juara hingga divisyen bawahan di seluruh dunia, liputan yang jauh melangkaui berita utama.',
      'feat.5.t': 'Trend Kuasa Gol',
      'feat.5.d': 'Visualkan momentum, ancaman serangan dan prestasi pertahanan dengan graf prestasi yang jelas dan mudah dibaca.',
      'feat.6.t': 'Amaran pintar',
      'feat.6.d': 'Ikuti pasukan anda dan dapatkan pemberitahuan sebaik sahaja ramalan berkeyakinan tinggi muncul.',

      'how.kicker': 'Cara ia berfungsi',
      'how.h2': 'Pilihan lebih bijak dalam <span class="accent">tiga langkah</span>',
      'how.1.t': 'Pilih perlawanan',
      'how.1.d': 'Pilih mana-mana perlawanan daripada 900+ liga, daripada aksi hujung minggu hingga pasukan bawahan tengah minggu.',
      'how.2.t': 'Lihat ramalan AI',
      'how.2.d': 'Dapatkan keputusan yang diramalkan, skor keyakinan dan statistik yang mendorong keputusan itu.',
      'how.3.t': 'Buat keputusan anda',
      'how.3.d': 'Gunakan wawasan untuk menajamkan pilihan anda dan menjejaki prestasi model dari masa ke masa.',

      'band.1': 'Ketepatan puncak', 'band.2': 'Liga diliputi', 'band.3': 'Skor langsung', 'band.4': 'Pilihan berkuasa AI',

      'learn.kicker': 'Ketahui lagi',
      'learn.h2': 'Lihat ia beraksi di <span class="accent">180Score</span>',
      'learn.lead': 'PredictAI menggabungkan ramalan bola sepak berkuasa AI, skor keyakinan dan statistik perlawanan langsung dalam satu tempat. Layari <b>180Score</b> untuk meneroka skor langsung dan ramalan sendiri.',
      'learn.li1': 'Ramalan perlawanan AI dengan skor keyakinan',
      'learn.li2': 'Skor langsung dan statistik merentasi ratusan liga',
      'learn.li3': 'Percuma untuk diteroka — tiada pendaftaran diperlukan untuk melihat-lihat',
      'learn.cta1': 'Lawati 180Score', 'learn.cta2': 'Lihat ciri',
      'learn.email': 'Buka terus di <a href="https://180score.com/" target="_blank" rel="noopener noreferrer">180score.com</a>',

      'footer.about': 'Ramalan bola sepak berkuasa AI dengan skor keyakinan dan statistik perlawanan langsung. Teroka skor langsung dan ramalan di 180Score.',
      'footer.explore': 'Teroka', 'footer.company': 'Syarikat', 'footer.legal': 'Undang-undang',
      'footer.featmatch': 'Perlawanan pilihan', 'footer.road': 'Menuju ke final', 'footer.features': 'Ciri', 'footer.how': 'Cara ia berfungsi',
      'footer.learn': 'Ketahui Lagi', 'footer.aboutlink': 'Tentang', 'footer.accuracy': 'Ketepatan',
      'footer.visit': 'Lawati 180Score',
      'footer.tos': 'Terma Perkhidmatan', 'footer.pp': 'Dasar Privasi', 'footer.cookie': 'Dasar Kuki',
      'footer.rights': '© 2026 PredictAI. Hak cipta terpelihara.',
      'footer.disclaimer': 'PredictAI menyediakan ramalan statistik dan kandungan maklumat untuk tujuan hiburan sahaja. Tiada keputusan dijamin. Ramalan bukan nasihat pertaruhan atau kewangan. Jika anda memilih untuk berjudi, sila lakukan dengan bertanggungjawab dan hanya di tempat yang sah — anda mesti mencukupi umur di bidang kuasa anda. Perjudian boleh menyebabkan ketagihan.',

      'modal.title': 'Pilih bahasa anda', 'modal.subtitle': 'Pilih bahasa untuk meneruskan'
    },

    zh: {
      'meta.title': 'PredictAI — AI 足球预测与实时比分',

      'nav.match': '赛事', 'nav.features': '功能', 'nav.how': '运作方式',
      'nav.accuracy': '准确率', 'nav.terms': '条款', 'nav.privacy': '隐私',
      'nav.cta': '了解更多',

      'hero.eyebrow': 'AI 驱动的足球洞察',
      'hero.h1': '你的足球预测<br /><span class="line-2">到底<br />有多准?</span>',
      'hero.sub': '借助 AI 做出更聪明的足球预测——赛果准确率高达 <b>82%</b>，附带置信度评分与实时比赛数据。',
      'hero.cta1': '了解更多', 'hero.cta2': '查看运作方式',
      'hero.stat1': '最高准确率', 'hero.stat2': '覆盖联赛', 'hero.stat3': '实时比分',

      'mock.tab': '预测',
      'mock.pred': 'AI 预测', 'mock.win': '阿根廷胜', 'mock.correct': '正确',
      'mock.conf': 'AI 置信度', 'mock.high': '高',

      'wc.title1': '世界杯', 'wc.date': '2026年7月7日',
      'wc.days': '天', 'wc.hrs': '时', 'wc.min': '分', 'wc.sec': '秒',
      'wc.predlabel': 'AI 精选示例',
      'wc.predvalue': '{team}胜 · <b>{pct}%</b> 置信度',
      'wc.predcta': '了解更多 →',

      'fixtures.kicker': '通往决赛之路',
      'fixtures.h2': '直通决赛的<span class="accent">每场大战</span>',
      'fixtures.sub': '关键淘汰赛的 AI 预测——随赛程推进实时更新。',
      'stage.qf': '四分之一决赛', 'stage.sf': '半决赛', 'stage.third': '季军赛', 'stage.final': '决赛',
      'stage.group': '小组赛', 'stage.r16': '16强',
      'status.live': '进行中', 'status.ft': '完场', 'status.next': '下一场',
      'fixtures.aipick': 'AI 精选', 'fixtures.cta': '查看预测 →',

      'strip.live.t': '实时比赛', 'strip.live.s': '随时观看',
      'strip.stats.t': '实时数据', 'strip.stats.s': '抢占先机',
      'strip.any.t': '随处可用', 'strip.any.s': '任何设备',
      'strip.safe.t': '安全可靠', 'strip.safe.s': '值得信赖的平台',
      'strip.bonus.t': '专属奖励', 'strip.bonus.s': '更多回馈',

      'feat.kicker': '为何选择 PredictAI',
      'feat.h2': '基于<span class="accent">真实智能</span>的预测',
      'feat.intro': '我们的模型分析球队状态、xG、伤病、天气和交锋历史，省去你的功夫。',
      'feat.1.t': 'AI 赛事引擎',
      'feat.1.d': '基于数百万场赛事训练的模型评估每种结果——胜、平、大小球以及双方是否进球。',
      'feat.2.t': '置信度评分',
      'feat.2.d': '每个预测都附带透明的置信度评分，让你清楚信号有多强。',
      'feat.3.t': '实时更新',
      'feat.3.d': '随着阵容公布和比赛进行，预测实时刷新——始终领先一步。',
      'feat.4.t': '900+ 联赛',
      'feat.4.d': '从欧冠到全球各级低级别联赛，覆盖远超头条赛事。',
      'feat.5.t': '进球势能趋势',
      'feat.5.d': '用清晰易读的表现图表，直观呈现势头、进攻威胁和防守状态。',
      'feat.6.t': '智能提醒',
      'feat.6.d': '关注你的球队，一旦出现高置信度预测立即收到通知。',

      'how.kicker': '运作方式',
      'how.h2': '<span class="accent">三步</span>做出更聪明的预测',
      'how.1.t': '选择赛事',
      'how.1.d': '从 900+ 联赛中任选一场赛事，无论是周末焦点战还是周中冷门。',
      'how.2.t': '查看 AI 判断',
      'how.2.d': '获取预测结果、置信度评分以及支撑该判断的数据。',
      'how.3.t': '做出你的选择',
      'how.3.d': '利用这些洞察优化你的预测，并跟踪模型的长期表现。',

      'band.1': '最高准确率', 'band.2': '覆盖联赛', 'band.3': '实时比分', 'band.4': 'AI 智能精选',

      'learn.kicker': '了解更多',
      'learn.h2': '前往 <span class="accent">180Score</span> 亲身体验',
      'learn.lead': 'PredictAI 将 AI 足球预测、置信度评分和实时比赛数据汇聚一处。前往 <b>180Score</b>，亲自探索实时比分与预测。',
      'learn.li1': '带置信度评分的 AI 赛事预测',
      'learn.li2': '覆盖数百个联赛的实时比分与数据',
      'learn.li3': '免费探索——无需注册即可浏览',
      'learn.cta1': '访问 180Score', 'learn.cta2': '浏览功能',
      'learn.email': '直接打开 <a href="https://180score.com/" target="_blank" rel="noopener noreferrer">180score.com</a>',

      'footer.about': 'AI 驱动的足球预测，附带置信度评分和实时比赛数据。在 180Score 探索实时比分与预测。',
      'footer.explore': '探索', 'footer.company': '公司', 'footer.legal': '法律',
      'footer.featmatch': '焦点赛事', 'footer.road': '通往决赛之路', 'footer.features': '功能', 'footer.how': '运作方式',
      'footer.learn': '了解更多', 'footer.aboutlink': '关于', 'footer.accuracy': '准确率',
      'footer.visit': '访问 180Score',
      'footer.tos': '服务条款', 'footer.pp': '隐私政策', 'footer.cookie': 'Cookie 政策',
      'footer.rights': '© 2026 PredictAI. 版权所有。',
      'footer.disclaimer': 'PredictAI 提供的统计预测和信息内容仅供娱乐之用，不保证任何结果。预测不构成博彩或财务建议。若你选择博彩，请理性并仅在合法地区进行——你必须达到所在司法管辖区的法定年龄。博彩可能使人成瘾。',

      'modal.title': '选择您的语言', 'modal.subtitle': '选择语言以继续'
    }
  };

  var STORAGE_KEY = 'predictai_lang';
  var current = 'en';

  function translate(lang, dispatch) {
    current = (T[lang] ? lang : 'en');
    lang = current;
    var dict = T[lang] || T.en;
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-Hans' : lang);

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (dict[key] != null) nodes[i].innerHTML = dict[key];
    }
    var titleKey = document.documentElement.getAttribute('data-title-key');
    if (titleKey && dict[titleKey]) document.title = dict[titleKey];

    // reflect current language in any switcher on the page
    var labels = document.querySelectorAll('[data-lang-current]');
    for (var j = 0; j < labels.length; j++) labels[j].textContent = LANG_SHORT[lang];
    var opts = document.querySelectorAll('[data-lang-option]');
    for (var k = 0; k < opts.length; k++) {
      opts[k].classList.toggle('active', opts[k].getAttribute('data-lang-option') === lang);
    }

    if (dispatch !== false) {
      document.dispatchEvent(new CustomEvent('predictai:langchange', { detail: lang }));
    }
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'en';
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    translate(lang);
  }

  function detectDefault() {
    var nav = (navigator.language || 'en').toLowerCase();
    if (nav.indexOf('zh') === 0) return 'zh';
    if (nav.indexOf('ms') === 0 || nav.indexOf('id') === 0) return 'ms';
    return 'en';
  }

  function initSwitcher() {
    var wraps = document.querySelectorAll('[data-lang-switch]');
    for (var i = 0; i < wraps.length; i++) {
      (function (wrap) {
        var btn = wrap.querySelector('[data-lang-toggle]');
        var menu = wrap.querySelector('[data-lang-menu]');
        if (btn && menu) {
          btn.addEventListener('click', function (e) {
            e.stopPropagation();
            wrap.classList.toggle('open');
          });
        }
        var opts = wrap.querySelectorAll('[data-lang-option]');
        for (var j = 0; j < opts.length; j++) {
          opts[j].addEventListener('click', function () {
            setLang(this.getAttribute('data-lang-option'));
            wrap.classList.remove('open');
          });
        }
      })(wraps[i]);
    }
    document.addEventListener('click', function () {
      var open = document.querySelectorAll('[data-lang-switch].open');
      for (var i = 0; i < open.length; i++) open[i].classList.remove('open');
    });
  }

  function initModal(hasSavedLang) {
    var modal = document.getElementById('langModal');
    if (!modal) return;
    if (hasSavedLang) { modal.remove(); return; }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    var opts = modal.querySelectorAll('[data-lang-option]');
    for (var i = 0; i < opts.length; i++) {
      opts[i].addEventListener('click', function () {
        setLang(this.getAttribute('data-lang-option'));
        modal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(function () { modal.remove(); }, 300);
      });
    }
  }

  window.PredictAI = {
    getLang: function () { return current; },
    t: function (key) { var d = T[current] || T.en; return d[key]; },
    apply: function () { translate(current, false); }
  };

  function boot() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var lang = saved || detectDefault();
    translate(lang);
    initSwitcher();
    initModal(!!saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
