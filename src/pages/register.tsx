import { Button, Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forms.module.css";
import { ChangeEvent, useState, FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterProps {
  onRegister: (data: { name: string; email: string; password: string }) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [userData, setUserData] = useState({
    name: "",
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
    if (!userData.email || !userData.password || !userData.name) {
      return;
    }
    onRegister(userData);
  };

  return (
    <div className={styles.form_container}>
      <form
        action="#"
        className={styles.form}
        onSubmit={handleSubmit}>
        <h1 className={`text text_type_main-medium ${styles.heading}`}>Регистрация</h1>
        <Input
          onChange={handleChange}
          value={userData.name}
          name="name"
          placeholder="Имя"
        />
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
          Зарегистрироваться
        </Button>
        <div className={`${styles.text_container} text text_type_main-default text_color_inactive`}>
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
};

export default Register;
