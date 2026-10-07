import type { RedisClientType } from "redis";
import type IRedisService from "../../domain/services/iredis_repository.js";
export default class RedisService implements IRedisService {
    private readonly redisClient;
    private readonly MAX_ATTEMPTS;
    private readonly BLOCK_DURATION;
    constructor(redisClient: RedisClientType);
    private getKeyRefresh;
    private getKeyAccess;
    private getKey;
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
//# sourceMappingURL=redis_service.d.ts.map