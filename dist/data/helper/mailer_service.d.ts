import type { IMailerService } from "../../domain/services/imailer_service.js";
export declare class MailerService implements IMailerService {
    private transport;
    constructor();
    sendEmail(email: string, otp: string): Promise<void>;
}
//# sourceMappingURL=mailer_service.d.ts.map