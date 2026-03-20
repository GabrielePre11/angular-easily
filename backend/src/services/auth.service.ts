import { prisma } from "@/lib/prisma";
import { SignUpBody } from "@/types/auth.type";
import bcrypt from "bcryptjs";

export const signUpFunction = async (data: SignUpBody) => {
  let { name } = data;
  const { email, password } = data;

  const LOG_ROUNDS = 10;

  const alreadyExistingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (alreadyExistingUser) {
    throw new Error(`User with email "${email}" already exists.`);
  }

  if (!name || name.length === 0) {
    name =
      email.split("@")[0].charAt(0).toUpperCase() +
      email.split("@")[0].slice(1);
  }

  const hashedPassword = await bcrypt.hash(password, LOG_ROUNDS);

  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};
