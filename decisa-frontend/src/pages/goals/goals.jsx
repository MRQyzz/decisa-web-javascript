import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, X, Sparkles, } from "lucide-react";
import { apiFetch } from "../../lib/api";
import AnalyzeGoalModal from "./analyzeGoalsModal";
const emptyForm = {
    title: "",
    description: "",
    priority: "MEDIUM",
    targetDate: "",
};
export default function Goals() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    // =========================
    // Goal Analysis State
    // =========================
    const [analysis, setAnalysis] = useState(null);
    const [analyzingGoal, setAnalyzingGoal] = useState(null);
    const [analyzingId, setAnalyzingId] = useState(null);
    // =========================
    // Load Goals
    // =========================
    async function loadGoals() {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFetch("/api/goals");
            setGoals(result.data);
        }
        catch (error) {
            console.error("Load goals error:", error);
            setError(error instanceof Error
                ? error.message
                : "Failed to load goals");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadGoals();
    }, []);
    // =========================
    // Create / Edit Goal
    // =========================
    function openCreateModal() {
        setEditingGoal(null);
        setForm(emptyForm);
        setShowModal(true);
    }
    function openEditModal(goal) {
        setEditingGoal(goal);
        setForm({
            title: goal.title,
            description: goal.description ?? "",
            priority: goal.priority,
            targetDate: goal.targetDate
                ? goal.targetDate.slice(0, 10)
                : "",
        });
        setShowModal(true);
    }
    function closeModal() {
        if (saving)
            return;
        setShowModal(false);
        setEditingGoal(null);
        setForm(emptyForm);
    }
    async function handleSave() {
        if (!form.title.trim())
            return;
        try {
            setSaving(true);
            const body = {
                title: form.title.trim(),
                description: form.description.trim() ||
                    undefined,
                priority: form.priority,
                targetDate: form.targetDate || undefined,
            };
            if (editingGoal) {
                const result = await apiFetch(`/api/goals/${editingGoal.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(body),
                });
                setGoals((current) => current.map((goal) => goal.id === editingGoal.id
                    ? result.data
                    : goal));
            }
            else {
                const result = await apiFetch("/api/goals", {
                    method: "POST",
                    body: JSON.stringify(body),
                });
                setGoals((current) => [
                    result.data,
                    ...current,
                ]);
            }
            closeModal();
        }
        catch (error) {
            console.error("Save goal error:", error);
            alert(error instanceof Error
                ? error.message
                : "Failed to save goal");
        }
        finally {
            setSaving(false);
        }
    }
    // =========================
    // Delete Goal
    // =========================
    async function handleDelete(goal) {
        if (!window.confirm(`Delete "${goal.title}"?`)) {
            return;
        }
        try {
            await apiFetch(`/api/goals/${goal.id}`, {
                method: "DELETE",
            });
            setGoals((current) => current.filter((item) => item.id !== goal.id));
        }
        catch (error) {
            console.error("Delete goal error:", error);
            alert(error instanceof Error
                ? error.message
                : "Failed to delete goal");
        }
    }
    // =========================
    // Analyze Goal
    // =========================
    async function handleAnalyze(goal) {
        try {
            setAnalyzingId(goal.id);
            const result = await apiFetch(`/api/goals/${goal.id}/analyze`, {
                method: "POST",
            });
            setAnalyzingGoal(goal);
            setAnalysis(result.data);
        }
        catch (error) {
            console.error("Analyze goal error:", error);
            alert(error instanceof Error
                ? error.message
                : "Failed to analyze goal");
        }
        finally {
            setAnalyzingId(null);
        }
    }
    // =========================
    // Add Suggested Task
    // =========================
    async function handleAcceptTask(task) {
        try {
            await apiFetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    estimatedMinutes: task.estimatedMinutes,
                }),
            });
        }
        catch (error) {
            console.error("Create suggested task error:", error);
            throw error;
        }
    }
    // =========================
    // Close Analysis
    // =========================
    function closeAnalysis() {
        setAnalysis(null);
        setAnalyzingGoal(null);
    }
    const filteredGoals = goals.filter((goal) => goal.title
        .toLowerCase()
        .includes(search.toLowerCase()));
    return (_jsxs("main", { className: "min-h-screen p-4 sm:p-6 lg:p-8", children: [_jsx("section", { className: "mb-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-white", children: "Goals" }), _jsx("p", { className: "mt-1 text-sm text-slate-400", children: "Define goals and let Decisa help you analyze them." })] }), _jsxs("button", { onClick: openCreateModal, className: "flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400", children: [_jsx(Plus, { size: 16 }), "New Goal"] })] }) }), _jsxs("div", { className: "relative mb-6", children: [_jsx(Search, { size: 16, className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" }), _jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search goals...", className: "h-10 w-full rounded-lg border border-white/10 bg-white/[0.025] pl-9 text-sm text-white outline-none placeholder:text-slate-500" })] }), loading ? (_jsx("p", { className: "text-sm text-slate-400", children: "Loading goals..." })) : error ? (_jsxs("div", { className: "rounded-xl border border-red-400/20 bg-red-400/5 p-4", children: [_jsx("p", { className: "text-sm text-red-400", children: "Failed to load goals" }), _jsx("p", { className: "mt-1 text-xs text-slate-500", children: error }), _jsx("button", { onClick: loadGoals, className: "mt-3 text-xs text-indigo-400", children: "Try again" })] })) : filteredGoals.length === 0 ? (_jsx("div", { className: "rounded-2xl border border-white/10 bg-white/[0.025] p-8 text-center", children: _jsx("p", { className: "text-sm text-slate-400", children: search
                        ? "No goals match your search."
                        : "No goals yet." }) })) : (_jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3", children: filteredGoals.map((goal) => (_jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.025] p-5", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-semibold text-white", children: goal.title }), _jsx("p", { className: "mt-1 text-sm text-slate-500", children: goal.description ??
                                                "No description" })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx("button", { onClick: () => openEditModal(goal), className: "rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(goal), className: "rounded-lg p-2 text-slate-500 hover:bg-red-400/10 hover:text-red-400", children: _jsx(Trash2, { size: 16 }) })] })] }), _jsxs("div", { className: "mt-5 flex flex-wrap gap-2", children: [_jsx("span", { className: "rounded-md bg-indigo-400/10 px-2 py-1 text-[11px] text-indigo-300", children: goal.priority }), goal.targetDate && (_jsxs("span", { className: "rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-400", children: ["Target", " ", new Date(goal.targetDate).toLocaleDateString()] }))] }), _jsxs("button", { onClick: () => handleAnalyze(goal), disabled: analyzingId === goal.id, className: "mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-400/5 px-3 py-2 text-sm text-indigo-300 transition hover:bg-indigo-400/10 disabled:opacity-50", children: [_jsx(Sparkles, { size: 15 }), analyzingId === goal.id
                                    ? "Analyzing..."
                                    : "Analyze Goal"] })] }, goal.id))) })), showModal && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-lg rounded-2xl border border-white/10 bg-[#111113] p-6", children: [_jsxs("div", { className: "mb-6 flex items-center justify-between", children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: editingGoal
                                        ? "Edit Goal"
                                        : "New Goal" }), _jsx("button", { onClick: closeModal, className: "text-slate-500 hover:text-white", children: _jsx(X, { size: 18 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("input", { value: form.title, onChange: (e) => setForm({
                                        ...form,
                                        title: e.target.value,
                                    }), placeholder: "Goal title", className: "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white" }), _jsx("textarea", { value: form.description, onChange: (e) => setForm({
                                        ...form,
                                        description: e.target.value,
                                    }), placeholder: "Description", rows: 4, className: "w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-white" }), _jsxs("select", { value: form.priority, onChange: (e) => setForm({
                                        ...form,
                                        priority: e.target.value,
                                    }), className: "h-10 w-full rounded-lg border border-white/10 bg-[#111113] px-3 text-sm text-white", children: [_jsx("option", { value: "LOW", children: "Low" }), _jsx("option", { value: "MEDIUM", children: "Medium" }), _jsx("option", { value: "HIGH", children: "High" })] }), _jsx("input", { type: "date", value: form.targetDate, onChange: (e) => setForm({
                                        ...form,
                                        targetDate: e.target.value,
                                    }), className: "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white" }), _jsx("button", { onClick: handleSave, disabled: saving ||
                                        !form.title.trim(), className: "h-10 w-full rounded-lg bg-indigo-500 text-sm font-medium text-white disabled:opacity-50", children: saving
                                        ? "Saving..."
                                        : editingGoal
                                            ? "Save Changes"
                                            : "Create Goal" })] })] }) })), analysis && analyzingGoal && (_jsx(AnalyzeGoalModal, { goalTitle: analyzingGoal.title, analysis: analysis.analysis, suggestedTasks: analysis.suggestedTasks, onClose: closeAnalysis, onAcceptTask: handleAcceptTask }))] }));
}
