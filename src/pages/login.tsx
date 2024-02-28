import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forms.module.css";
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../utils/hooks";

interface LoginProps {
  onLogin: (data: { email: string; password: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values as { email: string; password: string });
  };

  return (
    <div className={styles.form_container}>
      <form
        action="#"
        className={styles.form}
        onSubmit={handleSubmit}>
        <h1 className={`text text_type_main-medium ${styles.heading}`}>Вход</h1>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name="email"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name="password"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large">
          Войти
        </Button>
        <div className={`${styles.text_container} text text_type_main-default text_color_inactive`}>
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
};

export default Login;
