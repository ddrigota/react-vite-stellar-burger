import { Outlet } from "react-router";
import Order from "../components/order/order";
import styles from "./feed.module.css";

function Feed() {
  return (
    <main className={styles.feed__container}>
      <h1 className="text text_type_main-large mb-4">Лента заказов</h1>
      <div className={styles.orders__container}>
        <section className={styles.orders}>
          <Order />
          <Order />
          <Order />
        </section>
        <section className="order__status">
          <p className="">HELLO</p>
          <Outlet />
        </section>
      </div>
    </main>
  );
}
export default Feed;
