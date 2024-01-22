import styles from "./ingredient-details.module.css";
import { IngredientType } from "../../utils/types";

interface Props {
  ingredient: IngredientType;
}

const IngredientDetails = ({ ingredient }: Props) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
      <h3 className={`${styles.heading} text text_type_main-medium`}>{ingredient.name}</h3>
      <div className={styles.nutrition}>
        <div className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </div>
        <div className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </div>
        <div className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </div>
        <div className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
