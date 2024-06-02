import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IngredientType } from "../../utils/types";

interface IConstructorState {
  bun: IngredientType | null;
  ingredients: IngredientType[];
  bunPrice: number;
  ingredientsPrice: number;
  orderString: string | null;
  to?: number | undefined;
  from?: number | undefined;
}

export const initialState: IConstructorState = {
  bun: {
    _id: "",
    name: "Choose bun",
    translatedName: "Choose bun",
    type: "bun",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
  ingredients: [],
  bunPrice: 0,
  ingredientsPrice: 0,
  orderString: null,
};

const constructorSlice = createSlice({
  name: "burger-constructor",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IngredientType>) => {
      state.ingredients.push({ ...action.payload, id: uuidv4() });
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
    composeOrder: state => {
      const ingredientsId = state.ingredients.map(item => item._id);
      const order = {
        ingredients: [state.bun?._id, ...ingredientsId, state.bun?._id],
      };
      state.orderString = JSON.stringify(order);
    },
    reorderConstructor: (state, action: PayloadAction<{ from: number; to: number }>) => {
      state.ingredients.splice(action.payload.to, 0, state.ingredients.splice(action.payload.from, 1)[0]);
    },
    clearConstructor: () => initialState,
  },
});

const constructorReducer = constructorSlice.reducer;

export default constructorReducer;
export const { addIngredient, removeIngredient, setBun, composeOrder, clearConstructor, reorderConstructor } =
  constructorSlice.actions;
