import styles from "./app.module.css";
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const dataUrl = "https://norma.nomoreparties.space/api/ingredients";

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(dataUrl);
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        const data = await res.json();
        setData(data);
        console.log(data);
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
    </div>
  );
}

export default App;
