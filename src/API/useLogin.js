// src/hooks/useLogin.js
import { useState } from "react";
import AuthService from "../API/authService";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await AuthService.login(email, password);
      console.log("Login response:", data);
      return data;
    } catch (err) {
      const message = err.message || "Login gagal";
      console.error("Login error:", err);
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
