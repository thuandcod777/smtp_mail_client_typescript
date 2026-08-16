import da from "zod/v4/locales/da.cjs";
import { Contract, type IContractJSON } from "./contract.js";
import User, { type IUserJSON } from "./user.js";
import type { IAuthSession } from "../../data/model/auth_model.js";
import { AuthSession, type IAuthSessionJSON } from "./auth.js";

export interface IUserContractJSON {
    user: IUserJSON;
    session: IAuthSessionJSON | null;
    contract: IContractJSON | null;
}

export class UserContract {
    readonly user: User;
    readonly contract: Contract | null;
    readonly session: AuthSession | null;

    constructor({ user, session, contract }: { user: User, session: AuthSession | null, contract: Contract | null }) {
        this.user = user;
        this.session = session;
        this.contract = contract;
    }

    static fromJson(json: IUserContractJSON): UserContract {
        return new UserContract({
            user: User.fromJson(json.user),
            session: json.session ? AuthSession.fromJson(json.session) : null,
            contract: json.contract ? Contract.fromJson(json.contract) : null
        });
    }
}