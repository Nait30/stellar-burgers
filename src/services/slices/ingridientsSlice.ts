import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  ingridients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingridients: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  selectors: {
    selectIngridients: (sliceState) => sliceState.ingridients,
    selectIsLoading: (sliceState) => sliceState.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string | null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingridients = action.payload;
      });
  }
});

export const getIngredients = createAsyncThunk(
  'ingridients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    console.log(1);
    return response;
  }
);

export const { selectIngridients, selectIsLoading } =
  ingredientsSlice.selectors;

export const ingridientsReducer = ingredientsSlice.reducer;
