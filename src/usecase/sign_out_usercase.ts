import { ResponseDto } from "../domain/dtos/response.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";

export default class SignOutUsecase {
    constructor(private authRepository: IAuthRepository) { }

    public async execute(userId: string): Promise<ResponseDto> {
        const isSignOut = await this.authRepository.signOut(userId);
        if (!isSignOut.sucess) {
            return ResponseDto.failure(isSignOut.message);
        }
        return ResponseDto.success(isSignOut.message)
    }
}