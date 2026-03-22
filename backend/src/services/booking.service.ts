import { prisma } from "@/lib/prisma";
import { BookingBody } from "@/types/booking.type";

export const createBookingFunction = async (
  userId: string,
  carId: string,
  data: BookingBody,
) => {
  const { startDate, endDate } = data;

  /**
   * @ I use a transaction to ensure atomicity (all the operations are done in the same time, or none of them is done at all).
   * @ It's like a Promise.all, because it waits for all the operations to be done before returning the result.
   */
  return await prisma.$transaction(async (tx) => {
    const isOccupied = await tx.booking.findFirst({
      where: {
        carId,
        startDate: { lte: new Date(endDate) },
        endDate: { gte: new Date(startDate) },
      },
    });

    if (isOccupied)
      throw new Error(
        `The car with ID: ${carId} is already occupied for this period.`,
      );

    const booking = await tx.booking.create({
      data: {
        userId,
        carId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    await tx.car.update({
      where: { id: carId },
      data: { status: "UNAVAILABLE" },
    });

    return booking;
  });
};

export const deleteBookingFunction = async (userId: string, carId: string) => {
  return await prisma.$transaction(async (tx) => {
    const isPending = await tx.booking.findUnique({
      where: {
        userId_carId: {
          userId,
          carId,
        },
        status: "PENDING",
      },
    });

    if (!isPending)
      throw new Error("You cannot delete a booking that has been confirmed.");

    const booking = await tx.booking.delete({
      where: {
        userId_carId: {
          userId,
          carId,
        },
      },
    });

    await tx.car.update({
      where: { id: carId },
      data: { status: "AVAILABLE" },
    });

    return booking;
  });
};
