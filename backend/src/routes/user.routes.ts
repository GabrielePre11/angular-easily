import { getUsers } from "@/controllers/user.controller";
import { adminMiddleware } from "@/middlewares/admin.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getUsers);
router.get("/admins", authMiddleware, adminMiddleware, getUsers);

export default router;
