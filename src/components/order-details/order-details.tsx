import styles from "./order-details.module.css";
import doneImage from "../../images/done.png";
import { useAppSelector } from "../../utils/hooks";

const OrderDetails = () => {
  const order = useAppSelector(state => state.order);
  return (
    <div className={styles.container}>
      <h2 className={`${styles.order_number} text text_type_digits-large`}>{order.orderNumber}</h2>
      <p className={`text text_type_main-medium`}>идентификатор заказа</p>
      <img
        className={`${styles.image}`}
        src={doneImage}
        alt="Заказ готов"
      />
      <p className={`${styles.status} text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`${styles.description} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};
export default OrderDetails;
