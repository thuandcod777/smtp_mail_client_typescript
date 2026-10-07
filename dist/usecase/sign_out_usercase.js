import { ResponseDto } from "../domain/dtos/response.js";
export default class SignOutUsecase {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(data) {
        const isSignOut = await this.authRepository.signOut(data.token, data.role);
        if (!isSignOut.sucess) {
            return ResponseDto.failure(isSignOut.message);
        }
        return ResponseDto.success(isSignOut.message);
    }
}
//# sourceMappingURL=sign_out_usercase.js.map