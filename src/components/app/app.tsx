import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { clearIngredientDetails } from "../../services/ingredientDetailsSlice";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./app.module.css";
import { closeOrderModal } from "../../services/constructorSlice";

function App() {
  const dispatch = useDispatch();
  const ingredientDetails = useSelector((state: RootState) => state.ingredientDetails);
  const constructorDetails = useSelector((state: RootState) => state.burgerConstructor);

  const closeModal = () => {
    dispatch(clearIngredientDetails());
    dispatch(closeOrderModal());
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <BurgerIngredients />
        </section>
        <section className={styles.section}>
          <BurgerConstructor />
        </section>
      </main>

      {constructorDetails.modalIsOpen && (
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
