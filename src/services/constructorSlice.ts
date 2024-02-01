import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";

interface ConstructorState {
  bun: IngredientType | null;
  ingredients: IngredientType[];
  bunPrice: number;
  ingredientsPrice: number;
  orderString: string | null;
  orderNumber: number | null;
  modalIsOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ConstructorState = {
  bun: {
    _id: "",
    name: "Выберите булку",
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
  orderNumber: null,
  modalIsOpen: false,
  isLoading: false,
  error: null,
};

export const postOrder = createAsyncThunk("burger-constructor/postOrder", async (order: string | null, { rejectWithValue }) => {
  try {
    const response = await fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: order,
    });
    if (!response.ok) {
      throw new Error("Ошибка сервера");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const constructorSlice = createSlice({
  name: "burger-constructor",
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
    composeOrder: state => {
      const ingredientsId = state.ingredients.map(item => item._id);
      const order = {
        ingredients: [state.bun?._id, ...ingredientsId, state.bun?._id],
      };
      state.orderString = JSON.stringify(order);
    },
    closeOrderModal: state => {
      state.modalIsOpen = false;
      state.orderString = null;
      state.orderNumber = null;
    },
    clearConstructor: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(postOrder.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.order) {
          state.orderNumber = action.payload.order.number;
        } else {
          state.error = "Ошибка в заказе";
        }
        state.modalIsOpen = true;
        state.orderString = null;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

const constructorReducer = constructorSlice.reducer;

export default constructorReducer;
export const { addIngredient, removeIngredient, setBun, composeOrder, clearConstructor, closeOrderModal } = constructorSlice.actions;
