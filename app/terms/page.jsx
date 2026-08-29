'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
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
      <main id="main" dangerouslySetInnerHTML={{ __html: "\n      <span id=\"top\"></span>\n      <section class=\"page-hero\">\n        <div class=\"container\">\n          <span class=\"eyebrow\">Legal</span>\n          <h1>Terms and Conditions</h1>\n          <p>The rules and conditions for using DataMint.</p>\n        </div>\n      </section>\n      <div class=\"container\">\n        <article class=\"prose legal-page\">\n          <p><em>Last updated: August 8, 2026</em></p>\n          <p>\n            These Terms and Conditions (“Terms”) govern your access to and use\n            of the DataMint website and application (the “Service”) operated by\n            MSU Digital Studio (“DataMint,” “we,” or “us”). By creating an\n            account or using the Service, you agree to these Terms.\n          </p>\n          <h2 id=\"1-eligibility\">1. Eligibility</h2>\n          <p>\n            You must be at least 16 years old and legally able to enter into a\n            binding agreement to use the Service. By using the Service, you\n            represent that you meet these requirements.\n          </p>\n          <h2 id=\"2-your-account\">2. Your Account</h2>\n          <p>\n            You are responsible for maintaining the confidentiality of your\n            account credentials and for all activity under your account. Notify\n            us immediately at\n            <a href=\"mailto:info@datamint.online\">info@datamint.online</a> of\n            any unauthorized use.\n          </p>\n          <h2 id=\"3-membership-and-billing\">3. Membership and Billing</h2>\n          <ul>\n            <li>\n              Membership is sold as a one-time, all-access plan with lifetime\n              access unless otherwise stated.\n            </li>\n            <li>\n              Payments are processed through our secure WooCommerce checkout at\n              <a href=\"https://app.datamint.online/get-membership\"\n                >app.datamint.online/get-membership</a\n              >.\n            </li>\n            <li>\n              Prices are displayed in BDT (৳) by default, with a USD ($) option.\n              You are charged in the currency you select at checkout.\n            </li>\n            <li>\n              Taxes, if applicable, are added at checkout per your billing\n              region.\n            </li>\n          </ul>\n          <h2 id=\"4-acceptable-use\">4. Acceptable Use</h2>\n          <p>You agree NOT to:</p>\n          <ul>\n            <li>\n              Use the Service to scrape or contact individuals in violation of\n              applicable laws (e.g., GDPR, CAN-SPAM, TCPA, or local data\n              protection laws).\n            </li>\n            <li>\n              Send unsolicited commercial messages to numbers or emails that\n              have not opted in where required.\n            </li>\n            <li>\n              Resell, sublicense, or redistribute scraped data as a standalone\n              dataset without adding material value.\n            </li>\n            <li>\n              Attempt to reverse engineer, overload, hack, or disrupt the\n              Service.\n            </li>\n            <li>\n              Use the Service for fraudulent, abusive, or illegal purposes.\n            </li>\n          </ul>\n          <p>\n            You are solely responsible for how you use the leads and data you\n            extract.\n          </p>\n          <h2 id=\"5-bring-your-own-keys-byok\">5. Bring Your Own Keys (BYOK)</h2>\n          <p>\n            The Service allows you to connect your own OpenAI, Serper, and Reoon\n            API keys. You are responsible for all costs, rate limits, and\n            compliance associated with your own keys. We do not mark up or bill\n            for your third-party API usage.\n          </p>\n          <h2 id=\"6-intellectual-property\">6. Intellectual Property</h2>\n          <p>\n            The Service, including its design, software, branding, and\n            documentation, is the property of MSU Digital Studio and protected\n            by intellectual property laws. Scraped business data belongs to you,\n            subject to the source’s terms.\n          </p>\n          <h2 id=\"7-disclaimer-of-warranties\">7. Disclaimer of Warranties</h2>\n          <p>\n            The Service is provided “as is” and “as available” without\n            warranties of any kind, express or implied. We do not guarantee that\n            leads are 100% accurate, deliverable, or current, or that the\n            Service will be uninterrupted or error-free.\n          </p>\n          <h2 id=\"8-limitation-of-liability\">8. Limitation of Liability</h2>\n          <p>\n            To the maximum extent permitted by law, DataMint shall not be liable\n            for any indirect, incidental, special, or consequential damages, or\n            for any loss of profits or data, arising out of your use of the\n            Service.\n          </p>\n          <h2 id=\"9-indemnification\">9. Indemnification</h2>\n          <p>\n            You agree to indemnify and hold DataMint harmless from claims,\n            damages, and expenses arising from your misuse of the Service or\n            violation of these Terms or applicable law.\n          </p>\n          <h2 id=\"10-termination\">10. Termination</h2>\n          <p>\n            We may suspend or terminate your access if you violate these Terms.\n            You may stop using the Service and cancel your membership at any\n            time from your account dashboard.\n          </p>\n          <h2 id=\"11-governing-law\">11. Governing Law</h2>\n          <p>\n            These Terms are governed by the laws of the jurisdiction in which\n            MSU Digital Studio operates, without regard to conflict-of-law\n            principles.\n          </p>\n          <h2 id=\"12-changes-to-these-terms\">12. Changes to These Terms</h2>\n          <p>\n            We may revise these Terms periodically. Continued use after changes\n            constitutes acceptance of the updated Terms.\n          </p>\n          <h2 id=\"13-contact\">13. Contact</h2>\n          <p>\n            Questions about these Terms? Email\n            <a href=\"mailto:info@datamint.online\">info@datamint.online</a>.\n          </p>\n        </article>\n      </div>\n    " }} />
      <Footer />
      <button className="to-top" id="toTop" aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
