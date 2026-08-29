'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RefundPage() {
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
      <main id="main" dangerouslySetInnerHTML={{ __html: "\n      <span id=\"top\"></span>\n      <section class=\"page-hero\">\n        <div class=\"container\">\n          <span class=\"eyebrow\">Legal</span>\n          <h1>Refund Policy</h1>\n          <p>Our policy on refunds and membership cancellations.</p>\n        </div>\n      </section>\n      <div class=\"container\">\n        <article class=\"prose legal-page\">\n          <p><em>Last updated: August 8, 2026</em></p>\n          <p>\n            We want you to be confident in your DataMint membership. This Refund\n            Policy explains when and how refunds are handled for purchases made\n            through our WooCommerce checkout at\n            <a href=\"https://app.datamint.online/get-membership\"\n              >app.datamint.online/get-membership</a\n            >.\n          </p>\n          <h2 id=\"1-digital-product-notice\">1. Digital Product Notice</h2>\n          <p>\n            DataMint is a digital product. Once your membership is activated,\n            you gain immediate access to all features, scraped data, and\n            integrations. Because digital goods cannot be “returned,” refunds\n            are evaluated on a case-by-case basis.\n          </p>\n          <h2 id=\"2-7-day-satisfaction-window\">2. 7-Day Satisfaction Window</h2>\n          <p>\n            If you are not satisfied with your purchase, you may request a\n            refund within <strong>7 days</strong> of your purchase date,\n            provided that:\n          </p>\n          <ul>\n            <li>\n              You have not extracted or exported a substantial volume of leads\n              (e.g., more than 1,000 rows).\n            </li>\n            <li>\n              You have not violated our\n              <a href=\"/terms\">Terms and Conditions</a>.\n            </li>\n            <li>\n              You contact us at\n              <a href=\"mailto:info@datamint.online\">info@datamint.online</a>\n              with your order details.\n            </li>\n          </ul>\n          <h2 id=\"3-non-refundable-cases\">3. Non-Refundable Cases</h2>\n          <p>Refunds will generally not be issued if:</p>\n          <ul>\n            <li>The 7-day window has passed.</li>\n            <li>\n              The account shows significant usage indicating the Service was\n              used as intended.\n            </li>\n            <li>\n              The refund request is due to third-party API costs (OpenAI,\n              Serper, Reoon) you incurred under your own keys.\n            </li>\n            <li>A violation of our Terms led to account suspension.</li>\n          </ul>\n          <h2 id=\"4-how-to-request-a-refund\">4. How to Request a Refund</h2>\n          <p>\n            Email\n            <a href=\"mailto:info@datamint.online\">info@datamint.online</a> with:\n          </p>\n          <ol>\n            <li>Your full name and registered email.</li>\n            <li>Your WooCommerce order number.</li>\n            <li>A brief reason for the request.</li>\n          </ol>\n          <p>\n            We aim to respond to all refund requests within 3 business days.\n          </p>\n          <h2 id=\"5-processing-refunds\">5. Processing Refunds</h2>\n          <p>\n            Approved refunds are issued back to the original payment method\n            through WooCommerce. Depending on your bank or card issuer, funds\n            may take 5–10 business days to appear.\n          </p>\n          <h2 id=\"6-cancellation\">6. Cancellation</h2>\n          <p>\n            You can cancel your membership at any time from your account\n            dashboard. Since our plan is a one-time membership with lifetime\n            access, cancellation stops future billing (if any) but does not\n            automatically trigger a refund - see the satisfaction window above.\n          </p>\n          <h2 id=\"7-chargebacks\">7. Chargebacks</h2>\n          <p>\n            Please contact us before initiating a chargeback. Unwarranted\n            chargebacks may result in account suspension and a dispute with your\n            card issuer.\n          </p>\n          <h2 id=\"8-contact\">8. Contact</h2>\n          <p>\n            Refund questions? Email\n            <a href=\"mailto:info@datamint.online\">info@datamint.online</a>.\n          </p>\n        </article>\n      </div>\n    " }} />
      <Footer />
      <button className="to-top" id="toTop" aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
