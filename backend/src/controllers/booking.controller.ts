import { prisma } from "@/lib/prisma";
import {
  createBookingFunction,
  deleteBookingFunction,
} from "@/services/booking.service";
import { BookingBody } from "@/types/booking.type";
import { Request, Response } from "express";

export const getBookingByUserId = async (
  req: Request<{ userId: string }, {}, {}>,
  res: Response,
) => {
  try {
    const userId = req.params.userId;
    const authenticatedUserId = req.user?.id;

    if (!authenticatedUserId || !userId)
      return res.status(401).json({ message: "Unauthorized." });

    if (userId !== authenticatedUserId) {
      return res.status(401).json({
        message: "Unauthorized. You cannot access other users' bookings.",
      });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        car: true,
      },
    });
    return res.status(200).json({ bookings });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      const { userId } = req.params;

      return res.status(500).json({
        message: `There was an error getting the bookings for user: ${userId}.`,
      });
    }
  }
};

export const createBooking = async (
  req: Request<{ carId: string }, {}, BookingBody>,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    const { carId } = req.params;

    const { startDate, endDate } = req.body;

    if (!userId)
      return res
        .status(401)
        .json({ message: "Unauthorized. You must first log in." });

    if (!startDate || !endDate)
      return res.status(400).json({ message: "Missing required fields." });

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Setting the time to 00:00:00 to avoid time zone issues when comparing dates

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end)
      return res
        .status(400)
        .json({ message: "End date must be after start date." });

    if (start < today)
      return res
        .status(400)
        .json({ message: "Start date must be in the future." });

    const newBooking = await createBookingFunction(userId, carId, {
      startDate: start,
      endDate: end,
    });

    return res.status(201).json({
      newBooking,
      message: `Congrats! You have successfully booked the car ${carId} from ${startDate} to ${endDate}.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      const { carId } = req.params;

      return res.status(500).json({
        message: `There was an error creating the booking for car ${carId}.`,
      });
    }
  }
};

export const deleteBooking = async (
  req: Request<{ carId: string }, {}, {}>,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    const { carId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const deletedBooking = await deleteBookingFunction(userId, carId);

    return res.status(200).json({
      deletedBooking,
      message: `The booking on car ${carId} was deleted successfully.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      const { carId } = req.params;

      return res.status(500).json({
        message: `There was an error deleting the booking on car ${carId}.`,
      });
    }
  }
};
