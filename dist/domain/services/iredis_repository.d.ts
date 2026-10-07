export default interface IRedisService {
    saveRefreshToken(id: string, token: string, ttlSeconds: number): Promise<boolean>;
    saveAccessToken(id: string, token: string, validate: boolean, ttlSeconds: number): Promise<boolean>;
    getRefreshToken(id: string, token: string): Promise<string | null>;
    getAccessToken(id: string, token: string): Promise<string | null>;
    deleteRefreshToken(id: string, token: string): Promise<void>;
    deleteAccessToken(id: string, token: string): Promise<void>;
    isBlocked(identifier: string): Promise<boolean>;
    recordFailure(identifier: string): Promise<void>;
    resetFailure(identifier: string): Promise<void>;
}
//# sourceMappingURL=iredis_repository.d.ts.map