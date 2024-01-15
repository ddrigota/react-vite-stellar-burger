import { useState } from "react";
import styles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface Props {
  image: string;
  price: number;
  name: string;
}

const Ingredient = ({ image, price, name }: Props) => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <article className={styles.card} onClick={handleClick}>
      <img className={styles.card__image} src={image} alt={name} />
      <div className={styles.price_container}>
        <p className={`${styles.price} text text_type_digits-default`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      <Counter size="default" count={clickCount} />
    </article>
  );
};

export default Ingredient;
