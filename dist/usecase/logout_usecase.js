import { ResponseDto } from "../domain/dtos/response.js";
export default class LogoutUsecase {
    otpRepository;
    constructor(otpRepository) {
        this.otpRepository = otpRepository;
    }
    async execute(user_id) {
        let result = await this.otpRepository.logout(user_id);
        if (result.success == false) {
            ResponseDto.failure(result.message);
        }
        return ResponseDto.success(result.message);
    }
}
//# sourceMappingURL=logout_usecase.js.map