import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { data } from "../../utils/data";
import { IngredientType } from "../../utils/types";

interface IIngredientsState {
  ingredients: IngredientType[];
  isLoading: boolean;
  error: string | null;
  tab: string;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
  tab: "buns",
};

export const fetchIngredients = createAsyncThunk("burger-ingredients/fetchIngredients", async () => {
  const response = await api.getIngredients();
  const dataWithTranslatedName = response.data.map(ingredient => {
    const foundData = data.find(d => d.name === ingredient.name);
    return {
      ...ingredient,
      translatedName: foundData ? foundData.translatedName : ingredient.name,
    };
  });
  return dataWithTranslatedName;
});

const ingredientsSlice = createSlice({
  name: "burger-ingredients",
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.tab = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<IngredientType[]>) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { setCurrentTab } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
