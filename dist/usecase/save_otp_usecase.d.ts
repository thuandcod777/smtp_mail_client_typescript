import type { IMailerService } from "../domain/services/imailer_service.js";
import type IOtpRepository from "../domain/services/iotp_repository.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";
import type { IUserInputDTO } from "../domain/dtos/user-input.dto.js";
import type ITokenService from "../domain/services/itoken_service.js";
import type IRedisService from "../domain/services/iredis_repository.js";
import { ResponseDto } from "../domain/dtos/response.js";
export default class SaveOtpUsecase {
    private authRepository;
    private otpRepository;
    private mailerService;
    private tokenService;
    private redisService;
    constructor(authRepository: IAuthRepository, otpRepository: IOtpRepository, mailerService: IMailerService, tokenService: ITokenService, redisService: IRedisService);
    execute(userData: IUserInputDTO): Promise<ResponseDto>;
}
//# sourceMappingURL=save_otp_usecase.d.ts.map