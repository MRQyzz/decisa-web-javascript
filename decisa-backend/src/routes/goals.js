import { Router } from "express";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import { analyzeGoal } from "../services/goal-analysis.js";
import { requireAuth, } from "../middleware/require-auth.js";
const router = Router();
const createGoalSchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(2000).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    targetDate: z.coerce.date().optional(),
});
const updateGoalSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(2000).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    targetDate: z.coerce.date().optional(),
});
// =========================================
// CREATE GOAL
// POST /api/goals
// =========================================
router.post("/", requireAuth, async (req, res) => {
    try {
        const result = createGoalSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid goal data",
                errors: result.error.issues,
            });
        }
        const goal = await prisma.goal.create({
            data: {
                title: result.data.title,
                priority: result.data.priority,
                ...(result.data.description !== undefined && {
                    description: result.data.description,
                }),
                ...(result.data.targetDate !== undefined && {
                    targetDate: result.data.targetDate,
                }),
                user: {
                    connect: {
                        id: req.userId,
                    },
                },
            },
        });
        return res.status(201).json({
            success: true,
            data: goal,
        });
    }
    catch (error) {
        console.error("Create goal error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create goal",
        });
    }
});
// =========================================
// GET GOALS
// GET /api/goals
// =========================================
router.get("/", requireAuth, async (req, res) => {
    try {
        const goals = await prisma.goal.findMany({
            where: {
                userId: req.userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json({
            success: true,
            data: goals,
        });
    }
    catch (error) {
        console.error("Get goals error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to fetch goals",
        });
    }
});
// =========================================
// UPDATE GOAL
// PATCH /api/goals/:id
// =========================================
router.patch("/:id", requireAuth, async (req, res) => {
    try {
        const goalId = req.params.id;
        const result = updateGoalSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid goal data",
                errors: result.error.issues,
            });
        }
        const existingGoal = await prisma.goal.findFirst({
            where: {
                id: goalId,
                userId: req.userId,
            },
        });
        if (!existingGoal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found",
            });
        }
        const goal = await prisma.goal.update({
            where: {
                id: goalId,
            },
            data: {
                ...(result.data.title !== undefined && {
                    title: result.data.title,
                }),
                ...(result.data.description !== undefined && {
                    description: result.data.description,
                }),
                ...(result.data.priority !== undefined && {
                    priority: result.data.priority,
                }),
                ...(result.data.targetDate !== undefined && {
                    targetDate: result.data.targetDate,
                }),
            },
        });
        return res.json({
            success: true,
            data: goal,
        });
    }
    catch (error) {
        console.error("Update goal error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update goal",
        });
    }
});
// =========================================
// DELETE GOAL
// DELETE /api/goals/:id
// =========================================
router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const goalId = req.params.id;
        const existingGoal = await prisma.goal.findFirst({
            where: {
                id: goalId,
                userId: req.userId,
            },
        });
        if (!existingGoal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found",
            });
        }
        await prisma.goal.delete({
            where: {
                id: goalId,
            },
        });
        return res.json({
            success: true,
            message: "Goal deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete goal error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete goal",
        });
    }
});
// =========================================
// ANALYZE GOAL
// POST /api/goals/:id/analyze
// =========================================
router.post("/:id/analyze", requireAuth, async (req, res) => {
    try {
        const goalId = req.params.id;
        const goal = await prisma.goal.findFirst({
            where: {
                id: goalId,
                userId: req.userId,
            },
        });
        if (!goal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found",
            });
        }
        const analysis = await analyzeGoal({
            title: goal.title,
            description: goal.description ?? undefined,
            priority: goal.priority,
            targetDate: goal.targetDate?.toISOString(),
        });
        return res.json({
            success: true,
            data: analysis,
        });
    }
    catch (error) {
        console.error("Goal analysis error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to analyze goal",
        });
    }
});
export default router;
