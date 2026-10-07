import { Router } from "express";
import type { MailerService } from "../../../data/helper/mailer_service.js";
import type IOtpRepository from "../../../domain/services/iotp_repository.js";
import type IAuthRepository from "../../../domain/services/iauth_repository.js";
import type ITokenService from "../../../domain/services/itoken_service.js";
import type IRedisService from "../../../domain/services/iredis_repository.js";
export default class OtpRouter {
    static configure(authRepository: IAuthRepository, otpRepository: IOtpRepository, mailerService: MailerService, tokenService: ITokenService, redisService: IRedisService): Router;
    private static composeController;
}
//# sourceMappingURL=otp_router.d.ts.map