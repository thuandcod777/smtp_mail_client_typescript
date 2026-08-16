import type ITokenService from "../../domain/services/itoken_service.js";
import jwt from "jsonwebtoken"

export default class JwtTokenService implements ITokenService {
    constructor(private readonly privateKey: string) { }

    generateRefreshToken(payload: string | object): string | object {
        let token = jwt.sign({ data: payload }, this.privateKey, { issuer: 'project', expiresIn: '10d' })
        return token;
    }

    generateAccessToken(payload: string | object): string | object {
        let token = jwt.sign({ payload }, this.privateKey, { issuer: 'project', expiresIn: '30m' })
        return token;
    }

}