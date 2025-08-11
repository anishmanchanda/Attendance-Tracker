import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { profile } = useAuth();
  if (!profile) return <Navigate to="/login" replace />;
  return children;
};
