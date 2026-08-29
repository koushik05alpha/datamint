const fs = require('fs');
const path = require('path');

const dir = path.resolve('..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const docDir = path.join(dir, 'docs');
const docFiles = fs.existsSync(docDir) ? fs.readdirSync(docDir).filter(f => f.endsWith('.html')).map(f => 'docs/' + f) : [];
const all = [...files, ...docFiles];

all.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const scripts = [];
  const scriptRegex = /<script(?:\s+type="([^"]*)")?>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = scriptRegex.exec(content)) !== null) {
    const type = m[1] || 'classic';
    const body = m[2].trim();
    if (body.includes('cloudflare') || body.includes('dataLayer') || body.includes('gtag') || body.includes('GoogleAnalytics')) continue;
    scripts.push({ type, length: body.length, preview: body.substring(0, 80).replace(/\s+/g, ' ') });
  }
  console.log(`=== ${f} (${scripts.length} scripts) ===`);
  scripts.forEach((s, i) => console.log(`  [${i}] ${s.type} (${s.length} chars): ${s.preview}`));
});
