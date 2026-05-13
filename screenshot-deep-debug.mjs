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

// Get all elements that have non-empty bbox in the top 100px of viewport
const elementsAtTop = await page.evaluate(() => {
  const found = [];
  // Query everything visible
  const els = document.querySelectorAll('*');
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.top < 100 && r.bottom > 0 && r.width > 0 && r.height > 0) {
      const c = window.getComputedStyle(el);
      // Only include if positioned (or text content)
      if (c.position !== 'static' || el.tagName === 'BODY') {
        found.push({
          tag: el.tagName,
          id: el.id || null,
          cls: el.className?.toString?.().slice(0, 80) || null,
          top: r.top.toFixed(1),
          height: r.height.toFixed(1),
          z: c.zIndex,
          pos: c.position,
        });
      }
    }
  }
  return found.slice(0, 20);
});

console.log('Positioned elements visible in top 100px of viewport at mid-scroll:');
for (const e of elementsAtTop) {
  console.log(` ${e.tag} #${e.id} pos=${e.pos} z=${e.z} top=${e.top} h=${e.height}`);
  console.log(`   .${e.cls}`);
}

const scrollInfo = await page.evaluate(() => ({
  scrollY: window.scrollY,
  innerHeight: window.innerHeight,
  scrollHeight: document.documentElement.scrollHeight,
}));
console.log('Scroll state:', JSON.stringify(scrollInfo));

await page.screenshot({ path: './step5-deep-debug.png' });
await browser.close();
