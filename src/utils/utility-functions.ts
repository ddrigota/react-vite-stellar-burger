import { IngredientType, OrderType } from "./types";

export const calculatePrice = (order: OrderType, ingredients: IngredientType[]): number => {
  let totalPrice = 0;
  order.ingredients.forEach(id => {
    const ingredient = ingredients.find(item => item._id === id);
    if (ingredient) {
      totalPrice += ingredient.price;
    }
  });
  return totalPrice;
};
