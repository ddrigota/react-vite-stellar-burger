import styles from "./modal-overlay.module.css";

interface Props {
  onMouseDown: () => void;
}

const ModalOverlay = ({ onMouseDown }: Props) => {
  return <div className={styles.overlay} onMouseDown={onMouseDown}></div>;
};

export default ModalOverlay;
