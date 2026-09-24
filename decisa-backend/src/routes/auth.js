import { Router } from "express";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import { comparePassword, createAccessToken, createRefreshToken, hashPassword, hashRefreshToken, verifyRefreshToken, } from "../lib/auth.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();
const registerSchema = z.object({
    displayName: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50),
    email: z
        .string()
        .trim()
        .email("Invalid email addresss")
        .transform((value) => value.toLowerCase()),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});
const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email()
        .transform((value) => value.toLowerCase()),
    password: z.string().min(1),
});
function setAuthCookies(res, accessToken, refreshToken) {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
}
router.post("/register", async (req, res) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: result.error.flatten(),
            });
        }
        const { displayName, email, password } = result.data;
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered",
            });
        }
        const passwordHash = await hashPassword(password);
        const resultTransaction = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    displayName,
                    email,
                    passwordHash,
                },
            });
            // Buat refresh token yang benar-benar menggunakan user ID
            const realRefreshToken = createRefreshToken(user.id);
            const realRefreshTokenHash = hashRefreshToken(realRefreshToken);
            const session = await tx.session.create({
                data: {
                    userId: user.id,
                    refreshTokenHash: realRefreshTokenHash,
                    expiresAt: new Date(Date.now() +
                        30 * 24 * 60 * 60 * 1000),
                    userAgent: req.get("user-agent") ?? null,
                    ipAddress: req.ip ?? null,
                },
            });
            const accessToken = createAccessToken(user.id);
            return {
                user,
                accessToken,
                refreshToken: realRefreshToken,
                session,
            };
        });
        res.cookie("accessToken", resultTransaction.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshToken", resultTransaction.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({
            user: {
                id: resultTransaction.user.id,
                email: resultTransaction.user.email,
                displayName: resultTransaction.user.displayName,
            },
        });
    }
    catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: result.error.flatten(),
            });
        }
        const { email, password } = result.data;
        // 1. Cari user
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        // 2. Cek password
        const passwordValid = await comparePassword(password, user.passwordHash);
        if (!passwordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        // 3. Buat token
        const accessToken = createAccessToken(user.id);
        const refreshToken = createRefreshToken(user.id);
        // 4. Hash refresh token sebelum disimpan
        const refreshTokenHash = hashRefreshToken(refreshToken);
        // 5. Buat session + update lastLoginAt
        await prisma.$transaction(async (tx) => {
            await tx.session.create({
                data: {
                    userId: user.id,
                    refreshTokenHash,
                    expiresAt: new Date(Date.now() +
                        30 * 24 * 60 * 60 * 1000),
                    userAgent: req.get("user-agent") ?? null,
                    ipAddress: req.ip ?? null,
                },
            });
            await tx.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    lastLoginAt: new Date(),
                },
            });
        });
        // 6. Simpan token dalam HttpOnly cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        // 7. Jangan pernah mengirim passwordHash
        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
router.get("/me", requireAuth, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                id: true,
                email: true,
                displayName: true,
                username: true,
                avatarUrl: true,
                bio: true,
                location: true,
                websiteUrl: true,
                githubUrl: true,
                createdAt: true,
                lastLoginAt: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.json({
            user,
        });
    }
    catch (error) {
        console.error("Get current user error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
router.post("/logout", async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        console.log("Refresh token exists:", !!refreshToken);
        if (refreshToken) {
            const refreshTokenHash = hashRefreshToken(refreshToken);
            const result = await prisma.session.updateMany({
                where: {
                    refreshTokenHash,
                    revokedAt: null,
                },
                data: {
                    revokedAt: new Date(),
                },
            });
            console.log("Sessions revoked:", result.count);
        }
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        return res.status(200).json({
            message: "Logged out successfully",
        });
    }
    catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
// Supaya login tetap bertahan ketika token 15 menit expired
router.post("/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token required",
            });
        }
        const payload = verifyRefreshToken(refreshToken);
        if (payload.type !== "refresh") {
            return res.status(401).json({
                message: "Invalid refresh token",
            });
        }
        const refreshTokenHash = hashRefreshToken(refreshToken);
        const session = await prisma.session.findFirst({
            where: {
                userId: payload.userId,
                refreshTokenHash,
                revokedAt: null,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });
        if (!session) {
            return res.status(401).json({
                message: "Session expired or revoked",
            });
        }
        const newAccessToken = createAccessToken(payload.userId);
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });
        return res.json({
            message: "Access token refreshed",
        });
    }
    catch {
        return res.status(401).json({
            message: "Invalid refresh token",
        });
    }
});
export default router;
