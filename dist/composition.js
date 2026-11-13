import { Mongoose } from "mongoose";
import { createClient } from "redis";
import OtpRepository from "./data/repository/otp_repository.js";
import AuthRepository from "./data/repository/auth_repository.js";
import RedisRepository from "./data/services/redis_service.js";
import { MailerService } from "./data/helper/mailer_service.js";
import OtpRouter from "./presentation/http/otp/otp_router.js";
import AuthRouter from "./presentation/http/auth/auth_router.js";
import JwtTokenService from "./data/services/jwt_token_service.js";
export default class CompositisionRoot {
    static client;
    static redisClient;
    static async configure() {
        this.client = new Mongoose();
        const options = {
            autoIndex: true,
            serverSelectionTimeoutMS: 10000
        };
        const connectionStr = encodeURI(process.env.MONGO_DB);
        this.client.connect(connectionStr, options).then(() => console.log("Database connected!")).catch(err => console.log(err));
        /* this.redisClient = createClient({ url: 'redis://tnh-redis-server:6379' }); */
        this.redisClient = createClient({ url: 'redis://127.0.0.1:6379' });
        this.redisClient.on('error', (err) => console.log('Redis Client Error', err));
        try {
            await this.redisClient.connect();
            console.log("Redis connected successfully!");
        }
        catch (err) {
            console.error('Redis connection failed : ', err);
        }
    }
    static otpRouter() {
        const authRepository = new AuthRepository(this.client);
        const otpRepository = new OtpRepository(this.client);
        const mailerService = new MailerService();
        const redisRepository = new RedisRepository(this.redisClient);
        const tokenRepository = new JwtTokenService(process.env.PRIVATE_KEY);
        return OtpRouter.configure(authRepository, otpRepository, mailerService, tokenRepository, redisRepository);
    }
    static authRouter() {
        const authRepository = new AuthRepository(this.client);
        return AuthRouter.configure(authRepository);
    }
}
//# sourceMappingURL=composition.js.map