import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader-webgl'] });
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const page = await context.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
const docHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
const mid = Math.round(docHeight * 0.5);
await page.evaluate((y) => window.scrollTo(0, y), mid);
await page.waitForTimeout(800);

const stack = await page.evaluate(() => {
  // What is at viewport (800, 20) — should be inside AnnounceBar
  const els = document.elementsFromPoint(800, 20);
  return els.slice(0, 8).map((el) => {
    const c = window.getComputedStyle(el);
    return {
      tag: el.tagName,
      cls: el.className?.toString?.().slice(0, 80) || null,
      pos: c.position,
      z: c.zIndex,
      bg: c.backgroundColor,
    };
  });
});

console.log('Stack at (800, 20) at mid scroll:');
stack.forEach((e, i) => {
  console.log(` [${i}] ${e.tag} pos=${e.pos} z=${e.z} bg=${e.bg}`);
  console.log(`     .${e.cls}`);
});

await browser.close();
