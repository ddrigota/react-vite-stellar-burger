import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../utils/hooks";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import styles from "./order.module.css";

function Order() {
  const allIngredients = useAppSelector(store => store.burgerIngredients.ingredients);
  const maxNumberOfIngredients = 5;

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
          {allIngredients.map((ingredient, index) => {
            if (index < maxNumberOfIngredients) {
              return (
                <IngredientIcon
                  key={index}
                  ingredient={ingredient}
                />
              );
            } else if (index === maxNumberOfIngredients) {
              return (
                <div key={index}>
                  <IngredientIcon
                    ingredient={ingredient}
                    counter={allIngredients.length - maxNumberOfIngredients}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className={styles.price}></div>
      </div>
    </div>
  );
}

export default Order;
