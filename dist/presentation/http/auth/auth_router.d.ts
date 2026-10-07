import { Router } from "express";
import type IAuthRepository from "../../../domain/services/iauth_repository.js";
export default class AuthRouter {
    static configure(authRepository: IAuthRepository): Router;
    private static composeController;
}
//# sourceMappingURL=auth_router.d.ts.map