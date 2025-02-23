import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    localStorage.removeItem("user"); // Clear invalid data
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
