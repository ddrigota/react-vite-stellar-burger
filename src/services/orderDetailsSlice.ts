import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderNumber: null,
  isOpen: false,
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderNumber = action.payload;
      state.isOpen = true;
    },
    clearOrderDetails: () => initialState,
  },
});

export const { setOrderDetails, clearOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
