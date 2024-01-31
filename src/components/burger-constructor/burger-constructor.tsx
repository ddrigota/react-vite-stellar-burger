import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { removeIngredient } from "../../services/constructorSlice";

interface Props {
  openOrderDetails: () => void;
}

const BurgerConstructor = ({ openOrderDetails }: Props) => {
  const ingredients = useSelector((state: RootState) => state.burgerConstructor.ingredients || []);
  const bun = useSelector((state: RootState) => state.burgerConstructor.bun);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.burger_container}>
        {bun && (
          <>
            <div className={styles.bun}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price || 0}
                thumbnail={bun.image}
              />
            </div>
          </>
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
          <>
            <div className={styles.bun}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price || 0}
                thumbnail={bun.image}
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.price_container}>
        <div className={styles.total_price}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          htmlType="button"
          id="order_button"
          onClick={openOrderDetails}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
