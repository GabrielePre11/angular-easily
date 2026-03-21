import express from "express";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { adminMiddleware } from "@/middlewares/admin.middleware";
import { getCarById, getCars } from "@/controllers/car.controller";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);

router.post("/create", authMiddleware, adminMiddleware);
router.put("/update/:id", authMiddleware, adminMiddleware);
router.delete("/delete/:id", authMiddleware, adminMiddleware);

export default router;
