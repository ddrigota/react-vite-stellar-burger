import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forms.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
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
        <h1 className={`text text_type_main-medium ${styles.heading}`}>
          Регистрация
        </h1>
        <Input
          onChange={onNameChange}
          value={name}
          placeholder="Имя"
        />
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
          Зарегистрироваться
        </Button>
        <div
          className={`${styles.text_container} text text_type_main-default text_color_inactive`}>
          <p className={styles.text}>
            Уже зарегистрированы?{" "}
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

export default Register;
