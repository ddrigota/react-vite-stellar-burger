import styles from "./ingredients-group.module.css";
import Ingredient from "../ingredient/ingredient";
import { IngredientType } from "../../utils/types";
import React from "react";
import { setIngredientDetails } from "../../services/ingredientDetailsSlice";
import { useAppDispatch } from "../../utils/hooks";

interface Props {
  title: string;
  ingredients: IngredientType[];
  id: string;
}

const IngredientsGroup = React.forwardRef<HTMLDivElement, Props>(({ title, ingredients, id }, ref) => {
  const dispatch = useAppDispatch();
  const openIngredientDetailsModal = (ingredient: IngredientType | null) => {
    dispatch(setIngredientDetails(ingredient));
  };

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
            onClick={() => openIngredientDetailsModal(ingredient)}>
            <Ingredient ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default IngredientsGroup;
