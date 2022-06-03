import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
  FormHelperText, Grid, TextField, Typography,
} from '@mui/material';

interface FormProps {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  handleAdd: (recipeData: any) => void
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxHeight: '100%',
  bgcolor: 'background.paper',
  border: '1px solid #F06543',
  boxShadow: 24,
  p: 1,
  overflow: 'scroll'
};

export default function Form(
  { handleAdd }: FormProps,
) {
  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    recipeData: any,
  ) => {
    handleAdd(recipeData);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        strMeal: '',
        strCategory: '',
        strArea: '',
        strInstructions: '',
        strIngredient1: '',
        strIngredient2: '',
        strIngredient3: '',

      });
      handleClose();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">Add Meal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            flexGrow={1}
            justifyContent="center"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item textAlign="center">
                <Typography variant="h6" gutterBottom component="div">
                  Add New Meal
                </Typography>
              </Grid>
              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Meal Name"
                  id="strMeal"
                  {...register('strMeal', { required: true })}
                />
                <FormHelperText variant="outlined">
                  {errors.strMeal && <span>Name is required</span>}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Description"
                  id="strInstructions"
                  {...register('strInstructions', { required: true })}
                />
                <FormHelperText variant="outlined">
                  {errors.strInstructions
                && <span>Instructions are required</span>}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Category"
                  id="strCategory"
                  {...register('strCategory', { required: true })}
                />
                <FormHelperText variant="outlined">
                  {errors.strCategory && <span>Category is required</span>}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Ingredient"
                  id="strIngredient1"
                  {...register('strIngredient1', { required: true })}
                />
                <FormHelperText variant="outlined">
                  {errors.strIngredient1 && <span>Ingredient is required</span>}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Ingredient 2"
                  id="strIngredient2"
                  {...register('strIngredient2', { required: true })}
                />
                <FormHelperText variant="outlined">
                  {errors.strIngredient3 && <span>Ingredient is required</span>}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Ingredient 3"
                  id="strIngredient3"
                  {...register('strIngredient3', { required: true })}
                />
                <FormHelperText variant="outlined">
                  {errors.strIngredient2 && <span>Ingredient is required</span>}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Area"
                  id="strArea"
                  {...register('strArea', { required: true })}
                />
                <FormHelperText variant="outlined">
                  {errors.strArea && <span>Area is required</span>}
                </FormHelperText>

                <Grid item sx={{ p: 1 }}>
                  <Button type="submit" variant="outlined">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
