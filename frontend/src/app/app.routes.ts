import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./features/auth/sign-up/sign-up').then((m) => m.SignUp),
      },
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./features/auth/sign-in/sign-in').then((m) => m.SignIn),
      },
    ],
  },
];
