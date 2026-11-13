import type { ClientSession, Mongoose } from "mongoose";
import type IOtpRepository from "../../domain/services/iotp_repository.js";
import { OtpSchema, type IOtp } from "../model/otp_model.js";
import { AuthSchema, UserSchema, type IAuthSession, type IUser } from "../model/auth_model.js";

export default class OtpRepository implements IOtpRepository {
    constructor(private readonly client: Mongoose) { }

    public async saveOtp(userId: string, otp: string, session?: ClientSession): Promise<{ success: boolean, message: string }> {
        try {
            const otpModel = this.client.model<IOtp>('Otp', OtpSchema);

            const otpQuery = new otpModel({ user_id: userId, otp: otp });

            await otpQuery.save({ session: session ? session : null });

            return { success: true, message: "Lưu mã otp thành công." };
        } catch (e) {
            return { success: false, message: "Không thể cung cấp mã otp." };
        }

    }

    public async verifyOtp(otp: string, session?: ClientSession): Promise<{ success: boolean, id: string | null, message: string }> {
        const otpModel = this.client.model<IOtp>('Otp', OtpSchema);

        const otpQuery = otpModel.findOne({ otp: otp });

        if (session) {
            otpQuery.session(session);
        }

        const isVerified = await otpQuery.lean();

        if (!isVerified) {
            return { success: false, id: null, message: "Mã OTP không chính xác." };
        }

        return { success: true, id: isVerified._id.toString(), message: "Xác thực mã otp thành công." }
    }

    public async deleteOtp(id: string | null, session?: ClientSession): Promise<{ success: boolean, message: string }> {
        const otpModel = this.client.model<IOtp>('Otp', OtpSchema);

        const deleteOptions: { session?: ClientSession } = {};
        if (session) {
            deleteOptions.session = session;
        }

        await otpModel.deleteOne({ _id: id }, deleteOptions);

        return { success: true, message: "Xóa mã otp thành công." };
    }

    public async deleteOtpNotUsed(userId: string, session?: ClientSession): Promise<{ success: boolean; message: string; }> {
        const otpModel = this.client.model<IOtp>('Otp', OtpSchema);

        const deleteOptions: { session?: ClientSession } = {};

        if (session) {
            deleteOptions.session = session;
        }

        await otpModel.deleteOne({ userId: userId }, deleteOptions);

        return { success: true, message: "Xóa mã otp thành công." };
    }



}