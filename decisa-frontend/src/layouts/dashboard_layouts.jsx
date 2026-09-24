import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar.jsx";
import TopBar from "../components/dashboard/topbar";
import NewPlanModal from "../pages/plans/newPlansModal.jsx";
export default function DashboardLayout() {
    const [showNewPlanModal, setShowNewPlanModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const handlePlanCreated = () => {
        setShowNewPlanModal(false);
        setNotification("Plan berhasil dibuat.");
        window.setTimeout(() => {
            setNotification(null);
        }, 3000);
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#09090B]", children: [_jsx(Sidebar, { isOpen: sidebarOpen, onClose: () => setSidebarOpen(false) }), _jsxs("div", { className: "min-h-screen lg:ml-64", children: [_jsx(TopBar, { onNewPlan: () => setShowNewPlanModal(true), onMenuClick: () => setSidebarOpen(true), notification: notification }), _jsx("main", { children: _jsx(Outlet, {}) })] }), showNewPlanModal && (_jsx(NewPlanModal, { onClose: () => setShowNewPlanModal(false), onCreated: handlePlanCreated, onUpdated: () => { }, editingPlan: null }))] }));
}
