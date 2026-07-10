const puppeteer = require('puppeteer');
const fs = require('fs');

async function captureScreenshots(prefix) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const sizes = [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 }
  ];

  for (const size of sizes) {
    console.log(`Capturing ${prefix} at ${size.width}x${size.height}...`);
    await page.setViewport({ width: size.width, height: size.height, deviceScaleFactor: 2 });
    try {
      await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 60000 });
      await new Promise(r => setTimeout(r, 4000));
    } catch (e) {
      console.log('Navigation took too long, proceeding anyway...', e.message);
      await new Promise(r => setTimeout(r, 2000));
    }
    
    const dir = '/Users/suryanshpathak/.gemini/antigravity-ide/brain/b4db19d2-1ef8-47c4-beae-0e9fa9fddfc4';
    await page.screenshot({ path: `${dir}/${prefix}_${size.width}.png`, fullPage: true });
  }

  await browser.close();
  console.log('Done capturing screenshots.');
}

const prefix = process.argv[2] || 'before';
captureScreenshots(prefix);
