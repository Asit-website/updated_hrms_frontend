import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  const stored = JSON.parse(localStorage.getItem("hrms_token"));
  const role = stored?.role;
  const token = stored?.token;
  console.log("user-->",user);

   if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
