import { z } from "zod";
import { type Request, type Response } from "express";
import { AuthModel } from "../../../domain/entities/auth.js";
import type { ILogoutInputDTO } from "../../../domain/dtos/logout-input.js";
import type { IUserInputDTO } from "../../../domain/dtos/user-input.dto.js";
import type GoogleLoginUsecase from "../../../usecase/google_login_usecase.js";
import type LogOutUsecase from "../../../usecase/logout_out_usercase.js";
import type SaveUserGoogleUsecase from "../../../usecase/google_login_usecase.js";

const OTPAction = z.enum(['Register', 'Login', 'ResetPassword']);

const UserSchema: z.ZodType<IUserInputDTO> = z.object({
    email: z.string(),
    is_type: z.string(),
    is_role: z.string(),
    is_login: z.string()
}).strict();

const AuthModelSchema = z.object({
    email: z.string(),
    action: OTPAction
})

type IAuthModel = z.infer<typeof AuthModelSchema>;

const LogOutModelSchema: z.ZodType<ILogoutInputDTO> = z.object({
    token: z.string(),
}).strict();

export default class AuthController {
    private readonly saveUserGoogleUsecase: SaveUserGoogleUsecase;
    private readonly logOutUsecase: LogOutUsecase;

    constructor(saveUserGoogleUsecase: SaveUserGoogleUsecase, logOutUsecase: LogOutUsecase) {
        this.saveUserGoogleUsecase = saveUserGoogleUsecase, this.logOutUsecase = logOutUsecase
    }

    public async saveUserGoogle(req: Request, res: Response) {
        const safeUserData = UserSchema.parse(req.body);

        const result = await this.saveUserGoogleUsecase.execute(safeUserData);

        return res.status(result.status).json({ data: { user: result.data, success: result.success, message: result.message } });
    }

    public async logOut(req: Request, res: Response) {
        const safeLogOutData = LogOutModelSchema.parse(req.body);

        const result = await this.logOutUsecase.execute(safeLogOutData);

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

        /* const isSuccess = await this.authUsecase.execute(authData); */

        return res.status(200).json({ data: { isSuccess: true, status: "Gửi thành công" } })
    }
}