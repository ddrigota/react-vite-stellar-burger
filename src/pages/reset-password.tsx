import styles from "./forms.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useForm } from "../utils/hooks";
import { resetPassword } from "../services/user/userSlice";

function ResetPassword() {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });

  useEffect(() => {
    if (!location.state?.fromForgotPassword) {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(resetPassword(values as { password: string; token: string }));
    navigate("/login");
  };

  return (
    <div className={styles.form_container}>
      <form
        action="#"
        className={styles.form}
        onSubmit={onSubmit}>
        <h1 className={`text text_type_main-medium ${styles.heading}`}>Восстановление пароля</h1>

        <PasswordInput
          name="password"
          onChange={handleChange}
          value={values.password}
          placeholder="Введите новый пароль"
        />
        <Input
          name="token"
          onChange={handleChange}
          value={values.token}
          placeholder="Введите код из письма"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large">
          Сохранить
        </Button>
        <div className={`${styles.text_container} text text_type_main-default text_color_inactive`}>
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
