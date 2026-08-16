
export type OTPAction = 'Register' | 'Login' | 'ResetPassword';

interface IAuthJSON {
    email: string;
    ip_address: string;
    user_agent: string;
    action: OTPAction;
}

export class AuthModel {
    email: string;
    ip_address: string;
    user_agent: string;
    action: OTPAction;

    constructor({ email = "", ip_address = "", user_agent = "", action = "Login" }: Partial<IAuthJSON> = {}) {
        this.email = email;
        this.ip_address = ip_address;
        this.user_agent = user_agent;
        this.action = action
    }

    static fromJson(json: IAuthJSON): AuthModel {
        return new AuthModel({
            email: json.email,
            ip_address: json.ip_address,
            user_agent: json.user_agent,
            action: json.action
        });
    }
}

export interface IAuthSessionJSON {
    _id?: string | null;
    user_id: string | null;
    refresh_token: string;
    access_token: string;
    is_active: boolean;
    is_block: boolean;
}

export class AuthSession {
    readonly _id: string | null;
    readonly user_id: string | null;
    readonly refresh_token: string;
    readonly access_token: string;
    readonly is_active: boolean;
    readonly is_block: boolean;

    constructor({ _id = null, user_id = null, refresh_token, access_token, is_active, is_block }: { _id?: string | null, user_id: string | null, refresh_token: string, access_token: string, is_active: boolean, is_block: boolean }) {
        this._id = _id;
        this.user_id = user_id;
        this.refresh_token = refresh_token;
        this.access_token = access_token;
        this.is_active = is_active;
        this.is_block = is_block;
    }

    static fromJson(json: IAuthSessionJSON): AuthSession {
        return new AuthSession(json);
    }

}

