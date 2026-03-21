import { prisma } from "../src/lib/prisma";
import slugify from "slugify";

import { CAR_BRANDS, CURRENT_BRANDS } from "../src/constants/car-brands";
import { CARS } from "../src/constants/cars";

async function seedCarBrands() {
  const existingBrands = await prisma.brand.findMany();

  if (existingBrands.length === 0) {
    await prisma.brand.createMany({
      data: CAR_BRANDS.map((brand) => ({
        name: brand.name.toLowerCase().trim(),
        image: brand.image,
      })),
      skipDuplicates: true,
    });

    console.info("Car brands seeded.");
  }
}

async function seedCars() {
  const existingCars = await prisma.car.findMany();

  if (existingCars.length > 0) {
    console.error("Cars already seeded.");
    return;
  }

  const brandsMap = CURRENT_BRANDS.reduce(
    (acc, brand) => {
      acc[brand.brand.trim().toLowerCase()] = brand.brandId;
      return acc;
    },
    {} as Record<string, string>,
  );

  const carsData = CARS.map((car) => {
    const brandKey = car.brand_name.trim().toLowerCase();

    if (!brandsMap[brandKey]) {
      throw new Error(`Brand not found for car: ${car.model}`);
    }

    const carSlug = slugify(car.model, {
      lower: true,
      strict: true,
    });

    return {
      brandId: brandsMap[brandKey],
      model: car.model,
      slug: carSlug,
      year: car.year,
      pricePerDay: car.pricePerDay,
      doors: car.doors,
      seats: car.seats,
      image: car.image,
      features: car.features,
      transmission: car.transmission,
      carType: car.type,
      status: car.status,
    };
  });

  await prisma.car.createMany({
    data: carsData,
    skipDuplicates: true,
  });

  console.info("Cars seeded.");
}

async function main() {
  /* await seedCarBrands(); */
  await seedCars();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
