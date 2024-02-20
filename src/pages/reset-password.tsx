import styles from "./forms.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.form_container}>
      <form
        action="#"
        className={styles.form}>
        <h1 className={`text text_type_main-medium ${styles.heading}`}>
          Восстановление пароля
        </h1>

        <PasswordInput
          onChange={onPasswordChange}
          value={password}
          placeholder="Введите новый пароль"
        />
        <Input
          onChange={onCodeChange}
          value={code}
          placeholder="Введите код из письма"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large">
          Сохранить
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

export default ResetPassword;
