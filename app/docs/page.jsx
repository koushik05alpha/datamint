'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HUB_HTML = " <span id=\"top\"></span>  <div class=\"docs-hub-page\" data-astro-cid-zsukdfzm> <header class=\"docs-hero\" data-astro-cid-zsukdfzm> <div class=\"docs-hero__glow\" aria-hidden=\"true\" data-astro-cid-zsukdfzm></div> <div class=\"container docs-hero__inner\" data-astro-cid-zsukdfzm> <span class=\"eyebrow\" data-astro-cid-zsukdfzm>DataMint Knowledge Base</span> <h1 data-astro-cid-zsukdfzm>How can we help you today?</h1> <p data-astro-cid-zsukdfzm>Search complete product documentation, step-by-step setup guides, cold outreach prompts, and AI enrichment tutorials below.</p> <!-- Live Documentation Search Input --> <div class=\"docs-search-wrap\" data-astro-cid-zsukdfzm> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-search search-ico\"> <path d=\"m21 21-4.34-4.34\"></path><circle cx=\"11\" cy=\"11\" r=\"8\"></circle>  </svg> <input type=\"text\" id=\"docsSearch\" placeholder=\"Search docs, guides, or AI prompts...\" autocomplete=\"off\" data-astro-cid-zsukdfzm> </div> </div> </header> <main class=\"container docs-categories-sec\" data-astro-cid-zsukdfzm> <div class=\"docs-cat-grid\" id=\"docsCatGrid\" data-astro-cid-zsukdfzm> <div class=\"cat-card\" data-category=\"Getting Started\" data-astro-cid-zsukdfzm> <a href=\"/docs/getting-started/installation\" class=\"cat-card__head\" data-astro-cid-zsukdfzm> <div class=\"cat-card__ico\" data-astro-cid-zsukdfzm> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-rocket\"> <path d=\"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5\"></path><path d=\"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09\"></path><path d=\"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z\"></path><path d=\"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05\"></path>  </svg> </div> <span class=\"cat-card__name\" data-astro-cid-zsukdfzm>Getting Started</span> <span class=\"cat-card__count\" data-astro-cid-zsukdfzm>3 articles</span> </a> <ul class=\"cat-card__list\" data-astro-cid-zsukdfzm> <li class=\"doc-item\" data-overflow=\"false\" data-search=\"install datamint (windows &#38; mac) download and install the datamint desktop app, load the chrome extension, and log in with your email otp - all in one guide. getting started\" style data-astro-cid-zsukdfzm> <a href=\"/docs/getting-started/installation\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>Install DataMint (Windows &amp; Mac)</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li><li class=\"doc-item\" data-overflow=\"false\" data-search=\"set up your api keys connect your own openai, serper, and reoon api keys. your keys stay on your device - they never reach datamint servers. getting started\" style data-astro-cid-zsukdfzm> <a href=\"/docs/getting-started/ai-settings\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>Set Up Your API Keys</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li><li class=\"doc-item\" data-overflow=\"false\" data-search=\"get help: ai assistant &#38; contact ask the in-app ai assistant anything about datamint in bangla or english, or reach us directly on whatsapp, facebook, and email. getting started\" style data-astro-cid-zsukdfzm> <a href=\"/docs/getting-started/support-chat\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>Get Help: AI Assistant &amp; Contact</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li> </ul>  </div><div class=\"cat-card\" data-category=\"Features\" data-astro-cid-zsukdfzm> <a href=\"/docs/features/scrapers\" class=\"cat-card__head\" data-astro-cid-zsukdfzm> <div class=\"cat-card__ico\" data-astro-cid-zsukdfzm> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-layers\"> <path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\"></path><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\"></path><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\"></path>  </svg> </div> <span class=\"cat-card__name\" data-astro-cid-zsukdfzm>Features</span> <span class=\"cat-card__count\" data-astro-cid-zsukdfzm>3 articles</span> </a> <ul class=\"cat-card__list\" data-astro-cid-zsukdfzm> <li class=\"doc-item\" data-overflow=\"false\" data-search=\"google map scraper scrape business leads from google maps search results, or auto-detect and extract tables from any website with the epic scraper. features\" style data-astro-cid-zsukdfzm> <a href=\"/docs/features/scrapers\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>Google Map Scraper</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li><li class=\"doc-item\" data-overflow=\"false\" data-search=\"manage data table edit cells and columns, import/export csv, and control ai runs - run first 10, run all, fill vs overwrite, retry skipped, stop. features\" style data-astro-cid-zsukdfzm> <a href=\"/docs/features/data-table\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>Manage Data Table</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li><li class=\"doc-item\" data-overflow=\"false\" data-search=\"social media scraper scrape business details from facebook pages and export group member lists - with instagram and linkedin coming soon. features\" style data-astro-cid-zsukdfzm> <a href=\"/docs/features/facebook-scraper\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>Social Media Scraper</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li> </ul>  </div><div class=\"cat-card\" data-category=\"AI Enrichment\" data-astro-cid-zsukdfzm> <a href=\"/docs/ai-enrichment/enrichment-prompts\" class=\"cat-card__head\" data-astro-cid-zsukdfzm> <div class=\"cat-card__ico\" data-astro-cid-zsukdfzm> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-sparkles\"> <path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"></path><path d=\"M20 2v4\"></path><path d=\"M22 4h-4\"></path><circle cx=\"4\" cy=\"20\" r=\"2\"></circle>  </svg> </div> <span class=\"cat-card__name\" data-astro-cid-zsukdfzm>AI Enrichment</span> <span class=\"cat-card__count\" data-astro-cid-zsukdfzm>4 articles</span> </a> <ul class=\"cat-card__list\" data-astro-cid-zsukdfzm> <li class=\"doc-item\" data-overflow=\"false\" data-search=\"ai enrichment presets all datamint enrichment presets organized by what you already have - with exact requirements (backend, api keys, logins) for each, including google search and website workflow. ai enrichment\" style data-astro-cid-zsukdfzm> <a href=\"/docs/ai-enrichment/enrichment-prompts\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>AI Enrichment Presets</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li><li class=\"doc-item\" data-overflow=\"false\" data-search=\"find business contacts find emails, phone numbers, and social media contacts from business websites and facebook pages - email finder, phone number finder, deep scrape, and the decision-maker playbook. ai enrichment\" style data-astro-cid-zsukdfzm> <a href=\"/docs/features/email\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>Find Business Contacts</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li><li class=\"doc-item\" data-overflow=\"false\" data-search=\"business contacts verification verify contacts before outreach - check which phone numbers are active on whatsapp through your own session, and verify email deliverability with reoon. ai enrichment\" style data-astro-cid-zsukdfzm> <a href=\"/docs/features/contacts-verification\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>Business Contacts Verification</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li><li class=\"doc-item\" data-overflow=\"false\" data-search=\"use custom prompts add your own ai-powered columns with the custom prompt preset and #columnname mentions - how the prompt editor, chips, and tool-calling agent work. ai enrichment\" style data-astro-cid-zsukdfzm> <a href=\"/docs/ai-enrichment/custom-prompt\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>Use Custom Prompts</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li> </ul>  </div><div class=\"cat-card\" data-category=\"AI Prompts\" data-astro-cid-zsukdfzm> <a href=\"/docs/ai-prompts/cold-outreach-prompts\" class=\"cat-card__head\" data-astro-cid-zsukdfzm> <div class=\"cat-card__ico\" data-astro-cid-zsukdfzm> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-terminal\"> <path d=\"M12 19h8\"></path><path d=\"m4 17 6-6-6-6\"></path>  </svg> </div> <span class=\"cat-card__name\" data-astro-cid-zsukdfzm>AI Prompts</span> <span class=\"cat-card__count\" data-astro-cid-zsukdfzm>3 articles</span> </a> <ul class=\"cat-card__list\" data-astro-cid-zsukdfzm> <li class=\"doc-item\" data-overflow=\"false\" data-search=\"cold email &#38; outreach templates high-converting cold email templates and google maps audit prompts for b2b outreach. ai prompts\" style data-astro-cid-zsukdfzm> <a href=\"/docs/ai-prompts/cold-outreach-prompts\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>Cold Email &amp; Outreach Templates</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li><li class=\"doc-item\" data-overflow=\"false\" data-search=\"whatsapp pitch &#38; follow-up scripts conversational, anti-spam whatsapp message templates for verified business phone numbers. ai prompts\" style data-astro-cid-zsukdfzm> <a href=\"/docs/ai-prompts/whatsapp-prompts\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>WhatsApp Pitch &amp; Follow-Up Scripts</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li><li class=\"doc-item\" data-overflow=\"false\" data-search=\"#column data extraction prompts ready-to-use custom prompt presets for extracting owner names, titles, services, and contact details from your scraped data. ai prompts\" style data-astro-cid-zsukdfzm> <a href=\"/docs/ai-prompts/ai-column-extraction\" data-astro-cid-zsukdfzm> <span class=\"doc-title-text\" data-astro-cid-zsukdfzm>#Column Data Extraction Prompts</span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-chevron-right arrow-ico\"> <path d=\"m9 18 6-6-6-6\"></path>  </svg> </a> </li> </ul>  </div> </div> <div id=\"noDocsResults\" class=\"no-docs-results\" style=\"display: none;\" data-astro-cid-zsukdfzm> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"44\" height=\"44\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" data-astro-cid-zsukdfzm=\"true\" class=\"lucide lucide-search-x\"> <path d=\"m13.5 8.5-5 5\"></path><path d=\"m8.5 8.5 5 5\"></path><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><path d=\"m21 21-4.3-4.3\"></path>  </svg> <h3 data-astro-cid-zsukdfzm>No matching documentation found</h3> <p data-astro-cid-zsukdfzm>Try searching for a different keyword or browse categories above.</p> </div> </main> </div>  ";

export default function DocsHubPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = 'Documentation & Knowledge Base | DataMint';
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Reveal animation
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Live search functionality from original docs.html
    const searchInput = document.getElementById('docsSearch');
    const cards = document.querySelectorAll('.cat-card');
    const noResults = document.getElementById('noDocsResults');

    if (searchInput) {
      const handleInput = (e) => {
        const q = e.target.value.toLowerCase().trim();
        let totalMatches = 0;
        cards.forEach((card) => {
          let cardMatches = 0;
          const items = card.querySelectorAll('.doc-item');
          items.forEach((item) => {
            const searchText = item.getAttribute('data-search') || item.textContent.toLowerCase();
            const isMatch = !q || searchText.includes(q);
            item.style.display = isMatch ? '' : 'none';
            if (isMatch) cardMatches++;
          });
          card.style.display = cardMatches > 0 ? '' : 'none';
          totalMatches += cardMatches;
        });
        if (noResults) noResults.style.display = totalMatches === 0 ? 'block' : 'none';
      };

      searchInput.addEventListener('input', handleInput);
    }

    // Intercept client-side navigation clicks on doc cards and internal links
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;

      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') {
        return;
      }

      if (href.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.getElementById(href.slice(1));
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, '', href);
        }
        return;
      }

      if (href.startsWith('/')) {
        e.preventDefault();
        router.push(href);
      }
    };

    const mainContainer = document.getElementById('main');
    if (mainContainer) {
      mainContainer.addEventListener('click', handleLinkClick);
    }

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
      if (mainContainer) {
        mainContainer.removeEventListener('click', handleLinkClick);
      }
    };
  }, [router]);

  return (
    <>
      <Navbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: HUB_HTML }} />
      <Footer />
      <button className="to-top" id="toTop" aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
