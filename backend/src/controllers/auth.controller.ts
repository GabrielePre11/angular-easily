import { prisma } from "@/lib/prisma";
import { signInFunction, signUpFunction } from "@/services/auth.service";
import { SignInBody, SignUpBody } from "@/types/auth.type";
import { checkEmail } from "@/utils/auth/checkEmail";
import { checkPassword } from "@/utils/auth/checkPassword";
import { generateToken } from "@/utils/auth/generateToken";
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

export const signIn = async (
  req: Request<{}, {}, SignInBody>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const user = await signInFunction({ email, password });
    generateToken(res, { id: user.id, role: user.role });

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "There was an error while signing in." });
    }
  }
};

export const signOut = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully." });
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const authUser = await prisma.user.findUnique({
      where: { id: req.user?.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!authUser) {
      return res
        .status(404)
        .json({ message: "Unauthorized. You are not logged in." });
    }

    return res.status(200).json(authUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
};
