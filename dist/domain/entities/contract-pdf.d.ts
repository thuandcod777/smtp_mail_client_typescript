export interface IContractPdfJSON {
    name: string;
    buffer: Buffer;
    mime_type: string;
}
export declare class ContractPdf {
    name: string;
    buffer: Buffer;
    mime_type: string;
    constructor({ name, buffer, // Khởi tạo buffer rỗng
    mime_type }: {
        name: string;
        buffer: Buffer;
        mime_type: string;
    });
    static fromJson(json: IContractPdfJSON): ContractPdf;
}
//# sourceMappingURL=contract-pdf.d.ts.map