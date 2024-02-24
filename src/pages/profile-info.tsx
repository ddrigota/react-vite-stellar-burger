import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-info.module.css";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { checkUserAuth, updateUserInfo } from "../services/userSlice";

function ProfileInfo() {
  const userData = useAppSelector(state => state.user.data);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  // помогите тут правильно типизировать userData на случай если он null
  // по идее, у пользователя никогда не будет доступа к этой странице, если юзера не существует в сторе
  const [formData, setFormData] = useState({
    // @ts-ignore
    name: userData?.name || "",
    // @ts-ignore
    email: userData?.email || "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setIsFormChanged(true);
  };

  const onCancel = () => {
    setFormData({
      // @ts-ignore
      name: userData?.name || "",
      // @ts-ignore
      email: userData?.email || "",
      password: "",
    });
    setIsDisabled(true);
    setIsFormChanged(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserInfo(formData));
    dispatch(checkUserAuth());
    if (formRef.current) {
      formRef.current.reset();
    }
    setIsFormChanged(false);
    setIsDisabled(true);
  };

  return (
    <form
      ref={formRef}
      className={styles.container}
      onSubmit={onSubmit}>
      <Input
        name="name"
        placeholder="Имя"
        onChange={handleChange}
        value={formData.name}
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
        value={formData.email}
        isIcon={true}
      />
      <PasswordInput
        name="password"
        placeholder="Пароль"
        onChange={handleChange}
        value={formData.password}
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
