import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list_left}>
          <li className={styles.list__item}>
            <NavLink
              className={({ isActive }) => (isActive ? `${styles.link_active} ${styles.link}` : styles.link)}
              to="/">
              <BurgerIcon type="primary" />
              <span className={`${styles.link__text} text text_type_main-default`}>Конструктор</span>
            </NavLink>
          </li>
          <li className={styles.list__item}>
            <NavLink
              className={({ isActive }) => (isActive ? `${styles.link_active} ${styles.link}` : styles.link)}
              to="/feed">
              <ListIcon type="secondary" />
              <span className={`${styles.link__text} text text_type_main-default`}>Лента заказов</span>
            </NavLink>
          </li>
        </ul>
        <Link to="/">
          <Logo />
        </Link>
        <ul className={styles.list_right}>
          <li className={styles.list__item}>
            <NavLink
              className={({ isActive }) => (isActive ? `${styles.link_active} ${styles.link}` : styles.link)}
              to="/profile">
              <ProfileIcon type="secondary" />
              <span className={`${styles.link__text} text text_type_main-default`}>Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
