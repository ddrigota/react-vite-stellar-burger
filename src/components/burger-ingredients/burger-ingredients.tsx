import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsGroup from "../ingredients-group/ingredients-group";

interface Ingredient {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  __v: number;
}

interface Props {
  data: Ingredient[];
}

const BurgerIngredients = ({ data }: Props) => {
  const [currentTab, setCurrentTab] = useState("buns");

  const buns = data.filter(item => item.type === "bun");
  const sauces = data.filter(item => item.type === "sauce");
  const mains = data.filter(item => item.type === "main");

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} text text_type_main-large`}>Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="buns" active={currentTab === "buns"} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === "sauces"} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === "main"} onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients__container}`}>
        <IngredientsGroup title="Булки" ingredients={buns} />
        <IngredientsGroup title="Соусы" ingredients={sauces} />
        <IngredientsGroup title="Начинки" ingredients={mains} />
      </div>
    </div>
  );
};

export default BurgerIngredients;
