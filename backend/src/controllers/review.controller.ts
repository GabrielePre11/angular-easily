import { prisma } from "@/lib/prisma";
import {
  createReviewFunction,
  deleteReviewFunction,
  updateReviewFunction,
} from "@/services/review.service";
import { ReviewBody } from "@/types/review.type";
import { Request, Response } from "express";

export const getReviewByCarId = async (
  req: Request<{ carId: string }, {}, {}>,
  res: Response,
) => {
  try {
    const { carId } = req.params;

    const review = await prisma.review.findMany({
      where: {
        carId,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        car: true,
      },
    });

    return res.status(200).json({
      review,
      message: `Review on car ${carId} updated successfully.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      const { carId } = req.params;

      return res.status(500).json({
        message: `There was an error getting the review on car ${carId}.`,
      });
    }
  }
};

export const addReviewOnCar = async (
  req: Request<{ carId: string }, {}, ReviewBody>,
  res: Response,
) => {
  try {
    const userId = req.user?.id;

    const { carId } = req.params;
    const { stars, comment } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!stars) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (stars < 1 || stars > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    if (comment && (comment.length < 10 || comment.length > 100)) {
      return res
        .status(400)
        .json({ message: "Comment must be between 10 and 100 characters." });
    }

    const review = await createReviewFunction(userId, carId, {
      stars,
      comment,
    });

    return res.status(201).json({
      review,
      message: `A new review on car ${carId} was created.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "There was an error creating a new review." });
    }
  }
};

export const updateReview = async (
  req: Request<{ carId: string }, {}, Partial<ReviewBody>>,
  res: Response,
) => {
  try {
    const userId = req.user?.id;

    const { carId } = req.params;
    const { stars, comment } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (stars && (stars < 1 || stars > 5)) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    if (comment && (comment.length < 10 || comment.length > 100)) {
      return res
        .status(400)
        .json({ message: "Comment must be between 10 and 100 characters." });
    }

    const review = await updateReviewFunction(userId, carId, {
      stars,
      comment,
    });

    return res.status(200).json({
      review,
      message: `The review on car ${carId} was updated successfully.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      const { carId } = req.params;

      return res.status(500).json({
        message: `There was an error updating the review on car ${carId}.`,
      });
    }
  }
};

export const deleteReview = async (
  req: Request<{ carId: string }, {}, {}>,
  res: Response,
) => {
  try {
    const userId = req.user?.id;

    const { carId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const review = await deleteReviewFunction(userId, carId);

    return res.status(200).json({
      review,
      message: `The review on car ${carId} was deleted successfully.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      const { carId } = req.params;

      return res.status(500).json({
        message: `There was an error deleting the review on car ${carId}.`,
      });
    }
  }
};
