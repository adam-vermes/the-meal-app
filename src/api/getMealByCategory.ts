import { Meal } from "./types";

export default async function getMealByCategory(
  categoryName: string,
): Promise<{meals: Meal[]}> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
  );

  if (!response.ok) {
    throw new Error('API error occurred');
  }
  return response.json();
}
