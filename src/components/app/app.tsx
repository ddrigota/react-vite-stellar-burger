import styles from "./app.module.css";
import { useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import { IngredientType } from "../../utils/types";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { clearIngredientDetails, setIngredientDetails } from "../../services/ingredientDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";

function App() {
  const [orderDetails, setOrderDetails] = useState({ isOpen: false });
  const dispatch = useDispatch();
  const ingredientDetails = useSelector((state: RootState) => state.ingredientDetails);

  const openOrderDetails = () => {
    setOrderDetails({ isOpen: true });
  };

  const openIngredientDetails = (ingredient: IngredientType | null) => {
    dispatch(setIngredientDetails(ingredient));
  };

  const closeModal = () => {
    setOrderDetails({ isOpen: false });
    dispatch(clearIngredientDetails());
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <BurgerIngredients openIngredientDetails={openIngredientDetails} />
        </section>
        <section className={styles.section}>
          <BurgerConstructor openOrderDetails={openOrderDetails} />
        </section>
      </main>

      {orderDetails.isOpen && (
        <Modal
          closeModal={closeModal}
          name="">
          <OrderDetails />
        </Modal>
      )}

      {ingredientDetails.isOpen && ingredientDetails.ingredient && (
        <Modal
          closeModal={closeModal}
          name="Детали Ингридиента">
          <IngredientDetails ingredient={ingredientDetails.ingredient} />
        </Modal>
      )}
    </div>
  );
}

export default App;
