import styles from "./ingredients-group.module.css";
import Ingredient from "../ingredient/ingredient";

interface Props {
  title: string;
}

const IngredientsGroup = ({ title }: Props) => {
  return (
    <div className={`${styles.ingredients__group}`}>
      <h2 className={`${styles.ingredients__group_heading} text text_type_main-medium`}>{title}</h2>
      <ul className={`${styles.ingredients__list}`}>
        <li className={`${styles.ingredients__list_item}`}>
          <Ingredient image="https://code.s3.yandex.net/react/code/sauce-02.png" price={20} name="Краторная булка" />
        </li>
        <li className={`${styles.ingredients__list_item}`}>
          <Ingredient image="https://code.s3.yandex.net/react/code/sauce-02.png" price={20} name="Краторная булка" />
        </li>
      </ul>
    </div>
  );
};

export default IngredientsGroup;
