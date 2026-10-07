import type { AuthModel, AuthSession } from "../entities/auth.js";
import type { IUserInputDTO } from "../dtos/user-input.dto.js";
import type { ClientSession } from "mongoose";
import type User from "../entities/user.js";
import type { Contract } from "../entities/contract.js";

export default interface IAuthRepository {
    startSession(): Promise<ClientSession>;
    registerUser(userInput: IUserInputDTO, session?: ClientSession): Promise<{ success: boolean, userData: User | null, message: string }>;
    updateSession(userId: string, refreshToken: string | null, accessToken: string | null, isActive: boolean, isBlock: boolean, session?: ClientSession): Promise<{ success: boolean, id: string, message: string }>;
    updateStatusSession(sessionId: string, session?: ClientSession): Promise<{ success: boolean, message: string }>;
    checkUserSession(userId: string | null, session?: ClientSession): Promise<{ success: boolean, data: AuthSession | null, message: string }>;
    checkUser(email: string, session?: ClientSession): Promise<{ success: boolean, userData: User | null, message: string }>;
    deleteOldSession(sessionId: string, session?: ClientSession): Promise<{ success: boolean, message: string }>;
    getContract(userId: string, session?: ClientSession): Promise<{ success: boolean, contractData: Contract | null, message: string }>;
    signOut(token: string, role: string): Promise<{ sucess: boolean, message: string }>;
    audit_login_log(auditData: AuthModel): Promise<AuthModel>;
}