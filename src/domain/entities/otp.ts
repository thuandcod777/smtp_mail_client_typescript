
interface IOtpJSON {
    id: string;
}

export class OtpModel {
    id: string;
    constructor({ id }: { id: string }) {
        this.id = id;
    }

    static fromJson(json: IOtpJSON): OtpModel {
        return new OtpModel(json)
    }
}