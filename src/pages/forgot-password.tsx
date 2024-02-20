import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forms.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.form_container}>
      <form
        action="#"
        className={styles.form}>
        <h1 className={`text text_type_main-medium ${styles.heading}`}>
          Восстановление пароля
        </h1>
        <EmailInput
          onChange={onEmailChange}
          value={email}
          placeholder="Укажите e-mail"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large">
          Восстановить
        </Button>
        <div
          className={`${styles.text_container} text text_type_main-default text_color_inactive`}>
          <p className={styles.text}>
            Вспомнили пароль?{" "}
            <Link
              to="/login"
              className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
