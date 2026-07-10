import styles from "./ProductCard.module.css";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className={styles.badge}>
        {product.badge}
      </div>

      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.rating}>
          <FaStar />
          <span>{product.rating}</span>
        </div>

        <h3>{product.name}</h3>

        <p className={styles.category}>
          Premium Sports Nutrition
        </p>

        <div className={styles.bottom}>
          <div>
            <span className={styles.price}>
              ₹{product.price}
            </span>

            <span className={styles.oldPrice}>
              ₹{Math.round(product.price * 1.25)}
            </span>
          </div>

          <button>
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;