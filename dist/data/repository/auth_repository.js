import {} from "mongoose";
import { AuthModel, AuthSession } from "../../domain/entities/auth.js";
import { AuthAuditSchema, AuthSchema, UserSchema } from "../model/auth_model.js";
import User from "../../domain/entities/user.js";
import { ContractSchema } from "../model/contract_model.js";
import { Contract } from "../../domain/entities/contract.js";
export default class AuthRepository {
    client;
    constructor(client) {
        this.client = client;
    }
    async startSession() {
        return this.client.startSession();
    }
    async checkUser(email, session) {
        const userModel = this.client.model('User', UserSchema);
        const userQuery = userModel.findOne({ email: email });
        if (session) {
            userQuery.session(session);
        }
        const user = await userQuery.lean();
        if (!user) {
            return { success: false, userData: null, message: "Không tìm thấy tài khoản email đăng ký." };
        }
        const userData = User.fromJson({
            _id: user._id.toString(),
            name: user.name ?? null,
            name_company: user.name_company ?? null,
            email: user.email ?? null,
            number_phone: user.number_phone ?? null,
            types: user.types,
            roles: user.roles
        });
        return {
            success: true, userData: userData, message: "Tìm kiếm email thành công."
        };
    }
    async registerUser(userData, session) {
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
        const userModel = this.client.model('User', UserSchema);
        const userQuery = new userModel({
            name: userData.name ?? null,
            email: userData.email,
            name_company: userData.name_company ?? null,
            number_phone: userData.number_phone ?? null,
            types: userData.types,
            roles: userData.roles,
        });
        await userQuery.save({ session: session ? session : null });
        const createdUser = {
            _id: userQuery._id.toString(),
            name: userQuery.name,
            email: userQuery.email, // Đã sửa lỗi: trước đó bạn gán lầm userQuery.name vào email
            name_company: userQuery.name_company,
            number_phone: userQuery.number_phone,
            types: userQuery.types,
            roles: userQuery.roles
        };
        return {
            success: true, userData: createdUser, message: "Đã đăng ký thông tin tài khoản thành công."
        };
    }
    async updateSession(userId, refresh_token, access_token, is_active, is_block, session) {
        const sessionModel = this.client.model('Session', AuthSchema);
        const sessionQuery = new sessionModel({
            user_id: userId,
            refresh_token: refresh_token,
            access_token: access_token,
            is_active: is_active,
            is_block: is_block
        });
        await sessionQuery.save({ session: session ? session : null });
        return { success: true, id: sessionQuery._id.toString(), message: "Đã cập nhật phiên bản thành công." };
    }
    async updateStatusSession(sessionId, session) {
        const sessionModel = this.client.model('Session', AuthSchema);
        if (sessionId === null) {
            return { success: false, message: "Lỗi không tìm id phiên người dùng." };
        }
        const updateOptions = {
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
    async checkUserSession(userId, session) {
        const sessionModel = this.client.model('Session', AuthSchema);
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
                _id: currentSession._id.toString(),
                user_id: currentSession.user_id.toString(),
                refresh_token: currentSession.refresh_token,
                access_token: currentSession.access_token,
                is_active: currentSession.is_active,
                is_block: currentSession.is_block,
            });
            return { success: true, data: authData, message: "Kiểm tra phiên tài khoản thành công." };
        }
        catch (e) {
            return { success: false, data: null, message: "Error." };
        }
    }
    async deleteOldSession(sessionId, session) {
        const sessionModel = this.client.model("Session", AuthSchema);
        const deleteOptions = {};
        if (session) {
            deleteOptions.session = session;
        }
        await sessionModel.deleteOne({ _id: sessionId }, deleteOptions);
        return { success: true, message: "Đã xóa phiên tài khoản cũ thành công." };
    }
    async getContract(userId, session) {
        const contractModel = this.client.model('Contract', ContractSchema);
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
    async audit_login_log(auditData) {
        const authModel = this.client.model('Audit', AuthAuditSchema);
        const saveAudit = await authModel.create(auditData);
        const raw = saveAudit.toObject();
        return AuthModel.fromJson(raw);
    }
    async signOut(token, role) {
        const sessionModel = this.client.model("Session", AuthSchema);
        const updateOptions = {
            returnDocument: 'after'
        };
        /* if (session) {
            updateOptions.session = session;
        } */
        let data = {};
        if (role === 'client') {
            data = { access_token: token };
        }
        else if (role === 'cooperative') {
            data = { refresh_token: token };
        }
        const sessionQuery = await sessionModel.findOneAndUpdate(data, {
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
//# sourceMappingURL=auth_repository.js.map