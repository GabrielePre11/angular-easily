import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/types/car.type';
import { GetAllCarsResponse } from '../models/types/response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private serverURL = `${environment.apiURL}/cars`;

  constructor(private httpClient: HttpClient) {}

  private _cars = signal<Car[]>([]);
  private _car = signal<Car | null>(null);

  readonly cars = this._cars.asReadonly();
  readonly car = this._car.asReadonly();

  setCars(cars: Car[]) {
    this._cars.set(cars);
  }

  setCar(car: Car) {
    this._car.set(car);
  }

  getCars(page?: number, limit?: number) {
    return this.httpClient
      .get<GetAllCarsResponse>(`${this.serverURL}?page=${page}&limit=${limit}`)
      .pipe(
        tap((data) => {
          if (Array.isArray(data.cars)) this.setCars(data.cars);
        }),
      );
  }
}
