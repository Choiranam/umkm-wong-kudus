// src/routes/UserRoute.jsx
import { Navigate } from "react-router-dom";
import AuthService from "../API/authService";

const UserRoute = ({ children }) => {
  let rawUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  
  // 🚀 kalau hasilnya "undefined" atau kosong, langsung null-in
  if (!rawUser || rawUser === "undefined") rawUser = null;

  let user = null;
  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    console.warn("Invalid user JSON:", err);
    user = null;
  }

  // 🚫 kalau belum login
  if (!AuthService.isAuthenticated() || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserRoute;
