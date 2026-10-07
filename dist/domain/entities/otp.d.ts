interface IOtpJSON {
    id: string;
}
export declare class OtpModel {
    id: string;
    constructor({ id }: {
        id: string;
    });
    static fromJson(json: IOtpJSON): OtpModel;
}
export {};
//# sourceMappingURL=otp.d.ts.map