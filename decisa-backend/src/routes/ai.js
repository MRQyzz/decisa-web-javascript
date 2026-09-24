import { Router } from "express";
import { analyzeGoal } from "../services/goal-analysis.js";
const router = Router();
router.post("/test", async (_req, res) => {
    try {
        const result = await analyzeGoal({
            title: "Become an AI Engineer",
            description: "I want to learn mathematics, programming, and machine learning so I can build real AI systems.",
            priority: "HIGH",
            targetDate: "2027-06-01",
        });
        res.json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error("Gemini error:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Unknown Gemini error",
        });
    }
});
export default router;
