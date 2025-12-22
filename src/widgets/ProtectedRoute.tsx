import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

export function ProtectedRoute() {
  const token = useAppSelector((state) => state.auth.token);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
