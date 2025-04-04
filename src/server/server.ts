import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';


const app: Application = express();
dotenv.config();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


export default app;
