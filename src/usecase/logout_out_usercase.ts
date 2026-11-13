import { JWT_SECRET, type AuthTokenClaims } from "../data/model/jwt.js";
import type { ILogoutInputDTO } from "../domain/dtos/logout-input.js";
import { ResponseDto } from "../domain/dtos/response.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";
import jwt from "jsonwebtoken";

export default class LogOutUsecase {
    constructor(private authRepository: IAuthRepository) { }

    public async execute(data: ILogoutInputDTO): Promise<ResponseDto> {

        let decoded: AuthTokenClaims;

        decoded = jwt.verify(data.token, JWT_SECRET) as AuthTokenClaims;

        if (!decoded) {
            return ResponseDto.failure("Mã token đã hết hạn");

        }

        const user_id = decoded.payload;
        const isSignOut = await this.authRepository.signOut(user_id);

        if (!isSignOut.sucess) {
            return ResponseDto.failure(isSignOut.message);
        }
        return ResponseDto.success(isSignOut.message)
    }
}