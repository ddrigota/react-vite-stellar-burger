import styles from "./ingredients-group.module.css";
import Ingredient from "../ingredient/ingredient";
import { IngredientType } from "../../utils/types";
import React from "react";

interface Props {
  title: string;
  ingredients: IngredientType[];
  openIngredientDetails: (ingredient: IngredientType | null) => void;
  id: string;
}

const IngredientsGroup = React.forwardRef<HTMLDivElement, Props>(({ title, ingredients, openIngredientDetails, id }, ref) => {
  return (
    <div
      className={`${styles.ingredients__group}`}
      id={id}
      ref={ref}>
      <h2 className={`${styles.ingredients__group_heading} text text_type_main-medium`}>{title}</h2>
      <ul className={`${styles.ingredients__list}`}>
        {ingredients.map(ingredient => (
          <li
            key={ingredient._id}
            className={`${styles.ingredients__list_item}`}
            onClick={() => openIngredientDetails(ingredient)}>
            <Ingredient
              image={ingredient.image}
              price={ingredient.price}
              name={ingredient.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default IngredientsGroup;
