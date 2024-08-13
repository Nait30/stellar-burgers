import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngridient: (
      sliceState,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      if (payload.type === 'bun') {
        sliceState.bun = payload;
      } else {
        sliceState.ingredients.push(payload);
      }
    },
    removeIngredient: (sliceState, { payload }: PayloadAction<number>) => {
      sliceState.ingredients.splice(payload, 1);
    },
    clearBasket: (sliceState) => {
      sliceState.bun = null;
      sliceState.ingredients = [];
    },
    moveIngredient: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      state.ingredients.splice(to, 0, state.ingredients.splice(from, 1)[0]);
    }
  },
  selectors: {
    selectBurgerIngredients: (sliceState) => sliceState
  }
});

export const { selectBurgerIngredients } = burgerConstructorSlice.selectors;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const burgerConstructorActions = burgerConstructorSlice.actions;
