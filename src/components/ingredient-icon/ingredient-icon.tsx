import { IngredientType } from "../../utils/types";
import styles from "./ingredient-icon.module.css";

interface IIngredientIcon {
  ingredient: IngredientType;
  counter?: number;
}

function IngredientIcon({ ingredient, counter }: IIngredientIcon) {
  return (
    <div className={styles.icon__container}>
      <img
        className={styles.icon}
        src={ingredient.image}
        alt={ingredient.name}
      />
      {counter ? <p className={`${styles.counter} text text_type_main-default`}>{`+${counter}`}</p> : null}
    </div>
  );
}

export default IngredientIcon;
