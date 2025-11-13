import { useState } from "react";
import AuthService from "./authService";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password, remember = true) => {
    setLoading(true);
    setError(null);

    try {
      const result = await AuthService.login(email, password, remember);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
