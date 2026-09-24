import { verifyAccessToken } from "../lib/auth.js";
export function requireAuth(req, res, next) {
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }
    try {
        const payload = verifyAccessToken(token);
        if (payload.type !== "access") {
            return res.status(401).json({
                message: "Invalid access token",
            });
        }
        req.userId = payload.userId;
        next();
    }
    catch {
        return res.status(401).json({
            message: "Invalid or expired access token",
        });
    }
}
