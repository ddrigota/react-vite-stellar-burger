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

function App() {
  const orderDetails = useAppSelector(state => state.order);
  const location = useLocation();
  let navigate = useNavigate();
  let state = location.state as { backgroundLocation?: Location };
  const dispatch = useAppDispatch();

  const closeModal = () => {
    navigate(-1);
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
            path="*"
            element={<Error404 />}
          />
        </Route>
      </Routes>

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
