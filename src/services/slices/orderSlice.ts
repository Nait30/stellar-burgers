import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { useSelector } from '../store';

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (sliceState) => {
        sliceState.loading = true;
      })
      .addCase(getOrders.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.error = action.payload as string;
      })
      .addCase(getOrders.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.orders = action.payload;
        sliceState.error = null;
      });
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

export const selectUserOrder = (number: string | undefined) =>
  useSelector(selectOrders).find((order) => String(order.number) == number);

export const { selectIsLoading, selectOrder, selectOrders } =
  orderSlice.selectors;

export const orderSliceReducer = orderSlice.reducer;

export const orderSliceActions = orderSlice.actions;
