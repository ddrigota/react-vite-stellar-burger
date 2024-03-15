import constructorReducer, {
  initialState,
  addIngredient,
  removeIngredient,
  setBun,
  composeOrder,
  clearConstructor,
} from "./constructorSlice";

const mockBun = {
  _id: "123",
  name: "test bun",
  type: "bun",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: "test",
  image_mobile: "test",
  image_large: "test",
  __v: 0,
};

const mockIngredient = {
  _id: "123",
  name: "test",
  type: "main",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: "test",
  image_mobile: "test",
  image_large: "test",
  __v: 0,
};

const mockStateWithIngredient = {
  ...initialState,
  bun: mockBun,
  ingredients: [mockIngredient],
  ingredientsPrice: mockIngredient.price,
};

describe("constructor reducer", () => {
  test("set bun", () => {
    expect(constructorReducer(initialState, setBun(mockBun))).toEqual({
      ...initialState,
      bun: mockBun,
    });
  });
  test("add ingredient", () => {
    expect(constructorReducer(initialState, addIngredient(mockIngredient))).toEqual({
      ...initialState,
      ingredients: [{ ...mockIngredient, id: expect.any(String) }],
      ingredientsPrice: mockIngredient.price,
    });
  });
  test("remove ingredient", () => {
    expect(constructorReducer(mockStateWithIngredient, removeIngredient(mockIngredient._id))).toEqual({
      ...initialState,
      bun: mockBun,
    });
  });
  test("compose order", () => {
    expect(constructorReducer(mockStateWithIngredient, composeOrder())).toEqual({
      ...mockStateWithIngredient,
      orderString: JSON.stringify({
        ingredients: [mockBun._id, mockIngredient._id, mockBun._id],
      }),
    });
  });
  test("clear constructor", () => {
    expect(constructorReducer(mockStateWithIngredient, clearConstructor())).toEqual(initialState);
  });
});
