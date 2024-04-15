import { Meal } from "./types";

export default async function getMealDetailsById(
    id: string,
): Promise<{meals: Meal[]}> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  
  if (!response.ok) {
      throw new Error('API error occurred');
    }

  return response.json();
}