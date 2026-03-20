import { Token } from "@/utils/auth/generateToken";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. You must be logged in." });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env file.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Token;

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};
