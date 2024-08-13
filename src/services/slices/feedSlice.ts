import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrdersData } from '@utils-types';

export interface FeedState extends TOrdersData {
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  loading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
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
    selectFeed: (sliceState) => sliceState
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

export const {
  selectIsLoading,
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectFeed
} = feedSlice.selectors;

export const feedSliceReducer = feedSlice.reducer;

export const feedSliceActions = feedSlice.actions;
