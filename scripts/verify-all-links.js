const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');
const docFilesDir = path.join(rootDir, 'docs');
const docFilesList = fs.readdirSync(docFilesDir).filter(f => f.endsWith('.html'));

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

// Check all links across all docs
const allExtractedLinks = new Set();
docFilesList.forEach(file => {
  const raw = fs.readFileSync(path.join(docFilesDir, file), 'utf8');
  const hrefs = [...raw.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  hrefs.forEach(h => allExtractedLinks.add(h));
});

console.log('All unique hrefs across all docs:');
console.log([...allExtractedLinks]);
