import type { ClientSession } from "mongoose";
export default interface IOtpRepository {
    saveOtp(userId: string, otp: string, session?: ClientSession): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyOtp(otp: string, session?: ClientSession): Promise<{
        success: boolean;
        id: string | null;
        message: string;
    }>;
    deleteOtp(id: string | null, session?: ClientSession): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteOtpNotUsed(userId: string, session?: ClientSession): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=iotp_repository.d.ts.map