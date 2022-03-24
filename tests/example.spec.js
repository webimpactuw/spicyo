// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:8080');
});

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    let currentYear = new Date().getFullYear();
    await expect(page.locator('.copyright')).toContainText(currentYear + ' All Rights Reserved.');
  });

});

