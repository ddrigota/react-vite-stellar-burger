import { useEffect, useRef, useState } from "react";
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

  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bunsNode = bunsRef.current;
    const saucesNode = saucesRef.current;
    const mainsNode = mainsRef.current;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setCurrentTab(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    bunsNode && observer.observe(bunsNode);
    saucesNode && observer.observe(saucesNode);
    mainsNode && observer.observe(mainsNode);

    return () => {
      bunsNode && observer.unobserve(bunsNode);
      saucesNode && observer.unobserve(saucesNode);
      mainsNode && observer.unobserve(mainsNode);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} text text_type_main-large`}>Соберите бургер</h1>
      <div className={styles.tab__container}>
        <Tab
          value="buns"
          active={currentTab === "buns"}
          onClick={() => {
            setCurrentTab("buns");
            bunsRef.current?.scrollIntoView({ behavior: "smooth" });
          }}>
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={currentTab === "sauces"}
          onClick={() => {
            setCurrentTab("sauces");
            saucesRef.current?.scrollIntoView({ behavior: "smooth" });
          }}>
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={() => {
            setCurrentTab("main");
            mainsRef.current?.scrollIntoView({ behavior: "smooth" });
          }}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients__container}`}>
        <IngredientsGroup
          title="Булки"
          ingredients={buns}
          openIngredientDetails={openIngredientDetails}
          id="buns"
          ref={bunsRef}
        />
        <IngredientsGroup
          title="Соусы"
          ingredients={sauces}
          openIngredientDetails={openIngredientDetails}
          id="sauces"
          ref={saucesRef}
        />
        <IngredientsGroup
          title="Начинки"
          ingredients={mains}
          openIngredientDetails={openIngredientDetails}
          id="main"
          ref={mainsRef}
        />
      </div>
    </div>
  );
};

export default BurgerIngredients;
