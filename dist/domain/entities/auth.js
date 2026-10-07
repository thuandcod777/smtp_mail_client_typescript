export class AuthModel {
    email;
    ip_address;
    user_agent;
    action;
    constructor({ email = "", ip_address = "", user_agent = "", action = "Login" } = {}) {
        this.email = email;
        this.ip_address = ip_address;
        this.user_agent = user_agent;
        this.action = action;
    }
    static fromJson(json) {
        return new AuthModel({
            email: json.email,
            ip_address: json.ip_address,
            user_agent: json.user_agent,
            action: json.action
        });
    }
}
export class AuthSession {
    _id;
    user_id;
    refresh_token;
    access_token;
    is_active;
    is_block;
    constructor({ _id = null, user_id = null, refresh_token, access_token, is_active, is_block }) {
        this._id = _id;
        this.user_id = user_id;
        this.refresh_token = refresh_token;
        this.access_token = access_token;
        this.is_active = is_active;
        this.is_block = is_block;
    }
    static fromJson(json) {
        return new AuthSession(json);
    }
}
//# sourceMappingURL=auth.js.map