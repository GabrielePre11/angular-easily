import { Response } from "express";

export const checkPassword = (password: string, res: Response) => {
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const minLength = 8;

  if (password.length < minLength) {
    throw new Error("Password must be at least 8 characters long.");
  }

  if (
    !password.split("").some((char) => numbers.includes(char)) ||
    !password.split("").some((char) => symbols.includes(char)) ||
    !password.split("").some((char) => letters.includes(char))
  ) {
    throw new Error(
      "Password must contain at least one number, one symbol, and one letter.",
    );
  }
};
