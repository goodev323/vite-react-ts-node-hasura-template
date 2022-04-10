import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuardRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) throw Promise.resolve();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Outlet />;
};
