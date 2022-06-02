import { Ingredient } from '../App';

export default async function getIngredients(): Promise<{meals: Ingredient[]}> {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  );

  if (!response.ok) {
    throw new Error('API error occurred');
  }
  return response.json();
}
