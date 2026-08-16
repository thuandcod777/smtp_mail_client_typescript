import type { RedisClientType } from "redis";
import type IRedisService from "../../domain/services/iredis_repository.js";

export default class RedisService implements IRedisService {
    private readonly MAX_ATTEMPTS = 5;
    private readonly BLOCK_DURATION = 900;
    constructor(private readonly redisClient: RedisClientType) { }


    private getKeyRefresh(id: string, token: string): string {
        return `auth_refresh:${id}:${token}`;
    }

    private getKeyAccess(id: string, token: string): string {
        return `auth_access:${id}:${token}`;

    }

    private getKey(identifier: string): string {
        return `fail_attempts:${identifier}`;
    }

    async saveRefreshToken(id: string, token: string, ttlSeconds: number): Promise<boolean> {
        const result = await this.redisClient.set(this.getKeyRefresh(id, token), id, { EX: ttlSeconds });
        return result === 'OK';
    }

    async saveAccessToken(id: string, token: string, validate: boolean, ttlSeconds: number): Promise<boolean> {
        const value = String(validate);
        const result = await this.redisClient.set(this.getKeyAccess(id, token), value, { EX: ttlSeconds });
        return result === 'OK';
    }

    async getRefreshToken(id: string, token: string): Promise<string | null> {
        return await this.redisClient.get(this.getKeyRefresh(id, token));
    }

    async getAccessToken(id: string, token: string): Promise<string | null> {
        return await this.redisClient.get(this.getKeyAccess(id, token));
    }

    async deleteRefreshToken(id: string, token: string): Promise<void> {
        await this.redisClient.del(this.getKeyRefresh(id, token));
    }

    async deleteAccessToken(id: string, token: string): Promise<void> {
        await this.redisClient.del(this.getKeyAccess(id, token));
    }

    // Kiểm tra trạng thái cấm dựa trên số lần thử trong Redis
    public async isBlocked(identifier: string): Promise<boolean> {
        const attempts = await this.redisClient.get(this.getKey(identifier));
        if (!attempts) return false;
        return parseInt(attempts, 10) >= this.MAX_ATTEMPTS;
    }

    // Ghi nhận thất bại: Tăng bộ đếm và cài đặt TTL nguyên tử bằng MULTI

    public async recordFailure(identifier: string): Promise<void> {
        const key = this.getKey(identifier);
        const exists = await this.redisClient.exists(key);
        if (!exists) {
            await this.redisClient.multi().incr(key).expire(key, this.BLOCK_DURATION).exec();
        } else {
            await this.redisClient.incr(key);
        }
    }

    // Xóa sạch bộ đếm lỗi khi đăng nhập thành công

    public async resetFailure(identifier: string): Promise<void> {
        await this.redisClient.del(this.getKey(identifier));
    }

}