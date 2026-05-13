import { chromium } from 'playwright';

const out = process.argv[2] ?? './tall.png';
const scrollTo = process.argv[3] || null;
const url = process.argv[4] || 'http://localhost:3000/';

const browser = await chromium.launch({
  headless: true,
  args: ['--enable-webgl', '--use-angle=swiftshader-webgl'],
});

const context = await browser.newContext({
  viewport: { width: 1600, height: 1400 },
  deviceScaleFactor: 1,
});

const page = await context.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

if (scrollTo) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, scrollTo);
  await page.waitForTimeout(1800);
}

await page.screenshot({ path: out, fullPage: false });
console.log(`Wrote ${out}`);
await browser.close();
