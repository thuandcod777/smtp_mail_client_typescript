export default class AuthUsecase {
    auditLoginLogRepository;
    constructor(auditLoginLogRepository) {
        this.auditLoginLogRepository = auditLoginLogRepository;
    }
    async execute(authData) {
        const audit_login_log = await this.auditLoginLogRepository.audit_login_log(authData);
        return true;
    }
}
//# sourceMappingURL=auth_usecase.js.map