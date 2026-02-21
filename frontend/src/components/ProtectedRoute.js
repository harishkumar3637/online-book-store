import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.warning("⚠️ Please login first");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;