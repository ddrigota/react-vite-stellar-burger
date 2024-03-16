import ingredientsSlice, { initialState } from "./ingredientsSlice";
import { data } from "../../utils/data";

const response = {
  success: true,
  data: data,
};

describe("ingredientsSlice", () => {
  test("get ingredients", () => {
    expect(
      ingredientsSlice(initialState, {
        type: "burger-ingredients/fetchIngredients/fulfilled",
        payload: response.data,
      })
    ).toEqual({
      ...initialState,
      ingredients: data,
    });
  });
  test("set current tab", () => {
    expect(ingredientsSlice(initialState, { type: "burger-ingredients/setCurrentTab", payload: "sauces" })).toEqual({
      ...initialState,
      tab: "sauces",
    });
  });
});
