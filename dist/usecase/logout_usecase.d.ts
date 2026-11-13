import { ResponseDto } from "../domain/dtos/response.js";
import type IOtpRepository from "../domain/services/iotp_repository.js";
export default class LogoutUsecase {
    private otpRepository;
    constructor(otpRepository: IOtpRepository);
    execute(user_id: string): Promise<ResponseDto>;
}
//# sourceMappingURL=logout_usecase.d.ts.map