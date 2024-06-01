import { useParams } from "react-router";
import { useAppSelector } from "../../utils/hooks";
import styles from "./ingredient-details.module.css";

const IngredientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useAppSelector(state => state.burgerIngredients.ingredients);
  const ingredient = ingredients.find(item => item._id === id);
  if (!ingredient) {
    console.error("Ingredient not found");
    return null;
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={ingredient.translatedName}
      />
      <h3 className={`${styles.heading} text text_type_main-medium`}>{ingredient.translatedName}</h3>
      <div className={styles.nutrition}>
        <div className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Calories</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </div>
        <div className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Proteins</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </div>
        <div className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Fats</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </div>
        <div className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Carbs</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
