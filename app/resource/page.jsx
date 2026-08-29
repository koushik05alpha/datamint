'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResourcePage() {
  useEffect(() => {
    // Reveal animation
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

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
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: "\n      <span id=\"top\"></span>\n      <div class=\"academy-hub-page\" data-astro-cid-55engxii=\"\">\n        <header class=\"academy-hero\" data-astro-cid-55engxii=\"\">\n          <div\n            class=\"academy-hero__glow\"\n            aria-hidden=\"true\"\n            data-astro-cid-55engxii=\"\"\n          ></div>\n          <div class=\"container academy-hero__inner\" data-astro-cid-55engxii=\"\">\n            <span class=\"eyebrow\" data-astro-cid-55engxii=\"\"\n              >DataMint Resource</span\n            >\n            <h1 data-astro-cid-55engxii=\"\">Video Masterclasses &amp; Series</h1>\n            <p data-astro-cid-55engxii=\"\">\n              Explore step-by-step video courses, cold outreach walkthroughs,\n              and AI lead enrichment masterclasses to grow your agency.\n            </p>\n          </div>\n        </header>\n        <main class=\"container academy-list-sec\" data-astro-cid-55engxii=\"\">\n          <div class=\"series-grid\" data-astro-cid-55engxii=\"\">\n            <!-- Coming Soon Card -->\n            <div\n              class=\"series-card series-card--coming-soon\"\n              data-astro-cid-55engxii=\"\"\n            >\n              <div class=\"series-card__thumb\" data-astro-cid-55engxii=\"\">\n                <div class=\"coming-soon-overlay\" data-astro-cid-55engxii=\"\">\n                  <span class=\"coming-soon-badge\" data-astro-cid-55engxii=\"\"\n                    ><svg\n                      xmlns=\"http://www.w3.org/2000/svg\"\n                      width=\"14\"\n                      height=\"14\"\n                      viewBox=\"0 0 24 24\"\n                      fill=\"none\"\n                      stroke=\"currentColor\"\n                      stroke-width=\"2\"\n                      stroke-linecap=\"round\"\n                      stroke-linejoin=\"round\"\n                      aria-hidden=\"true\"\n                      style=\"\n                        display: inline-block;\n                        vertical-align: -2px;\n                        margin-right: 4px;\n                      \"\n                      data-astro-cid-55engxii=\"true\"\n                      class=\"lucide lucide-sparkles\"\n                    >\n                      <path\n                        d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"\n                      />\n                      <path d=\"M20 2v4\" />\n                      <path d=\"M22 4h-4\" />\n                      <circle cx=\"4\" cy=\"20\" r=\"2\" />\n                    </svg>\n                    Coming Soon</span\n                  >\n                </div>\n              </div>\n              <div class=\"series-card__body\" data-astro-cid-55engxii=\"\">\n                <div class=\"series-card__meta\" data-astro-cid-55engxii=\"\">\n                  <span class=\"series-tag\" data-astro-cid-55engxii=\"\"\n                    >MASTERCLASS SERIES</span\n                  >\n                </div>\n                <h3 data-astro-cid-55engxii=\"\">Client Hunting Series</h3>\n                <p data-astro-cid-55engxii=\"\">\n                  Master per-week strategies for finding, enriching, and closing\n                  B2B clients using DataMint AI.\n                </p>\n                <!-- Countdown Timer -->\n                <div\n                  class=\"countdown-wrap\"\n                  id=\"countdownWrap\"\n                  data-astro-cid-55engxii=\"\"\n                >\n                  <div class=\"countdown-launched\">Now Live!</div>\n                </div>\n                <div class=\"series-card__footer\" data-astro-cid-55engxii=\"\">\n                  <span class=\"series-stat\" data-astro-cid-55engxii=\"\">\n                    <svg\n                      xmlns=\"http://www.w3.org/2000/svg\"\n                      width=\"15\"\n                      height=\"15\"\n                      viewBox=\"0 0 24 24\"\n                      fill=\"none\"\n                      stroke=\"currentColor\"\n                      stroke-width=\"2\"\n                      stroke-linecap=\"round\"\n                      stroke-linejoin=\"round\"\n                      aria-hidden=\"true\"\n                      style=\"\n                        display: inline-block;\n                        vertical-align: -2px;\n                        margin-right: 4px;\n                      \"\n                      data-astro-cid-55engxii=\"true\"\n                      class=\"lucide lucide-video\"\n                    >\n                      <path\n                        d=\"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5\"\n                      />\n                      <rect x=\"2\" y=\"6\" width=\"14\" height=\"12\" rx=\"2\" />\n                    </svg>\n                    3+ Episodes\n                  </span>\n                  <span\n                    class=\"series-btn series-btn--disabled\"\n                    data-astro-cid-55engxii=\"\"\n                    >Coming Soon</span\n                  >\n                </div>\n              </div>\n            </div>\n          </div>\n        </main>\n      </div>\n    " }} />
      <Footer />
      <button className="to-top" id="toTop" aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
