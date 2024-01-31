import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice";
import constructorSlice from "./constructorSlice";

export const store = configureStore({
  reducer: {
    burgerIngredients: ingredientsSlice,
    burgerConstructor: constructorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
