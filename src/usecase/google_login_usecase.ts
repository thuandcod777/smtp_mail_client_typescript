import { ResponseDto } from "../domain/dtos/response.js";
import type { IUserInputDTO } from "../domain/dtos/user-input.dto.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";

export default class SaveUserGoogleUsecase {
    constructor(private authRepository: IAuthRepository) { }
    public async execute(data: IUserInputDTO): Promise<ResponseDto> {
        /*  const audit_login_log = await this.auditLoginLogRepository.audit_login_log(authData); */

        let isUserChecked = await this.authRepository.checkUser(data.email);

        if (!isUserChecked.userData) {
            let isRegisted = await this.authRepository.registerUser(data);

            return ResponseDto.success(isRegisted.message, isRegisted.userData);
        }

        return ResponseDto.success(isUserChecked.message, isUserChecked.userData);
    }
}