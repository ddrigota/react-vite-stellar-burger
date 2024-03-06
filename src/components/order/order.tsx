import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../utils/hooks";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import styles from "./order.module.css";
import { useLocation } from "react-router";
import { IngredientType, OrderType } from "../../utils/types";

interface OrderProps {
  order: OrderType;
  url?: string;
  showStatus?: boolean;
}

const calculatePrice = (order: OrderType, ingredients: IngredientType[]): number => {
  let totalPrice = 0;
  order.ingredients.forEach(id => {
    const ingredient = ingredients.find(item => item._id === id);
    if (ingredient) {
      totalPrice += ingredient.price;
    }
  });
  return totalPrice;
};

function Order({ order, url, showStatus = false }: OrderProps) {
  const allIngredients = useAppSelector(store => store.burgerIngredients.ingredients);
  const location = useLocation();
  const maxNumberOfIngredients = 6;

  return (
    <div className={styles.order__container}>
      <div className={styles.order__data}>
        <p className={`${styles.order__number} text text_type_digits-default`}>{`#${order.number}`}</p>
        <p className={`${styles.order__date} text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date(order.createdAt)} /> i-GMT+3
        </p>
      </div>
      <h2 className={`${styles.order__title} text text_type_main-medium`}>{order.name}</h2>
      {showStatus ? (
        <p className={`${styles.order__status} text text_type_main-default`}>
          style={{ color: order.status === "done" ? "#0CC" : "" }}
          {order.status === "done" ? "Выполнен" : "Готовится"}
        </p>
      ) : null}
      <div className={styles.ingredients__container}>
        <div className={styles.ingredients}>
          {order.ingredients.slice(0, maxNumberOfIngredients).map((ingredient, index) => (
            <IngredientIcon
              key={index}
              ingredient={ingredient}
              counter={
                index === maxNumberOfIngredients - 1 ? order.ingredients.length - maxNumberOfIngredients : undefined
              }
            />
          ))}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{calculatePrice(order, allIngredients)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default Order;
