import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaUserCircle, FaDumbbell, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  return (
    <motion.header
      className={styles.header}
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <FaDumbbell />
          <span>FitStore</span>
        </Link>

        <ul className={styles.menu}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Shop</Link></li>
          <li><Link to="/">Categories</Link></li>
          <li><Link to="/">About</Link></li>
          <li><Link to="/">Contact</Link></li>
        </ul>

        <div className={styles.right}>
          {user ? (
            <>
              <span style={{ color: "white", fontWeight: "500", marginRight: "10px" }}>
                Hi, {user.name.split(" ")[0]}
              </span>
              <button 
                onClick={logout} 
                className={styles.login} 
                style={{ background: "transparent", cursor: "pointer" }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.login}>
              Login
            </Link>
          )}

          <Link to="/cart" className={styles.icon}>
            <FaShoppingBag />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>

          {!user && (
            <Link to="/login" className={styles.icon}>
              <FaUserCircle />
            </Link>
          )}
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;