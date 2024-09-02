import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../store';
import { getIngredientsApi } from '../../../utils/burger-api';

export interface IngredientsState {
  ingridients: TIngredient[];
  loading: boolean;
  error: string | null;
}

export const initialState: IngredientsState = {
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при получении ингредиентов');
    }
  }
);

export const selectIngredient = (id: string | undefined) =>
  useSelector(selectIngridients).find((ingredient) => ingredient._id === id);

export const { selectIngridients, selectIsLoading } =
  ingredientsSlice.selectors;

export const ingridientsReducer = ingredientsSlice.reducer;
