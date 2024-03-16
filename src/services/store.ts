import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredients/ingredientsSlice";
import constructorSlice from "./constructor/constructorSlice";
import orderSlice from "./order/orderSlice";
import userSlice from "./user/userSlice";
import {
  wsCloseFeed,
  wsConnectFeed,
  wsConnectingFeed,
  wsDisconnectFeed,
  wsErrorFeed,
  wsMessageFeed,
  wsOpenFeed,
} from "./feed/actions";
import {
  wsCloseOrder,
  wsConnectOrder,
  wsConnectingOrder,
  wsDisconnectOrder,
  wsErrorOrder,
  wsMessageOrder,
  wsOpenOrder,
} from "./my-orders/actions";
import { socketMiddleware } from "./middleware/socket-middleware";
import { feed } from "./feed/reducers";
import { myOrders } from "./my-orders/reducers";
import api from "../utils/api";

const wsActionsFeed = {
  wsConnect: wsConnectFeed,
  wsDisconnect: wsDisconnectFeed,
  wsConnecting: wsConnectingFeed,
  wsOpen: wsOpenFeed,
  wsClose: wsCloseFeed,
  wsMessage: wsMessageFeed,
  wsError: wsErrorFeed,
};

const wsActionsOrder = {
  wsConnect: wsConnectOrder,
  wsDisconnect: wsDisconnectOrder,
  wsConnecting: wsConnectingOrder,
  wsOpen: wsOpenOrder,
  wsClose: wsCloseOrder,
  wsMessage: wsMessageOrder,
  wsError: wsErrorOrder,
};

const webSocketOrderMiddleware = socketMiddleware(wsActionsOrder);
const webSocketFeedMiddleware = socketMiddleware(wsActionsFeed);

export const store = configureStore({
  reducer: {
    burgerIngredients: ingredientsSlice,
    burgerConstructor: constructorSlice,
    order: orderSlice,
    user: userSlice,
    feed: feed,
    myOrders: myOrders,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(webSocketOrderMiddleware, webSocketFeedMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
