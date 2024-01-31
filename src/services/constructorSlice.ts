import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";

interface ConstructorState {
  bun: IngredientType | null;
  ingredients: IngredientType[];
  bunPrice: number;
  ingredientsPrice: number;
}

const initialState: ConstructorState = {
  bun: {
    _id: "0",
    name: "Выберите булку",
    type: "bun",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "https://placehold.jp/9e9e9e/9e9e9e/150x150.png?css=%7B%22border-radius%22%3A%22%2050%25%22%7D",
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
  ingredients: [],
  bunPrice: 0,
  ingredientsPrice: 0,
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IngredientType>) => {
      state.ingredients.push(action.payload);
      state.ingredientsPrice += action.payload.price;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(item => item._id === action.payload);
      if (index > -1) {
        state.ingredientsPrice -= state.ingredients[index].price;
        state.ingredients.splice(index, 1);
      }
    },
    setBun: (state, action: PayloadAction<IngredientType>) => {
      state.bun = action.payload;
      state.bunPrice = action.payload.price * 2;
    },
    clearConstructor: () => initialState,
  },
});

const constructorReducer = constructorSlice.reducer;

export default constructorReducer;
export const { addIngredient, removeIngredient, setBun, clearConstructor } = constructorSlice.actions;
