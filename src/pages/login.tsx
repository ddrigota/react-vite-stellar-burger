import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forms.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  onLogin: (data: { email: string; password: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    onLogin(userData);
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
          value={userData.email}
          name="email"
        />
        <PasswordInput
          onChange={handleChange}
          value={userData.password}
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
