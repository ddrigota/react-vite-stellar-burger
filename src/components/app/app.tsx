import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { clearIngredientDetails } from "../../services/ingredientDetailsSlice";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./app.module.css";
import { closeOrderModal } from "../../services/orderSlice";
import { clearConstructor } from "../../services/constructorSlice";
import { DndProvider } from "react-dnd";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Routes, useLocation, useNavigate } from "react-router";

function App() {
  const dispatch = useAppDispatch();
  const ingredientDetails = useAppSelector(state => state.ingredientDetails);
  const orderDetails = useAppSelector(state => state.order);
  const location = useLocation();
  let navigate = useNavigate();
  let state = location.state as { backgroundLocation?: Location };

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
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
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                closeModal={closeModal}
                name="Детали Ингридиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
