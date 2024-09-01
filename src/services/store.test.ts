import { combineReducers } from '@reduxjs/toolkit';
import { ingridientsReducer } from './slices/ingridientsSlice/ingridientsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice/burgerConstructorSlice';
import { feedSliceReducer } from './slices/feedSlice/feedSlice';
import { userSliceReducer } from './slices/userSlice/userSlice';
import { orderSliceReducer } from './slices/orderSlice/orderSlice';

describe('test store', () => {
  test('store initialization', () => {
    const initAction = { type: '@@INIT' };

    const store = combineReducers({
      ingridients: ingridientsReducer,
      burgerConstructor: burgerConstructorReducer,
      feed: feedSliceReducer,
      user: userSliceReducer,
      order: orderSliceReducer
    });

    const initialState = store(undefined, initAction);

    expect(initialState).toEqual({
      ingridients: ingridientsReducer(undefined, initAction),
      burgerConstructor: burgerConstructorReducer(undefined, initAction),
      feed: feedSliceReducer(undefined, initAction),
      user: userSliceReducer(undefined, initAction),
      order: orderSliceReducer(undefined, initAction)
    });
  });
});
