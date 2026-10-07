import { OtpSchema } from "../model/otp_model.js";
export default class OtpRepository {
    client;
    constructor(client) {
        this.client = client;
    }
    async saveOtp(userId, otp, session) {
        try {
            const otpModel = this.client.model('Otp', OtpSchema);
            const otpQuery = new otpModel({ user_id: userId, otp: otp });
            await otpQuery.save({ session: session ? session : null });
            return { success: true, message: "Lưu mã otp thành công." };
        }
        catch (e) {
            return { success: false, message: "Không thể cung cấp mã otp." };
        }
    }
    async verifyOtp(otp, session) {
        const otpModel = this.client.model('Otp', OtpSchema);
        const otpQuery = otpModel.findOne({ otp: otp });
        if (session) {
            otpQuery.session(session);
        }
        const isVerified = await otpQuery.lean();
        if (!isVerified) {
            return { success: false, id: null, message: "Mã OTP không chính xác." };
        }
        return { success: true, id: isVerified._id.toString(), message: "Xác thực mã otp thành công." };
    }
    async deleteOtp(id, session) {
        const otpModel = this.client.model('Otp', OtpSchema);
        const deleteOptions = {};
        if (session) {
            deleteOptions.session = session;
        }
        await otpModel.deleteOne({ _id: id }, deleteOptions);
        return { success: true, message: "Xóa mã otp thành công." };
    }
    async deleteOtpNotUsed(userId, session) {
        const otpModel = this.client.model('Otp', OtpSchema);
        const deleteOptions = {};
        if (session) {
            deleteOptions.session = session;
        }
        await otpModel.deleteOne({ userId: userId }, deleteOptions);
        return { success: true, message: "Xóa mã otp thành công." };
    }
}
//# sourceMappingURL=otp_repository.js.map