const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');
const appDir = path.join(__dirname, '..', 'app');
const docFilesDir = path.join(rootDir, 'docs');

// Canonical mapping for all 13 docs
const slugToCanonical = {
  'installation': 'getting-started/installation',
  'ai-settings': 'getting-started/ai-settings',
  'support-chat': 'getting-started/support-chat',
  'scrapers': 'features/scrapers',
  'data-table': 'features/data-table',
  'facebook-scraper': 'features/facebook-scraper',
  'email': 'features/email',
  'contacts-verification': 'features/contacts-verification',
  'enrichment-prompts': 'ai-enrichment/enrichment-prompts',
  'custom-prompt': 'ai-enrichment/custom-prompt',
  'cold-outreach-prompts': 'ai-prompts/cold-outreach-prompts',
  'whatsapp-prompts': 'ai-prompts/whatsapp-prompts',
  'ai-column-extraction': 'ai-prompts/ai-column-extraction',
};

// Helper to normalize all internal links in HTML
function normalizeDocLinks(html) {
  let updated = html;

  // 1. Replace full domain links https://datamint.online/docs/... with /docs/...
  updated = updated.replace(/href="https:\/\/datamint\.online\/docs\/([^"#]*)(#[^"]*)?"/g, (match, p, hash) => {
    const cleanPath = p.replace(/\/$/, '');
    return `href="/docs/${cleanPath}${hash || ''}"`;
  });
  
  updated = updated.replace(/href="https:\/\/datamint\.online\/docs(?:\/)?(#[^"]*)?"/g, (match, hash) => {
    return `href="/docs${hash || ''}"`;
  });

  updated = updated.replace(/href="https:\/\/datamint\.online\/(#[^"]*)?"/g, (match, hash) => {
    return `href="/${hash || ''}"`;
  });

  // 2. Replace ./docs/xyz.html or /docs/xyz.html or ./xyz.html with /docs/category/slug
  Object.keys(slugToCanonical).forEach(base => {
    const canonical = slugToCanonical[base];
    const regex1 = new RegExp(`href=["']\\.?/docs/${base}(?:\\.html)?(?:#([^"']*))?["']`, 'g');
    updated = updated.replace(regex1, (match, hash) => `href="/docs/${canonical}${hash ? '#' + hash : ''}"`);
    
    const regex2 = new RegExp(`href=["']\\./${base}(?:\\.html)?(?:#([^"']*))?["']`, 'g');
    updated = updated.replace(regex2, (match, hash) => `href="/docs/${canonical}${hash ? '#' + hash : ''}"`);
    
    const regex3 = new RegExp(`href=["']${base}\\.html(?:#([^"']*))?["']`, 'g');
    updated = updated.replace(regex3, (match, hash) => `href="/docs/${canonical}${hash ? '#' + hash : ''}"`);
  });

  return updated;
}

// 1. Build app/docs/page.jsx (Docs Hub)
const hubRaw = fs.readFileSync(path.join(rootDir, 'docs.html'), 'utf8');
const hubMainMatch = hubRaw.match(/<main id="main">([\s\S]*?)<\/main>\s*<footer/i) ||
                     hubRaw.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
let hubMain = hubMainMatch ? normalizeDocLinks(hubMainMatch[1]) : '';

const docsHubDir = path.join(appDir, 'docs');
if (!fs.existsSync(docsHubDir)) fs.mkdirSync(docsHubDir, { recursive: true });

const docsHubPageCode = `'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(hubMain)} }} />
      <Footer />
      <button className="to-top" id="toTop" aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
`;

fs.writeFileSync(path.join(docsHubDir, 'page.jsx'), docsHubPageCode, 'utf8');
console.log('Successfully updated app/docs/page.jsx');

// 2. Build app/docs/[...slug]/page.jsx (All 13 Sub-Routes)
const docFilesList = fs.readdirSync(docFilesDir).filter(f => f.endsWith('.html'));
const docsDataMap = {};

docFilesList.forEach(file => {
  const raw = fs.readFileSync(path.join(docFilesDir, file), 'utf8');
  const baseName = file.replace('.html', '');
  const canonicalPath = slugToCanonical[baseName] || baseName;

  let title = 'DataMint Docs';
  if (raw.match(/<title>(.*?)<\/title>/i)) title = RegExp.$1.trim();

  let description = '';
  if (raw.match(/<meta\s+name="description"\s+content="([^"]*)"/i)) description = RegExp.$1.trim();

  let mainContent = '';
  const mainMatch = raw.match(/<main id="main">([\s\S]*?)<\/main>\s*<footer/i) ||
                    raw.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    mainContent = normalizeDocLinks(mainMatch[1]);
  }

  const docItem = {
    title,
    description,
    mainContent,
    file,
    baseName,
    canonicalPath,
  };

  // Map by canonical path: e.g. "getting-started/installation"
  docsDataMap[canonicalPath] = docItem;
  // Map by basename: e.g. "installation"
  docsDataMap[baseName] = docItem;
});

const docsSlugDir = path.join(appDir, 'docs', '[...slug]');
if (!fs.existsSync(docsSlugDir)) fs.mkdirSync(docsSlugDir, { recursive: true });

const docSlugPageCode = `'use client';

import { useEffect } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DOCS_DATA = ${JSON.stringify(docsDataMap)};

export default function DocDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;
  const slugArray = Array.isArray(slug) ? slug : [slug].filter(Boolean);
  
  const slugKey = slugArray.join('/');
  const slugKeyNoHtml = slugKey.replace(/\\.html$/, '');
  const directKey = slugArray[slugArray.length - 1] || '';
  const directKeyNoHtml = directKey.replace(/\\.html$/, '');

  const doc = DOCS_DATA[slugKey] || DOCS_DATA[slugKeyNoHtml] || DOCS_DATA[directKey] || DOCS_DATA[directKeyNoHtml];

  if (!doc) {
    notFound();
  }

  useEffect(() => {
    if (doc?.title) {
      document.title = doc.title;
    }

    // Scroll to anchor hash if present, otherwise scroll to top
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const targetEl = document.getElementById(hash.slice(1));
        if (targetEl) {
          setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 50);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }

    // Reveal animation
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Sidebar search filter
    const sidebarSearch = document.getElementById('sidebarDocSearch');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    if (sidebarSearch) {
      sidebarSearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        sidebarItems.forEach((item) => {
          const text = item.getAttribute('data-search') || item.textContent.toLowerCase();
          const isMatch = !q || text.includes(q);
          item.style.display = isMatch ? 'block' : 'none';
          if (isMatch && q) {
            item.closest('.docs-nav__group')?.classList.add('is-open');
          }
        });
      });
    }

    // Sidebar collapsible toggle buttons
    const toggleButtons = document.querySelectorAll('[data-toggle]');
    toggleButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.docs-nav__group');
        if (group) {
          const isOpen = group.classList.toggle('is-open');
          btn.setAttribute('aria-expanded', String(isOpen));
        }
      });
    });

    // Auto-highlight active sidebar item and ensure active category group is open
    const currentCanonical = doc.canonicalPath;
    document.querySelectorAll('.docs-nav a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.includes(currentCanonical) || href.endsWith('/' + doc.baseName)) {
        link.classList.add('is-active');
        const group = link.closest('.docs-nav__group');
        if (group) {
          group.classList.add('is-open');
          const catBtn = group.querySelector('[data-toggle]');
          if (catBtn) catBtn.setAttribute('aria-expanded', 'true');
        }
      } else {
        link.classList.remove('is-active');
      }
    });

    // Copy code button handler for code and prompt blocks
    const preBlocks = document.querySelectorAll('.docs-article__body pre');
    preBlocks.forEach((pre) => {
      if (pre.querySelector('.code-header')) return;
      const header = document.createElement('div');
      header.className = 'code-header';
      
      const lang = document.createElement('span');
      lang.className = 'code-lang';
      lang.textContent = 'Prompt / Code';
      
      const btn = document.createElement('button');
      btn.className = 'copy-code-btn';
      btn.type = 'button';
      btn.innerHTML = '<svg class="copy-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span class="btn-lbl">Copy Prompt</span>';
      
      btn.addEventListener('click', async () => {
        const codeEl = pre.querySelector('code');
        const textToCopy = codeEl ? codeEl.innerText : pre.innerText;
        try {
          await navigator.clipboard.writeText(textToCopy);
          btn.classList.add('copied');
          const lbl = btn.querySelector('.btn-lbl');
          if (lbl) lbl.textContent = 'Copied!';
          setTimeout(() => {
            btn.classList.remove('copied');
            if (lbl) lbl.textContent = 'Copy Prompt';
          }, 2000);
        } catch (err) {
          console.error('Copy failed', err);
        }
      });

      header.appendChild(lang);
      header.appendChild(btn);
      pre.prepend(header);
    });

    // Intercept client-side navigation clicks on sidebar, breadcrumbs, article cross-links, and footer nav
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
  }, [slugKey, doc, router]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: doc.mainContent }} />
      <Footer />
      <button className="to-top" id="toTop" aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
`;

fs.writeFileSync(path.join(docsSlugDir, 'page.jsx'), docSlugPageCode, 'utf8');
console.log('Successfully updated app/docs/[...slug]/page.jsx');
