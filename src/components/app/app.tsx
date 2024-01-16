import styles from "./app.module.css";
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";

function App() {
  const dataUrl = "https://norma.nomoreparties.space/api/ingredients";

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(dataUrl);
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        const result = await res.json();
        setData(result.data);
        // console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <BurgerIngredients data={data} />
        </section>
        <section className={styles.section}>
          <BurgerConstructor />
        </section>
      </main>
      <Modal name="Вася">ghbdtn</Modal>
    </div>
  );
}

export default App;
