import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/auth.routes';

const app: Application = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

app.use('/api/auth', authRouter);

export default app;