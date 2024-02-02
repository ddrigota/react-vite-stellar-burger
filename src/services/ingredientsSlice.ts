import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";

interface IngredientsState {
  ingredients: IngredientType[];
  isLoading: boolean;
  error: string | null;
  tab: string;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
  tab: "buns",
};

export const fetchIngredients = createAsyncThunk("burger-ingredients/fetchIngredients", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://norma.nomoreparties.space/api/ingredients");
    if (!response.ok) {
      throw new Error("Ошибка сервера");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
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
