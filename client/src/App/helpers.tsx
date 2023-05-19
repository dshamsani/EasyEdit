import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext/context";
import { ReactElement } from "react";

export const CheckAuthorization = (element: ReactElement): ReactElement => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? element : <Navigate to="/login" />;
}