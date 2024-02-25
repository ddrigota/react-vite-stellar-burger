import AppHeader from "../components/app-header/app-header";
import { Outlet } from "react-router";
import styles from "./layout.module.css";

function Layout() {
  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
