import {} from "express";
import { z } from "zod";
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const OtpModelSchema = z.object({
    email: z.string().min(1, { message: 'Email không được để trống' }).regex(emailRegex, { message: 'Email không đúng định dạng chuẩn' }),
    otp: z.string().min(6, { message: 'Mã otp nhập tối thiểu 6 ký tự' }).max(12, { message: 'Mã otp nhập tối đa 12 ký tự' }),
    role: z.string()
}).strict();
const UserSchema = z.object({
    name: z.string().nullable(),
    email: z.string(),
    name_company: z.string().nullable(),
    number_phone: z.string().nullable(),
    types: z.string(),
    roles: z.string()
}).strict();
export default class OtpController {
    saveOtpUsecase;
    verifyOtpUsecase;
    logoutUsecase;
    constructor(saveOtpUsecase, verifyOtpUsecase, logoutUsecase) {
        this.saveOtpUsecase = saveOtpUsecase;
        this.verifyOtpUsecase = verifyOtpUsecase;
        this.logoutUsecase = logoutUsecase;
    }
    async saveOtp(req, res) {
        try {
            const safeUserData = UserSchema.parse(req.body);
            const result = await this.saveOtpUsecase.execute(safeUserData);
            return res.status(result.status).json({ data: { success: result.success, message: result.message } });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ error: errorMessage });
        }
    }
    async verifyOtp(req, res) {
        try {
            const safeOtpData = OtpModelSchema.parse(req.body);
            const result = await this.verifyOtpUsecase.execute(safeOtpData);
            if (!result.success) {
                return res.status(result.status).json({ data: { success: result.success, message: result.message } });
            }
            return res.status(result.status).json({ data: { session: result.data, success: result.success, message: result.message } });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ error: errorMessage });
        }
    }
    async logout(req, res) {
        try {
            const { email } = req.body;
            const result = await this.logoutUsecase.execute(email);
            if (!result.success) {
                return res.status(result.status).json({ data: { success: result.success, message: result.message } });
            }
            return res.status(result.status).json({ data: { session: result.data, success: result.success, message: result.message } });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(500).json({ error: errorMessage });
        }
    }
}
//# sourceMappingURL=otp_controller.js.map