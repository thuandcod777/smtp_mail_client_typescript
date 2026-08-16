import { type Request, type Response } from "express";
import type SaveOtpUsecase from "../../../usecase/save_otp_usecase.js";
import { z } from "zod";
import type VerifyOtpUsecase from "../../../usecase/verify_otp_usecase.js";
import type { OtpInputDto } from "../../../domain/dtos/otp-input.dto.js";
import type { IUserInputDTO } from "../../../domain/dtos/user-input.dto.js";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const OtpModelSchema: z.ZodType<OtpInputDto> = z.object({
    email: z.string().min(1, { message: 'Email không được để trống' }).regex(emailRegex, { message: 'Email không đúng định dạng chuẩn' }),
    otp: z.string().min(6, { message: 'Mã otp nhập tối thiểu 6 ký tự' }).max(12, { message: 'Mã otp nhập tối đa 12 ký tự' }),
    role: z.string()
}).strict();


const UserSchema: z.ZodType<IUserInputDTO> = z.object({
    name: z.string().nullable(),
    email: z.string(),
    name_company: z.string().nullable(),
    number_phone: z.string().nullable(),
    type: z.string(),
    role: z.string()
}).strict();

export default class OtpController {
    private readonly saveOtpUsecase: SaveOtpUsecase
    private readonly verifyOtpUsecase: VerifyOtpUsecase

    constructor(saveOtpUsecase: SaveOtpUsecase, verifyOtpUsecase: VerifyOtpUsecase) {
        this.saveOtpUsecase = saveOtpUsecase
        this.verifyOtpUsecase = verifyOtpUsecase
    }

    public async saveOtp(req: Request, res: Response) {
        try {
            const safeUserData = UserSchema.parse(req.body);

            const result = await this.saveOtpUsecase.execute(safeUserData);

            return res.status(result.status).json({ data: { success: result.success, message: result.message } });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ error: errorMessage });
        }
    }

    public async verifyOtp(req: Request, res: Response) {
        try {
            const safeOtpData = OtpModelSchema.parse(req.body);

            const result = await this.verifyOtpUsecase.execute(safeOtpData);

            if (!result.success) {
                return res.status(result.status).json({ data: { success: result.success, message: result.message } });
            }

            return res.status(result.status).json({ data: { session: result.data, success: result.success, message: result.message } });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ error: errorMessage });
        }
    }

}