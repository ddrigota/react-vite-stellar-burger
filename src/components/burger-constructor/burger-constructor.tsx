import { useDispatch, useSelector } from "react-redux";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { postOrder, removeIngredient } from "../../services/constructorSlice";
import { RootState } from "../../services/store";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const ingredients = useSelector((state: RootState) => state.burgerConstructor.ingredients || []);
  const bun = useSelector((state: RootState) => state.burgerConstructor.bun);
  const totalPrice = useSelector((state: RootState) => state.burgerConstructor.bunPrice + state.burgerConstructor.ingredientsPrice);
  const dispatch = useDispatch();

  const handleOrderButtonClick = () => {
    dispatch(postOrder());
  };

  return (
    <div className={styles.container}>
      <div className={styles.burger_container}>
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
          {ingredients.map((ingredient, index) => {
            return (
              <li
                className={`${styles.сonstructor_item}`}
                key={`${ingredient._id}-${index}`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  handleClose={() => dispatch(removeIngredient(ingredient._id))}
                />
              </li>
            );
          })}
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
