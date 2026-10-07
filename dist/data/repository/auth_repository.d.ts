import { type ClientSession, type Mongoose } from "mongoose";
import { AuthModel, AuthSession } from "../../domain/entities/auth.js";
import type IAuthRepository from "../../domain/services/iauth_repository.js";
import type { IUserInputDTO } from "../../domain/dtos/user-input.dto.js";
import User from "../../domain/entities/user.js";
import { Contract } from "../../domain/entities/contract.js";
export default class AuthRepository implements IAuthRepository {
    private readonly client;
    constructor(client: Mongoose);
    startSession(): Promise<ClientSession>;
    checkUser(email: string, session?: ClientSession): Promise<{
        success: boolean;
        userData: User | null;
        message: string;
    }>;
    registerUser(userData: IUserInputDTO, session?: ClientSession): Promise<{
        success: boolean;
        userData: User | null;
        message: string;
    }>;
    updateSession(userId: string, refresh_token: string, access_token: string, is_active: boolean, is_block: boolean, session?: ClientSession): Promise<{
        success: boolean;
        id: string;
        message: string;
    }>;
    updateStatusSession(sessionId: string, session?: ClientSession): Promise<{
        success: boolean;
        message: string;
    }>;
    checkUserSession(userId: string | null, session?: ClientSession): Promise<{
        success: boolean;
        data: AuthSession | null;
        message: string;
    }>;
    deleteOldSession(sessionId: string, session?: ClientSession): Promise<{
        success: boolean;
        message: string;
    }>;
    getContract(userId: string, session?: ClientSession): Promise<{
        success: boolean;
        contractData: Contract | null;
        message: string;
    }>;
    audit_login_log(auditData: AuthModel): Promise<AuthModel>;
    signOut(token: string, role: string): Promise<{
        sucess: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=auth_repository.d.ts.map