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

const consoleErrors = [];
const pageErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') {
    consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
  }
});
page.on('pageerror', (e) => pageErrors.push(e.message));

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

// Find the QuietLedger section position and its scroll runway
const layout = await page.evaluate(() => {
  const sec = document.getElementById('on-work');
  if (!sec) return null;
  const r = sec.getBoundingClientRect();
  return {
    sectionTopAbs: r.top + window.scrollY,
    sectionHeight: r.height,
    docHeight: document.documentElement.scrollHeight,
    viewportH: window.innerHeight,
  };
});
console.log('QuietLedger layout:', JSON.stringify(layout));

const settle = async () => {
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  await page.waitForTimeout(1400);
  await page.evaluate(() => document.body.getBoundingClientRect());
  await page.waitForTimeout(400);
};

const cap = async (label, scrollY) => {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
  await settle();
  await page.screenshot({ path: `./ql-${label}.png` });
  console.log(`Wrote ql-${label}.png at scrollY=${scrollY}`);
};

// Section starts at sectionTopAbs. It pins for "sectionHeight - viewportH" px.
// Inside that pinned range, scrollYProgress (with offset start-start → end-end)
// goes from 0 (when section top hits viewport top) to 1 (when section bottom
// hits viewport bottom). So:
//   progress p maps to scrollY = sectionTopAbs + p * (sectionHeight - viewportH)
const baseTop = layout.sectionTopAbs;
const range = layout.sectionHeight - layout.viewportH;

// (a) Entry — cover plate visible, before any page turns
await cap('a-entry', baseTop);

// (b) Mid-flip — somewhere a page should be caught at ~45-55° rotation.
// With FLIPS=7 + cover, each flip occupies ~12.5% of progress. Land between flips 3 and 4.
await cap('b-midflip', baseTop + range * 0.42);

// (c) Final spread — almost all the way through
await cap('c-final', baseTop + range * 0.96);

// (d) Section boundaries
// d1 = transition into QuietLedger (Stack just leaving, QuietLedger entering)
await cap('d1-boundary-into', baseTop - 200);
// d2 = transition out of QuietLedger (the section ending, next section starting)
await cap('d2-boundary-out', baseTop + layout.sectionHeight - 600);

console.log('---');
console.log('Browser console errors/warnings:', consoleErrors.length);
consoleErrors.slice(0, 12).forEach((e) => console.log('  ', e));
console.log('Page errors:', pageErrors.length);
pageErrors.slice(0, 6).forEach((e) => console.log('  ', e));

await browser.close();
