import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { OrderType } from "../../utils/types";
import { calculatePrice } from "../../utils/utility-functions";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import styles from "./order.module.css";

interface OrderProps {
  order: OrderType;
  url?: string;
  showStatus?: boolean;
}

function Order({ order, url, showStatus = false }: OrderProps) {
  const allIngredients = useAppSelector(store => store.burgerIngredients.ingredients);
  const location = useLocation();
  const maxNumberOfIngredients = 6;

  return (
    <Link
      to={`${url}/${order.number}`}
      state={{ backgroundLocation: location }}
      className={styles.order__link}>
      <div className={styles.order__container}>
        <div className={styles.order__data}>
          <p className={`${styles.order__number} text text_type_digits-default`}>{`#${order.number}`}</p>
          <p className={`${styles.order__date} text text_type_main-default text_color_inactive`}>
            {new Date(order.createdAt).toDateString()}
          </p>
        </div>
        <h2 className={`${styles.order__title} text text_type_main-medium`}>{order.name}</h2>
        {showStatus ? (
          <p
            className={`${styles.order__status} text text_type_main-default`}
            style={{ color: order.status === "done" ? "#0CC" : "" }}>
            {order.status === "done" ? "Ready" : "In progress"}
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
    </Link>
  );
}

export default Order;
