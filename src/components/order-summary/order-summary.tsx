import styles from "./order-summary.module.css";

function OrderSummary() {
  return (
    <div className={styles.summary__container}>
      <div className={styles.status}>
        <div className={styles.status_ready}>
          <p className="text text_type_main-default mb-2">Готовы:</p>
          <div className={styles.ready}>
            <p className={`${styles.ready_order} text text_type_digits-default`}>123123</p>
            <p className={`${styles.ready_order} text text_type_digits-default`}>123123</p>
            <p className={`${styles.ready_order} text text_type_digits-default`}>123123</p>
          </div>
        </div>
        <div className={styles.status_in_progress}>
          <p className="text text_type_main-default mb-2">В работе:</p>
          <div className={styles.in_progress}>
            <p className={`${styles.progress_order} text text_type_digits-default`}>123123</p>
            <p className={`${styles.progress_order} text text_type_digits-default`}>123123</p>
            <p className={`${styles.progress_order} text text_type_digits-default`}>123123</p>
          </div>
        </div>
      </div>

      <div className={styles.alltime}>
        <p className="text text_type_main-default">Выполнено за все время:</p>{" "}
        <p className={`${styles.shadow} text text_type_digits-large `}>123456</p>
      </div>
      <div className={styles.today}>
        <p className="text text_type_main-default">Выполнено за сегодня:</p>
        <p className={`${styles.shadow} text text_type_digits-large `}>123</p>
      </div>
    </div>
  );
}

export default OrderSummary;
