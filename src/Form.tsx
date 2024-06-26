import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
  FormHelperText, Grid, TextField, Typography,
} from '@mui/material';
import { Meal } from './api/types';

interface FormProps {
  handleAdd: (recipeData: Meal) => void
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
  } = useForm<Meal>();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (
    recipeData: Meal,
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

  const validationConfig = { required: true,
    pattern: {value: /^(?!\s)[a-zA-Z_\s-]+$/, 
    message: 'No number or whitespace'} };

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
                  <span>Add New Meal</span>
                </Typography>
              </Grid>
              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Meal Name"
                  id="strMeal"
                  {...register('strMeal', validationConfig)}
                />
                <FormHelperText variant="outlined">
                  {errors?.strMeal?.message?.toString()}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Description"
                  id="strInstructions"
                  {...register('strInstructions', validationConfig)}
                />
                <FormHelperText variant="outlined">
                {errors.strInstructions?.message?.toString()}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Category"
                  id="strCategory"
                  {...register('strCategory', validationConfig)}

                />
                <FormHelperText variant="outlined">
                {errors.strCategory?.message?.toString()}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Ingredient"
                  id="strIngredient1"
                  {...register('strIngredient1', validationConfig)}
                />
                <FormHelperText variant="outlined">
                {errors.strIngredient1?.message?.toString()}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Ingredient 2"
                  id="strIngredient2"
                  {...register('strIngredient2', validationConfig)}
                />
                <FormHelperText variant="outlined">
                {errors.strIngredient2?.message?.toString()}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Ingredient 3"
                  id="strIngredient3"
                  {...register('strIngredient3', validationConfig)}
                />
                <FormHelperText variant="outlined">
                {errors.strIngredient3?.message?.toString()}
                </FormHelperText>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  variant="outlined"
                  type="text"
                  label="Area"
                  id="strArea"
                  {...register('strArea', validationConfig)}
                />
                <FormHelperText variant="outlined">
                {errors.strArea?.message?.toString()}
                </FormHelperText>

                <Grid item sx={{ p: 1 }}>
                  <Button type="submit" variant="outlined" id="submit">
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
