const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');

// 1. Compile full combined CSS
const cssFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
const docDir = path.join(rootDir, 'docs');
const docFiles = fs.existsSync(docDir) ? fs.readdirSync(docDir).filter(f => f.endsWith('.html')).map(f => 'docs/' + f) : [];
const allHtmlFiles = [...cssFiles, ...docFiles];

const seenStyles = new Set();
let fullCss = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');\n\n`;

allHtmlFiles.forEach(f => {
  const content = fs.readFileSync(path.join(rootDir, f), 'utf8');
  const regex = /<style(?:\s+[^>]*)?>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const css = match[1].trim();
    if (!seenStyles.has(css)) {
      seenStyles.add(css);
      fullCss += css + '\n\n';
    }
  }
});

fs.writeFileSync(path.join(__dirname, '..', 'app', 'globals.css'), fullCss, 'utf8');
console.log(`Updated globals.css (${(fullCss.length / 1024).toFixed(1)} KB)`);
