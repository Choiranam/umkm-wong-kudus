import axios from "axios";

const API_URL = "https://api-umkmwongkudus.rplrus.com/api";

// Buat instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

// ⬇️ FUNGSI LOGIN DI HAPUS DARI SINI
// Fungsi login yang diekspor sebelumnya tidak digunakan oleh authService,
// jadi kita hapus agar tidak membingungkan.

// Simpan token di localStorage dan atur header default
export const setAuthToken = (token) => {
  // Simpan token (meskipun authService juga menyimpan, ini untuk header)
  localStorage.setItem("token", token); 
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Ambil token dari localStorage
export const getAuthToken = () => localStorage.getItem("token");

// Hapus token (logout)
export const clearAuthToken = () => {
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
};

export default api;