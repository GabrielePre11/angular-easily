import {
  createBooking,
  deleteBooking,
  getBookingByUserId,
} from "@/controllers/booking.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.get("/:userId", authMiddleware, getBookingByUserId);

router.post("/add/:carId", authMiddleware, createBooking);
router.delete("/delete/:carId", authMiddleware, deleteBooking);

export default router;
