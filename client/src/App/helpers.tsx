import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext/context";
import { ReactElement } from "react";
import Layout from "../Components/Layout";

export const CheckAuthorization = (element: ReactElement): ReactElement => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Layout>{element}</Layout> : <Navigate to="/login" />;
};
