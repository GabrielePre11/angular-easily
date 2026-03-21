import { prisma } from "@/lib/prisma";
import { ReviewBody } from "@/types/review.type";

export const createReviewFunction = async (
  userId: string,
  carId: string,
  data: ReviewBody,
) => {
  const { stars, comment } = data;

  return await prisma.review.upsert({
    where: { userId_carId: { userId, carId } },
    update: { stars, comment },
    create: { stars, comment, userId, carId },
  });
};

export const updateReviewFunction = async (
  userId: string,
  carId: string,
  data: Partial<ReviewBody>,
) => {
  const { stars, comment } = data;

  const review = await prisma.review.update({
    where: { userId_carId: { userId, carId } },
    data: { stars, comment },
  });

  if (!review) {
    throw new Error(
      `Review with userId: ${userId} and carId: ${carId} not found.`,
    );
  }

  return review;
};

export const deleteReviewFunction = async (userId: string, carId: string) => {
  const review = await prisma.review.delete({
    where: { userId_carId: { userId, carId } },
  });

  if (!review) {
    throw new Error(
      `Review with userId: ${userId} and carId: ${carId} not found.`,
    );
  }

  return review;
};
