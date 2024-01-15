import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsGroup from "../ingredients-group/ingredients-group";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("buns");

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
        <IngredientsGroup title="Булки" />
        {/* <IngredientsGroup title="Соусы" />
        <IngredientsGroup title="Начинки" /> */}
      </div>
    </div>
  );
};

export default BurgerIngredients;
