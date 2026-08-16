interface EmailOptions {
    to: string | string[];
    subject: string;
    html?: string;
}
export declare function sendEmail(options: EmailOptions): Promise<void>;
export {};
//# sourceMappingURL=mailer.d.ts.map