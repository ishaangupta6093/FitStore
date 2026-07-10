import Hero from "../components/Hero/Hero";
import ProductCard from "../components/ProductCard/ProductCard";
import Categories from "../components/Categories/Categories";

import products from "../data/products";

import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <Hero />

      <section className={styles.section}>
        <h2 className={styles.heading}>
          Featured Products
        </h2>

        <p className={styles.subHeading}>
          Premium supplements trusted by thousands of athletes.
        </p>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <Categories />
    </>
  );
}

export default Home;