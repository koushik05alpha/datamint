'use client';

import { useEffect, useRef, useState } from 'react';

/* ============================================================
   PRICING SECTION
   ============================================================ */
function PricingSection() {
  const [currency, setCurrency] = useState('BDT');
  const [timeLeft, setTimeLeft] = useState({ h: '10', m: '48', s: '10' });

  const prices = {
    BDT: { now: 'à§³990', was: 'à§³1490', title: 'Launch offer: save à§³500 today', sub: 'Price returns to à§³1490 after the timer. Lock it in now.', pill: 'à§³500 OFF' },
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
            <p className="price-card__note">One-time membership Â· lifetime access</p>
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
                { icon: <><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></>, title: 'Lead Scoring', desc: 'AI ranks leads by intent, 0â€“100' },
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

export default PricingSection;
