import { Link } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list_left}>
          <li className={styles.list__item}>
            <Link
              className={styles.link}
              to="/">
              <BurgerIcon type="primary" />
              <span
                className={`${styles.link__text} text text_type_main-default`}>
                Конструктор
              </span>
            </Link>
          </li>
          <li className={styles.list__item}>
            <Link
              className={styles.link}
              to="/orders">
              <ListIcon type="secondary" />
              <span
                className={`${styles.link__text} text text_type_main-default`}>
                Лента заказов
              </span>
            </Link>
          </li>
        </ul>
        <Logo />
        <ul className={styles.list_right}>
          <li className={styles.list__item}>
            <Link
              className={styles.link}
              to="/profile">
              <ProfileIcon type="secondary" />
              <span
                className={`${styles.link__text} text text_type_main-default`}>
                Личный кабинет
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
