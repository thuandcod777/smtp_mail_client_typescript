import { type Request, type Response } from "express";
import type SaveOtpUsecase from "../../../usecase/save_otp_usecase.js";
import { z } from "zod";
import type VerifyOtpUsecase from "../../../usecase/verify_otp_usecase.js";
import type { IOtpInputDto } from "../../../domain/dtos/otp-input.dto.js";
import type LogoutUsecase from "../../../usecase/logout_usecase.js";
export declare const OtpModelSchema: z.ZodType<IOtpInputDto>;
export default class OtpController {
    private readonly saveOtpUsecase;
    private readonly verifyOtpUsecase;
    private readonly logoutUsecase;
    constructor(saveOtpUsecase: SaveOtpUsecase, verifyOtpUsecase: VerifyOtpUsecase, logoutUsecase: LogoutUsecase);
    saveOtp(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyOtp(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=otp_controller.d.ts.map