import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../utils/hooks";
import { SpinnerCircular } from "spinners-react";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  onlyUnAuth?: boolean;
}

function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useAppSelector(state => state.user);
  const isAuthChecked = useAppSelector(state => state.user.isAuthChecked);

  if (!isAuthChecked) {
    return <SpinnerCircular />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: "/" };
    const backgroundLocation = location.state?.from?.state || null;
    return (
      <Navigate
        replace
        to={from}
        state={{ backgroundLocation }}
      />
    );
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to={"/login"}
        state={{ from: location }}
      />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
