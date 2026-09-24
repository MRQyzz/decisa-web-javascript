import { Router } from "express";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import { requireAuth, } from "../middleware/require-auth.js";
const router = Router();
const createTaskSchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(2000).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    estimatedMinutes: z.number().int().positive().optional(),
    dueDate: z.coerce.date().optional(),
    planId: z.string().uuid().optional(),
});
const updateTaskSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(2000).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
    estimatedMinutes: z.number().int().positive().optional(),
    dueDate: z.coerce.date().optional(),
});
// =========================================
// CREATE TASK
// POST /api/tasks
// =========================================
router.post("/", requireAuth, async (req, res) => {
    try {
        const result = createTaskSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid task data",
                errors: result.error.issues,
            });
        }
        const task = await prisma.task.create({
            data: {
                title: result.data.title,
                ...(result.data.description !== undefined && {
                    description: result.data.description,
                }),
                priority: result.data.priority ?? "MEDIUM",
                ...(result.data.estimatedMinutes !== undefined && {
                    estimatedMinutes: result.data.estimatedMinutes,
                }),
                ...(result.data.dueDate !== undefined && {
                    dueDate: result.data.dueDate,
                }),
                ...(result.data.planId !== undefined && {
                    plan: {
                        connect: {
                            id: result.data.planId,
                        },
                    },
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
            data: task,
        });
    }
    catch (error) {
        console.error("Create task error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create task",
        });
    }
});
// =========================================
// GET TASKS
// GET /api/tasks
// =========================================
router.get("/", requireAuth, async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId: req.userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json({
            success: true,
            data: tasks,
        });
    }
    catch (error) {
        console.error("Get tasks error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to fetch tasks",
        });
    }
});
// =========================================
// UPDATE TASK
// PATCH /api/tasks/:id
// =========================================
router.patch("/:id", requireAuth, async (req, res) => {
    try {
        const taskId = req.params.id;
        const result = updateTaskSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid task data",
                errors: result.error.issues,
            });
        }
        const existingTask = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId: req.userId,
            },
        });
        if (!existingTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        const task = await prisma.task.update({
            where: {
                id: taskId,
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
                ...(result.data.status !== undefined && {
                    status: result.data.status,
                    completedAt: result.data.status === "DONE"
                        ? new Date()
                        : null,
                }),
                ...(result.data.estimatedMinutes !== undefined && {
                    estimatedMinutes: result.data.estimatedMinutes,
                }),
                ...(result.data.dueDate !== undefined && {
                    dueDate: result.data.dueDate,
                }),
            },
        });
        return res.json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        console.error("Update task error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update task",
        });
    }
});
// =========================================
// DELETE TASK
// DELETE /api/tasks/:id
// =========================================
router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const taskId = req.params.id;
        const existingTask = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId: req.userId,
            },
        });
        if (!existingTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        await prisma.task.delete({
            where: {
                id: taskId,
            },
        });
        return res.json({
            success: true,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete task error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete task",
        });
    }
});
export default router;
