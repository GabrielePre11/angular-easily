import { signUpFunction } from "@/services/auth.service";
import { SignUpBody } from "@/types/auth.type";
import { checkEmail } from "@/utils/auth/checkEmail";
import { checkPassword } from "@/utils/auth/checkPassword";
import { Request, Response } from "express";

export const signUp = async (
  req: Request<{}, {}, SignUpBody>,
  res: Response,
) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    checkEmail(email, res);
    checkPassword(password, res);

    const newUser = await signUpFunction({ name, email, password });

    return res
      .status(201)
      .json({ user: newUser, message: "User created successfully." });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "There was an error signing up a new user." });
    }
  }
};
