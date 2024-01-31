import ingredientsReducer from "./ingredientsSlice";
import constructorReducer from "./constructorSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  constructor: constructorReducer,
});
