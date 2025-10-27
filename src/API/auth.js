// src/api/Auth.js
import axios from "axios";

const API_URL = "https://api-umkmwongkudus.rplrus.com/api";

// Buat instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Fungsi login
export const login = async (email, password) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await api.post("/login", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Terjadi kesalahan koneksi" };
  }
};

// Simpan token di localStorage
export const setAuthToken = (token) => {
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
