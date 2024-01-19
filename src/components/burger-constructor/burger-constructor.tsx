import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { IngredientType } from "../../utils/types";
import PropTypes from "prop-types";

interface Props {
  openOrderDetails: () => void;
  ingredients: IngredientType[];
}

const BurgerConstructor = ({ openOrderDetails, ingredients }: Props) => {
  const mains = ingredients.filter(ingredient => ingredient.type === "main");

  return (
    <div className={styles.container}>
      <div className={styles.burger_container}>
        <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={20} thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"} />
        <ul className={`${styles.сonstructor_list}`}>
          {mains.map(ingredient => {
            return (
              <li className={`${styles.сonstructor_item}`} key={ingredient._id}>
                <DragIcon type="primary" />
                <ConstructorElement isLocked={false} text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} />
              </li>
            );
          })}
        </ul>
        <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={20} thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"} />
      </div>
      <div className={styles.price_container}>
        <div className={styles.total_price}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" htmlType="button" id="order_button" onClick={openOrderDetails}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  openOrderDetails: PropTypes.func.isRequired,
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
export default BurgerConstructor;
