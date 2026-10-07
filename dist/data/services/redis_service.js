export default class RedisService {
    redisClient;
    MAX_ATTEMPTS = 5;
    BLOCK_DURATION = 900;
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    getKeyRefresh(id, token) {
        return `auth_refresh:${id}:${token}`;
    }
    getKeyAccess(id, token) {
        return `auth_access:${id}:${token}`;
    }
    getKey(identifier) {
        return `fail_attempts:${identifier}`;
    }
    async saveRefreshToken(id, token, ttlSeconds) {
        const result = await this.redisClient.set(this.getKeyRefresh(id, token), id, { EX: ttlSeconds });
        return result === 'OK';
    }
    async saveAccessToken(id, token, validate, ttlSeconds) {
        const value = String(validate);
        const result = await this.redisClient.set(this.getKeyAccess(id, token), value, { EX: ttlSeconds });
        return result === 'OK';
    }
    async getRefreshToken(id, token) {
        return await this.redisClient.get(this.getKeyRefresh(id, token));
    }
    async getAccessToken(id, token) {
        return await this.redisClient.get(this.getKeyAccess(id, token));
    }
    async deleteRefreshToken(id, token) {
        await this.redisClient.del(this.getKeyRefresh(id, token));
    }
    async deleteAccessToken(id, token) {
        await this.redisClient.del(this.getKeyAccess(id, token));
    }
    // Kiểm tra trạng thái cấm dựa trên số lần thử trong Redis
    async isBlocked(identifier) {
        const attempts = await this.redisClient.get(this.getKey(identifier));
        if (!attempts)
            return false;
        return parseInt(attempts, 10) >= this.MAX_ATTEMPTS;
    }
    // Ghi nhận thất bại: Tăng bộ đếm và cài đặt TTL nguyên tử bằng MULTI
    async recordFailure(identifier) {
        const key = this.getKey(identifier);
        const exists = await this.redisClient.exists(key);
        if (!exists) {
            await this.redisClient.multi().incr(key).expire(key, this.BLOCK_DURATION).exec();
        }
        else {
            await this.redisClient.incr(key);
        }
    }
    // Xóa sạch bộ đếm lỗi khi đăng nhập thành công
    async resetFailure(identifier) {
        await this.redisClient.del(this.getKey(identifier));
    }
}
//# sourceMappingURL=redis_service.js.map