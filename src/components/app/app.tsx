import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { clearConstructor } from "../../services/constructorSlice";
import { clearIngredientDetails } from "../../services/ingredientDetailsSlice";
import { closeOrderModal } from "../../services/orderSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./app.module.css";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

function App() {
  const dispatch = useAppDispatch();
  const ingredientDetails = useAppSelector(state => state.ingredientDetails);
  const orderDetails = useAppSelector(state => state.order);

  const closeModal = () => {
    if (ingredientDetails.isOpen) {
      dispatch(clearIngredientDetails());
    } else if (orderDetails.modalIsOpen) {
      dispatch(closeOrderModal());
      dispatch(clearConstructor());
    } else {
      console.error("Что-то пошло не так");
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
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

      {orderDetails.modalIsOpen && (
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
