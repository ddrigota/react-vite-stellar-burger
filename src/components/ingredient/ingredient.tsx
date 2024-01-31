import styles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, setBun } from "../../services/constructorSlice";
import { IngredientType } from "../../utils/types";
import { RootState } from "../../services/store";

const Ingredient = (ingredient: IngredientType) => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.burgerConstructor.ingredients.filter((item: IngredientType) => item._id === ingredient._id).length);

  return (
    <article
      className={styles.card}
      onClick={() => {
        if (ingredient.type === "bun") {
          dispatch(setBun(ingredient));
        } else {
          dispatch(addIngredient(ingredient));
        }
      }}>
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
      {count > 0 &&
        (ingredient.type !== "bun" ? (
          <Counter
            count={count}
            size="default"
          />
        ) : (
          <Counter
            count={2}
            size="default"
          />
        ))}
    </article>
  );
};

export default Ingredient;
