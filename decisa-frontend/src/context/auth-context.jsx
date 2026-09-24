import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from "react";
import { apiFetch } from "../lib/api";
const AuthContext = createContext(undefined);
export function AuthProvider({ children, }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    async function refreshUser() {
        try {
            const data = await apiFetch("/api/auth/me");
            setUser(data.user);
        }
        catch {
            setUser(null);
        }
    }
    async function login(email, password) {
        const data = await apiFetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
        });
        setUser(data.user);
    }
    async function register(displayName, email, password) {
        const data = await apiFetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                displayName,
                email,
                password,
            }),
        });
        setUser(data.user);
    }
    async function logout() {
        try {
            await apiFetch("/api/auth/logout", {
                method: "POST",
            });
        }
        finally {
            setUser(null);
        }
    }
    useEffect(() => {
        async function initializeAuth() {
            await refreshUser();
            setLoading(false);
        }
        initializeAuth();
    }, []);
    return (_jsx(AuthContext.Provider, { value: {
            user,
            loading,
            isAuthenticated: user !== null,
            login,
            register,
            logout,
            refreshUser,
        }, children: children }));
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
