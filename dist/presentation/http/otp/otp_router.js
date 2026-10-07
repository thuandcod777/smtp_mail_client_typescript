import { Router } from "express";
import OtpController from "./otp_controller.js";
import VerifyOtpUsecase from "../../../usecase/verify_otp_usecase.js";
import SaveOtpUsecase from "../../../usecase/save_otp_usecase.js";
export default class OtpRouter {
    static configure(authRepository, otpRepository, mailerService, tokenService, redisService) {
        const router = Router();
        let controller = OtpRouter.composeController(authRepository, otpRepository, mailerService, tokenService, redisService);
        router.post('/sendmail', (req, res) => controller.saveOtp(req, res));
        router.post('/verified', (req, res) => controller.verifyOtp(req, res));
        return router;
    }
    static composeController(authRepository, otpRepository, mailerService, tokenService, redisService) {
        const saveOtpUsecase = new SaveOtpUsecase(authRepository, otpRepository, mailerService, tokenService, redisService);
        const verifyOtpUsecase = new VerifyOtpUsecase(authRepository, otpRepository, redisService);
        const controller = new OtpController(saveOtpUsecase, verifyOtpUsecase);
        return controller;
    }
}
//# sourceMappingURL=otp_router.js.map