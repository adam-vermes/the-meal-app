import { Category } from '../App';

export default async function getCategories():
Promise<{categories: Category[]}> {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/categories.php',
  );

  if (!response.ok) {
    throw new Error('API error occurred');
  }
  return response.json();
}
