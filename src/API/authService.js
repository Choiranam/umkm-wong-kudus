// ⬇️ UBAH BARIS INI
// import api, { setAuthToken, clearAuthToken } from "../API/auth.js";

// ⬇️ MENJADI SEPERTI INI (PATH SUDAH BENAR)
import api, { setAuthToken, clearAuthToken } from "../API/Auth.js";

const AuthService = {
  login: async (email, password, remember = true) => {
    try {
      const response = await api.post("/login", { email, password, remember });
      const resData = response.data;

      if (resData.status) {
        const { token, user, expired_at } = resData.data;
        const storage = remember ? localStorage : sessionStorage;

        // authService tetap bertanggung jawab atas penyimpanan data
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

        // Panggil helper untuk mengatur header axios
        setAuthToken(token); 

        return { token, user, expired_at };
      } else {
        throw new Error(resData.message || "Login gagal");
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Terjadi kesalahan jaringan"
      );
    }
  },

  logout: () => {
    clearAuthToken(); // Hapus header dari axios
    localStorage.clear();
    sessionStorage.clear();
    return { message: "Logout berhasil" };
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    
    // ⬇️ Tambahan: Set token di header jika terautentikasi tapi header kosong (kasus refresh)
    if (token && !api.defaults.headers.common["Authorization"]) {
      setAuthToken(token);
    }
    
    return !!token;
  },
};

export default AuthService;