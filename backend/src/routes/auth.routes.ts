import {
  checkAuth,
  signIn,
  signOut,
  signUp,
} from "@/controllers/auth.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);

router.get("/check-auth", authMiddleware, checkAuth);

export default router;
