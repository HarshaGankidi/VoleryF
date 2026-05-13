import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader-webgl'] });
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const page = await context.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

// Top-of-page nav (transparent over hero)
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
await page.waitForTimeout(800);
await page.screenshot({ path: './nav-top.png', clip: { x: 0, y: 0, width: 1600, height: 180 } });
console.log('Wrote nav-top.png');

// Scrolled nav (sapphire-blur backdrop)
await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'instant' }));
await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
await page.waitForTimeout(1000);
await page.screenshot({ path: './nav-scrolled.png', clip: { x: 0, y: 0, width: 1600, height: 180 } });
console.log('Wrote nav-scrolled.png');

await browser.close();
