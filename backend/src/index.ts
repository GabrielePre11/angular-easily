import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { cleanBooking } from "./utils/bookingCleaner";
import { prisma } from "./lib/prisma";

import authRoutes from "@/routes/auth.routes";
import userRoutes from "@/routes/user.routes";
import brandRoutes from "@/routes/brand.routes";
import carRoutes from "@/routes/car.routes";
import reviewRoutes from "@/routes/review.route";
import bookingRoutes from "@/routes/booking.route";

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
    origin: "http://localhost:4200",
    credentials: true,
  }),
);
app.use(cookieParser());

//============ Routes ============//
app.use(`${API_URL}/auth`, authRoutes);
app.use(`${API_URL}/users`, userRoutes);
app.use(`${API_URL}/brands`, brandRoutes);
app.use(`${API_URL}/cars`, carRoutes);
app.use(`${API_URL}/reviews`, reviewRoutes);
app.use(`${API_URL}/bookings`, bookingRoutes);

//============ Server Start ============//
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
  cleanBooking();
});

process.on("SIGINT", () => {
  prisma.$disconnect();
  console.info("Server was stopped.");
});
