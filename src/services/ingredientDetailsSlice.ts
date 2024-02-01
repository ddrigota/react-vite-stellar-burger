import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";

interface IngredientDetailsState {
  ingredient: IngredientType | null;
  isOpen: boolean;
}

const initialState: IngredientDetailsState = {
  ingredient: null,
  isOpen: false,
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setIngredientDetails: (state, action: PayloadAction<IngredientType | null>) => {
      state.ingredient = action.payload;
      state.isOpen = true;
    },
    clearIngredientDetails: () => initialState,
  },
});

export const { setIngredientDetails, clearIngredientDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
