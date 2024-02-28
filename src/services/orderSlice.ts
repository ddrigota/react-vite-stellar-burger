import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { composeOrder } from "./constructorSlice";
import api from "../utils/api";

interface IOrderResponse {
  success: boolean;
  order: {
    number: number;
  };
}

interface IOrderState {
  orderNumber: number | null;
  modalIsOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrderState = {
  orderNumber: null,
  modalIsOpen: false,
  isLoading: false,
  error: null,
};

export const postOrder = createAsyncThunk<IOrderResponse, void, { state: RootState }>(
  "order/postOrder",
  async (_, { getState, dispatch }) => {
    dispatch(composeOrder());
    const state = getState();
    const orderString = state.burgerConstructor.orderString;
    if (!orderString) {
      throw new Error("Ошибка в заказе");
    }
    const response = await api.postOrder(orderString);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    closeOrderModal: state => {
      state.modalIsOpen = false;
      state.orderNumber = null;
    },
    clearOrder: () => initialState,
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
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

const orderReducer = orderSlice.reducer;

export default orderReducer;
export const { closeOrderModal } = orderSlice.actions;
