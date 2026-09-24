import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { CalendarDays, ChevronDown, X } from "lucide-react";
import Button from "../../components/ui/button.jsx";
export default function NewPlanModal({ onClose, onCreated, onUpdated, editingPlan, }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (editingPlan) {
            setTitle(editingPlan.title);
            setDescription(editingPlan.description ?? "");
            setPriority(editingPlan.priority);
            setDueDate(editingPlan.dueDate ? editingPlan.dueDate.slice(0, 10) : "");
        }
        else {
            setTitle("");
            setDescription("");
            setPriority("MEDIUM");
            setDueDate("");
        }
        setError(null);
    }, [editingPlan]);
    async function handleSubmit() {
        if (!title.trim()) {
            setError("Plan name is required");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const planId = editingPlan?.id;
            const response = await fetch(planId
                ? `/api/plans/${planId}`
                : "/api/plans", {
                method: planId ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim() || undefined,
                    priority,
                    dueDate: dueDate || undefined,
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message ||
                    (planId ? "Failed to update plan" : "Failed to create plan"));
            }
            if (planId) {
                onUpdated(result.data);
            }
            else {
                onCreated(result.data);
            }
            onClose();
        }
        catch (error) {
            console.error(error);
            setError(error instanceof Error
                ? error.message
                : editingPlan
                    ? "Failed to update plan"
                    : "Failed to create plan");
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-lg rounded-2xl border border-white/10 bg-[#111116] shadow-2xl", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-white/5 px-5 py-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-white", children: editingPlan ? "Update Goal" : "Create New Goal" }), _jsx("p", { className: "mt-1 text-xs text-slate-500", children: editingPlan
                                        ? "Update the details of your goal."
                                        : "Define something you want to achieve." })] }), _jsx("button", { type: "button", onClick: onClose, className: "rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white", children: _jsx(X, { size: 17 }) })] }), _jsxs("div", { className: "space-y-4 p-5", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-xs font-medium text-slate-300", children: "Goal name" }), _jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "e.g. Become an AI Engineer", className: "w-full rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-xs font-medium text-slate-300", children: "Description" }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Describe what you want to achieve...", rows: 4, className: "w-full resize-none rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50" })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-xs font-medium text-slate-300", children: "Priority" }), _jsxs("div", { className: "relative", children: [_jsxs("select", { value: priority, onChange: (e) => setPriority(e.target.value), className: "w-full appearance-none rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/50", children: [_jsx("option", { value: "LOW", children: "LOW" }), _jsx("option", { value: "MEDIUM", children: "MEDIUM" }), _jsx("option", { value: "HIGH", children: "HIGH" })] }), _jsx(ChevronDown, { size: 15, className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-xs font-medium text-slate-300", children: "Target date" }), _jsxs("div", { className: "relative", children: [_jsx(CalendarDays, { size: 15, className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" }), _jsx("input", { type: "date", value: dueDate, onChange: (e) => setDueDate(e.target.value), className: "w-full rounded-lg border border-white/10 bg-white/[0.035] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-indigo-500/50" })] })] })] }), error && _jsx("p", { className: "text-xs text-red-400", children: error })] }), _jsxs("div", { className: "flex justify-end gap-2 border-t border-white/5 px-5 py-4", children: [_jsx(Button, { variant: "secondary", size: "sm", onClick: onClose, disabled: loading, children: "Cancel" }), _jsx(Button, { variant: "primary", size: "sm", onClick: handleSubmit, disabled: loading, children: loading
                                ? editingPlan
                                    ? "Updating..."
                                    : "Creating..."
                                : editingPlan
                                    ? "Update Goal"
                                    : "Create Goal" })] })] }) }));
}
