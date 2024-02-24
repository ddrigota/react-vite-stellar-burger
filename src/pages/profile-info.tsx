import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-info.module.css";
import { useState } from "react";
import { useAppSelector } from "../utils/hooks";

function ProfileInfo() {
  const userData = useAppSelector(state => state.user.data);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <div className={styles.container}>
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
    </div>
  );
}

export default ProfileInfo;
