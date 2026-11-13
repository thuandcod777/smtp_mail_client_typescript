import { Router, type Request, type Response } from "express";
import OtpController from "./otp_controller.js";
import type { MailerService } from "../../../data/helper/mailer_service.js";
import VerifyOtpUsecase from "../../../usecase/verify_otp_usecase.js";
import type RedisRepository from "../../../data/services/redis_service.js";
import type OtpRepository from "../../../data/repository/otp_repository.js";
import SaveOtpUsecase from "../../../usecase/save_otp_usecase.js";
import type IOtpRepository from "../../../domain/services/iotp_repository.js";
import type IAuthRepository from "../../../domain/services/iauth_repository.js";
import type ITokenService from "../../../domain/services/itoken_service.js";
import type IRedisService from "../../../domain/services/iredis_repository.js";

export default class OtpRouter {
    public static configure(authRepository: IAuthRepository, otpRepository: IOtpRepository, mailerService: MailerService, tokenService: ITokenService, redisService: IRedisService): Router {
        const router = Router();

        let controller = OtpRouter.composeController(authRepository, otpRepository, mailerService, tokenService, redisService);

        router.post('/sendmail', (req: Request, res: Response) => controller.saveOtp(req, res));
        router.post('/verifiyemail', (req: Request, res: Response) => controller.verifyOtp(req, res));
        return router;
    }

    private static composeController(authRepository: IAuthRepository, otpRepository: IOtpRepository, mailerService: MailerService, tokenService: ITokenService, redisService: IRedisService): OtpController {
        const saveOtpUsecase = new SaveOtpUsecase(authRepository, otpRepository, mailerService, tokenService, redisService);
        const verifyOtpUsecase = new VerifyOtpUsecase(authRepository, otpRepository, redisService);
        const controller = new OtpController(saveOtpUsecase, verifyOtpUsecase);
        return controller;
    }
}