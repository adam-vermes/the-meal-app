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
    await page.click('text=ADD RECIPE');
    await expect(page.locator('text=Add Your Recipe').first()).toBeVisible();

    await page.fill('#strMeal', 'Rantott Sajt');
    await page.fill('#strInstructions', 'Olajban susd ki a sajtot.');
    await page.fill('#strCategory', 'Vega');
    await page.fill('#strIngredient1', 'Sajt');
    await page.fill('#strIngredient2', 'Olaj');
    await page.fill('#strIngredient3', 'Liszt');
    await page.fill('#strArea', 'Magyar');
    await page.click('text=SUBMIT');
    await expect(page.locator('text=Rantott Sajt').first()).toBeVisible();
  });

  test('Search by ingredient', async ({ page }) => {
    await page.fill('#combo-box-demo', 'Vegan');
    await page.click('text=Vegan Butter');
    await expect(page.locator('text=Vegan Lasagna').first()).toBeVisible();
  });
});
