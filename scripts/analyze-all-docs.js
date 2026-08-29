const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');
const docFilesDir = path.join(rootDir, 'docs');
const docFilesList = fs.readdirSync(docFilesDir).filter(f => f.endsWith('.html'));

console.log(`Found ${docFilesList.length} doc files in docs/`);

// Check docs.html
const docsHubContent = fs.readFileSync(path.join(rootDir, 'docs.html'), 'utf8');
console.log('\n--- docs.html Analysis ---');
const hubTitle = (docsHubContent.match(/<title>(.*?)<\/title>/i) || [])[1];
const hubDesc = (docsHubContent.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1];
console.log('Title:', hubTitle);
console.log('Description:', hubDesc);

// Find all links inside docs.html
const hubLinks = [];
const linkRegex = /href="([^"]+)"/g;
let m;
while ((m = linkRegex.exec(docsHubContent)) !== null) {
  if (m[1].includes('doc') || m[1].endsWith('.html') || m[1].startsWith('/')) {
    hubLinks.push(m[1]);
  }
}
console.log('Unique doc-related links in docs.html:', [...new Set(hubLinks)]);

console.log('\n--- Individual Doc Files Analysis ---');
const docsSummary = [];

docFilesList.forEach(file => {
  const content = fs.readFileSync(path.join(docFilesDir, file), 'utf8');
  const title = (content.match(/<title>(.*?)<\/title>/i) || [])[1];
  const desc = (content.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1];
  const canonical = (content.match(/rel="canonical"\s+href="([^"]+)"/i) || [])[1];
  const h1 = (content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]?.replace(/<[^>]+>/g, '').trim();
  
  // Extract all hrefs
  const hrefs = [];
  let hm;
  const hrefRegex = /href="([^"]+)"/g;
  while ((hm = hrefRegex.exec(content)) !== null) {
    if (hm[1].startsWith('/docs') || hm[1].endsWith('.html') || hm[1].startsWith('#')) {
      hrefs.push(hm[1]);
    }
  }
  
  docsSummary.push({
    file,
    title,
    desc,
    canonical,
    h1,
    uniqueHrefs: [...new Set(hrefs)]
  });
});

console.log(JSON.stringify(docsSummary, null, 2));
