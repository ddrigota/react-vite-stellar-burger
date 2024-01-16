import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  return (
    <div className={styles.container}>
      <div className={styles.burger_container}>
        <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={20} thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"} />
        <ul className={`${styles.сonstructor_list}`}>
          <li className={`${styles.сonstructor_item}`}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={false} text="Говяжий метеорит (отбивная)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"} />
          </li>
          <li className={`${styles.сonstructor_item}`}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={false} text="Говяжий метеорит (отбивная)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"} />
          </li>
          <li className={`${styles.сonstructor_item}`}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={false} text="Говяжий метеорит (отбивная)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"} />
          </li>
          <li className={`${styles.сonstructor_item}`}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={false} text="Говяжий метеорит (отбивная)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"} />
          </li>
          <li className={`${styles.сonstructor_item}`}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={false} text="Говяжий метеорит (отбивная)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"} />
          </li>
          <li className={`${styles.сonstructor_item}`}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={false} text="Говяжий метеорит (отбивная)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"} />
          </li>
          <li className={`${styles.сonstructor_item}`}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={false} text="Говяжий метеорит (отбивная)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"} />
          </li>
          <li className={`${styles.сonstructor_item}`}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={false} text="Говяжий метеорит (отбивная)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"} />
          </li>
          <li className={`${styles.сonstructor_item}`}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={false} text="Говяжий метеорит (отбивная)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"} />
          </li>
          <li className={`${styles.сonstructor_item}`}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={false} text="Говяжий метеорит (отбивная)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"} />
          </li>
        </ul>
        <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={20} thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"} />
      </div>
      <div className={styles.price_container}>
        <div className={styles.total_price}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" htmlType="button" id="order_button">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
