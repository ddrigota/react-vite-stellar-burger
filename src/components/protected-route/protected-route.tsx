import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../utils/hooks";
import { SpinnerCircular } from "spinners-react";

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
}

function ProtectedRoute({ onlyUnAuth }: ProtectedRouteProps) {
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

  return <Outlet />;
}

export default ProtectedRoute;
