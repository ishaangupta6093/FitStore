import Hero from "../components/Hero/Hero";
import ProductCard from "../components/ProductCard/ProductCard";
import Categories from "../components/Categories/Categories";

import productsData from "../data/products";
import { useState, useEffect } from "react";
import api from "../api/api";

import styles from "./Home.module.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/featured");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Failed to fetch products, falling back to local data", error);
        setProducts(productsData);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
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
          {loading ? (
            <div style={{ color: "white", textAlign: "center", gridColumn: "1 / -1" }}>Loading...</div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
              />
            ))
          )}
        </div>
      </section>

      <Categories />
    </>
  );
}

export default Home;