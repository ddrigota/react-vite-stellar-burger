import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router";
import { SpinnerRoundFilled } from "spinners-react";
import { addIngredient, setBun } from "../../services/constructor/constructorSlice";
import { postOrder } from "../../services/order/orderSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { IngredientType } from "../../utils/types";
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const ingredients = useAppSelector(state => state.burgerConstructor.ingredients || []);
  const bun = useAppSelector(state => state.burgerConstructor.bun);
  const isLoading = useAppSelector(state => state.order.isLoading);
  const totalPrice = useAppSelector(
    state => state.burgerConstructor.bunPrice + state.burgerConstructor.ingredientsPrice
  );
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.user.data);
  const navigate = useNavigate();

  const handleOrderButtonClick = () => {
    isLoggedIn ? dispatch(postOrder()) : navigate("/login");
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
      ref={dropTarget}
      data-cy="constructor">
      <div
        className={styles.burger_container}
        style={{ outline: isHover ? "4px dashed #4C4CFF" : "none" }}>
        {bun && (
          <div data-cy="bun-top">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.translatedName} `}
              price={bun.price || 0}
              thumbnail={bun.image}
              extraClass={styles.bun}
            />
          </div>
        )}
        <ul
          className={`${styles.сonstructor_list}`}
          data-cy="constructor-ingredients">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <IngredientItem
                key={ingredient.id}
                ingredient={ingredient}
                index={index}
              />
            ))
          ) : (
            <p className={`${styles.text_no_ingredients} text text_type_main-default text_color_inactive`}>
              Drag ingredients here
            </p>
          )}
        </ul>
        {bun && (
          <div data-cy="bun-bottom">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.translatedName} `}
              price={bun.price || 0}
              thumbnail={bun.image}
              extraClass={styles.bun}
              data-cy="bun-bottom"
            />
          </div>
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
          data-cy="order-button"
          extraClass={styles.order_button}
          onClick={handleOrderButtonClick}
          disabled={ingredients.length === 0 || !bun || bun._id === ""}>
          {isLoading ? (
            <SpinnerRoundFilled
              size={20}
              thickness={200}
              color="#fff"
            />
          ) : (
            "Order"
          )}
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
