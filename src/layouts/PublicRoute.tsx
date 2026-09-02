import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute(){

    const { token, loading } = useAuth();

    if (loading) {
        return <div>Loading ...</div>;
    }

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}