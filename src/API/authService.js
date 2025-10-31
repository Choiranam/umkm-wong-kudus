import api, { setAuthToken, clearAuthToken } from "../API/Auth.js";

const AuthService = {
  login: async (email, password, remember = true) => {
    try {
      const response = await api.post("/login", { email, password, remember });
      const resData = response.data;

      if (resData.status) {
        const { token, user, expired_at } = resData.data;
        const storage = remember ? localStorage : sessionStorage;

        storage.setItem("token", token);
        storage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            foto_profil: user.foto_profil,
            expired_at,
          })
        );

        setAuthToken(token);
        return { token, user, expired_at };
      } else {
        throw new Error(resData.message || "Login gagal");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Terjadi kesalahan jaringan");
    }
  },

  logout: () => {
    clearAuthToken();
    localStorage.clear();
    sessionStorage.clear();
    return { message: "Logout berhasil" };
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token && !api.defaults.headers.common["Authorization"]) {
      setAuthToken(token);
    }
    return !!token;
  },
};

export default AuthService;