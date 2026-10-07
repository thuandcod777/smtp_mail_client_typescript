import jwt from "jsonwebtoken";
export default class JwtTokenService {
    privateKey;
    constructor(privateKey) {
        this.privateKey = privateKey;
    }
    generateRefreshToken(payload) {
        let token = jwt.sign({ data: payload }, this.privateKey, { issuer: 'project', expiresIn: '10d' });
        return token;
    }
    generateAccessToken(payload) {
        let token = jwt.sign({ payload }, this.privateKey, { issuer: 'project', expiresIn: '30m' });
        return token;
    }
}
//# sourceMappingURL=jwt_token_service.js.map