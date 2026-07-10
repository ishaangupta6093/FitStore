import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import api from "../api/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data.cart);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      // In a real app, you might save to localStorage here
      alert("Please login to add to cart");
      return;
    }
    try {
      const res = await api.post("/cart", { productId, quantity });
      setCart(res.data.cart);
    } catch (error) {
      console.error("Failed to add to cart", error);
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await api.put(`/cart/${productId}`, { quantity });
      setCart(res.data.cart);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      setCart(res.data.cart);
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const clearCart = async () => {
    try {
      const res = await api.delete("/cart");
      setCart(res.data.cart);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
