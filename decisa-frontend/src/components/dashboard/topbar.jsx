import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/button.jsx";
const pageNames = {
    "/dashboard": "Dashboard",
    "/plans": "Plans",
    "/tasks": "Tasks",
    "/calendar": "Calendar",
    "/goals": "Goals",
    "/ai-chat": "AI Chat",
    "/settings": "Settings",
    "/profile": "Profile",
};
function getPageName(pathname) {
    if (pageNames[pathname]) {
        return pageNames[pathname];
    }
    if (pathname.startsWith("/plans"))
        return "Plans";
    if (pathname.startsWith("/tasks"))
        return "Tasks";
    if (pathname.startsWith("/calendar"))
        return "Calendar";
    if (pathname.startsWith("/goals"))
        return "Goals";
    if (pathname.startsWith("/ai-chat"))
        return "AI Chat";
    if (pathname.startsWith("/settings"))
        return "Settings";
    if (pathname.startsWith("/profile"))
        return "Profile";
    return "Dashboard";
}
export default function TopBar({ onNewPlan, notification, onMenuClick, }) {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = getPageName(location.pathname);
    return (_jsxs("header", { className: "\n        sticky\n        top-0\n        z-40\n        w-full\n        border-b\n        border-white/[0.07]\n        bg-[#09090b]/70\n        backdrop-blur-xl\n      ", children: [_jsxs("div", { className: "\n          flex\n          h-14\n          items-center\n          justify-between\n          gap-3\n          px-4\n          sm:px-5\n        ", children: [_jsxs("div", { className: "flex min-w-0 items-center gap-2.5", children: [_jsx("div", { className: "lg:hidden", children: _jsx(Button, { variant: "ghost", size: "sm", onClick: onMenuClick, className: "\n                h-9\n                w-9\n                p-0\n                text-slate-400\n                hover:text-white\n              ", "aria-label": "Open navigation", children: _jsx(Menu, { size: 17 }) }) }), _jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [_jsx("span", { className: "\n                hidden\n                whitespace-nowrap\n                text-sm\n                text-slate-500\n                sm:inline\n              ", children: "Decisa AI" }), _jsx("span", { className: "hidden text-slate-700 sm:inline", children: "/" }), _jsx("span", { className: "\n                truncate\n                text-[13px]\n                font-medium\n                tracking-[-0.01em]\n                text-slate-100\n              ", children: currentPage })] })] }), _jsx("div", { className: "flex shrink-0 items-center gap-2", children: _jsxs(Button, { variant: "primary", size: "sm", onClick: onNewPlan, leftIcon: _jsx(Plus, { size: 15 }), className: "\n              h-9\n              rounded-xl\n              px-3.5\n              whitespace-nowrap\n            ", children: [_jsx("span", { className: "hidden sm:inline", children: "New Plan" }), _jsx("span", { className: "sm:hidden", children: "New" })] }) })] }), notification && (_jsx("div", { className: "fixed right-4 top-4 z-[100] sm:right-5", children: _jsxs("div", { className: "\n              min-w-[240px]\n              rounded-xl\n              border\n              border-white/[0.08]\n              bg-[#15151c]/95\n              px-4\n              py-3\n              shadow-2xl\n              backdrop-blur-xl\n            ", children: [_jsx("p", { className: "text-sm font-medium text-white", children: notification }), _jsx("p", { className: "mt-1 text-xs text-slate-400", children: "Your plan has been saved successfully." })] }) }))] }));
}
