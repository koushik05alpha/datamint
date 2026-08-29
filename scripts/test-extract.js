const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');

// Helper to extract the inner HTML of <main id="main">...</main> or between header and footer
function extractMain(html) {
  const mainMatch = html.match(/<main id="main">([\s\S]*?)<\/main>\s*<footer/i) ||
                    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) return mainMatch[1];
  return '';
}

const pages = [
  { name: 'privacy', file: 'privacy.html', title: 'Privacy Policy | DataMint' },
  { name: 'terms', file: 'terms.html', title: 'Terms and Conditions | DataMint' },
  { name: 'refund', file: 'refund.html', title: 'Refund Policy | DataMint' },
  { name: 'roadmap', file: 'roadmap.html', title: 'Roadmap | DataMint' },
  { name: 'resource', file: 'resource.html', title: 'DataMint Resource | Video Masterclasses & Series' },
  { name: 'docs', file: 'docs.html', title: 'Documentation & Knowledge Base | DataMint' }
];

pages.forEach(p => {
  const raw = fs.readFileSync(path.join(rootDir, p.file), 'utf8');
  const mainContent = extractMain(raw);
  console.log(`Page ${p.name}: extracted ${mainContent.length} characters`);
});
