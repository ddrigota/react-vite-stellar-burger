import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: [],
  isOpen: false,
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setIngredientDetails: (state, action) => {
      state.ingredient = action.payload;
      state.isOpen = true;
    },
    clearIngredientDetails: () => initialState,
  },
});

export const { setIngredientDetails, clearIngredientDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
