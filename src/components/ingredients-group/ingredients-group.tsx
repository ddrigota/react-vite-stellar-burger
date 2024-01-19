import styles from "./ingredients-group.module.css";
import Ingredient from "../ingredient/ingredient";
import { IngredientType } from "../../utils/types";
import PropTypes from "prop-types";

interface Props {
  title: string;
  ingredients: IngredientType[];
  openIngredientDetails: (ingredient: IngredientType | null) => void;
}

const IngredientsGroup = ({ title, ingredients, openIngredientDetails }: Props) => {
  return (
    <div className={`${styles.ingredients__group}`}>
      <h2 className={`${styles.ingredients__group_heading} text text_type_main-medium`}>{title}</h2>
      <ul className={`${styles.ingredients__list}`}>
        {ingredients.map(ingredient => (
          <li key={ingredient._id} className={`${styles.ingredients__list_item}`} onClick={() => openIngredientDetails(ingredient)}>
            <Ingredient image={ingredient.image} price={ingredient.price} name={ingredient.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

IngredientsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  openIngredientDetails: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ),
};

export default IngredientsGroup;
