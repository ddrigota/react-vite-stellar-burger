import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={`${styles.list} ${styles.list_left}`}>
          <li className={styles.list__item}>
            <a className={styles.link} href="/">
              <BurgerIcon type="primary" />
              <span className={`${styles.link__text} text text_type_main-default`}>Конструктор</span>
            </a>
          </li>
          <li className={styles.list__item}>
            <a className={styles.link} href="/">
              <ListIcon type="secondary" />
              <span className={`${styles.link__text} text text_type_main-default`}>Лента заказов</span>
            </a>
          </li>
        </ul>
        <Logo />
        <ul className={`${styles.list} ${styles.list_right}`}>
          <li className={styles.list__item}>
            <a className={styles.link} href="/">
              <ProfileIcon type="secondary" />
              <span className={`${styles.link__text} text text_type_main-default`}>Личный кабинет</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
