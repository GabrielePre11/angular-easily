import { Car } from './car.type';

export interface GetAllCarsResponse {
  cars: Car[];
  carsCount: number;
  limit: number;
  page: number;
  pages: number;
  totalCars: number;
}
