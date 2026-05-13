import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  args: ['--enable-webgl', '--use-angle=swiftshader-webgl'],
});
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const page = await context.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

const layout = await page.evaluate(() => {
  const sec = document.getElementById('on-work');
  const r = sec.getBoundingClientRect();
  return { top: r.top + window.scrollY, h: r.height, vh: window.innerHeight };
});

const baseTop = layout.top;
const range = layout.h - layout.vh;

// First park at p≈0.05 so the spring is settled at the cover.
await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), baseTop + range * 0.05);
await page.waitForTimeout(1500);

// Now nudge forward by a small jump that triggers a flip animation, and shoot DURING the spring transition.
// Spring with stiffness 130, damping 26, mass 0.6 has a critical timescale ~300-600ms.
// Land between two settled flip states so the spring rotates the leaf in flight.
const targets = [
  { label: 'flip-25pc',  p: 0.165 },  // entering flip 2
  { label: 'flip-43pc',  p: 0.395 },  // entering flip 4
  { label: 'flip-60pc',  p: 0.560 },  // entering flip 5
];

for (const { label, p } of targets) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), baseTop + range * p);
  // VERY short delay — catch the spring mid-flight
  await page.waitForTimeout(120);
  await page.screenshot({ path: `./ql-${label}.png` });
  console.log(`Shot ${label} at p=${p}`);
  // Brief settle so next shot also catches a flip from a near-cover position
  await page.waitForTimeout(900);
}

await browser.close();
