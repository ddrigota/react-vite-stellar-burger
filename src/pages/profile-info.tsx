import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-info.module.css";
import { useState } from "react";

function ProfileInfo() {
  const [name, setName] = useState("Вася");
  const [email, setEmail] = useState("vasya@vasaya.ru");
  const [password, setPassword] = useState("1234567");
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <div className={styles.container}>
      <Input
        placeholder="Имя"
        onChange={e => setName(e.target.value)}
        value={name}
        icon="EditIcon"
        disabled={isDisabled}
        onIconClick={e => {
          setIsDisabled(!isDisabled);
        }}
      />
      <EmailInput
        placeholder="Логин"
        onChange={e => setEmail(e.target.value)}
        value={email}
        isIcon={true}
      />
      <PasswordInput
        placeholder="Пароль"
        onChange={e => setPassword(e.target.value)}
        value={password}
        icon="EditIcon"
      />
    </div>
  );
}

export default ProfileInfo;
