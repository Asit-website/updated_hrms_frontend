import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const HomeRedirect = () => {
  const { user } = useAuth();
console.log(user)
  if (!user) return <Navigate to="/login" />;
  if (user.role === "ADMIN") return <Navigate to="/adminDash/HRM" />;
  if (user.role === "EMPLOYEE") return <Navigate to="/employeeDash" />;

  return <Navigate to="/unauthorized" />;
};

export default HomeRedirect;
