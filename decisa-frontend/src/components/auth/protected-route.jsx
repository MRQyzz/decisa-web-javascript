import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return null;
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(Outlet, {});
}
