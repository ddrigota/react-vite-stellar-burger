import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import { IngredientType } from "../../utils/types";

interface Props {
  ingredients: IngredientType[];
  openIngredientDetails: (ingredient: IngredientType | null) => void;
}

const BurgerIngredients = ({ ingredients, openIngredientDetails }: Props) => {
  const [currentTab, setCurrentTab] = useState("buns");

  const buns = ingredients.filter(item => item.type === "bun");
  const sauces = ingredients.filter(item => item.type === "sauce");
  const mains = ingredients.filter(item => item.type === "main");

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
        <IngredientsGroup title="Булки" ingredients={buns} openIngredientDetails={openIngredientDetails} />
        <IngredientsGroup title="Соусы" ingredients={sauces} openIngredientDetails={openIngredientDetails} />
        <IngredientsGroup title="Начинки" ingredients={mains} openIngredientDetails={openIngredientDetails} />
      </div>
    </div>
  );
};

export default BurgerIngredients;
