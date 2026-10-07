export class ContractPdf {
    name;
    buffer;
    mime_type;
    constructor({ name = "untitled.pdf", buffer = Buffer.alloc(0), // Khởi tạo buffer rỗng
    mime_type = "application/pdf" }) {
        this.name = name;
        this.buffer = buffer;
        this.mime_type = mime_type;
    }
    static fromJson(json) {
        return new ContractPdf(json);
    }
}
//# sourceMappingURL=contract-pdf.js.map