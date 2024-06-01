import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../utils/hooks";
import { IngredientType } from "../../utils/types";
import { useDrag } from "react-dnd";

const Ingredient = ({ ingredient }: { ingredient: IngredientType }) => {
  const ingredients = useAppSelector(
    (state) => state.burgerConstructor.ingredients,
  );
  const bun = useAppSelector((state) => state.burgerConstructor.bun);

  const ingredientCount = ingredients.filter(
    (item: IngredientType) => item._id === ingredient._id,
  ).length;
  const bunCount = bun && bun._id === ingredient._id ? 2 : 0;

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  return (
    <article
      className={styles.card}
      ref={dragRef}
      id={ingredient._id}
      style={{ opacity }}
    >
      <img
        className={styles.card__image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={styles.price_container}>
        <p className={`${styles.price} text text_type_digits-default`}>
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {ingredient.name}
      </p>
      {ingredient.type !== "bun" && ingredientCount > 0 && (
        <Counter count={ingredientCount} size="default" />
      )}
      {ingredient.type === "bun" && bunCount > 0 && (
        <Counter count={bunCount} size="default" />
      )}
    </article>
  );
};

export default Ingredient;
