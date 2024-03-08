import { useLocation, useParams } from "react-router";
import styles from "./order-info.module.css";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { useEffect } from "react";
import { wsConnectOrder, wsDisconnectOrder } from "../services/my-orders/actions";
import IngredientIcon from "../components/ingredient-icon/ingredient-icon";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { calculatePrice } from "../utils/utility-functions";

function OrderInfo() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();
  const background = location.state?.background;
  const allOrders = useAppSelector(state => state.feed.data?.orders);
  const allIngredients = useAppSelector(state => state.burgerIngredients.ingredients);
  const currentOrder = allOrders?.find(item => item._id === id);

  useEffect(() => {
    if ((location.pathname.startsWith("/profile") || location.pathname.startsWith("/feed")) && !background) {
      dispatch(
        wsConnectOrder({
          wsUrl: "wss://norma.nomoreparties.space/orders/all",
          withTokenRefresh: true,
        })
      );
    } else {
      return () => {
        dispatch(wsDisconnectOrder());
      };
    }
  }, [location.pathname]);

  return (
    <>
      {currentOrder && (
        <div className={styles.order_info_container}>
          <p className={`${styles.order_number} text text_type_digits-default mb-10`}>{`#${currentOrder.number}`}</p>
          <h2 className="text text_type_main-medium mb-3">{currentOrder.name}</h2>
          <p
            className="text text_type_main-default mb-15"
            style={{ color: currentOrder.status === "done" ? "#0cc" : "" }}>
            {currentOrder.status === "done" ? "Выполнен" : "Готовится"}
          </p>
          <h3 className="text text_type_main-medium mb-6">Состав:</h3>
          <div className={styles.ingredients_container}>
            {currentOrder.ingredients
              .reduce((unique: string[], item: string) => {
                return unique.includes(item) ? unique : [...unique, item];
              }, [])
              .map((item, index) => {
                const ingredient = allIngredients?.find(ingredient => ingredient._id === item);
                return (
                  ingredient && (
                    <div
                      key={index}
                      className={styles.ingredient}>
                      <div className={styles.ingredient_name}>
                        <IngredientIcon ingredient={ingredient?._id} />
                        <p className="text text_type_main-default">{ingredient.name}</p>
                      </div>
                      <div className={styles.price_container}>
                        <p className="text text_type_digits-default">
                          {`${currentOrder.ingredients.filter(i => i === item).length} x`}
                        </p>
                        <p className="text text_type_digits-default">{ingredient.price}</p>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  )
                );
              })}
          </div>
          <div className={styles.total}>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(currentOrder.createdAt)} /> i-GMT+3
            </p>
            <div className={styles.price_container}>
              <p className="text text_type_digits-default">{calculatePrice(currentOrder, allIngredients)}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderInfo;
