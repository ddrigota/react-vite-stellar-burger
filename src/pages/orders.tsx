import { useEffect } from "react";
import Order from "../components/order/order";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import styles from "./orders.module.css";
import { getCookie } from "../utils/cookie";
import { wsConnectOrder, wsDisconnectOrder } from "../services/my-orders/actions";

function Orders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.myOrders.data);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    dispatch(
      wsConnectOrder({
        wsUrl: `wss://norma.nomoreparties.space/orders?token=${accessToken?.replace("Bearer ", "")}`,
        withTokenRefresh: true,
      })
    );
    return () => {
      dispatch(wsDisconnectOrder());
    };
  }, [dispatch]);

  return (
    <div className={styles.orders__container}>
      {orders?.orders?.map(order => (
        <Order
          key={order._id}
          order={order}
          url={"/profile/orders"}
          showStatus={true}
        />
      ))}
    </div>
  );
}

export default Orders;
