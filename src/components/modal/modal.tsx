import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

interface Props {
  children: React.ReactNode;
  name: string;
  closeModal: () => void;
}

const Modal = ({ children, name, closeModal }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  });

  return createPortal(
    <>
      <ModalOverlay onMouseDown={closeModal} />
      <div className={styles.modal}>
        <h2 className={`${styles.modal_heading} text text_type_main-medium`}>{name}</h2>
        <button type="button" className={styles.close_button} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
        <div className={styles.children_container}>{children}</div>
      </div>
    </>,
    document.querySelector("#modals") as HTMLElement
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
