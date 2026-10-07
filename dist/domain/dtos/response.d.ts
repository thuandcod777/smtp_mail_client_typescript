export declare class ResponseDto<T = any> {
    readonly success: boolean;
    readonly status: number;
    readonly message: string;
    readonly data?: T;
    constructor(success: boolean, status: number, message: string, data?: T);
    static success<R>(message: string, data?: R, status?: number): ResponseDto<R>;
    static failure<T = null>(message: string, status?: number): ResponseDto<T>;
}
//# sourceMappingURL=response.d.ts.map