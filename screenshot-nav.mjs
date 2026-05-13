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

const settle = async (ms = 600) => {
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  await page.waitForTimeout(ms);
};

// --- State A: at-top transparent ---
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await settle(800);
await page.screenshot({ path: './nav-A-top.png', clip: { x: 0, y: 0, width: 1600, height: 200 } });
console.log('Wrote nav-A-top.png');

// --- State B: scrolled DOWN, nav hidden ---
// Two scroll steps so the direction-tracker registers "down".
await page.evaluate(() => window.scrollTo({ top: 200, behavior: 'instant' }));
await settle(500);
await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
await settle(700); // give the 280ms transform transition time to complete
await page.screenshot({ path: './nav-B-hidden.png', clip: { x: 0, y: 0, width: 1600, height: 200 } });
console.log('Wrote nav-B-hidden.png');

// --- State C: scrolled UP, nav visible with darker blur ---
// We're at scrollY 1200; scroll up to 900 to trigger direction reversal.
await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
await settle(700);
await page.screenshot({ path: './nav-C-shown.png', clip: { x: 0, y: 0, width: 1600, height: 200 } });
console.log('Wrote nav-C-shown.png');

await browser.close();
