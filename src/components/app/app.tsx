import { useEffect } from "react";
import {
  Error404,
  ForgotPassword,
  HomePage,
  Login,
  Orders,
  Profile,
  ProfileInfo,
  Register,
  ResetPassword,
} from "../../pages";
import Layout from "../../pages/layout";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./app.module.css";

import { Route, Routes, useLocation, useNavigate } from "react-router";
import { fetchIngredients } from "../../services/ingredientsSlice";
import ProtectedRoute from "../protected-route/protected-route";
import { checkUserAuth, loginUser, registerUser } from "../../services/userSlice";
import { closeOrderModal } from "../../services/orderSlice";
import { clearConstructor } from "../../services/constructorSlice";
import Feed from "../../pages/feed";
import OrderInfo from "../../pages/order-info";

function App() {
  const orderDetails = useAppSelector(state => state.order);
  const location = useLocation();
  let navigate = useNavigate();
  let state = location.state as { backgroundLocation?: Location };
  const dispatch = useAppDispatch();

  const closeModal = () => {
    navigate(-1);
  };

  // по заданию не понятно, что делать с окном заказа, пока оставлю как есть
  const closeOrderDetails = () => {
    if (orderDetails.modalIsOpen) {
      dispatch(closeOrderModal());
      dispatch(clearConstructor());
    } else {
      console.error("Что-то пошло не так");
    }
  };
  const onLogin = (dataUser: { email: string; password: string }) => {
    dispatch(loginUser(dataUser));
  };

  const onRegister = (dataUser: { name: string; email: string; password: string }) => {
    dispatch(registerUser(dataUser));
  };

  // получаем ингредиенты
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  // проверяем авторизацию
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Routes location={state?.backgroundLocation || location}>
        <Route
          path="/"
          element={<Layout />}>
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="login"
            element={
              <ProtectedRoute onlyUnAuth>
                <Login onLogin={onLogin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute onlyUnAuth>
                <Register onRegister={onRegister} />
              </ProtectedRoute>
            }
          />
          <Route
            path="forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="reset-password"
            element={<ResetPassword />}
          />
          <Route
            path="ingredients/:id"
            element={<IngredientDetails />}
          />
          <Route
            path="feed"
            element={<Feed />}
          />
          <Route
            path="feed/:id"
            element={<OrderInfo />}
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }>
            <Route
              index
              element={<ProfileInfo />}
            />
            <Route
              path="orders"
              element={<Orders />}
            />
          </Route>
          <Route
            path="profile/orders/:id"
            element={<OrderInfo />}
          />
          <Route
            path="*"
            element={<Error404 />}
          />
        </Route>
      </Routes>

      {orderDetails.modalIsOpen && (
        <Modal
          closeModal={closeOrderDetails}
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
          <Route
            path="/feed/:id"
            element={
              <Modal
                closeModal={closeModal}
                name="Детали Заказа">
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal
                closeModal={closeModal}
                name="Детали Заказа">
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
