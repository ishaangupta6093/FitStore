import styles from "./Hero.module.css";
import { motion } from "framer-motion";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import heroImage from "../../assets/images/hero.avif";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.badge}>PREMIUM FITNESS NUTRITION</span>

          <h1>
            Fuel Your
            <span> Strongest </span>
            Version.
          </h1>

          <p>
            Discover world-class supplements, gym accessories, and nutrition
            trusted by athletes to push beyond every limit.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primary}>
              Shop Now
              <FaArrowRight />
            </button>

            <button className={styles.secondary}>
              <FaPlay />
              Explore
            </button>
          </div>

          <div className={styles.stats}>
            <div>
              <h2>50K+</h2>
              <span>Happy Customers</span>
            </div>

            <div>
              <h2>500+</h2>
              <span>Premium Products</span>
            </div>

            <div>
              <h2>4.9★</h2>
              <span>Customer Rating</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.glow}></div>

          <motion.img
            src={heroImage}
            alt="FitStore Hero"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          <div className={styles.cardTop}>
            <h3>#1 Choice</h3>
            <p>Athlete Recommended</p>
          </div>

          <div className={styles.cardBottom}>
            <h3>100% Authentic</h3>
            <p>Guaranteed Products</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;