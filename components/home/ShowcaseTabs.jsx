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
              <span>Learn More â†—</span>
            </a>
          </div>
          <div className="scrape-anim mock" data-animate="scrape" ref={scrapeRef}>
            <div className="mock__bar">
              <span className="mock__url">maps.google.com</span>
              <span className="mock__pill scrape-anim__status" data-status="processing">Scraping...</span>
            </div>
            <div className="mock__search">
              <span className="mock__q">ðŸ“ Dentists in London</span>
            </div>
            <div className="mock__list scrape-anim__list">
              {[
                { name: 'Harley Street Dental', site: true, delay: 0, meta: 'â˜… 4.8 Â· 72' },
                { name: 'Smile Clinic Soho', site: true, delay: 1, meta: 'â˜… 4.6 Â· 54' },
                { name: "King's Cross Smiles", site: false, delay: 3, meta: 'â˜… 4.7 Â· 36' },
                { name: 'Baker Street Ortho', site: true, delay: 4, meta: 'â˜… 4.9 Â· 88' },
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
                    <span className="scrape-anim__done">âœ“</span>
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
              <span>Learn More â†—</span>
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
                    <span className="wa-badge on">âœ“ Active</span>
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
              <span>Learn More â†—</span>
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
                    <span className="wa-badge on">âœ“ Validated</span>
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
              <span>Learn More â†—</span>
            </a>
          </div>
          <div className="ai-anim mock mock--ai" data-animate="enrich" ref={enrichRef}>
            <div className="mock__bar">
              <span className="mock__url">AI enrichment agent</span>
              <span className="mock__pill ai-anim__status" data-status="idle">Running</span>
            </div>
            <div className="mock__prompt">
              {[
                { tok: '#Phone', action: 'â†’ detect type & WhatsApp', delay: 0 },
                { tok: '#Website', action: 'â†’ find contact email', delay: 1 },
                { tok: '#Name', action: 'â†’ score intent 0â€“100', delay: 2 },
              ].map((row) => (
                <div key={row.tok} className="ai-anim__prompt-row" data-delay={row.delay}>
                  <div className="mock__prompt-l">
                    <span className="tok">{row.tok}</span>
                  </div>
                  <div className="mock__prompt-r">{row.action}</div>
                  <span className="ai-anim__check">âœ“</span>
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
              <span>Learn More â†—</span>
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

export default ShowcaseTabs;
