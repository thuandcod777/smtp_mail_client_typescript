import jwt from "jsonwebtoken";

export const JWT_SECRET = "nashmartin1026";

export type AuthTokenClaims = jwt.JwtPayload & {
    sub?: string;
    data?: string;
};