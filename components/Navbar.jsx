'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

/* Inline SVG brand logo as a component */
function BrandLogo() {
  return (
    <svg className="brand__mark" width="30" height="31" aria-hidden="true" viewBox="0 0 26 27">
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

export default function Navbar() {
  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const burger = burgerRef.current;
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;

    if (!burger || !drawer) return;

    let drawerOpen = false;
    let ticking = false;

    const openDrawer = () => {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
      drawerOpen = true;
    };

    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
      drawerOpen = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };

    burger.addEventListener('click', () => (drawerOpen ? closeDrawer() : openDrawer()));
    if (overlay) overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerOpen) closeDrawer();
    });

    // Close drawer on anchor link click
    drawer.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeDrawer);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        const apply = () => {
          html.setAttribute('data-theme', next);
          localStorage.setItem('dm-theme', next);
        };
        if (document.startViewTransition) {
          document.startViewTransition(apply);
        } else {
          html.classList.add('theme-flash-active');
          apply();
          setTimeout(() => html.classList.remove('theme-flash-active'), 450);
        }
      });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <header className="nav scrolled" id="nav" ref={navRef}>
        <div className="nav__inner">
          <Link href="/#top" className="brand" aria-label="DataMint home">
            <BrandLogo />
            <span className="brand__word">DataMint</span>
          </Link>
          <nav className="nav__links" id="navLinks" aria-label="Primary">
            <Link href="/#features">Features</Link>
            <Link href="/#reviews">Reviews</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/resource">
              Resource <span className="nav__badge">New</span>
            </Link>
          </nav>
          <div className="nav__actions">
            <button
              className="icon-btn"
              id="themeToggle"
              aria-label="Toggle dark mode"
              title="Toggle theme"
            >
              <svg
                className="i-sun"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
              <svg
                className="i-moon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <a
              className="btn btn--primary nav__cta"
              href="https://app.datamint.online/get-membership"
              data-bdt-href="https://app.datamint.online/get-membership"
              data-usd-href="https://app.datamint.online/get-membership-usd"
            >
              <span>Get Membership</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <button
              className="nav__burger"
              id="burger"
              ref={burgerRef}
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="drawer"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className="drawer" id="drawer" ref={drawerRef} aria-hidden="true">
        <div className="drawer__overlay" id="drawerOverlay" ref={overlayRef}></div>
        <div className="drawer__panel">
          <nav className="drawer__nav" aria-label="Mobile">
            <Link href="/#features" data-close="">Features</Link>
            <Link href="/#reviews" data-close="">Reviews</Link>
            <Link href="/#pricing" data-close="">Pricing</Link>
            <Link href="/docs" data-close="">Docs</Link>
            <Link href="/resource" data-close="">
              Resource <span className="nav__badge">New</span>
            </Link>
          </nav>
          <div className="drawer__foot">
            <a
              className="btn btn--primary btn--block"
              href="https://app.datamint.online/get-membership"
              data-bdt-href="https://app.datamint.online/get-membership"
              data-usd-href="https://app.datamint.online/get-membership-usd"
              data-close=""
            >
              <span>Get Membership</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
