import { createSlice } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";

interface IngredientsState {
  ingredients: IngredientType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: true,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
});

export default ingredientsSlice.reducer;
