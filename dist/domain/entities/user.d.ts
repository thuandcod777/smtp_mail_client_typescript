export interface IUserJSON {
    _id?: string | null;
    name?: string | null;
    email: string;
    name_company?: string | null;
    number_phone?: string | null;
    types: string;
    roles: string;
}
export default class User {
    readonly _id?: string | null;
    readonly name?: string | null;
    readonly email: string;
    readonly name_company?: string | null;
    readonly number_phone?: string | null;
    readonly types: string;
    readonly roles: string;
    constructor({ _id, name, email, name_company, number_phone, types, roles }: IUserJSON);
    static fromJson(json: IUserJSON): User;
}
//# sourceMappingURL=user.d.ts.map