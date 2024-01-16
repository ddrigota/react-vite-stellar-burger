import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";

interface Props {
  children: React.ReactNode;
  name: string;
}

const Modal = ({ children, name }: Props) => {
  return (
    <dialog className={styles.modal}>
      <h2 className={`${styles.modal_heading} text text_type_main-medium`}>{name}</h2>
      <button type="button" className={styles.close_button}>
        <CloseIcon type="primary" />
      </button>
      {children}
    </dialog>
  );
};

export default Modal;
