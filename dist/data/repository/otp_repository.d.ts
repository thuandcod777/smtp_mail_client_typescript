import type { ClientSession, Mongoose } from "mongoose";
import type IOtpRepository from "../../domain/services/iotp_repository.js";
export default class OtpRepository implements IOtpRepository {
    private readonly client;
    constructor(client: Mongoose);
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
    logout(user_id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=otp_repository.d.ts.map