import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
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
      <form action="#" className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`text text_type_main-medium ${styles.heading}`}>Login</h1>
        <EmailInput onChange={handleChange} value={values.email} name="email" />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name="password"
          placeholder="Password"
        />
        <Button htmlType="submit" type="primary" size="large">
          Login
        </Button>
        <div
          className={`${styles.text_container} text text_type_main-default text_color_inactive`}
        >
          <p className={styles.text}>
            Are you new here?{" "}
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </p>
          <p className={styles.text}>
            Forgot password?{" "}
            <Link to="/forgot-password" className={styles.link}>
              Restore
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
