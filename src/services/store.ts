import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice";
import constructorSlice from "./constructorSlice";
// import ingredientDetailsSlice from "./ingredientDetailsSlice";
import orderSlice from "./orderSlice";

export const store = configureStore({
  reducer: {
    burgerIngredients: ingredientsSlice,
    burgerConstructor: constructorSlice,
    // ingredientDetails: ingredientDetailsSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
