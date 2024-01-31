import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";

interface ConstructorState {
  bun: IngredientType | null;
  ingredients: IngredientType[];
  totalPrice: number;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IngredientType>) => {
      state.ingredients.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(item => item._id === action.payload);
      if (index > -1) {
        state.totalPrice -= state.ingredients[index].price;
        state.ingredients.splice(index, 1);
      }
    },
    setBun: (state, action: PayloadAction<IngredientType>) => {
      state.bun = action.payload;
      state.totalPrice += action.payload.price * 2;
    },
    clearConstructor: state => {
      state.bun = null;
      state.ingredients = [];
      state.totalPrice = 0;
    },
  },
});

const constructorReducer = constructorSlice.reducer;

export default constructorReducer;
