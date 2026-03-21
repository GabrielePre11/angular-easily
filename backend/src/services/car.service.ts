import { prisma } from "@/lib/prisma";
import slugify from "slugify";
import { createCarBody } from "@/types/car.type";

export const createCarFunction = async (data: createCarBody) => {
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
  } = data;

  const existingCar = await prisma.car.findUnique({
    where: {
      brandId_model_year: {
        brandId,
        model,
        year,
      },
    },
  });

  if (existingCar) {
    throw new Error(
      `Car with model: ${model} and year: ${year} already exists.`,
    );
  }

  const carSlug = slugify(`${model}-${year}`, {
    lower: true,
    strict: true,
  });

  return await prisma.car.create({
    data: {
      brandId,
      model,
      slug: carSlug,
      year,
      pricePerDay,
      doors,
      seats,
      image,
      features,
      transmission,
      carType: type,
      status,
    },
  });
};

export const updateCarFunction = async (
  carId: string,
  data: Partial<createCarBody>,
) => {
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
  } = data;

  const existingCar = await prisma.car.findUnique({
    where: {
      id: carId,
    },
  });

  if (!existingCar) {
    throw new Error(`Car with ID: ${carId} not found.`);
  }

  let newSlug = "";

  if (model) {
    newSlug = slugify(`${model}-${year}`, {
      lower: true,
      strict: true,
    });
  }

  return await prisma.car.update({
    where: {
      id: carId,
    },
    data: {
      brandId,
      model,
      slug: newSlug,
      year,
      pricePerDay,
      doors,
      seats,
      image,
      features,
      transmission,
      carType: type,
      status,
    },
  });
};

export const deleteCarFunction = async (carId: string) => {
  const car = await prisma.car.findUnique({
    where: { id: carId },
  });

  if (!car) {
    throw new Error(`Car with ID: ${carId} not found.`);
  }

  return await prisma.car.delete({
    where: {
      id: carId,
    },
  });
};
