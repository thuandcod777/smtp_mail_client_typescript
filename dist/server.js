import express, {} from 'express';
import { sendEmail } from './mailer.js';
import { generateRandomString } from './crypto_until.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'TypeScript Express server running successfully!' });
});
app.post('/api/send-email', async (req, res) => {
    try {
        const { to } = req.body;
        if (!to) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields: to.'
            });
            return;
        }
        const randomOTP = generateRandomString();
        const enhancedSubject = `Express TS Mailer Test (Ref: #${randomOTP})`;
        const enhancedHtml = `
      <div>
        <h1>Hello from Express!</h1>
        <p>Sent via TypeScript.</p>
        <br/><hr/>
        <p style="color: #666;">Security Verification Reference: <strong>${randomOTP}</strong></p>
      </div>
    `;
        await sendEmail({ to, subject: enhancedSubject, html: enhancedHtml });
        res.status(200).json({
            success: true,
            message: 'Email sent successfully with reference code!',
            code: randomOTP
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send email', error: error instanceof Error ? error.message : String(error) });
    }
});
app.listen(PORT, () => {
    console.log(`Server executing at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map