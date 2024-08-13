import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingridientsReducer } from './slices/ingridientsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { feedSliceReducer } from './slices/feedSlice';
import { userSliceReducer } from './slices/userSlice';

const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedSliceReducer,
  user: userSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
