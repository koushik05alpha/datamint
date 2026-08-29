const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');
const docFilesDir = path.join(rootDir, 'docs');
const docFilesList = fs.readdirSync(docFilesDir).filter(f => f.endsWith('.html'));

// Canonical path mappings for all 13 docs
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

// Helper to normalize links in HTML
function normalizeDocLinks(html) {
  let updated = html;
  
  // Replace ./docs/xyz.html or /docs/xyz.html with /docs/category/slug
  Object.keys(slugToCanonical).forEach(base => {
    const canonical = slugToCanonical[base];
    const regex1 = new RegExp(`href=["']\\.?/docs/${base}(?:\\.html)?(?:#([^"']*))?["']`, 'g');
    updated = updated.replace(regex1, (match, hash) => {
      return `href="/docs/${canonical}${hash ? '#' + hash : ''}"`;
    });
    const regex2 = new RegExp(`href=["']\\./${base}(?:\\.html)?(?:#([^"']*))?["']`, 'g');
    updated = updated.replace(regex2, (match, hash) => {
      return `href="/docs/${canonical}${hash ? '#' + hash : ''}"`;
    });
    const regex3 = new RegExp(`href=["']${base}\\.html(?:#([^"']*))?["']`, 'g');
    updated = updated.replace(regex3, (match, hash) => {
      return `href="/docs/${canonical}${hash ? '#' + hash : ''}"`;
    });
  });

  return updated;
}

// 1. Process docs.html
let hubHtml = fs.readFileSync(path.join(rootDir, 'docs.html'), 'utf8');
const hubMainMatch = hubHtml.match(/<main id="main">([\s\S]*?)<\/main>\s*<footer/i) ||
                     hubHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
let hubMain = hubMainMatch ? hubMainMatch[1] : '';
hubMain = normalizeDocLinks(hubMain);

console.log('Processed docs.html, main content length:', hubMain.length);

// 2. Process each doc
const docsData = {};

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

  // Map by canonical path e.g. "getting-started/installation"
  docsData[canonicalPath] = docItem;
  // Map by basename e.g. "installation"
  docsData[baseName] = docItem;
});

console.log(`Processed ${Object.keys(docsData).length} mappings across 13 doc files`);
