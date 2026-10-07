import type IOtpRepository from "../domain/services/iotp_repository.js";
import { ResponseDto } from "../domain/dtos/response.js";
import type { IOtpInputDto } from "../domain/dtos/otp-input.dto.js";
import type IRedisService from "../domain/services/iredis_repository.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";
export default class VerifyOtpUsecase {
    private authRepository;
    private otpRepository;
    private redisService;
    constructor(authRepository: IAuthRepository, otpRepository: IOtpRepository, redisService: IRedisService);
    execute(data: IOtpInputDto): Promise<ResponseDto>;
}
//# sourceMappingURL=verify_otp_usecase.d.ts.map