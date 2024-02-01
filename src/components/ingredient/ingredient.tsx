import styles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { IngredientType } from "../../utils/types";
import { RootState } from "../../services/store";
import { useDrag } from "react-dnd";

const Ingredient = (ingredient: IngredientType) => {
  const ingredients = useSelector((state: RootState) => state.burgerConstructor.ingredients);
  const bun = useSelector((state: RootState) => state.burgerConstructor.bun);

  const ingredientCount = ingredients.filter((item: IngredientType) => item._id === ingredient._id).length;
  const bunCount = bun && bun._id === ingredient._id ? 2 : 0;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <article
      className={styles.card}
      ref={dragRef}
      id={ingredient._id}>
      <img
        className={styles.card__image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={styles.price_container}>
        <p className={`${styles.price} text text_type_digits-default`}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      {ingredient.type !== "bun" && ingredientCount > 0 && (
        <Counter
          count={ingredientCount}
          size="default"
        />
      )}
      {ingredient.type === "bun" && bunCount > 0 && (
        <Counter
          count={bunCount}
          size="default"
        />
      )}
    </article>
  );
};

export default Ingredient;
