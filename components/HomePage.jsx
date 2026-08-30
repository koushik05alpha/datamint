'use client';

import { useEffect } from 'react';
import ShowcaseTabs from './home/ShowcaseTabs';
import PricingSection from './home/PricingSection';
import VideoPlayer from './home/VideoPlayer';
import ReviewCard from './home/ReviewCard';

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
