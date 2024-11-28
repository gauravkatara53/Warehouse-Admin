import { Navigate } from "react-router-dom";
import React from "react";

interface PrivateRouteProps {
  element: React.ReactElement;
}

function PrivateRoute({ element }: PrivateRouteProps) {
  const token = localStorage.getItem("token");

  return token ? element : <Navigate to="/signin" replace />;
}

export default PrivateRoute;
