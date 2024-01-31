import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

interface Props {
  openOrderDetails: () => void;
}

const BurgerConstructor = ({ openOrderDetails }: Props) => {
  const ingredients = useSelector((state: RootState) => state.burgerIngredients.ingredients);
  const mains = ingredients.filter(ingredient => ingredient.type === "main");

  return (
    <div className={styles.container}>
      <div className={styles.burger_container}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={20}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <ul className={`${styles.сonstructor_list}`}>
          {mains.map(ingredient => {
            return (
              <li
                className={`${styles.сonstructor_item}`}
                key={ingredient._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            );
          })}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={20}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
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
