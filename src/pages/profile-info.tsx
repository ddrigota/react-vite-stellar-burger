import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-info.module.css";
import { useAppDispatch, useAppSelector, useForm } from "../utils/hooks";
import { checkUserAuth, updateUserInfo } from "../services/userSlice";
import { useState } from "react";

type UserData = {
  name: string;
  email: string;
} | null;

function ProfileInfo() {
  const userData = useAppSelector((state: { user: { data: UserData } }) => state.user.data);
  const dispatch = useAppDispatch();

  const { values, handleChange, isFormChanged, resetForm } = useForm({
    name: userData?.name || "",
    email: userData?.email || "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const onCancel = () => {
    resetForm();
    setIsDisabled(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserInfo(values as { name: string; email: string; password: string }));
    dispatch(checkUserAuth());
    resetForm();
    setIsDisabled(true);
  };

  return (
    <form
      className={styles.container}
      onSubmit={onSubmit}>
      <Input
        name="name"
        placeholder="Имя"
        onChange={handleChange}
        value={values.name}
        icon="EditIcon"
        disabled={isDisabled}
        onIconClick={e => {
          setIsDisabled(!isDisabled);
        }}
      />
      <EmailInput
        name="email"
        placeholder="Логин"
        onChange={handleChange}
        value={values.email}
        isIcon={true}
      />
      <PasswordInput
        name="password"
        placeholder="Пароль"
        onChange={handleChange}
        value={values.password}
        icon="EditIcon"
      />
      {isFormChanged && (
        <div className={styles.button_container}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={onCancel}>
            Отменить
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export default ProfileInfo;
