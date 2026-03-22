import { Booking } from './booking.type';
import { Brand } from './brand.type';
import { Review } from './review.type';

export interface Car {
  id: string;
  brandId: string;
  model: string;
  slug: string;
  year: number;
  pricePerDay: number;
  doors: number;
  seats: number;
  image: string;
  features: string[];
  status: CarStatus;
  transmission: CarTransmission;
  carType: CarType;
  createdAt: Date;
  updatedAt: Date;
  brand: Brand;
  bookings: Booking[];
  reviews: Review[];
}

export type CarStatus = 'AVAILABLE' | 'UNAVAILABLE';

export type CarTransmission = 'MANUAL' | 'AUTOMATIC';

export type CarType = [
  'SPORT_CAR',
  'HATCHBACK',
  'COUPE',
  'SEDAN',
  'CONVERTIBLE',
  'SUV',
  'STATION_WAGON',
  'MINIBUS',
  'VAN',
  'PICKUP',
];
