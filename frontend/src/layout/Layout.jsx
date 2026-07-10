import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ScrollProgress from "../components/ScrollProgress/ScrollProgress";

import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <ScrollProgress />

      <Navbar />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;