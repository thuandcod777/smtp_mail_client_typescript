import type { ILogoutInputDTO } from "../domain/dtos/logout-input.js";
import { ResponseDto } from "../domain/dtos/response.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";
export default class SignOutUsecase {
    private authRepository;
    constructor(authRepository: IAuthRepository);
    execute(data: ILogoutInputDTO): Promise<ResponseDto>;
}
//# sourceMappingURL=sign_out_usercase.d.ts.map