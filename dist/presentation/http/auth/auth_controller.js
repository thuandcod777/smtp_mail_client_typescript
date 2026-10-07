import { success, z } from "zod";
import {} from "express";
import { AuthModel } from "../../../domain/entities/auth.js";
const OTPAction = z.enum(['Register', 'Login', 'ResetPassword']);
const AuthModelSchema = z.object({
    email: z.string(),
    action: OTPAction
});
const LogOutModelSchema = z.object({
    token: z.string(),
    role: z.string()
}).strict();
export default class AuthController {
    authUsecase;
    signoutUsecase;
    constructor(authUsecase, signoutUsecase) {
        this.authUsecase = authUsecase, this.signoutUsecase = signoutUsecase;
    }
    async signOut(req, res) {
        const safeLogOutData = LogOutModelSchema.parse(req.body);
        const result = await this.signoutUsecase.execute(safeLogOutData);
        return res.status(result.status).json({ data: { success: result.success, message: result.message } });
    }
    async save_audit_login_log(req, res) {
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        let finalClientIp = 'unknown';
        if (Array.isArray(clientIp)) {
            finalClientIp = clientIp[0] || 'unknown';
        }
        else if (typeof clientIp === 'string') {
            finalClientIp = clientIp.split(',')[0]?.trim() || 'unknown';
        }
        const userAgent = req.headers['user-agent'];
        const finalUserAgent = userAgent ?? 'unknown';
        const safeAuthData = AuthModelSchema.parse(req.body);
        const authData = new AuthModel({
            email: safeAuthData.email,
            ip_address: finalClientIp,
            user_agent: finalUserAgent,
            action: 'Login'
        });
        const isSuccess = await this.authUsecase.execute(authData);
        return res.status(200).json({ data: { isSuccess: isSuccess, status: "Gửi thành công" } });
    }
}
//# sourceMappingURL=auth_controller.js.map