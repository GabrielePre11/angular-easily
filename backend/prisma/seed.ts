import { prisma } from "../src/lib/prisma";
import { CAR_BRANDS } from "../src/constants/car-brands";

async function seedCarBrands() {
  const brands = await prisma.brand.findMany();

  if (brands.length === 0) {
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

async function main() {
  await seedCarBrands();
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
