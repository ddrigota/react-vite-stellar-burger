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
      ingredients: data,
      isLoading: false,
      error: null,
      tab: "buns",
    });
  });
  test("set current tab", () => {
    expect(ingredientsSlice(initialState, { type: "burger-ingredients/setCurrentTab", payload: "sauces" })).toEqual({
      ingredients: [],
      isLoading: false,
      error: null,
      tab: "sauces",
    });
  });
});
