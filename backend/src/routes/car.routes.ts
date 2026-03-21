import express from "express";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { adminMiddleware } from "@/middlewares/admin.middleware";
import {
  createCar,
  deleteCar,
  getCarById,
  getCars,
  updateCar,
} from "@/controllers/car.controller";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);

router.post("/create", authMiddleware, adminMiddleware, createCar);
router.put("/update/:id", authMiddleware, adminMiddleware, updateCar);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteCar);

export default router;
