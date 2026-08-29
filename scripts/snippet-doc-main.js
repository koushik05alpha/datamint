const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve('../docs/installation.html'), 'utf8');

const mainMatch = html.match(/<main id="main">([\s\S]*?)<\/main>\s*<footer/i) || html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (mainMatch) {
  console.log('Main snippet (first 1000 chars):');
  console.log(mainMatch[1].substring(0, 1000));
}
