import { prisma } from "@/lib/prisma";
import { createCarFunction } from "@/services/car.service";
import { createCarBody } from "@/types/car.type";
import { Request, Response } from "express";

// TODO: Filters
export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await prisma.car.findMany();
    return res.status(200).json(cars);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "There was an error getting cars." });
    }
  }
};

export const getCarById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const car = await prisma.car.findUnique({ where: { id } });

    if (!car) {
      return res.status(404).json({ message: `Car with ID: ${id} not found.` });
    }

    return res.status(200).json(car);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      const { id } = req.params;

      return res.status(500).json({
        message: `There was an error getting the car with ID: ${id}.`,
      });
    }
  }
};

export const createCar = async (
  req: Request<{}, {}, createCarBody>,
  res: Response,
) => {
  try {
    const {
      brandId,
      model,
      year,
      pricePerDay,
      doors,
      seats,
      image,
      features,
      transmission,
      type,
      status,
    } = req.body;

    const brand = await prisma.brand.findUnique({ where: { id: brandId } });

    if (!brand) {
      return res
        .status(404)
        .json({ message: `Brand with ID: ${brandId} not found.` });
    }

    if (!isNaN(year) && !isNaN(pricePerDay) && !isNaN(doors) && !isNaN(seats)) {
      return res.status(400).json({
        message: "Year, pricePerDay, doors and seats must be numbers.",
      });
    }

    if (!image.startsWith("http")) {
      throw new Error("Invalid image URL.");
    }

    if (!features.every((feature) => typeof feature === "string")) {
      return res.status(400).json({ message: "Features must be strings." });
    }

    if (features.length < 3 || features.length > 8) {
      return res
        .status(400)
        .json({ message: "Features must be between 3 and 8." });
    }

    const newCar = await createCarFunction({
      brandId,
      model,
      year,
      pricePerDay,
      doors,
      seats,
      image,
      features,
      transmission,
      type,
      status,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "There was an error creating a new brand." });
    }
  }
};
