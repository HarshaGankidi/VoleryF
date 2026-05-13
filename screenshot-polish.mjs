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

const ids = [
  { id: null, label: '01-hero' },
  { id: 'bulletin', label: '02-bulletin' },
  { id: 'specimens', label: '03-specimens' },
  { id: 'stack', label: '04-stack' },
  { id: 'decision', label: '05-decision' },
  { id: 'on-work', label: '06-quietledger' },
  { id: 'voices', label: '07-voices' },
  { id: 'cost', label: '08-telegram' },
  { id: 'choice', label: '09-pricing' },
  { id: 'roadmap', label: '10-roadmap' },
  { id: 'invitation', label: '11-invitation' },
];

for (const { id, label } of ids) {
  if (id === null) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  } else {
    await page.evaluate((sel) => {
      const el = document.getElementById(sel);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, id);
  }
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `./polish-${label}.png` });
  console.log(`Wrote polish-${label}.png`);
}

await browser.close();
