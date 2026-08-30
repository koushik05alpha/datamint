const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');
const appDir = path.join(__dirname, '..', 'app');

// Helper to extract head metadata & main content from an HTML file
function parseHtmlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  let title = 'DataMint';
  if (content.match(/<title>(.*?)<\/title>/i)) title = RegExp.$1.trim();

  let description = '';
  if (content.match(/<meta\s+name="description"\s+content="([^"]*)"/i)) description = RegExp.$1.trim();

  // Extract <main id="main">...</main>
  let mainContent = '';
  const mainMatch = content.match(/<main id="main">([\s\S]*?)<\/main>\s*<footer/i) ||
                    content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    mainContent = mainMatch[1];
  }

  return { title, description, mainContent, raw: content };
}

// 1. Generate Static Pages (privacy, terms, refund, resource, roadmap, docs)
const staticPages = [
  { dir: 'privacy', file: 'privacy.html' },
  { dir: 'terms', file: 'terms.html' },
  { dir: 'refund', file: 'refund.html' },
  { dir: 'resource', file: 'resource.html' },
  { dir: 'roadmap', file: 'roadmap.html' },
];

staticPages.forEach(({ dir, file }) => {
  const parsed = parseHtmlFile(path.join(rootDir, file));
  const targetDir = path.join(appDir, dir);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const code = `'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ${dir.charAt(0).toUpperCase() + dir.slice(1)}Page() {
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
      <Navbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(parsed.mainContent)} }} />
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

  fs.writeFileSync(path.join(targetDir, 'page.jsx'), code, 'utf8');
  console.log(`Generated app/${dir}/page.jsx`);
});

// 2. Generate Docs Hub Page (`app/docs/page.jsx`)
const docsHubParsed = parseHtmlFile(path.join(rootDir, 'docs.html'));
const docsHubDir = path.join(appDir, 'docs');
if (!fs.existsSync(docsHubDir)) fs.mkdirSync(docsHubDir, { recursive: true });

const docsHubCode = `'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DocsHubPage() {
  useEffect(() => {
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
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        let totalMatches = 0;
        cards.forEach((card) => {
          let cardMatches = 0;
          const items = card.querySelectorAll('.doc-item');
          items.forEach((item) => {
            const searchText = item.dataset.search || item.textContent.toLowerCase();
            const isMatch = !q || searchText.includes(q);
            item.style.display = isMatch ? '' : 'none';
            if (isMatch) cardMatches++;
          });
          card.style.display = cardMatches > 0 ? '' : 'none';
          totalMatches += cardMatches;
        });
        if (noResults) noResults.style.display = totalMatches === 0 ? 'block' : 'none';
      });
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
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(docsHubParsed.mainContent)} }} />
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

fs.writeFileSync(path.join(docsHubDir, 'page.jsx'), docsHubCode, 'utf8');
console.log('Generated app/docs/page.jsx');

// 3. Generate Docs Catch-All Dynamic Page (`app/docs/[...slug]/page.jsx`)
const docFilesDir = path.join(rootDir, 'docs');
const docFilesList = fs.readdirSync(docFilesDir).filter(f => f.endsWith('.html'));

const docsDataMap = {};

docFilesList.forEach(file => {
  const parsed = parseHtmlFile(path.join(docFilesDir, file));
  const baseName = file.replace('.html', '');

  // Extract canonical category slug
  let canonicalPath = '';
  if (parsed.raw.match(/rel="canonical"\s+href="https:\/\/datamint\.online\/docs\/([^"]*)"/)) {
    canonicalPath = RegExp.$1.replace(/\/$/, '');
  }

  const docItem = {
    title: parsed.title,
    description: parsed.description,
    mainContent: parsed.mainContent,
    file,
    baseName,
    canonicalPath
  };

  // Map by direct filename base (e.g. "installation")
  docsDataMap[baseName] = docItem;

  // Map by canonical path segments (e.g. "getting-started/installation")
  if (canonicalPath) {
    docsDataMap[canonicalPath] = docItem;
  }
});

const docsSlugDir = path.join(appDir, 'docs', '[...slug]');
if (!fs.existsSync(docsSlugDir)) fs.mkdirSync(docsSlugDir, { recursive: true });

const docSlugPageCode = `'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DOCS_DATA = ${JSON.stringify(docsDataMap)};

export default function DocDetailPage({ params }) {
  const slugArray = params.slug || [];
  const slugKey = slugArray.join('/').replace(/\\.html$/, '');
  const directKey = slugArray[slugArray.length - 1]?.replace(/\\.html$/, '');

  const doc = DOCS_DATA[slugKey] || DOCS_DATA[directKey];

  if (!doc) {
    notFound();
  }

  useEffect(() => {
    // Sidebar search
    const sidebarSearch = document.getElementById('sidebarDocSearch');
    if (sidebarSearch) {
      sidebarSearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.docs-nav__item').forEach((item) => {
          const text = item.textContent.toLowerCase();
          item.style.display = !q || text.includes(q) ? '' : 'none';
        });
      });
    }

    // Sidebar collapsible groups
    document.querySelectorAll('.docs-nav__cat').forEach((btn) => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.docs-nav__group');
        if (group) {
          const isOpen = group.classList.contains('is-open');
          group.classList.toggle('is-open', !isOpen);
          btn.setAttribute('aria-expanded', String(!isOpen));
        }
      });
    });

    // Copy code block buttons
    document.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.addEventListener('click', () => {
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => (btn.textContent = 'Copy'), 2000);
        });
      });
      pre.style.position = 'relative';
      pre.appendChild(btn);
    });

    // To-top button
    const toTop = document.getElementById('toTop');
    const onScroll = () => {
      if (toTop) toTop.classList.toggle('show', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [slugKey]);

  return (
    <>
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
console.log('Generated app/docs/[...slug]/page.jsx with all 13 documentation pages mapped!');
