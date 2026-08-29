const fs = require('fs');
const path = require('path');
const rootDir = path.resolve('..');
const docDir = path.join(rootDir, 'docs');

const docFiles = fs.readdirSync(docDir).filter(f => f.endsWith('.html'));

docFiles.forEach(f => {
  const content = fs.readFileSync(path.join(docDir, f), 'utf8');
  let title = '';
  let canonical = '';
  if (content.match(/<title>(.*?)<\/title>/)) title = RegExp.$1;
  if (content.match(/rel="canonical"\s+href="([^"]+)"/)) canonical = RegExp.$1;

  // check if there is an article / docs-content / layout
  const hasLayout = content.includes('docs-layout') || content.includes('docs-content');
  console.log(`${f} | title: ${title} | canonical: ${canonical} | hasLayout: ${hasLayout}`);
});
