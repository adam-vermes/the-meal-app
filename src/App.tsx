import {
  ChangeEvent, MouseEvent, useEffect, useMemo, useState,
} from 'react';
import Grid from '@mui/material/Grid';
import {
  Button,
  Container,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import getCategories from './api/getCategories';
import getIngredients from './api/getMainIngredients';
import getMealByCategory from './api/getMealByCategory';
import getMealByMainIngredient from './api/getMealByMainIngredient';
import getMealByName from './api/getMealByName';
import Form from './Form';
import Table from './Table';
import { Meal, Category, Ingredient } from './api/types';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchMealData = async() => {
      try {
        const [category, ingredient] = 
          await Promise.all([getCategories(), getIngredients()]);
        setCategories(category.categories);
        setIngredients(ingredient.meals);

      } catch (error) {
        alert('An error occurred while fetching data.');
      }
    };
    fetchMealData();
  }, []);


  const mappedIngredients = useMemo(() => 
    ingredients.map((ingredient) => ({
      label: ingredient.strIngredient,
      id: ingredient.idIngredient,
    })), [ingredients]);


  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const textValue = event.target.value;
    const regex = /^(?!\s)[a-zA-Z_\s-]+$/;
    if (textValue === '' || regex.test(textValue)) {
      setSearchPhrase(textValue);
    }
  };

  const handleGetRequest = async(searchPhrase: string) => {
  if (!searchPhrase) return;

  try {

    const mealByName = await getMealByName(searchPhrase);
    setMeals(mealByName.meals);
    setSearchPhrase('');

  } catch (error) {
    alert('An error occurred while fetching data.');
  }

  };

  const handleOnKeyUp = (event: { key: string; keyCode: number; }) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleGetRequest(searchPhrase);
    }
  };

  const handleSearchOnSubmit = () => {
    handleGetRequest(searchPhrase);
  };

  const handleSearchByCategory = async(event: MouseEvent) => {
    const selectedCategoryValue = (event.target as HTMLImageElement).alt;
    const mealByCategory = await getMealByCategory(selectedCategoryValue);
    setMeals(mealByCategory.meals);
  };

  const handleSearchByIngredient = async(value:
    { label: string; id: string; } | null) => {
    if (!value) return;
      
     const mealbyIngredient = await getMealByMainIngredient(value.label);
     setMeals(mealbyIngredient.meals);
     };


  const addRecipeToTable = (formData: Meal) => {
    const idMeal = getRandomInt(10000).toString();
    setMeals((prevMealData) => [...prevMealData, { ...formData, idMeal }]);
  };

  return (
    <Container maxWidth="xl" sx={{ bgcolor: '#313638', p: 2 }}>
      <Paper sx={{ p: 2, bgcolor: '#E8E9EB' }}>
        <Grid
          container
          spacing={1}
          flexGrow={1}
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography variant="h6" component="div" align="center">
              <span>TheMealApp</span>
            </Typography>

            <Typography variant="subtitle1" component="div" align="center">
              <span>Search for the best meals</span>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider
              sx={{ m: 2 }}
              orientation="horizontal"
            />
          </Grid>

          <Grid item>
            <Paper
              component="div"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 'auto',
                border: '1px #F06543 solid',
                flexWrap: 'wrap',
              }}
            >
              <TextField
                sx={{ ml: 1, flex: 1 }}
                label="Search by Meal"
                onChange={handleSearchInput}
                type="text"
                size="small"
                value={searchPhrase}
                id="mealInput"
                onKeyUp={handleOnKeyUp}
              />
              <IconButton
                type="submit"
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={handleSearchOnSubmit}
                id="searchIcon"
              >
                <SearchIcon />
              </IconButton>

              <Divider sx={{ height: 28, m: 1.5 }} orientation="vertical" />

              <Form handleAdd={addRecipeToTable} />

              <Divider sx={{ height: 28, m: 1.5 }} orientation="vertical" />

              {mappedIngredients.length > 0
                && (
                <Autocomplete
                  id="combo-box-demo"
                  options={mappedIngredients}
                  size="small"
                  sx={{ width: 300 }}
                  onChange={(_, value) => handleSearchByIngredient(value)}
                  isOptionEqualToValue={(
                    option,
                    value,
                  ) => option.label === value.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search by Ingredient"
                      id="ingredientInput"
                    />
                  )}
                />
                )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Divider
              sx={{ m: 2 }}
              orientation="horizontal"
            />
          </Grid>

          <Grid item xs={12}>
            <Paper component="div">
              <ImageList
                cols={7}
                gap={4}
              >
                {categories?.map((category) => (
                  <ImageListItem
                    key={category.idCategory}
                  >
                    <Button
                      onClick={(event) => {
                        handleSearchByCategory(event);
                      }}
                      sx={{ border: '1px solid #F06543' }}
                    >
                      <img
                        src={category.strCategoryThumb}
                        alt={category.strCategory}
                        loading="lazy"
                      />
                    </Button>
                    <ImageListItemBar
                      title={category.strCategory}
                      sx={{ textAlign: 'center' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Divider
              sx={{ m: 2 }}
              orientation="horizontal"
            />
          </Grid>

          <Grid item xs={12}>
            {meals?.length > 0 && <Table rowData={meals} />}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
