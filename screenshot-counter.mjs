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

const stops = [
  { y: 0, label: 'top' },
  { y: Math.round(docHeight * 0.5), label: 'mid' },
  { y: docHeight, label: 'bot' },
];

for (const { y, label } of stops) {
  await page.evaluate((sy) => window.scrollTo({ top: sy, behavior: 'instant' }), y);
  // Wait two animation frames for sticky repaint to settle before capture
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  await page.waitForTimeout(1200);
  // Force a layout/paint by reading layout
  await page.evaluate(() => document.body.getBoundingClientRect());
  await page.waitForTimeout(300);

  await page.screenshot({
    path: `./step5-counter-${label}.png`,
    clip: { x: 0, y: 0, width: 1600, height: 60 },
  });
  console.log(`Wrote step5-counter-${label}.png at scroll=${y}`);
}

await browser.close();
