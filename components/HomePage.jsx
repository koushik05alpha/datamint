'use client';

import { useEffect, useRef, useState } from 'react';

/* ============================================================
   Scrape animation (originally inline <script type="module">)
   ============================================================ */
function useScrapeAnim(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const e = ref.current;
    const rows = e.querySelectorAll('.scrape-anim__row');
    const status = e.querySelector('.scrape-anim__status');
    const counter = e.querySelector('.scrape-anim__counter');
    const STEP = 800, DONE_AFTER = 600, RESTART = 3000;
    let timers = [];

    const clear = () => { timers.forEach(clearTimeout); timers = []; };

    const run = () => {
      clear();
      let n = 0;
      rows.forEach((r) => r.classList.remove('is-visible', 'is-processing', 'is-done'));
      if (status) { status.dataset.status = 'processing'; status.textContent = 'Scraping...'; }
      if (counter) counter.textContent = '+ 0 more';

      rows.forEach((row, i) => {
        timers.push(setTimeout(() => row.classList.add('is-visible', 'is-processing'), i * STEP));
        timers.push(setTimeout(() => {
          row.classList.remove('is-processing');
          row.classList.add('is-done');
          n += Math.floor(Math.random() * 200) + 100;
          if (counter) counter.textContent = `+ ${n.toLocaleString()} more`;
        }, i * STEP + DONE_AFTER));
      });

      timers.push(setTimeout(() => {
        if (status) { status.dataset.status = 'done'; status.textContent = 'Complete'; }
        timers.push(setTimeout(run, RESTART));
      }, rows.length * STEP + DONE_AFTER));
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(); io.unobserve(en.target); } });
    }, { threshold: 0.3 });
    io.observe(e);

    return () => { clear(); io.disconnect(); };
  }, [ref]);
}

/* WhatsApp animation */
function useWaAnim(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const e = ref.current;
    const rows = e.querySelectorAll('.wa-anim__row');
    const status = e.querySelector('.wa-anim__status');
    const STEP = 700, DONE_AFTER = 500, RESTART = 3000;
    let timers = [];

    rows.forEach((r) => { if (Math.random() > 0.35) r.classList.add('is-active'); });

    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const run = () => {
      clear();
      rows.forEach((r) => r.classList.remove('is-visible', 'is-processing', 'is-done'));
      if (status) { status.dataset.status = 'processing'; status.textContent = 'Checking...'; }

      rows.forEach((row, i) => {
        timers.push(setTimeout(() => row.classList.add('is-visible', 'is-processing'), i * STEP));
        timers.push(setTimeout(() => {
          row.classList.remove('is-processing'); row.classList.add('is-done');
        }, i * STEP + DONE_AFTER));
      });

      timers.push(setTimeout(() => {
        const active = e.querySelectorAll('.wa-anim__row.is-active.is-done').length;
        if (status) { status.dataset.status = 'done'; status.textContent = `${active} active`; }
        timers.push(setTimeout(run, RESTART));
      }, rows.length * STEP + DONE_AFTER));
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(); io.unobserve(en.target); } });
    }, { threshold: 0.3 });
    io.observe(e);

    return () => { clear(); io.disconnect(); };
  }, [ref]);
}

/* Email animation */
function useEmailAnim(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const e = ref.current;
    const rows = e.querySelectorAll('.email-anim__row');
    const status = e.querySelector('.email-anim__status');
    const STEP = 700, DONE_AFTER = 500, RESTART = 3000;
    let timers = [];

    rows.forEach((r) => { if (Math.random() > 0.3) r.classList.add('is-valid'); });

    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const run = () => {
      clear();
      rows.forEach((r) => r.classList.remove('is-visible', 'is-processing', 'is-done'));
      if (status) { status.dataset.status = 'processing'; status.textContent = 'Verifying...'; }

      rows.forEach((row, i) => {
        timers.push(setTimeout(() => row.classList.add('is-visible', 'is-processing'), i * STEP));
        timers.push(setTimeout(() => {
          row.classList.remove('is-processing'); row.classList.add('is-done');
        }, i * STEP + DONE_AFTER));
      });

      timers.push(setTimeout(() => {
        const valid = e.querySelectorAll('.email-anim__row.is-valid.is-done').length;
        if (status) { status.dataset.status = 'done'; status.textContent = `${valid}/${rows.length} valid`; }
        timers.push(setTimeout(run, RESTART));
      }, rows.length * STEP + DONE_AFTER));
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(); io.unobserve(en.target); } });
    }, { threshold: 0.3 });
    io.observe(e);

    return () => { clear(); io.disconnect(); };
  }, [ref]);
}

/* AI enrich animation */
function useEnrichAnim(ref) {
  const PHRASES = [
    'Found info@ on /contact, verified deliverable via Reoon SMTP check.',
    'Detected mobile number, WhatsApp active, intent high (9+ recent reviews).',
    'Score: 87/100 - strong purchase signal from website content analysis.',
  ];

  useEffect(() => {
    if (!ref.current) return;
    const e = ref.current;
    const rows = e.querySelectorAll('.ai-anim__prompt-row');
    const reasoning = e.querySelector('.ai-anim__reasoning');
    const reasoningText = e.querySelector('.ai-anim__reasoning-text');
    const status = e.querySelector('.ai-anim__status');
    const STEP = 900, DONE_AFTER = 600, TYPING_DELAY = 1200, RESTART = 3000;
    let timers = [];

    const clear = () => { timers.forEach(clearTimeout); timers = []; };

    const typeText = (el, text, speed = 25) => new Promise((resolve) => {
      el.textContent = '';
      let i = 0;
      const next = () => {
        if (i < text.length) {
          el.textContent += text[i++];
          timers.push(setTimeout(next, speed));
        } else resolve();
      };
      next();
    });

    const run = async () => {
      clear();
      rows.forEach((r) => r.classList.remove('is-visible', 'is-processing', 'is-done'));
      if (reasoning) reasoning.classList.remove('is-visible', 'is-typing');
      if (reasoningText) reasoningText.textContent = 'Thinking...';
      if (status) { status.dataset.status = 'processing'; status.textContent = 'Running'; }

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        timers.push(setTimeout(() => row.classList.add('is-visible', 'is-processing'), i * STEP));
        await new Promise((res) => {
          timers.push(setTimeout(() => {
            row.classList.remove('is-processing'); row.classList.add('is-done'); res();
          }, i * STEP + DONE_AFTER));
        });
      }

      timers.push(setTimeout(() => {
        if (reasoning) { reasoning.classList.add('is-visible', 'is-typing'); }
        const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
        if (reasoningText) {
          typeText(reasoningText, phrase, 25).then(() => {
            if (reasoning) reasoning.classList.remove('is-typing');
          });
        }
      }, rows.length * STEP + 200));

      timers.push(setTimeout(() => {
        if (status) { status.dataset.status = 'done'; status.textContent = 'Complete'; }
        timers.push(setTimeout(run, RESTART));
      }, rows.length * STEP + TYPING_DELAY + 400));
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(); io.unobserve(en.target); } });
    }, { threshold: 0.3 });
    io.observe(e);

    return () => { clear(); io.disconnect(); };
  }, [ref]);
}

/* ============================================================
   TABS COMPONENT
   ============================================================ */
function ShowcaseTabs() {
  const [activeTab, setActiveTab] = useState('scrape');
  const scrapeRef = useRef(null);
  const waRef = useRef(null);
  const emailRef = useRef(null);
  const enrichRef = useRef(null);

  useScrapeAnim(scrapeRef);
  useWaAnim(waRef);
  useEmailAnim(emailRef);
  useEnrichAnim(enrichRef);

  const tabs = [
    { id: 'scrape', label: 'Scrape' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'email', label: 'Email' },
    { id: 'enrich', label: 'AI Enrich' },
    { id: 'export', label: 'Export' },
  ];

  return (
    <div className="tabs reveal in" id="tabs">
      <div className="tabs__bar" role="tablist" aria-label="Product showcase">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tab${activeTab === t.id ? ' is-active' : ''}`}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={activeTab === t.id}
            aria-controls={`panel-${t.id}`}
            data-tab={t.id}
            onClick={() => setActiveTab(t.id)}
          >
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Scrape panel */}
      <div
        className={`tabpanel${activeTab === 'scrape' ? ' is-active' : ''}`}
        id="panel-scrape"
        role="tabpanel"
        aria-labelledby="tab-scrape"
        data-panel="scrape"
      >
        <div className="showcase__grid">
          <div className="showcase__copy">
            <h3>Pull and import thousands of listings in minutes</h3>
            <p>
              Type a niche and city. DataMint auto-scrolls Google Maps to extract and import names,
              phones, websites, ratings, addresses and social links, even through Cloudflare.
            </p>
            <ul className="ticks">
              <li>Dual WAF-bypass engine (httpx + curl_cffi)</li>
              <li>Google Maps, Facebook Groups &amp; any web table</li>
              <li>Auto-scroll pagination, zero manual clicks</li>
            </ul>
            <a className="btn btn--ghost btn--sm btn--see-how" href="/docs/features/scrapers">
              <span>Learn More ↗</span>
            </a>
          </div>
          <div className="scrape-anim mock" data-animate="scrape" ref={scrapeRef}>
            <div className="mock__bar">
              <span className="mock__url">maps.google.com</span>
              <span className="mock__pill scrape-anim__status" data-status="processing">Scraping...</span>
            </div>
            <div className="mock__search">
              <span className="mock__q">📍 Dentists in London</span>
            </div>
            <div className="mock__list scrape-anim__list">
              {[
                { name: 'Harley Street Dental', site: true, delay: 0, meta: '★ 4.8 · 72' },
                { name: 'Smile Clinic Soho', site: true, delay: 1, meta: '★ 4.6 · 54' },
                { name: "King's Cross Smiles", site: false, delay: 3, meta: '★ 4.7 · 36' },
                { name: 'Baker Street Ortho', site: true, delay: 4, meta: '★ 4.9 · 88' },
              ].map((row) => (
                <div
                  key={row.name}
                  className={`mock__row scrape-anim__row is-visible is-done`}
                  data-delay={row.delay}
                >
                  <span className="mock__name">
                    {row.name}
                    <span className={`scrape-anim__site scrape-anim__site--${row.site ? 'yes' : 'no'}`}>
                      {row.site ? '[have website]' : "[haven't website]"}
                    </span>
                  </span>
                  <span className="scrape-anim__state">
                    <span className="scrape-anim__spinner"></span>
                    <span className="scrape-anim__done">✓</span>
                  </span>
                  <span className="mock__meta">{row.meta}</span>
                </div>
              ))}
            </div>
            <div className="mock__count scrape-anim__count">
              <span className="scrape-anim__counter" data-count="0">+ 694 more</span>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp panel */}
      <div
        className={`tabpanel${activeTab === 'whatsapp' ? ' is-active' : ''}`}
        id="panel-whatsapp"
        role="tabpanel"
        aria-labelledby="tab-whatsapp"
        data-panel="whatsapp"
      >
        <div className="showcase__grid">
          <div className="showcase__copy">
            <h3>Verify WhatsApp before you send</h3>
            <p>
              Stop wasting messages on dead numbers. DataMint checks which phones are active on
              WhatsApp so every message lands on a real, reachable contact.
            </p>
            <ul className="ticks">
              <li>Per-number presence detection</li>
              <li>One-toggle filter: "active only"</li>
              <li>Boost reply rates, cut wasted sends</li>
            </ul>
            <a className="btn btn--ghost btn--sm btn--see-how" href="/docs/features/contacts-verification">
              <span>Learn More ↗</span>
            </a>
          </div>
          <div className="wa-anim mock" data-animate="whatsapp" ref={waRef}>
            <div className="mock__bar">
              <span className="mock__url">WhatsApp check</span>
              <span className="mock__pill wa-anim__status" data-status="idle">Checking...</span>
            </div>
            <div className="mock__wa">
              {[
                { num: '+1 (202) 555-0143', active: true, delay: 0 },
                { num: '+1 (315) 555-0188', active: true, delay: 1 },
                { num: '+1 (415) 555-0192', active: false, delay: 2 },
                { num: '+1 (212) 555-0164', active: true, delay: 3 },
                { num: '+1 (305) 555-0177', active: false, delay: 4 },
              ].map((row) => (
                <div
                  key={row.num}
                  className={`mock__warow wa-anim__row${row.active ? ' is-active' : ''}`}
                  data-delay={row.delay}
                >
                  <span className="mock__warow-p">{row.num}</span>
                  <span className="wa-anim__badge">
                    <span className="wa-anim__spinner"></span>
                    <span className="wa-badge on">✓ Active</span>
                    <span className="wa-badge off">Inactive</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Email panel */}
      <div
        className={`tabpanel${activeTab === 'email' ? ' is-active' : ''}`}
        id="panel-email"
        role="tabpanel"
        aria-labelledby="tab-email"
        data-panel="email"
      >
        <div className="showcase__grid">
          <div className="showcase__copy">
            <h3>Extract &amp; verify deliverable B2B emails</h3>
            <p>
              Find decision-maker email addresses directly from business websites and social
              profiles, validated with Reoon for 98%+ deliverability.
            </p>
            <ul className="ticks">
              <li>Automatic website &amp; contact page crawler</li>
              <li>Reoon API integration for SMTP &amp; MX verification</li>
              <li>Zero bounce risk before sending cold outreach</li>
            </ul>
            <a className="btn btn--ghost btn--sm btn--see-how" href="/docs/features/email">
              <span>Learn More ↗</span>
            </a>
          </div>
          <div className="email-anim mock" data-animate="email" ref={emailRef}>
            <div className="mock__bar">
              <span className="mock__url">Email Verification</span>
              <span className="mock__pill email-anim__status" data-status="idle">Reoon Active</span>
            </div>
            <div className="mock__wa">
              {[
                { email: 'info@sultansdine.com', valid: true, delay: 0 },
                { email: 'contact@harleystreet.uk', valid: true, delay: 1 },
                { email: 'hello@starkabab.bd', valid: true, delay: 2 },
                { email: 'support@lonestar.com', valid: false, delay: 3 },
                { email: 'sales@techflow.io', valid: true, delay: 4 },
              ].map((row) => (
                <div
                  key={row.email}
                  className={`mock__warow email-anim__row${row.valid ? ' is-valid' : ''}`}
                  data-delay={row.delay}
                >
                  <span className="mock__warow-p">{row.email}</span>
                  <span className="email-anim__badge">
                    <span className="email-anim__spinner"></span>
                    <span className="wa-badge on">✓ Validated</span>
                    <span className="wa-badge off">Catch-all</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Enrich panel */}
      <div
        className={`tabpanel${activeTab === 'enrich' ? ' is-active' : ''}`}
        id="panel-enrich"
        role="tabpanel"
        aria-labelledby="tab-enrich"
        data-panel="enrich"
      >
        <div className="showcase__grid">
          <div className="showcase__copy">
            <h3>Enrich with #Column AI prompts</h3>
            <p>
              Reference any cell with #ColumnName and the AI agent reasons per row: extracting
              emails, detecting phone types, scoring intent, and showing you exactly why.
            </p>
            <ul className="ticks">
              <li>Transparent reasoning traces</li>
              <li>Email verification via Reoon</li>
              <li>Bring your own OpenAI key</li>
            </ul>
            <a className="btn btn--ghost btn--sm btn--see-how" href="/docs/ai-enrichment/enrichment-prompts">
              <span>Learn More ↗</span>
            </a>
          </div>
          <div className="ai-anim mock mock--ai" data-animate="enrich" ref={enrichRef}>
            <div className="mock__bar">
              <span className="mock__url">AI enrichment agent</span>
              <span className="mock__pill ai-anim__status" data-status="idle">Running</span>
            </div>
            <div className="mock__prompt">
              {[
                { tok: '#Phone', action: '→ detect type & WhatsApp', delay: 0 },
                { tok: '#Website', action: '→ find contact email', delay: 1 },
                { tok: '#Name', action: '→ score intent 0–100', delay: 2 },
              ].map((row) => (
                <div key={row.tok} className="ai-anim__prompt-row" data-delay={row.delay}>
                  <div className="mock__prompt-l">
                    <span className="tok">{row.tok}</span>
                  </div>
                  <div className="mock__prompt-r">{row.action}</div>
                  <span className="ai-anim__check">✓</span>
                </div>
              ))}
            </div>
            <div className="mock__reasoning ai-anim__reasoning">
              <span className="mock__reasoning-tag">reasoning</span>
              <span className="ai-anim__reasoning-text">Thinking...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export panel */}
      <div
        className={`tabpanel${activeTab === 'export' ? ' is-active' : ''}`}
        id="panel-export"
        role="tabpanel"
        aria-labelledby="tab-export"
        data-panel="export"
      >
        <div className="showcase__grid">
          <div className="showcase__copy">
            <h3>Push to your stack in one click</h3>
            <p>
              Export clean CSV/Excel, sync to Google Sheets, fire a webhook, or drop into HubSpot
              and Pipedrive. Reusable preset pickers keep every export consistent.
            </p>
            <ul className="ticks">
              <li>CSV / Excel / Webhook / CRM</li>
              <li>Saved preset pickers</li>
              <li>Column reordering &amp; bulk ops</li>
            </ul>
            <a className="btn btn--ghost btn--sm btn--see-how" href="/docs/features/data-table#import-export">
              <span>Learn More ↗</span>
            </a>
          </div>
          <div className="export-anim mock mock--export" data-animate="export">
            <div className="mock__bar">
              <span className="mock__url">Export</span>
              <span className="mock__pill mock__pill--green">Ready</span>
            </div>
            <div className="mock__export">
              <div className="mock__ex">
                <span className="mock__ex-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </span>
                CSV
                <span className="mock__ex-sub">5,000 rows</span>
              </div>
              <div className="mock__ex">
                <span className="mock__ex-ic">
                  <svg viewBox="0 0 24 24" fill="#0F9D58">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
                  </svg>
                </span>
                Sheets
                <span className="mock__ex-sub">sync</span>
              </div>
              <div className="mock__ex mock__ex--testing">
                <span className="mock__ex-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </span>
                Webhook
                <span className="mock__ex-badge mock__ex-badge--testing">Testing</span>
              </div>
              <div className="mock__ex mock__ex--disabled">
                <span className="mock__ex-ic">
                  <svg viewBox="0 0 24 24" fill="#FF7A59">
                    <path d="M18.8 10.4a3.2 3.2 0 0 0-2.4 1.1l-4.4-2.8a3.2 3.2 0 0 0 .1-.7 3.2 3.2 0 1 0-3.2 3.2c.2 0 .4 0 .6-.1l2.7 4.3a3.2 3.2 0 1 0 5.4-1.2l-2.7-4.3a3.2 3.2 0 0 0 3.9-.5z" />
                  </svg>
                </span>
                HubSpot
                <span className="mock__ex-badge mock__ex-badge--soon">Coming soon</span>
              </div>
              <div className="mock__ex mock__ex--disabled">
                <span className="mock__ex-ic">
                  <svg viewBox="0 0 24 24" fill="#00B875">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2V7h4a3 3 0 0 1 0 6h-2v4zm0-6h2a1 1 0 0 0 0-2h-2v2z" />
                  </svg>
                </span>
                Pipedrive
                <span className="mock__ex-badge mock__ex-badge--soon">Coming soon</span>
              </div>
              <div className="mock__ex mock__ex--blank"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PRICING SECTION
   ============================================================ */
function PricingSection() {
  const [currency, setCurrency] = useState('BDT');
  const [timeLeft, setTimeLeft] = useState({ h: '10', m: '48', s: '10' });

  const prices = {
    BDT: { now: '৳990', was: '৳1490', title: 'Launch offer: save ৳500 today', sub: 'Price returns to ৳1490 after the timer. Lock it in now.', pill: '৳500 OFF' },
    USD: { now: '$10', was: '$19', title: 'Launch offer: save $9 today', sub: 'Price returns to $19 after the timer. Lock it in now.', pill: '$9 OFF' },
  };

  useEffect(() => {
    const pad = (n) => String(n).padStart(2, '0');
    let deadline = parseInt(localStorage.getItem('dm-deadline') || '0', 10);
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + 11 * 3600 * 1000 + 23 * 60 * 1000;
      localStorage.setItem('dm-deadline', String(deadline));
    }
    const tick = () => {
      let rem = Math.max(0, deadline - Date.now());
      setTimeLeft({
        h: pad(Math.floor(rem / 3600000)),
        m: pad(Math.floor((rem % 3600000) / 60000)),
        s: pad(Math.floor((rem % 60000) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('dm-currency') || 'BDT';
    setCurrency(saved);
  }, []);

  const setC = (c) => {
    setCurrency(c);
    localStorage.setItem('dm-currency', c);
    document.querySelectorAll('.currency-switch').forEach((sw) => {
      sw.querySelectorAll('.currency-btn').forEach((btn) => {
        const active = btn.dataset.currency === c;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-checked', active ? 'true' : 'false');
      });
    });
    document.querySelectorAll('[data-bdt-href]').forEach((el) => {
      const href = c === 'USD' ? el.dataset.usdHref : el.dataset.bdtHref;
      if (href) el.setAttribute('href', href);
    });
  };

  const p = prices[currency];

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section__head reveal in">
          <span className="eyebrow">Pricing</span>
          <h2>
            One membership.<br className="mobile-br" />
            Everything unlocked.
          </h2>
          <p>No tiers. No limits. Pay once, scrape unlimited.</p>
        </div>

        <div className="urgency reveal in" id="urgency">
          <div className="urgency__txt">
            <strong id="urgencyTitle">{p.title}</strong>
            <span id="urgencySub">{p.sub}</span>
          </div>
          <div className="urgency__timer" id="timer" aria-live="polite">
            <div className="t-cell">
              <span id="tH">{timeLeft.h}</span><small>HRS</small>
            </div>
            <div className="t-cell">
              <span id="tM">{timeLeft.m}</span><small>MIN</small>
            </div>
            <div className="t-cell">
              <span id="tS">{timeLeft.s}</span><small>SEC</small>
            </div>
          </div>
        </div>

        <div className="pricing2 reveal in">
          {/* Price card */}
          <div className="price-card">
            <div className="price-card__top">
              <div className="currency-switch" id="currencySwitch" role="radiogroup" aria-label="Select Currency">
                <button type="button" role="radio" className={`currency-btn${currency === 'BDT' ? ' is-active' : ''}`} data-currency="BDT" aria-checked={currency === 'BDT'} onClick={() => setC('BDT')}>BDT</button>
                <button type="button" role="radio" className={`currency-btn${currency === 'USD' ? ' is-active' : ''}`} data-currency="USD" aria-checked={currency === 'USD'} onClick={() => setC('USD')}>USD</button>
              </div>
            </div>
            <h3>All-Access Membership</h3>
            <p className="price-card__tag">Full access to every DataMint feature.</p>
            <div className="price-card__price">
              <span id="priceNow" className="price-card__now">{p.now}</span>
              <span id="priceWas" className="price-card__was">{p.was}</span>
            </div>
            <p className="price-card__note">One-time membership · lifetime access</p>
            <a
              className="btn btn--primary btn--block btn--lg"
              href="https://app.datamint.online/get-membership"
              data-bdt-href="https://app.datamint.online/get-membership"
              data-usd-href="https://app.datamint.online/get-membership-usd"
            >
              <span>Get Membership</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <ul className="price-card__assure">
              <li>Instant access</li>
              <li>Lifetime access</li>
              <li>Secure checkout</li>
            </ul>
          </div>

          {/* What's in */}
          <div className="whats-in">
            <h3>Everything you can do</h3>
            <div className="whats-in__grid">
              {[
                { icon: <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></>, title: 'Unlimited Scraping', desc: 'Google Maps, Facebook Groups & web tables' },
                { icon: <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></>, title: 'WhatsApp Check', desc: 'Verify active numbers before you send' },
                { icon: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>, title: 'AI Enrichment', desc: '#Column prompts, email & phone detection' },
                { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>, title: 'Email Verification', desc: 'Reoon-powered deliverability checks' },
                { icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>, title: 'Smart Export', desc: 'CSV, Excel, webhook & CRM sync' },
                { icon: <><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></>, title: 'Lead Scoring', desc: 'AI ranks leads by intent, 0–100' },
                { icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>, title: 'Custom Columns', desc: 'Reusable preset pickers & bulk ops' },
                { icon: <><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></>, title: 'Bring Your Keys', desc: 'Own OpenAI / Serper / Reoon keys' },
              ].map((item) => (
                <div className="wi" key={item.title}>
                  <span className="wi__ico">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {item.icon}
                    </svg>
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   VIDEO PLAYER
   ============================================================ */
function VideoPlayer() {
  const overlayRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const video = videoRef.current;
    if (!overlay || !video) return;

    const play = () => {
      overlay.classList.add('is-hidden');
      video.play?.().catch(() => {});
    };

    overlay.addEventListener('click', play);
    video.addEventListener('play', () => overlay.classList.add('is-hidden'));
    video.addEventListener('pause', () => {
      if (video.currentTime === 0 || video.ended) overlay.classList.remove('is-hidden');
    });

    return () => { overlay.removeEventListener('click', play); };
  }, []);

  return (
    <div className="pg card reveal in" id="videoCard">
      <div className="video-container">
        <mux-player
          id="muxVideo"
          ref={videoRef}
          stream-type="on-demand"
          playback-id="2sPGgzMKybrDMiRRCQVYUDyUbuFNNx4DTOgUAR4b001Q"
          poster="/posters/demo-poster.webp"
          playsinline="true"
        ></mux-player>
        <div className="video-overlay" id="videoOverlay" ref={overlayRef}>
          <button className="play-btn" id="playBtn" aria-label="Play video demo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REVIEWS SECTION
   ============================================================ */
function ReviewCard({ playbackId, poster, quote, boldWord }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    const h = window.scrollY;
    video.paused ? video.play?.().catch(() => {}) : video.pause?.();
    requestAnimationFrame(() => window.scrollTo(0, h));
  };

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    video.addEventListener('play', () => card.classList.add('is-playing'));
    video.addEventListener('pause', () => card.classList.remove('is-playing'));
    video.addEventListener('ended', () => card.classList.remove('is-playing'));
  }, []);

  return (
    <div className="review-card" ref={cardRef}>
      <div className="review-card__media">
        <mux-player
          ref={videoRef}
          className="review-card__video"
          stream-type="on-demand"
          playback-id={playbackId}
          poster={poster}
          playsinline="true"
          no-controls="true"
          style={{ '--media-object-fit': 'cover' }}
        ></mux-player>
        <div className="review-card__hint">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Tap to play
        </div>
        <button className="review-card__tap" onClick={togglePlay} aria-label="Play review" />
      </div>
      <div className="review-card__content">
        <p className="review-card__quote">
          {boldWord ? (
            <>
              &ldquo;<strong>{boldWord}</strong> {quote}&rdquo;
            </>
          ) : (
            <>&ldquo;{quote}&rdquo;</>
          )}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE-LEVEL INIT (reveal, counter animation)
   ============================================================ */
function usePageInit() {
  useEffect(() => {
    // Reveal animation
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Counter animation
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / dur, 1);
          const val = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
          el.textContent = val.toLocaleString() + (progress === 1 ? suffix : '');
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

    // To-top button
    const toTop = document.getElementById('toTop');
    const onScroll = () => {
      if (toTop) toTop.classList.toggle('show', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Mux player CDN (load once)
    if (!document.getElementById('mux-player-script')) {
      const s = document.createElement('script');
      s.id = 'mux-player-script';
      s.src = 'https://cdn.jsdelivr.net/npm/@mux/mux-player/dist/mux-player.mjs';
      s.type = 'module';
      document.head.appendChild(s);
    }

    return () => {
      io.disconnect();
      cio.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}

/* ============================================================
   MAIN HOME PAGE COMPONENT
   ============================================================ */
export default function HomePage() {
  usePageInit();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__glow" aria-hidden="true"></div>
        <div className="container hero__inner">
          <div className="hero__badge reveal in">
            <span className="dot"></span>
            <span>Google Maps Scraping &amp; AI Data Enrichment</span>
          </div>
          <h1 className="hero__title reveal in">
            Scrape &amp; AI-Enrich B2B Leads Into a{' '}
            <span className="grad">Client Machine</span> with DataMint AI
          </h1>
          <p className="hero__sub reveal in">
            Auto-extract verified leads from Google Maps, detect active WhatsApp numbers in real
            time, and enrich contact data in seconds.
          </p>
          <div className="hero__cta reveal in">
            <a className="btn btn--primary btn--lg" href="https://app.datamint.online/get-membership">
              <span>Get Membership</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a className="btn btn--ghost btn--lg" href="#playground" id="watchDemoBtn">
              <svg className="spark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
              </svg>
              <span>Watch Video Demo</span>
            </a>
          </div>
          <div className="hero__trust reveal in">
            <div className="trust">
              <strong data-count="500" data-suffix="+">500+</strong>
              <span>Agencies &amp; Freelancers</span>
            </div>
            <div className="trust__sep"></div>
            <div className="trust">
              <strong>Simple Setup</strong><span>Required</span>
            </div>
            <div className="trust__sep"></div>
            <div className="trust">
              <strong>Instant</strong><span>CSV / Excel Export</span>
            </div>
            <div className="trust__sep"></div>
            <div className="trust">
              <strong>98%+</strong><span>Verified Leads</span>
            </div>
          </div>

          {/* Logo Marquee */}
          <div className="hero__marquee reveal in" aria-label="Supported platforms and integrations">
            <div className="marquee__track">
              {[
                { icon: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#EA4335" />, label: 'Google Maps' },
                { icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />, label: 'Facebook' },
                { icon: <path d="M5 3l4 1.5v12.5l6-3.5v-7l4 1.5v9.5l-10 6-4-2.5v-18z" fill="#00838F" />, label: 'Bing Maps' },
                { icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="#25D366" />, label: 'WhatsApp' },
                { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="#EA4335" /><polyline points="22,6 12,13 2,6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>, label: 'Email Verification' },
                { icon: <><circle cx="12" cy="12" r="10" fill="none" stroke="#4285F4" strokeWidth="2" /><line x1="2" y1="12" x2="22" y2="12" stroke="#4285F4" strokeWidth="2" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="#4285F4" strokeWidth="2" /></>, label: 'Websites' },
                { icon: <path d="M12 2a3 3 0 0 0-3 3v2.17A3.001 3.001 0 0 0 7 10v4a3 3 0 0 0 2 2.83V19a3 3 0 1 0 6 0v-2.17A3.001 3.001 0 0 0 17 14v-4a3 3 0 0 0-2-2.83V5a3 3 0 0 0-3-3z" fill="#F54F08" stroke="#fff" strokeWidth="0.6" />, label: 'n8n Integration' },
                { icon: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="#0F9D58" />, label: 'Google Sheets' },
              ].flatMap((item) => [item, { ...item, key2: true }]).map((item, idx) => (
                <div className="marquee__item" key={idx}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">{item.icon}</svg>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        <span id="top"></span>

        {/* Playground / Video */}
        <section className="section playground" id="playground">
          <div className="container">
            <VideoPlayer />
            <div className="pg__note reveal in">
              <span>See the full DataMint product tour: scraping, enrichment, and export in under 2 minutes.</span>
              <a
                href="https://wa.me/8801999558881?text=Hi%2C%20I%27m%20interested%20in%20DataMint.%20Can%20you%20help%20me%20get%20started%3F"
                className="pg__wa-cta"
                target="_blank"
                rel="noopener"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Have questions? Chat with us on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Showcase / Features */}
        <section className="section showcase" id="features">
          <div className="container">
            <div className="section__head reveal in">
              <span className="eyebrow">Product Features</span>
              <h2>Everything that you need in one place</h2>
              <p>Skip manual research. DataMint scrapes, enriches, and preps outreach in minutes.</p>
            </div>
            <ShowcaseTabs />

            {/* Steps */}
            <div className="steps" style={{ marginTop: '64px', marginBottom: '24px' }}>
              {[
                { num: '01', title: 'Scraping & Import', desc: 'Type a niche and city. DataMint auto-scrolls Google Maps and extracts thousands of business listings including names, phones, websites, and ratings.' },
                { num: '02', title: 'WhatsApp & Email', desc: 'Filter and verify which numbers are active on WhatsApp before you ever send a message. Stop wasting time on dead leads.' },
                { num: '03', title: 'AI Enrichment', desc: 'The AI agent enriches emails, detects phone types, and scores leads by intent so you target the hottest decision-makers first.' },
                { num: '04', title: 'Automated Marketing', desc: 'Export clean CSV / Excel, push to your CRM, or fire a webhook. Your pipeline is ready in minutes, not weeks.' },
              ].map((s) => (
                <article className="step reveal in" key={s.num}>
                  <div className="step__num">{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section reviews" id="reviews">
          <div className="container">
            <div className="section__head reveal in">
              <span className="eyebrow">Customer Reviews</span>
              <h2>Loved by Agencies &amp; Freelancers</h2>
              <p>See how teams use DataMint AI to scale their outreach and close deals faster.</p>
            </div>
            <div className="reviews__grid reveal in">
              <ReviewCard
                playbackId="EQ25F6r02mLeZV9zD8021Cvmytt00fc1ICcThZPQmbHlUo"
                poster="/posters/review-1.webp"
                quote="DataMint changed the way I prospect. I get 200+ verified leads in under 10 minutes."
                boldWord="DataMint changed"
              />
              <ReviewCard
                playbackId="cjg502Wft2sU01dXJaBu5JY02OX1jNi01YVUy5PYhfzDg00"
                poster="/posters/review-2.webp"
                quote="The WhatsApp check alone saved us from wasting hours on dead numbers."
                boldWord="WhatsApp check"
              />
              <ReviewCard
                playbackId="ThKv01PGvv01mMFwv9EEJbvFXl9lKLMcME00iNEMQJKiZE"
                poster="/posters/review-3.webp"
                quote="AI enrichment with #Column is insane. It writes reasoning for every single lead."
                boldWord="AI enrichment"
              />
              {/* Submit CTA card */}
              <div className="review-card review-card--cta">
                <div className="review-card__cta-inner">
                  <div className="review-card__cta-ico">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 7l-7 5 7 5V7z" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      <line x1="12" y1="9" x2="12" y2="15" />
                      <line x1="9" y1="12" x2="15" y2="12" />
                    </svg>
                  </div>
                  <h3>Submit Your Experience</h3>
                  <p>Recorded a video review or have feedback? Share your story and get featured on our page!</p>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf9BOKw53BGCOG-Ow3zY7AspheExBpm8zkDKjyrfBWbVJYyjQ/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener"
                    className="btn btn--primary btn--sm"
                  >
                    <span>Submit Review</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* FAQ */}
        <section className="section faq" id="faq">
          <div className="container">
            <div className="section__head reveal in">
              <span className="eyebrow">FAQ</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="accordion" id="faqList">
              {[
                { q: 'How accurate are the leads?', a: 'DataMint pulls live data directly from Google Maps and verifies each phone with a WhatsApp presence check. Email deliverability is validated via Reoon, giving you a 98%+ accuracy rate on exported leads.' },
                { q: 'Do I need to log in to try it?', a: "No. Scroll up to the Live Playground and simulate a scrape instantly: no account, no email, no credit card. When you're ready for real data, grab a membership." },
                { q: 'How fast is the scraping?', a: 'Thanks to the dual WAF-bypass engine and cloud acceleration, DataMint can extract thousands of listings in minutes with zero lag, even on Cloudflare-protected sites.' },
                { q: 'Can I use my own API keys?', a: "Yes. DataMint is fully BYOK: bring your own OpenAI, Serper, and Reoon keys. There's no server-side credit billing or markup, so you control every cent of cost." },
                { q: 'What payment methods do you accept?', a: 'Membership checkout runs through our secure WooCommerce store at app.datamint.online/get-membership, supporting cards, mobile wallets, and local payment methods.' },
                { q: 'Can I cancel anytime?', a: 'Absolutely. Manage or cancel your membership anytime from your account dashboard. No lock-in, no penalties.' },
              ].map((item) => (
                <details className="acc reveal in" key={item.q} open>
                  <summary>
                    <span>{item.q}</span>
                    <svg className="acc__chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="acc__body"><p>{item.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                { '@type': 'Question', name: 'How accurate are the leads?', acceptedAnswer: { '@type': 'Answer', text: 'DataMint pulls live data directly from Google Maps...' } },
              ],
            }),
          }}
        />
      </main>

      {/* To-top button */}
      <button className="to-top" id="toTop" aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
