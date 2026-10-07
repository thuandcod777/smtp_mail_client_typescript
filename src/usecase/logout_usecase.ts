import { ResponseDto } from "../domain/dtos/response.js";
import type IOtpRepository from "../domain/services/iotp_repository.js";

export default class LogoutUsecase {
    constructor(private otpRepository: IOtpRepository) { }

    public async execute(user_id: string): Promise<ResponseDto> {
        let result = await this.otpRepository.logout(user_id);

        if (result.success == false) {
            ResponseDto.failure(result.message);
        }

        return ResponseDto.success(result.message);
    }
}