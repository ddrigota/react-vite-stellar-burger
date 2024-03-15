import { useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientsGroup from "../ingredients-group/ingredients-group";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { setCurrentTab } from "../../services/ingredients/ingredientsSlice";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();
  const currentTab = useAppSelector(state => state.burgerIngredients.tab);
  const ingredients = useAppSelector(state => state.burgerIngredients.ingredients);

  const buns = ingredients.filter(item => item.type === "bun");
  const sauces = ingredients.filter(item => item.type === "sauce");
  const mains = ingredients.filter(item => item.type === "main");

  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);

  // слушаем скролл и меняем таб в зависимости от того, какая группа ингредиентов находится в зоне видимости
  useEffect(() => {
    const bunsNode = bunsRef.current;
    const saucesNode = saucesRef.current;
    const mainsNode = mainsRef.current;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // без проверки на document.readyState === "complete" при первой загрузке страницы таб переключается на "Начинки"
          if (entry.isIntersecting && document.readyState === "complete") {
            dispatch(setCurrentTab(entry.target.id));
          }
        });
      },
      { threshold: 0.5 }
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
          id="buns"
          ref={bunsRef}
        />
        <IngredientsGroup
          title="Соусы"
          ingredients={sauces}
          id="sauces"
          ref={saucesRef}
        />
        <IngredientsGroup
          title="Начинки"
          ingredients={mains}
          id="main"
          ref={mainsRef}
        />
      </div>
    </div>
  );
};

export default BurgerIngredients;
