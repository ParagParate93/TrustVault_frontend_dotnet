import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (isLoggedIn !== "true") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
