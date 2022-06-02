import {
  ChangeEvent, MouseEvent, useEffect, useState,
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

export interface Meal {
dateModified: null
idMeal: string
strArea: string
strCategory: string
strCreativeCommonsConfirmed: null
strDrinkAlternate: null
strImageSource: null
strIngredient1: string
strIngredient2: string
strIngredient3: string
strIngredient4: string
strIngredient5: string
strIngredient6: string
strIngredient7: string
strIngredient8: string
strIngredient9: string
strIngredient10: string
strIngredient11: string
strIngredient12: string
strIngredient13: string
strIngredient14: string
strIngredient15: string
strIngredient16: string
strIngredient17: string
strIngredient18: string
strIngredient19: string
strIngredient20: string
strInstructions: string
strMeal: string
strMealThumb: string
strMeasure1: string
strMeasure2: string
strMeasure3: string
strMeasure4: string
strMeasure5: string
strMeasure6: string
strMeasure7: string
strMeasure8: string
strMeasure9: string
strMeasure10: string
strMeasure11: string
strMeasure12: string
strMeasure13: string
strMeasure14: string
strMeasure15: string
strMeasure16: string
strMeasure17: string
strMeasure18: string
strMeasure19: string
strMeasure20: string
strSource: string
strTags: string
strYoutube: string
}

export interface Category {
  idCategory: string
  strCategory: string
  strCategoryDescription: string
  strCategoryThumb: string
}

export interface Ingredient {
  idIngredient: string
  strDescription: string
  strIngredient: string
  strType: string
}

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

function App() {
  const [meals, setMeal] = useState<Meal[]>([]);
  const [, setCategoryFilterValue] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [mappedIngredients,
    setMappedIngredients] = useState<{label: string, id: string}[]>([]);

  useEffect(() => {
    getCategories().then((category) => {
      setCategories(category.categories);
    });
    getIngredients().then((ingredient) => {
      setIngredients(ingredient.meals);
    });
  }, []);

  useEffect(() => {
    setMappedIngredients(ingredients.map((ingredient) => ({
      label: ingredient.strIngredient,
      id: ingredient.idIngredient,
    })));
  }, [ingredients]);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const textValue = event.target.value;
    const re = /^[A-Za-z]+$/;
    if (textValue === '' || re.test(textValue)) {
      setSearchPhrase(textValue);
    }
  };

  const handleSearchOnSubmit = () => {
    if (searchPhrase) {
      getMealByName(searchPhrase).then((mealData): void => {
        setMeal(mealData.meals);
        setSearchPhrase('');
      });
    }
  };

  const handleSearchByCategory = (event: MouseEvent) => {
    const selectedCategoryValue = (event.target as HTMLImageElement).alt;
    setCategoryFilterValue(selectedCategoryValue);
    getMealByCategory(selectedCategoryValue).then((categoryMeal) => {
      setMeal(categoryMeal.meals);
    });
  };

  const handleSearchByIngredient = (value:
    { label: string; id: string; } | null) => {
    if (value) {
      getMealByMainIngredient(value.label).then((ingredientMeal) => {
        setMeal(ingredientMeal.meals);
      });
    }
  };

  const addRecipeToTable = (formData: Meal) => {
    const idMeal = getRandomInt(10000).toString();
    setMeal((prevMealData) => [...prevMealData, { ...formData, idMeal }]);
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
              TheMealApp
            </Typography>

            <Typography variant="subtitle1" component="div" align="center">
              Search for the best meals
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
                  disablePortal
                  id="combo-box-demo"
                  options={mappedIngredients}
                  size="small"
                  sx={{ width: 300 }}
                  onChange={(e, v) => handleSearchByIngredient(v)}
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
