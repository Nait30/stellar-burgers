import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder, TOrdersData } from '@utils-types';
import { useSelector } from '../store';

export interface FeedState extends TOrdersData {
  loading: boolean;
  error: string | null;
  modalOrder: TOrder | null;
}

const initialState: FeedState = {
  loading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  modalOrder: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (sliceState) => sliceState.loading,
    selectOrders: (sliceState) => sliceState.orders,
    selectTotal: (sliceState) => sliceState.total,
    selectTotalToday: (sliceState) => sliceState.totalToday,
    selectFeed: (sliceState) => sliceState,
    selectModalOrder: (sliceState) => sliceState.modalOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (sliceState) => {
        sliceState.loading = true;
        sliceState.error = null;
      })
      .addCase(getFeed.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.error = action.error.message as string | null;
      })
      .addCase(getFeed.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.total = action.payload.total;
        sliceState.totalToday = action.payload.totalToday;
        sliceState.orders = action.payload.orders;
      })
      .addCase(getOrder.pending, (sliceState) => {
        sliceState.loading = true;
        sliceState.error = null;
      })
      .addCase(getOrder.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.error = action.error.message as string | null;
      })
      .addCase(getOrder.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.modalOrder = action.payload.orders[0];
      });
  }
});

export const getFeed = createAsyncThunk(
  'feed/getFeed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при получении ленты');
    }
  }
);

export const getOrder = createAsyncThunk(
  'feed/getOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при получении ленты');
    }
  }
);

export const selectOrder = (number: string | undefined) =>
  useSelector(selectOrders).find((order) => String(order.number) === number);

export const {
  selectIsLoading,
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectFeed,
  selectModalOrder
} = feedSlice.selectors;

export const feedSliceReducer = feedSlice.reducer;

export const feedSliceActions = feedSlice.actions;
