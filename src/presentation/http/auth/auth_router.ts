import { Router, type Request, type Response } from "express";
import AuthUsecase from "../../../usecase/auth_usecase.js";
import type IAuthRepository from "../../../domain/services/iauth_repository.js";
import AuthController from "./auth_controller.js";
import SignOutUsecase from "../../../usecase/sign_out_usercase.js";

export default class AuthRouter {
    public static configure(authRepository: IAuthRepository): Router {
        const router = Router();

        let controller = AuthRouter.composeController(authRepository);

        router.post('/login', (req: Request, res: Response) => controller.save_audit_login_log(req, res));
        router.post('/signout', (req: Request, res: Response) => controller.signOut(req, res));

        return router;
    }

    private static composeController(authRepository: IAuthRepository): AuthController {
        const saveAuthUsecase = new AuthUsecase(authRepository);
        const signOutUsecase = new SignOutUsecase(authRepository);
        const controller = new AuthController(saveAuthUsecase, signOutUsecase);
        return controller;
    }
}