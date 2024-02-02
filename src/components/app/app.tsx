import { useDispatch, useSelector } from "react-redux";
import { IngredientType } from "../../utils/types";
import { RootState } from "../../services/store";
import { clearIngredientDetails, setIngredientDetails } from "../../services/ingredientDetailsSlice";
import { clearOrderDetails, setOrderDetails } from "../../services/orderDetailsSlice";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./app.module.css";

function App() {
  const dispatch = useDispatch();
  const ingredientDetails = useSelector((state: RootState) => state.ingredientDetails);
  const orderDetails = useSelector((state: RootState) => state.orderDetails);

  const openOrderDetails = () => {
    dispatch(setOrderDetails(100));
  };

  const openIngredientDetails = (ingredient: IngredientType | null) => {
    dispatch(setIngredientDetails(ingredient));
  };

  const closeModal = () => {
    dispatch(clearIngredientDetails());
    dispatch(clearOrderDetails());
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
