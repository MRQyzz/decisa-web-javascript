import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const variantStyles = {
    primary: `
        bg-gradient-to-r
        from-indigo-500
        to-violet-500
        hover:from_indigo-400
        hover:to-violet-400
        text-white
        shadow-lg
        shadow-indigo-500/20
    `,
    secondary: `
        bg-white/5
        border
        border-white/10
        text-slate-200
        hover:bg-white/10
    `,
    outline: `
        border
        border-indigo-500
        text-indigo-400
        hover:bg-indigo-500/10
    `,
    ghost: `
        bg-transparent
        text-slate-300
        hover:bg-white/5
    `,
    danger: `
        bg-red-500
        hover:bg-red-400
        text-white
    `,
    success: `
        bg-emerald-500
        hover:bg-emerald-400
        text-white
    `,
};
const sizeStyles = {
    sm: `
        px-3
        py-2
        text-sm
    `,
    md: `
        px-4
        py-2.5
        text-base
    `,
    lg: `
        px-6
        py-3
        text-lg
    `,
};
export default function Button({ children, variant = "primary", size = "md", fullWidth = false, loading = false, leftIcon, rightIcon, className = "", disabled, ...props }) {
    return (_jsx("button", { disabled: disabled || loading, className: `
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                font-medium
                transition-all
                duration-300
                active:scale-95
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${fullWidth ? "w-full" : ""}
                ${className}
            `, ...props, children: loading ? (_jsx("span", { children: "Loading..." })) : (_jsxs(_Fragment, { children: [leftIcon, children, rightIcon] })) }));
}
