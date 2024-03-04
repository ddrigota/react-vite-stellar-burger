import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../utils/hooks";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import styles from "./order.module.css";

function Order() {
  const allIngredients = useAppSelector(store => store.burgerIngredients.ingredients);
  const maxNumberOfIngredients = 6;

  return (
    <div className={styles.order__container}>
      <div className={styles.order__data}>
        <p className={`${styles.order__number} text text_type_digits-default`}>#1234567</p>
        <p className={`${styles.order__date} text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date()} />
        </p>
      </div>
      <h2 className={`${styles.order__title} text text_type_main-medium`}>Order</h2>
      <div className={styles.ingredients__container}>
        <div className={styles.ingredients}>
          {allIngredients.slice(0, maxNumberOfIngredients).map((ingredient, index) => (
            <IngredientIcon
              key={index}
              ingredient={ingredient}
              counter={
                index === maxNumberOfIngredients - 1 ? allIngredients.length - maxNumberOfIngredients : undefined
              }
            />
          ))}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default">610</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default Order;
