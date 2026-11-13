import type { AuthSession } from "./auth.js";
import type { OtpModel } from "./otp.js";

export interface IUserJSON {
    _id?: string | null;
    user_name?: string | null;
    email: string;
    company_name?: string | null;
    number_phone?: string | null;
    is_type: string;
    is_role: string;
    is_login: string;
}

export default class User {
    readonly _id?: string | null;
    readonly user_name?: string | null;
    readonly email: string;
    readonly company_name?: string | null;
    readonly number_phone?: string | null;
    readonly is_type: string;
    readonly is_role: string;
    readonly is_login: string;

    constructor({ _id = null, user_name = null, email, company_name = null, number_phone = null, is_type, is_role, is_login }: IUserJSON) {
        this._id = _id;
        this.user_name = user_name;
        this.email = email;
        this.company_name = company_name;
        this.number_phone = number_phone;
        this.is_type = is_type;
        this.is_role = is_role;
        this.is_login = is_login;
    }

    static fromJson(json: IUserJSON): User {
        return new User(json);
    }
}