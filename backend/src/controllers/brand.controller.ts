import { prisma } from "@/lib/prisma";
import {
  createBrandFunction,
  deleteBrandFunction,
  updateBrandFunction,
} from "@/services/brand.service";
import { createBrandBody } from "@/types/brand.type";
import { Request, Response } from "express";

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await prisma.brand.findMany();
    return res.status(200).json(brands);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "There was an error getting brands." });
    }
  }
};

export const getBrandById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const brand = await prisma.brand.findUnique({ where: { id } });

    if (!brand) {
      return res
        .status(404)
        .json({ message: `Brand with ID: ${id} not found.` });
    }

    return res.status(200).json(brand);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "There was an error getting this brand." });
    }
  }
};

export const createBrand = async (
  req: Request<{}, {}, createBrandBody>,
  res: Response,
) => {
  try {
    const { name, image } = req.body;

    if (!image.startsWith("http")) {
      throw new Error("Invalid image URL.");
    }

    const newBrand = await createBrandFunction({ name, image });
    return res.status(201).json(newBrand);
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

export const updateBrand = async (
  req: Request<{ id: string }, {}, Partial<createBrandBody>>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    if (image && !image.startsWith("http")) {
      throw new Error("Invalid image URL.");
    }

    const updatedBrand = await updateBrandFunction(id, { name, image });

    return res
      .status(200)
      .json({ updatedBrand, message: `Brand with ID: ${id} updated .` });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      const { id } = req.params;

      return res.status(500).json({
        message: `There was an error updating the brand with ID: ${id}.`,
      });
    }
  }
};

export const deleteBrand = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    deleteBrandFunction(id);
    return res.status(200).json({ message: `Brand with ID: ${id} deleted.` });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      const { id } = req.params;

      return res.status(500).json({
        message: `There was an error deleting the brand with ID: ${id}.`,
      });
    }
  }
};
