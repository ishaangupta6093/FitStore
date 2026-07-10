import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./ScrollProgress.module.css";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={styles.progress}
      style={{ scaleX }}
    />
  );
}

export default ScrollProgress;