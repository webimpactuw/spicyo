// @ts-check
const { test, expect } = require('@playwright/test');
const superagent = require('superagent')

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:8080');
});

test.describe('DYNAMIC_DISHES', () => {
  // Make sure the old elements are not present
  test('REMOVE_STATIC_HTML', async ({ page }) => {
    await expect(page.locator('.resip_section'))
        .not.toContainText('Homemade');
    await expect(page.locator('.resip_section'))
        .not.toContainText('Noodles');
    await expect(page.locator('.resip_section'))
        .not.toContainText('Egg');
    await expect(page.locator('.resip_section'))
        .not.toContainText('Sushi Dizzy');
    await expect(page.locator('.resip_section'))
        .not.toContainText('The Coffee Break');
  });

  // Load the new data from the API
  test('LOAD_FROM_API', async ({ page }) => {
    // First, get the dishes from the webservice
    try {
      let complete = await superagent
        .get("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
        .accept("json")

        const mealsFromService = complete.body.meals;
        expect(mealsFromService.length).toBeGreaterThan(0);

        for (let meal of mealsFromService) {
            await expect(page.locator('.resip_section'))
                .toContainText(meal.strMeal);
        }
    } catch (e) {
      throw e

    }
  });
});

