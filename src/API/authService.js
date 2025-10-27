// src/services/authService.js
import api from "../API/api";

const AuthService = {
  // === LOGIN ===
  login: async (email, password, remember = true) => {
    try {
      const response = await api.post("/login", { email, password, remember });
      const resData = response.data;

      if (resData.status) {
        const { token, user, expired_at } = resData.data;
        const { name, email: userEmail } = user;

        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("token", token);
        storage.setItem(
          "user",
          JSON.stringify({ name, email: userEmail, expired_at })
        );

        return {
          token,
          user: { name, email: userEmail, expired_at },
        };
      } else {
        throw new Error(resData.message || "Login gagal");
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Login gagal");
      } else {
        throw new Error("Terjadi kesalahan jaringan. Silakan coba lagi.");
      }
    }
  },

  // === LOGOUT (hanya hapus token lokal, tanpa panggil API) ===
  logout: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    return { message: "Logout berhasil (lokal)" };
  },

  // === GET USER LOGIN SAAT INI ===
  getCurrentUser: () => {
    const user =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // === CEK APAKAH SUDAH LOGIN ===
  isAuthenticated: () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return !!token;
  },

  // === AMBIL TOKEN ===
  getToken: () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  },
};

export default AuthService;
