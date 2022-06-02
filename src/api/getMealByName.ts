import { Meal } from '../App';

export default async function getMealByName(
  mealName: string,
): Promise<{meals: Meal[]}> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`,
  );

  if (!response.ok) {
    throw new Error('API error occurred');
  }
  return response.json();
}
