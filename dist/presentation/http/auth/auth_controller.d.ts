import type AuthUsecase from "../../../usecase/auth_usecase.js";
import { type Request, type Response } from "express";
import type SignOutUsecase from "../../../usecase/sign_out_usercase.js";
export default class AuthController {
    private readonly authUsecase;
    private readonly signoutUsecase;
    constructor(authUsecase: AuthUsecase, signoutUsecase: SignOutUsecase);
    signOut(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    save_audit_login_log(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=auth_controller.d.ts.map