import { NavLink, Outlet } from "react-router-dom";
import styles from "./profile.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../services/user/userSlice";

function Profile() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={`${styles.navigation} text text_type_main-medium`}>
          <NavLink
            end
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.navlink} ` : styles.navlink
            }
            to="/profile"
          >
            Profile
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.navlink} ` : styles.navlink
            }
            to="/profile/orders"
          >
            Order history
          </NavLink>
          <button
            className={`${styles.button} text text_type_main-medium`}
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <p className={`${styles.text} text text_type_main-default`}>
          Here you can change your account info
        </p>
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
