import { CarStatus, CarType, Transmission } from "@/generated/prisma/enums";

export interface createCarBody {
  brandId: string;
  model: string;
  year: number;
  pricePerDay: number;
  doors: number;
  seats: number;
  image: string;
  features: string[];
  transmission: Transmission;
  type: CarType;
  status: CarStatus;
}
