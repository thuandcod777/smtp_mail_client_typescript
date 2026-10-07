import express from 'express';
import dotenv from 'dotenv'
import CompositisionRoot from './composition.js';

dotenv.config()
CompositisionRoot.configure()

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/v2/auth', CompositisionRoot.otpRouter(),)
app.use('/api/v2', CompositisionRoot.authRouter())



app.listen(PORT, () => {
    console.log(`Server executing at http://localhost:${PORT}`);
});