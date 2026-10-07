import { Contract, type IContractJSON } from "./contract.js";
import User, { type IUserJSON } from "./user.js";
import { AuthSession, type IAuthSessionJSON } from "./auth.js";
export interface IObjectDataJSON {
    user: IUserJSON;
    session: IAuthSessionJSON | null;
    contract: IContractJSON | null;
}
export declare class ObjectData {
    readonly user: User;
    readonly contract: Contract | null;
    readonly session: AuthSession | null;
    constructor({ user, session, contract }: {
        user: User;
        session: AuthSession | null;
        contract: Contract | null;
    });
    static fromJson(json: IObjectDataJSON): ObjectData;
}
//# sourceMappingURL=object_data.entity.d.ts.map