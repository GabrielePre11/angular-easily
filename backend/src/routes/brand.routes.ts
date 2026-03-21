import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "@/controllers/brand.controller";
import { adminMiddleware } from "@/middlewares/admin.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.get("/", getBrands);
router.get("/:id", getBrandById);

router.post("/create", authMiddleware, adminMiddleware, createBrand);
router.put("/update/:id", authMiddleware, adminMiddleware, updateBrand);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteBrand);

export default router;
