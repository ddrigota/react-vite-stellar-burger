import { createReducer } from "@reduxjs/toolkit";
import { OrderListType } from "../../utils/types";
import { wsMessageFeed } from "./actions";

interface OrderState {
  data: OrderListType | null;
}

export const initialState: OrderState = {
  data: null,
};

export const feed = createReducer(initialState, builder => {
  builder.addCase(wsMessageFeed, (state, action) => {
    state.data = action.payload;
    // console.log("wsMessageFeed", action.payload);
  });
});
