import { useAppSelector } from "../../utils/hooks";
import styles from "./order-summary.module.css";

function OrderSummary() {
  const orders = useAppSelector((store) => store.feed.data);
  const readyOrders = orders?.orders.filter((order) => order.status === "done");
  const inProgressOrders = orders?.orders.filter(
    (order) => order.status !== "done",
  );

  return (
    <div className={styles.summary__container}>
      <div className={styles.status}>
        <div className={styles.status_ready}>
          <p className="text text_type_main-default mb-6">Ready:</p>
          <div className={styles.ready}>
            {readyOrders?.map((order) => (
              <p
                key={order._id}
                className={`${styles.ready_order} text text_type_digits-default`}
              >
                {order.number}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.status_in_progress}>
          <p className="text text_type_main-default mb-6">In progress:</p>
          <div className={styles.in_progress}>
            {inProgressOrders?.map((order) => (
              <p
                key={order._id}
                className={`${styles.progress_order} text text_type_digits-default`}
              >
                {order.number}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.alltime}>
        <p className="text text_type_main-default">All time ready:</p>
        <p className={`${styles.shadow} text text_type_digits-large`}>
          {orders?.total}
        </p>
      </div>
      <div className={styles.today}>
        <p className="text text_type_main-default">Completed today:</p>
        <p className={`${styles.shadow} text text_type_digits-large`}>
          {orders?.totalToday}
        </p>
      </div>
    </div>
  );
}

export default OrderSummary;
