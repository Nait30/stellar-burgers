import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export interface BurgerConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
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
    addIngridient: {
      reducer: (
        sliceState,
        { payload }: PayloadAction<TConstructorIngredient>
      ) => {
        if (payload.type === 'bun') {
          sliceState.constructorItems.bun = payload;
        } else {
          sliceState.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
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
      state.constructorItems.ingredients.splice(
        to,
        0,
        state.constructorItems.ingredients.splice(from, 1)[0]
      );
    },
    deleteOrderModalData: (sliceState) => {
      sliceState.orderModalData = null;
      sliceState.orderRequest = false;
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
        sliceState.orderRequest = true;
      })
      .addCase(makeOrder.rejected, (sliceState, action) => {
        sliceState.orderRequest = false;
        sliceState.error = action.error.message as string | null;
      })
      .addCase(makeOrder.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.orderModalData = action.payload.order;
        sliceState.constructorItems = { bun: null, ingredients: [] };
        sliceState.error = null;
      });
  }
});

export const makeOrder = createAsyncThunk(
  'burgerConstructor/makeOrder',
  async (data: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(data);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при оформлении заказа');
    }
  }
);

export const {
  selectBurgerIngredients,
  selectIsLoading,
  selectModalData,
  selectOrderRequest
} = burgerConstructorSlice.selectors;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const burgerConstructorActions = burgerConstructorSlice.actions;
