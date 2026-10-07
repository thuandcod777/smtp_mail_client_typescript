export default interface ITokenService {
    generateRefreshToken(payload: string | object): string | object;
    generateAccessToken(payload: string | object): string | object;
}
//# sourceMappingURL=itoken_service.d.ts.map