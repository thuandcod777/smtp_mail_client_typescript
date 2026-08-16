import type { AuthSession } from "./auth.js";
import type { OtpModel } from "./otp.js";

export interface IUserJSON {
    _id?: string | null;
    name?: string | null;
    email: string;
    name_company?: string | null;
    number_phone?: string | null;
    type: string;
    role: string;
}

export default class User {
    readonly _id?: string | null;
    readonly name?: string | null;
    readonly email: string;
    readonly name_company?: string | null;
    readonly number_phone?: string | null;
    readonly type: string;
    readonly role: string;

    constructor({ _id = null, name = null, email, name_company = null, number_phone = null, type, role }: IUserJSON) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.name_company = name_company;
        this.number_phone = number_phone;
        this.type = type;
        this.role = role;
    }

    static fromJson(json: IUserJSON): User {
        return new User(json);
    }
}