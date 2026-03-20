import { Response } from "express";
import jwt from "jsonwebtoken";

export type Role = "USER" | "ADMIN";

export type Token = {
  id: number;
  role: Role;
};

export const generateToken = async (res: Response, token: Token) => {
  if (!process.env.JWT_SECRET || !process.env.NODE_ENV) {
    throw new Error("JWT_SECRET or NODE_ENV is not defined in .env file.");
  }

  const authToken = jwt.sign(token, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", authToken, {
    httpOnly: true, // It prevents XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // It prevents CSRF attacks
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
  });

  return authToken;
};
