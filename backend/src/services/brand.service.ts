import { prisma } from "@/lib/prisma";
import { createBrandBody } from "@/types/brand.type";

export const createBrandFunction = async (data: createBrandBody) => {
  const { name, image } = data;

  const alreadyExistingBrand = await prisma.brand.findUnique({
    where: { name: name.toLowerCase().trim() },
  });

  if (alreadyExistingBrand) {
    throw new Error(`Brand with name: "${name}" already exists.`);
  }

  return await prisma.brand.create({
    data: {
      name,
      image,
    },
  });
};

export const updateBrandFunction = async (
  brandId: string,
  data: Partial<createBrandBody>,
) => {
  const { name, image } = data;

  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
  });

  if (!brand) {
    throw new Error(`Brand with ID: ${brandId} not found.`);
  }

  if (image && !image.startsWith("http")) {
    throw new Error("Invalid image URL.");
  }

  return await prisma.brand.update({
    where: { id: brandId },
    data: {
      name,
      image,
    },
  });
};

export const deleteBrandFunction = async (brandId: string) => {
  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
  });

  if (!brand) {
    throw new Error(`Brand with ID: ${brandId} not found.`);
  }

  return await prisma.brand.delete({ where: { id: brandId } });
};
