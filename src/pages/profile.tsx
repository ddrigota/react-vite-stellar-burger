import { NavLink, Outlet } from "react-router-dom";
import styles from "./profile.module.css";

function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={`${styles.navigation} text text_type_main-medium`}>
          <NavLink
            end
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.navlink} ` : styles.navlink
            }
            to="/profile">
            Профиль
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.navlink} ` : styles.navlink
            }
            to="/profile/orders">
            История заказов
          </NavLink>
          <button
            className={`${styles.button} text text_type_main-medium`}
            type="button"
            onClick={() => {
              console.log("clicked");
            }}>
            Выход
          </button>
        </div>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive `}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
