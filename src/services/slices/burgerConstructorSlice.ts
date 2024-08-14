import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { useSelector } from '../store';

export interface BurgerConstructorState {
  constructorItems: {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];}
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: null | string;
  loading: boolean;
}

const initialState: BurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null,
  loading: false
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
        sliceState.constructorItems.bun = payload;
      } else {
        sliceState.constructorItems.ingredients.push(payload);
      }
    },
    removeIngredient: (sliceState, { payload }: PayloadAction<number>) => {
      sliceState.constructorItems.ingredients.splice(payload, 1);
    },
    clearBasket: (sliceState) => {
      sliceState.constructorItems.bun = null;
      sliceState.constructorItems.ingredients = [];
    },
    moveIngredient: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      state.constructorItems.ingredients.splice(to, 0, state.constructorItems.ingredients.splice(from, 1)[0]);
    }
  },
  selectors: {
    selectBurgerIngredients: (sliceState) => sliceState.constructorItems,
    selectOrderRequest: (sliceState) => sliceState.orderRequest,
    selectModalData: (sliceState) => sliceState.orderModalData,
    selectIsLoading: (sliceState) => sliceState.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (sliceState) => {
        sliceState.loading = true;
        sliceState.error = null;
      })
      .addCase(makeOrder.rejected, (sliceState, action) => {
        sliceState.orderRequest = false;
        sliceState.error = action.error.message as string | null;
      })
      .addCase(makeOrder.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.orderModalData = action.payload.order;
        sliceState.constructorItems = {bun: null, ingredients: []};
        sliceState.error = null;
      });
  }
});

export const makeOrder = createAsyncThunk(
  'burgerConstructor/makeOrder',
  async (_, { rejectWithValue }) => {
    const constructorIngredients = useSelector(selectBurgerIngredients);
    const ingredients = constructorIngredients.ingredients.push(constructorIngredients.bun as TConstructorIngredient)
    const ingredientsId = Array.from(ingredients, (item)=> item.id)
    try {
      const response = await orderBurgerApi(ingredientsId);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при оформлении заказа');
    }
  }
);

export const { selectBurgerIngredients, selectIsLoading, selectModalData, selectOrderRequest } = burgerConstructorSlice.selectors;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const burgerConstructorActions = burgerConstructorSlice.actions;
