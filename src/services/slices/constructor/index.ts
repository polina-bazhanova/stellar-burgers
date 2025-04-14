import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import {
  ERequestStatus,
  TConstructorIngredient,
  TIngredient
} from '@utils-types';

export type TBurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  status: ERequestStatus;
};

export const initialState: TBurgerConstructorState = {
  constructorItems: { bun: null, ingredients: [] },
  status: ERequestStatus.Idle
};

export const BurgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    moveIngredientUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      if (currentIndex > 0) {
        state.constructorItems.ingredients[currentIndex] =
          state.constructorItems.ingredients[currentIndex - 1];
        state.constructorItems.ingredients[currentIndex - 1] = action.payload;
      }
    },
    moveIngredientDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (currentIndex < state.constructorItems.ingredients.length - 1) {
        const temp = state.constructorItems.ingredients[currentIndex + 1];
        state.constructorItems.ingredients[currentIndex + 1] =
          state.constructorItems.ingredients[currentIndex];
        state.constructorItems.ingredients[currentIndex] = temp;
      }
    },
    clearIngredients: (state) => {
      (state.constructorItems.bun = null),
        (state.constructorItems.ingredients = []);
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderStatus: (state) => state.status,
    getBurgerConstructorState: (state) => state
  }
});

export const {
  getConstructorItems,
  getOrderStatus,
  getBurgerConstructorState
} = BurgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearIngredients
} = BurgerConstructorSlice.actions;

export const BurgerConstructorReducer = BurgerConstructorSlice.reducer;
