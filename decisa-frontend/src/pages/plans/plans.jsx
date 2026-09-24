import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { CalendarDays, Plus, Search, Trash2, Pencil, X, } from "lucide-react";
import { apiFetch } from "../../lib/api";
const emptyForm = {
    title: "",
    description: "",
    priority: "MEDIUM",
    startDate: "",
    dueDate: "",
};
export default function Plans() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");
    async function loadPlans() {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFetch("/api/plans");
            setPlans(result.data);
        }
        catch (error) {
            console.error("Load plans error:", error);
            setError(error instanceof Error
                ? error.message
                : "Failed to load plans");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadPlans();
    }, []);
    function openCreateModal() {
        setEditingPlan(null);
        setForm(emptyForm);
        setShowModal(true);
    }
    function openEditModal(plan) {
        setEditingPlan(plan);
        setForm({
            title: plan.title,
            description: plan.description ?? "",
            priority: plan.priority,
            startDate: plan.startDate
                ? plan.startDate.slice(0, 10)
                : "",
            dueDate: plan.dueDate
                ? plan.dueDate.slice(0, 10)
                : "",
        });
        setShowModal(true);
    }
    function closeModal() {
        if (saving)
            return;
        setShowModal(false);
        setEditingPlan(null);
        setForm(emptyForm);
    }
    async function handleSave() {
        if (!form.title.trim()) {
            return;
        }
        try {
            setSaving(true);
            const body = {
                title: form.title.trim(),
                description: form.description.trim() || undefined,
                priority: form.priority,
                startDate: form.startDate || undefined,
                dueDate: form.dueDate || undefined,
            };
            if (editingPlan) {
                const result = await apiFetch(`/api/plans/${editingPlan.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(body),
                });
                setPlans((current) => current.map((plan) => plan.id === editingPlan.id
                    ? result.data
                    : plan));
            }
            else {
                const result = await apiFetch("/api/plans", {
                    method: "POST",
                    body: JSON.stringify(body),
                });
                setPlans((current) => [
                    result.data,
                    ...current,
                ]);
            }
            closeModal();
        }
        catch (error) {
            console.error("Save plan error:", error);
            alert(error instanceof Error
                ? error.message
                : "Failed to save plan");
        }
        finally {
            setSaving(false);
        }
    }
    async function handleDelete(plan) {
        const confirmed = window.confirm(`Delete "${plan.title}"?`);
        if (!confirmed)
            return;
        try {
            await apiFetch(`/api/plans/${plan.id}`, {
                method: "DELETE",
            });
            setPlans((current) => current.filter((item) => item.id !== plan.id));
        }
        catch (error) {
            console.error("Delete plan error:", error);
            alert(error instanceof Error
                ? error.message
                : "Failed to delete plan");
        }
    }
    const filteredPlans = plans.filter((plan) => plan.title
        .toLowerCase()
        .includes(search.toLowerCase()));
    return (_jsxs("main", { className: "min-h-screen p-4 sm:p-6 lg:p-8", children: [_jsx("section", { className: "mb-6", children: _jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold tracking-tight text-white", children: "Plans" }), _jsx("p", { className: "mt-1 text-sm text-slate-400", children: "Manage your plans and stay focused on what matters." })] }), _jsxs("button", { onClick: openCreateModal, className: "flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white transition hover:bg-indigo-400", children: [_jsx(Plus, { size: 16 }), "New Plan"] })] }) }), _jsx("section", { className: "mb-6", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { size: 16, className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" }), _jsx("input", { value: search, onChange: (event) => setSearch(event.target.value), type: "text", placeholder: "Search plans...", className: "h-10 w-full rounded-lg border border-white/10 bg-white/[0.025] pl-9 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-indigo-400/40" })] }) }), loading ? (_jsx("p", { className: "text-sm text-slate-400", children: "Loading plans..." })) : error ? (_jsxs("div", { className: "rounded-xl border border-red-400/20 bg-red-400/5 p-4", children: [_jsx("p", { className: "text-sm text-red-400", children: "Failed to load plans" }), _jsx("p", { className: "mt-1 text-xs text-slate-500", children: error }), _jsx("button", { onClick: loadPlans, className: "mt-3 text-xs text-indigo-400 hover:text-indigo-300", children: "Try again" })] })) : filteredPlans.length === 0 ? (_jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.025] p-8 text-center", children: [_jsx("p", { className: "text-sm text-slate-400", children: search
                            ? "No plans match your search."
                            : "No plans yet." }), !search && (_jsx("button", { onClick: openCreateModal, className: "mt-4 text-sm text-indigo-400 hover:text-indigo-300", children: "Create your first plan" }))] })) : (_jsx("section", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3", children: filteredPlans.map((plan) => (_jsxs("div", { className: "group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-indigo-400/20 hover:bg-white/[0.04]", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: "mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400", children: "\u2726" }), _jsx("h2", { className: "truncate text-base font-semibold text-white", children: plan.title }), _jsx("p", { className: "mt-1 line-clamp-2 text-sm leading-5 text-slate-400", children: plan.description ?? "No description" })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx("button", { onClick: () => openEditModal(plan), className: "rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-slate-200", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(plan), className: "rounded-lg p-2 text-slate-500 transition hover:bg-red-400/10 hover:text-red-400", children: _jsx(Trash2, { size: 16 }) })] })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-slate-500", children: "Progress" }), _jsxs("span", { className: "text-xs font-medium text-slate-300", children: [Number(plan.progress), "%"] })] }), _jsx("div", { className: "h-1.5 overflow-hidden rounded-full bg-white/10", children: _jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500", style: {
                                            width: `${Number(plan.progress)}%`,
                                        } }) })] }), _jsxs("div", { className: "mt-5 flex items-center justify-between border-t border-white/5 pt-4", children: [_jsx("span", { className: "rounded-md bg-indigo-400/10 px-2 py-1 text-[11px] font-medium text-indigo-300", children: plan.priority }), _jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-500", children: [_jsx(CalendarDays, { size: 13 }), plan.dueDate
                                            ? new Date(plan.dueDate).toLocaleDateString()
                                            : "No due date"] })] })] }, plan.id))) })), showModal && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-lg rounded-2xl border border-white/10 bg-[#111113] p-6 shadow-2xl", children: [_jsxs("div", { className: "mb-6 flex items-center justify-between", children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: editingPlan
                                        ? "Edit Plan"
                                        : "New Plan" }), _jsx("button", { onClick: closeModal, className: "rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white", children: _jsx(X, { size: 18 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("input", { value: form.title, onChange: (event) => setForm({
                                        ...form,
                                        title: event.target.value,
                                    }), placeholder: "Plan title", className: "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none placeholder:text-slate-600" }), _jsx("textarea", { value: form.description, onChange: (event) => setForm({
                                        ...form,
                                        description: event.target.value,
                                    }), placeholder: "Description", rows: 4, className: "w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600" }), _jsxs("select", { value: form.priority, onChange: (event) => setForm({
                                        ...form,
                                        priority: event.target.value,
                                    }), className: "h-10 w-full rounded-lg border border-white/10 bg-[#111113] px-3 text-sm text-white outline-none", children: [_jsx("option", { value: "LOW", children: "Low" }), _jsx("option", { value: "MEDIUM", children: "Medium" }), _jsx("option", { value: "HIGH", children: "High" })] }), _jsx("div", { className: "w-full", children: _jsx("input", { type: "date", value: form.dueDate, onChange: (event) => setForm({
                                            ...form,
                                            dueDate: event.target.value,
                                        }), className: "w-full h-10 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white" }) }), _jsx("button", { onClick: handleSave, disabled: saving || !form.title.trim(), className: "h-10 w-full rounded-lg bg-indigo-500 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50", children: saving
                                        ? "Saving..."
                                        : editingPlan
                                            ? "Save Changes"
                                            : "Create Plan" })] })] }) }))] }));
}
