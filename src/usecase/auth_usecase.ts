import type { AuthModel } from "../domain/entities/auth.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";

export default class AuthUsecase {
    constructor(private auditLoginLogRepository: IAuthRepository) { }
    public async execute(authData: AuthModel): Promise<boolean> {
        const audit_login_log = await this.auditLoginLogRepository.audit_login_log(authData);
        return true;
    }
}