import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export function ProtectedRoute() {
  const token = useAppSelector((state) => state.auth.token);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
