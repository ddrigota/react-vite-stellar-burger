import orderReducer, { initialState } from "./orderSlice";

const mockPostOrederResponse = {
  success: true,
  order: { number: 123 },
  name: "Order Name",
};

const mockGetOrderResponse = {
  success: true,
  orders: [
    {
      number: 123,
      name: "Order Name",
    },
  ],
};

describe("orderSlice", () => {
  test("post order", () => {
    expect(
      orderReducer(initialState, {
        type: "order/postOrder/fulfilled",
        payload: mockPostOrederResponse,
      })
    ).toEqual({
      currentOrder: null,
      orderNumber: 123,
      isLoading: false,
      error: null,
      modalIsOpen: true,
    });
  });
  test("get order", () => {
    expect(
      orderReducer(initialState, {
        type: "order/getOrder/fulfilled",
        payload: mockGetOrderResponse.orders[0],
      })
    ).toEqual({
      currentOrder: mockGetOrderResponse.orders[0],
      orderNumber: null,
      isLoading: false,
      error: null,
      modalIsOpen: false,
    });
  });
});
