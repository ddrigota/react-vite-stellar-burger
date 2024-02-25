import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import styles from "./home-page.module.css";

function HomePage() {
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.section}>
          <BurgerIngredients />
        </section>
        <section className={styles.section}>
          <BurgerConstructor />
        </section>
      </DndProvider>
    </main>
  );
}

export default HomePage;
