export class OtpModel {
    id;
    constructor({ id }) {
        this.id = id;
    }
    static fromJson(json) {
        return new OtpModel(json);
    }
}
//# sourceMappingURL=otp.js.map