import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });

    return res.status(200).json({ users, totalUsers: users.length });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "There was an error while getting users." });
    }
  }
};

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true, name: true, email: true, role: true },
    });

    return res.status(200).json({ users, totalUsers: users.length });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "There was an error while getting admins." });
    }
  }
};
