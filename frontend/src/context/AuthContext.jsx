import { createContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "An error occurred during login";
      setError(message);
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const res = await api.post("/auth/register", { name, email, password });
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "An error occurred during registration";
      setError(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
