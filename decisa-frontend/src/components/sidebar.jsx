import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckSquare, Goal, LayoutDashboard, ListTodo, LogOut, Sparkles, X, } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
function SidebarItem({ icon, label, active = false, onClick, }) {
    return (_jsxs("button", { type: "button", onClick: onClick, className: `
        group
        flex
        h-10
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        text-[13px]
        font-medium
        transition-all
        duration-200
        ${active
            ? "bg-indigo-500/10 text-indigo-400"
            : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"}
      `, children: [_jsx("span", { className: active
                    ? "text-indigo-400"
                    : "text-slate-500 group-hover:text-slate-300", children: icon }), label] }));
}
export default function Sidebar({ isOpen = false, onClose, }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const goTo = (path) => {
        navigate(path);
        onClose?.();
    };
    const isActive = (path) => {
        if (path === "/dashboard") {
            return location.pathname === "/dashboard";
        }
        return location.pathname.startsWith(path);
    };
    const handleLogout = async () => {
        try {
            await logout();
        }
        finally {
            onClose?.();
            navigate("/login", { replace: true });
        }
    };
    return (_jsxs(_Fragment, { children: [isOpen && (_jsx("button", { type: "button", "aria-label": "Close sidebar", onClick: onClose, className: "\n            fixed\n            inset-0\n            z-40\n            bg-black/60\n            backdrop-blur-sm\n            lg:hidden\n          " })), _jsxs("aside", { className: `
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-64
          flex-col
          border-r
          border-white/[0.07]
          bg-[#09090B]
          transition-transform
          duration-200
          lg:translate-x-0
          ${isOpen
                    ? "translate-x-0"
                    : "-translate-x-full"}
        `, children: [_jsx("div", { className: "px-5 pb-5 pt-5", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "\n                  flex\n                  h-9\n                  w-9\n                  items-center\n                  justify-center\n                  rounded-xl\n                  bg-gradient-to-br\n                  from-indigo-400\n                  to-violet-500\n                  shadow-lg\n                  shadow-indigo-500/20\n                ", children: _jsx(Sparkles, { size: 18, className: "text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "\n                    text-sm\n                    font-semibold\n                    tracking-tight\n                    text-white\n                  ", children: "Decisa AI" }), _jsx("p", { className: "mt-0.5 text-[10px] text-slate-500", children: "AI Decision Assistant" })] })] }), _jsx("button", { type: "button", onClick: onClose, "aria-label": "Close sidebar", className: "\n                flex\n                h-8\n                w-8\n                items-center\n                justify-center\n                rounded-lg\n                text-slate-500\n                transition\n                hover:bg-white/[0.05]\n                hover:text-white\n                lg:hidden\n              ", children: _jsx(X, { size: 17 }) })] }) }), _jsxs("nav", { className: "flex-1 px-3", children: [_jsx("p", { className: "\n              mb-2\n              px-3\n              text-[10px]\n              font-medium\n              uppercase\n              tracking-wider\n              text-slate-600\n            ", children: "Workspace" }), _jsxs("div", { className: "space-y-1", children: [_jsx(SidebarItem, { icon: _jsx(LayoutDashboard, { size: 17 }), label: "Dashboard", active: isActive("/dashboard"), onClick: () => goTo("/dashboard") }), _jsx(SidebarItem, { icon: _jsx(ListTodo, { size: 17 }), label: "Plans", active: isActive("/plans"), onClick: () => goTo("/plans") }), _jsx(SidebarItem, { icon: _jsx(CheckSquare, { size: 17 }), label: "Tasks", active: isActive("/tasks"), onClick: () => goTo("/tasks") }), _jsx(SidebarItem, { icon: _jsx(Goal, { size: 17 }), label: "Goals", active: isActive("/goals"), onClick: () => goTo("/goals") })] })] }), _jsxs("div", { className: "border-t border-white/[0.06] px-3 py-3", children: [_jsxs("button", { type: "button", onClick: handleLogout, className: "\n              group\n              flex\n              h-10\n              w-full\n              items-center\n              gap-3\n              rounded-xl\n              px-3\n              text-[13px]\n              font-medium\n              text-slate-400\n              transition-all\n              duration-200\n              hover:bg-red-500/[0.06]\n              hover:text-red-400\n            ", children: [_jsx(LogOut, { size: 17, className: "\n                text-slate-500\n                transition-colors\n                group-hover:text-red-400\n              " }), _jsx("span", { children: "Logout" })] }), _jsxs("div", { className: "mt-3 px-3", children: [_jsx("p", { className: "text-[10px] font-medium text-slate-600", children: "Decisa AI" }), _jsx("p", { className: "mt-1 text-[10px] text-slate-700", children: "Plan smarter. Decide better." })] })] })] })] }));
}
