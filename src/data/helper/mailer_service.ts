import type { IMailerService } from "../../domain/services/imailer_service.js";
import nodemailer, { type Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export class MailerService implements IMailerService {

    private transport: Transporter;
    constructor() {
        this.transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true cho cổng 465, false cho các cổng khác (như 587) [2]
            auth: {
                user: process.env.SMTP_USER,
                // Loại bỏ khoảng trắng thừa nếu có từ file .env
                pass: process.env.SMTP_PASS?.replace(/\s+/g, '')
            }
        });
    }

    async sendEmail(email: string, otp: string): Promise<void> {
        try {
            const enhancedSubject = `[Xac Thuc] Ma OTP`;

            const enhancedHtml = `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                                <h2 style="color: #333;">Ma xac thuc OTP</h2>
                                <p>Xin Chao</p>
                                <p>Ban da yeu cau ma xac thuc dang nhap/thao tac he thong. Vui long nhap ma duoi day de tiep tuc:</p>
                                <div style="background-color: #f4f4f4; padding: 15px; font-size: 24px;  font-weight: bold; letter-spacing: 5px; text-align: center; color:#007bff; border-radius: 4px; margin: 20px 0;">
                                    ${otp}
                                </div>
                                <p style="color: #666; font-size: 14px;">Ma nay co hieu luc trong vong 5 phut.Vui long khong chia se ma nay voi bat ky aui.</p>
                                <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
                                <p style="color: #999; font-size: 12px; text-align: center;">Day la email tu dong,vui long khong phan hoi.</p>
                            </div>
                        `;

            const info = await this.transport.sendMail({
                from: `VERTIFICATION ${process.env.SMTP_USER}`,
                to: Array.isArray(email) ? email.join(', ') : email,
                subject: enhancedSubject,
                html: enhancedHtml,
            });

            console.log(`✉️ Email dispatched successfully! Message ID: ${info.messageId}`);
        } catch (error) {
            console.error('❌ Failed to dispatch email:', error);
            throw error;
        }
    }
}