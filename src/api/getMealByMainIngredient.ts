import { Meal } from '../App';

export default async function getMealByMainIngredient(
  ingredient: string,
): Promise<{meals: Meal[]}> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
  );

  if (!response.ok) {
    throw new Error('API error occurred');
  }
  return response.json();
}
