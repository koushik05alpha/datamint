const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');

// Only extract styles from the <head><style>...</style></head>
const cssFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
const docDir = path.join(rootDir, 'docs');
const docFiles = fs.existsSync(docDir) ? fs.readdirSync(docDir).filter(f => f.endsWith('.html')).map(f => 'docs/' + f) : [];
const allHtmlFiles = [...cssFiles, ...docFiles];

const seenStyles = new Set();
let cssBlocks = [];

allHtmlFiles.forEach(f => {
  const content = fs.readFileSync(path.join(rootDir, f), 'utf8');
  // Only search inside <head>
  const headMatch = content.match(/<head>([\s\S]*?)<\/head>/i);
  if (!headMatch) return;
  const headContent = headMatch[1];

  const regex = /<style(?:\s+[^>]*)?>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = regex.exec(headContent)) !== null) {
    let css = match[1].trim();
    // Exclude if it contains unexpanded JS template literals ${
    if (css.includes('${')) continue;
    css = css.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');
    if (!seenStyles.has(css)) {
      seenStyles.add(css);
      cssBlocks.push(css);
    }
  }
});

let fullCss = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');\n\n` + cssBlocks.join('\n\n');

fs.writeFileSync(path.join(__dirname, '..', 'app', 'globals.css'), fullCss, 'utf8');
console.log(`Cleaned valid CSS in globals.css (${(fullCss.length / 1024).toFixed(1)} KB, ${cssBlocks.length} blocks)`);
