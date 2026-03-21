import {
  addReviewOnCar,
  deleteReview,
  getReviewByCarId,
  updateReview,
} from "@/controllers/review.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.get("/:carId", getReviewByCarId);

router.post("/add/:carId", authMiddleware, addReviewOnCar);
router.put("/update/:carId", authMiddleware, updateReview);
router.post("/delete/:carId", authMiddleware, deleteReview);

export default router;
