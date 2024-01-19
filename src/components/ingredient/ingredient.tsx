import { useState } from "react";
import styles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

interface Props {
  image: string;
  price: number;
  name: string;
}

const Ingredient = ({ image, price, name }: Props) => {
  const [count, setCount] = useState(0);

  return (
    <article className={styles.card}>
      <img className={styles.card__image} src={image} alt={name} />
      <div className={styles.price_container}>
        <p className={`${styles.price} text text_type_digits-default`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      {count > 0 && <Counter size="default" count={count} />}
    </article>
  );
};

Ingredient.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Ingredient;
