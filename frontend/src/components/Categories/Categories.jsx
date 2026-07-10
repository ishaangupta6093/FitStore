import styles from "./Categories.module.css";
import { motion } from "framer-motion";
import {
  FaDumbbell,
  FaBolt,
  FaBottleWater,
  FaFire,
} from "react-icons/fa6";

const categories = [
  {
    title: "Protein",
    icon: <FaBottleWater />,
    desc: "Build lean muscle with premium whey protein.",
  },
  {
    title: "Creatine",
    icon: <FaBolt />,
    desc: "Increase power and explosive performance.",
  },
  {
    title: "Pre Workout",
    icon: <FaFire />,
    desc: "Maximum energy before every workout.",
  },
  {
    title: "Accessories",
    icon: <FaDumbbell />,
    desc: "Shakers, gloves and gym essentials.",
  },
];

function Categories() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>Shop by Category</h2>
        <p>
          Everything you need to achieve your fitness goals.
        </p>

        <div className={styles.grid}>
          {categories.map((item) => (
            <motion.div
              key={item.title}
              className={styles.card}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
            >
              <div className={styles.icon}>
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <span>{item.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;