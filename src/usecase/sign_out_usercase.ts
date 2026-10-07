import type { ILogoutInputDTO } from "../domain/dtos/logout-input.js";
import { ResponseDto } from "../domain/dtos/response.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";

export default class SignOutUsecase {
    constructor(private authRepository: IAuthRepository) { }

    public async execute(data: ILogoutInputDTO): Promise<ResponseDto> {
        const isSignOut = await this.authRepository.signOut(data.token, data.role);
        if (!isSignOut.sucess) {
            return ResponseDto.failure(isSignOut.message);
        }
        return ResponseDto.success(isSignOut.message)
    }
}