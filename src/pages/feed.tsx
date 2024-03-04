import Order from "../components/order/order";
import styles from "./feed.module.css";
import OrderSummary from "../components/order-summary/order-summary";

function Feed() {
  return (
    <main className={styles.feed__container}>
      <h1 className="text text_type_main-medium mb-4">Лента заказов</h1>
      <div className={styles.orders__container}>
        <section className={styles.orders}>
          <Order />
          <Order />
          <Order />
        </section>
        <section className={styles.order__status}>
          <OrderSummary />
        </section>
      </div>
    </main>
  );
}
export default Feed;
