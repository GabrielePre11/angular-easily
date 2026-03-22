import cron from "node-cron";
import { prisma } from "@/lib/prisma";

export const cleanBooking = () => {
  // It means that this function will be executed every hour.
  // The five "*" represent minutes, hours, days, months and years.
  cron.schedule("0 * * * *", async () => {
    const now = new Date();

    /**
     * Find all cars that have a status of "UNAVAILABLE" and do not have any bookings that have an end date that is greater than or equal to the current date.
     */
    const expiredBookings = await prisma.car.updateMany({
      where: {
        status: "UNAVAILABLE",
        bookings: {
          none: {
            endDate: { gte: now },
          },
        },
      },
      data: {
        status: "AVAILABLE", // Change the status to "AVAILABLE"
      },
    });
  });
};
