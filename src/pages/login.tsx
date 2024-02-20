import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forms.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.form_container}>
      <form
        action="#"
        className={styles.form}>
        <h1 className={`text text_type_main-medium ${styles.heading}`}>Вход</h1>
        <EmailInput
          onChange={onEmailChange}
          value={email}
        />
        <PasswordInput
          onChange={onPasswordChange}
          value={password}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large">
          Войти
        </Button>
        <div
          className={`${styles.text_container} text text_type_main-default text_color_inactive`}>
          <p className={styles.text}>
            Вы — новый пользователь?{" "}
            <Link
              to="/register"
              className={styles.link}>
              Зарегистрироваться
            </Link>
          </p>
          <p className={styles.text}>
            Забыли пароль?{" "}
            <Link
              to="/forgot-password"
              className={styles.link}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
