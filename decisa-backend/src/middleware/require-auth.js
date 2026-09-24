import { verifyAccessToken } from "../lib/auth.js";
export function requireAuth(req, res, next) {
    try {
        const accessToken = req.cookies?.accessToken;
        if (!accessToken) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }
        const payload = verifyAccessToken(accessToken);
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
