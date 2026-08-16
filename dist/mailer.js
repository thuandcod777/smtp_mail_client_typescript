import nodemailer, {} from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS?.replace(/\s+/g, '')
    }
});
export async function sendEmail(options) {
    try {
        const info = await transport.sendMail({
            from: `VERTIFICATION ${process.env.SMTP_USER}`,
            to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
            subject: options.subject,
            html: options.html,
        });
        console.log(`✉️ Email dispatched successfully! Message ID: ${info.messageId}`);
    }
    catch (error) {
        console.error('❌ Failed to dispatch email:', error);
        throw error;
    }
}
//# sourceMappingURL=mailer.js.map