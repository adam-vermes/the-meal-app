import { test, expect } from '@playwright/test';

test.describe('Testing meal app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('App title', async ({ page }) => {
    await expect(page).toHaveTitle(/Meal App/);
  });

  test('Search for meals', async ({ page }) => {
    await page.fill('#mealInput', 'Chicken');
    await page.click('#searchIcon');
    await expect(page.locator('text=Chicken Congee').first()).toBeVisible();

    await page.locator('[aria-label="Go to next page"]').click();
    await expect(
      page.locator('text=Chicken Quinoa Greek Salad').first(),
    ).toBeVisible();

    await page.fill('#mealInput', 'Beef');
    await page.click('#searchIcon');
    await expect(page.locator('text=Beef Bourguignon').first()).toBeVisible();
  });

  test('Add recipe', async ({ page }) => {
    await page.click('text=ADD MEAL');
    await expect(page.locator('text=Add New Meal').first()).toBeVisible();

    await page.fill('#strMeal', 'Beef');
    await page.fill('#strInstructions', 'Olajban susd ki a sajtot.');
    await page.fill('#strCategory', 'Vega');
    await page.fill('#strIngredient1', 'Sajt');
    await page.fill('#strIngredient2', 'Olaj');
    await page.fill('#strIngredient3', 'Liszt');
    await page.fill('#strArea', 'Magyar');
    await page.locator('#submit').click();
    await expect(page.locator('text=Beef')).toBeVisible();
  });

  test('Search by ingredient', async ({ page }) => {
    await page.fill('#combo-box-demo', 'Vegan');
    await page.click('text=Vegan Butter');
    await expect(page.locator('text=Vegan Lasagna').first()).toBeVisible();
  });
});
