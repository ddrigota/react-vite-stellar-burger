import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import translateText from "../../utils/translate";
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
  const data = await Promise.all(
    response.data.map(async ingredient => ({
      ...ingredient,
      translatedName: await translateText(ingredient.name),
    }))
  );
  return data;
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
