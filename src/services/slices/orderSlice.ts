import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

export interface OrderState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (sliceState) => sliceState.orders,
    selectIsLoading: (sliceState) => sliceState.loading,
    selectOrder: (sliceState, id) =>
      sliceState.orders.filter((order) => order._id == id)
  }
});

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(id);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при получении ленты');
    }
  }
);

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при получении заказов');
    }
  }
);

export const { selectIsLoading, selectOrder, selectOrders } =
  orderSlice.selectors;

export const orderSliceReducer = orderSlice.reducer;

export const orderSliceActions = orderSlice.actions;
