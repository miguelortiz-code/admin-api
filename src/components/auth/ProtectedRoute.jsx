import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext.jsx";

export const ProtectedRoute = () => {
  const [auth] = useContext(CRMContext);

  // Si no hay sesión, redirigir al login
  if (!auth.auth) return <Navigate to="/login" replace />;

  // Si hay sesión, renderizar la ruta hija
  return <Outlet />;
};