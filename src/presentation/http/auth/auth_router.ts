import { Router, type Request, type Response } from "express";
import AuthUsecase from "../../../usecase/google_login_usecase.js";
import type IAuthRepository from "../../../domain/services/iauth_repository.js";
import AuthController from "./auth_controller.js";
import LogoutUsecase from "../../../usecase/logout_out_usercase.js";
import SaveUserGoogleUsecase from "../../../usecase/google_login_usecase.js";

export default class AuthRouter {
    public static configure(authRepository: IAuthRepository): Router {
        const router = Router();

        let controller = AuthRouter.composeController(authRepository);

        router.post('/verifiygoogle', (req: Request, res: Response) => controller.saveUserGoogle(req, res));
        router.post('/logout', (req: Request, res: Response) => controller.logOut(req, res));

        return router;
    }

    private static composeController(authRepository: IAuthRepository): AuthController {
        const saveUserGoogleUsecase = new SaveUserGoogleUsecase(authRepository);
        const logOutUsecase = new LogoutUsecase(authRepository);
        const controller = new AuthController(saveUserGoogleUsecase, logOutUsecase);
        return controller;
    }
}