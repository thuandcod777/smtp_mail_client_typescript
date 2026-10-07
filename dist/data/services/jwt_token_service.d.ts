import type ITokenService from "../../domain/services/itoken_service.js";
export default class JwtTokenService implements ITokenService {
    private readonly privateKey;
    constructor(privateKey: string);
    generateRefreshToken(payload: string | object): string | object;
    generateAccessToken(payload: string | object): string | object;
}
//# sourceMappingURL=jwt_token_service.d.ts.map