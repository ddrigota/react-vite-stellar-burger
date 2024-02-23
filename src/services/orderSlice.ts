import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { composeOrder } from "./constructorSlice";
import api from "../utils/api";

interface OrderResponse {
  success: boolean;
  order: {
    number: number;
  };
}

interface OrderState {
  orderNumber: number | null;
  modalIsOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderNumber: null,
  modalIsOpen: false,
  isLoading: false,
  error: null,
};

export const postOrder = createAsyncThunk<OrderResponse, void, { state: RootState }>(
  "order/postOrder",
  async (_, { getState, dispatch }) => {
    dispatch(composeOrder());
    const state = getState();
    const orderString = state.burgerConstructor.orderString;
    const response = await api.request("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: orderString,
    });
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
