import { combineReducers } from '@reduxjs/toolkit';
import { ingridientsReducer } from './slices/ingridientsSlice/ingridientsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice/burgerConstructorSlice';
import { feedSliceReducer } from './slices/feedSlice/feedSlice';
import { userSliceReducer } from './slices/userSlice/userSlice';
import { orderSliceReducer } from './slices/orderSlice/orderSlice';

describe('test store', () => {
  test('store initialization', () => {
    const store = combineReducers({
      ingridients: ingridientsReducer,
      burgerConstructor: burgerConstructorReducer,
      feed: feedSliceReducer,
      user: userSliceReducer,
      order: orderSliceReducer
    });
    const initialState = store(undefined, { type: '' });
    expect(initialState).toEqual({
      ingridients: ingridientsReducer(undefined, { type: '' }),
      burgerConstructor: burgerConstructorReducer(undefined, { type: '' }),
      feed: feedSliceReducer(undefined, { type: '' }),
      user: userSliceReducer(undefined, { type: '' }),
      order: orderSliceReducer(undefined, { type: '' })
    });
  });
});
