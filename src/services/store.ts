import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {
  BurgerConstructorSlice,
  FeedSlice,
  UserSlice,
  IngredientsSlice,
  OrderSlice
} from '@slices';

const rootReducer = {
  [IngredientsSlice.name]: IngredientsSlice.reducer,
  [BurgerConstructorSlice.name]: BurgerConstructorSlice.reducer,
  [UserSlice.name]: UserSlice.reducer,
  [OrderSlice.name]: OrderSlice.reducer,
  [FeedSlice.name]: FeedSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
