import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { clearIngredientDetails } from "../../services/ingredientDetailsSlice";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./app.module.css";
import { closeOrderModal } from "../../services/orderSlice";
import { clearConstructor } from "../../services/constructorSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Error404,
  ForgotPassword,
  Home,
  Login,
  Orders,
  Profile,
  ProfileInfo,
  Register,
  ResetPassword,
} from "../../pages/";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error404 /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      { path: "/profile", element: <ProfileInfo />, index: true },
      { path: "/profile/orders", element: <Orders /> },
    ],
  },
]);

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

      <RouterProvider router={router} />

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
