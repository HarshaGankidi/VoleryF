import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  args: ['--enable-webgl', '--use-angle=swiftshader-webgl'],
});
const context = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

const docHeight = await page.evaluate(
  () => document.documentElement.scrollHeight - window.innerHeight,
);
const mid = Math.round(docHeight * 0.5);
await page.evaluate((y) => window.scrollTo(0, y), mid);
await page.waitForTimeout(700);

// Diagnostic: log the bounding box of the AnnounceBar
const bbox = await page.evaluate(() => {
  // Find by class fragment 'bg-abyssal' which the AnnounceBar uses on its outer div
  const all = Array.from(document.querySelectorAll('div')).filter((d) =>
    d.className && typeof d.className === 'string' && d.className.includes('sticky top-0 z-50')
  );
  if (all.length === 0) return null;
  const r = all[0].getBoundingClientRect();
  return { top: r.top, bottom: r.bottom, height: r.height, computed: window.getComputedStyle(all[0]).position };
});
console.log('AnnounceBar bbox at mid scroll:', JSON.stringify(bbox));

await page.screenshot({ path: './step5-debug-mid.png' });
console.log('Wrote step5-debug-mid.png');
await browser.close();
