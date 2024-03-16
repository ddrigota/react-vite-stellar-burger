import { feed, initialState } from "./reducers";
import { wsMessageFeed } from "./actions";

const mockPayload = {
  success: true,
  orders: [
    {
      _id: "60d3b41abdacab0026a733c6",
      ingredients: ["60d3b41abdacab0026a733c5"],
      status: "done",
      name: "Краторная булка N-200i",
      createdAt: "2021-06-24T14:48:26.586Z",
      updatedAt: "2021-06-24T14:48:26.606Z",
      number: 1,
    },
  ],
  total: 0,
  totalToday: 0,
};

describe("feed reducer", () => {
  it("should handle wsMessageFeed", () => {
    const action = wsMessageFeed(mockPayload);
    const expectedState = { data: mockPayload };
    expect(feed(initialState, action)).toEqual(expectedState);
  });
});
