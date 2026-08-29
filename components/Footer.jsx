'use client';

import { useEffect } from 'react';
import Link from 'next/link';

function BrandLogo() {
  return (
    <svg className="brand__mark" width="26" height="27" aria-hidden="true" viewBox="0 0 26 27">
      <path
        d="M10.8516 0C13.8465 3.49583e-05 16.4254 0.540131 18.5879 1.62109C20.7599 2.69327 22.4344 4.24046 23.6113 6.26172C24.7883 8.27431 25.3769 10.6828 25.377 13.4863C25.377 16.2988 24.7883 18.7159 23.6113 20.7373C22.4439 22.7587 20.7746 24.3106 18.6025 25.3916C16.4304 26.4639 13.8508 27 10.8652 27H0V21.3936H7.10547V21.4365H10.5928C12.2385 21.4365 13.6309 21.1815 14.7695 20.6719C15.9178 20.1533 16.7845 19.3135 17.3682 18.1533C17.9613 16.9844 18.2578 15.4285 18.2578 13.4863C18.2578 11.5441 17.9614 9.99699 17.3682 8.8457C16.7749 7.68564 15.899 6.85056 14.7412 6.34082C13.5929 5.82228 12.1763 5.56348 10.4922 5.56348H7.10547V5.60645H0V0H10.8516Z"
        fill="#21883D"
      />
      <rect y="8.9999" width="6.78689" height="8.9999" fill="#21883D" />
      <path
        d="M9 9H11.7869C13.996 9 15.7869 10.7909 15.7869 13V13.9999C15.7869 16.209 13.996 17.9999 11.7869 17.9999H9V9Z"
        fill="#21883D"
      />
      <rect width="6.78689" height="5.6065" fill="#CFE7D6" />
      <rect y="21.3932" width="6.78689" height="5.6065" fill="#CFE7D6" />
    </svg>
  );
}

export default function Footer() {
  useEffect(() => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }, []);

  return (
    <footer className="footer">
      {/* FINAL CTA */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band__inner reveal in">
            <div>
              <h2>Your competitors are already scraping. Are you?</h2>
              <p>
                Join thousands of agencies generating leads on autopilot with DataMint AI.
              </p>
            </div>
            <a
              className="btn btn--light btn--lg"
              href="https://app.datamint.online/get-membership"
            >
              <span>Get Membership</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <div className="container footer__inner">
        <div className="footer__brand">
          <Link href="/#top" className="brand">
            <BrandLogo />
            <span className="brand__word">DataMint</span>
          </Link>
          <p className="footer__tag">
            The AI-powered lead generation &amp; data enrichment engine built for closers.
          </p>
          <div className="footer__socials">
            <a
              href="https://www.facebook.com/msudigitalstudio"
              target="_blank"
              rel="noopener"
              className="social-icon"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://wa.me/8801999558881"
              target="_blank"
              rel="noopener"
              className="social-icon"
              aria-label="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
            <a
              href="mailto:info@datamint.online"
              className="social-icon"
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <h4>Product</h4>
            <Link href="/#features">Features</Link>
            <Link href="/#pricing">Pricing</Link>
          </div>
          <div className="footer__col">
            <h4>Resources</h4>
            <Link href="/docs">Docs</Link>
            <Link href="/resource">Resource</Link>
            <Link href="/roadmap">Roadmap</Link>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms and Conditions</Link>
            <Link href="/refund">Refund Policy</Link>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <span className="footer__status">Product of MSU Digital Studio</span>
        <span>
          © <span id="year">{new Date().getFullYear()}</span> DataMint. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
