import { success, z } from "zod";
import type AuthUsecase from "../../../usecase/auth_usecase.js";
import { type Request, type Response } from "express";
import { AuthModel } from "../../../domain/entities/auth.js";
import type SignOutUsecase from "../../../usecase/sign_out_usercase.js";
import type { ILogoutInputDTO } from "../../../domain/dtos/logout-input.js";


const OTPAction = z.enum(['Register', 'Login', 'ResetPassword']);

const AuthModelSchema = z.object({
    email: z.string(),
    action: OTPAction
})

type IAuthModel = z.infer<typeof AuthModelSchema>;

const LogOutModelSchema: z.ZodType<ILogoutInputDTO> = z.object({
    token: z.string(),
    role: z.string()
}).strict();

export default class AuthController {
    private readonly authUsecase: AuthUsecase;
    private readonly signoutUsecase: SignOutUsecase;

    constructor(authUsecase: AuthUsecase, signoutUsecase: SignOutUsecase) {
        this.authUsecase = authUsecase, this.signoutUsecase = signoutUsecase
    }

    public async signOut(req: Request, res: Response) {
        const safeLogOutData = LogOutModelSchema.parse(req.body);
        const result = await this.signoutUsecase.execute(safeLogOutData);

        return res.status(result.status).json({ data: { success: result.success, message: result.message } });
    }

    public async save_audit_login_log(req: Request, res: Response) {
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        let finalClientIp: string = 'unknown';

        if (Array.isArray(clientIp)) {
            finalClientIp = clientIp[0] || 'unknown';
        } else if (typeof clientIp === 'string') {
            finalClientIp = clientIp.split(',')[0]?.trim() || 'unknown';
        }

        const userAgent = req.headers['user-agent'];
        const finalUserAgent = userAgent ?? 'unknown';

        const safeAuthData: IAuthModel = AuthModelSchema.parse(req.body);

        const authData = new AuthModel({
            email: safeAuthData.email,
            ip_address: finalClientIp,
            user_agent: finalUserAgent,
            action: 'Login'
        });

        const isSuccess = await this.authUsecase.execute(authData);

        return res.status(200).json({ data: { isSuccess: isSuccess, status: "Gửi thành công" } })
    }
}