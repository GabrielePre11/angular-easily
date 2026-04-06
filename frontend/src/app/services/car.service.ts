import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/types/car.type';
import { GetAllCarsResponse } from '../models/types/response.type';
import { catchError, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private httpClient = inject(HttpClient);
  private serverURL = `${environment.apiURL}/cars`;

  private _page = signal<number>(1);
  private _limit = signal<number>(8);

  readonly page = this._page.asReadonly();
  readonly limit = this._limit.asReadonly();

  prevPage = () => this._page.update((prev) => prev - 1);
  nextPage = () => this._page.update((prev) => prev + 1);

  carsResource = rxResource({
    params: () => ({ page: this.page(), limit: this.limit() }),
    stream: (carsParams) => {
      const { page, limit } = carsParams.params;
      return this.httpClient
        .get<GetAllCarsResponse>(
          `${this.serverURL}?page=${page}&limit=${limit}`,
        )
        .pipe(
          catchError((err: unknown) =>
            of({
              cars: [],
              carsCount: 0,
              limit: 0,
              page: 0,
              pages: 0,
              totalCars: 0,
            }),
          ),
        );
    },
  });

  readonly isLoading = computed(() => this.carsResource.isLoading());
  readonly errorState = computed(() => this.carsResource.error());
  readonly cars = computed(() => this.carsResource.value()?.cars || []);
  readonly totalCars = computed(
    () => this.carsResource.value()?.totalCars || 0,
  );
  readonly totalPages = computed(() => this.carsResource.value()?.pages || 0);
}
