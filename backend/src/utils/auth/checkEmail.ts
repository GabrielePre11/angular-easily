import { Response } from "express";

export const checkEmail = (email: string, res: Response) => {
  if (!email.includes("@")) {
    throw new Error("Invalid email format.");
  }
};
