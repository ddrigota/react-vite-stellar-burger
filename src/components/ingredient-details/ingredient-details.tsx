import styles from "./ingredient-details.module.css";
import { useParams } from "react-router";
import { useAppSelector } from "../../utils/hooks";

const IngredientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useAppSelector(state => state.burgerIngredients.ingredients);
  const ingredient = ingredients.find(item => item._id === id);
  if (!ingredient) {
    console.error("Ингредиент не найден");
    return null;
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
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
