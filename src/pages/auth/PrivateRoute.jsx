import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const stored = JSON.parse(localStorage.getItem("hrms_token"));
  const role = stored?.role;

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
