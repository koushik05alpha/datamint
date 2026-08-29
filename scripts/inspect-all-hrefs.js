const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');
const docFiles = fs.readdirSync(path.join(rootDir, 'docs')).filter(f => f.endsWith('.html'));

console.log('=== docs.html hrefs ===');
const hubHtml = fs.readFileSync(path.join(rootDir, 'docs.html'), 'utf8');
const hubHrefs = [...hubHtml.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
console.log([...new Set(hubHrefs)]);

console.log('\n=== docs/*.html hrefs & cross-links ===');
docFiles.forEach(f => {
  const content = fs.readFileSync(path.join(rootDir, 'docs', f), 'utf8');
  const hrefs = [...content.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  console.log(`\n--- ${f} ---`);
  console.log('Doc links:', [...new Set(hrefs.filter(h => h.includes('doc') || h.startsWith('/') || h.startsWith('.') || h.startsWith('#')))]);
});
