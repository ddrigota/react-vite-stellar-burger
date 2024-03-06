import Order from "../components/order/order";
import styles from "./orders.module.css";

function Orders() {
  return (
    <div className={styles.orders__container}>
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
    </div>
  );
}

export default Orders;
