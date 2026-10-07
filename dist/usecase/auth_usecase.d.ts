import type { AuthModel } from "../domain/entities/auth.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";
export default class AuthUsecase {
    private auditLoginLogRepository;
    constructor(auditLoginLogRepository: IAuthRepository);
    execute(authData: AuthModel): Promise<boolean>;
}
//# sourceMappingURL=auth_usecase.d.ts.map