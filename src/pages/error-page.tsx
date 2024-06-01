import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./error-page.module.css";

function Error404() {
  return (
    <div className={styles.error}>
      <h1 className={`${styles.heading} text text_type_digits-large`}>404</h1>
      <p className={`${styles.text} text text_type_main-medium`}>
        Not Found
      </p>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={() => window.history.back()}
      >
        Go back
      </Button>
    </div>
  );
}

export default Error404;
