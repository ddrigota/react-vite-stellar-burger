import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-info.module.css";
import { useAppDispatch, useAppSelector, useForm } from "../utils/hooks";
import { checkUserAuth, updateUserInfo } from "../services/user/userSlice";
import { useState } from "react";
import { UserRegisterType } from "../utils/types";

function ProfileInfo() {
  const userData = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const { values, handleChange, isFormChanged, resetForm, setIsFormChanged } =
    useForm({
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
    dispatch(updateUserInfo(values as UserRegisterType));
    dispatch(checkUserAuth());
    setIsDisabled(true);
    setIsFormChanged(false);
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={values.name}
        icon="EditIcon"
        disabled={isDisabled}
        onIconClick={(e) => {
          setIsDisabled(!isDisabled);
        }}
      />
      <EmailInput
        name="email"
        placeholder="E-mail"
        onChange={handleChange}
        value={values.email}
        isIcon={true}
      />
      <PasswordInput
        name="password"
        placeholder="Password"
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
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Save
          </Button>
        </div>
      )}
    </form>
  );
}

export default ProfileInfo;
