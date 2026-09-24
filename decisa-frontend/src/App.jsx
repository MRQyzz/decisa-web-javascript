import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard_layouts.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Plans from "./pages/plans/plans.jsx";
import Tasks from "./pages/tasks/tasks.jsx";
import Goals from "./pages/goals/goals.jsx";
import Landing from "./pages/landing/landing.jsx";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import ProtectedRoute from "./components/auth/protected-route.jsx";
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Landing, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { element: _jsx(ProtectedRoute, {}), children: _jsxs(Route, { element: _jsx(DashboardLayout, {}), children: [_jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/plans", element: _jsx(Plans, {}) }), _jsx(Route, { path: "/tasks", element: _jsx(Tasks, {}) }), _jsx(Route, { path: "/goals", element: _jsx(Goals, {}) })] }) })] }) }));
}
