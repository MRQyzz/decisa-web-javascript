import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import plansRouter from "./routes/plans.js";
import aiRouter from "./routes/ai.js";
import goalsRouter from "./routes/goals.js";
import tasksRouter from "./routes/tasks.js";
import authRouter from "./routes/auth.js";
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;
// =========================
// Middleware
// =========================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
// =========================
// Health Check
// =========================
app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        message: "Decisa AI backend is running",
    });
});
// =========================
// Routes
// =========================
app.use("/api/auth", authRouter);
app.use("/api/plans", plansRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/goals", goalsRouter);
app.use("/api/ai", aiRouter);
// =========================
// Start Server
// =========================
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
