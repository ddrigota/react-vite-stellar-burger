import { useDispatch, useSelector } from "react-redux";
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { addIngredient, setBun } from "../../services/constructorSlice";
import { postOrder } from "../../services/orderSlice";
import { RootState } from "../../services/store";
import styles from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import { IngredientType } from "../../utils/types";
import IngredientItem from "../ingredient-item/ingredient-item";

const BurgerConstructor = () => {
  const ingredients = useSelector((state: RootState) => state.burgerConstructor.ingredients || []);
  const bun = useSelector((state: RootState) => state.burgerConstructor.bun);
  const totalPrice = useSelector((state: RootState) => state.burgerConstructor.bunPrice + state.burgerConstructor.ingredientsPrice);
  const dispatch = useDispatch();

  const handleOrderButtonClick = () => {
    dispatch(postOrder());
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: IngredientType) {
      if (ingredient.type === "bun") {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    },
    collect: monitor => ({
      isHover: !!monitor.isOver(),
    }),
  });

  return (
    <div
      className={styles.container}
      ref={dropTarget}>
      <div
        className={styles.burger_container}
        style={{ outline: isHover ? "4px dashed #4C4CFF" : "none" }}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price || 0}
            thumbnail={bun.image}
          />
        )}
        <ul className={`${styles.сonstructor_list}`}>
          {ingredients.map((ingredient, index) => (
            <IngredientItem
              key={ingredient.id}
              ingredient={ingredient}
              index={index}
            />
          ))}
        </ul>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price || 0}
            thumbnail={bun.image}
          />
        )}
      </div>
      <div className={styles.price_container}>
        <div className={styles.total_price}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          htmlType="button"
          id="order_button"
          onClick={handleOrderButtonClick}
          disabled={ingredients.length === 0 || !bun || bun._id === ""}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
