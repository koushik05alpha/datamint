'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
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
      <main id="main" dangerouslySetInnerHTML={{ __html: "\n      <span id=\"top\"></span>\n      <section class=\"page-hero\">\n        <div class=\"container\">\n          <span class=\"eyebrow\">Legal</span>\n          <h1>Privacy Policy</h1>\n          <p>How DataMint collects, uses, and protects your information.</p>\n        </div>\n      </section>\n      <div class=\"container\">\n        <article class=\"prose legal-page\">\n          <p><em>Last updated: August 8, 2026</em></p>\n          <p>\n            This Privacy Policy explains how MSU Digital Studio (“DataMint,”\n            “we,” “us,” or “our”) collects, uses, and protects information when\n            you use our website at\n            <a href=\"https://datamint.online\">datamint.online</a> and our\n            application at\n            <a href=\"https://app.datamint.online\">app.datamint.online</a>\n            (collectively, the “Service”). By using the Service, you agree to\n            the practices described below.\n          </p>\n          <h2 id=\"1-information-we-collect\">1. Information We Collect</h2>\n          <p>\n            We collect information necessary to operate, secure, and improve the\n            Service:\n          </p>\n          <ul>\n            <li>\n              <strong>Account information:</strong> name, email address, and\n              password when you create a membership account.\n            </li>\n            <li>\n              <strong>Payment information:</strong> transactions are processed\n              securely through our WooCommerce checkout. We do not store full\n              card numbers on our servers.\n            </li>\n            <li>\n              <strong>Usage data:</strong> pages visited, features used, device\n              type, browser, and approximate location (IP-based).\n            </li>\n            <li>\n              <strong>Scraped lead data:</strong> business listing data you\n              extract using the Service is stored in your account to power\n              enrichment and export.\n            </li>\n          </ul>\n          <h2 id=\"2-how-we-use-your-information\">\n            2. How We Use Your Information\n          </h2>\n          <ul>\n            <li>To provide, maintain, and improve the Service.</li>\n            <li>\n              To process membership payments and manage your subscription.\n            </li>\n            <li>\n              To communicate with you about updates, security, and support.\n            </li>\n            <li>To monitor for abuse, fraud, and violations of our Terms.</li>\n            <li>To comply with legal obligations.</li>\n          </ul>\n          <h2 id=\"3-third-party-services\">3. Third-Party Services</h2>\n          <p>\n            The Service integrates with third-party providers that process data\n            on your behalf when you connect your own keys or use built-in\n            features:\n          </p>\n          <ul>\n            <li>\n              <strong>OpenAI</strong> - for AI enrichment (Bring Your Own Key).\n            </li>\n            <li><strong>Serper</strong> - for search result retrieval.</li>\n            <li>\n              <strong>Reoon</strong> - for email deliverability verification.\n            </li>\n            <li>\n              <strong>Google Sheets, HubSpot, Pipedrive</strong> - for export\n              integrations you authorize.\n            </li>\n          </ul>\n          <p>\n            These providers have their own privacy policies governing how they\n            handle data.\n          </p>\n          <h2 id=\"4-data-retention\">4. Data Retention</h2>\n          <p>\n            We retain your account and scraped data for as long as your\n            membership is active. You may request deletion of your data at any\n            time. After account closure, we delete personal data within 30 days,\n            except where retention is required by law.\n          </p>\n          <h2 id=\"5-cookies\">5. Cookies</h2>\n          <p>\n            We use essential cookies and local storage to remember your theme\n            preference (dark/light), currency selection (BDT/USD), and session\n            state. We do not sell your data to third parties.\n          </p>\n          <h2 id=\"6-data-security\">6. Data Security</h2>\n          <p>\n            We use industry-standard safeguards including encrypted transit\n            (TLS), access controls, and regular security reviews. No method of\n            transmission or storage is 100% secure, but we work hard to protect\n            your information.\n          </p>\n          <h2 id=\"7-your-rights\">7. Your Rights</h2>\n          <p>\n            Depending on your location (e.g., GDPR, CCPA), you may have the\n            right to access, correct, export, or delete your personal data. To\n            exercise these rights, contact us at\n            <a href=\"mailto:info@datamint.online\">info@datamint.online</a>.\n          </p>\n          <h2 id=\"8-childrens-privacy\">8. Children’s Privacy</h2>\n          <p>\n            The Service is not directed to anyone under 16. We do not knowingly\n            collect data from children. If you believe a minor has provided us\n            data, please contact us for prompt deletion.\n          </p>\n          <h2 id=\"9-changes-to-this-policy\">9. Changes to This Policy</h2>\n          <p>\n            We may update this Privacy Policy from time to time. Material\n            changes will be posted on this page with an updated revision date.\n          </p>\n          <h2 id=\"10-contact\">10. Contact</h2>\n          <p>\n            Questions about this policy? Email\n            <a href=\"mailto:info@datamint.online\">info@datamint.online</a>.\n          </p>\n        </article>\n      </div>\n    " }} />
      <Footer />
      <button className="to-top" id="toTop" aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
