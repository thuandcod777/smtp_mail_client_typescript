export interface IMailerService {
    sendEmail(email: string, otp: string): Promise<void>;
}