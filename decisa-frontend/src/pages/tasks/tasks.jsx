import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, X, } from "lucide-react";
import { apiFetch } from "../../lib/api";
const emptyForm = {
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
    estimatedMinutes: "",
    dueDate: "",
};
export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    async function loadTasks() {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFetch("/api/tasks");
            setTasks(result.data);
        }
        catch (error) {
            console.error("Load tasks error:", error);
            setError(error instanceof Error
                ? error.message
                : "Failed to load tasks");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadTasks();
    }, []);
    function openCreateModal() {
        setEditingTask(null);
        setForm(emptyForm);
        setShowModal(true);
    }
    function openEditModal(task) {
        setEditingTask(task);
        setForm({
            title: task.title,
            description: task.description ?? "",
            priority: task.priority,
            status: task.status,
            estimatedMinutes: task.estimatedMinutes?.toString() ?? "",
            dueDate: task.dueDate
                ? task.dueDate.slice(0, 10)
                : "",
        });
        setShowModal(true);
    }
    function closeModal() {
        if (saving)
            return;
        setShowModal(false);
        setEditingTask(null);
        setForm(emptyForm);
    }
    async function handleSave() {
        if (!form.title.trim())
            return;
        try {
            setSaving(true);
            if (editingTask) {
                const result = await apiFetch(`/api/tasks/${editingTask.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        title: form.title.trim(),
                        description: form.description.trim() ||
                            undefined,
                        priority: form.priority,
                        status: form.status,
                        estimatedMinutes: form.estimatedMinutes
                            ? Number(form.estimatedMinutes)
                            : undefined,
                        dueDate: form.dueDate || undefined,
                    }),
                });
                setTasks((current) => current.map((task) => task.id === editingTask.id
                    ? result.data
                    : task));
            }
            else {
                const result = await apiFetch("/api/tasks", {
                    method: "POST",
                    body: JSON.stringify({
                        title: form.title.trim(),
                        description: form.description.trim() ||
                            undefined,
                        priority: form.priority,
                        estimatedMinutes: form.estimatedMinutes
                            ? Number(form.estimatedMinutes)
                            : undefined,
                        dueDate: form.dueDate || undefined,
                    }),
                });
                setTasks((current) => [
                    result.data,
                    ...current,
                ]);
            }
            closeModal();
        }
        catch (error) {
            console.error("Save task error:", error);
            alert(error instanceof Error
                ? error.message
                : "Failed to save task");
        }
        finally {
            setSaving(false);
        }
    }
    async function handleDelete(task) {
        if (!window.confirm(`Delete "${task.title}"?`)) {
            return;
        }
        try {
            await apiFetch(`/api/tasks/${task.id}`, {
                method: "DELETE",
            });
            setTasks((current) => current.filter((item) => item.id !== task.id));
        }
        catch (error) {
            console.error("Delete task error:", error);
            alert(error instanceof Error
                ? error.message
                : "Failed to delete task");
        }
    }
    async function changeStatus(task, status) {
        try {
            const result = await apiFetch(`/api/tasks/${task.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    status,
                }),
            });
            setTasks((current) => current.map((item) => item.id === task.id
                ? result.data
                : item));
        }
        catch (error) {
            console.error("Update task status error:", error);
        }
    }
    const filteredTasks = tasks.filter((task) => task.title
        .toLowerCase()
        .includes(search.toLowerCase()));
    return (_jsxs("main", { className: "min-h-screen p-4 sm:p-6 lg:p-8", children: [_jsx("section", { className: "mb-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-white", children: "Tasks" }), _jsx("p", { className: "mt-1 text-sm text-slate-400", children: "Manage your tasks and track progress." })] }), _jsxs("button", { onClick: openCreateModal, className: "flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400", children: [_jsx(Plus, { size: 16 }), "New Task"] })] }) }), _jsxs("div", { className: "relative mb-6", children: [_jsx(Search, { size: 16, className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" }), _jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search tasks...", className: "h-10 w-full rounded-lg border border-white/10 bg-white/[0.025] pl-9 text-sm text-white outline-none placeholder:text-slate-500" })] }), loading ? (_jsx("p", { className: "text-sm text-slate-400", children: "Loading tasks..." })) : error ? (_jsxs("div", { className: "rounded-xl border border-red-400/20 bg-red-400/5 p-4", children: [_jsx("p", { className: "text-sm text-red-400", children: "Failed to load tasks" }), _jsx("p", { className: "mt-1 text-xs text-slate-500", children: error }), _jsx("button", { onClick: loadTasks, className: "mt-3 text-xs text-indigo-400", children: "Try again" })] })) : filteredTasks.length === 0 ? (_jsx("div", { className: "rounded-2xl border border-white/10 bg-white/[0.025] p-8 text-center", children: _jsx("p", { className: "text-sm text-slate-400", children: search
                        ? "No tasks match your search."
                        : "No tasks yet." }) })) : (_jsx("div", { className: "space-y-3", children: filteredTasks.map((task) => (_jsx("div", { className: "rounded-xl border border-white/10 bg-white/[0.025] p-4", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("input", { type: "checkbox", checked: task.status === "DONE", onChange: (e) => changeStatus(task, e.target.checked
                                    ? "DONE"
                                    : "TODO"), className: "mt-1" }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h2", { className: `font-medium ${task.status === "DONE"
                                            ? "text-slate-500 line-through"
                                            : "text-white"}`, children: task.title }), task.description && (_jsx("p", { className: "mt-1 text-sm text-slate-500", children: task.description })), _jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [_jsx("span", { className: "rounded-md bg-indigo-400/10 px-2 py-1 text-[11px] text-indigo-300", children: task.priority }), _jsx("span", { className: "rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-400", children: task.status }), task.dueDate && (_jsxs("span", { className: "rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-400", children: ["Due", " ", new Date(task.dueDate).toLocaleDateString()] }))] })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx("button", { onClick: () => openEditModal(task), className: "rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(task), className: "rounded-lg p-2 text-slate-500 hover:bg-red-400/10 hover:text-red-400", children: _jsx(Trash2, { size: 16 }) })] })] }) }, task.id))) })), showModal && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-lg rounded-2xl border border-white/10 bg-[#111113] p-6", children: [_jsxs("div", { className: "mb-6 flex items-center justify-between", children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: editingTask
                                        ? "Edit Task"
                                        : "New Task" }), _jsx("button", { onClick: closeModal, className: "text-slate-500 hover:text-white", children: _jsx(X, { size: 18 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("input", { value: form.title, onChange: (e) => setForm({
                                        ...form,
                                        title: e.target.value,
                                    }), placeholder: "Task title", className: "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white" }), _jsx("textarea", { value: form.description, onChange: (e) => setForm({
                                        ...form,
                                        description: e.target.value,
                                    }), placeholder: "Description", rows: 3, className: "w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-white" }), _jsxs("select", { value: form.priority, onChange: (e) => setForm({
                                        ...form,
                                        priority: e.target.value,
                                    }), className: "h-10 w-full rounded-lg border border-white/10 bg-[#111113] px-3 text-sm text-white", children: [_jsx("option", { value: "LOW", children: "Low" }), _jsx("option", { value: "MEDIUM", children: "Medium" }), _jsx("option", { value: "HIGH", children: "High" })] }), editingTask && (_jsxs("select", { value: form.status, onChange: (e) => setForm({
                                        ...form,
                                        status: e.target.value,
                                    }), className: "h-10 w-full rounded-lg border border-white/10 bg-[#111113] px-3 text-sm text-white", children: [_jsx("option", { value: "TODO", children: "Todo" }), _jsx("option", { value: "IN_PROGRESS", children: "In Progress" }), _jsx("option", { value: "DONE", children: "Done" })] })), _jsx("input", { type: "number", min: "1", value: form.estimatedMinutes, onChange: (e) => setForm({
                                        ...form,
                                        estimatedMinutes: e.target.value,
                                    }), placeholder: "Estimated minutes", className: "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white" }), _jsx("input", { type: "date", value: form.dueDate, onChange: (e) => setForm({
                                        ...form,
                                        dueDate: e.target.value,
                                    }), className: "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white" }), _jsx("button", { onClick: handleSave, disabled: saving || !form.title.trim(), className: "h-10 w-full rounded-lg bg-indigo-500 text-sm font-medium text-white disabled:opacity-50", children: saving
                                        ? "Saving..."
                                        : editingTask
                                            ? "Save Changes"
                                            : "Create Task" })] })] }) }))] }));
}
