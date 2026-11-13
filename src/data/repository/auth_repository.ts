import { type QueryOptions, type ClientSession, type Mongoose } from "mongoose";
import { AuthModel, AuthSession } from "../../domain/entities/auth.js";
import type IAuthRepository from "../../domain/services/iauth_repository.js";
import { AuthAuditSchema, AuthSchema, UserSchema, type IAuthAudit, type IAuthSession, type IUser } from "../model/auth_model.js";
import type { IUserInputDTO } from "../../domain/dtos/user-input.dto.js";
import User from "../../domain/entities/user.js";
import { ContractSchema, type IContract } from "../model/contract_model.js";
import { Contract } from "../../domain/entities/contract.js";


export default class AuthRepository implements IAuthRepository {
    constructor(private readonly client: Mongoose) { }

    public async startSession(): Promise<ClientSession> {
        return this.client.startSession();
    }

    public async checkUser(email: string, session?: ClientSession): Promise<{ success: boolean, userData: User | null, message: string }> {
        const userModel = this.client.model<IUser>('User', UserSchema);
        const userQuery = userModel.findOne({ email: email });

        if (session) {
            userQuery.session(session);
        }

        const user = await userQuery.lean();

        if (!user) {
            return { success: false, userData: null, message: "Không tìm thấy tài khoản email đăng ký." }
        }

        const userData = User.fromJson({
            _id: user._id.toString(),
            user_name: user.user_name ?? null,
            company_name: user.company_name ?? null,
            email: user.email ?? null,
            number_phone: user.number_phone ?? null,
            is_type: user.is_type,
            is_role: user.is_role,
            is_login: user.is_login
        });


        return {
            success: true, userData: userData, message: "Tìm kiếm email thành công."
        };
    }


    public async getContract(userId: string, session?: ClientSession): Promise<{ success: boolean, contractData: Contract | null, message: string }> {
        const contractModel = this.client.model<IContract>('Contract', ContractSchema);

        const contractQuery = contractModel.findOne({ user_id: userId });

        if (session) {
            contractQuery.session(session);
        }

        const contract = await contractQuery.lean();

        if (!contract) {
            return { success: false, contractData: null, message: "Không tìm thấy thông tin hợp đồng." };
        }

        const contractData = Contract.fromJson({
            user_id: contract.user_id.toString(),
            contract_code: contract.contract_code,
            step_contract: contract.step_contract,
            contract_details: contract.contract_details,
            scope: contract.scope,
            contract_pdf: contract.contract_pdf,
            is_success: contract.is_success
        });

        return { success: true, contractData: contractData, message: "Tìm thấy thông tin hợp đồng thành công." };
    }

    public async registerUser(userData: IUserInputDTO, session?: ClientSession): Promise<{ success: boolean, userData: User | null, message: string }> {

        /*  if (!userData.email || !userData.name || !userData.number_phone) {
             return { success: false, id: "", message: "Vui lòng nhập đầy đủ các thông tin bắt buộc." };
         }
 
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(userData.email)) {
             return { success: false, id: "", message: "Định dạng email không hợp lệ." };
         }
 
         const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
         if (!phoneRegex.test(userData.number_phone)) {
             return { success: false, id: "", message: "Số điện thoại không đúng định dạng." };
         } */

        const userModel = this.client.model<IUser>('User', UserSchema);

        const userQuery = new userModel({
            email: userData.email,
            user_name: userData.user_name ?? null,
            company_name: userData.company_name ?? null,
            number_phone: userData.number_phone ?? null,
            is_type: userData.is_type,
            is_role: userData.is_role,
            is_login: userData.is_login
        });

        await userQuery.save({ session: session ? session : null });

        const createdUser: User = {
            _id: userQuery._id.toString(),
            user_name: userQuery.user_name,
            email: userQuery.email,
            company_name: userQuery.company_name,
            number_phone: userQuery.number_phone,
            is_type: userQuery.is_type,
            is_role: userQuery.is_role,
            is_login: userQuery.is_login
        };

        return {
            success: true, userData: createdUser, message: "Đã đăng ký thông tin tài khoản thành công."
        };
    }

    public async updateSession(userId: string, refresh_token: string, access_token: string, is_active: boolean, is_block: boolean, session?: ClientSession): Promise<{ success: boolean, id: string, message: string }> {
        const sessionModel = this.client.model<IAuthSession>('Session', AuthSchema);

        const sessionQuery = new sessionModel({
            user_id: userId,
            refresh_token: refresh_token,
            access_token: access_token,
            is_active: is_active,
            is_block: is_block
        });

        await sessionQuery.save({ session: session ? session : null });

        return { success: true, id: sessionQuery._id.toString(), message: "Đã cập nhật phiên bản thành công." }
    }

    public async updateStatusSession(sessionId: string, session?: ClientSession): Promise<{ success: boolean, message: string }> {
        const sessionModel = this.client.model<IAuthSession>('Session', AuthSchema);

        if (sessionId === null) {
            return { success: false, message: "Lỗi không tìm id phiên người dùng." };
        }

        const updateOptions: QueryOptions & { returnDocument: 'after' | 'before' } = {
            returnDocument: 'after'
        };

        if (session) {
            updateOptions.session = session;
        }

        const currentSession = await sessionModel.findOneAndUpdate({ _id: sessionId }, {
            $set: {
                is_active: true
            }
        }, updateOptions).lean();

        if (!currentSession) {
            return { success: false, message: "Lỗi không tìm phiên người dùng." };
        }

        return { success: true, message: "Cập nhật trạng thái phiên hoạt động thành công" };
    }

    public async checkUserSession(userId: string | null, session?: ClientSession): Promise<{ success: boolean, data: AuthSession | null, message: string }> {

        const sessionModel = this.client.model<IAuthSession>('Session', AuthSchema);

        try {
            if (!userId) {
                return { success: false, data: null, message: "Không tìm thấy phiên tài khoản." };
            }

            const sessionQuery = sessionModel.findOne({ user_id: userId });

            if (session) {
                sessionQuery.session(session);
            }

            const currentSession = await sessionQuery.lean();

            if (!currentSession) {

                return { success: false, data: null, message: "Không tìm thấy phiên tài khoản." };
            }

            const authData = AuthSession.fromJson({
                _id: currentSession!._id.toString(),
                user_id: currentSession!.user_id.toString(),
                refresh_token: currentSession!.refresh_token,
                access_token: currentSession!.access_token,
                is_active: currentSession!.is_active,
                is_block: currentSession!.is_block,
            });

            return { success: true, data: authData, message: "Kiểm tra phiên tài khoản thành công." };
        } catch (e) {
            return { success: false, data: null, message: "Error." };
        }


    }

    public async deleteOldSession(sessionId: string, session?: ClientSession): Promise<{ success: boolean, message: string }> {
        const sessionModel = this.client.model<IAuthSession>("Session", AuthSchema);

        const deleteOptions: { session?: ClientSession } = {};

        if (session) {
            deleteOptions.session = session;
        }


        await sessionModel.deleteOne({ _id: sessionId }, deleteOptions);

        return { success: true, message: "Đã xóa phiên tài khoản cũ thành công." };
    }

    public async audit_login_log(auditData: AuthModel): Promise<AuthModel> {
        const authModel = this.client.model<IAuthAudit>('Audit', AuthAuditSchema);

        const saveAudit = await authModel.create(auditData);

        const raw = saveAudit.toObject();

        return AuthModel.fromJson(raw);
    }

    public async signOut(user_id: string): Promise<{ sucess: boolean; message: string; }> {
        const sessionModel = this.client.model<IAuthSession>("Session", AuthSchema);


        const updateOptions: QueryOptions & { returnDocument: 'after' | 'before' } = {
            returnDocument: 'after'
        };

        /* if (session) {
            updateOptions.session = session;
        } */

        const sessionQuery = await sessionModel.findOneAndUpdate({ user_id: user_id }, {
            $set: {
                "is_active": false
            }
        }, updateOptions);

        if (!sessionQuery) {
            return { sucess: false, message: "Lỗi đăng xuất." };
        }

        return { sucess: true, message: "Đăng xuất thành công." };
    }
}