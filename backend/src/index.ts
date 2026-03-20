import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "@/routes/auth.routes";

//============ Configuration ============//
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "api/v1";

//============ Middlewares ============//
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    hsts: { maxAge: 31536000, includeSubDomains: false },
  }),
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());

//============ Routes ============//
app.use(`${API_URL}/auth`, authRoutes);

//============ Server Start ============//
app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
