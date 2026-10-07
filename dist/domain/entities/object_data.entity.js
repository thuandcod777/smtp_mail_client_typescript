import da from "zod/v4/locales/da.cjs";
import { Contract } from "./contract.js";
import User, {} from "./user.js";
import { AuthSession } from "./auth.js";
export class ObjectData {
    user;
    contract;
    session;
    constructor({ user, session, contract }) {
        this.user = user;
        this.session = session;
        this.contract = contract;
    }
    static fromJson(json) {
        return new ObjectData({
            user: User.fromJson(json.user),
            session: json.session ? AuthSession.fromJson(json.session) : null,
            contract: json.contract ? Contract.fromJson(json.contract) : null
        });
    }
}
//# sourceMappingURL=object_data.entity.js.map