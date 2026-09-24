import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
export default function TaskModal({ task, onClose, onSuccess, }) {
    const isEditing = task !== null;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [estimatedMinutes, setEstimatedMinutes] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description ?? "");
            setPriority(task.priority);
            setEstimatedMinutes(task.estimatedMinutes?.toString() ?? "");
            setDueDate(task.dueDate
                ? task.dueDate.slice(0, 10)
                : "");
        }
        else {
            setTitle("");
            setDescription("");
            setPriority("MEDIUM");
            setEstimatedMinutes("");
            setDueDate("");
        }
    }, [task]);
    async function handleSubmit(event) {
        event.preventDefault();
        if (!title.trim()) {
            setError("Task title is required.");
            return;
        }
        try {
            setSaving(true);
            setError(null);
            const response = await fetch(isEditing
                ? `/api/tasks/${task.id}`
                : "/api/tasks", {
                method: isEditing ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim() || undefined,
                    priority,
                    estimatedMinutes: estimatedMinutes
                        ? Number(estimatedMinutes)
                        : undefined,
                    dueDate: dueDate
                        ? new Date(`${dueDate}T00:00:00`).toISOString()
                        : undefined,
                }),
            });
            const result = await response.json();
            console.log("CREATE TASK RESPONSE:", result);
            if (!response.ok) {
                throw new Error(result.message ||
                    "Failed to create task");
            }
            onSuccess(result.data);
        }
        catch (error) {
            console.error("Create task error:", error);
            setError(error instanceof Error
                ? error.message
                : "Failed to create task");
        }
        finally {
            setSaving(false);
        }
    }
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-lg rounded-2xl border border-white/10 bg-[#111113] shadow-2xl", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-white/5 px-6 py-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-slate-100", children: isEditing ? "Edit Task" : "New Task" }), _jsx("p", { className: "mt-1 text-xs text-slate-500", children: isEditing
                                        ? "Update your task details."
                                        : "Create a new task." })] }), _jsx("button", { type: "button", onClick: onClose, className: "flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white/5 hover:text-slate-300", children: _jsx(X, { size: 17 }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 p-6", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1.5 block text-xs font-medium text-slate-300", children: "Title" }), _jsx("input", { value: title, onChange: (event) => setTitle(event.target.value), placeholder: "e.g. Study calculus fundamentals", className: "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1.5 block text-xs font-medium text-slate-300", children: "Description" }), _jsx("textarea", { value: description, onChange: (event) => setDescription(event.target.value), rows: 3, placeholder: "Describe what needs to be done...", className: "w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1.5 block text-xs font-medium text-slate-300", children: "Priority" }), _jsxs("select", { value: priority, onChange: (event) => setPriority(event.target.value), className: "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50", children: [_jsx("option", { value: "LOW", children: "Low" }), _jsx("option", { value: "MEDIUM", children: "Medium" }), _jsx("option", { value: "HIGH", children: "High" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1.5 block text-xs font-medium text-slate-300", children: "Estimated Minutes" }), _jsx("input", { type: "number", min: "1", value: estimatedMinutes, onChange: (event) => setEstimatedMinutes(event.target.value), placeholder: "60", className: "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1.5 block text-xs font-medium text-slate-300", children: "Due Date" }), _jsx("input", { type: "date", value: dueDate, onChange: (event) => setDueDate(event.target.value), className: "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50" })] })] }), error && (_jsx("p", { className: "text-xs text-red-400", children: error })), _jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [_jsx("button", { type: "button", onClick: onClose, className: "rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200", children: "Cancel" }), _jsx("button", { type: "submit", disabled: saving, className: "rounded-lg bg-indigo-500 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50", children: saving
                                        ? "Saving..."
                                        : isEditing
                                            ? "Save Changes"
                                            : "Create Task" })] })] })] }) }));
}
