const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');

// 1. Read all unique styles from docs.html and docs/*.html
const hubContent = fs.readFileSync(path.join(rootDir, 'docs.html'), 'utf8');
const docContent = fs.readFileSync(path.join(rootDir, 'docs', 'installation.html'), 'utf8');
const contactContent = fs.readFileSync(path.join(rootDir, 'docs', 'contacts-verification.html'), 'utf8');

function extractStyles(html) {
  const matches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  return matches.map(m => m.replace(/<\/?style[^>]*>/gi, '').trim());
}

const allStyles = [
  ...extractStyles(hubContent),
  ...extractStyles(docContent),
  ...extractStyles(contactContent)
];

// Deduplicate rules / chunks
const combinedCss = allStyles.join('\n\n');

fs.writeFileSync(path.join(__dirname, '..', 'app', 'docs-styles.css'), combinedCss, 'utf8');
console.log('Successfully wrote consolidated app/docs-styles.css, size:', combinedCss.length);
