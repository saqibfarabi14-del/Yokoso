const fs = require('fs');
const Babel = require('@babel/standalone');

function inline(p) {
  const html = fs.readFileSync(p, 'utf8');
  const m = html.match(/<script type="text\/babel" data-presets="react">([\s\S]*?)<\/script>\s*<\/body>/);
  return m ? m[1] : null;
}

const targets = [
  ['shared/components.js', fs.readFileSync('shared/components.js', 'utf8')],
  ['index.html (inline)', inline('index.html')],
  ['menu.html (inline)', inline('menu.html')],
];

let fail = false;
for (const [name, src] of targets) {
  if (src === null) { console.log(`  ${name}: !! inline block not found`); fail = true; continue; }
  try {
    Babel.transform(src, { presets: ['react'] });
    console.log(`  ${name}: OK`);
  } catch (e) {
    console.log(`  ${name}: SYNTAX ERROR -> ${e.message.split('\n')[0]}`);
    fail = true;
  }
}
console.log(fail ? 'JSX: FAIL' : 'JSX: ALL OK');
process.exit(fail ? 1 : 0);
