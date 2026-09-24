import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { UserCircle, Bell, Palette, ShieldCheck, Trash2, ChevronDown, } from "lucide-react";
import Button from "../../components/ui/button.jsx";
function Toggle({ defaultChecked = false, }) {
    const [checked, setChecked] = useState(defaultChecked);
    return (_jsx("button", { type: "button", role: "switch", "aria-checked": checked, onClick: () => setChecked((c) => !c), className: `
                relative
                h-5
                w-9
                shrink-0

                rounded-full

                transition-colors
                duration-200
                ease-out

                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-indigo-400/50
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#09090b]

                ${checked
            ? "bg-indigo-500"
            : "bg-white/10"}
            `, children: _jsx("span", { className: `
                    absolute
                    left-0.5
                    top-0.5

                    h-4
                    w-4

                    rounded-full
                    bg-white

                    shadow-sm

                    transition-transform
                    duration-200
                    ease-out

                    ${checked
                ? "translate-x-4"
                : "translate-x-0"}
                ` }) }));
}
function SettingsRow({ label, description, control, }) {
    return (_jsxs("div", { className: "\n                flex\n                items-center\n                justify-between\n                gap-4\n\n                border-b\n                border-white/5\n\n                py-4\n\n                last:border-none\n            ", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm text-slate-200", children: label }), _jsx("p", { className: "mt-0.5 text-xs text-slate-500", children: description })] }), _jsx("div", { className: "shrink-0", children: control })] }));
}
function SettingsSection({ icon, iconColor, iconBg, title, children, }) {
    return (_jsxs("div", { className: "\n                rounded-2xl\n                border\n                border-white/10\n\n                bg-white/[0.025]\n                backdrop-blur-xl\n\n                p-5\n            ", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("div", { className: `
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center

                        rounded-lg

                        ${iconBg}
                        ${iconColor}
                    `, children: icon }), _jsx("h2", { className: "text-sm font-semibold text-white", children: title })] }), _jsx("div", { className: "mt-2", children: children })] }));
}
export default function Settings() {
    return (_jsxs("main", { className: "\n                w-full\n                max-w-[900px]\n                mx-auto\n\n                px-4\n                sm:px-5\n                lg:px-7\n\n                py-6\n            ", children: [_jsxs("section", { className: "mb-6", children: [_jsx("h1", { className: "text-2xl font-semibold tracking-tight text-white", children: "Settings" }), _jsx("p", { className: "mt-1 text-sm text-slate-400", children: "Manage your account, preferences, and app behavior." })] }), _jsxs("section", { className: "space-y-5", children: [_jsxs(SettingsSection, { icon: _jsx(UserCircle, { size: 16 }), iconColor: "text-indigo-400", iconBg: "bg-indigo-500/10", title: "Profile", children: [_jsxs("div", { className: "flex flex-col gap-4 py-4 sm:flex-row sm:items-center", children: [_jsx("div", { className: "\n                                flex\n                                h-16\n                                w-16\n                                shrink-0\n                                items-center\n                                justify-center\n\n                                rounded-full\n\n                                bg-gradient-to-br\n                                from-indigo-500\n                                to-violet-500\n\n                                text-xl\n                                font-semibold\n                                text-white\n                            ", children: "Q" }), _jsxs("div", { className: "grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs text-slate-500", children: "Display Name" }), _jsx("input", { type: "text", defaultValue: "Qy", className: "\n                                        mt-1.5\n                                        h-9\n                                        w-full\n\n                                        rounded-lg\n                                        border\n                                        border-white/10\n\n                                        bg-black/10\n\n                                        px-3\n\n                                        text-sm\n                                        text-slate-200\n\n                                        outline-none\n\n                                        transition\n\n                                        focus:border-indigo-400/40\n                                        focus:bg-white/[0.04]\n                                    " })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs text-slate-500", children: "Email" }), _jsx("input", { type: "email", defaultValue: "qy@decisa.ai", className: "\n                                        mt-1.5\n                                        h-9\n                                        w-full\n\n                                        rounded-lg\n                                        border\n                                        border-white/10\n\n                                        bg-black/10\n\n                                        px-3\n\n                                        text-sm\n                                        text-slate-200\n\n                                        outline-none\n\n                                        transition\n\n                                        focus:border-indigo-400/40\n                                        focus:bg-white/[0.04]\n                                    " })] })] })] }), _jsx("div", { className: "flex justify-end border-t border-white/5 pt-4", children: _jsx(Button, { variant: "primary", size: "sm", children: "Save Changes" }) })] }), _jsxs(SettingsSection, { icon: _jsx(Bell, { size: 16 }), iconColor: "text-amber-400", iconBg: "bg-amber-500/10", title: "Notifications", children: [_jsx(SettingsRow, { label: "Daily Summary", description: "Get a recap of your tasks and progress each evening.", control: _jsx(Toggle, { defaultChecked: true }) }), _jsx(SettingsRow, { label: "AI Recommendations", description: "Receive suggestions when Decisa AI finds a better plan.", control: _jsx(Toggle, { defaultChecked: true }) }), _jsx(SettingsRow, { label: "Deadline Reminders", description: "Get notified 24 hours before a task or plan is due.", control: _jsx(Toggle, { defaultChecked: true }) }), _jsx(SettingsRow, { label: "Habit Streak Alerts", description: "Get a nudge before a streak is about to break.", control: _jsx(Toggle, {}) })] }), _jsxs(SettingsSection, { icon: _jsx(Palette, { size: 16 }), iconColor: "text-violet-400", iconBg: "bg-violet-500/10", title: "Appearance", children: [_jsx(SettingsRow, { label: "Theme", description: "Decisa AI is currently optimized for dark mode.", control: _jsx(Button, { variant: "secondary", size: "sm", rightIcon: _jsx(ChevronDown, { size: 13 }), className: "h-8 px-3 text-xs", children: "Dark" }) }), _jsx(SettingsRow, { label: "Accent Color", description: "Used across buttons, progress bars, and highlights.", control: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "h-5 w-5 rounded-full bg-indigo-500 ring-2 ring-white/40" }), _jsx("span", { className: "h-5 w-5 rounded-full bg-cyan-500" }), _jsx("span", { className: "h-5 w-5 rounded-full bg-emerald-500" }), _jsx("span", { className: "h-5 w-5 rounded-full bg-rose-500" })] }) }), _jsx(SettingsRow, { label: "Compact Sidebar", description: "Collapse the sidebar labels to icons only.", control: _jsx(Toggle, {}) })] }), _jsxs(SettingsSection, { icon: _jsx(ShieldCheck, { size: 16 }), iconColor: "text-emerald-400", iconBg: "bg-emerald-500/10", title: "Account & Security", children: [_jsx(SettingsRow, { label: "Password", description: "Last changed 3 months ago.", control: _jsx(Button, { variant: "secondary", size: "sm", className: "h-8 px-3 text-xs", children: "Change" }) }), _jsx(SettingsRow, { label: "Two-Factor Authentication", description: "Add an extra layer of security to your account.", control: _jsx(Toggle, {}) }), _jsx(SettingsRow, { label: "Connected Devices", description: "Manage devices currently signed in to Decisa AI.", control: _jsx(Button, { variant: "secondary", size: "sm", className: "h-8 px-3 text-xs", children: "Manage" }) })] }), _jsxs("div", { className: "\n                        rounded-2xl\n                        border\n                        border-red-500/20\n\n                        bg-red-500/[0.03]\n\n                        p-5\n                    ", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("div", { className: "\n                                flex\n                                h-8\n                                w-8\n                                items-center\n                                justify-center\n\n                                rounded-lg\n\n                                bg-red-500/10\n                                text-red-400\n                            ", children: _jsx(Trash2, { size: 16 }) }), _jsx("h2", { className: "text-sm font-semibold text-white", children: "Danger Zone" })] }), _jsx(SettingsRow, { label: "Delete Account", description: "Permanently remove your account and all associated data.", control: _jsx(Button, { variant: "danger", size: "sm", className: "h-8 px-3 text-xs", children: "Delete" }) })] })] })] }));
}
