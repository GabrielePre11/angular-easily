import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  SignInBody,
  SignUpBody,
  UserDataResponse,
} from '../models/types/auth.type';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private serverURL = `${environment.apiURL}/auth`;

  checkAuthResource = rxResource({
    stream: () =>
      this.httpClient
        .get<UserDataResponse>(`${this.serverURL}/check-auth`, {
          withCredentials: true,
        })
        .pipe(
          catchError((err: unknown) => {
            console.error(err);
            return of(null);
          }),
        ),
  });

  readonly currentUser = computed(() => this.checkAuthResource.value() ?? null);

  signUp(body: SignUpBody): Observable<UserDataResponse> {
    return this.httpClient
      .post<UserDataResponse>(`${this.serverURL}/sign-up`, body, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.checkAuthResource.reload();
        }),
      );
  }

  signIn(body: SignInBody): Observable<UserDataResponse> {
    return this.httpClient
      .post<UserDataResponse>(`${this.serverURL}/sign-in`, body, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.checkAuthResource.reload();
        }),
      );
  }

  signOut(): Observable<UserDataResponse> {
    return this.httpClient
      .post<UserDataResponse>(
        `${this.serverURL}/sign-out`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap(() => {
          this.checkAuthResource.reload();
        }),
      );
  }
}
