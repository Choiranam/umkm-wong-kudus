// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import AuthService from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated) {
    // Jika user tidak login, arahkan ke halaman Not Found
    return <Navigate to="/notfound" replace />;
  }

  return children;
};

export default ProtectedRoute;
