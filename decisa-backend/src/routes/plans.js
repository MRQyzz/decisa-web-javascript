import { Router } from "express";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import { requireAuth, } from "../middleware/require-auth.js";
const router = Router();
const createPlanSchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(2000).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    dueDate: z.coerce.date().optional(),
});
const updatePlanSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(2000).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    dueDate: z.coerce.date().optional(),
});
// ========================================
// CREATE PLAN
// POST /api/plans
// ========================================
router.post("/", requireAuth, async (req, res) => {
    try {
        const result = createPlanSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid plan data",
                errors: result.error.flatten(),
            });
        }
        const plan = await prisma.plan.create({
            data: {
                title: result.data.title,
                priority: result.data.priority ?? "MEDIUM",
                ...(result.data.description !== undefined && {
                    description: result.data.description,
                }),
                ...(result.data.dueDate !== undefined && {
                    dueDate: result.data.dueDate,
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
            data: plan,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create plan",
        });
    }
});
// ========================================
// GET ALL PLANS
// GET /api/plans
// ========================================
router.get("/", requireAuth, async (req, res) => {
    try {
        const plans = await prisma.plan.findMany({
            where: {
                userId: req.userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json({
            success: true,
            data: plans,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch plans",
        });
    }
});
// ========================================
// GET SINGLE PLAN
// GET /api/plans/:id
// ========================================
router.get("/:id", requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await prisma.plan.findFirst({
            where: {
                id,
                userId: req.userId,
            },
        });
        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found",
            });
        }
        return res.json({
            success: true,
            data: plan,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch plan",
        });
    }
});
// ========================================
// UPDATE PLAN
// PATCH /api/plans/:id
// ========================================
router.patch("/:id", requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = updatePlanSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid plan data",
                errors: result.error.flatten(),
            });
        }
        // Pastikan plan memang milik user yang sedang login
        const existingPlan = await prisma.plan.findFirst({
            where: {
                id,
                userId: req.userId,
            },
        });
        if (!existingPlan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found",
            });
        }
        const plan = await prisma.plan.update({
            where: {
                id,
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
                ...(result.data.dueDate !== undefined && {
                    dueDate: result.data.dueDate,
                }),
            },
        });
        return res.json({
            success: true,
            data: plan,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update plan",
        });
    }
});
// ========================================
// DELETE PLAN
// DELETE /api/plans/:id
// ========================================
router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        // Pastikan plan memang milik user yang sedang login
        const existingPlan = await prisma.plan.findFirst({
            where: {
                id,
                userId: req.userId,
            },
        });
        if (!existingPlan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found",
            });
        }
        await prisma.plan.delete({
            where: {
                id,
            },
        });
        return res.json({
            success: true,
            message: "Plan deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete plan",
        });
    }
});
export default router;
