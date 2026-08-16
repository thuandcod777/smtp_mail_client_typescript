import { Mongoose } from "mongoose";
import { createClient, type RedisClientType } from "redis";
import OtpRepository from "./data/repository/otp_repository.js";
import AuthRepository from "./data/repository/auth_repository.js";
import RedisRepository from "./data/services/redis_service.js";
import { MailerService } from "./data/helper/mailer_service.js";
import OtpRouter from "./presentation/http/otp/otp_router.js";
import AuthRouter from "./presentation/http/auth/auth_router.js";
import JwtTokenService from "./data/services/jwt_token_service.js";


export default class CompositisionRoot {
    private static client: Mongoose;
    private static redisClient: RedisClientType;

    public static async configure() {
        this.client = new Mongoose();

        const options = {
            autoIndex: true,
            serverSelectionTimeoutMS: 10000
        };

        const connectionStr = encodeURI(process.env.MONGO_DB as string)
        this.client.connect(connectionStr, options).then(() => console.log("Database connected!")).catch(err => console.log(err));

        this.redisClient = createClient({ url: 'redis://localhost:6379' });

        this.redisClient.on('error', (err) => console.log('Redis Client Error', err));


        try {
            await this.redisClient.connect();
            console.log("Redis connected successfully!");
        } catch (err) {
            console.error('Redis connection failed : ', err);
        }
    }

    public static otpRouter() {
        const authRepository = new AuthRepository(this.client);
        const otpRepository = new OtpRepository(this.client);
        const mailerService = new MailerService();
        const redisRepository = new RedisRepository(this.redisClient);
        const tokenRepository = new JwtTokenService(process.env.PRIVATE_KEY as string);
        return OtpRouter.configure(authRepository, otpRepository, mailerService, tokenRepository, redisRepository)
    }

    public static authRouter() {
        const authRepository = new AuthRepository(this.client);
        return AuthRouter.configure(authRepository);
    }

}