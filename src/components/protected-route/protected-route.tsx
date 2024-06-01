import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../utils/hooks";
import { SpinnerCircular } from "spinners-react";
import { ReactNode } from "react";
import styles from "./protected-route.module.css";

interface ProtectedRouteProps {
  children: ReactNode;
  onlyUnAuth?: boolean;
}

function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const location = useLocation();

  const user = useAppSelector((state) => state.user.data);
  const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked);

  if (!isAuthChecked) {
    console.log("waiting for user");
    return (
      <div className={styles.spinner__container}>
        <SpinnerCircular color="white" />
      </div>
    );
  }

  if (onlyUnAuth && user) {
    console.log("navigate from login to home page");
    const from = location.state?.from || { pathname: "/" };
    const backgroundLocation =
      location.state?.from?.state?.backgroundLocation || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }

  if (!onlyUnAuth && !user) {
    console.log("navigate from home page to login");
    return <Navigate replace to={"/login"} state={{ from: location }} />;
  }

  console.log("render children");
  return <>{children}</>;
}

export default ProtectedRoute;
