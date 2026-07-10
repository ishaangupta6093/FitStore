import styles from "./Footer.module.css";
import { FaInstagram, FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2>FitStore</h2>
          <p>
            Premium fitness supplements and gym essentials designed for people
            who take their training seriously.
          </p>
        </div>

        <div className={styles.links}>
          <h3>Shop</h3>

          <a href="#">Protein</a>
          <a href="#">Creatine</a>
          <a href="#">Accessories</a>
          <a href="#">New Arrivals</a>
        </div>

        <div className={styles.links}>
          <h3>Company</h3>

          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>

        <div className={styles.social}>
          <h3>Follow Us</h3>

          <div className={styles.icons}>
            <FaInstagram />
            <FaFacebookF />
            <FaXTwitter />
            <FaYoutube />
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} FitStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;