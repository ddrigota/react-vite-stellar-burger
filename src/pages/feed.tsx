import Order from "../components/order/order";
import styles from "./feed.module.css";
import OrderSummary from "../components/order-summary/order-summary";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { useEffect } from "react";
import { wsConnectFeed, wsDisconnectFeed } from "../services/feed/actions";

function Feed() {
  const dispatch = useAppDispatch();
  const wsUrl = "wss://norma.nomoreparties.space/orders/all";
  const orders = useAppSelector((store) => store.feed.data);

  useEffect(() => {
    dispatch(
      wsConnectFeed({
        wsUrl: wsUrl,
        withTokenRefresh: true,
      }),
    );
    return () => {
      dispatch(wsDisconnectFeed());
    };
  }, [dispatch]);

  return (
    <main className={styles.feed__container}>
      <h1 className="text text_type_main-medium mb-4">Order feed</h1>
      <div className={styles.orders__container}>
        <section className={styles.orders}>
          {orders?.orders.map((order) => (
            <Order order={order} url={"/feed"} key={order._id} />
          ))}
        </section>
        <section className={styles.order__status}>
          <OrderSummary />
        </section>
      </div>
    </main>
  );
}
export default Feed;
