import { Router } from "express";
import AuthUsecase from "../../../usecase/auth_usecase.js";
import AuthController from "./auth_controller.js";
import SignOutUsecase from "../../../usecase/sign_out_usercase.js";
export default class AuthRouter {
    static configure(authRepository) {
        const router = Router();
        let controller = AuthRouter.composeController(authRepository);
        router.post('/login', (req, res) => controller.save_audit_login_log(req, res));
        router.post('/signout', (req, res) => controller.signOut(req, res));
        return router;
    }
    static composeController(authRepository) {
        const saveAuthUsecase = new AuthUsecase(authRepository);
        const signOutUsecase = new SignOutUsecase(authRepository);
        const controller = new AuthController(saveAuthUsecase, signOutUsecase);
        return controller;
    }
}
//# sourceMappingURL=auth_router.js.map