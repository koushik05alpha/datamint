const fs = require('fs');
const path = require('path');
const rootDir = path.resolve('..');

const content = fs.readFileSync(path.join(rootDir, 'docs', 'installation.html'), 'utf8');
const scriptMatches = content.match(/<script(?:\s+type="([^"]*)")?>([\s\S]*?)<\/script>/gi) || [];

console.log('Script matches in installation.html:', scriptMatches.length);
scriptMatches.forEach((sm, i) => {
  console.log(`\n--- SCRIPT ${i} ---`);
  console.log(sm);
});
