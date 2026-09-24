import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? "";
if (!ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
}
if (!REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
}
export const ACCESS_TOKEN_EXPIRES_IN = 15 * 60;
export const REFRESH_TOKEN_EXPIRES_IN_DAYS = "30";
export async function hashPassword(password) {
    return bcrypt.hash(password, 12);
}
export async function comparePassword(password, hashPassword) {
    return bcrypt.compare(password, hashPassword);
}
export function createAccessToken(userId) {
    return jwt.sign({
        userId,
        type: "access",
    }, ACCESS_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
}
export function createRefreshToken(userId) {
    return jwt.sign({
        userId,
        type: "refresh",
        jti: crypto.randomUUID(),
    }, REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN_DAYS,
    });
}
export function verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_SECRET);
}
export function verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_SECRET);
}
export function hashRefreshToken(token) {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}
