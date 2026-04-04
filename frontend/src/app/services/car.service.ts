import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/types/car.type';
import { GetAllCarsResponse } from '../models/types/response.type';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private httpClient = inject(HttpClient);
  private serverURL = `${environment.apiURL}/cars`;

  private _isLoading = signal<boolean>(false);
  private _errorState = signal<string>('');
  private _cars = signal<Car[]>([]);
  private _car = signal<Car | null>(null);
  private _carsCount = signal<number>(0);
  private _totalCars = signal<number>(0);
  private _totalPages = signal<number>(0);

  readonly isLoading = this._isLoading.asReadonly();
  readonly errorState = this._errorState.asReadonly();
  readonly cars = this._cars.asReadonly();
  readonly car = this._car.asReadonly();
  readonly carsCount = this._carsCount.asReadonly();
  readonly totalCars = this._totalCars.asReadonly();
  readonly totalPages = this._totalPages.asReadonly();

  setCars(cars: Car[]) {
    this._cars.set(cars);
  }

  setCar(car: Car) {
    this._car.set(car);
  }

  setCarsCount(carsCount: number) {
    this._carsCount.set(carsCount);
  }

  setTotalCars(totalCars: number) {
    this._totalCars.set(totalCars);
  }

  setTotalPages(totalPages: number) {
    this._totalPages.set(totalPages);
  }

  getCars(page?: number, limit?: number) {
    this._isLoading.set(true);

    return this.httpClient
      .get<GetAllCarsResponse>(`${this.serverURL}?page=${page}&limit=${limit}`)
      .pipe(
        tap((data) => {
          this._isLoading.set(false);
          if (Array.isArray(data.cars)) {
            this.setCars(data.cars);
          }
          this.setCarsCount(Number(data.carsCount));
          this.setTotalCars(Number(data.totalCars));
          this.setTotalPages(Number(data.pages));
        }),
        // In RxJS, we are forced to return an Observable.
        // "of" returns an Observable with no value, in this case an empty array.
        catchError((error) => {
          this._errorState.set(error.message);
          this._isLoading.set(false);
          return of({
            cars: [],
            carsCount: 0,
            limit: 0,
            page: 0,
            pages: 0,
            totalCars: 0,
          } as GetAllCarsResponse);
        }),
      );
  }
}
