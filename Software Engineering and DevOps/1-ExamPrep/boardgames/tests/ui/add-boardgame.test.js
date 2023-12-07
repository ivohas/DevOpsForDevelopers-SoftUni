const { test, expect } = require('@playwright/test');

test('Check add boardgame page', async ({ page }) => {
    await page.goto('https://ivailo06-boardgames.onrender.com/add-boardgame');
    const form = await page.$('form');
    expect(form).toBeTruthy();
  });
  