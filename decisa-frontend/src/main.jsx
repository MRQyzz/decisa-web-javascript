import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth-context.jsx";
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(AuthProvider, { children: _jsx(App, {}) }) }));
