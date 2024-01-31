import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";

interface ConstructorState {
  bun: IngredientType | null;
  ingredients: IngredientType[];
  totalPrice: number;
}

const initialState: ConstructorState = {
  bun: {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
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
export const { addIngredient, removeIngredient, setBun, clearConstructor } = constructorSlice.actions;
