import styles from "./app.module.css";
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import { IngredientType } from "../../utils/types";
import OrderDetails from "../order-details/order-details";

interface IngredientDetails {
  isOpen: boolean;
  ingredient: IngredientType | null;
}

function App() {
  const dataUrl = "https://norma.nomoreparties.space/api/ingredients";
  const [data, setData] = useState([]);
  const [orderDetails, setOrderDetails] = useState({ isOpen: false });
  const [ingredientDetails, setIngredientDetails] = useState<IngredientDetails>({ isOpen: false, ingredient: null });

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

  const openOrderDetails = () => {
    setOrderDetails({ isOpen: true });
  };

  const openIngredientDetails = (ingredient: IngredientType | null) => {
    setIngredientDetails({ isOpen: true, ingredient });
  };

  const closeModal = () => {
    setOrderDetails({ isOpen: false });
    setIngredientDetails({ isOpen: false, ingredient: null });
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <BurgerIngredients data={data} />
        </section>
        <section className={styles.section}>
          <BurgerConstructor openOrderDetails={openOrderDetails} />
        </section>
      </main>

      {orderDetails.isOpen && (
        <Modal closeModal={closeModal} name="">
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
