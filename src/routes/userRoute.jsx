import { Navigate } from "react-router-dom";
import AuthService from "../services/authService";

const UserRoute = ({ children }) => {
  let rawUser = localStorage.getItem("user") || sessionStorage.getItem("user");

  if (!rawUser || rawUser === "undefined") rawUser = null;

  let user = null;
  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    console.warn("Invalid user JSON:", err);
    user = null;
  }

  if (!AuthService.isAuthenticated() || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserRoute;
