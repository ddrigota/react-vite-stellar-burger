import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

interface Props {
  onMouseDown: () => void;
}

const ModalOverlay = ({ onMouseDown }: Props) => {
  return <div className={styles.overlay} onMouseDown={onMouseDown}></div>;
};

ModalOverlay.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
};

export default ModalOverlay;
