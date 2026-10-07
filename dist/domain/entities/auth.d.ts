export type OTPAction = 'Register' | 'Login' | 'ResetPassword';
interface IAuthJSON {
    email: string;
    ip_address: string;
    user_agent: string;
    action: OTPAction;
}
export declare class AuthModel {
    email: string;
    ip_address: string;
    user_agent: string;
    action: OTPAction;
    constructor({ email, ip_address, user_agent, action }?: Partial<IAuthJSON>);
    static fromJson(json: IAuthJSON): AuthModel;
}
export interface IAuthSessionJSON {
    _id?: string | null;
    user_id: string | null;
    refresh_token: string;
    access_token: string;
    is_active: boolean;
    is_block: boolean;
}
export declare class AuthSession {
    readonly _id: string | null;
    readonly user_id: string | null;
    readonly refresh_token: string;
    readonly access_token: string;
    readonly is_active: boolean;
    readonly is_block: boolean;
    constructor({ _id, user_id, refresh_token, access_token, is_active, is_block }: {
        _id?: string | null;
        user_id: string | null;
        refresh_token: string;
        access_token: string;
        is_active: boolean;
        is_block: boolean;
    });
    static fromJson(json: IAuthSessionJSON): AuthSession;
}
export {};
//# sourceMappingURL=auth.d.ts.map